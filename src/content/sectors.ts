/**
 * Industry (sector) pages: which federal food safety rules apply to each kind of food business in
 * Puerto Rico, at /industrias/<slug-es> (Spanish) and /en/industries/<slug-en> (English).
 *
 * Same rules as guides.ts and compliance-faq.ts: every regulatory claim comes from the linked
 * primary source (eCFR text as of 2026-11-09, fda.gov), checked November 11, 2026. No invented
 * figures, local statistics or company names, and no claims about what Stratum's software does.
 * Anything we could not verify against a primary source lives in `todos`, never in the body.
 *
 * The slugs are permanent URLs: never change one after it ships (add a redirect if you must).
 * The page template adds the CTA; do not add one here.
 */

export type SectorLang = 'es' | 'en';

export interface SectorSource {
  label: { es: string; en: string };
  url: string;
}
export interface SectorSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}
export interface SectorContent {
  /** H1 */
  title: string;
  /** <= 60 chars, ends with " | Stratum PR" */
  metaTitle: string;
  /** 140–160 chars */
  description: string;
  /** Direct answer, 2–3 sentences: which rules apply */
  lead: string;
  sections: SectorSection[];
}
export interface Sector {
  id: string;
  /** Permanent URL slugs */
  slug: { es: string; en: string };
  es: SectorContent;
  en: SectorContent;
  sources: SectorSource[];
  /** Slugs of /preguntas/<slug> pages worth linking from this sector (must exist in FAQ_SLUGS) */
  faqSlugs: string[];
  /** Ids of other sectors to link as related */
  related: string[];
  /** Open questions we could not verify; never shown as fact */
  todos: string[];
}

export const SECTORS_VERIFIED_ON = { es: '11 de noviembre de 2026', en: 'November 11, 2026' } as const;

export const SECTORS_INDEX_PATH = { es: '/industrias', en: '/en/industries' } as const;

export function sectorPath(s: Sector, lang: SectorLang): string {
  return lang === 'en' ? `/en/industries/${s.slug.en}` : `/industrias/${s.slug.es}`;
}

/** Finds a sector by its Spanish or English slug. */
export function sectorBySlug(slug: string | undefined): Sector | undefined {
  if (!slug) return undefined;
  return SECTORS.find((s) => s.slug.es === slug || s.slug.en === slug);
}

const ecfr = (title: 9 | 21, section: string) => `https://www.ecfr.gov/current/title-${title}/section-${section}`;
const cfr = (title: 9 | 21, section: string, es: string, en: string): SectorSource => ({
  label: { es: `${title} CFR ${section} (${es})`, en: `${title} CFR ${section} (${en})` },
  url: ecfr(title, section),
});

const SRC = {
  // Registration (all FDA-regulated facilities)
  reg1_225: cfr(21, '1.225', 'quién debe registrarse', 'who must register'),
  reg1_226: cfr(21, '1.226', 'quién no tiene que registrarse', 'who does not have to register'),
  reg1_227: cfr(21, '1.227', 'definiciones de registro', 'registration definitions'),
  reg1_230: cfr(21, '1.230', 'registro y renovación', 'registration and renewal'),
  // 21 CFR 117
  p117_3: cfr(21, '117.3', 'definiciones', 'definitions'),
  p117_4: cfr(21, '117.4', 'cualificaciones del personal', 'qualifications of individuals'),
  p117_5: cfr(21, '117.5', 'exenciones', 'exemptions'),
  p117_7: cfr(21, '117.7', 'almacenes de alimentos empacados no expuestos', 'storage of unexposed packaged food'),
  p117_93: cfr(21, '117.93', 'almacenamiento y distribución', 'warehousing and distribution'),
  p117_126: cfr(21, '117.126', 'plan de inocuidad', 'food safety plan'),
  p117_130: cfr(21, '117.130', 'análisis de peligros', 'hazard analysis'),
  p117_135: cfr(21, '117.135', 'controles preventivos', 'preventive controls'),
  p117_139: cfr(21, '117.139', 'plan de retiro', 'recall plan'),
  p117_201: cfr(21, '117.201', 'instalación calificada', 'qualified facility'),
  p117_206: cfr(21, '117.206', 'requisitos modificados para almacenes', 'modified requirements for storage facilities'),
  p117_315: cfr(21, '117.315', 'retención de registros', 'record retention'),
  // Juice HACCP and bottled water
  p120_1: cfr(21, '120.1', 'aplicabilidad', 'applicability'),
  p120_3: cfr(21, '120.3', 'definiciones', 'definitions'),
  p120_6: cfr(21, '120.6', 'SSOP', 'SSOP'),
  p120_7: cfr(21, '120.7', 'análisis de peligros', 'hazard analysis'),
  p120_8: cfr(21, '120.8', 'plan HACCP', 'HACCP plan'),
  p120_12: cfr(21, '120.12', 'registros', 'records'),
  p120_13: cfr(21, '120.13', 'adiestramiento', 'training'),
  p120_24: cfr(21, '120.24', 'reducción de 5 log', '5-log reduction'),
  p120_25: cfr(21, '120.25', 'verificación con E. coli', 'E. coli process verification'),
  p129_1: cfr(21, '129.1', 'agua embotellada: buenas prácticas', 'bottled water: good manufacturing practice'),
  p129_35: cfr(21, '129.35', 'agua embotellada: facilidades sanitarias', 'bottled water: sanitary facilities'),
  p129_80: cfr(21, '129.80', 'agua embotellada: procesos y controles', 'bottled water: processes and controls'),
  p165_110: cfr(21, '165.110', 'agua embotellada: estándar de identidad y calidad', 'bottled water: identity and quality standard'),
  // Seafood HACCP
  p123_3: cfr(21, '123.3', 'definiciones', 'definitions'),
  p123_6: cfr(21, '123.6', 'análisis de peligros y plan HACCP', 'hazard analysis and HACCP plan'),
  p123_9: cfr(21, '123.9', 'registros', 'records'),
  p123_10: cfr(21, '123.10', 'adiestramiento', 'training'),
  p123_11: cfr(21, '123.11', 'controles de sanidad', 'sanitation control procedures'),
  p123_12: cfr(21, '123.12', 'productos importados', 'imported products'),
  // Acidified and low-acid canned foods
  p108_25: cfr(21, '108.25', 'alimentos acidificados: registro y process filing', 'acidified foods: registration and process filing'),
  p108_35: cfr(21, '108.35', 'enlatados de baja acidez: registro y process filing', 'low-acid canned foods: registration and process filing'),
  p113_3: cfr(21, '113.3', 'definiciones', 'definitions'),
  p113_10: cfr(21, '113.10', 'personal', 'personnel'),
  p113_100: cfr(21, '113.100', 'registros', 'records'),
  p114_3: cfr(21, '114.3', 'definiciones', 'definitions'),
  p114_10: cfr(21, '114.10', 'personal', 'personnel'),
  p114_80: cfr(21, '114.80', 'procesos y controles', 'processes and controls'),
  p114_100: cfr(21, '114.100', 'registros', 'records'),
  fdaLacf: {
    label: { es: 'FDA: registro y process filing de alimentos acidificados y LACF', en: 'FDA: Establishment Registration & Process Filing for Acidified and LACF' },
    url: 'https://www.fda.gov/food/registration-food-facilities-and-other-submissions/establishment-registration-process-filing-acidified-and-low-acid-canned-foods-lacf',
  },
  // Allergens
  fdaAllergens: {
    label: { es: 'FDA: Food Allergies (alérgenos principales y sésamo)', en: 'FDA: Food Allergies (major food allergens and sesame)' },
    url: 'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies',
  },
  fdaPchf: {
    label: { es: 'FDA: regla final de Controles Preventivos para Alimentos Humanos', en: 'FDA: FSMA Final Rule for Preventive Controls for Human Food' },
    url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food',
  },
  // USDA FSIS
  p9_300_2: cfr(9, '300.2', 'responsabilidades de FSIS', 'FSIS responsibilities'),
  p9_416_12: cfr(9, '416.12', 'desarrollo de los SSOP', 'development of Sanitation SOPs'),
  p9_416_13: cfr(9, '416.13', 'implementación de los SSOP', 'implementation of Sanitation SOPs'),
  p9_416_16: cfr(9, '416.16', 'registros de los SSOP', 'Sanitation SOP recordkeeping'),
  p9_417_2: cfr(9, '417.2', 'análisis de peligros y plan HACCP', 'hazard analysis and HACCP plan'),
  p9_417_4: cfr(9, '417.4', 'validación, verificación y reevaluación', 'validation, verification, reassessment'),
  p9_417_5: cfr(9, '417.5', 'registros HACCP', 'HACCP records'),
  p9_417_7: cfr(9, '417.7', 'adiestramiento', 'training'),
  // Sanitary transportation
  p1_900: cfr(21, '1.900', 'transporte sanitario: a quién aplica', 'sanitary transportation: who is subject'),
  p1_904: cfr(21, '1.904', 'transporte sanitario: definiciones', 'sanitary transportation: definitions'),
  p1_906: cfr(21, '1.906', 'vehículos y equipo', 'vehicles and equipment'),
  p1_908: cfr(21, '1.908', 'operaciones de transporte', 'transportation operations'),
  p1_912: cfr(21, '1.912', 'registros de transporte', 'transportation records'),
} satisfies Record<string, SectorSource>;

// Registration facts shared by every FDA-regulated sector (21 CFR 1.225, 1.227, 1.230).
const REG_ES =
  "Toda planta en Puerto Rico que manufactura, procesa, empaca o almacena alimentos para consumo en Estados Unidos es una \"instalación doméstica\" para la FDA y debe registrarse antes de comenzar, aunque su producto no salga de la isla (21 CFR 1.225 y 1.227). El registro se renueva cada dos años, entre el 1 de octubre y el 31 de diciembre de cada año par (21 CFR 1.230), así que 2026 es año de renovación.";
const REG_EN =
  "Every plant in Puerto Rico that manufactures, processes, packs or holds food for consumption in the United States is a \"domestic facility\" to FDA and must register before it starts, even if its product never leaves the island (21 CFR 1.225 and 1.227). Registration is renewed every other year, between October 1 and December 31 of each even-numbered year (21 CFR 1.230), so 2026 is a renewal year.";

export const SECTORS: Sector[] = [
  // ---------------------------------------------------------------------------------------------
  {
    id: 'jugos',
    slug: { es: 'jugos-y-bebidas', en: 'juice-and-beverages' },
    es: {
      title: 'Inocuidad para fabricantes de jugos y agua embotellada en Puerto Rico: reglas de la FDA',
      metaTitle: 'Reglas de la FDA para jugos y bebidas | Stratum PR',
      description: 'Qué exige la FDA a quien produce jugos o agua embotellada en Puerto Rico: HACCP de jugos (21 CFR 120), reducción de 5 log, registros y la parte 129 del agua.',
      lead: 'Si produces jugo para vender a otros negocios, te aplica el reglamento HACCP de jugos de la FDA (21 CFR 120): análisis de peligros escrito, plan HACCP, procedimientos de sanidad y un proceso que logre una reducción de 5 log del microorganismo pertinente. Si embotellas agua, te aplican la parte 129 y el estándar de identidad de la sección 165.110. En ambos casos, la planta también debe estar registrada con la FDA.',
      sections: [
        {
          heading: '¿Qué cuenta como jugo para la FDA?',
          paragraphs: [
            'La regla define jugo como el líquido acuoso extraído de una o más frutas o vegetales, los purés de sus partes comestibles, o los concentrados de ese líquido o puré. Aplica a todo jugo que se vende como tal o que se usa como ingrediente de bebidas, se haya enviado o no entre estados (21 CFR 120.1(a)). Es decir, un jugo que se produce y se vende solo en Puerto Rico también está cubierto.',
            'La regla no cubre la operación de un establecimiento al detal, que la FDA define como el que provee jugo directamente al consumidor. Un negocio que vende o distribuye jugo a otros negocios además de al consumidor no cuenta como detal (21 CFR 120.3(j) y (l)).',
          ],
        },
        {
          heading: 'Análisis de peligros y plan HACCP',
          paragraphs: [
            'Cada procesador debe tener un análisis de peligros escrito para cada tipo de jugo. La regla pide considerar, como mínimo, contaminación microbiológica, parásitos, contaminación química, residuos ilegales de plaguicidas, descomposición, toxinas naturales, aditivos no aprobados, ingredientes no declarados que puedan ser alérgenos y peligros físicos (21 CFR 120.7(c)).',
            'Si el análisis encuentra peligros razonablemente probables, necesitas un plan HACCP escrito, específico para cada localización y cada tipo de jugo, con los puntos críticos de control, límites críticos, monitoreo, acciones correctivas, validación y verificación, y un sistema de registros con los valores reales observados (21 CFR 120.8).',
            'El análisis y el plan los debe preparar una persona adiestrada en HACCP para jugos con un currículo reconocido por la FDA, o calificada por experiencia de trabajo equivalente. Esa persona no tiene que ser empleada de la planta (21 CFR 120.13).',
          ],
        },
        {
          heading: 'La reducción de 5 log',
          paragraphs: [
            'El plan HACCP debe incluir medidas de control que logren consistentemente, como mínimo, una reducción de 5 log (100,000 veces) del microorganismo pertinente, que la regla define como el microorganismo de importancia para la salud pública más resistente que probablemente esté en el jugo (21 CFR 120.24(a)).',
            'Hay dos excepciones a ese requisito: el procesador que está sujeto a las partes 113 o 114 (enlatados de baja acidez o acidificados), y el que usa un solo paso térmico suficiente para que el jugo sea estable sin refrigeración (shelf-stable), siempre que incluya copia de ese proceso térmico en su análisis de peligros. En todos los casos, el tratamiento y el empaque final deben hacerse en una misma instalación que opere bajo buenas prácticas de manufactura (21 CFR 120.24(c)).',
            'Si tu tratamiento no entra en contacto directo con todas las partes del jugo (por ejemplo, tratamientos a la superficie de la fruta cítrica), la regla exige analizar el producto terminado para E. coli biotipo I con una frecuencia de muestreo establecida (21 CFR 120.25).',
          ],
        },
        {
          heading: 'Sanidad (SSOP) y registros',
          paragraphs: [
            'Cada procesador debe tener e implementar un procedimiento estándar de sanidad (SSOP) y monitorear ocho áreas (21 CFR 120.6):',
          ],
          bullets: [
            'Inocuidad del agua que toca el alimento o las superficies, o que se usa para hacer hielo.',
            'Condición y limpieza de las superficies de contacto, incluidos utensilios, guantes y ropa exterior.',
            'Prevención de contaminación cruzada, incluida la de producto crudo a producto procesado.',
            'Lavamanos, desinfección de manos y servicios sanitarios.',
            'Protección contra lubricantes, combustible, plaguicidas, químicos de limpieza, condensación y otros contaminantes.',
            'Rotulación, almacenamiento y uso correcto de compuestos tóxicos.',
            'Control de condiciones de salud de los empleados.',
            'Exclusión de plagas.',
          ],
        },
        {
          heading: '¿Cuánto tiempo guardar los registros de jugos?',
          paragraphs: [
            'Para jugos perecederos o refrigerados, por lo menos 1 año desde la fecha de preparación. Para productos congelados, preservados o shelf-stable, 2 años o la vida útil del producto, lo que sea mayor (21 CFR 120.12(d)).',
            'Si cumples con la parte 120 para esas actividades, las secciones de controles preventivos y cadena de suministro de 21 CFR 117 (subpartes C y G) no aplican a esas mismas actividades (21 CFR 117.5(c)).',
          ],
        },
        {
          heading: 'Agua embotellada',
          paragraphs: [
            'El agua embotellada tiene su propia parte: 21 CFR 129, que se suma a las buenas prácticas de las partes 110 y 117 (21 CFR 129.1). El agua del producto debe venir de una fuente aprobada, y la planta debe analizar el agua de cada fuente por lo menos una vez al año para contaminantes químicos y una vez cada 4 años para contaminantes radiológicos. Si la fuente no es un sistema público de agua, debe analizarla para coliformes totales por lo menos una vez a la semana (21 CFR 129.35(a)(3)).',
            'La planta también debe mantener registros de las inspecciones y la efectividad del equipo de tratamiento, y del mantenimiento, las inspecciones y el desempeño del lavador mecánico de envases reutilizables (21 CFR 129.80). El nombre y la calidad del producto (\"agua de manantial\", \"agua artesiana\", etc.) los define el estándar de identidad de 21 CFR 165.110.',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Food safety rules for juice and bottled water makers in Puerto Rico',
      metaTitle: 'FDA rules for juice and beverages in PR | Stratum PR',
      description: 'What FDA requires of juice and bottled water producers in Puerto Rico: Juice HACCP (21 CFR 120), the 5-log reduction, record retention and part 129 for water.',
      lead: 'If you make juice that you sell to other businesses, FDA’s Juice HACCP regulation (21 CFR 120) applies: a written hazard analysis, a HACCP plan, sanitation procedures and a process that achieves a 5-log reduction of the pertinent microorganism. If you bottle water, part 129 and the identity standard in section 165.110 apply. Either way, the plant must also be registered with FDA.',
      sections: [
        {
          heading: 'What counts as juice for FDA?',
          paragraphs: [
            'The rule defines juice as the aqueous liquid expressed or extracted from one or more fruits or vegetables, purees of their edible portions, or concentrates of that liquid or puree. It applies to any juice sold as such or used as an ingredient in beverages, whether or not it has been shipped in interstate commerce (21 CFR 120.1(a)). So juice made and sold only in Puerto Rico is covered too.',
            'The rule does not cover the operation of a retail establishment, which FDA defines as one that provides juice directly to consumers. A business that sells or distributes juice to other businesses as well as to consumers does not count as retail (21 CFR 120.3(j) and (l)).',
          ],
        },
        {
          heading: 'Hazard analysis and HACCP plan',
          paragraphs: [
            'Each processor needs a written hazard analysis for each type of juice. At a minimum it should consider microbiological contamination, parasites, chemical contamination, unlawful pesticide residues, decomposition, natural toxins, unapproved additives, undeclared ingredients that may be allergens and physical hazards (21 CFR 120.7(c)).',
            'If the analysis finds hazards reasonably likely to occur, you need a written HACCP plan specific to each location and each type of juice, with critical control points, critical limits, monitoring, corrective actions, validation and verification, and a recordkeeping system that captures the actual values observed (21 CFR 120.8).',
            'The analysis and the plan must be developed by someone trained in juice HACCP under an FDA-recognized curriculum, or qualified by equivalent job experience. That person need not be an employee of the plant (21 CFR 120.13).',
          ],
        },
        {
          heading: 'The 5-log reduction',
          paragraphs: [
            'The HACCP plan must include control measures that consistently achieve at least a 5-log (100,000-fold) reduction in the pertinent microorganism, which the rule defines as the most resistant microorganism of public health significance likely to occur in the juice (21 CFR 120.24(a)).',
            'Two kinds of processors are exempt from that requirement: those subject to parts 113 or 114 (low-acid canned or acidified foods), and those using a single thermal step sufficient to make the juice shelf-stable, provided a copy of that thermal process is included in the hazard analysis. In every case, treatment and final packaging must happen in a single facility operating under good manufacturing practices (21 CFR 120.24(c)).',
            'If your treatment does not come into direct contact with all parts of the juice (for example, citrus fruit surface treatments), the rule requires testing the finished product for biotype I E. coli on a set sampling schedule (21 CFR 120.25).',
          ],
        },
        {
          heading: 'Sanitation (SSOP) and records',
          paragraphs: ['Each processor must have and implement a sanitation standard operating procedure (SSOP) and monitor eight areas (21 CFR 120.6):'],
          bullets: [
            'Safety of water that contacts food or food-contact surfaces, or is used to make ice.',
            'Condition and cleanliness of food-contact surfaces, including utensils, gloves and outer garments.',
            'Prevention of cross-contamination, including from raw to processed product.',
            'Hand washing, hand sanitizing and toilet facilities.',
            'Protection from lubricants, fuel, pesticides, cleaning compounds, condensate and other contaminants.',
            'Proper labeling, storage and use of toxic compounds.',
            'Control of employee health conditions.',
            'Exclusion of pests.',
          ],
        },
        {
          heading: 'How long to keep juice records',
          paragraphs: [
            'For perishable or refrigerated juices, at least 1 year after the date prepared. For frozen, preserved or shelf-stable products, 2 years or the shelf life of the product, whichever is greater (21 CFR 120.12(d)).',
            'If you comply with part 120 for those activities, the preventive controls and supply-chain subparts of 21 CFR 117 (subparts C and G) do not apply to those same activities (21 CFR 117.5(c)).',
          ],
        },
        {
          heading: 'Bottled water',
          paragraphs: [
            'Bottled water has its own part, 21 CFR 129, on top of the good manufacturing practices in parts 110 and 117 (21 CFR 129.1). Product water must come from an approved source, and the plant must test the water from each source at least once a year for chemical contaminants and once every 4 years for radiological contaminants. If the source is not a public water system, it must be tested for total coliform at least once a week (21 CFR 129.35(a)(3)).',
            'The plant must also keep records of inspections and effectiveness of its treatment equipment, and of the maintenance, inspections and performance of the mechanical washer for multiservice containers (21 CFR 129.80). Product names and quality (\"spring water\", \"artesian water\" and so on) are set by the identity standard in 21 CFR 165.110.',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.p120_1, SRC.p120_3, SRC.p120_6, SRC.p120_7, SRC.p120_8, SRC.p120_12, SRC.p120_13, SRC.p120_24, SRC.p120_25, SRC.p117_5, SRC.p129_1, SRC.p129_35, SRC.p129_80, SRC.p165_110, SRC.reg1_225, SRC.reg1_230],
    faqSlugs: ['que-registros-de-inocuidad-debe-guardar-una-planta', 'cuanto-tiempo-guardar-registros-de-inocuidad', 'regla-controles-preventivos-pchf-fsma'],
    related: ['acidificados', 'distribuidores'],
    todos: [
      'Agua embotellada en Puerto Rico: confirmar qué agencia local aprueba las fuentes de agua ("approved source", 21 CFR 129.3(a)) antes de nombrarla.',
      'Refrescos y bebidas carbonatadas sin jugo: confirmar si conviene una sección propia (114.3(b) las excluye de la parte 114; en general caen bajo 21 CFR 117).',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'mariscos',
    slug: { es: 'pescados-y-mariscos', en: 'seafood' },
    es: {
      title: 'Inocuidad para procesadores de pescados y mariscos en Puerto Rico: reglas de la FDA',
      metaTitle: 'HACCP de pescados y mariscos en Puerto Rico | Stratum PR',
      description: 'Qué exige el HACCP de pescados y mariscos (21 CFR 123) a plantas en Puerto Rico: análisis de peligros, plan, sanidad, adiestramiento y cuánto guardar registros.',
      lead: 'Si procesas pescado o mariscos en Puerto Rico, incluso si solo los almacenas, empacas o descargas en el muelle, te aplica el reglamento HACCP de pescados y mariscos de la FDA (21 CFR 123). Necesitas un análisis de peligros, un plan HACCP escrito cuando hay peligros razonablemente probables, monitoreo de sanidad en ocho áreas y registros que se guardan de 1 a 2 años.',
      sections: [
        {
          heading: '¿A quién le aplica la parte 123?',
          paragraphs: [
            'La regla define \"pescado\" de forma amplia: peces de agua dulce o salada, crustáceos, otros animales acuáticos (la regla menciona, entre otros, tortugas acuáticas, medusas, pepinos de mar y erizos) y todos los moluscos destinados al consumo humano (21 CFR 123.3(d)).',
            'También define \"procesar\" de forma amplia: manejar, almacenar, preparar, descabezar, eviscerar, desconchar, congelar, cambiar la forma de mercado, manufacturar, preservar, empacar, rotular, descargar en el muelle o almacenar. No aplica a la pesca o el transporte sin otro procesamiento, a lo que se hace a bordo solo para conservar la pesca, ni a la operación de un establecimiento al detal (21 CFR 123.3(k)).',
          ],
        },
        {
          heading: 'Análisis de peligros y plan HACCP',
          paragraphs: [
            'Cada procesador debe hacer un análisis de peligros para cada tipo de pescado o producto pesquero, y tener un plan HACCP escrito, específico para cada localización y producto, cuando el análisis encuentra peligros razonablemente probables (21 CFR 123.6(a) y (b)). La regla pide considerar:',
          ],
          bullets: [
            'Toxinas naturales.',
            'Contaminación microbiológica.',
            'Contaminación química, plaguicidas y residuos de drogas.',
            'Descomposición en especies que forman toxina escombroide (histamina) o en otras donde se asocia a un peligro.',
            'Parásitos, cuando el producto se consumirá sin un proceso que los mate.',
            'Uso no aprobado de aditivos directos o indirectos, o de colorantes.',
            'Peligros físicos.',
          ],
        },
        {
          heading: 'Quién puede preparar el plan',
          paragraphs: [
            'Desarrollar el plan, reevaluarlo y revisar los registros lo debe hacer alguien que completó adiestramiento en HACCP para pescados y mariscos equivalente a un currículo reconocido por la FDA, o que está calificado por experiencia de trabajo equivalente. No tiene que ser empleado del procesador (21 CFR 123.10).',
          ],
        },
        {
          heading: 'Sanidad: las ocho áreas que se monitorean',
          paragraphs: [
            'La regla recomienda un SSOP escrito para cada localización, y exige monitorear la sanidad con suficiente frecuencia en ocho áreas: el agua y el hielo, las superficies de contacto, la contaminación cruzada (incluida la de producto crudo a cocido), lavamanos y baños, la protección contra contaminantes, el manejo de compuestos tóxicos, la salud de los empleados y la exclusión de plagas. Las fallas se corrigen a tiempo y el monitoreo y las correcciones se documentan (21 CFR 123.11).',
          ],
        },
        {
          heading: 'Registros e importaciones',
          paragraphs: [
            'Los registros se guardan por lo menos 1 año para productos refrigerados y por lo menos 2 años para productos congelados, preservados o shelf-stable. Los registros sobre la adecuación del equipo o los procesos, como estudios científicos, se guardan por lo menos 2 años después de que dejan de aplicar (21 CFR 123.9(b)).',
            'Si importas pescado o mariscos, la regla exige que vengan de un país con un acuerdo vigente con la FDA que cubra el producto, o que tengas procedimientos escritos de verificación del suplidor extranjero (21 CFR 123.12).',
            'La parte 123 también tiene subpartes específicas para productos ahumados o con sabor a humo (subparte B) y para moluscos crudos (subparte C). Cuando cumples con la parte 123, las subpartes C y G de 21 CFR 117 no aplican a esas actividades (21 CFR 117.5(b)).',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Food safety rules for seafood processors in Puerto Rico',
      metaTitle: 'Seafood HACCP rules in Puerto Rico | Stratum PR',
      description: 'What FDA Seafood HACCP (21 CFR 123) requires of plants in Puerto Rico: hazard analysis, HACCP plan, sanitation monitoring, training and record retention.',
      lead: 'If you process fish or shellfish in Puerto Rico, even if you only store, pack or unload it at the dock, FDA’s Seafood HACCP regulation (21 CFR 123) applies. You need a hazard analysis, a written HACCP plan when hazards are reasonably likely to occur, sanitation monitoring in eight areas, and records kept for 1 to 2 years.',
      sections: [
        {
          heading: 'Who does part 123 apply to?',
          paragraphs: [
            'The rule defines \"fish\" broadly: fresh or saltwater finfish, crustaceans, other aquatic animal life (the rule names, among others, aquatic turtles, jellyfish, sea cucumbers and sea urchins) and all mollusks intended for human consumption (21 CFR 123.3(d)).',
            'It also defines \"processing\" broadly: handling, storing, preparing, heading, eviscerating, shucking, freezing, changing market forms, manufacturing, preserving, packing, labeling, dockside unloading or holding. It does not apply to harvesting or transporting without other processing, to practices on board solely to hold the catch, or to operating a retail establishment (21 CFR 123.3(k)).',
          ],
        },
        {
          heading: 'Hazard analysis and HACCP plan',
          paragraphs: [
            'Each processor must conduct a hazard analysis for each kind of fish or fishery product and have a written HACCP plan, specific to each location and product, when the analysis finds hazards reasonably likely to occur (21 CFR 123.6(a) and (b)). The rule asks you to consider:',
          ],
          bullets: [
            'Natural toxins.',
            'Microbiological contamination.',
            'Chemical contamination, pesticides and drug residues.',
            'Decomposition in scombrotoxin (histamine) forming species, or in others where it is linked to a hazard.',
            'Parasites, when the product will be eaten without a process that kills them.',
            'Unapproved use of direct or indirect food or color additives.',
            'Physical hazards.',
          ],
        },
        {
          heading: 'Who can develop the plan',
          paragraphs: [
            'Developing the plan, reassessing it and reviewing records must be done by someone who completed seafood HACCP training equivalent to an FDA-recognized curriculum, or who is qualified by equivalent job experience. They need not be an employee of the processor (21 CFR 123.10).',
          ],
        },
        {
          heading: 'Sanitation: the eight areas you monitor',
          paragraphs: [
            'The rule recommends a written SSOP for each location and requires monitoring sanitation often enough in eight areas: water and ice, food-contact surfaces, cross-contamination (including raw to cooked product), hand washing and toilets, protection from contaminants, handling of toxic compounds, employee health and pest exclusion. Problems are corrected in a timely manner and the monitoring and corrections are documented (21 CFR 123.11).',
          ],
        },
        {
          heading: 'Records and imports',
          paragraphs: [
            'Records are kept at least 1 year for refrigerated products and at least 2 years for frozen, preserved or shelf-stable products. Records on the adequacy of equipment or processes, such as scientific studies, are kept at least 2 years after they stop applying (21 CFR 123.9(b)).',
            'If you import fish or fishery products, the rule requires that they come from a country with an active agreement with FDA covering the product, or that you have written verification procedures for the foreign supplier (21 CFR 123.12).',
            'Part 123 also has specific subparts for smoked and smoke-flavored fishery products (subpart B) and raw molluscan shellfish (subpart C). When you comply with part 123, subparts C and G of 21 CFR 117 do not apply to those activities (21 CFR 117.5(b)).',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.p123_3, SRC.p123_6, SRC.p123_9, SRC.p123_10, SRC.p123_11, SRC.p123_12, SRC.p117_5, SRC.reg1_225, SRC.reg1_226, SRC.reg1_230],
    faqSlugs: ['que-registros-de-inocuidad-debe-guardar-una-planta', 'cuanto-tiempo-guardar-registros-de-inocuidad', 'como-aprobar-y-verificar-suplidores'],
    related: ['acidificados', 'distribuidores'],
    todos: [
      'Enlazar la guía de peligros de pescados y mariscos de la FDA (Fish and Fishery Products Hazards and Controls Guidance) después de verificar la edición vigente y su URL.',
      'Embarcaciones pesqueras: 21 CFR 1.226(f) las exime del registro salvo que procesen; confirmar si vale la pena una nota para pescadores artesanales que venden a plantas.',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'acidificados',
    slug: { es: 'alimentos-acidificados-y-enlatados', en: 'acidified-and-canned-foods' },
    es: {
      title: 'Alimentos acidificados y enlatados de baja acidez en Puerto Rico: reglas de la FDA',
      metaTitle: 'Acidificados y enlatados: reglas de la FDA | Stratum PR',
      description: 'Escabeches, salsas y enlatados en Puerto Rico: cuándo aplican 21 CFR 114 y 113, el registro (formulario 2541), el process filing y la supervisión.',
      lead: 'Si tu producto es un alimento de baja acidez al que le añades ácido para bajar el pH a 4.6 o menos (por ejemplo, vegetales o pimientos en escabeche), es un alimento acidificado y te aplica 21 CFR 114. Si es un alimento de baja acidez procesado térmicamente en envase hermético, te aplica 21 CFR 113. En ambos casos debes registrar la planta con el formulario FDA 2541, someter tu proceso programado (process filing) para cada producto y tamaño de envase, y operar bajo un supervisor que completó una escuela aprobada por la FDA.',
      sections: [
        {
          heading: '¿Mi producto es acidificado, ácido o de baja acidez?',
          paragraphs: [
            'Las definiciones dependen del pH y de la actividad de agua (aw) del producto terminado (21 CFR 114.3 y 113.3):',
          ],
          bullets: [
            'Alimento ácido: pH natural de 4.6 o menos.',
            'Alimento de baja acidez: pH de equilibrio final mayor de 4.6 y aw mayor de 0.85 (excepto bebidas alcohólicas). Los tomates y productos de tomate con pH menor de 4.7 no se clasifican como de baja acidez.',
            'Alimento acidificado: un alimento de baja acidez al que se le añade ácido o alimento ácido, con aw mayor de 0.85 y pH de equilibrio final de 4.6 o menos. La regla menciona como ejemplos habichuelas, pepinillos, repollo, pimientos, frutas tropicales y pescado.',
          ],
        },
        {
          heading: 'Lo que la parte 114 no cubre',
          paragraphs: [
            'La parte 114 excluye las bebidas carbonatadas, las mermeladas, jaleas y conservas, los alimentos ácidos (como aderezos y salsas) que contienen pequeñas cantidades de alimento de baja acidez sin que cambie mucho su pH, y los alimentos que se almacenan, distribuyen y venden refrigerados (21 CFR 114.3(b)). Estos productos siguen sujetos a otras reglas, como 21 CFR 117.',
          ],
        },
        {
          heading: 'Registro y process filing',
          paragraphs: [
            'Un procesador comercial debe registrar el establecimiento con la FDA en el formulario FDA 2541 no más tarde de 10 días después de empezar a procesar estos alimentos (21 CFR 108.25(c)(1) y 108.35(c)(1)).',
            'Además, no más tarde de 60 días después del registro y antes de empacar un producto nuevo, debe someter la información del proceso programado para cada producto en cada tamaño de envase: el formulario 2541e para acidificados, y 2541d, 2541f o 2541g para enlatados de baja acidez según el método. La FDA aclara que someter el proceso no significa que lo apruebe (21 CFR 108.25(c)(2) y 108.35(c)(2)).',
            'Si la FDA encuentra que un procesador no cumple estos requisitos, puede exigirle un permiso de emergencia temporal para seguir operando (21 CFR 108.25(a) y 108.35(a)).',
          ],
        },
        {
          heading: 'Supervisión adiestrada',
          paragraphs: [
            'Los operadores de los sistemas de proceso y empaque de acidificados deben trabajar bajo la supervisión de una persona que asistió a una escuela aprobada por la FDA que enseña manejo de alimentos, higiene, sanidad, control de pH y factores críticos de acidificación (21 CFR 114.10).',
            'En los enlatados de baja acidez, el requisito cubre a los operadores de retortas, sistemas asépticos y de formulación, y a los inspectores de cierre de envases; el supervisor solo puede supervisar las áreas para las que la escuela lo certificó (21 CFR 113.10).',
          ],
        },
        {
          heading: 'Control del pH, codificación y registros',
          paragraphs: [
            'El producto debe alcanzar un pH de equilibrio final de 4.6 o menos en el tiempo que indica el proceso programado, con pruebas frecuentes y registradas. Si el pH final es mayor de 4.0, se mide con método potenciométrico (un medidor de pH) (21 CFR 114.80(a)).',
            'Cada envase lleva un código permanente que identifica el establecimiento, el producto, y el año, día y período de empaque (21 CFR 114.80(b)). Los registros de acidificados se guardan 3 años desde la fecha de manufactura (21 CFR 114.100(e)); los de enlatados de baja acidez, por lo menos 1 año en la planta y 2 años más en la planta u otro lugar razonablemente accesible (21 CFR 113.100(g)).',
          ],
        },
        {
          heading: '¿Y la regla de controles preventivos (21 CFR 117)?',
          paragraphs: [
            'Para los enlatados de baja acidez que cumplen con la parte 113, las subpartes C y G de 21 CFR 117 no aplican, pero solo en cuanto a los peligros microbiológicos que regula la parte 113 (21 CFR 117.5(d)). La lista de exenciones de 117.5 no incluye una exención equivalente para la parte 114 de acidificados.',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Acidified and low-acid canned foods in Puerto Rico: FDA rules',
      metaTitle: 'Acidified and canned foods: FDA rules in PR | Stratum PR',
      description: 'Pickles, sauces and canned foods in Puerto Rico: when 21 CFR 114 and 113 apply, registration on Form FDA 2541, process filing and trained supervisors.',
      lead: 'If your product is a low-acid food to which you add acid to bring the pH to 4.6 or below (pickled vegetables or peppers, for example), it is an acidified food and 21 CFR 114 applies. If it is a low-acid food thermally processed in a hermetically sealed container, 21 CFR 113 applies. Either way you must register the plant on Form FDA 2541, file your scheduled process for each product and container size, and operate under a supervisor who completed an FDA-approved school.',
      sections: [
        {
          heading: 'Is my product acidified, acid or low-acid?',
          paragraphs: ['The definitions turn on the pH and water activity (aw) of the finished product (21 CFR 114.3 and 113.3):'],
          bullets: [
            'Acid food: natural pH of 4.6 or below.',
            'Low-acid food: finished equilibrium pH above 4.6 and aw above 0.85 (other than alcoholic beverages). Tomatoes and tomato products with pH below 4.7 are not classed as low-acid.',
            'Acidified food: a low-acid food to which acid or acid food is added, with aw above 0.85 and finished equilibrium pH of 4.6 or below. The rule lists beans, cucumbers, cabbage, peppers, tropical fruits and fish among its examples.',
          ],
        },
        {
          heading: 'What part 114 does not cover',
          paragraphs: [
            'Part 114 excludes carbonated beverages, jams, jellies and preserves, acid foods (such as dressings and condiment sauces) that contain small amounts of low-acid food without significantly changing their pH, and foods that are stored, distributed and retailed under refrigeration (21 CFR 114.3(b)). Those products remain subject to other rules, such as 21 CFR 117.',
          ],
        },
        {
          heading: 'Registration and process filing',
          paragraphs: [
            'A commercial processor must register the establishment with FDA on Form FDA 2541 no later than 10 days after first processing these foods (21 CFR 108.25(c)(1) and 108.35(c)(1)).',
            'In addition, no later than 60 days after registration and before packing any new product, it must file the scheduled process for each product in each container size: Form 2541e for acidified foods, and 2541d, 2541f or 2541g for low-acid canned foods depending on the method. FDA states that filing does not constitute approval (21 CFR 108.25(c)(2) and 108.35(c)(2)).',
            'If FDA finds a processor is not meeting these requirements, it may require a temporary emergency permit to keep operating (21 CFR 108.25(a) and 108.35(a)).',
          ],
        },
        {
          heading: 'Trained supervision',
          paragraphs: [
            'Operators of acidified food processing and packaging systems must work under the supervision of a person who attended an FDA-approved school covering food handling, hygiene, sanitation, pH control and critical factors in acidification (21 CFR 114.10).',
            'For low-acid canned foods, the requirement covers operators of retorts, aseptic and formulation systems, and container closure inspectors; the supervisor may only supervise the areas the school certified them for (21 CFR 113.10).',
          ],
        },
        {
          heading: 'pH control, coding and records',
          paragraphs: [
            'The product must reach a finished equilibrium pH of 4.6 or below within the time set in the scheduled process, with frequent, recorded testing. If the finished pH is above 4.0, it is measured potentiometrically (with a pH meter) (21 CFR 114.80(a)).',
            'Each container carries a permanent code identifying the establishment, the product, and the year, day and period of packing (21 CFR 114.80(b)). Acidified food records are kept for 3 years from the date of manufacture (21 CFR 114.100(e)); low-acid canned food records at least 1 year at the plant and 2 more years at the plant or another reasonably accessible location (21 CFR 113.100(g)).',
          ],
        },
        {
          heading: 'What about the preventive controls rule (21 CFR 117)?',
          paragraphs: [
            'For low-acid canned foods that comply with part 113, subparts C and G of 21 CFR 117 do not apply, but only with respect to the microbiological hazards regulated under part 113 (21 CFR 117.5(d)). The exemption list in 117.5 includes no equivalent exemption for part 114 acidified foods.',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.p114_3, SRC.p113_3, SRC.p108_25, SRC.p108_35, SRC.fdaLacf, SRC.p114_10, SRC.p113_10, SRC.p114_80, SRC.p114_100, SRC.p113_100, SRC.p117_5, SRC.reg1_225, SRC.reg1_230],
    faqSlugs: ['regla-controles-preventivos-pchf-fsma', 'cuanto-tiempo-guardar-registros-de-inocuidad', 'que-registros-de-inocuidad-debe-guardar-una-planta'],
    related: ['jugos', 'panaderias'],
    todos: [
      'Confirmar en una fuente de la FDA el nombre "Better Process Control School" y la lista vigente de escuelas aprobadas (la URL probada en fda.gov dio 404) antes de nombrarla en el texto.',
      'Pique y salsas: 114.3(b) excluye salsas ácidas con poca cantidad de alimento de baja acidez; no clasificar productos típicos sin una autoridad de procesos. Cada producto depende de su pH y aw reales. Considerar una nota sobre autoridad de procesos (processing authority) tras verificar la guía de la FDA.',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'panaderias',
    slug: { es: 'panaderias-y-snacks', en: 'bakeries-and-snacks' },
    es: {
      title: 'Inocuidad para panaderías y fábricas de snacks en Puerto Rico: reglas de la FDA',
      metaTitle: 'Reglas de la FDA para panaderías y snacks | Stratum PR',
      description: 'Qué exige la FDA a panaderías y fábricas de snacks en Puerto Rico: controles preventivos (21 CFR 117), PCQI, los 9 alérgenos con sésamo y exenciones.',
      lead: 'Una panadería o fábrica de snacks que vende a otros negocios es, en general, una instalación que debe registrarse con la FDA y cumplir con la regla de Controles Preventivos para Alimentos Humanos (21 CFR 117): buenas prácticas de manufactura, un análisis de peligros escrito y, si hay peligros que requieren control, un plan de inocuidad preparado por un PCQI. En este sector, los alérgenos (incluido el sésamo desde el 1 de enero de 2023) son casi siempre un peligro que hay que controlar.',
      sections: [
        {
          heading: 'Buenas prácticas y adiestramiento para todos',
          paragraphs: [
            'Las buenas prácticas de manufactura de la subparte B de 21 CFR 117 aplican a toda la planta. La gerencia debe asegurar que cada persona que manufactura, procesa, empaca o almacena alimentos, incluido el personal temporero, esté calificada y reciba adiestramiento en higiene e inocuidad de alimentos apropiado a sus tareas (21 CFR 117.4).',
          ],
        },
        {
          heading: 'Análisis de peligros y plan de inocuidad',
          paragraphs: [
            'Debes hacer un análisis de peligros para cada tipo de alimento, y debe estar escrito sin importar el resultado (21 CFR 117.130(a)). El análisis considera peligros biológicos, químicos (incluidos los alérgenos) y físicos. Si un alimento listo para comer queda expuesto al ambiente antes de empacarse sin un tratamiento posterior que elimine el patógeno, el análisis debe evaluar los patógenos ambientales (21 CFR 117.130(c)(1)(ii)).',
            'Si encuentras peligros que requieren un control preventivo, necesitas un plan de inocuidad escrito con el análisis de peligros, los controles preventivos, el programa de cadena de suministro, el plan de retiro (recall), y los procedimientos de monitoreo, acciones correctivas y verificación. Lo prepara, o supervisa su preparación, un individuo calificado en controles preventivos (PCQI) (21 CFR 117.126).',
          ],
        },
        {
          heading: 'Alérgenos: el control que más pesa en panadería',
          paragraphs: [
            'Los alérgenos principales reconocidos por ley en Estados Unidos son nueve: leche, huevo, pescado, crustáceos, nueces de árbol, maní, trigo, soya y sésamo. El sésamo se añadió con la ley FASTER y, desde el 1 de enero de 2023, todos los requisitos de la FDA para alérgenos principales, incluidos los de rotulación y manufactura, aplican también al sésamo (FDA, Food Allergies).',
            'Los controles de alérgenos de la regla deben cubrir dos cosas: proteger el alimento del contacto cruzado con alérgenos durante el almacenamiento, el manejo y el uso, y rotular correctamente el producto terminado (21 CFR 117.135(c)(2)).',
          ],
        },
        {
          heading: 'Productos que necesitan refrigeración',
          paragraphs: [
            'La regla trata distinto los productos horneados que requieren control de tiempo y temperatura. En su lista de combinaciones de bajo riesgo, la categoría \"productos horneados\" (panes, brownies, bizcochos, galletas) excluye expresamente los que necesitan control de temperatura, como los pasteles rellenos de crema (21 CFR 117.5(g)(2)(ix)).',
            'Los snacks como los chips de papa o de plátano aparecen en la regla dentro de \"otros productos de frutas y vegetales\" (21 CFR 117.5(g)(2)(ii)).',
          ],
        },
        {
          heading: '¿Mi panadería es una \"instalación calificada\"?',
          paragraphs: [
            'Un negocio muy pequeño, que promedia menos de $1,000,000 al año (ajustado por inflación) en ventas de alimentos para humanos más el valor de los alimentos que manufactura o almacena sin vender, durante los 3 años anteriores, es una instalación calificada (21 CFR 117.3).',
            'Una instalación calificada no tiene que cumplir con las subpartes C (análisis de peligros y controles preventivos) y G (cadena de suministro), pero sí con requisitos modificados: someter a la FDA una atestación de su estatus y otra de que controla sus peligros o cumple con la ley local aplicable (21 CFR 117.5(a) y 117.201). Las buenas prácticas de la subparte B le siguen aplicando.',
          ],
        },
        {
          heading: 'Retiro y registros',
          paragraphs: [
            'Si tienes un alimento con un peligro que requiere control preventivo, necesitas un plan de retiro escrito que asigne quién notifica a los clientes directos, quién avisa al público cuando sea necesario y quién verifica que el retiro se completó (21 CFR 117.139).',
            'Los registros de la parte 117 se guardan por lo menos 2 años desde la fecha en que se prepararon (21 CFR 117.315).',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Food safety rules for bakeries in Puerto Rico',
      metaTitle: 'FDA rules for bakeries and snacks in PR | Stratum PR',
      description: 'What FDA requires of bakeries and snack makers in Puerto Rico: preventive controls (21 CFR 117), the PCQI, the 9 major allergens with sesame, exemptions.',
      lead: 'A bakery or snack plant that sells to other businesses is generally a facility that must register with FDA and comply with the Preventive Controls for Human Food rule (21 CFR 117): good manufacturing practices, a written hazard analysis and, if hazards need controls, a food safety plan prepared by a PCQI. In this sector, allergens (including sesame since January 1, 2023) are almost always a hazard you must control.',
      sections: [
        {
          heading: 'Good manufacturing practices and training for everyone',
          paragraphs: [
            'The good manufacturing practices in subpart B of 21 CFR 117 apply to the whole plant. Management must ensure everyone who manufactures, processes, packs or holds food, including temporary staff, is qualified and receives training in food hygiene and food safety appropriate to their duties (21 CFR 117.4).',
          ],
        },
        {
          heading: 'Hazard analysis and food safety plan',
          paragraphs: [
            'You must conduct a hazard analysis for each type of food, and it must be written regardless of its outcome (21 CFR 117.130(a)). It considers biological, chemical (including allergens) and physical hazards. If a ready-to-eat food is exposed to the environment before packaging without a later treatment that kills the pathogen, the analysis must evaluate environmental pathogens (21 CFR 117.130(c)(1)(ii)).',
            'If you find hazards requiring a preventive control, you need a written food safety plan with the hazard analysis, preventive controls, supply-chain program, recall plan, and monitoring, corrective action and verification procedures. A preventive controls qualified individual (PCQI) prepares it or oversees its preparation (21 CFR 117.126).',
          ],
        },
        {
          heading: 'Allergens: the control that matters most in a bakery',
          paragraphs: [
            'The major food allergens recognized by law in the United States are nine: milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans and sesame. Sesame was added by the FASTER Act and, since January 1, 2023, all FDA requirements for major food allergens, including labeling and manufacturing requirements, apply to sesame too (FDA, Food Allergies).',
            'The rule’s food allergen controls must cover two things: protecting food from allergen cross-contact during storage, handling and use, and labeling the finished food correctly (21 CFR 117.135(c)(2)).',
          ],
        },
        {
          heading: 'Products that need refrigeration',
          paragraphs: [
            'The rule treats baked goods that need time/temperature control differently. In its list of low-risk activity/food combinations, the \"baked goods\" category (breads, brownies, cakes, cookies) expressly excludes those that need temperature control, such as cream-filled pastries (21 CFR 117.5(g)(2)(ix)).',
            'Snacks such as potato or plantain chips fall under \"other fruit and vegetable products\" in the rule (21 CFR 117.5(g)(2)(ii)).',
          ],
        },
        {
          heading: 'Is my bakery a \"qualified facility\"?',
          paragraphs: [
            'A very small business, one averaging less than $1,000,000 per year (adjusted for inflation) in sales of human food plus the market value of food made or held without sale over the previous 3 years, is a qualified facility (21 CFR 117.3).',
            'A qualified facility does not have to comply with subparts C (hazard analysis and preventive controls) and G (supply chain), but it does have modified requirements: submitting to FDA an attestation of its status and another that it controls its hazards or complies with applicable local law (21 CFR 117.5(a) and 117.201). Subpart B good manufacturing practices still apply.',
          ],
        },
        {
          heading: 'Recalls and records',
          paragraphs: [
            'If you make a food with a hazard requiring a preventive control, you need a written recall plan assigning who notifies direct customers, who notifies the public when appropriate and who checks that the recall is complete (21 CFR 117.139).',
            'Part 117 records are kept at least 2 years after the date they were prepared (21 CFR 117.315).',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.p117_3, SRC.p117_4, SRC.p117_5, SRC.p117_126, SRC.p117_130, SRC.p117_135, SRC.p117_139, SRC.p117_201, SRC.p117_315, SRC.fdaAllergens, SRC.fdaPchf, SRC.reg1_225, SRC.reg1_226, SRC.reg1_230],
    faqSlugs: ['alergenos-que-declarar-en-la-etiqueta', 'regla-controles-preventivos-pchf-fsma', 'como-aprobar-y-verificar-suplidores', 'que-registros-de-inocuidad-debe-guardar-una-planta'],
    related: ['cafe', 'distribuidores'],
    todos: [
      'Panaderías que venden solo al consumidor: 21 CFR 1.226(c) exime del registro a los "retail food establishments"; verificar la definición en 1.227 antes de explicar cuándo una panadería con venta mixta califica.',
      'Cifra vigente del umbral de "very small business" ajustado por inflación: no la publicamos hasta confirmarla en fda.gov.',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'cafe',
    slug: { es: 'cafe-y-productos-secos', en: 'coffee-and-dry-foods' },
    es: {
      title: 'Inocuidad para torrefactores de café y productos secos en Puerto Rico: reglas de la FDA',
      metaTitle: 'Reglas de la FDA para café y productos secos | Stratum PR',
      description: 'Qué exige la FDA a quien tuesta, muele o empaca café y productos secos en Puerto Rico: registro, 21 CFR 117 y las exenciones de bajo riesgo para fincas.',
      lead: 'Tostar, moler o empacar café para la venta es una actividad que, en general, exige registrar la planta con la FDA y cumplir con 21 CFR 117. La regla tiene exenciones limitadas para negocios pequeños o muy pequeños que operan en una finca (\"farm mixed-type facility\") y solo hacen ciertas actividades de bajo riesgo con café tostado, como empacar, moler o rotular. El tueste en sí no aparece en esa lista de bajo riesgo.',
      sections: [
        {
          heading: 'Qué aplica a una torrefactora o empacadora',
          paragraphs: [
            'Una planta que manufactura, procesa, empaca o almacena alimentos para consumo en Estados Unidos debe registrarse (21 CFR 1.225), cumplir con las buenas prácticas de la subparte B de 21 CFR 117 y, salvo que sea instalación calificada o le aplique otra exención, tener un análisis de peligros escrito y un plan de inocuidad preparado por un PCQI (21 CFR 117.126 y 117.130).',
            'El análisis de peligros debe estar escrito aunque concluya que no hay peligros que requieran control preventivo (21 CFR 117.130(a)(2)).',
          ],
        },
        {
          heading: 'Exenciones para fincas: qué actividades con café cubren',
          paragraphs: [
            'La regla considera el café por separado de otras frutas \"para atender los peligros específicos\" de ese alimento (21 CFR 117.5(g)(2)). Para un negocio pequeño o muy pequeño que opera una \"farm mixed-type facility\", las subpartes C y G no aplican si las únicas actividades cubiertas que hace son combinaciones de bajo riesgo de la lista. Para café tostado, la lista incluye:',
          ],
          bullets: [
            'Empacar, reempacar y almacenar café tostado en la finca (21 CFR 117.5(g)(3)(v)).',
            'Moler café tostado (21 CFR 117.5(h)(3)(vii)).',
            'Mezclar café tostado (21 CFR 117.5(h)(3)(xxii)).',
            'Empacar café tostado (21 CFR 117.5(h)(3)(xxiii)).',
            'Rotular café tostado (21 CFR 117.5(h)(3)(viii)).',
          ],
        },
        {
          heading: 'El tueste y los demás productos secos',
          paragraphs: [
            'El tueste del café no aparece entre las actividades de bajo riesgo de 21 CFR 117.5(h)(3); la lista solo menciona tostar productos horneados y hacer productos de cacao a partir de cacao tostado. Si tu finca tuesta café, revisa con cuidado si te aplica la exención antes de asumirla.',
            'Para otros productos secos, la regla distingue entre los productos secados sin más procesamiento (como pasas o legumbres secas) y los que tienen procesamiento adicional, como harinas de legumbres o frutas secas rebanadas (21 CFR 117.5(g)(2)(i) y (ii)). Los establecimientos que solo descascaran, secan, empacan o almacenan nueces sin tostarlas no están sujetos a la subparte B (21 CFR 117.5(k)(1)(v)).',
          ],
        },
        {
          heading: 'Instalación calificada',
          paragraphs: [
            'Aunque no apliquen las exenciones de finca, un negocio muy pequeño (menos de $1,000,000 al año ajustado por inflación en ventas de alimentos para humanos más el valor de lo que manufactura o almacena sin vender, promedio de 3 años) es una instalación calificada: no tiene que cumplir las subpartes C y G, pero debe someter las atestaciones de 21 CFR 117.201 (21 CFR 117.3 y 117.5(a)).',
            'Si tu café o producto seco contiene alérgenos (por ejemplo, mezclas con nueces o leche), la rotulación de alérgenos aplica igual que en cualquier otro alimento.',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Food safety rules for coffee roasters and dry food makers in Puerto Rico',
      metaTitle: 'FDA rules for coffee and dry foods in PR | Stratum PR',
      description: 'What FDA requires of anyone roasting, grinding or packing coffee and dry foods in Puerto Rico: registration, 21 CFR 117 and low-risk farm exemptions.',
      lead: 'Roasting, grinding or packing coffee for sale generally requires registering the plant with FDA and complying with 21 CFR 117. The rule has limited exemptions for small or very small businesses operating on a farm (a \"farm mixed-type facility\") that only do certain low-risk activities with roasted coffee, such as packing, grinding or labeling. Roasting itself is not on that low-risk list.',
      sections: [
        {
          heading: 'What applies to a roaster or packer',
          paragraphs: [
            'A plant that manufactures, processes, packs or holds food for consumption in the United States must register (21 CFR 1.225), follow the good manufacturing practices in subpart B of 21 CFR 117 and, unless it is a qualified facility or another exemption applies, have a written hazard analysis and a food safety plan prepared by a PCQI (21 CFR 117.126 and 117.130).',
            'The hazard analysis must be written even if it concludes there are no hazards requiring a preventive control (21 CFR 117.130(a)(2)).',
          ],
        },
        {
          heading: 'Farm exemptions: which coffee activities they cover',
          paragraphs: [
            'The rule considers coffee beans separately from other fruits \"to appropriately address specific hazards\" of that food (21 CFR 117.5(g)(2)). For a small or very small business operating a farm mixed-type facility, subparts C and G do not apply if the only covered activities it conducts are low-risk combinations on the list. For roasted coffee, the list includes:',
          ],
          bullets: [
            'Packing, re-packing and storing roasted coffee beans on the farm (21 CFR 117.5(g)(3)(v)).',
            'Grinding roasted coffee beans (21 CFR 117.5(h)(3)(vii)).',
            'Mixing roasted coffee beans (21 CFR 117.5(h)(3)(xxii)).',
            'Packaging roasted coffee beans (21 CFR 117.5(h)(3)(xxiii)).',
            'Labeling roasted coffee beans (21 CFR 117.5(h)(3)(viii)).',
          ],
        },
        {
          heading: 'Roasting and other dry foods',
          paragraphs: [
            'Roasting coffee is not among the low-risk activities in 21 CFR 117.5(h)(3); the list only mentions roasting baked goods and making cocoa products from roasted cocoa beans. If your farm roasts coffee, check carefully whether the exemption applies before assuming it does.',
            'For other dry foods, the rule distinguishes products dried without further processing (such as raisins or dried legumes) from those with additional processing, such as legume flours or sliced dried fruit (21 CFR 117.5(g)(2)(i) and (ii)). Establishments solely engaged in hulling, shelling, drying, packing or holding nuts without roasting them are not subject to subpart B (21 CFR 117.5(k)(1)(v)).',
          ],
        },
        {
          heading: 'Qualified facility',
          paragraphs: [
            'Even without the farm exemptions, a very small business (less than $1,000,000 per year adjusted for inflation in human food sales plus the value of food made or held without sale, 3-year average) is a qualified facility: it does not have to comply with subparts C and G but must submit the attestations in 21 CFR 117.201 (21 CFR 117.3 and 117.5(a)).',
            'If your coffee or dry product contains allergens (for example, blends with nuts or milk), allergen labeling applies as it does to any other food.',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.p117_3, SRC.p117_5, SRC.p117_126, SRC.p117_130, SRC.p117_201, SRC.reg1_225, SRC.reg1_227, SRC.reg1_230],
    faqSlugs: ['regla-controles-preventivos-pchf-fsma', 'alergenos-que-declarar-en-la-etiqueta', 'donde-preguntar-a-la-fda-sobre-fsma'],
    related: ['panaderias', 'distribuidores'],
    todos: [
      'Definición de "farm" y "farm mixed-type facility" (21 CFR 1.227): resumirla en una sección propia tras leerla completa, porque decide si aplican las exenciones de 117.5(g)/(h).',
      'Confirmar si la FDA ha publicado guía específica sobre el tueste de café como actividad cubierta antes de decir más que "no aparece en la lista".',
      'Café verde almacenado: 117.5(j) exime el almacenamiento de productos agrícolas crudos "other than fruits and vegetables", y 117.5(g)(2) trata el café como fruta; confirmar con la FDA antes de publicar cualquier lectura.',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'carnes',
    slug: { es: 'carnes-y-aves', en: 'meat-and-poultry' },
    es: {
      title: 'Carnes y aves en Puerto Rico: reglas de USDA FSIS y cuándo aplica la FDA',
      metaTitle: 'Carnes y aves: reglas de USDA FSIS en PR | Stratum PR',
      description: 'Carnes, aves y huevo en Puerto Rico: cuándo regula USDA FSIS y cuándo la FDA, el HACCP de 9 CFR 417, los SSOP de 9 CFR 416 y cuánto guardar registros.',
      lead: 'Las carnes, las aves y los productos de huevo los regula el Servicio de Inocuidad e Inspección de Alimentos del USDA (FSIS), no la FDA. Un establecimiento oficial de FSIS necesita un análisis de peligros con diagrama de flujo, un plan HACCP escrito (9 CFR 417) y procedimientos de sanidad (SSOP) con registros diarios (9 CFR 416). Si la planta también procesa alimentos que regula la FDA, la FDA puede aplicar a esa parte.',
      sections: [
        {
          heading: '¿FDA o USDA?',
          paragraphs: [
            'FSIS administra la Ley Federal de Inspección de Carnes, la Ley de Inspección de Productos Avícolas y la Ley de Inspección de Productos de Huevo (9 CFR 300.2). Los demás alimentos los regula la FDA.',
            'Una instalación que está regulada exclusivamente por el USDA bajo esas tres leyes, en toda la instalación, no tiene que registrarse con la FDA (21 CFR 1.226(g)). La palabra clave es \"exclusivamente\": si en la misma planta procesas productos que regula la FDA, esa exención no aplica. La regla de transporte sanitario de la FDA tiene una exclusión con la misma condición (21 CFR 1.900(b)(3)).',
          ],
        },
        {
          heading: 'Análisis de peligros y plan HACCP (9 CFR 417)',
          paragraphs: [
            'Cada establecimiento oficial debe hacer un análisis de peligros que incluya un diagrama de flujo de cada proceso e identifique el uso o los consumidores del producto. Debe considerar toxinas naturales, contaminación microbiológica y química, plaguicidas, residuos de drogas, enfermedades zoonóticas, descomposición, parásitos, aditivos no aprobados y peligros físicos (9 CFR 417.2(a)).',
            'Si hay peligros razonablemente probables, necesita un plan HACCP escrito para cada producto. La regla agrupa los productos en nueve categorías de proceso, como matanza, crudo molido, crudo no molido, térmicamente procesado comercialmente estéril y completamente cocido no shelf-stable (9 CFR 417.2(b)).',
          ],
        },
        {
          heading: 'Validación, reevaluación anual y adiestramiento',
          paragraphs: [
            'El establecimiento debe validar que el plan controla los peligros y verificar que se implementa. El plan se reevalúa por lo menos una vez al año y cada vez que hay cambios que lo afecten, como materias primas, formulación, métodos, volumen, personal o empaque (9 CFR 417.4).',
            'Desarrollar y reevaluar el plan lo hace alguien que completó un curso sobre los siete principios de HACCP aplicados a carnes, aves o productos de huevo, que incluya preparar un plan y revisar registros. No tiene que ser empleado del establecimiento (9 CFR 417.7).',
          ],
        },
        {
          heading: 'SSOP: sanidad diaria documentada (9 CFR 416)',
          paragraphs: [
            'Los SSOP describen los procedimientos diarios, antes y durante la operación, para prevenir contaminación directa o adulteración del producto. Los firma y fecha la persona con autoridad general en el lugar, al implementarlos y cada vez que se modifican, e identifican la frecuencia y el empleado responsable de cada procedimiento (9 CFR 416.12).',
            'Los procedimientos preoperacionales se hacen antes de empezar, y la implementación se monitorea a diario (9 CFR 416.13).',
          ],
        },
        {
          heading: 'Registros: cuánto y dónde',
          paragraphs: [
            'Los registros de SSOP son diarios, con las iniciales y la fecha del empleado responsable. Se pueden llevar en computadora si hay controles que aseguren la integridad de los datos. Se guardan por lo menos 6 meses, deben estar en el establecimiento 48 horas después de completarse, y luego pueden estar fuera si se pueden entregar a FSIS en 24 horas (9 CFR 416.16).',
            'Los registros HACCP se guardan por lo menos 1 año para matanza y producto refrigerado, y por lo menos 2 años para producto congelado, preservado o shelf-stable (9 CFR 417.5(e)).',
          ],
        },
      ],
    },
    en: {
      title: 'Meat and poultry in Puerto Rico: USDA FSIS rules and when FDA applies',
      metaTitle: 'Meat and poultry: USDA FSIS rules in PR | Stratum PR',
      description: 'Meat, poultry and egg products in Puerto Rico: when USDA FSIS or FDA regulates, HACCP under 9 CFR 417, Sanitation SOPs under 9 CFR 416, record retention.',
      lead: 'Meat, poultry and egg products are regulated by USDA’s Food Safety and Inspection Service (FSIS), not FDA. An FSIS official establishment needs a hazard analysis with a flow chart, a written HACCP plan (9 CFR 417) and Sanitation SOPs with daily records (9 CFR 416). If the plant also processes FDA-regulated foods, FDA rules can apply to that part.',
      sections: [
        {
          heading: 'FDA or USDA?',
          paragraphs: [
            'FSIS administers the Federal Meat Inspection Act, the Poultry Products Inspection Act and the Egg Products Inspection Act (9 CFR 300.2). FDA regulates other foods.',
            'A facility regulated exclusively by USDA under those three laws, throughout the entire facility, does not have to register with FDA (21 CFR 1.226(g)). The key word is \"exclusively\": if the same plant processes FDA-regulated products, that exemption does not apply. FDA’s sanitary transportation rule has an exclusion with the same condition (21 CFR 1.900(b)(3)).',
          ],
        },
        {
          heading: 'Hazard analysis and HACCP plan (9 CFR 417)',
          paragraphs: [
            'Every official establishment must conduct a hazard analysis that includes a flow chart of each process and identifies the intended use or consumers of the product. It must consider natural toxins, microbiological and chemical contamination, pesticides, drug residues, zoonotic diseases, decomposition, parasites, unapproved additives and physical hazards (9 CFR 417.2(a)).',
            'If hazards are reasonably likely to occur, it needs a written HACCP plan for each product. The rule groups products into nine processing categories, such as slaughter, raw ground, raw not ground, thermally processed commercially sterile, and fully cooked not shelf stable (9 CFR 417.2(b)).',
          ],
        },
        {
          heading: 'Validation, annual reassessment and training',
          paragraphs: [
            'The establishment must validate that the plan controls the hazards and verify it is being implemented. The plan is reassessed at least annually and whenever changes could affect it, such as raw materials, formulation, methods, volume, personnel or packaging (9 CFR 417.4).',
            'Developing and reassessing the plan is done by someone who completed a course on the seven HACCP principles applied to meat, poultry or egg products, including developing a plan and record review. They need not be an employee of the establishment (9 CFR 417.7).',
          ],
        },
        {
          heading: 'Sanitation SOPs: documented daily sanitation (9 CFR 416)',
          paragraphs: [
            'Sanitation SOPs describe the daily procedures, before and during operations, to prevent direct contamination or adulteration of product. They are signed and dated by the individual with overall on-site authority when implemented and whenever modified, and they specify the frequency and the employee responsible for each procedure (9 CFR 416.12).',
            'Pre-operational procedures are done before operations start, and implementation is monitored daily (9 CFR 416.13).',
          ],
        },
        {
          heading: 'Records: how long and where',
          paragraphs: [
            'Sanitation SOP records are daily, initialed and dated by the responsible employee. They may be kept on computers if controls ensure data integrity. They are kept at least 6 months, must stay at the establishment for 48 hours after completion, and may then be kept off-site if they can be provided to FSIS within 24 hours (9 CFR 416.16).',
            'HACCP records are kept at least 1 year for slaughter and refrigerated product, and at least 2 years for frozen, preserved or shelf-stable product (9 CFR 417.5(e)).',
          ],
        },
      ],
    },
    sources: [SRC.p9_300_2, SRC.reg1_226, SRC.p1_900, SRC.p9_417_2, SRC.p9_417_4, SRC.p9_417_5, SRC.p9_417_7, SRC.p9_416_12, SRC.p9_416_13, SRC.p9_416_16],
    faqSlugs: ['que-registros-de-inocuidad-debe-guardar-una-planta', 'cuanto-tiempo-guardar-registros-de-inocuidad', 'registros-digitales-en-lugar-de-papel'],
    related: ['distribuidores', 'mariscos'],
    todos: [
      'fsis.usda.gov devolvió 403 a nuestras consultas automáticas: verificar a mano cómo opera la inspección de carnes y aves en Puerto Rico (inspección federal vs. programa local, oficina de distrito) antes de añadirlo.',
      'Confirmar a mano en fsis.usda.gov la frontera FDA/FSIS para productos con poca carne (por ejemplo, sopas o empanadillas con un porcentaje bajo de carne) antes de mencionarla.',
    ],
  },
  // ---------------------------------------------------------------------------------------------
  {
    id: 'distribuidores',
    slug: { es: 'distribuidores-y-almacenes', en: 'distributors-and-warehouses' },
    es: {
      title: 'Inocuidad para distribuidores y almacenes de alimentos en Puerto Rico: reglas de la FDA',
      metaTitle: 'Reglas de la FDA para almacenes de alimentos | Stratum PR',
      description: 'Qué exige la FDA a almacenes y distribuidores de alimentos en Puerto Rico: registro, 21 CFR 117.7 y 117.206 para refrigerados y el transporte sanitario.',
      lead: 'Un almacén o distribuidor que guarda alimentos para consumo en Estados Unidos es una instalación que debe registrarse con la FDA y cumplir con las buenas prácticas de 21 CFR 117. Si solo almacena alimentos empacados que no quedan expuestos, no necesita plan de inocuidad, pero si guarda productos refrigerados que requieren control de temperatura debe controlar, monitorear, verificar y documentar esa temperatura (21 CFR 117.206). Si despacha o transporta, también le aplica la regla de transporte sanitario.',
      sections: [
        {
          heading: 'Almacenar también es una actividad regulada',
          paragraphs: [
            'Para la FDA, \"almacenar\" (holding) incluye guardar alimentos y las actividades necesarias para distribuirlos, como romper paletas. La definición menciona expresamente almacenes, almacenes refrigerados, silos y tanques (21 CFR 1.227 y 117.3). Por eso un almacén en Puerto Rico es una instalación doméstica que debe registrarse.',
            'Las buenas prácticas de la subparte B aplican, y exigen que el almacenamiento y el transporte protejan el alimento contra el contacto cruzado con alérgenos, la contaminación biológica, química y física, y el deterioro del alimento y del envase (21 CFR 117.93).',
          ],
        },
        {
          heading: 'Alimentos empacados no expuestos: la exención de 117.7',
          paragraphs: [
            'Una instalación dedicada únicamente a almacenar alimentos empacados no expuestos (empaques que no dejan el alimento expuesto al ambiente) no está sujeta a las subpartes C (análisis de peligros y controles preventivos) ni G (cadena de suministro) (21 CFR 117.7(a)).',
            'También están exentas de esas subpartes las instalaciones que solo almacenan productos agrícolas crudos que no son frutas ni vegetales, destinados a distribución o procesamiento (21 CFR 117.5(j)).',
          ],
        },
        {
          heading: 'Si guardas productos refrigerados: 117.206',
          paragraphs: [
            'Si esa instalación guarda alimentos empacados refrigerados que requieren control de tiempo y temperatura para evitar el crecimiento de patógenos, le aplican requisitos modificados (21 CFR 117.7(b) y 117.206):',
          ],
          bullets: [
            'Establecer e implementar controles de temperatura adecuados.',
            'Monitorear esos controles con suficiente frecuencia.',
            'Si se pierde el control de temperatura: corregir el problema, evaluar la inocuidad del alimento afectado y evitar que entre al comercio si no se puede asegurar que no está adulterado.',
            'Calibrar (o verificar la exactitud de) los instrumentos de medición y registro de temperatura.',
            'Revisar los registros de monitoreo y acciones correctivas dentro de 7 días laborables, o en un plazo mayor si un PCQI lo justifica por escrito.',
            'Mantener registros de monitoreo, acciones correctivas y verificación, sujetos a la subparte F.',
          ],
        },
        {
          heading: 'Transporte sanitario',
          paragraphs: [
            'La regla de transporte sanitario (21 CFR 1, subparte O) aplica a remitentes, receptores, cargadores y transportistas, entre estados o no (21 CFR 1.900). Los vehículos y equipos deben poder limpiarse adecuadamente, mantenerse en condición sanitaria y, para alimentos que requieren control de temperatura, poder mantener esa temperatura (21 CFR 1.906).',
            'El remitente debe especificar por escrito al transportista los requisitos sanitarios del vehículo y, para alimentos que requieren control de temperatura, la temperatura de operación (21 CFR 1.908(b)). Esos registros se guardan 12 meses después de que terminan los acuerdos o procedimientos (21 CFR 1.912(a)).',
            'No es un negocio cubierto el remitente, receptor, cargador o transportista con menos de $500,000 (ajustado por inflación) en ingresos anuales promedio en los 3 años anteriores (21 CFR 1.904).',
          ],
        },
        {
          heading: 'Registro de la instalación',
          paragraphs: [REG_ES],
        },
      ],
    },
    en: {
      title: 'Food safety rules for food distributors and warehouses in Puerto Rico',
      metaTitle: 'FDA rules for food warehouses in Puerto Rico | Stratum PR',
      description: 'What FDA requires of food warehouses and distributors in Puerto Rico: registration, 21 CFR 117.7 and 117.206 for chilled food, and sanitary transport.',
      lead: 'A warehouse or distributor holding food for consumption in the United States is a facility that must register with FDA and follow the good manufacturing practices in 21 CFR 117. If it only stores unexposed packaged food it does not need a food safety plan, but if it holds refrigerated products that need temperature control it must control, monitor, verify and document that temperature (21 CFR 117.206). If it ships or transports food, the sanitary transportation rule applies too.',
      sections: [
        {
          heading: 'Holding food is a regulated activity too',
          paragraphs: [
            'For FDA, \"holding\" includes storing food and activities needed to distribute it, such as breaking down pallets. The definition expressly mentions warehouses, cold storage facilities, silos and tanks (21 CFR 1.227 and 117.3). That makes a warehouse in Puerto Rico a domestic facility that must register.',
            'Subpart B good manufacturing practices apply, and require that storage and transportation protect food against allergen cross-contact, biological, chemical and physical contamination, and deterioration of the food and its container (21 CFR 117.93).',
          ],
        },
        {
          heading: 'Unexposed packaged food: the 117.7 exemption',
          paragraphs: [
            'A facility solely engaged in storing unexposed packaged food (packaging that does not leave the food exposed to the environment) is not subject to subparts C (hazard analysis and preventive controls) or G (supply chain) (21 CFR 117.7(a)).',
            'Facilities solely storing raw agricultural commodities other than fruits and vegetables, intended for further distribution or processing, are also exempt from those subparts (21 CFR 117.5(j)).',
          ],
        },
        {
          heading: 'If you hold refrigerated products: 117.206',
          paragraphs: [
            'If that facility stores refrigerated packaged food that needs time/temperature control to prevent pathogen growth, modified requirements apply (21 CFR 117.7(b) and 117.206):',
          ],
          bullets: [
            'Establish and implement adequate temperature controls.',
            'Monitor those controls often enough.',
            'If temperature control is lost: correct the problem, evaluate the safety of the affected food and keep it out of commerce if you cannot ensure it is not adulterated.',
            'Calibrate (or check the accuracy of) temperature monitoring and recording devices.',
            'Review monitoring and corrective action records within 7 working days, or longer if a PCQI justifies it in writing.',
            'Keep monitoring, corrective action and verification records, subject to subpart F.',
          ],
        },
        {
          heading: 'Sanitary transportation',
          paragraphs: [
            'The sanitary transportation rule (21 CFR 1, subpart O) applies to shippers, receivers, loaders and carriers, whether or not the food crosses state lines (21 CFR 1.900). Vehicles and equipment must be adequately cleanable, kept sanitary and, for food that needs temperature control, able to maintain that temperature (21 CFR 1.906).',
            'The shipper must specify to the carrier in writing the sanitary requirements for the vehicle and, for temperature-controlled food, an operating temperature (21 CFR 1.908(b)). Those records are kept for 12 months after the agreements or procedures end (21 CFR 1.912(a)).',
            'A shipper, receiver, loader or carrier with less than $500,000 (adjusted for inflation) in average annual revenue over the previous 3 years is not a covered business (21 CFR 1.904).',
          ],
        },
        {
          heading: 'Facility registration',
          paragraphs: [REG_EN],
        },
      ],
    },
    sources: [SRC.reg1_225, SRC.reg1_227, SRC.reg1_230, SRC.p117_3, SRC.p117_5, SRC.p117_7, SRC.p117_93, SRC.p117_206, SRC.p1_900, SRC.p1_904, SRC.p1_906, SRC.p1_908, SRC.p1_912],
    faqSlugs: ['regla-trazabilidad-fsma-204', 'como-aprobar-y-verificar-suplidores', 'cuanto-tiempo-guardar-registros-de-inocuidad', 'registros-digitales-en-lugar-de-papel'],
    related: ['carnes', 'panaderias'],
    todos: [
      'FSMA 204 (trazabilidad) para distribuidores: añadir una sección sobre recibo y envío de alimentos de la Food Traceability List solo después de confirmar la fecha de cumplimiento vigente en fda.gov (ver el TODO de guides.ts).',
      'Importadores en Puerto Rico: evaluar una sección sobre FSVP (21 CFR 1, subparte L) tras verificar el texto.',
    ],
  },
];

/** Open items across all sector pages (not shown on the site). */
export const SECTORS_TODOS: string[] = [
  'Lácteos: no publicamos página todavía. La FDA dice que el cumplimiento de la regla de controles preventivos para instalaciones bajo el PMO (leche y productos Grado "A") se extendió para permitir cambios al PMO; falta confirmar el estado actual y cómo opera el programa Grado "A" en Puerto Rico. 21 CFR 1240.61 (pasteurización obligatoria) ya está verificado.',
  'fsis.usda.gov bloquea las consultas automáticas (403): verificar a mano las páginas de FSIS antes de ampliar la página de carnes y aves.',
  'Nombre "Better Process Control School" y lista de escuelas aprobadas: pendiente de una fuente de la FDA.',
  'Enlaces a /preguntas: la versión en inglés enlaza a las mismas rutas en español hasta que existan rutas /en/ para las preguntas.',
  ...SECTORS.flatMap((s) => s.todos.map((t) => `[${s.id}] ${t}`)),
];
