/**
 * "Inspecciones de la FDA en Puerto Rico" hub page (/inspecciones-fda-puerto-rico,
 * /en/fda-inspections-puerto-rico).
 *
 * Rules: every number below was computed from public FDA data pulled on 2026-11-11, with the
 * method stated next to it; nothing is estimated. Aggregates only: never name a firm on this
 * page. Explanatory text paraphrases the linked fda.gov / eCFR pages. No claims about Stratum's
 * software. Raw data, method notes and refresh scripts: scripts/data/fda-pr/ (see its README).
 */
import { registerPathPairs } from '../i18n/paths';

export type InspectionsLang = 'es' | 'en';

export const INSPECTIONS_PR_PATH = { es: '/inspecciones-fda-puerto-rico', en: '/en/fda-inspections-puerto-rico' } as const;
registerPathPairs([[INSPECTIONS_PR_PATH.es, INSPECTIONS_PR_PATH.en]]);

/** Date the data was pulled from FDA (all three datasets). */
export const INSPECTIONS_PR_DATA_AS_OF = { iso: '2026-11-11', es: '11 de noviembre de 2026', en: 'November 11, 2026' } as const;

/* ------------------------------------------------------------------------------------------ */
/* Sources                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export interface InspectionsSource { id: string; label: { es: string; en: string }; url: string }

export const INSPECTIONS_PR_SOURCES = {
  dashboard: {
    id: 'dashboard',
    label: { es: 'FDA Data Dashboard: Inspecciones y citaciones', en: 'FDA Data Dashboard: Inspections and citations' },
    url: 'https://datadashboard.fda.gov/oii/cd/inspections.htm',
  },
  openfda: {
    id: 'openfda',
    label: { es: 'openFDA: Food Enforcement Reports (retiros de alimentos)', en: 'openFDA: Food Enforcement Reports (food recalls)' },
    url: 'https://open.fda.gov/apis/food/enforcement/',
  },
  classificationFaq: {
    id: 'classificationFaq',
    label: { es: 'FDA: Inspections Database Frequently Asked Questions', en: 'FDA: Inspections Database Frequently Asked Questions' },
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspections-database-frequently-asked-questions',
  },
  faq483: {
    id: 'faq483',
    label: { es: 'FDA: FDA Form 483 Frequently Asked Questions', en: 'FDA: FDA Form 483 Frequently Asked Questions' },
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/fda-form-483-frequently-asked-questions',
  },
  recallDefinitions: {
    id: 'recallDefinitions',
    label: { es: 'FDA: Recalls Background and Definitions', en: 'FDA: Recalls Background and Definitions' },
    url: 'https://www.fda.gov/safety/industry-guidance-recalls/recalls-background-and-definitions',
  },
  cfr117: {
    id: 'cfr117',
    label: { es: 'eCFR: 21 CFR parte 117 (buenas prácticas de manufactura y controles preventivos)', en: 'eCFR: 21 CFR part 117 (CGMP and preventive controls)' },
    url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-117',
  },
  cfr1L: {
    id: 'cfr1L',
    label: { es: 'eCFR: 21 CFR parte 1, subparte L (FSVP)', en: 'eCFR: 21 CFR part 1, subpart L (FSVP)' },
    url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-L',
  },
} satisfies Record<string, InspectionsSource>;

/** Exact dataset URLs the numbers come from (used for JSON-LD isBasedOn). */
export const INSPECTIONS_PR_DATASET_URLS = {
  dashboard: 'https://datadashboard.fda.gov/oii/cd/inspections.htm',
  openfda: 'https://api.fda.gov/food/enforcement.json?search=state:"PR"&limit=1000',
} as const;

/* ------------------------------------------------------------------------------------------ */
/* Data                                                                                        */
/* ------------------------------------------------------------------------------------------ */

export interface FiscalYearClassificationRow { fiscalYear: number; nai: number; vai: number; oai: number; total: number }

/**
 * Food inspections of Puerto Rico establishments with a final classification, per FDA fiscal year
 * (Oct 1 – Sep 30). Source: FDA Data Dashboard, Inspections (public page's Qlik app; the REST
 * API needs credentials and was not used). Filter: Inspection State Code = PR, Product Type =
 * Food/Cosmetics, excluding the "Colors and Cosmetics Technology" project area. Each inspection
 * counted once, with its most serious food classification (OAI > VAI > NAI). FY2027 (3 at pull
 * time) is incomplete and left out. Pulled 2026-11-11. Script: scripts/data/fda-pr/dashboard-console-snippet.js
 */
export const PR_FOOD_INSPECTIONS_BY_FY: FiscalYearClassificationRow[] = [
  { fiscalYear: 2009, nai: 26, vai: 64, oai: 1, total: 91 },
  { fiscalYear: 2010, nai: 21, vai: 69, oai: 3, total: 93 },
  { fiscalYear: 2011, nai: 22, vai: 88, oai: 14, total: 124 },
  { fiscalYear: 2012, nai: 46, vai: 67, oai: 16, total: 129 },
  { fiscalYear: 2013, nai: 17, vai: 56, oai: 13, total: 86 },
  { fiscalYear: 2014, nai: 17, vai: 60, oai: 7, total: 84 },
  { fiscalYear: 2015, nai: 24, vai: 76, oai: 11, total: 111 },
  { fiscalYear: 2016, nai: 38, vai: 73, oai: 6, total: 117 },
  { fiscalYear: 2017, nai: 40, vai: 53, oai: 11, total: 104 },
  { fiscalYear: 2018, nai: 26, vai: 50, oai: 6, total: 82 },
  { fiscalYear: 2019, nai: 27, vai: 41, oai: 5, total: 73 },
  { fiscalYear: 2020, nai: 9, vai: 31, oai: 3, total: 43 },
  { fiscalYear: 2021, nai: 27, vai: 37, oai: 4, total: 68 },
  { fiscalYear: 2022, nai: 47, vai: 48, oai: 4, total: 99 },
  { fiscalYear: 2023, nai: 39, vai: 59, oai: 3, total: 101 },
  { fiscalYear: 2024, nai: 31, vai: 47, oai: 4, total: 82 },
  { fiscalYear: 2025, nai: 31, vai: 38, oai: 5, total: 74 },
  { fiscalYear: 2026, nai: 46, vai: 43, oai: 2, total: 91 },
];

/** Fiscal years shown in the page's table (the full series stays in the constant above). */
export const PR_INSPECTIONS_TABLE_FY = { from: 2017, to: 2026 } as const;

/**
 * The five-year window used for the headline and the most-cited sections: FY2022–FY2026.
 * Totals are sums of PR_FOOD_INSPECTIONS_BY_FY rows 2022–2026. `withCitations` = inspections in the
 * window that appear in the Dashboard's Citations dataset (Program Area = Foods). That dataset only
 * holds citations from 483s generated by FDA's electronic tools (manually prepared 483s are missing),
 * so it is a floor, not the number of 483s issued.
 */
export const PR_FOOD_INSPECTIONS_WINDOW = {
  fyFrom: 2022,
  fyTo: 2026,
  total: 447,
  nai: 194,
  vai: 235,
  oai: 18,
  withCitations: 228,
} as const;

export interface CitedSection {
  rank: number;
  /** As written in the Dashboard's Act/CFR Number field. */
  cfr: string;
  /** Inspections in PR_FOOD_INSPECTIONS_WINDOW that cited this section at least once. */
  inspections: number;
  /** FDA's short description(s) for the citation codes under this section (Dashboard, English). */
  fdaShortDescription: string;
  ecfrUrl: string;
  es: { topic: string; plain: string };
  en: { topic: string; plain: string };
}

/**
 * Top 10 sections cited in PR food inspections, FY2022–FY2026, counted once per inspection that
 * cited them (several FDA citation codes can share a section; 117.135(a)(1) has 8). Source: FDA
 * Data Dashboard, Citations, Program Area = Foods, state PR, joined to the food inspections above.
 * Plain-language text paraphrases the section on eCFR (fetched 2026-11-11).
 */
export const PR_TOP_CITED_SECTIONS: CitedSection[] = [
  {
    rank: 1,
    cfr: '21 CFR 117.35(c)',
    inspections: 44,
    fdaShortDescription: 'Pest control',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.35#p-117.35(c)',
    es: {
      topic: 'Control de plagas',
      plain: 'No se permiten plagas en ninguna área de la planta. Hay que tomar medidas efectivas para mantenerlas fuera de las áreas de elaboración, empaque y almacenaje, y los plaguicidas solo se pueden usar con precauciones que protejan el alimento, las superficies de contacto y el material de empaque.',
    },
    en: {
      topic: 'Pest control',
      plain: 'Pests are not allowed in any area of the plant. Effective measures must keep them out of manufacturing, packing and holding areas, and pesticides may be used only with precautions that protect food, food-contact surfaces and packaging.',
    },
  },
  {
    rank: 2,
    cfr: '21 CFR 117.93',
    inspections: 43,
    fdaShortDescription: 'Storage and Distribution',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.93',
    es: {
      topic: 'Almacenaje y distribución',
      plain: 'El alimento se debe almacenar y transportar en condiciones que lo protejan del contacto cruzado con alérgenos, de la contaminación biológica, química y física, y del deterioro del alimento y de su envase.',
    },
    en: {
      topic: 'Warehousing and distribution',
      plain: 'Food must be stored and transported under conditions that protect it against allergen cross-contact, biological, chemical and physical contamination, and deterioration of the food and its container.',
    },
  },
  {
    rank: 3,
    cfr: '21 CFR 117.35(a)',
    inspections: 36,
    fdaShortDescription: 'Sanitary operations - Plant maintenance / Plant sanitation',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.35#p-117.35(a)',
    es: {
      topic: 'Mantenimiento y limpieza de la planta',
      plain: 'Los edificios, instalaciones y estructuras deben mantenerse limpios, sanitarios y en buen estado. La limpieza y desinfección de utensilios y equipo se debe hacer de forma que proteja contra la contaminación y el contacto cruzado con alérgenos.',
    },
    en: {
      topic: 'Plant maintenance and sanitation',
      plain: 'Buildings, fixtures and other facilities must be kept clean, sanitary and in good repair. Utensils and equipment must be cleaned and sanitized in a way that protects against contamination and allergen cross-contact.',
    },
  },
  {
    rank: 4,
    cfr: '21 CFR 1.502(a)',
    inspections: 29,
    fdaShortDescription: 'Develop FSVP',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-1/section-1.502#p-1.502(a)',
    es: {
      topic: 'Programa de verificación de proveedores extranjeros (FSVP)',
      plain: 'Quien importa un alimento debe desarrollar, mantener y seguir un FSVP para cada alimento que importa, que dé garantías adecuadas de que el proveedor extranjero lo produce con el mismo nivel de protección de la salud pública que exigen las reglas de la FDA.',
    },
    en: {
      topic: 'Foreign Supplier Verification Program (FSVP)',
      plain: 'An importer must develop, maintain and follow an FSVP for each food it imports, giving adequate assurances that the foreign supplier produces it with at least the level of public health protection FDA rules require.',
    },
  },
  {
    rank: 5,
    cfr: '21 CFR 117.80(c)',
    inspections: 28,
    fdaShortDescription: 'Manufacturing, processing, packing, holding - Controls',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.80#p-117.80(c)',
    es: {
      topic: 'Controles durante la elaboración',
      plain: 'El equipo, los utensilios y los envases deben mantenerse limpios y desinfectados, y toda la elaboración, empaque y almacenaje se debe hacer bajo condiciones y controles que reduzcan el crecimiento de microorganismos, el contacto cruzado con alérgenos, la contaminación y el deterioro.',
    },
    en: {
      topic: 'Manufacturing operations controls',
      plain: 'Equipment, utensils and containers must be kept clean and sanitized, and all manufacturing, packing and holding must run under conditions and controls that minimize microbial growth, allergen cross-contact, contamination and deterioration.',
    },
  },
  {
    rank: 6,
    cfr: '21 CFR 117.37',
    inspections: 27,
    fdaShortDescription: 'Sanitary facilities and controls',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.37',
    es: {
      topic: 'Instalaciones sanitarias',
      plain: 'La planta debe tener instalaciones sanitarias adecuadas: agua segura de una fuente adecuada, plomería y desagües bien diseñados y mantenidos, manejo de aguas usadas, servicios sanitarios, lavamanos y manejo de basura.',
    },
    en: {
      topic: 'Sanitary facilities',
      plain: 'The plant must have adequate sanitary facilities: safe water from an adequate source, properly designed and maintained plumbing and drainage, sewage disposal, toilet and hand-washing facilities, and rubbish disposal.',
    },
  },
  {
    rank: 7,
    cfr: '21 CFR 117.20(b)',
    inspections: 22,
    fdaShortDescription: 'Plant construction and design',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.20#p-117.20(b)',
    es: {
      topic: 'Construcción y diseño de la planta',
      plain: 'La planta debe tener el tamaño, la construcción y el diseño adecuados para facilitar el mantenimiento y la sanidad, empezando por espacio suficiente para el equipo y los materiales.',
    },
    en: {
      topic: 'Plant construction and design',
      plain: 'The plant must be suitable in size, construction and design to make maintenance and sanitary operations possible, starting with enough space for equipment and materials.',
    },
  },
  {
    rank: 7,
    cfr: '21 CFR 117.135(a)(1)',
    inspections: 22,
    fdaShortDescription: 'Preventive controls - identify / implement (process, allergen, sanitation)',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.135#p-117.135(a)(1)',
    es: {
      topic: 'Controles preventivos',
      plain: 'La instalación debe identificar e implementar controles preventivos para que los peligros que los requieren se reduzcan significativamente o se prevengan. La regla también exige que estén por escrito (117.135(b)).',
    },
    en: {
      topic: 'Preventive controls',
      plain: 'The facility must identify and implement preventive controls so that hazards requiring them are significantly minimized or prevented. The rule also requires them to be written (117.135(b)).',
    },
  },
  {
    rank: 9,
    cfr: '21 CFR 117.10',
    inspections: 19,
    fdaShortDescription: 'Personnel',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.10',
    es: {
      topic: 'Personal',
      plain: 'La gerencia debe tomar medidas razonables para el control de enfermedades (excluir a quien pueda contaminar el alimento) y para que el personal en contacto con alimentos siga prácticas de higiene.',
    },
    en: {
      topic: 'Personnel',
      plain: 'Management must take reasonable measures for disease control (excluding anyone who could contaminate food) and to make sure staff in contact with food follow hygienic practices.',
    },
  },
  {
    rank: 10,
    cfr: '21 CFR 117.130(a)(1)',
    inspections: 18,
    fdaShortDescription: 'Hazard analysis - Conducted / Identification of hazard',
    ecfrUrl: 'https://www.ecfr.gov/current/title-21/part-117/section-117.130#p-117.130(a)(1)',
    es: {
      topic: 'Análisis de peligros',
      plain: 'La instalación debe hacer un análisis de peligros para identificar y evaluar los peligros conocidos o razonablemente previsibles de cada tipo de alimento y decidir cuáles requieren un control preventivo. Debe estar por escrito, sea cual sea el resultado (117.130(a)(2)).',
    },
    en: {
      topic: 'Hazard analysis',
      plain: 'The facility must conduct a hazard analysis to identify and evaluate known or reasonably foreseeable hazards for each type of food and decide which require a preventive control. It must be written, whatever the outcome (117.130(a)(2)).',
    },
  },
];

export interface RecallYearRow { year: number; events: number; classI: number; classII: number; classIII: number }

/**
 * Food recalls by firms located in Puerto Rico, per calendar year of recall initiation. Source:
 * openFDA food enforcement API, search=state:"PR" (state of the recalling firm), 230 product
 * records in 85 recall events at pull time (openFDA last_updated 2026-11-04; data starts 2012).
 * `events` = distinct event_id; class columns count recalled products (recall_number).
 * Pulled 2026-11-11. Script: scripts/data/fda-pr/compute-openfda-recalls.mjs
 */
export const PR_FOOD_RECALLS_BY_YEAR: RecallYearRow[] = [
  { year: 2012, events: 14, classI: 5, classII: 27, classIII: 3 },
  { year: 2013, events: 9, classI: 1, classII: 12, classIII: 8 },
  { year: 2014, events: 7, classI: 8, classII: 32, classIII: 0 },
  { year: 2015, events: 4, classI: 3, classII: 2, classIII: 0 },
  { year: 2016, events: 13, classI: 1, classII: 37, classIII: 1 },
  { year: 2017, events: 7, classI: 2, classII: 14, classIII: 9 },
  { year: 2018, events: 6, classI: 16, classII: 6, classIII: 0 },
  { year: 2019, events: 6, classI: 0, classII: 11, classIII: 2 },
  { year: 2020, events: 1, classI: 0, classII: 0, classIII: 2 },
  { year: 2021, events: 6, classI: 0, classII: 1, classIII: 7 },
  { year: 2022, events: 2, classI: 0, classII: 0, classIII: 2 },
  { year: 2023, events: 3, classI: 0, classII: 3, classIII: 2 },
  { year: 2024, events: 4, classI: 0, classII: 5, classIII: 0 },
  { year: 2025, events: 1, classI: 0, classII: 6, classIII: 0 },
  { year: 2026, events: 2, classI: 0, classII: 1, classIII: 1 },
];

/** Years shown in the page's recall table. */
export const PR_RECALLS_TABLE_YEARS = { from: 2017, to: 2026 } as const;

/** openFDA meta.last_updated at pull time (2026 counts run through this date). */
export const PR_RECALLS_OPENFDA_LAST_UPDATED = { iso: '2026-11-04', es: '4 de noviembre de 2026', en: 'November 4, 2026' } as const;

/* ------------------------------------------------------------------------------------------ */
/* Copy                                                                                        */
/* ------------------------------------------------------------------------------------------ */

export interface InspectionsCopySection { heading: string; paragraphs: string[] }

export interface InspectionsCopy {
  title: string;        // H1
  metaTitle: string;    // <= 60 chars, ends with " | Stratum PR"
  description: string;  // 140–160 chars
  lead: string;         // direct answer, 2–3 sentences
  breadcrumbHome: string;
  back: string;
  dataAsOf: string;     // "Datos al"
  sourceLabel: string;  // "Fuente"
  classifications: InspectionsCopySection & { items: { code: 'NAI' | 'VAI' | 'OAI'; name: string; text: string }[] };
  byYear: InspectionsCopySection & { caption: string; colFy: string; colTotal: string; note: string };
  form483: InspectionsCopySection;
  cited: InspectionsCopySection & { caption: string; colSection: string; colTopic: string; colInspections: string; readRule: string; note: string };
  recalls: InspectionsCopySection & { caption: string; colYear: string; colEvents: string; colI: string; colII: string; colIII: string; classes: { name: string; text: string }[]; note: string };
  prepare: { heading: string; intro: string; items: { text: string; link?: { to: string; label: string } }[] };
  sourcesHeading: string;
  method: string;
}

const W = PR_FOOD_INSPECTIONS_WINDOW;
const pct = (n: number) => Math.round((n / W.total) * 100);

export const INSPECTIONS_PR_COPY: Record<InspectionsLang, InspectionsCopy> = {
  es: {
    title: 'Inspecciones de la FDA en Puerto Rico: datos y cómo prepararse',
    metaTitle: 'Inspecciones de la FDA en Puerto Rico: datos | Stratum PR',
    description:
      'Datos públicos de la FDA: 447 inspecciones de alimentos en Puerto Rico (años fiscales 2022–2026), su clasificación NAI, VAI u OAI y los hallazgos más citados.',
    lead: `En los años fiscales 2022 a 2026, la FDA publicó ${W.total} inspecciones de establecimientos de alimentos en Puerto Rico con clasificación final: ${pct(W.nai)} % sin acción indicada (NAI), ${pct(W.vai)} % con acción voluntaria indicada (VAI) y ${pct(W.oai)} % con acción oficial indicada (OAI). Los hallazgos citados con más frecuencia fueron el control de plagas, el almacenaje y la distribución, y el mantenimiento y la limpieza de la planta. Abajo están los datos por año, qué significa cada clasificación y qué revisar antes de la próxima inspección.`,
    breadcrumbHome: 'Stratum PR',
    back: 'Preguntas y guías',
    dataAsOf: 'Datos al',
    sourceLabel: 'Fuente',
    classifications: {
      heading: 'Qué significan NAI, VAI y OAI',
      paragraphs: [
        'Al cerrar una inspección, la FDA clasifica el resultado de cada área inspeccionada con una de tres clasificaciones:',
      ],
      items: [
        { code: 'NAI', name: 'No Action Indicated (sin acción indicada)', text: 'La instalación está en un estado aceptable de cumplimiento. Por lo general no recibió un Formulario FDA 483 al final de la inspección.' },
        { code: 'VAI', name: 'Voluntary Action Indicated (acción voluntaria indicada)', text: 'La inspección encontró condiciones o prácticas objetables, pero la agencia determinó que la instalación puede corregirlas voluntariamente y no recomendará ninguna acción. Por lo general recibió un Formulario FDA 483.' },
        { code: 'OAI', name: 'Official Action Indicated (acción oficial indicada)', text: 'La instalación está en un estado inaceptable de cumplimiento. Puede haber recibido un Formulario FDA 483.' },
      ],
    },
    byYear: {
      heading: 'Inspecciones de alimentos en Puerto Rico por año fiscal',
      paragraphs: [
        'El año fiscal federal va del 1 de octubre al 30 de septiembre. Cada inspección cuenta una vez, con su clasificación más seria (OAI, luego VAI, luego NAI).',
      ],
      caption: 'Inspecciones de alimentos con clasificación final en Puerto Rico, años fiscales 2017–2026',
      colFy: 'Año fiscal',
      colTotal: 'Total',
      note: 'La FDA solo publica inspecciones con clasificación final y no incluye las inspecciones que hacen los estados por contrato, así que los años más recientes pueden aumentar.',
    },
    form483: {
      heading: 'Qué es un Formulario FDA 483',
      paragraphs: [
        'Es el documento que el investigador entrega a la gerencia al final de la inspección cuando observó condiciones que, a su juicio, pueden constituir violaciones de la Ley Federal de Alimentos, Medicamentos y Cosméticos. Cada observación se lee y se discute con la gerencia.',
        'El 483 no es una determinación final de la agencia, ni una lista de todas las posibles deficiencias. La FDA lo evalúa junto al informe de inspección (EIR), la evidencia recopilada y la respuesta de la empresa, y anima a las empresas a contestar por escrito con su plan de acción correctiva y a implementarlo con prontitud.',
      ],
    },
    cited: {
      heading: 'Las secciones más citadas en Puerto Rico (años fiscales 2022–2026)',
      paragraphs: [
        `De las ${W.total} inspecciones de alimentos del periodo, ${W.withCitations} aparecen con citaciones en los datos de la FDA. La tabla cuenta en cuántas inspecciones se citó cada sección del reglamento, al menos una vez.`,
      ],
      caption: 'Secciones del Código de Regulaciones Federales (CFR) citadas en más inspecciones de alimentos en Puerto Rico, años fiscales 2022–2026',
      colSection: 'Sección',
      colTopic: 'Tema',
      colInspections: 'Inspecciones',
      readRule: 'Leer la regla',
      note: 'Los datos de citaciones solo incluyen los 483 preparados con las herramientas electrónicas de la FDA; los 483 preparados a mano no aparecen. Por eso son un mínimo, no el total de 483 emitidos.',
    },
    recalls: {
      heading: 'Retiros de alimentos de empresas de Puerto Rico',
      paragraphs: [
        'Un retiro (recall) es la acción de una empresa para sacar un producto del mercado, por iniciativa propia, a petición de la FDA o por orden de la FDA. Un mismo evento de retiro puede incluir varios productos. La FDA clasifica cada producto retirado así:',
      ],
      classes: [
        { name: 'Clase I', text: 'hay una probabilidad razonable de que usar el producto o exponerse a él cause consecuencias graves para la salud o la muerte.' },
        { name: 'Clase II', text: 'el producto puede causar consecuencias temporales o médicamente reversibles, o la probabilidad de consecuencias graves es remota.' },
        { name: 'Clase III', text: 'no es probable que el producto cause consecuencias adversas para la salud.' },
      ],
      caption: 'Retiros de alimentos de empresas ubicadas en Puerto Rico, por año en que comenzó el retiro, 2017–2026',
      colYear: 'Año',
      colEvents: 'Eventos de retiro',
      colI: 'Productos clase I',
      colII: 'Productos clase II',
      colIII: 'Productos clase III',
      note: 'Año calendario. 2026 incluye los retiros publicados en openFDA hasta el 4 de noviembre de 2026.',
    },
    prepare: {
      heading: 'Cómo prepararse para una inspección',
      intro: 'Con base en las secciones más citadas en Puerto Rico y en lo que dice la FDA sobre el 483, estos son puntos concretos para revisar:',
      items: [
        { text: 'Control de plagas (21 CFR 117.35(c)): que las medidas para mantener las plagas fuera de las áreas de elaboración, empaque y almacenaje sean efectivas, y que el uso de plaguicidas proteja el alimento.' },
        { text: 'Almacenaje y transporte (21 CFR 117.93): que las condiciones protejan contra contaminación, contacto cruzado con alérgenos y deterioro del alimento y del envase.' },
        { text: 'Mantenimiento y limpieza (21 CFR 117.35(a) y 117.37): edificios en buen estado, limpieza y desinfección del equipo, agua segura, lavamanos y servicios sanitarios adecuados.' },
        { text: 'Si tu instalación tiene que tener un plan de inocuidad bajo la parte 117: que el análisis de peligros y los controles preventivos estén por escrito e implementados (21 CFR 117.130 y 117.135).' },
        { text: 'Si importas alimentos: que tengas un FSVP para cada alimento que importas (21 CFR 1.502).' },
        { text: 'Si recibes un 483: contesta por escrito con tu plan de acción correctiva y ponlo en marcha con prontitud, como recomienda la FDA.' },
        { text: 'Repasa las respuestas con fuentes oficiales sobre registros e inspecciones.', link: { to: '/preguntas', label: 'Ver preguntas y guías' } },
        { text: 'Mide qué tan lista está tu planta con la autoevaluación gratuita.', link: { to: '/autoevaluacion', label: 'Hacer la autoevaluación' } },
      ],
    },
    sourcesHeading: 'Fuentes oficiales',
    method:
      'Cómo calculamos: inspecciones del FDA Data Dashboard con estado PR y tipo de producto Food/Cosmetics, sin el área de cosméticos; cada inspección una vez, con su clasificación más seria. Citaciones del programa Foods de esas mismas inspecciones. Retiros de openFDA con state:"PR". Solo cifras agregadas; no identificamos empresas.',
  },
  en: {
    title: 'FDA inspections in Puerto Rico: data and how to prepare',
    metaTitle: 'FDA inspections in Puerto Rico: data | Stratum PR',
    description:
      'Public FDA data: 447 food inspections in Puerto Rico (fiscal years 2022–2026), their NAI, VAI or OAI classification and the most frequently cited findings.',
    lead: `In fiscal years 2022 through 2026, FDA published ${W.total} inspections of food establishments in Puerto Rico with a final classification: ${pct(W.nai)}% No Action Indicated (NAI), ${pct(W.vai)}% Voluntary Action Indicated (VAI) and ${pct(W.oai)}% Official Action Indicated (OAI). The most frequently cited findings were pest control, warehousing and distribution, and plant maintenance and sanitation. Below are the numbers by year, what each classification means and what to check before the next inspection.`,
    breadcrumbHome: 'Stratum PR',
    back: 'Questions and guides',
    dataAsOf: 'Data as of',
    sourceLabel: 'Source',
    classifications: {
      heading: 'What NAI, VAI and OAI mean',
      paragraphs: ['When an inspection closes, FDA classifies the result for each inspected area with one of three classifications:'],
      items: [
        { code: 'NAI', name: 'No Action Indicated', text: 'The facility is in an acceptable state of compliance. It usually was not issued a Form FDA 483 at the end of the inspection.' },
        { code: 'VAI', name: 'Voluntary Action Indicated', text: 'The inspection found objectionable conditions or practices, but the agency determined the facility can correct them voluntarily and will not recommend any action. It usually was issued a Form FDA 483.' },
        { code: 'OAI', name: 'Official Action Indicated', text: 'The facility is in an unacceptable state of compliance. It may have been issued a Form FDA 483.' },
      ],
    },
    byYear: {
      heading: 'Food inspections in Puerto Rico by fiscal year',
      paragraphs: ['The federal fiscal year runs October 1 to September 30. Each inspection counts once, with its most serious classification (OAI, then VAI, then NAI).'],
      caption: 'Food inspections with a final classification in Puerto Rico, fiscal years 2017–2026',
      colFy: 'Fiscal year',
      colTotal: 'Total',
      note: 'FDA only publishes inspections with a final classification and does not include state contract inspections, so the most recent years can still grow.',
    },
    form483: {
      heading: 'What a Form FDA 483 is',
      paragraphs: [
        "It is the document the investigator gives management at the end of an inspection when they observed conditions that, in their judgment, may constitute violations of the Federal Food, Drug, and Cosmetic Act. Each observation is read and discussed with management.",
        "A 483 is not a final agency determination, nor a list of every possible deficiency. FDA weighs it with the Establishment Inspection Report (EIR), the evidence collected and the company's response, and encourages companies to respond in writing with their corrective action plan and implement it expeditiously.",
      ],
    },
    cited: {
      heading: 'Most cited sections in Puerto Rico (fiscal years 2022–2026)',
      paragraphs: [`Of the ${W.total} food inspections in the period, ${W.withCitations} appear with citations in FDA's data. The table counts how many inspections cited each section of the regulations at least once.`],
      caption: 'Code of Federal Regulations (CFR) sections cited in the most food inspections in Puerto Rico, fiscal years 2022–2026',
      colSection: 'Section',
      colTopic: 'Topic',
      colInspections: 'Inspections',
      readRule: 'Read the rule',
      note: "The citations data only includes 483s prepared with FDA's electronic tools; manually prepared 483s are missing. So these counts are a floor, not the total of 483s issued.",
    },
    recalls: {
      heading: 'Food recalls by Puerto Rico companies',
      paragraphs: [
        "A recall is a firm's action to remove a product from the market, on its own initiative, at FDA's request or by FDA order. One recall event can include several products. FDA classifies each recalled product as:",
      ],
      classes: [
        { name: 'Class I', text: 'there is a reasonable probability that use of or exposure to the product will cause serious adverse health consequences or death.' },
        { name: 'Class II', text: 'the product may cause temporary or medically reversible health consequences, or the probability of serious consequences is remote.' },
        { name: 'Class III', text: 'the product is not likely to cause adverse health consequences.' },
      ],
      caption: 'Food recalls by companies located in Puerto Rico, by year the recall started, 2017–2026',
      colYear: 'Year',
      colEvents: 'Recall events',
      colI: 'Class I products',
      colII: 'Class II products',
      colIII: 'Class III products',
      note: 'Calendar year. 2026 includes recalls published in openFDA through November 4, 2026.',
    },
    prepare: {
      heading: 'How to prepare for an inspection',
      intro: 'Based on the sections cited most often in Puerto Rico and on what FDA says about the 483, these are concrete points to check:',
      items: [
        { text: 'Pest control (21 CFR 117.35(c)): measures that keep pests out of manufacturing, packing and holding areas are effective, and pesticide use protects the food.' },
        { text: 'Storage and transport (21 CFR 117.93): conditions protect against contamination, allergen cross-contact and deterioration of food and containers.' },
        { text: 'Maintenance and sanitation (21 CFR 117.35(a) and 117.37): buildings in good repair, equipment cleaned and sanitized, safe water, adequate hand-washing and toilet facilities.' },
        { text: 'If your facility must have a food safety plan under part 117: the hazard analysis and preventive controls are written and implemented (21 CFR 117.130 and 117.135).' },
        { text: 'If you import food: you have an FSVP for each food you import (21 CFR 1.502).' },
        { text: 'If you receive a 483: respond in writing with your corrective action plan and put it in place expeditiously, as FDA recommends.' },
        { text: 'Review our answers, with official sources, on records and inspections.', link: { to: '/preguntas', label: 'See questions and guides' } },
        { text: 'See how ready your plant is with the free self-assessment.', link: { to: '/autoevaluacion', label: 'Take the self-assessment' } },
      ],
    },
    sourcesHeading: 'Official sources',
    method:
      'How we computed this: inspections from the FDA Data Dashboard with state PR and product type Food/Cosmetics, excluding the cosmetics project area; each inspection once, with its most serious classification. Citations from the Foods program for those same inspections. Recalls from openFDA with state:"PR". Aggregates only; we do not identify companies.',
  },
};

/**
 * Open items. Sections we could not build from reachable public data are listed here instead of
 * being estimated.
 */
export const INSPECTIONS_PR_TODOS: string[] = [
  'Warning letters to PR food firms: the fda.gov warning letters listing has no state/location field, so they cannot be counted without opening every letter. Option: query the Data Dashboard Compliance Actions page (datadashboard.fda.gov/oii/cd/complianceactions.htm) with the same console method and add a section.',
  'FDA Data Dashboard REST API (api-datadashboard.fda.gov) needs registered credentials (Authorization-User/Key). If the team wants an automated refresh, request a key through the OII Unified Logon; until then refresh by hand with scripts/data/fda-pr/dashboard-console-snippet.js.',
  'Re-pull after FY2026 classifications settle (only final classifications are published; FY2026 ended Sep 30, 2026, so its counts can still grow).',
  'Wire up: add the route (es + en) to AppRoutes, discoverable-routes (sitemap/llms.txt) and the prerender list; link to it from /preguntas or the inspections guide.',
  'Native-speaker review of the Spanish paraphrases of fda.gov / eCFR text (classification definitions, 483 FAQ, recall classes, CFR summaries).',
  'Optional: import refusals of PR-bound shipments (Data Dashboard Import Refusals) if relevant for exporters/buyers; not pulled.',
];
