/**
 * Single source of truth for public routes used by meta tags, sitemap,
 * ai-routes.json, llms.txt, and content.json.
 *
 * SECURITY: Do not put secrets, API keys, or PII in route titles/descriptions.
 * This data is served in sitemap, llms.txt, and meta tags.
 */

import { FAQ_PAGES, metaDescription } from '../content/faq-pages';
import { GUIDES } from '../content/guides';
import { englishPathOf } from '../i18n/paths';

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface DiscoverableRoute {
  path: string;
  /** Spanish (the site's default language); also used by the sitemap, llms.txt and static pages */
  title: string;
  description: string;
  /** English version, shown when the visitor switches language */
  titleEn?: string;
  descriptionEn?: string;
  indexable?: boolean;
  noindex?: boolean;
  changefreq?: ChangeFreq;
  priority?: number;
  /** Set on the English twins built by withEnglishTwins: 'en'. Spanish routes leave it unset. */
  lang?: 'es' | 'en';
  /** The same page in the other language (English path on a Spanish route and the reverse), for hreflang. */
  alternate?: string;
}

const DEFAULT_BASE_URL = 'https://www.stratumpr.com';

/**
 * Sanitizes base URL: allow only https?:// origins; reject spaces, <, ", ';
 * reject javascript: or other schemes.
 */
export function sanitizeBaseUrl(url: string | undefined): string {
  if (url == null || typeof url !== 'string') return DEFAULT_BASE_URL;
  const trimmed = url.trim();
  if (trimmed.length === 0) return DEFAULT_BASE_URL;
  if (/[\s<>"']/.test(trimmed)) return DEFAULT_BASE_URL;
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) return DEFAULT_BASE_URL;
  if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) return DEFAULT_BASE_URL;
  return trimmed.replace(/\/+$/, '');
}

/**
 * Reads VITE_PUBLIC_BASE_URL (build/runtime), validates with sanitizeBaseUrl,
 * and returns a safe fallback if invalid or missing.
 */
export function getPublicBaseUrl(): string {
  const raw =
    typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_PUBLIC_BASE_URL != null
      ? (import.meta as { env: Record<string, string> }).env.VITE_PUBLIC_BASE_URL
      : typeof process !== 'undefined' && process.env?.VITE_PUBLIC_BASE_URL != null
        ? process.env.VITE_PUBLIC_BASE_URL
        : undefined;
  return sanitizeBaseUrl(raw);
}

/**
 * Ensures path starts with / and contains no : or newlines; use for canonical/og URLs.
 * Rejects path traversal (..) for defense in depth.
 */
export function safePathForUrl(path: string): string {
  if (path == null || typeof path !== 'string') return '/';
  const trimmed = path.trim();
  if (trimmed.length === 0) return '/';
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (/[\r\n:]/.test(normalized)) return '/';
  if (/\.\./.test(normalized)) return '/';
  return normalized;
}

/** Default og:image path (resolve to absolute in meta when needed). */
export const DEFAULT_OG_IMAGE = '/img/StratumPR-Preview-Image.jpg';

/** All public pages. Stratum has no logins; every route is indexable unless noindex is set. */
export const DISCOVERABLE_ROUTES: DiscoverableRoute[] = [
  {
    path: '/',
    title: 'Stratum PR — Tecnología para fabricantes de alimentos',
    description: 'Tecnología para fabricantes de alimentos en Puerto Rico: registros digitales, inventario y trazabilidad para llegar a cada inspección con tranquilidad.',
    titleEn: 'Stratum PR — Technology for food manufacturers',
    descriptionEn: 'Technology for Puerto Rico food manufacturers: digital records, inventory and traceability so every inspection comes with peace of mind.',
    indexable: true,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    title: 'Nosotros: fundadores y misión | Stratum PR',
    description: 'Conoce a los fundadores de Stratum PR, empresa puertorriqueña de datos y tecnología fundada en 2025 que ayuda a los fabricantes de alimentos locales a digitalizarse.',
    titleEn: 'About Stratum PR - Founders and Mission',
    descriptionEn: 'Meet the founders of Stratum PR, a Puerto Rican data and technology company founded in 2025 that helps local food manufacturers go digital.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/autoevaluacion',
    title: 'Autoevaluación: ¿qué tan lista está tu planta para una auditoría? | Stratum PR',
    description: 'Contesta 4 pasos y recibe tu puntuación de preparación para auditorías de inocuidad (FSMA, SQF, BRCGS) y una lista de pendientes con fuentes oficiales. Gratis.',
    titleEn: 'Self-check: how ready is your plant for an audit? | Stratum PR',
    descriptionEn: 'Answer 4 steps and get your audit-readiness score for food safety audits (FSMA, SQF, BRCGS), plus a to-do list with official sources. Free.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/preguntas',
    title: 'Preguntas sobre inocuidad y cumplimiento: FSMA, SQF, BRCGS | Stratum PR',
    description: 'Respuestas con fuentes oficiales sobre cómo documentar registros de inocuidad para FSMA, SQF y BRCGS, y qué piden Walmart, Sam’s Club y Costco a sus suplidores.',
    titleEn: 'Food safety and compliance questions: FSMA, SQF, BRCGS | Stratum PR',
    descriptionEn: 'Answers with official sources on documenting food safety records for FSMA, SQF and BRCGS, and what Walmart, Sam’s Club and Costco ask of suppliers.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.9,
  },

  {
    path: '/contact',
    title: 'Contacto | Stratum PR',
    description: 'Escríbenos o agenda una conversación gratis de 30 minutos sobre cómo digitalizar los registros, el inventario y la trazabilidad de tu planta de alimentos.',
    titleEn: 'Contact Stratum PR',
    descriptionEn: 'Contact Stratum PR. Book a free 30-minute conversation about digitizing records, inventory and traceability for your food plant in Puerto Rico.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/privacy',
    title: 'Política de privacidad | Stratum PR',
    description: 'Cómo Stratum PR recopila, usa y protege tu información.',
    titleEn: 'Privacy Policy - Stratum PR',
    descriptionEn: 'Privacy policy for Stratum PR. How we collect, use, and protect your information.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/terms',
    title: 'Términos de servicio | Stratum PR',
    description: 'Términos para usar el sitio web y los servicios de Stratum PR.',
    titleEn: 'Terms of Service - Stratum PR',
    descriptionEn: 'Terms of service for using Stratum PR website and services.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/cookies',
    title: 'Política de cookies | Stratum PR',
    description: 'Cómo Stratum PR usa cookies y tecnologías similares, y cómo cambiar tus preferencias.',
    titleEn: 'Cookie Policy - Stratum PR',
    descriptionEn: 'Cookie policy for Stratum PR. How we use cookies and similar technologies.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/unsubscribe',
    title: 'Cancelar suscripción | Stratum PR',
    description: 'Administra tu suscripción a nuestros correos.',
    titleEn: 'Unsubscribe - Stratum PR',
    descriptionEn: 'Manage your email subscription preferences.',
    indexable: true,
    noindex: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/email-preferences',
    title: 'Preferencias de correo | Stratum PR',
    description: 'Actualiza tus preferencias de correo y suscripción.',
    titleEn: 'Email Preferences - Stratum PR',
    descriptionEn: 'Update your email preferences and subscription settings.',
    indexable: true,
    noindex: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
];

/**
 * Draft pages (guides with status 'draft') are only built and routed when VITE_SHOW_DRAFTS=1,
 * for review in a local or preview build. Production builds leave them out entirely.
 */
export function showDrafts(): boolean {
  const env = typeof import.meta !== 'undefined' ? (import.meta as { env?: Record<string, string> }).env : undefined;
  if (env?.VITE_SHOW_DRAFTS != null) return env.VITE_SHOW_DRAFTS === '1';
  return typeof process !== 'undefined' && process.env?.VITE_SHOW_DRAFTS === '1';
}

/** One page per FAQ question (/preguntas/<slug>). */
export const FAQ_PAGE_ROUTES: DiscoverableRoute[] = FAQ_PAGES.map((p) => ({
  path: p.path,
  title: `${p.item.es.question} | Stratum PR`,
  description: metaDescription(p.item.es.answer),
  titleEn: `${p.item.en.question} | Stratum PR`,
  descriptionEn: metaDescription(p.item.en.answer),
  indexable: true,
  changefreq: 'monthly',
  priority: 0.7,
}));

/** Guides (/guias/<slug>). Drafts are noindex and only exist when showDrafts() is on. */
export const GUIDE_ROUTES: DiscoverableRoute[] = GUIDES.filter((g) => g.status === 'published' || showDrafts()).map((g) => ({
  path: `/guias/${g.slug}`,
  title: g.metaTitle,
  description: g.description,
  indexable: g.status === 'published',
  noindex: g.status !== 'published',
  changefreq: 'monthly',
  priority: 0.8,
}));

/**
 * Each Spanish route plus its English twin (/en/â€¦, src/i18n/paths.ts) when it has one and an English
 * title: the twin is the same page in English, with its own title and description.
 */
export function withEnglishTwins(routes: DiscoverableRoute[]): DiscoverableRoute[] {
  return routes.flatMap((r) => {
    const en = englishPathOf(r.path);
    if (!en || !r.titleEn || !r.descriptionEn) return [r];
    return [
      { ...r, alternate: en },
      { ...r, path: en, title: r.titleEn, description: r.descriptionEn, lang: 'en' as const, alternate: r.path },
    ];
  });
}

/** Every page that is prerendered and (unless noindex) listed in the sitemap and llms.txt, in both languages. */
export const ALL_PAGE_ROUTES: DiscoverableRoute[] = withEnglishTwins([
  ...DISCOVERABLE_ROUTES,
  ...FAQ_PAGE_ROUTES,
  ...GUIDE_ROUTES,
]);

/** Route constants for use in pages and meta (keep in sync with DISCOVERABLE_ROUTES). */
// Look routes up by path, never by position: removing a route must not shift the others
function routeFor(path: string): DiscoverableRoute {
  const route = DISCOVERABLE_ROUTES.find((r) => r.path === path);
  if (!route) throw new Error(`No discoverable route for ${path}`);
  return route;
}

export const LANDING_ROUTE = routeFor('/');
export const ABOUT_ROUTE = routeFor('/about');
export const PREGUNTAS_ROUTE = routeFor('/preguntas');
export const SELFCHECK_ROUTE = routeFor('/autoevaluacion');
export const CONTACT_ROUTE = routeFor('/contact');
export const PRIVACY_ROUTE = routeFor('/privacy');
export const TERMS_ROUTE = routeFor('/terms');
export const COOKIES_ROUTE = routeFor('/cookies');
export const UNSUBSCRIBE_ROUTE = routeFor('/unsubscribe');
export const EMAIL_PREFERENCES_ROUTE = routeFor('/email-preferences');
