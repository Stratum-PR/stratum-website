/**
 * Spanish ↔ English URLs. The URL decides the language: every Spanish page lives at its own path
 * (the default, es-PR) and its English twin under /en (en-US), linked with hreflang. Search engines
 * index both, so US buyers searching in English find the English pages.
 *
 * English paths are permanent URLs once shipped: never change one (add a redirect instead).
 */
import type { Language } from '@/types/language';

export const EN_PREFIX = '/en';

type Pair = readonly [es: string, en: string];

/** Fixed pages. Dynamic pages (answers, guides, …) add their pairs through registerPathPairs. */
const STATIC_PAIRS: Pair[] = [
  ['/', '/en'],
  ['/about', '/en/about'],
  ['/contact', '/en/contact'],
  ['/autoevaluacion', '/en/self-assessment'],
  ['/preguntas', '/en/faq'],
  ['/privacy', '/en/privacy'],
  ['/terms', '/en/terms'],
  ['/cookies', '/en/cookies'],
];

const esToEn = new Map<string, string>();
const enToEs = new Map<string, string>();

export function registerPathPairs(pairs: readonly Pair[]): void {
  for (const [es, en] of pairs) {
    esToEn.set(es, en);
    enToEs.set(en, es);
  }
}
registerPathPairs(STATIC_PAIRS);

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

function split(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

export function languageOfPath(pathname: string): Language {
  const p = trim(pathname);
  return p === EN_PREFIX || p.startsWith(`${EN_PREFIX}/`) ? 'en' : 'es';
}

/** The English twin of a Spanish path, or null when the page has no English version. */
export function englishPathOf(esPath: string): string | null {
  return esToEn.get(trim(esPath)) ?? null;
}

/** The Spanish twin of an English path, or null. */
export function spanishPathOf(enPath: string): string | null {
  return enToEs.get(trim(enPath)) ?? null;
}

/**
 * A site path (written in Spanish, e.g. "/preguntas") in the given language. Paths with no
 * English twin stay as they are. Keeps any ?query or #hash.
 */
export function localizedPath(path: string, lang: Language): string {
  if (lang === 'es' || !path.startsWith('/') || languageOfPath(path) === 'en') return path;
  const [p, rest] = split(path);
  return (englishPathOf(p) ?? p) + rest;
}

/** The same page in the other language (for the language switch); the home page when there is none. */
export function alternatePath(pathname: string, target: Language): string {
  const [p, rest] = split(pathname);
  const from = languageOfPath(p);
  if (from === target) return pathname;
  const twin = target === 'en' ? englishPathOf(p) : spanishPathOf(p);
  return twin ? twin + rest : target === 'en' ? EN_PREFIX : '/';
}

/** Absolute production URL of a site path (written in Spanish) in the given language, for JSON-LD. */
export function siteUrl(path: string, lang: Language): string {
  return 'https://www.stratumpr.com' + localizedPath(path, lang);
}
