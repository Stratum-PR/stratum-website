/**
 * Audit-readiness self-check (/autoevaluacion). Format ported from the product site's
 * self-check (LandingPage, branch archivo/landing-fsqms-2026-10): steps of questions,
 * each scored item worth 0–2 points, a tier and a to-do list with official sources.
 * Edit questions here; the page renders whatever this file defines.
 *
 * Reviewed November 7, 2026 against 21 CFR 1 and 117, FDA registration/attestation pages,
 * FSPCA and the SQF Food Safety Code. Keep wording evergreen (no hard-coded years): the FDA
 * registration renewal and qualified-facility attestation run Oct 1–Dec 31 of even years.
 * Items that don't apply to the business (see itemApplies) are hidden and left out of the score.
 */

export interface Bi {
  es: string;
  en: string;
}

/** A scored requirement. block: missing it keeps the result out of the top tier. */
export interface SelfcheckItem {
  block?: boolean;
  title: Bi;
  todo: Bi;
  url?: string;
  /** Anchor on /preguntas with the related answer */
  faq?: string;
}

export type Question =
  | { id: string; type: 'pick'; q: Bi; help?: Bi; opts: Bi[] } // not scored (context only)
  | { id: string; type: 'single'; item: string; q: Bi; help?: Bi; opts: { label: Bi; score: 0 | 1 | 2 }[] }
  | { id: string; type: 'multi'; q: Bi; help?: Bi; items: { item: string; label: Bi; sub?: Bi }[] }; // checked = 2 points

export interface Step {
  title: Bi;
  questions: Question[];
}

/** Answer indexes of the "business" and "sales" pick questions (keep in sync with STEPS). */
export const BUSINESS = { manufacturing: 0, farm: 1, distribution: 2, copacker: 3, retail: 4, other: 5 } as const;
export const SALES_UNDER_1M = 0;

export const ITEMS: Record<string, SelfcheckItem> = {
  cert: {
    title: { es: 'Certificación GFSI', en: 'GFSI certification' },
    todo: {
      es: 'Si vendes o quieres vender a cadenas, pregunta a tu comprador qué certificación piden (SQF, BRCGS u otra reconocida por GFSI).',
      en: 'If you sell or want to sell to retailers, ask your buyer which certification they require (SQF, BRCGS or another GFSI-recognized one).',
    },
    url: 'https://mygfsi.com/how-to-implement/certification/',
    faq: 'gfsi',
  },
  records: {
    title: { es: 'Registros confiables', en: 'Reliable records' },
    todo: {
      es: 'Llena cada registro en el momento, con valores reales, fecha (y hora cuando importe), iniciales o firma y el lote cuando aplique.',
      en: 'Fill in each record at the time, with actual values, the date (and time when it matters), initials or signature, and the lot where it applies.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.305',
    faq: 'registro-valido',
  },
  find: {
    title: { es: 'Encontrar registros rápido', en: 'Finding records fast' },
    todo: {
      es: 'Organiza los registros para encontrar cualquiera en minutos. Un auditor lo nota enseguida, y la FDA puede pedir los que guardas fuera de la planta en 24 horas.',
      en: 'Organize records so you can find any one in minutes. An auditor notices right away, and FDA can ask for records kept offsite within 24 hours.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.315',
    faq: 'documentos-auditor',
  },
  capa: {
    title: { es: 'Acciones correctivas con causa raíz', en: 'Corrective actions with root cause' },
    todo: {
      es: 'Documenta cada acción correctiva: qué pasó, la causa raíz, qué hiciste con el producto y cómo comprobaste que funcionó.',
      en: 'Document each corrective action: what happened, the root cause, what you did with the product, and how you checked it worked.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.150',
    faq: 'causa-raiz',
  },
  fda: {
    block: true,
    title: { es: 'Registro de la planta con la FDA', en: 'FDA facility registration' },
    todo: {
      es: 'Si tu planta fabrica, empaca o almacena alimentos para EE. UU., regístrala con la FDA y renueva cada año par entre el 1 de octubre y el 31 de diciembre. Las fincas y los negocios que venden mayormente directo al consumidor no se registran.',
      en: "If your plant makes, packs or holds food for the US, register it with FDA and renew it in every even-numbered year between October 1 and December 31. Farms and businesses that sell mostly direct to consumers don't register.",
    },
    url: 'https://www.fda.gov/food/online-registration-food-facilities/food-facility-registration-user-guide-biennial-registration-renewal',
  },
  pcqi: {
    block: true,
    title: { es: 'Plan de inocuidad (PCQI)', en: 'Food safety plan (PCQI)' },
    todo: {
      es: 'Si tu negocio no es muy pequeño, necesitas un plan de inocuidad escrito, preparado o supervisado por un PCQI. El curso de la FSPCA es la vía más común, pero no la única.',
      en: "Unless you're a very small business, you need a written food safety plan prepared or overseen by a PCQI. The FSPCA course is the most common route, but not the only one.",
    },
    url: 'https://www.fspca.net/pchf-pcqi-v2-0',
    faq: 'pchf',
  },
  attest: {
    block: true,
    title: { es: 'Atestación de instalación calificada', en: 'Qualified facility attestation' },
    todo: {
      es: 'Si promedias menos de ~$1 millón al año en ventas de alimentos (ajustado por inflación), eres instalación calificada: no necesitas el plan completo, pero debes presentar la atestación (Form FDA 3942a) cada año par entre octubre y diciembre, junto con la renovación del registro.',
      en: "If you average under ~$1 million a year in food sales (inflation-adjusted), you're a qualified facility: you don't need the full plan, but you must file the attestation (Form FDA 3942a) every even-numbered year, October to December, with your registration renewal.",
    },
    url: 'https://www.fda.gov/food/registration-food-facilities-and-other-submissions/qualified-facility-attestation',
    faq: 'pchf',
  },
  allergens: {
    block: true,
    title: { es: 'Control de alérgenos', en: 'Allergen control' },
    todo: {
      es: 'Verifica que cada etiqueta declare los 9 alérgenos principales que contiene. Si manejas alérgenos, evita el contacto cruzado y documenta cómo lo controlas.',
      en: 'Check that every label declares any of the 9 major allergens it contains. If you handle allergens, prevent cross-contact and document how you control it.',
    },
    url: 'https://www.fda.gov/food/food-allergensgluten-free-guidance-documents-regulatory-information/food-allergen-labeling-and-consumer-protection-act-2004-falcpa',
    faq: 'alergenos-etiqueta',
  },
  sanitation: {
    title: { es: 'Limpieza y sanitación con registros', en: 'Cleaning and sanitation with records' },
    todo: {
      es: 'Escribe tus procedimientos de limpieza y sanitación, incluidas las superficies en contacto con alimentos, y registra que se hicieron. SQF y la mayoría de los clientes lo exigen.',
      en: 'Write your cleaning and sanitation procedures, including food-contact surfaces, and record that they were done. SQF and most buyers require it.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.35',
  },
  training: {
    title: { es: 'Capacitación en higiene', en: 'Hygiene training' },
    todo: {
      es: 'Capacita en higiene e inocuidad a todo el personal que maneja alimentos, incluidos supervisores y temporeros, según su trabajo, y guarda los registros.',
      en: 'Train all staff who handle food, including supervisors and temporary workers, in hygiene and food safety as fits their job, and keep the records.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.4',
    faq: 'que-registros',
  },
  pests: {
    title: { es: 'Control de plagas', en: 'Pest control' },
    todo: {
      es: 'Mantén un programa de control de plagas, propio o contratado, y guarda los informes de servicio y el mapa de estaciones.',
      en: 'Keep a pest control program, in-house or contracted, and keep the service reports and the bait station map.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.35',
  },
  calibration: {
    title: { es: 'Calibración de instrumentos', en: 'Instrument calibration' },
    todo: {
      es: 'Calibra o verifica la exactitud de termómetros y demás instrumentos con una frecuencia definida, y guarda los registros.',
      en: 'Calibrate or check the accuracy of thermometers and other instruments on a set schedule, and keep the records.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.165',
  },
  internalAudit: {
    title: { es: 'Auditorías internas', en: 'Internal audits' },
    todo: {
      es: 'Haz auditorías internas por lo menos una vez al año para comprobar que la planta sigue sus procedimientos, y corrige lo que encuentres. SQF y BRCGS las exigen.',
      en: 'Run internal audits at least once a year to check that the plant follows its procedures, and fix what you find. SQF and BRCGS require them.',
    },
    url: 'https://www.sqfi.com/the-sqf-code/choose-your-code/library-of-codes/food-manufacturing',
    faq: 'tipos-auditoria',
  },
  recall: {
    title: { es: 'Plan de retiro y simulacro', en: 'Recall plan and mock recall' },
    todo: {
      es: 'Escribe tu plan de retiro y pruébalo por lo menos una vez al año rastreando un lote real de principio a fin.',
      en: 'Write your recall plan and test it at least once a year by tracing a real lot end to end.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.139',
  },
  sup: {
    title: { es: 'Suplidores aprobados', en: 'Approved suppliers' },
    todo: {
      es: 'Ten una lista de suplidores aprobados con especificaciones. Para los que controlan un peligro de tu materia prima, verifica según el riesgo (auditoría, pruebas o revisión de registros, como los COA).',
      en: 'Keep an approved supplier list with specifications. For suppliers that control a hazard in your ingredients, verify them by risk (audit, testing or record review, such as COAs).',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.410',
    faq: 'aprobar-suplidores',
  },
  trace: {
    block: true,
    title: { es: 'Rastreo de lotes', en: 'Lot tracing' },
    todo: {
      es: 'Anota de quién recibiste cada lote y a quién lo enviaste. La ley exige estos registros y la FDA los puede pedir en 24 horas. Si haces alimentos de la Lista de Trazabilidad, la regla FSMA 204 pide más datos.',
      en: 'Record who supplied each lot and who you shipped it to. The law requires these records, and FDA can request them within 24 hours. If you make Food Traceability List foods, the FSMA 204 rule requires more data.',
    },
    url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-J',
    faq: 'fsma204',
  },
  exp: {
    title: { es: 'Control de vencimientos', en: 'Expiration tracking' },
    todo: {
      es: 'Haz una lista de cada licencia, certificado y documento con su fecha de vencimiento, y pon alertas.',
      en: 'List every license, certificate and document with its expiration date, and set alerts.',
    },
  },
};

export const STEPS: Step[] = [
  {
    title: { es: 'Tu operación', en: 'Your operation' },
    questions: [
      {
        id: 'business',
        type: 'pick',
        q: { es: '¿Qué tipo de negocio tienes?', en: 'What kind of business do you have?' },
        opts: [
          { es: 'Manufactura o procesamiento de alimentos', en: 'Food manufacturing or processing' },
          { es: 'Agricultura, finca o pesca', en: 'Farming, agriculture or fishing' },
          { es: 'Distribución o importación', en: 'Distribution or import' },
          { es: 'Co-packer: manufacturo para otras marcas', en: 'Co-packer: I manufacture for other brands' },
          { es: 'Panadería o tienda que vende mayormente al consumidor', en: 'Bakery or shop selling mostly to consumers' },
          { es: 'Otro', en: 'Other' },
        ],
      },
      {
        // Size of the business. Under ~$1M a year in food sales (with affiliates, inflation-adjusted)
        // is FDA's "very small business" cut-off for qualified facilities (21 CFR 117.3).
        id: 'sales',
        type: 'pick',
        q: { es: '¿Cuánto venden en alimentos al año, aproximadamente?', en: 'About how much do you sell in food per year?' },
        help: { es: 'Incluye empresas afiliadas. Nos ayuda a mostrarte lo que aplica a tu tamaño.', en: 'Include affiliated companies. It helps us show what applies to your size.' },
        opts: [
          { es: 'Menos de $1 millón', en: 'Under $1 million' },
          { es: 'Entre $1 y $5 millones', en: '$1 to $5 million' },
          { es: 'Entre $5 y $20 millones', en: '$5 to $20 million' },
          { es: 'Más de $20 millones', en: 'Over $20 million' },
          { es: 'Prefiero no decir', en: 'Prefer not to say' },
        ],
      },
      {
        id: 'cert',
        type: 'single',
        item: 'cert',
        q: { es: '¿Tu planta tiene una certificación de inocuidad?', en: 'Does your plant have a food safety certification?' },
        opts: [
          { label: { es: 'Sí, SQF, BRCGS u otra reconocida por GFSI', en: 'Yes, SQF, BRCGS or another GFSI-recognized one' }, score: 2 },
          { label: { es: 'Está en proceso', en: 'In progress' }, score: 1 },
          { label: { es: 'No o no sé', en: 'No or not sure' }, score: 0 },
        ],
      },
    ],
  },
  {
    title: { es: 'Registros', en: 'Records' },
    questions: [
      {
        id: 'records',
        type: 'single',
        item: 'records',
        q: { es: '¿Cómo llevan los registros de inocuidad, como temperaturas y limpieza?', en: 'How do you keep food safety records, such as temperatures and cleaning?' },
        opts: [
          { label: { es: 'En un sistema digital, en el momento', en: 'In a digital system, at the time' }, score: 2 },
          { label: { es: 'En papel o Excel, siempre completos y en el momento', en: 'On paper or Excel, always complete and at the time' }, score: 2 },
          { label: { es: 'A veces se llenan después o quedan incompletos', en: 'Sometimes filled in later or left incomplete' }, score: 0 },
        ],
      },
      {
        id: 'find',
        type: 'single',
        item: 'find',
        q: {
          es: 'Si un auditor pide el registro de temperatura de un día del mes pasado, ¿cuánto tardas en encontrarlo?',
          en: 'If an auditor asks for the temperature record from a day last month, how long does it take to find it?',
        },
        opts: [
          { label: { es: 'Minutos', en: 'Minutes' }, score: 2 },
          { label: { es: 'Horas', en: 'Hours' }, score: 1 },
          { label: { es: 'Días o no sé', en: 'Days or not sure' }, score: 0 },
        ],
      },
      {
        id: 'capa',
        type: 'single',
        item: 'capa',
        q: { es: 'Cuando algo sale mal, ¿documentan la acción correctiva y su causa raíz?', en: 'When something goes wrong, do you document the corrective action and its root cause?' },
        opts: [
          { label: { es: 'Siempre', en: 'Always' }, score: 2 },
          { label: { es: 'A veces', en: 'Sometimes' }, score: 1 },
          { label: { es: 'No', en: 'No' }, score: 0 },
        ],
      },
    ],
  },
  {
    title: { es: 'Inocuidad', en: 'Food safety' },
    questions: [
      {
        id: 'safety',
        type: 'multi',
        q: { es: '¿Cuáles de estos tienes?', en: 'Which of these do you have?' },
        help: { es: 'Marca todos los que apliquen.', en: 'Select all that apply.' },
        items: [
          { item: 'fda', label: { es: 'Registro con la FDA, renovado en el último periodo', en: 'FDA registration, renewed in the latest period' } },
          { item: 'pcqi', label: { es: 'Plan de inocuidad preparado por un PCQI', en: 'Food safety plan prepared by a PCQI' } },
          { item: 'attest', label: { es: 'Atestación de instalación calificada a la FDA (Form 3942a), al día', en: 'Qualified facility attestation to FDA (Form 3942a), current' } },
          { item: 'allergens', label: { es: 'Etiquetas con alérgenos verificadas y control de contacto cruzado (o no manejo alérgenos)', en: "Allergen labels checked and cross-contact controlled (or I don't handle allergens)" } },
          { item: 'sanitation', label: { es: 'Programa de limpieza y sanitación, con registros', en: 'Cleaning and sanitation program, with records' } },
          { item: 'training', label: { es: 'Capacitación del personal en higiene, con registros', en: 'Staff hygiene training, with records' } },
          { item: 'pests', label: { es: 'Control de plagas, propio o contratado', en: 'Pest control, in-house or contracted' } },
          { item: 'calibration', label: { es: 'Termómetros e instrumentos calibrados o verificados, con registros', en: 'Thermometers and instruments calibrated or checked, with records' } },
          { item: 'internalAudit', label: { es: 'Auditorías internas, por lo menos una vez al año', en: 'Internal audits, at least once a year' } },
        ],
      },
      {
        id: 'recall',
        type: 'single',
        item: 'recall',
        q: { es: '¿Cómo está tu plan de retiro (recall)?', en: 'Where is your recall plan?' },
        opts: [
          { label: { es: 'Tengo plan e hice un simulacro en los últimos 12 meses', en: 'I have a plan and ran a mock recall in the last 12 months' }, score: 2 },
          { label: { es: 'Tengo plan, sin simulacro reciente', en: 'I have a plan, no recent mock recall' }, score: 1 },
          { label: { es: 'No tengo plan', en: 'No plan' }, score: 0 },
        ],
      },
    ],
  },
  {
    title: { es: 'Suplidores y trazabilidad', en: 'Suppliers and traceability' },
    questions: [
      {
        id: 'sup',
        type: 'single',
        item: 'sup',
        q: {
          es: '¿Tienes una lista de suplidores aprobados y sabes cuáles controlan un peligro por ti?',
          en: 'Do you have an approved supplier list and know which suppliers control a hazard for you?',
        },
        opts: [
          { label: { es: 'Sí, y los verifico y lo documento', en: 'Yes, and I verify and document them' }, score: 2 },
          { label: { es: 'Tengo la lista, sin verificación', en: 'I have the list, no verification' }, score: 1 },
          { label: { es: 'No o no sé', en: 'No or not sure' }, score: 0 },
        ],
      },
      {
        id: 'trace',
        type: 'single',
        item: 'trace',
        q: {
          es: 'Si te piden rastrear un lote, ¿cuánto te tomaría saber de dónde vino y a quién lo enviaste?',
          en: 'If you were asked to trace a lot, how long would it take to know where it came from and where it went?',
        },
        opts: [
          { label: { es: 'Menos de 24 horas', en: 'Under 24 hours' }, score: 2 },
          { label: { es: 'De 1 a 3 días', en: '1 to 3 days' }, score: 1 },
          { label: { es: 'Más tiempo o no sé', en: 'Longer or not sure' }, score: 0 },
        ],
      },
      {
        id: 'exp',
        type: 'single',
        item: 'exp',
        q: { es: '¿Cómo controlas cuándo vencen tus licencias, certificados y documentos?', en: 'How do you track when your licenses, certificates and documents expire?' },
        opts: [
          { label: { es: 'Sistema o calendario con alertas', en: 'A system or calendar with alerts' }, score: 2 },
          { label: { es: 'Excel o papel', en: 'Spreadsheet or paper' }, score: 1 },
          { label: { es: 'No lo controlo', en: "I don't track it" }, score: 0 },
        ],
      },
    ],
  },
];

/**
 * Whether an item applies, from the business type and food sales answers.
 * - Farms and businesses selling mostly to consumers (retail food establishments) don't register
 *   with FDA and aren't covered by the preventive controls rule (21 CFR 1.226, 117).
 * - Distributors/importers holding packaged food: no PCQI plan (117.7); allergen control is the maker's.
 * - Under ~$1M in food sales: qualified facility, so the attestation replaces the PCQI plan (117.5(a)).
 *   "Prefer not to say" or no answer keeps the PCQI plan.
 */
export function itemApplies(item: string, single: Record<string, number>): boolean {
  const business = single.business;
  const small = single.sales === SALES_UNDER_1M;
  const noRegistration = business === BUSINESS.farm || business === BUSINESS.retail;
  if (item === 'fda') return !noRegistration;
  if (item === 'pcqi') return !noRegistration && business !== BUSINESS.distribution && !small;
  if (item === 'attest') return !noRegistration && business !== BUSINESS.distribution && small;
  if (item === 'allergens') return business !== BUSINESS.distribution;
  return true;
}

export const TIERS = {
  ready: {
    label: { es: 'Bien encaminada', en: 'On track' },
    body: {
      es: 'Estás bien posicionado. Mantén todo al día; una autoevaluación no sustituye una auditoría.',
      en: "You're well positioned. Keep everything current; a self-check doesn't replace an audit.",
    },
  },
  close: { label: { es: 'Cerca', en: 'Close' }, body: { es: 'Te faltan puntos clave. Empieza por los marcados como prioridad.', en: "You're missing key points. Start with the ones marked priority." } },
  gaps: { label: { es: 'Brechas importantes', en: 'Significant gaps' }, body: { es: 'Tienes trabajo por delante, pero es alcanzable. Empieza por la lista de abajo.', en: "You have work ahead, but it's doable. Start with the list below." } },
} as const;

export type Tier = keyof typeof TIERS;

/** Items scored 0–2 from the answers so far, and the resulting tier. Items that don't apply are left out. */
export function scoreAnswers(single: Record<string, number>, multi: Record<string, boolean>) {
  const scores: Record<string, number> = {};
  for (const step of STEPS) {
    for (const q of step.questions) {
      if (q.type === 'single') scores[q.item] = single[q.id] != null ? q.opts[single[q.id]].score : 0;
      if (q.type === 'multi') for (const it of q.items) scores[it.item] = multi[it.item] ? 2 : 0;
    }
  }
  const keys = Object.keys(ITEMS).filter((k) => itemApplies(k, single));
  const points = keys.reduce((sum, k) => sum + (scores[k] ?? 0), 0);
  const max = keys.length * 2;
  const pct = Math.round((points * 100) / max);
  const blockers = keys.filter((k) => ITEMS[k].block && (scores[k] ?? 0) < 2).length;
  const tier: Tier = pct < 50 ? 'gaps' : pct >= 80 && blockers === 0 ? 'ready' : 'close';
  const pending = keys.filter((k) => (scores[k] ?? 0) < 2).sort((a, b) => Number(!!ITEMS[b].block) - Number(!!ITEMS[a].block));
  return { scores, points, max, pct, blockers, tier, pending, applicable: keys };
}
