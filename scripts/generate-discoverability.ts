/**
 * Generate discoverability artifacts after Vite build: sitemap.xml, robots.txt,
 * ai-routes.json, llms.txt, content.json. The page HTML itself is prerendered by
 * scripts/prerender.ts. Run with: npx tsx scripts/generate-discoverability.ts
 *
 * Ensure VITE_PUBLIC_BASE_URL is set in env (or .env.production) for production;
 * otherwise fallback base URL is used.
 */

import * as fs from 'fs';
import { englishPathOf } from '../src/i18n/paths';
import * as path from 'path';
import { execSync } from 'child_process';
import {
  ALL_PAGE_ROUTES,
  DISCOVERABLE_ROUTES,
  FAQ_PAGE_ROUTES,
  GUIDE_ROUTES,
  RESOURCE_ROUTES,
  getPublicBaseUrl,
  safePathForUrl,
} from '../src/config/discoverable-routes';
import { PAGE_CONTENT, FAQ_ENTRIES } from '../src/content/discoverable-content';
import { FAQ_PAGES } from '../src/content/faq-pages';

const DIST = path.join(process.cwd(), 'dist');

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function ensureDist(): void {
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
  }
}

/**
 * lastmod: the date of the last commit (stable across rebuilds of the same code), or today when
 * git is unavailable (e.g. a build from an uploaded folder).
 */
function lastModified(): string {
  try {
    const d = execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch {
    // no git: fall through
  }
  return new Date().toISOString().split('T')[0];
}

/** Indexable pages: the sitemap, llms.txt and IndexNow list exactly these. */
export function indexableRoutes() {
  return ALL_PAGE_ROUTES.filter((r) => r.indexable !== false && !r.noindex);
}

function writeSitemap(baseUrl: string): void {
  const now = lastModified();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const route of indexableRoutes()) {
    const loc = baseUrl + safePathForUrl(route.path);
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    // Both languages of a page list each other (hreflang), as the pages themselves do
    if (route.alternate) {
      const es = route.lang === 'en' ? route.alternate : route.path;
      const en = route.lang === 'en' ? route.path : route.alternate;
      xml += `    <xhtml:link rel="alternate" hreflang="es-PR" href="${escapeXml(baseUrl + safePathForUrl(es))}"/>
`;
      xml += `    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(baseUrl + safePathForUrl(en))}"/>
`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(baseUrl + safePathForUrl(es))}"/>
`;
    }
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
  const routes = indexableRoutes().map((r) => ({
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
  const link = (p: string) => baseUrl + safePathForUrl(p);
  const main = (p: string) => DISCOVERABLE_ROUTES.find((r) => r.path === p)!;
  const L: string[] = [];
  // llms.txt format: an H1, a one-paragraph blockquote summary, then sections of Markdown link lists
  L.push('# Stratum PR', '');
  L.push(
    '> Stratum PR LLC is a Puerto Rico company that builds software for local food manufacturers: digital food safety records, lot inventory and traceability, so plants are ready for FDA inspections and customer audits (FSMA, SQF, BRCGS). It also runs Alertas PR, a free Spanish-language portal of U.S. food recalls that affect Puerto Rico.',
    ''
  );
  L.push(
    'Español: Stratum PR LLC es una empresa de Puerto Rico que hace tecnología para fabricantes de alimentos locales: registros de inocuidad digitales, inventario por lotes y trazabilidad, para llegar listos a las inspecciones de la FDA y a las auditorías de clientes (FSMA, SQF, BRCGS). También publica Alertas PR, un portal gratis en español de los retiros de alimentos de EE. UU. que afectan a Puerto Rico. El sitio está en español, con versión en inglés en la misma dirección. Contacto: contact@stratumpr.com.',
    ''
  );
  L.push(
    'English: The site is in Spanish (es-PR) with an English version of every main page under /en (en-US), linked with hreflang. The FAQ answers cite official sources (FDA, eCFR, SQFI, GFSI, BRCGS) and state when they were last verified. Contact: contact@stratumpr.com.',
    ''
  );

  L.push('## Páginas principales / Main pages', '');
  for (const p of ['/', '/about', '/autoevaluacion', '/preguntas', '/contact']) {
    const r = main(p);
    L.push(`- [${r.title}](${link(p)}): ${r.description}`);
  }
  L.push('- [Alertas PR](https://alertas.stratumpr.com/): Retiros de alimentos que afectan a Puerto Rico, explicados en español. Gratis. / U.S. food recalls affecting Puerto Rico, in Spanish. Free.');
  L.push('');

  L.push('## Preguntas frecuentes (español, con fuentes oficiales)', '');
  for (const r of FAQ_PAGE_ROUTES) {
    const page = FAQ_PAGES.find((p) => p.path === r.path)!;
    L.push(`- [${page.item.es.question}](${link(r.path)})`);
  }
  L.push('');

  L.push('## English pages (for U.S. buyers and companies exporting to the U.S.)', '');
  for (const p of ['/', '/about', '/autoevaluacion', '/preguntas', '/contact']) {
    const r = main(p);
    const en = englishPathOf(p);
    if (en && r.titleEn) L.push(`- [${r.titleEn}](${link(en)}): ${r.descriptionEn ?? ''}`);
  }
  L.push('');
  L.push('## FAQ in English (official sources)', '');
  for (const page of FAQ_PAGES) L.push(`- [${page.item.en.question}](${link(page.enPath)})`);
  L.push('');

  const guides = GUIDE_ROUTES.filter((r) => !r.noindex);
  if (guides.length > 0) {
    L.push('## Guías / Guides (Spanish)', '');
    for (const r of guides) L.push(`- [${r.title}](${link(r.path)}): ${r.description}`);
    L.push('');
  }

  L.push('## Recursos / Resources (es + en)', '');
  for (const r of RESOURCE_ROUTES) {
    const en = englishPathOf(r.path);
    L.push(`- [${r.title}](${link(r.path)}): ${r.description}${en && r.titleEn ? ` English: [${r.titleEn}](${link(en)})` : ''}`);
  }
  L.push('');

  const guidesEn = GUIDE_ROUTES.filter((r) => !r.noindex && r.titleEn && englishPathOf(r.path));
  if (guidesEn.length > 0) {
    L.push('## Guides in English', '');
    for (const r of guidesEn) L.push(`- [${r.titleEn}](${link(englishPathOf(r.path)!)}): ${r.descriptionEn ?? ''}`);
    L.push('');
  }

  L.push('## Optional', '');
  L.push(`- [Sitemap](${baseUrl}/sitemap.xml): Every public page of the site.`);
  L.push(`- [Privacidad / Privacy](${link('/privacy')})`);
  L.push(`- [Términos / Terms](${link('/terms')})`);
  L.push('');

  fs.writeFileSync(path.join(DIST, 'llms.txt'), L.join('\n'), 'utf8');
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

  console.log('Discoverability artifacts generated in dist/');
}

main();
