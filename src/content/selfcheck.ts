/**
 * Audit-readiness self-check (/autoevaluacion). Format ported from the product site's
 * self-check (LandingPage, branch archivo/landing-fsqms-2026-10): steps of questions,
 * each scored item worth 0–2 points, a tier and a to-do list with official sources.
 * Edit questions here; the page renders whatever this file defines.
 */

export interface Bi {
  es: string;
  en: string;
}

/** A scored requirement. block: missing it keeps the result out of "ready". */
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
      es: 'Cada registro debe hacerse en el momento, con fecha, hora, firma o iniciales y el lote cuando aplique.',
      en: 'Every record must be made at the time, with date, time, signature or initials and the lot where it applies.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.305',
    faq: 'registro-valido',
  },
  find: {
    block: true,
    title: { es: 'Encontrar registros rápido', en: 'Finding records fast' },
    todo: {
      es: 'Organiza los registros para encontrar cualquiera en minutos. Es lo primero que nota un auditor o inspector.',
      en: 'Organize records so you can find any one in minutes. It is the first thing an auditor or inspector notices.',
    },
    faq: 'documentos-auditor',
  },
  capa: {
    title: { es: 'Acciones correctivas con causa raíz', en: 'Corrective actions with root cause' },
    todo: {
      es: 'Documenta cada acción correctiva con su causa raíz y la verificación de que funcionó.',
      en: 'Document every corrective action with its root cause and the check that it worked.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.190',
    faq: 'causa-raiz',
  },
  fda: {
    block: true,
    title: { es: 'Registro de la planta con la FDA', en: 'FDA facility registration' },
    todo: {
      es: 'Registra o renueva tu planta en el portal de la FDA. La renovación bienal está abierta del 1 de octubre al 31 de diciembre de 2026.',
      en: 'Register or renew your facility on the FDA portal. The biennial renewal runs October 1 to December 31, 2026.',
    },
    url: 'https://www.fda.gov/food/online-registration-food-facilities/food-facility-registration-user-guide-biennial-registration-renewal',
  },
  pcqi: {
    block: true,
    title: { es: 'Plan de inocuidad (PCQI)', en: 'Food safety plan (PCQI)' },
    todo: {
      es: 'El plan de inocuidad lo prepara o supervisa un PCQI. El curso de Controles Preventivos de la FSPCA es la vía más común.',
      en: 'The food safety plan is prepared or overseen by a PCQI. The FSPCA Preventive Controls course is the most common route.',
    },
    url: 'https://www.fspca.net',
    faq: 'pchf',
  },
  recall: {
    title: { es: 'Plan de retiro y simulacro', en: 'Recall plan and mock recall' },
    todo: {
      es: 'Escribe tu plan de retiro y haz un simulacro rastreando un lote real de principio a fin.',
      en: 'Write your recall plan and run a mock recall tracing a real lot end to end.',
    },
    url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food',
  },
  sup: {
    title: { es: 'Documentos de suplidores', en: 'Supplier documents' },
    todo: {
      es: 'Pide certificados y COA a cada suplidor, y aprueba y verifica a los que controlan peligros de tus materias primas.',
      en: 'Ask each supplier for certificates and COAs, and approve and verify those that control hazards in your raw materials.',
    },
    url: 'https://www.law.cornell.edu/cfr/text/21/117.410',
    faq: 'aprobar-suplidores',
  },
  trace: {
    block: true,
    title: { es: 'Rastreo de lotes', en: 'Lot tracing' },
    todo: {
      es: 'Registra qué lote recibiste de quién y a quién enviaste cada lote. La regla FSMA 204 pide entregar esos datos a la FDA en 24 horas.',
      en: 'Record which lot came from whom and where each lot went. The FSMA 204 rule asks for that data to reach the FDA within 24 hours.',
    },
    url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods',
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
          { es: 'Otro', en: 'Other' },
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
          { label: { es: 'En papel o Excel, siempre completos', en: 'On paper or Excel, always complete' }, score: 1 },
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
          { item: 'fda', label: { es: 'Registro de la planta con la FDA, al día', en: 'FDA facility registration, current' } },
          {
            item: 'pcqi',
            label: { es: 'Plan de inocuidad preparado por un PCQI', en: 'Food safety plan prepared by a PCQI' },
            sub: {
              es: 'Individuo Calificado en Controles Preventivos: completó el curso de la FSPCA o tiene experiencia equivalente.',
              en: 'Preventive Controls Qualified Individual: completed the FSPCA course or has equivalent experience.',
            },
          },
        ],
      },
      {
        id: 'recall',
        type: 'single',
        item: 'recall',
        q: { es: '¿Cómo está tu plan de retiro (recall)?', en: 'Where is your recall plan?' },
        opts: [
          { label: { es: 'Tengo plan e hice un simulacro este año', en: 'I have a plan and ran a mock recall this year' }, score: 2 },
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
        q: { es: '¿Cuántos de tus suplidores te han dado certificados y COA vigentes?', en: 'How many of your suppliers have given you current certificates and COAs?' },
        opts: [
          { label: { es: 'Todos', en: 'All of them' }, score: 2 },
          { label: { es: 'La mayoría', en: 'Most' }, score: 1 },
          { label: { es: 'Pocos, ninguno o no sé', en: 'Few, none or not sure' }, score: 0 },
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

export const TIERS = {
  ready: { label: { es: 'Lista para auditoría', en: 'Audit ready' }, body: { es: 'Estás bien posicionado. Mantén todo al día.', en: "You're well positioned. Keep everything current." } },
  close: { label: { es: 'Cerca', en: 'Close' }, body: { es: 'Te faltan puntos clave. Empieza por los marcados como prioridad.', en: "You're missing key points. Start with the ones marked priority." } },
  gaps: { label: { es: 'Brechas importantes', en: 'Significant gaps' }, body: { es: 'Tienes trabajo por delante, pero es alcanzable. Empieza por la lista de abajo.', en: "You have work ahead, but it's doable. Start with the list below." } },
} as const;

export type Tier = keyof typeof TIERS;

/** What we heard in Stratum PR's NSF I-Corps customer-discovery interviews. */
export const INSIGHTS: { pct: number; text: Bi }[] = [
  { pct: 81, text: { es: 'No están preparados para una auditoría', en: "Aren't ready for an audit" } },
  { pct: 73, text: { es: 'No pueden rastrear un lote rápidamente', en: "Can't trace a lot quickly" } },
  { pct: 64, text: { es: 'Manejan operaciones en Excel o papel', en: 'Run operations on Excel or paper' } },
  { pct: 52, text: { es: 'No tienen operaciones estandarizadas', en: "Don't have standardized operations" } },
  { pct: 37, text: { es: 'Sienten que no pueden escalar', en: "Feel they can't scale" } },
];

/** Items scored 0–2 from the answers so far, and the resulting tier. */
export function scoreAnswers(single: Record<string, number>, multi: Record<string, boolean>) {
  const scores: Record<string, number> = {};
  for (const step of STEPS) {
    for (const q of step.questions) {
      if (q.type === 'single') scores[q.item] = single[q.id] != null ? q.opts[single[q.id]].score : 0;
      if (q.type === 'multi') for (const it of q.items) scores[it.item] = multi[it.item] ? 2 : 0;
    }
  }
  const keys = Object.keys(ITEMS);
  const points = keys.reduce((sum, k) => sum + (scores[k] ?? 0), 0);
  const max = keys.length * 2;
  const pct = Math.round((points * 100) / max);
  const blockers = keys.filter((k) => ITEMS[k].block && (scores[k] ?? 0) < 2).length;
  const tier: Tier = pct < 50 ? 'gaps' : pct >= 80 && blockers === 0 ? 'ready' : 'close';
  const pending = keys.filter((k) => (scores[k] ?? 0) < 2).sort((a, b) => Number(!!ITEMS[b].block) - Number(!!ITEMS[a].block));
  return { scores, points, max, pct, blockers, tier, pending };
}
