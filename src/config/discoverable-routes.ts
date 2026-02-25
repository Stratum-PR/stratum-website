/**
 * Single source of truth for public routes used by meta tags, sitemap,
 * ai-routes.json, llms.txt, and content.json.
 *
 * SECURITY: Do not put secrets, API keys, or PII in route titles/descriptions.
 * This data is served in sitemap, llms.txt, and meta tags.
 */

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface DiscoverableRoute {
  path: string;
  title: string;
  description: string;
  indexable?: boolean;
  noindex?: boolean;
  changefreq?: ChangeFreq;
  priority?: number;
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
    title: 'Stratum PR',
    description: 'The Architecture of Better Decisions. Expert AI consulting and data analytics services in Puerto Rico. Specializing in AI business automation, CRM implementation, and predictive modeling.',
    indexable: true,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    title: 'About Stratum PR - Expert Data Analytics Team',
    description: 'Meet the expert team behind Stratum PR. Founded in 2025 by experienced data scientists and consultants specializing in AI business automation, CRM implementation, and predictive modeling in Puerto Rico.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/services',
    title: 'Data Analytics Services Puerto Rico | CRM Implementation | AI Business Automation - Stratum PR',
    description: 'Comprehensive data analytics services in Puerto Rico. Specializing in CRM implementation consulting, AI business automation, predictive modeling, and big data analytics. Transform your business with Stratum PR.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/projects',
    title: 'Projects - Stratum PR',
    description: 'Explore our data analytics and AI implementation projects. Case studies and solutions delivered for businesses in Puerto Rico and the Caribbean.',
    indexable: true,
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/solutions',
    title: 'Solutions - Stratum PR',
    description: 'Data-driven solutions and AI implementation services. Strategic analytics and business automation for organizations in Puerto Rico.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/resources',
    title: 'Data Analytics Resources - Stratum PR',
    description: 'Access our projects, news and updates, and resources to help your business leverage data effectively.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/newsupdates',
    title: 'News & Updates - Stratum PR',
    description: 'Latest news, insights, and updates on data analytics, AI, and business automation from Stratum PR.',
    indexable: true,
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/blog',
    title: 'Blog - Stratum PR',
    description: 'Blog and insights on data analytics, AI, and business automation from Stratum PR.',
    indexable: true,
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/contact',
    title: 'Contact Stratum PR - Data Analytics Consulting',
    description: 'Contact Stratum PR for expert data analytics consulting in Puerto Rico. Schedule a free consultation for CRM implementation, AI business automation, and predictive modeling services.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions | Data Analytics Consulting Puerto Rico - Stratum PR',
    description: 'Find answers to common questions about our data analytics services, approach, and how we can help transform your business in Puerto Rico.',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy - Stratum PR',
    description: 'Privacy policy for Stratum PR. How we collect, use, and protect your information.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/terms',
    title: 'Terms of Service - Stratum PR',
    description: 'Terms of service for using Stratum PR website and services.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/cookies',
    title: 'Cookie Policy - Stratum PR',
    description: 'Cookie policy for Stratum PR. How we use cookies and similar technologies.',
    indexable: true,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/unsubscribe',
    title: 'Unsubscribe - Stratum PR',
    description: 'Manage your email subscription preferences.',
    indexable: true,
    noindex: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/email-preferences',
    title: 'Email Preferences - Stratum PR',
    description: 'Update your email preferences and subscription settings.',
    indexable: true,
    noindex: true,
    changefreq: 'yearly',
    priority: 0.3,
  },
];

/** Route constants for use in pages and meta (keep in sync with DISCOVERABLE_ROUTES). */
export const LANDING_ROUTE = DISCOVERABLE_ROUTES[0];
export const ABOUT_ROUTE = DISCOVERABLE_ROUTES[1];
export const SERVICES_ROUTE = DISCOVERABLE_ROUTES[2];
export const PROJECTS_ROUTE = DISCOVERABLE_ROUTES[3];
export const SOLUTIONS_ROUTE = DISCOVERABLE_ROUTES[4];
export const RESOURCES_ROUTE = DISCOVERABLE_ROUTES[5];
export const NEWSUPDATES_ROUTE = DISCOVERABLE_ROUTES[6];
export const BLOG_ROUTE = DISCOVERABLE_ROUTES[7];
export const CONTACT_ROUTE = DISCOVERABLE_ROUTES[8];
export const FAQ_ROUTE = DISCOVERABLE_ROUTES[9];
export const PRIVACY_ROUTE = DISCOVERABLE_ROUTES[10];
export const TERMS_ROUTE = DISCOVERABLE_ROUTES[11];
export const COOKIES_ROUTE = DISCOVERABLE_ROUTES[12];
export const UNSUBSCRIBE_ROUTE = DISCOVERABLE_ROUTES[13];
export const EMAIL_PREFERENCES_ROUTE = DISCOVERABLE_ROUTES[14];
