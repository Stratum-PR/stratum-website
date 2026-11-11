/**
 * Production deploy + IndexNow ping. Usage: npm run deploy
 *
 *  1. Reads the live /indexnow-manifest.json (URL -> content hash of each indexable page)
 *  2. Runs `vercel deploy --prod` (the site builds on Vercel as before)
 *  3. Reads the manifest again from the new live site
 *  4. Sends the URLs that are new or changed to IndexNow (Bing, Yandex, Seznam, Naver… share it;
 *     Google does not use IndexNow: it reads the sitemap)
 *
 * Flags: --skip-deploy (only compare and ping, e.g. after a manual `vercel deploy --prod`; with no
 * previous manifest it pings every page), --dry-run (print the URLs, ping nothing).
 *
 * The key is public by design: IndexNow verifies it by fetching https://www.stratumpr.com/<key>.txt
 * (public/<key>.txt).
 */
import { execSync } from 'node:child_process';

const SITE = 'https://www.stratumpr.com';
const HOST = 'www.stratumpr.com';
const INDEXNOW_KEY = '0f973dcf14f0b40841e5e1b282cba1a6';
const args = new Set(process.argv.slice(2));

async function liveManifest() {
  try {
    const res = await fetch(`${SITE}/indexnow-manifest.json`, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } });
    if (!res.ok) return null;
    const body = await res.json();
    return body && typeof body.pages === 'object' ? body.pages : null;
  } catch {
    return null;
  }
}

/** URLs present in `after` whose hash is new or differs from `before` (all of them if there is no `before`). */
export function changedUrls(before, after) {
  return Object.keys(after).filter((url) => !before || before[url] !== after[url]);
}

async function ping(urls) {
  // IndexNow accepts up to 10,000 URLs per request
  for (let i = 0; i < urls.length; i += 10000) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
    });
    // 200 = accepted, 202 = accepted while the key is being verified
    console.log(`IndexNow: HTTP ${res.status} for ${Math.min(10000, urls.length - i)} URL(s)`);
    if (res.status >= 400) process.exitCode = 1;
  }
}

async function main() {
  const before = args.has('--skip-deploy') ? null : await liveManifest();
  if (!args.has('--skip-deploy')) {
    execSync('vercel deploy --prod', { stdio: 'inherit' });
  }

  // The new deploy can take a moment to serve the new manifest from every edge
  let after = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    after = await liveManifest();
    if (after && (!before || JSON.stringify(after) !== JSON.stringify(before))) break;
    await new Promise((r) => setTimeout(r, 5000));
  }
  if (!after) {
    console.error('Could not read the live /indexnow-manifest.json; nothing sent to IndexNow.');
    process.exitCode = 1;
    return;
  }

  const urls = changedUrls(before, after);
  if (urls.length === 0) {
    console.log('IndexNow: no page changed, nothing to send.');
    return;
  }
  console.log(`IndexNow: ${urls.length} new or changed page(s):\n  ${urls.join('\n  ')}`);
  if (args.has('--dry-run')) return;
  await ping(urls);
}

main();
