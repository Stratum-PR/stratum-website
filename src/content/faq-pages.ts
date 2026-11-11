/**
 * One page per FAQ question at /preguntas/<slug>. The slugs are permanent URLs: never change one
 * after it ships (add a redirect in vercel.json if you must). The answers themselves live in
 * compliance-faq.ts; this file only maps them to URLs and splits each answer into a direct
 * answer (the first sentences) and the detail that follows.
 */
import { FAQ_CATEGORIES, type FaqCategory, type FaqItem } from './compliance-faq';

/** FAQ item id → URL slug (Spanish, descriptive). Every FAQ item must have one (checked at build). */
export const FAQ_SLUGS: Record<string, string> = {
  'que-registros': 'que-registros-de-inocuidad-debe-guardar-una-planta',
  'registro-valido': 'que-hace-valido-un-registro-ante-la-fda',
  retencion: 'cuanto-tiempo-guardar-registros-de-inocuidad',
  digital: 'registros-digitales-en-lugar-de-papel',
  'alergenos-etiqueta': 'alergenos-que-declarar-en-la-etiqueta',
  'aprobar-suplidores': 'como-aprobar-y-verificar-suplidores',
  pchf: 'regla-controles-preventivos-pchf-fsma',
  fsma204: 'regla-trazabilidad-fsma-204',
  'preguntar-fda': 'donde-preguntar-a-la-fda-sobre-fsma',
  gfsi: 'que-es-gfsi-sqf-brcgs',
  'sqf-edicion': 'que-edicion-del-codigo-sqf-aplica',
  'sqf-documentos': 'sqf-documentos-y-registros',
  brcgs: 'version-vigente-brcgs-food-safety',
  'tipos-auditoria': 'auditoria-de-primera-segunda-y-tercera-parte',
  'auditoria-vs-inspeccion': 'auditoria-de-certificacion-vs-inspeccion-fda',
  'dia-auditoria': 'que-pasa-el-dia-de-la-auditoria',
  'documentos-auditor': 'documentos-para-el-auditor',
  'no-conformidades': 'no-conformidades-menor-mayor-critica',
  'causa-raiz': 'analisis-de-causa-raiz',
  'fraude-alimentario': 'evaluacion-vulnerabilidad-fraude-alimentario',
  walmart: 'requisitos-inocuidad-walmart-sams-club',
  costco: 'requisitos-inocuidad-costco',
  'cadenas-pr': 'requisitos-cadenas-supermercados-puerto-rico',
  'stratum-1': 'que-es-stratum-pr',
  'stratum-2': 'para-quien-es-stratum-pr',
  'stratum-3': 'stratum-pr-inspecciones-fda-fsma',
  'stratum-4': 'mi-equipo-tiene-que-cambiar-como-trabaja',
  'stratum-5': 'cuanto-cuesta-stratum-pr',
  'stratum-6': 'que-es-alertas-pr',
};

export interface FaqPage {
  slug: string;
  path: string;
  item: FaqItem;
  category: FaqCategory;
}

export const FAQ_PAGES: FaqPage[] = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => {
    const slug = FAQ_SLUGS[item.id];
    if (!slug) throw new Error(`FAQ item "${item.id}" has no slug in FAQ_SLUGS`);
    return { slug, path: `/preguntas/${slug}`, item, category };
  })
);

export function faqPageBySlug(slug: string | undefined): FaqPage | undefined {
  return FAQ_PAGES.find((p) => p.slug === slug);
}

export function faqPathForId(id: string): string {
  return `/preguntas/${FAQ_SLUGS[id]}`;
}

// A sentence ends at . ! ? followed by a space and a capital letter, an opening ¿ or a quote.
// Abbreviations such as "EE. UU." or "21 CFR 117.305" are not followed by a capital, so they stay whole.
const SENTENCE_BREAK = /(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"“])/;

/** Splits an answer into the direct answer (first 2 sentences; all of it if 3 or fewer) and the detail. */
export function splitAnswer(answer: string): { lead: string; detail: string } {
  const sentences = answer.split(SENTENCE_BREAK);
  if (sentences.length <= 3) return { lead: answer, detail: '' };
  return { lead: sentences.slice(0, 2).join(' '), detail: sentences.slice(2).join(' ') };
}

/** Meta description: the start of the answer, cut at a word boundary to at most 155 characters. */
export function metaDescription(answer: string): string {
  const clean = answer.replace(/\s+/g, ' ').trim();
  if (clean.length <= 155) return clean;
  const cut = clean.slice(0, 154);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}
