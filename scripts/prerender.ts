/**
 * Prerender: after `vite build` (browser bundle in dist/) and `vite build --ssr` (dist-ssr/),
 * render every public route with react-dom/server and write the real page HTML to
 * dist/<route>/index.html. Search engines and AI crawlers that don't run JavaScript get the same
 * Spanish content people see; in the browser, React hydrates it (src/main.tsx).
 *
 * Also writes:
 *  - dist/404.html: the not-found page (Vercel serves it with status 404 for unknown URLs, since
 *    vercel.json has no catch-all rewrite: every page has its own file)
 *
 * Run with: npx tsx scripts/prerender.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { createHash } from 'crypto';

const DIST = path.join(process.cwd(), 'dist');
const SSR_ENTRY = path.join(process.cwd(), 'dist-ssr', 'entry-server.js');

/** Tags PageMeta (react-helmet-async) writes for each page; the template's defaults are removed so none is duplicated. */
const PER_PAGE_TAGS: RegExp[] = [
  /\s*<title>[^<]*<\/title>/g,
  /\s*<meta name="title" content="[^"]*" \/>/g,
  /\s*<meta name="description" content="[^"]*" \/>/g,
  /\s*<link rel="canonical" href="[^"]*" \/>/g,
  /\s*<meta property="og:(title|description|url|type|image|locale)" content="[^"]*" \/>/g,
  /\s*<meta name="twitter:(card|title|description|image)" content="[^"]*" \/>/g,
];

function countOrThrow(html: string, needle: string, what: string): void {
  const n = html.split(needle).length - 1;
  if (n !== 1) throw new Error(`prerender: expected one ${what} in dist/index.html, found ${n}`);
}

type Rendered = {
  html: string;
  helmet: {
    htmlAttributes: { toString(): string };
    title: { toString(): string };
    meta: { toString(): string };
    link: { toString(): string };
    script: { toString(): string };
  };
};

function buildPage(template: string, rendered: Rendered, extraHead = ''): string {
  let html = template;
  for (const re of PER_PAGE_TAGS) html = html.replace(re, '');

  const { helmet } = rendered;
  const head = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString(), extraHead]
    .filter(Boolean)
    .join('\n    ');
  html = html.replace('</head>', `    ${head}\n  </head>`);

  const lang = /lang="([^"]+)"/.exec(helmet.htmlAttributes.toString())?.[1] ?? 'es-PR';
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);

  return html.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
}

async function main(): Promise<void> {
  // dist/index.html is overwritten with the prerendered home page, so keep the Vite template in
  // dist-ssr/ (deleted at the end) and reuse it if this script runs again after a failure
  const cached = path.join(process.cwd(), 'dist-ssr', 'template.html');
  if (!fs.existsSync(cached)) fs.copyFileSync(path.join(DIST, 'index.html'), cached);
  const template = fs.readFileSync(cached, 'utf8');
  countOrThrow(template, '<div id="root"></div>', '#root');
  countOrThrow(template, '</head>', '</head>');

  const ssr = (await import(pathToFileURL(SSR_ENTRY).href)) as {
    render: (url: string) => Rendered;
    ALL_PAGE_ROUTES: { path: string; noindex?: boolean; indexable?: boolean }[];
    getPublicBaseUrl: () => string;
  };
  const baseUrl = ssr.getPublicBaseUrl();
  // URL -> hash of the page's content, published as /indexnow-manifest.json so `npm run deploy`
  // can tell which pages changed between the live site and the new deploy (scripts/deploy.mjs)
  const manifest: Record<string, string> = {};

  let count = 0;
  for (const route of ssr.ALL_PAGE_ROUTES) {
    const rendered = ssr.render(route.path);
    const indexable = route.indexable !== false && !route.noindex;
    if (indexable && !rendered.html.includes('<h1')) throw new Error(`prerender: ${route.path} rendered without an <h1>`);
    if (indexable) {
      const head = [rendered.helmet.title, rendered.helmet.meta, rendered.helmet.script].map(String).join('');
      manifest[baseUrl + (route.path === '/' ? '/' : route.path)] = createHash('sha256').update(head + rendered.html).digest('hex').slice(0, 16);
    }
    let html = buildPage(template, rendered);
    // Noindex pages: PageMeta writes their own robots tag, so drop the template's "index, follow"
    if (route.noindex) html = html.replace(/\s*<meta name="robots" id="robots-meta" content="[^"]*" \/>/, '');
    const outDir = route.path === '/' ? DIST : path.join(DIST, route.path.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    count++;
  }

  // Not-found page: noindex, served by Vercel with status 404 for any URL with no file and no rewrite
  const notFound = ssr.render('/__not-found__');
  fs.writeFileSync(
    path.join(DIST, '404.html'),
    buildPage(template, notFound).replace(
      /<meta name="robots" id="robots-meta" content="[^"]*" \/>/,
      ''
    ),
    'utf8'
  );

  fs.writeFileSync(path.join(DIST, 'indexnow-manifest.json'), JSON.stringify({ pages: manifest }, null, 2) + '\n', 'utf8');

  fs.rmSync(path.join(process.cwd(), 'dist-ssr'), { recursive: true, force: true });
  console.log(`Prerendered ${count} pages and dist/404.html`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
