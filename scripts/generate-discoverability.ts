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

// Search engines and AI assistants we explicitly welcome (the public site is meant to be read and cited)
const WELCOMED_CRAWLERS = [
  'Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot', 'Twitterbot', 'facebookexternalhit', 'LinkedInBot',
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'meta-externalagent', 'MistralAI-User',
];

function writeRobots(baseUrl: string): void {
  const lines = [
    '# Stratum PR - https://www.stratumpr.com',
    '# Search engines and AI assistants are welcome to read, index and cite this site.',
    `# Plain-text summary for AI assistants: ${baseUrl}/llms.txt`,
    '',
    ...WELCOMED_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
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
  // llms.txt format: an H1, a one-paragraph blockquote summary, then sections of Markdown link lists
  lines.push(
    toAsciiSafe(
      '> Technology for Puerto Rico food manufacturers. Stratum PR digitizes records, inventory and traceability so plants are ready for every FDA inspection. Also runs Alertas PR, a free public portal of FDA food recalls affecting Puerto Rico. The site is in Spanish, with an English version.'
    )
  );
  lines.push('');
  lines.push('## Main links');
  lines.push('');
  for (const r of DISCOVERABLE_ROUTES) {
    const url = baseUrl + safePathForUrl(r.path);
    lines.push(`- [${toAsciiSafe(r.title)}](${url}): ${toAsciiSafe(r.description)}`);
  }
  lines.push('');
  lines.push('## Products');
  lines.push('');
  lines.push('- [Alertas PR](https://mvp.stratumpr.com/): Free public portal, in Spanish, of the FDA food recalls affecting Puerto Rico.');
  lines.push('');
  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml): Every public page of the site.`);
  lines.push(`- [Page content as JSON](${baseUrl}/content.json): The same text as this file, structured by page.`);
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

/**
 * Agentic Resource Discovery manifest (https://agenticresourcediscovery.org/spec/).
 * Stratum PR publishes no MCP servers or agent tools yet, so the list is empty; add entries when it does.
 */
function writeArdManifest(): void {
  const dir = path.join(DIST, '.well-known');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'ard.json'), JSON.stringify({ entries: [] }, null, 2) + '\n', 'utf8');
  console.log('Wrote dist/.well-known/ard.json');
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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Replace exactly one match; fail the build if the template changed under us. */
function replaceOnce(html: string, pattern: RegExp, replacement: string, what: string): string {
  const matches = html.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'));
  if (!matches || matches.length !== 1) {
    throw new Error(`Static pages: expected one ${what} in dist/index.html, found ${matches?.length ?? 0}`);
  }
  return html.replace(pattern, replacement);
}

/**
 * Many AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) do not run JavaScript, so the bare SPA
 * shell looks empty to them. For each public route, write dist/<route>/index.html with that
 * route's title, description and full text (plus the FAQ and its JSON-LD on the home page)
 * inside #root. React replaces it on load in a browser. The untouched shell is kept as
 * dist/app-shell.html for every other URL (see the catch-all rewrite in vercel.json).
 */
function writeStaticPages(baseUrl: string): void {
  const shellPath = path.join(DIST, 'index.html');
  const shell = fs.readFileSync(shellPath, 'utf8');
  fs.writeFileSync(path.join(DIST, 'app-shell.html'), shell, 'utf8');

  const routes = DISCOVERABLE_ROUTES.filter((r) => r.indexable !== false && !r.noindex);
  const nav = routes
    .map((r) => `<a href="${escapeHtml(safePathForUrl(r.path))}">${escapeHtml(r.title)}</a>`)
    .concat('<a href="https://mvp.stratumpr.com/">Alertas PR</a>')
    .join(' · ');

  for (const r of routes) {
    const pathSafe = safePathForUrl(r.path);
    const url = baseUrl + pathSafe;
    const title = escapeHtml(r.title);
    const desc = escapeHtml(r.description);

    let body = `<header><nav aria-label="Stratum PR">${nav}</nav></header><main><h1>${title}</h1><p>${desc}</p>`;
    for (const sec of PAGE_CONTENT[r.path]?.sections ?? []) {
      body += `<section><h2>${escapeHtml(sec.heading)}</h2><p>${escapeHtml(sec.body)}</p></section>`;
    }
    let headExtra = '';
    if (r.path === '/preguntas' && FAQ_ENTRIES.length > 0) {
      body += '<section><h2>Preguntas y respuestas · Questions and answers</h2>';
      for (const faq of FAQ_ENTRIES) {
        body += `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`;
      }
      body += '</section>';
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ENTRIES.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      };
      headExtra = `<script type="application/ld+json">${JSON.stringify(faqLd).replace(/</g, '\\u003c')}</script>`;
    }
    body += '</main><footer><p>Stratum PR LLC · <a href="mailto:contact@stratumpr.com">contact@stratumpr.com</a> · <a href="/llms.txt">llms.txt</a></p></footer>';

    let html = shell;
    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
    html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`, 'meta description');
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`, 'canonical');
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeHtml(url)}" />`, 'og:url');
    html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`, 'og:title');
    html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`, 'og:description');
    html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, '#root');
    if (headExtra) html = replaceOnce(html, /<\/head>/, `${headExtra}</head>`, '</head>');

    const outDir = r.path === '/' ? DIST : path.join(DIST, pathSafe.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  }
  console.log(`Wrote ${routes.length} static pages with readable content (and dist/app-shell.html)`);
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
  writeArdManifest();
  writeStaticPages(baseUrl);

  console.log('Discoverability artifacts generated in dist/');
}

main();
