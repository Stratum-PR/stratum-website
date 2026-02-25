/**
 * Generate discoverability artifacts after Vite build: sitemap.xml, robots.txt,
 * ai-routes.json, llms.txt, content.json. Run with: npx tsx scripts/generate-discoverability.ts
 *
 * Ensure VITE_PUBLIC_BASE_URL is set in env (or .env.production) for production;
 * otherwise fallback base URL is used.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  DISCOVERABLE_ROUTES,
  getPublicBaseUrl,
  safePathForUrl,
} from '../src/config/discoverable-routes';
import { PAGE_CONTENT, FAQ_ENTRIES } from '../src/content/discoverable-content';

const DIST = path.join(process.cwd(), 'dist');

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** ASCII-safe string for llms.txt (e.g. en-dash to -). */
function toAsciiSafe(s: string): string {
  return s
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '-')
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201c/g, '"')
    .replace(/\u201d/g, '"');
}

function ensureDist(): void {
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
  }
}

function writeSitemap(baseUrl: string): void {
  const now = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const indexable = DISCOVERABLE_ROUTES.filter(
    (r) => r.indexable !== false && !r.noindex
  );
  for (const route of indexable) {
    const loc = baseUrl + safePathForUrl(route.path);
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    if (route.changefreq) {
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }
    if (route.priority !== undefined) {
      xml += `    <priority>${route.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
  console.log('Wrote dist/sitemap.xml');
}

function writeRobots(baseUrl: string): void {
  const lines = [
    '# Stratum PR - https://www.stratumpr.com',
    'User-agent: Googlebot',
    'Allow: /',
    'User-agent: Bingbot',
    'Allow: /',
    'User-agent: Twitterbot',
    'Allow: /',
    'User-agent: facebookexternalhit',
    'Allow: /',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ];
  fs.writeFileSync(path.join(DIST, 'robots.txt'), lines.join('\n'), 'utf8');
  console.log('Wrote dist/robots.txt');
}

function writeAiRoutes(baseUrl: string): void {
  const routes = DISCOVERABLE_ROUTES.map((r) => ({
    path: safePathForUrl(r.path),
    url: baseUrl + safePathForUrl(r.path),
    title: r.title,
    description: r.description,
    public: true,
  }));
  const out = { baseUrl, routes };
  fs.writeFileSync(
    path.join(DIST, 'ai-routes.json'),
    JSON.stringify(out, null, 2),
    'utf8'
  );
  console.log('Wrote dist/ai-routes.json');
}

function writeLlmsTxt(baseUrl: string): void {
  const lines: string[] = [];
  lines.push('# Stratum PR');
  lines.push('');
  lines.push(
    toAsciiSafe(
      'The Architecture of Better Decisions. Data analytics and AI services in Puerto Rico. Expert consulting in CRM implementation, business automation, and predictive modeling.'
    )
  );
  lines.push('');
  lines.push('## Main links');
  lines.push('');
  for (const r of DISCOVERABLE_ROUTES) {
    const url = baseUrl + safePathForUrl(r.path);
    lines.push(`${url} - ${toAsciiSafe(r.title)} - ${toAsciiSafe(r.description)}`);
  }
  lines.push('');

  for (const r of DISCOVERABLE_ROUTES) {
    const pathSafe = safePathForUrl(r.path);
    lines.push(`## Page: ${pathSafe}`);
    lines.push('');
    lines.push(`URL: ${baseUrl}${pathSafe}`);
    lines.push(`Title: ${toAsciiSafe(r.title)}`);
    lines.push(`Description: ${toAsciiSafe(r.description)}`);
    lines.push('');
    const content = PAGE_CONTENT[r.path];
    if (content?.sections?.length) {
      for (const sec of content.sections) {
        lines.push(`### ${toAsciiSafe(sec.heading)}`);
        lines.push(toAsciiSafe(sec.body));
        lines.push('');
      }
    }
    lines.push('');
  }

  if (FAQ_ENTRIES.length > 0) {
    lines.push('## FAQ');
    lines.push('');
    for (const faq of FAQ_ENTRIES) {
      lines.push(`Q: ${toAsciiSafe(faq.question)}`);
      lines.push(`A: ${toAsciiSafe(faq.answer)}`);
      lines.push('');
    }
  }

  fs.writeFileSync(path.join(DIST, 'llms.txt'), lines.join('\n'), 'utf8');
  console.log('Wrote dist/llms.txt');
}

function writeContentJson(baseUrl: string): void {
  const pages = DISCOVERABLE_ROUTES.map((r) => {
    const pathSafe = safePathForUrl(r.path);
    const content = PAGE_CONTENT[r.path];
    return {
      path: pathSafe,
      url: baseUrl + pathSafe,
      title: r.title,
      description: r.description,
      sections: content?.sections ?? [],
    };
  });

  const out: Record<string, unknown> = {
    baseUrl,
    pages,
    _meta: { generatedAt: new Date().toISOString() },
  };
  if (FAQ_ENTRIES.length > 0) {
    out.faq = FAQ_ENTRIES;
  }

  fs.writeFileSync(
    path.join(DIST, 'content.json'),
    JSON.stringify(out, null, 2),
    'utf8'
  );
  console.log('Wrote dist/content.json');
}

function main(): void {
  ensureDist();
  const baseUrl = getPublicBaseUrl();
  console.log('Using base URL:', baseUrl);

  writeSitemap(baseUrl);
  writeRobots(baseUrl);
  writeAiRoutes(baseUrl);
  writeLlmsTxt(baseUrl);
  writeContentJson(baseUrl);

  console.log('Discoverability artifacts generated in dist/');
}

main();
