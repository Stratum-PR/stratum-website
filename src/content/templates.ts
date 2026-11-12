/**
 * Free, printable food-safety record templates (blank forms), bilingual, at
 * /plantillas/<es slug> and /en/templates/<en slug>.
 *
 * Same rules as guides.ts and compliance-faq.ts: every regulatory statement in `lead`, `howTo` and
 * `notes` comes from the linked primary source (eCFR / LII text of 21 CFR, fda.gov), checked on
 * November 11, 2026 (eCFR "up to date as of" November 9, 2026). The forms themselves are blank;
 * their column headers follow the regulation's wording. No claims about what Stratum's software
 * does. Anything we could not verify against a primary source lives in TEMPLATES_TODOS.
 *
 * Slugs are permanent URLs: never change one after it ships (add a redirect in vercel.json).
 * The page template adds the CTA; do not add one here.
 */

export type TemplateLang = 'es' | 'en';

export interface TemplateSource { label: string; url: string }

export interface TemplateCopy {
  /** H1 */
  title: string;
  /** Short name for the spreadsheet tab of the downloadable .xlsx (<= 31 chars, none of : \ / ? * [ ]) */
  sheetName: string;
  /** <= 60 chars, ends with " | Stratum PR" */
  metaTitle: string;
  /** 140–160 chars */
  description: string;
  /** Direct answer, 2–3 sentences: what it is, who needs it, legal basis */
  lead: string;
  /** How to use the form, step by step */
  howTo: string[];
  /** Table headers of the blank form */
  columns: string[];
  /** Legal basis and practical notes (each one sourced) */
  notes: string[];
  /** Optional first-column values printed in the form (e.g. the actions a recall plan must cover) */
  prefilledRows?: string[];
  /** Sign-off lines printed under the table */
  signoff: string[];
}

export interface Template {
  id: string;
  /** Permanent URL slugs */
  slug: { es: string; en: string };
  es: TemplateCopy;
  en: TemplateCopy;
  sources: TemplateSource[];
  /** Number of blank rows in the printable form */
  rowsToPrint: number;
  /** Wide forms print in landscape */
  orientation: 'portrait' | 'landscape';
}

export const TEMPLATES_VERIFIED_ON: Record<TemplateLang, string> = {
  es: '11 de noviembre de 2026',
  en: 'November 11, 2026',
};

export const TEMPLATES_INDEX_PATH: Record<TemplateLang, string> = { es: '/plantillas', en: '/en/templates' };

export function templatePath(t: Template, lang: TemplateLang): string {
  return lang === 'en' ? `/en/templates/${t.slug.en}` : `/plantillas/${t.slug.es}`;
}

export type TemplateFileType = 'pdf' | 'xlsx';

/**
 * Public path of a downloadable file. The files are generated at build time from this module by
 * scripts/generate-template-files.ts (into dist/descargas and dist/downloads), never committed.
 */
export function templateDownloadPath(t: Template, lang: TemplateLang, type: TemplateFileType): string {
  return lang === 'en' ? `/downloads/${t.slug.en}.${type}` : `/descargas/plantilla-${t.slug.es}.${type}`;
}

/** Finds a template by either language's slug. */
export function templateBySlug(slug: string | undefined): Template | undefined {
  if (!slug) return undefined;
  return TEMPLATES.find((t) => t.slug.es === slug || t.slug.en === slug);
}

const SRC = {
  cfr117_5: { label: '21 CFR 117.5 (exenciones / exemptions)', url: 'https://www.law.cornell.edu/cfr/text/21/117.5' },
  cfr117_135: { label: '21 CFR 117.135 (controles preventivos / preventive controls)', url: 'https://www.law.cornell.edu/cfr/text/21/117.135' },
  cfr117_139: { label: '21 CFR 117.139 (plan de retiro / recall plan)', url: 'https://www.law.cornell.edu/cfr/text/21/117.139' },
  cfr117_145: { label: '21 CFR 117.145 (monitoreo / monitoring)', url: 'https://www.law.cornell.edu/cfr/text/21/117.145' },
  cfr117_150: { label: '21 CFR 117.150 (acciones correctivas / corrective actions)', url: 'https://www.law.cornell.edu/cfr/text/21/117.150' },
  cfr117_165: { label: '21 CFR 117.165 (verificación / verification)', url: 'https://www.law.cornell.edu/cfr/text/21/117.165' },
  cfr117_190: { label: '21 CFR 117.190 (registros requeridos / required records)', url: 'https://www.law.cornell.edu/cfr/text/21/117.190' },
  cfr117_305: { label: '21 CFR 117.305 (requisitos de los registros / record requirements)', url: 'https://www.law.cornell.edu/cfr/text/21/117.305' },
  cfr117_315: { label: '21 CFR 117.315 (retención / retention)', url: 'https://www.law.cornell.edu/cfr/text/21/117.315' },
  cfr1_1310: { label: '21 CFR 1.1310 (definiciones / definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/1.1310' },
  cfr1_1340: { label: '21 CFR 1.1340 (envío / shipping)', url: 'https://www.law.cornell.edu/cfr/text/21/1.1340' },
  cfr1_1345: { label: '21 CFR 1.1345 (recibo / receiving)', url: 'https://www.law.cornell.edu/cfr/text/21/1.1345' },
  cfr1_1455: { label: '21 CFR 1.1455 (formato, 24 horas y retención / format, 24 hours, retention)', url: 'https://www.law.cornell.edu/cfr/text/21/1.1455' },
  ftl: { label: 'FDA: Food Traceability List', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/food-traceability-list' },
  ftr: { label: 'FDA: Food Traceability Rule (FSMA 204)', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods' },
} satisfies Record<string, TemplateSource>;

// Notes shared by the two Part 117 monitoring logs (all from 117.305, 117.315, 117.165)
const PART117_RECORD_NOTES = {
  es: [
    'Todo registro de la Parte 117 debe incluir información para identificar la planta (nombre y, cuando sea necesario, la ubicación), la fecha y, cuando corresponda, la hora de la actividad, la firma o iniciales de quien la realiza y, donde corresponda, el producto y el código de lote (21 CFR 117.305(f)).',
    'El registro debe tener los valores y observaciones reales obtenidos durante el monitoreo, ser exacto, indeleble y legible, y crearse al mismo tiempo que se realiza la actividad (21 CFR 117.305(b) a (d)). Escribe a tinta, no a lápiz, y no lo llenes al final del turno de memoria.',
    'Los registros de monitoreo y de acciones correctivas deben revisarse dentro de 7 días laborables después de creados, por un individuo calificado en controles preventivos (PCQI) o bajo su supervisión, o en un plazo razonable si el PCQI justifica por escrito un plazo mayor (21 CFR 117.165(a)(4)(i)).',
    'Guarda los registros en la planta por lo menos 2 años después de la fecha en que se prepararon. Pueden guardarse fuera de la planta (excepto el plan de inocuidad) si se pueden traer en 24 horas cuando se piden para revisión oficial; los registros electrónicos accesibles desde la planta cuentan como que están en la planta (21 CFR 117.315(a)(1) y (c)).',
  ],
  en: [
    'Every Part 117 record must include information to identify the plant or facility (name and, when necessary, location), the date and, when appropriate, the time of the activity, the signature or initials of the person performing it and, where appropriate, the product identity and lot code (21 CFR 117.305(f)).',
    'The record must contain the actual values and observations obtained during monitoring, be accurate, indelible and legible, and be created concurrently with the activity (21 CFR 117.305(b) through (d)). Write in ink, not pencil, and do not fill it in from memory at the end of the shift.',
    'Monitoring and corrective action records must be reviewed within 7 working days after they are created, by (or under the oversight of) a preventive controls qualified individual (PCQI), or within a reasonable timeframe if the PCQI prepares a written justification for a longer one (21 CFR 117.165(a)(4)(i)).',
    'Keep the records at the facility for at least 2 years after the date they were prepared. They may be stored offsite (except the food safety plan) if they can be retrieved and provided onsite within 24 hours of a request for official review; electronic records accessible from an onsite location count as onsite (21 CFR 117.315(a)(1) and (c)).',
  ],
};

// Notes shared by the two FSMA 204 sheets (all from 1.1310, 1.1455 and the FDA FTL page)
const FSMA204_NOTES = {
  es: [
    '"Descripción de ubicación" significa: nombre del negocio, teléfono, dirección física (o coordenadas geográficas), ciudad, estado y código postal; para lugares en el extranjero, información comparable incluyendo el país (21 CFR 1.1310).',
    '"Descripción del producto" incluye el nombre del producto (y, si aplica, la marca, el producto básico y la variedad), el tamaño y el estilo del empaque (21 CFR 1.1310).',
    'Los tipos de documento de referencia incluyen, entre otros, conocimientos de embarque (bills of lading), órdenes de compra, avisos de envío anticipado, órdenes de trabajo, facturas, registros de bases de datos, registros de lote o producción, etiquetas de campo, certificados de captura y recibos (21 CFR 1.1310).',
    'En vez de la descripción de ubicación de la fuente del código de lote, puedes anotar una "referencia de la fuente del código de lote", por ejemplo el número de registro de la FDA (Food Facility Registration) de esa fuente o una dirección web que le dé a la FDA la descripción de ubicación (21 CFR 1.1310).',
    'Guarda estos registros por 2 años desde que los creaste u obtuviste. La FDA puede pedirlos y debes entregarlos dentro de 24 horas (o en un plazo razonable que la FDA acepte); en un brote, retiro u otra amenaza a la salud pública, la información de recibo y envío se entrega en una hoja de cálculo electrónica que se pueda ordenar, salvo las excepciones para negocios pequeños de la regla (21 CFR 1.1455(c) y (d)).',
    'No tienes que duplicar registros que ya llevas (por ejemplo, facturas o conduces) si contienen la información requerida; puedes complementarlos con lo que les falte (21 CFR 1.1455(f)). Si los registros están en otro idioma, debes dar una traducción al inglés dentro de un tiempo razonable si la FDA la pide (21 CFR 1.1455(c)(4)).',
  ],
  en: [
    '"Location description" means the business name, phone number, physical location address (or geographic coordinates), and city, state and zip code for domestic locations, and comparable information for foreign locations, including country (21 CFR 1.1310).',
    '"Product description" includes the product name (including, if applicable, the brand name, commodity and variety), packaging size and packaging style (21 CFR 1.1310).',
    'Reference document types include, but are not limited to, bills of lading, purchase orders, advance shipping notices, work orders, invoices, database records, batch logs, production logs, field tags, catch certificates and receipts (21 CFR 1.1310).',
    'Instead of the location description of the traceability lot code source, you can record a "traceability lot code source reference", for example the FDA Food Facility Registration Number of that source or a web address that gives FDA its location description (21 CFR 1.1310).',
    'Keep these records for 2 years from the date you created or obtained them. FDA can request them and you must provide them within 24 hours (or a reasonable time FDA agrees to); during an outbreak, recall or other public health threat, receiving and shipping information is provided as an electronic sortable spreadsheet, except for the rule\'s small-business exceptions (21 CFR 1.1455(c) and (d)).',
    'You do not need to duplicate records you already keep (for example, invoices or bills of lading) if they contain the required information; you may supplement them with what is missing (21 CFR 1.1455(f)). If records are kept in another language, you must provide an English translation within a reasonable time if FDA requests it (21 CFR 1.1455(c)(4)).',
  ],
};

export const TEMPLATES: Template[] = [
  {
    id: 'pc-monitoring',
    slug: { es: 'registro-monitoreo-haccp', en: 'haccp-monitoring-log' },
    rowsToPrint: 15,
    orientation: 'landscape',
    es: {
      title: 'Plantilla de registro de monitoreo HACCP y controles preventivos',
      sheetName: 'Monitoreo HACCP',
      metaTitle: 'Plantilla registro de monitoreo HACCP | Stratum PR',
      description:
        'Plantilla gratis para imprimir: registro de monitoreo de un punto crítico de control o control preventivo, con lo que exigen 21 CFR 117.145 y 117.305.',
      lead:
        'Es la hoja donde anotas, cada vez que lo verificas, el valor real de un punto crítico de control (PCC) o de otro control preventivo, como una temperatura de cocción o de refrigeración. La necesitan las plantas sujetas a la regla de controles preventivos de la FDA (21 CFR 117, subparte C), que exige documentar el monitoreo de los controles preventivos (21 CFR 117.145(c) y 117.190(a)(2)). Las columnas siguen lo que todo registro de esa regla debe incluir (21 CFR 117.305).',
      howTo: [
        'Usa una hoja por cada control preventivo o PCC. Escribe arriba el nombre de la planta, su ubicación, el producto y el período que cubre la hoja.',
        'Copia de tu plan de inocuidad el parámetro que se controla y el límite (valor mínimo o máximo); los controles de proceso deben incluir esos parámetros y valores (21 CFR 117.135(c)(1)).',
        'Monitorea con la frecuencia que dice tu procedimiento escrito y anota el valor real en el momento, con fecha, hora e iniciales (21 CFR 117.145(a) y 117.305).',
        'Si un valor está fuera del límite, anota la acción correctiva o corrección y documéntala en tu registro de acciones correctivas (21 CFR 117.150(d)).',
        'Entrega la hoja para revisión: quien revisa firma y pone la fecha en la línea de verificación (21 CFR 117.165(a)(4)(i)).',
      ],
      columns: [
        'Fecha',
        'Hora',
        'Control preventivo / PCC',
        'Parámetro y límite',
        'Valor real observado',
        '¿Dentro del límite? (Sí/No)',
        'Producto y código de lote',
        'Acción correctiva o corrección',
        'Iniciales',
      ],
      notes: [
        'La regla de la FDA llama "controles preventivos" a lo que muchos conocen como HACCP; incluye los controles en puntos críticos de control, si hay alguno, y otros controles apropiados para la inocuidad (21 CFR 117.135(a)(2)).',
        'Si tu actividad está sujeta a las reglas HACCP de pescados y mariscos (21 CFR 123) o de jugos (21 CFR 120) y las cumples, las subpartes C y G de la Parte 117 no aplican a esa actividad (21 CFR 117.5(b) y (c)).',
        'Para la temperatura de refrigeración de alimentos que necesitan control de tiempo y temperatura, el registro puede ser afirmativo (muestra que la temperatura está controlada) o de excepción (muestra cuando se perdió el control) (21 CFR 117.145(c)(2)).',
        ...PART117_RECORD_NOTES.es,
      ],
      signoff: ['Monitoreado por (nombre)', 'Revisado por (PCQI o bajo su supervisión): firma y fecha'],
    },
    en: {
      title: 'HACCP and preventive control monitoring log template',
      sheetName: 'HACCP monitoring log',
      metaTitle: 'HACCP monitoring log template (free) | Stratum PR',
      description:
        'Free printable template: monitoring log for a critical control point or preventive control, built on what 21 CFR 117.145 and 117.305 require of records.',
      lead:
        'This is the sheet where you write down, every time you check it, the actual value of a critical control point (CCP) or other preventive control, such as a cooking or refrigeration temperature. Facilities subject to FDA\'s preventive controls rule (21 CFR 117, subpart C) need it, because the rule requires them to document the monitoring of preventive controls (21 CFR 117.145(c) and 117.190(a)(2)). The columns follow what every record under that rule must include (21 CFR 117.305).',
      howTo: [
        'Use one sheet per preventive control or CCP. At the top, write the facility name, its location, the product and the period the sheet covers.',
        'Copy the controlled parameter and the limit (minimum or maximum value) from your food safety plan; process controls must include those parameters and values (21 CFR 117.135(c)(1)).',
        'Monitor at the frequency your written procedure sets and record the actual value at the time, with date, time and initials (21 CFR 117.145(a) and 117.305).',
        'If a value is outside the limit, write the corrective action or correction and document it in your corrective action record (21 CFR 117.150(d)).',
        'Hand the sheet in for review: the reviewer signs and dates the verification line (21 CFR 117.165(a)(4)(i)).',
      ],
      columns: [
        'Date',
        'Time',
        'Preventive control / CCP',
        'Parameter and limit',
        'Actual value observed',
        'Within limit? (Y/N)',
        'Product and lot code',
        'Corrective action or correction',
        'Initials',
      ],
      notes: [
        'FDA\'s rule calls "preventive controls" what many know as HACCP; they include controls at critical control points, if there are any, and other controls appropriate for food safety (21 CFR 117.135(a)(2)).',
        'If your activity is subject to the seafood HACCP rule (21 CFR 123) or the juice HACCP rule (21 CFR 120) and you comply with it, subparts C and G of Part 117 do not apply to that activity (21 CFR 117.5(b) and (c)).',
        'For refrigeration temperature of food that needs time/temperature control, the record may be affirmative (showing temperature is controlled) or an exception record (showing loss of control) (21 CFR 117.145(c)(2)).',
        ...PART117_RECORD_NOTES.en,
      ],
      signoff: ['Monitored by (name)', 'Reviewed by (PCQI or under PCQI oversight): signature and date'],
    },
    sources: [SRC.cfr117_135, SRC.cfr117_145, SRC.cfr117_150, SRC.cfr117_165, SRC.cfr117_190, SRC.cfr117_305, SRC.cfr117_315, SRC.cfr117_5],
  },
  {
    id: 'sanitation-monitoring',
    slug: { es: 'registro-monitoreo-saneamiento', en: 'sanitation-monitoring-log' },
    rowsToPrint: 15,
    orientation: 'landscape',
    es: {
      title: 'Plantilla de registro de monitoreo de saneamiento (SSOP)',
      sheetName: 'Monitoreo de saneamiento',
      metaTitle: 'Plantilla registro de saneamiento SSOP | Stratum PR',
      description:
        'Plantilla gratis para imprimir: registro de monitoreo de controles de saneamiento (SSOP) por área y superficie, basado en 21 CFR 117.135(c)(3) y 117.145.',
      lead:
        'Es la hoja donde anotas que verificaste la limpieza de las superficies que tocan el alimento y la prevención del contacto cruzado con alérgenos y de la contaminación cruzada, área por área. La necesitan las plantas sujetas a la regla de controles preventivos de la FDA cuando su plan de inocuidad identifica controles de saneamiento (21 CFR 117.135(c)(3)). Como todo control preventivo, su monitoreo debe documentarse (21 CFR 117.145(c)).',
      howTo: [
        'Escribe arriba el nombre de la planta, su ubicación, el área o línea y el período que cubre la hoja.',
        'Lista cada equipo, utensilio o superficie que tu procedimiento de saneamiento indica revisar.',
        'En cada revisión, anota qué verificaste, cómo (por ejemplo, inspección visual o una prueba) y el resultado real que observaste, con fecha, hora e iniciales (21 CFR 117.305).',
        'Si algo no está aceptable, anota la corrección que hiciste (por ejemplo, volver a limpiar) antes de seguir produciendo.',
        'Entrega la hoja para revisión: quien revisa firma y pone la fecha en la línea de verificación (21 CFR 117.165(a)(4)(i)).',
      ],
      columns: [
        'Fecha',
        'Hora',
        'Área / equipo / superficie',
        'Qué se verificó (limpieza de superficie de contacto; alérgenos; contaminación cruzada)',
        'Método (visual, prueba)',
        'Resultado observado',
        'Aceptable (Sí/No)',
        'Corrección tomada',
        'Iniciales',
      ],
      notes: [
        'Los controles de saneamiento deben incluir, según la planta y el alimento, procedimientos para (i) la limpieza de las superficies de contacto con alimentos, incluidos utensilios y equipo, y (ii) la prevención del contacto cruzado con alérgenos y de la contaminación cruzada desde objetos insalubres y desde el personal hacia el alimento, el material de empaque y otras superficies de contacto, y desde producto crudo a producto procesado (21 CFR 117.135(c)(3)).',
        'Si corriges a tiempo una condición que no cumple con esos controles de saneamiento, no tienes que seguir el procedimiento completo de acción correctiva; pero las correcciones se documentan en registros cuando sea apropiado (21 CFR 117.150(c)(1) y (d)).',
        'Fuera del monitoreo de temperatura de refrigeración, los registros de excepción pueden ser adecuados en algunas circunstancias (21 CFR 117.145(c)(2)(ii)).',
        ...PART117_RECORD_NOTES.es,
      ],
      signoff: ['Monitoreado por (nombre)', 'Revisado por (PCQI o bajo su supervisión): firma y fecha'],
    },
    en: {
      title: 'Sanitation (SSOP) monitoring log template',
      sheetName: 'Sanitation monitoring log',
      metaTitle: 'Sanitation SSOP monitoring log template | Stratum PR',
      description:
        'Free printable template: sanitation control (SSOP) monitoring log by area and surface, based on 21 CFR 117.135(c)(3) and 117.145 record requirements.',
      lead:
        'This is the sheet where you record, area by area, that you checked the cleanliness of food-contact surfaces and the prevention of allergen cross-contact and cross-contamination. Facilities subject to FDA\'s preventive controls rule need it when their food safety plan identifies sanitation controls (21 CFR 117.135(c)(3)). Like any preventive control, its monitoring must be documented (21 CFR 117.145(c)).',
      howTo: [
        'At the top, write the facility name, its location, the area or line and the period the sheet covers.',
        'List each piece of equipment, utensil or surface your sanitation procedure says to check.',
        'At each check, write what you checked, how (for example, visual inspection or a test) and the actual result you observed, with date, time and initials (21 CFR 117.305).',
        'If something is not acceptable, write the correction you made (for example, re-cleaning) before production continues.',
        'Hand the sheet in for review: the reviewer signs and dates the verification line (21 CFR 117.165(a)(4)(i)).',
      ],
      columns: [
        'Date',
        'Time',
        'Area / equipment / surface',
        'What was checked (food-contact surface cleanliness; allergens; cross-contamination)',
        'Method (visual, test)',
        'Result observed',
        'Acceptable (Y/N)',
        'Correction taken',
        'Initials',
      ],
      notes: [
        'Sanitation controls must include, as appropriate to the facility and the food, procedures for (i) the cleanliness of food-contact surfaces, including utensils and equipment, and (ii) the prevention of allergen cross-contact and cross-contamination from insanitary objects and from personnel to food, food packaging material and other food-contact surfaces, and from raw product to processed product (21 CFR 117.135(c)(3)).',
        'If you take timely action to correct a condition that is not consistent with those sanitation controls, you do not need to follow the full corrective action procedure; but corrections are documented in records when appropriate (21 CFR 117.150(c)(1) and (d)).',
        'Outside refrigeration temperature monitoring, exception records may be adequate in some circumstances (21 CFR 117.145(c)(2)(ii)).',
        ...PART117_RECORD_NOTES.en,
      ],
      signoff: ['Monitored by (name)', 'Reviewed by (PCQI or under PCQI oversight): signature and date'],
    },
    sources: [SRC.cfr117_135, SRC.cfr117_145, SRC.cfr117_150, SRC.cfr117_165, SRC.cfr117_305, SRC.cfr117_315],
  },
  {
    id: 'fsma204-receiving',
    slug: { es: 'fsma-204-registro-de-recibo', en: 'fsma-204-receiving-log' },
    rowsToPrint: 12,
    orientation: 'landscape',
    es: {
      title: 'Plantilla FSMA 204: registro de recibo con los datos clave (KDE)',
      sheetName: 'FSMA 204 - Recibo',
      metaTitle: 'Plantilla FSMA 204: registro de recibo (KDE) | Stratum PR',
      description:
        'Plantilla gratis para imprimir con los 8 datos clave (KDE) que exige 21 CFR 1.1345 al recibir un alimento de la Lista de Trazabilidad de la FDA (FSMA 204).',
      lead:
        'Es la hoja donde anotas los datos clave (KDE) de cada lote de trazabilidad que recibes de un alimento de la Lista de Trazabilidad de la FDA. La necesitan quienes reciben esos alimentos y están sujetos a la regla de trazabilidad (FSMA 204). Las 8 columnas son exactamente los datos que exige 21 CFR 1.1345(a).',
      howTo: [
        'Confirma primero si el alimento está en la Lista de Trazabilidad de la FDA; la lista incluye también alimentos que contienen un alimento de la lista como ingrediente, si ese ingrediente sigue en la misma forma (por ejemplo, fresco) (21 CFR 1.1310).',
        'Llena una línea por cada lote de trazabilidad que recibes y enlaza la línea con ese lote (21 CFR 1.1345(a)).',
        'Copia el código de lote de trazabilidad y la información de la fuente que te envió tu suplidor; quien envía debe darte los datos (a)(1) a (a)(7) de 21 CFR 1.1340 (21 CFR 1.1340(b)).',
        'Si el suplidor no está sujeto a la regla, tú debes asignar el código de lote de trazabilidad si no tiene uno (excepto establecimientos de venta al detal y restaurantes), y el lugar donde recibiste el alimento pasa a ser la fuente del código de lote (21 CFR 1.1345(b)).',
        'Anota el tipo y el número del documento de referencia (por ejemplo, factura o conocimiento de embarque) para poder encontrarlo rápido.',
      ],
      columns: [
        'Código de lote de trazabilidad',
        'Cantidad y unidad de medida',
        'Descripción del producto',
        'Fuente inmediata anterior (descripción de ubicación; no el transportista)',
        'Dónde se recibió (descripción de ubicación)',
        'Fecha de recibo',
        'Fuente del código de lote (descripción de ubicación) o referencia de la fuente',
        'Tipo y número de documento de referencia',
      ],
      notes: [
        'Los 8 datos de recibo son: (1) código de lote de trazabilidad; (2) cantidad y unidad de medida (por ejemplo, 6 cajas o 200 libras); (3) descripción del producto; (4) descripción de ubicación de la fuente inmediata anterior, que no sea un transportista; (5) descripción de ubicación de donde se recibió; (6) fecha de recibo; (7) descripción de ubicación de la fuente del código de lote, o la referencia de esa fuente; y (8) tipo y número del documento de referencia (21 CFR 1.1345(a)).',
        'La sección no aplica al recibo de un producto agrícola crudo antes de su empaque inicial (si no viene de un barco pesquero), ni al primer receptor en tierra de un alimento que viene de un barco pesquero (21 CFR 1.1345(c)).',
        ...FSMA204_NOTES.es,
      ],
      signoff: ['Recibido por (nombre e iniciales)', 'Revisado por: firma y fecha'],
    },
    en: {
      title: 'FSMA 204 template: receiving log with key data elements (KDEs)',
      sheetName: 'FSMA 204 receiving log',
      metaTitle: 'FSMA 204 receiving KDE log template | Stratum PR',
      description:
        'Free printable template with the 8 key data elements (KDEs) 21 CFR 1.1345 requires when you receive a food on FDA\'s Food Traceability List (FSMA 204).',
      lead:
        'This is the sheet where you record the key data elements (KDEs) for each traceability lot you receive of a food on FDA\'s Food Traceability List. Anyone who receives those foods and is subject to the traceability rule (FSMA 204) needs it. The 8 columns are exactly the information 21 CFR 1.1345(a) requires.',
      howTo: [
        'First confirm the food is on FDA\'s Food Traceability List; the list also covers foods that contain a listed food as an ingredient, if that ingredient stays in the same form (for example, fresh) (21 CFR 1.1310).',
        'Fill in one line per traceability lot you receive and link the line to that lot (21 CFR 1.1345(a)).',
        'Copy the traceability lot code and source information your supplier sent; the shipper must give you items (a)(1) through (a)(7) of 21 CFR 1.1340 (21 CFR 1.1340(b)).',
        'If the supplier is not subject to the rule, you must assign a traceability lot code if none has been assigned (except retail food establishments and restaurants), and the place where you received the food becomes the traceability lot code source (21 CFR 1.1345(b)).',
        'Record the reference document type and number (for example, invoice or bill of lading) so you can find it fast.',
      ],
      columns: [
        'Traceability lot code',
        'Quantity and unit of measure',
        'Product description',
        'Immediate previous source (location description; not the transporter)',
        'Where received (location description)',
        'Date received',
        'Traceability lot code source (location description) or source reference',
        'Reference document type and number',
      ],
      notes: [
        'The 8 receiving elements are: (1) traceability lot code; (2) quantity and unit of measure (for example, 6 cases or 200 pounds); (3) product description; (4) location description of the immediate previous source, other than a transporter; (5) location description of where the food was received; (6) date received; (7) location description of the traceability lot code source, or the traceability lot code source reference; and (8) reference document type and reference document number (21 CFR 1.1345(a)).',
        'The section does not apply to receipt of a raw agricultural commodity before it is initially packed (if not obtained from a fishing vessel), or to receipt by the first land-based receiver of food obtained from a fishing vessel (21 CFR 1.1345(c)).',
        ...FSMA204_NOTES.en,
      ],
      signoff: ['Received by (name and initials)', 'Reviewed by: signature and date'],
    },
    sources: [SRC.cfr1_1345, SRC.cfr1_1340, SRC.cfr1_1310, SRC.cfr1_1455, SRC.ftl, SRC.ftr],
  },
  {
    id: 'fsma204-shipping',
    slug: { es: 'fsma-204-registro-de-envio', en: 'fsma-204-shipping-log' },
    rowsToPrint: 12,
    orientation: 'landscape',
    es: {
      title: 'Plantilla FSMA 204: registro de envío con los datos clave (KDE)',
      sheetName: 'FSMA 204 - Envío',
      metaTitle: 'Plantilla FSMA 204: registro de envío (KDE) | Stratum PR',
      description:
        'Plantilla gratis para imprimir con los 8 datos clave (KDE) que exige 21 CFR 1.1340 al enviar un alimento de la Lista de Trazabilidad de la FDA (FSMA 204).',
      lead:
        'Es la hoja donde anotas los datos clave (KDE) de cada lote de trazabilidad que envías de un alimento de la Lista de Trazabilidad de la FDA. La necesitan quienes envían esos alimentos y están sujetos a la regla de trazabilidad (FSMA 204). Las 8 columnas son exactamente los datos que exige 21 CFR 1.1340(a), y los primeros 7 se le deben entregar a quien recibe el alimento (21 CFR 1.1340(b)).',
      howTo: [
        'Confirma primero si el alimento está en la Lista de Trazabilidad de la FDA (21 CFR 1.1310).',
        'Llena una línea por cada lote de trazabilidad que envías y enlaza la línea con ese lote (21 CFR 1.1340(a)).',
        'Entrega al receptor inmediato siguiente (que no sea el transportista) los datos de las columnas 1 a 7, en papel, de forma electrónica u otra forma escrita (21 CFR 1.1340(b)). El tipo y número del documento de referencia (columna 8) se guarda, pero no hay que entregarlo.',
        'Anota el tipo y el número del documento de referencia (por ejemplo, conduce, factura o conocimiento de embarque) para poder encontrarlo rápido.',
      ],
      columns: [
        'Código de lote de trazabilidad',
        'Cantidad y unidad de medida',
        'Descripción del producto',
        'Receptor inmediato siguiente (descripción de ubicación; no el transportista)',
        'Desde dónde se envió (descripción de ubicación)',
        'Fecha de envío',
        'Fuente del código de lote (descripción de ubicación) o referencia de la fuente',
        'Tipo y número de documento de referencia',
      ],
      notes: [
        'Los 8 datos de envío son: (1) código de lote de trazabilidad; (2) cantidad y unidad de medida (por ejemplo, 6 cajas o 200 libras); (3) descripción del producto; (4) descripción de ubicación del receptor inmediato siguiente, que no sea un transportista; (5) descripción de ubicación desde donde enviaste; (6) fecha de envío; (7) descripción de ubicación de la fuente del código de lote, o la referencia de esa fuente; y (8) tipo y número del documento de referencia (21 CFR 1.1340(a)).',
        'La sección no aplica al envío de un producto agrícola crudo antes de su empaque inicial, si no viene de un barco pesquero (21 CFR 1.1340(c)).',
        ...FSMA204_NOTES.es,
      ],
      signoff: ['Enviado por (nombre e iniciales)', 'Revisado por: firma y fecha'],
    },
    en: {
      title: 'FSMA 204 template: shipping log with key data elements (KDEs)',
      sheetName: 'FSMA 204 shipping log',
      metaTitle: 'FSMA 204 shipping KDE log template | Stratum PR',
      description:
        'Free printable template with the 8 key data elements (KDEs) 21 CFR 1.1340 requires when you ship a food on FDA\'s Food Traceability List (FSMA 204).',
      lead:
        'This is the sheet where you record the key data elements (KDEs) for each traceability lot you ship of a food on FDA\'s Food Traceability List. Anyone who ships those foods and is subject to the traceability rule (FSMA 204) needs it. The 8 columns are exactly the information 21 CFR 1.1340(a) requires, and the first 7 must be provided to whoever receives the food (21 CFR 1.1340(b)).',
      howTo: [
        'First confirm the food is on FDA\'s Food Traceability List (21 CFR 1.1310).',
        'Fill in one line per traceability lot you ship and link the line to that lot (21 CFR 1.1340(a)).',
        'Provide the immediate subsequent recipient (other than a transporter) with columns 1 through 7, in electronic, paper or other written form (21 CFR 1.1340(b)). The reference document type and number (column 8) is kept but does not have to be provided.',
        'Record the reference document type and number (for example, bill of lading or invoice) so you can find it fast.',
      ],
      columns: [
        'Traceability lot code',
        'Quantity and unit of measure',
        'Product description',
        'Immediate subsequent recipient (location description; not the transporter)',
        'Shipped from (location description)',
        'Date shipped',
        'Traceability lot code source (location description) or source reference',
        'Reference document type and number',
      ],
      notes: [
        'The 8 shipping elements are: (1) traceability lot code; (2) quantity and unit of measure (for example, 6 cases or 200 pounds); (3) product description; (4) location description of the immediate subsequent recipient, other than a transporter; (5) location description of the location you shipped from; (6) date shipped; (7) location description of the traceability lot code source, or the traceability lot code source reference; and (8) reference document type and reference document number (21 CFR 1.1340(a)).',
        'The section does not apply to shipment of a raw agricultural commodity before it is initially packed, if not obtained from a fishing vessel (21 CFR 1.1340(c)).',
        ...FSMA204_NOTES.en,
      ],
      signoff: ['Shipped by (name and initials)', 'Reviewed by: signature and date'],
    },
    sources: [SRC.cfr1_1340, SRC.cfr1_1345, SRC.cfr1_1310, SRC.cfr1_1455, SRC.ftl, SRC.ftr],
  },
  {
    id: 'mock-recall',
    slug: { es: 'simulacro-de-retiro-de-producto', en: 'mock-recall-checklist' },
    rowsToPrint: 8,
    orientation: 'landscape',
    es: {
      title: 'Plantilla de simulacro de retiro de producto (recall)',
      sheetName: 'Simulacro de retiro',
      metaTitle: 'Plantilla simulacro de retiro (recall) | Stratum PR',
      description:
        'Plantilla gratis para imprimir: lista para practicar tu plan de retiro de producto, organizada por las 4 acciones que exige 21 CFR 117.139 al plan escrito.',
      lead:
        'Es una lista para practicar tu plan de retiro (recall) y anotar quién hizo cada paso, cuándo y qué encontró. Las plantas sujetas a la regla de controles preventivos deben tener un plan de retiro escrito para todo alimento con un peligro que requiere un control preventivo (21 CFR 117.139(a)). Las filas siguen las 4 acciones que ese plan debe cubrir, con los pasos y los responsables de cada una (21 CFR 117.139(b)).',
      howTo: [
        'Escoge un lote real de un producto terminado y anota arriba la planta, el producto, el código de lote y la fecha y hora en que empieza el simulacro.',
        'Para cada acción, anota el responsable que asigna tu plan escrito y la sección del procedimiento que se siguió (21 CFR 117.139(b)).',
        'Anota la hora en que empieza y termina cada paso y lo que encontraste (por ejemplo, a cuántos consignatarios directos pudiste notificar y si faltó información).',
        'Al final, anota los cambios que hay que hacerle al plan y quién los hará; las filas en blanco sirven para pasos propios de tu plan.',
      ],
      columns: [
        'Acción del plan de retiro',
        'Responsable asignado',
        'Procedimiento seguido (sección del plan)',
        'Inicio (fecha y hora)',
        'Fin (fecha y hora)',
        'Resultado y hallazgos',
        'Iniciales',
      ],
      prefilledRows: [
        'Notificar directamente a los consignatarios directos del alimento retirado, incluyendo cómo devolver o disponer del alimento afectado',
        'Notificar al público sobre cualquier peligro del alimento, cuando sea apropiado para proteger la salud pública',
        'Realizar verificaciones de efectividad para confirmar que el retiro se lleva a cabo',
        'Disponer apropiadamente del alimento retirado (reprocesar, reelaborar, desviar a un uso sin riesgo o destruir)',
      ],
      notes: [
        'El plan de retiro escrito debe incluir procedimientos que describan los pasos a seguir, y asignen la responsabilidad de seguirlos, para estas acciones según aplique a la planta: (1) notificar directamente a los consignatarios directos del alimento retirado, incluyendo cómo devolver o disponer del alimento afectado; (2) notificar al público sobre cualquier peligro del alimento cuando sea apropiado para proteger la salud pública; (3) realizar verificaciones de efectividad para confirmar que el retiro se lleva a cabo; y (4) disponer apropiadamente del alimento retirado, por ejemplo reprocesándolo, reelaborándolo, desviándolo a un uso que no presente un riesgo de inocuidad o destruyéndolo (21 CFR 117.139(b)).',
        'El plan de retiro es uno de los controles preventivos de la regla (21 CFR 117.135(c)(5)).',
        'El texto de 21 CFR 117.139 pide un plan escrito; no menciona simulacros. Practicarlo es una forma de comprobar que el plan funciona antes de necesitarlo.',
        'Los registros de la Parte 117 se guardan por lo menos 2 años después de la fecha en que se prepararon (21 CFR 117.315(a)(1)).',
      ],
      signoff: ['Coordinador del simulacro: firma y fecha', 'Revisado por: firma y fecha'],
    },
    en: {
      title: 'Mock recall (recall drill) checklist template',
      sheetName: 'Mock recall checklist',
      metaTitle: 'Mock recall checklist template (free) | Stratum PR',
      description:
        'Free printable template: checklist to practice your product recall plan, organized by the 4 actions 21 CFR 117.139 requires a written recall plan to cover.',
      lead:
        'This is a checklist to practice your recall plan and record who did each step, when and what they found. Facilities subject to the preventive controls rule must have a written recall plan for any food with a hazard requiring a preventive control (21 CFR 117.139(a)). The rows follow the 4 actions that plan must cover, with the steps and the people responsible for each (21 CFR 117.139(b)).',
      howTo: [
        'Pick a real lot of a finished product and write at the top the facility, the product, the lot code and the date and time the drill starts.',
        'For each action, write the person your written plan assigns and the section of the procedure that was followed (21 CFR 117.139(b)).',
        'Record when each step starts and ends and what you found (for example, how many direct consignees you could notify and whether information was missing).',
        'At the end, write the changes the plan needs and who will make them; the blank rows are for steps specific to your plan.',
      ],
      columns: [
        'Recall plan action',
        'Assigned person',
        'Procedure followed (plan section)',
        'Start (date and time)',
        'End (date and time)',
        'Result and findings',
        'Initials',
      ],
      prefilledRows: [
        'Directly notify the direct consignees of the food being recalled, including how to return or dispose of the affected food',
        'Notify the public about any hazard presented by the food when appropriate to protect public health',
        'Conduct effectiveness checks to verify that the recall is carried out',
        'Appropriately dispose of recalled food (reprocess, rework, divert to a safe use, or destroy)',
      ],
      notes: [
        'The written recall plan must include procedures that describe the steps to be taken, and assign responsibility for taking those steps, to perform these actions as appropriate to the facility: (1) directly notify the direct consignees of the food being recalled, including how to return or dispose of the affected food; (2) notify the public about any hazard presented by the food when appropriate to protect public health; (3) conduct effectiveness checks to verify that the recall is carried out; and (4) appropriately dispose of recalled food, for example through reprocessing, reworking, diverting to a use that does not present a safety concern, or destroying the food (21 CFR 117.139(b)).',
        'The recall plan is one of the rule\'s preventive controls (21 CFR 117.135(c)(5)).',
        'The text of 21 CFR 117.139 requires a written plan; it does not mention drills. Practicing it is a way to check the plan works before you need it.',
        'Part 117 records are kept for at least 2 years after the date they were prepared (21 CFR 117.315(a)(1)).',
      ],
      signoff: ['Drill coordinator: signature and date', 'Reviewed by: signature and date'],
    },
    sources: [SRC.cfr117_139, SRC.cfr117_135, SRC.cfr117_315],
  },
];

/** Open items we could not verify against a primary source; nothing here appears on the pages. */
export const TEMPLATES_TODOS: string[] = [
  'TODO(Jovaniel): FSMA 204 compliance date. The receiving/shipping pages state no date on purpose. guides.ts (verified 2026-11-11) says FDA will not enforce before July 20, 2028 per Congress and the formal extension is still a proposal; re-check federalregister.gov (docket FDA-2014-N-0053) before adding a date to these pages.',
  'TODO(Jovaniel): SQF / GFSI mock recall frequency (e.g. an annual recall test) is not stated here because the SQF Code was not fetched for this page; verify in the SQF Food Manufacturing Code (Edition 9, and Edition 10 when audits start) before mentioning it.',
  'TODO(Jovaniel): FDA recall guidance (21 CFR part 7, subpart C, and the FDA recall guidance documents) was not fetched; the mock recall template relies only on 21 CFR 117.139. Consider adding part 7 effectiveness-check levels after verifying the text.',
  'TODO(Jovaniel): the templates do not say which facilities are subject to subpart C (registration under FD&C Act section 415, qualified facility status under 117.201); link to the PCHF FAQ page instead of restating it, or verify 117.1/117.7 text before adding.',
  'TODO(Jovaniel): have a PCQI review the column headers of the HACCP and sanitation logs (they are a generic starting point, not a validated plan) before promoting the pages.',
];
