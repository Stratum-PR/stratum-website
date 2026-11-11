/**
 * Bilingual (Spanish-first) glossary of US food-safety regulatory terms for /glosario and
 * /en/glossary. Single source for the page, its DefinedTermSet JSON-LD and any crawler output.
 *
 * Every definition is a plain-language paraphrase of the linked primary source: the regulation's
 * own definition (21 CFR, 9 CFR, FD&C Act) where one exists, otherwise the agency or scheme owner's
 * page (fda.gov, mygfsi.com, sqfi.com, brcgs.com). Nothing here goes beyond what those sources say.
 * Sources fetched and checked November 11, 2026 (eCFR text current as of November 9, 2026).
 * Re-check the FSMA 204 compliance date and the SQF/BRCGS editions before editing.
 */

export const GLOSSARY_VERIFIED_ON = { es: '11 de noviembre de 2026', en: 'November 11, 2026' };

export const GLOSSARY_PATH = { es: '/glosario', en: '/en/glossary' } as const;

export interface GlossarySource {
  label: string;
  url: string;
}

export interface GlossaryTerm {
  /** ASCII slug, used as the in-page anchor (#id) and in DefinedTerm urls */
  id: string;
  term: { es: string; en: string };
  abbr?: string;
  es: { definition: string };
  en: { definition: string };
  sources: GlossarySource[];
  /** ids of other terms in GLOSSARY */
  related?: string[];
}

/** Open items we could not verify against a primary source on GLOSSARY_VERIFIED_ON. */
export const GLOSSARY_TODOS: string[] = [
  'USDA FSIS: fsis.usda.gov returned 403 to automated fetches on 2026-11-11, so the FSIS entry is based on 9 CFR 300.2 only. Check the agency\'s own "Who we are" page and add it as a source.',
  'BRCGS: brcgs.com does not state the current issue number of the Food Safety standard on the page we fetched; GFSI lists "BRCGS Global Standard for Food Safety issue 9". Confirm whether Issue 10 has replaced it before naming an issue.',
  'SQF: the GFSI recognition page lists "SQF food safety codes edition 9"; SQFI publishes Edition 10. Confirm Edition 10 GFSI recognition and the date its audits become mandatory (only secondary sources found) before stating either.',
  'No conformidad: definitions come from the SQF Edition 10 glossary (which cites ISO/IEC 19011). BRCGS grading (minor/major/critical) was not checked against brcgs.com.',
];

const S = {
  cfr117_3: { label: '21 CFR 117.3 (definiciones / definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/117.3' },
  cfr117_35: { label: '21 CFR 117.35 (operaciones sanitarias / sanitary operations)', url: 'https://www.law.cornell.edu/cfr/text/21/117.35' },
  cfr117_126: { label: '21 CFR 117.126 (plan de inocuidad / food safety plan)', url: 'https://www.law.cornell.edu/cfr/text/21/117.126' },
  cfr117_135: { label: '21 CFR 117.135 (controles preventivos / preventive controls)', url: 'https://www.law.cornell.edu/cfr/text/21/117.135' },
  cfr117_150: { label: '21 CFR 117.150 (acciones correctivas / corrective actions)', url: 'https://www.law.cornell.edu/cfr/text/21/117.150' },
  cfr117_410: { label: '21 CFR 117.410 (programa de cadena de suministro / supply-chain program)', url: 'https://www.law.cornell.edu/cfr/text/21/117.410' },
  cfr1_1310: { label: '21 CFR 1.1310 (definiciones FSMA 204 / FSMA 204 definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/1.1310' },
  cfr1_500: { label: '21 CFR 1.500 (definiciones FSVP / FSVP definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/1.500' },
  cfr1_502: { label: '21 CFR 1.502 (qué FSVP se requiere / what FSVP is required)', url: 'https://www.law.cornell.edu/cfr/text/21/1.502' },
  cfr1_227: { label: '21 CFR 1.227 (definiciones de registro / registration definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/1.227' },
  cfr1_230: { label: '21 CFR 1.230 (registro y renovación / registration and renewal)', url: 'https://www.law.cornell.edu/cfr/text/21/1.230' },
  cfr7_3: { label: '21 CFR 7.3 (definiciones de retiro / recall definitions)', url: 'https://www.law.cornell.edu/cfr/text/21/7.3' },
  cfr120_3: { label: '21 CFR 120.3 (HACCP de jugos / juice HACCP)', url: 'https://www.law.cornell.edu/cfr/text/21/120.3' },
  cfr123_3: { label: '21 CFR 123.3 (HACCP de mariscos / seafood HACCP)', url: 'https://www.law.cornell.edu/cfr/text/21/123.3' },
  cfr9_417_1: { label: '9 CFR 417.1 (HACCP de USDA FSIS / USDA FSIS HACCP)', url: 'https://www.law.cornell.edu/cfr/text/9/417.1' },
  cfr9_300_2: { label: '9 CFR 300.2 (responsabilidades de FSIS / FSIS responsibilities)', url: 'https://www.law.cornell.edu/cfr/text/9/300.2' },
  usc321: { label: 'FD&C Act sec. 201 (21 U.S.C. 321)', url: 'https://www.law.cornell.edu/uscode/text/21/321' },
  usc342: { label: 'FD&C Act sec. 402 (21 U.S.C. 342)', url: 'https://www.law.cornell.edu/uscode/text/21/342' },
  usc343: { label: 'FD&C Act sec. 403 (21 U.S.C. 343)', url: 'https://www.law.cornell.edu/uscode/text/21/343' },
  fdaWhat: { label: 'FDA: What We Do', url: 'https://www.fda.gov/about-fda/what-we-do' },
  fsma: { label: 'FDA: Food Safety Modernization Act (FSMA)', url: 'https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/food-safety-modernization-act-fsma' },
  registration: { label: 'FDA: Registration of Food Facilities', url: 'https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/registration-food-facilities-and-other-submissions' },
  cgmp: { label: 'FDA: Current Good Manufacturing Practices (CGMPs) for Food', url: 'https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/current-good-manufacturing-practices-cgmps-food-and-dietary-supplements' },
  haccp: { label: 'FDA: Hazard Analysis Critical Control Point (HACCP)', url: 'https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp' },
  haccpPrinciples: { label: 'FDA: HACCP Principles & Application Guidelines', url: 'https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines' },
  fsvp: { label: 'FDA: FSMA Final Rule on Foreign Supplier Verification Programs (FSVP)', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-foreign-supplier-verification-programs-fsvp-importers-food-humans-and-animals' },
  ftl: { label: 'FDA: Food Traceability List', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/food-traceability-list' },
  ftr: { label: 'FDA: Food Traceability Rule (FSMA 204)', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods' },
  form483: { label: 'FDA: Form 483 Frequently Asked Questions', url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/fda-form-483-frequently-asked-questions' },
  warningLetters: { label: 'FDA: About Warning and Close-Out Letters', url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/about-warning-and-close-out-letters' },
  importAlerts: { label: 'FDA: Import Alerts', url: 'https://www.fda.gov/industry/actions-enforcement/import-alerts' },
  recalls: { label: 'FDA: Recalls Background and Definitions', url: 'https://www.fda.gov/safety/industry-guidance-recalls/recalls-background-and-definitions' },
  gfsi: { label: 'GFSI: Overview', url: 'https://mygfsi.com/who-we-are/overview/' },
  gfsiCpo: { label: 'GFSI: Recognised Certification Programme Owners', url: 'https://mygfsi.com/how-to-implement/recognition/certification-programme-owners/' },
  sqf: { label: 'SQFI: SQF Institute', url: 'https://www.sqfi.com/' },
  sqfGlossary: { label: 'SQFI: Glossary (Edition 10)', url: 'https://www.sqfi.com/the-sqf-code/comply-with-the-code/glossary' },
  sqfMfg: { label: 'SQFI: Food Safety Code, Food Manufacturing (Edition 10)', url: 'https://www.sqfi.com/the-sqf-code/choose-your-code/library-of-codes/food-manufacturing' },
  brcgs: { label: 'BRCGS: Food Safety', url: 'https://www.brcgs.com/certification-listing/food-safety/' },
} satisfies Record<string, GlossarySource>;

export const GLOSSARY: GlossaryTerm[] = [
  // ── Agencies and laws ────────────────────────────────────────────────
  {
    id: 'fda',
    term: { es: 'FDA (Administración de Alimentos y Medicamentos)', en: 'FDA (Food and Drug Administration)' },
    abbr: 'FDA',
    es: { definition: 'Agencia federal de EE. UU. responsable, entre otras cosas, de proteger la salud pública asegurando la inocuidad del suministro de alimentos del país. Administra la Ley FD&C y las reglas de FSMA para las instalaciones de alimentos.' },
    en: { definition: 'The US federal agency responsible, among other things, for protecting public health by ensuring the safety of the nation\'s food supply. It administers the FD&C Act and the FSMA rules for food facilities.' },
    sources: [S.fdaWhat, S.fsma],
    related: ['fdca', 'fsma', 'usda-fsis'],
  },
  {
    id: 'usda-fsis',
    term: { es: 'USDA FSIS (Servicio de Inocuidad e Inspección de Alimentos)', en: 'USDA FSIS (Food Safety and Inspection Service)' },
    abbr: 'FSIS',
    es: { definition: 'Agencia del Departamento de Agricultura (USDA) encargada de aplicar la Ley Federal de Inspección de Carnes, la Ley de Inspección de Productos Avícolas y la Ley de Inspección de Productos de Huevo. Sus reglas están en el título 9 del CFR, incluido el HACCP de 9 CFR parte 417.' },
    en: { definition: 'The US Department of Agriculture (USDA) agency that carries out the Federal Meat Inspection Act, the Poultry Products Inspection Act and the Egg Products Inspection Act. Its rules are in title 9 of the CFR, including HACCP under 9 CFR part 417.' },
    sources: [S.cfr9_300_2, S.cfr9_417_1],
    related: ['fda', 'haccp'],
  },
  {
    id: 'fsma',
    term: { es: 'FSMA (Ley de Modernización de la Inocuidad Alimentaria)', en: 'FSMA (FDA Food Safety Modernization Act)' },
    abbr: 'FSMA',
    es: { definition: 'Ley federal firmada el 4 de enero de 2011 que cambia el enfoque de la inocuidad alimentaria en EE. UU.: de responder a brotes a prevenirlos. La FDA la implementa con varias reglas finales, entre ellas Controles Preventivos para Alimentos Humanos, FSVP y la regla de trazabilidad (FSMA 204).' },
    en: { definition: 'Federal law enacted on January 4, 2011 that shifts US food safety from responding to foodborne illness to preventing it. FDA implements it through several final rules, including Preventive Controls for Human Food, FSVP and the Food Traceability Rule (FSMA 204).' },
    sources: [S.fsma, S.registration],
    related: ['fda', 'control-preventivo', 'fsvp', 'lista-trazabilidad-ftl'],
  },
  {
    id: 'fdca',
    term: { es: 'Ley FD&C (Ley Federal de Alimentos, Medicamentos y Cosméticos)', en: 'FD&C Act (Federal Food, Drug, and Cosmetic Act)' },
    abbr: 'FD&C Act',
    es: { definition: 'La ley federal base que la FDA aplica a los alimentos. Define, entre otros, qué es un alérgeno principal (sección 201), cuándo un alimento está adulterado (sección 402) y cuándo está mal etiquetado (sección 403); está codificada en el título 21 del Código de EE. UU.' },
    en: { definition: 'The core federal law FDA enforces for food. Among other things it defines a major food allergen (section 201), when a food is adulterated (section 402) and when it is misbranded (section 403); it is codified in title 21 of the US Code.' },
    sources: [S.usc321, S.usc342, S.usc343],
    related: ['fda', 'alergeno-principal', 'producto-adulterado', 'mal-etiquetado'],
  },
  {
    id: 'registro-instalacion',
    term: { es: 'Registro de instalación alimentaria (FDA)', en: 'Food facility registration (FDA)' },
    es: { definition: 'Toda instalación que fabrica, procesa, empaca o almacena alimentos para consumo en EE. UU. debe registrarse con la FDA antes de empezar, salvo exenciones. Las plantas en Puerto Rico cuentan como instalaciones domésticas, y el registro se renueva cada dos años, del 1 de octubre al 31 de diciembre de cada año par.' },
    en: { definition: 'Every facility that manufactures, processes, packs or holds food for consumption in the US must register with FDA before it starts, unless exempt. Plants in Puerto Rico count as domestic facilities, and registration must be renewed every other year, between October 1 and December 31 of each even-numbered year.' },
    sources: [S.cfr1_227, S.cfr1_230, S.registration],
    related: ['fda', 'fsma'],
  },

  // ── Preventive controls (21 CFR 117) ─────────────────────────────────
  {
    id: 'bpm-cgmp',
    term: { es: 'Buenas prácticas de manufactura (BPM / cGMP)', en: 'Current Good Manufacturing Practices (cGMP)' },
    abbr: 'cGMP',
    es: { definition: 'Requisitos básicos de la FDA que aplican, en general, a quien fabrica, procesa, empaca o almacena alimentos: higiene del personal, diseño y mantenimiento de la planta y sus terrenos, equipos, operaciones sanitarias y controles de producción. Para alimentos humanos están en 21 CFR parte 117, subparte B.' },
    en: { definition: 'FDA\'s baseline requirements that generally apply to anyone who manufactures, processes, packs or holds food: personnel hygiene, plant and grounds design and upkeep, equipment, sanitary operations and production controls. For human food they are in 21 CFR part 117, subpart B.' },
    sources: [S.cgmp],
    related: ['saneamiento', 'contacto-cruzado-alergenos', 'producto-adulterado'],
  },
  {
    id: 'saneamiento',
    term: { es: 'Saneamiento (sanitizar)', en: 'Sanitation (sanitize)' },
    es: { definition: 'Sanitizar es tratar superficies ya limpias con un proceso que destruye las células vegetativas de patógenos y reduce mucho otros microorganismos indeseables, sin dañar el producto. Las BPM exigen mantener la planta limpia y en buen estado, y limpiar de forma que se evite el contacto cruzado con alérgenos y la contaminación.' },
    en: { definition: 'To sanitize is to treat already-cleaned surfaces with a process that destroys vegetative cells of pathogens and substantially reduces other undesirable microorganisms, without harming the product. The cGMPs require keeping the plant clean and in repair, and cleaning in a way that prevents allergen cross-contact and contamination.' },
    sources: [S.cfr117_3, S.cfr117_35],
    related: ['bpm-cgmp', 'contacto-cruzado-alergenos'],
  },
  {
    id: 'pcqi',
    term: { es: 'Individuo calificado en controles preventivos (PCQI)', en: 'Preventive Controls Qualified Individual (PCQI)' },
    abbr: 'PCQI',
    es: { definition: 'Persona que completó un adiestramiento en controles preventivos basados en riesgo al menos equivalente al currículo estandarizado reconocido por la FDA, o que está calificada por su experiencia de trabajo. Debe preparar o supervisar el plan de inocuidad alimentaria.' },
    en: { definition: 'A person who has completed training in risk-based preventive controls at least equivalent to the FDA-recognized standardized curriculum, or who is qualified through job experience. The PCQI must prepare, or oversee preparation of, the food safety plan.' },
    sources: [S.cfr117_3, S.cfr117_126],
    related: ['plan-inocuidad', 'control-preventivo'],
  },
  {
    id: 'plan-inocuidad',
    term: { es: 'Plan de inocuidad alimentaria', en: 'Food safety plan' },
    es: { definition: 'Documento escrito que exige 21 CFR 117 a las instalaciones cubiertas, preparado o supervisado por un PCQI. Incluye el análisis de peligros, los controles preventivos, el programa de cadena de suministro, el plan de retiro y los procedimientos de monitoreo, acciones correctivas y verificación.' },
    en: { definition: 'The written plan 21 CFR 117 requires of covered facilities, prepared or overseen by a PCQI. It includes the hazard analysis, preventive controls, supply-chain program, recall plan, and the procedures for monitoring, corrective actions and verification.' },
    sources: [S.cfr117_126],
    related: ['pcqi', 'peligro', 'control-preventivo', 'programa-cadena-suministro', 'retiro-recall'],
  },
  {
    id: 'peligro',
    term: { es: 'Peligro', en: 'Hazard' },
    es: { definition: 'Cualquier agente biológico, químico (incluido el radiológico) o físico que pueda causar enfermedad o lesión. El análisis de peligros identifica cuáles necesitan un control preventivo.' },
    en: { definition: 'Any biological, chemical (including radiological) or physical agent that has the potential to cause illness or injury. The hazard analysis identifies which ones require a preventive control.' },
    sources: [S.cfr117_3],
    related: ['peligro-razonablemente-previsible', 'control-preventivo', 'haccp'],
  },
  {
    id: 'peligro-razonablemente-previsible',
    term: { es: 'Peligro conocido o razonablemente previsible', en: 'Known or reasonably foreseeable hazard' },
    es: { definition: 'Un peligro biológico, químico o físico que se sabe, o que es posible, que está asociado con la instalación o con el alimento. Si una persona conocedora establecería controles para él según el análisis de peligros, pasa a ser un «peligro que requiere un control preventivo».' },
    en: { definition: 'A biological, chemical or physical hazard that is known to be, or has the potential to be, associated with the facility or the food. If a knowledgeable person would set controls for it based on the hazard analysis, it becomes a "hazard requiring a preventive control."' },
    sources: [S.cfr117_3],
    related: ['peligro', 'control-preventivo'],
  },
  {
    id: 'control-preventivo',
    term: { es: 'Control preventivo', en: 'Preventive control' },
    es: { definition: 'Procedimientos, prácticas y procesos basados en riesgo que una persona conocedora usaría para minimizar significativamente o prevenir los peligros identificados en el análisis de peligros. Incluyen controles en puntos críticos de control y otros, como controles de proceso, de alérgenos, de saneamiento y de cadena de suministro.' },
    en: { definition: 'Risk-based procedures, practices and processes that a knowledgeable person would use to significantly minimize or prevent the hazards identified in the hazard analysis. They include controls at critical control points and others, such as process, food allergen, sanitation and supply-chain controls.' },
    sources: [S.cfr117_3, S.cfr117_135],
    related: ['plan-inocuidad', 'punto-critico-control', 'peligro-razonablemente-previsible', 'programa-cadena-suministro'],
  },
  {
    id: 'monitoreo',
    term: { es: 'Monitoreo', en: 'Monitoring' },
    es: { definition: 'Realizar una secuencia planificada de observaciones o mediciones para evaluar si las medidas de control están funcionando como se espera. En HACCP de jugos y mariscos, el monitoreo también debe producir un registro exacto que luego se usa en la verificación.' },
    en: { definition: 'Conducting a planned sequence of observations or measurements to assess whether control measures are operating as intended. Under juice and seafood HACCP, monitoring must also produce an accurate record for use in verification.' },
    sources: [S.cfr117_3, S.cfr120_3],
    related: ['verificacion', 'limite-critico', 'accion-correctiva'],
  },
  {
    id: 'correccion',
    term: { es: 'Corrección', en: 'Correction' },
    es: { definition: 'Acción para identificar y corregir un problema ocurrido durante la producción, sin los demás pasos de una acción correctiva (evitar que se repita, evaluar el alimento afectado e impedir que llegue al comercio).' },
    en: { definition: 'An action to identify and correct a problem that occurred during food production, without the other steps of a corrective action (preventing recurrence, evaluating affected food and keeping it out of commerce).' },
    sources: [S.cfr117_3],
    related: ['accion-correctiva'],
  },
  {
    id: 'accion-correctiva',
    term: { es: 'Acción correctiva', en: 'Corrective action' },
    es: { definition: 'Procedimiento escrito que se sigue cuando un control preventivo no se implementó bien: identificar y corregir el problema, reducir la probabilidad de que se repita, evaluar la inocuidad del alimento afectado e impedir que entre al comercio si no se puede asegurar que no está adulterado. En SQF, además, debe basarse en un análisis de causa raíz.' },
    en: { definition: 'The written procedure followed when a preventive control was not properly implemented: identify and correct the problem, reduce the likelihood it recurs, evaluate the affected food for safety and keep it out of commerce unless it can be shown not to be adulterated. In SQF it must also be based on a root cause analysis.' },
    sources: [S.cfr117_150, S.cfr9_417_1, S.sqfGlossary],
    related: ['correccion', 'monitoreo', 'no-conformidad', 'limite-critico'],
  },
  {
    id: 'verificacion',
    term: { es: 'Verificación', en: 'Verification' },
    es: { definition: 'Métodos, procedimientos, pruebas y otras evaluaciones, además del monitoreo, que determinan si un control funciona o ha funcionado como se espera y que establecen la validez del plan de inocuidad.' },
    en: { definition: 'Methods, procedures, tests and other evaluations, in addition to monitoring, that determine whether a control is or has been operating as intended and that establish the validity of the food safety plan.' },
    sources: [S.cfr117_3, S.cfr120_3],
    related: ['validacion', 'monitoreo', 'plan-inocuidad'],
  },
  {
    id: 'validacion',
    term: { es: 'Validación', en: 'Validation' },
    es: { definition: 'Obtener y evaluar evidencia científica y técnica de que una medida de control, una combinación de medidas o el plan de inocuidad completo, bien implementado, sí es capaz de controlar los peligros identificados.' },
    en: { definition: 'Obtaining and evaluating scientific and technical evidence that a control measure, a combination of measures or the whole food safety plan, when properly implemented, is capable of effectively controlling the identified hazards.' },
    sources: [S.cfr117_3],
    related: ['verificacion', 'plan-inocuidad'],
  },
  {
    id: 'programa-cadena-suministro',
    term: { es: 'Programa de cadena de suministro', en: 'Supply-chain program' },
    es: { definition: 'Programa escrito que se requiere cuando un peligro de una materia prima o ingrediente se controla antes de que la planta lo reciba. Incluye usar suplidores aprobados, decidir y documentar actividades de verificación de suplidores (auditorías en sitio, muestreo y análisis, revisión de registros) y demostrar que el peligro quedó minimizado o prevenido.' },
    en: { definition: 'A written program required when a hazard in a raw material or ingredient is controlled before the plant receives it. It includes using approved suppliers, deciding on and documenting supplier verification activities (onsite audits, sampling and testing, records review) and showing the hazard has been minimized or prevented.' },
    sources: [S.cfr117_3, S.cfr117_410],
    related: ['control-preventivo', 'plan-inocuidad', 'fsvp'],
  },

  // ── HACCP ────────────────────────────────────────────────────────────
  {
    id: 'haccp',
    term: { es: 'HACCP (Análisis de peligros y puntos críticos de control)', en: 'HACCP (Hazard Analysis and Critical Control Point)' },
    abbr: 'HACCP',
    es: { definition: 'Sistema para identificar, evaluar y controlar peligros biológicos, químicos y físicos en toda la cadena, basado en siete principios: análisis de peligros, puntos críticos de control, límites críticos, monitoreo, acciones correctivas, verificación y registros. Es obligatorio para jugos (21 CFR 120), mariscos (21 CFR 123) y carnes y aves bajo USDA FSIS (9 CFR 417).' },
    en: { definition: 'A system for identifying, evaluating and controlling biological, chemical and physical hazards across the chain, based on seven principles: hazard analysis, critical control points, critical limits, monitoring, corrective actions, verification and record-keeping. It is mandatory for juice (21 CFR 120), seafood (21 CFR 123) and meat and poultry under USDA FSIS (9 CFR 417).' },
    sources: [S.haccpPrinciples, S.haccp, S.cfr9_417_1],
    related: ['punto-critico-control', 'limite-critico', 'monitoreo', 'accion-correctiva', 'verificacion'],
  },
  {
    id: 'punto-critico-control',
    term: { es: 'Punto crítico de control (PCC / CCP)', en: 'Critical control point (CCP)' },
    abbr: 'CCP',
    es: { definition: 'Un punto, paso o procedimiento del proceso donde se puede aplicar un control y donde ese control es esencial para prevenir o eliminar un peligro o reducirlo a un nivel aceptable. Los controles en PCC son uno de los tipos de control preventivo.' },
    en: { definition: 'A point, step or procedure in a food process where control can be applied and is essential to prevent or eliminate a food safety hazard or reduce it to an acceptable level. Controls at CCPs are one type of preventive control.' },
    sources: [S.cfr117_3, S.cfr9_417_1],
    related: ['haccp', 'limite-critico', 'control-preventivo'],
  },
  {
    id: 'limite-critico',
    term: { es: 'Límite crítico', en: 'Critical limit' },
    es: { definition: 'El valor máximo o mínimo al que se debe controlar un parámetro físico, biológico o químico en un punto crítico de control para prevenir, eliminar o reducir a un nivel aceptable el peligro identificado. Si no se cumple, se toma acción correctiva.' },
    en: { definition: 'The maximum or minimum value to which a physical, biological or chemical parameter must be controlled at a critical control point to prevent, eliminate or reduce the identified hazard to an acceptable level. If it is not met, corrective action follows.' },
    sources: [S.cfr120_3, S.cfr123_3, S.cfr9_417_1],
    related: ['punto-critico-control', 'monitoreo', 'accion-correctiva'],
  },

  // ── Allergens, adulteration, labeling ────────────────────────────────
  {
    id: 'alergeno-principal',
    term: { es: 'Alérgeno alimentario principal', en: 'Major food allergen' },
    es: { definition: 'Los nueve alimentos que define la Ley FD&C: leche, huevo, pescado, crustáceos, nueces de árbol, trigo, maní, soya y ajonjolí (sésamo), además de ingredientes que contengan proteína de ellos. Los aceites altamente refinados derivados de estos alimentos no cuentan como alérgenos principales.' },
    en: { definition: 'The nine foods defined in the FD&C Act: milk, egg, fish, crustacean shellfish, tree nuts, wheat, peanuts, soybeans and sesame, plus ingredients containing protein derived from them. Highly refined oils derived from these foods are excluded.' },
    sources: [S.usc321],
    related: ['contacto-cruzado-alergenos', 'mal-etiquetado'],
  },
  {
    id: 'contacto-cruzado-alergenos',
    term: { es: 'Contacto cruzado con alérgenos', en: 'Allergen cross-contact' },
    es: { definition: 'La incorporación no intencional de un alérgeno alimentario en un alimento. Las BPM exigen que la limpieza de utensilios y equipos proteja contra el contacto cruzado, y los controles de alérgenos de 21 CFR 117 buscan prevenirlo.' },
    en: { definition: 'The unintentional incorporation of a food allergen into a food. The cGMPs require cleaning of utensils and equipment to protect against cross-contact, and the food allergen controls in 21 CFR 117 aim to prevent it.' },
    sources: [S.cfr117_3, S.cfr117_35],
    related: ['alergeno-principal', 'saneamiento', 'bpm-cgmp'],
  },
  {
    id: 'producto-adulterado',
    term: { es: 'Alimento adulterado', en: 'Adulterated food' },
    es: { definition: 'Bajo la sección 402 de la Ley FD&C, un alimento está adulterado si, entre otros casos, contiene una sustancia dañina, contiene sustancias sucias o descompuestas, o fue preparado, empacado o almacenado en condiciones insalubres que pudieron contaminarlo. No hace falta que alguien se enferme: basta con las condiciones.' },
    en: { definition: 'Under FD&C Act section 402, a food is adulterated if, among other cases, it contains a harmful substance, contains filthy or decomposed matter, or was prepared, packed or held under insanitary conditions that may have contaminated it. No one has to get sick: the conditions are enough.' },
    sources: [S.usc342],
    related: ['mal-etiquetado', 'bpm-cgmp', 'retiro-recall', 'fdca'],
  },
  {
    id: 'mal-etiquetado',
    term: { es: 'Mal etiquetado (misbranded)', en: 'Misbranded food' },
    es: { definition: 'Bajo la sección 403 de la Ley FD&C, un alimento está mal etiquetado si, entre otros casos, su etiqueta es falsa o engañosa en cualquier detalle o no declara un alérgeno principal que contiene (por ejemplo, con la palabra «Contains» seguida de la fuente del alérgeno).' },
    en: { definition: 'Under FD&C Act section 403, a food is misbranded if, among other cases, its labeling is false or misleading in any particular or it fails to declare a major food allergen it contains (for example, with the word "Contains" followed by the allergen\'s food source).' },
    sources: [S.usc343],
    related: ['alergeno-principal', 'producto-adulterado', 'retiro-recall'],
  },

  // ── Enforcement ──────────────────────────────────────────────────────
  {
    id: 'formulario-483',
    term: { es: 'Formulario FDA 483', en: 'FDA Form 483' },
    abbr: '483',
    es: { definition: 'Documento que el investigador de la FDA entrega a la gerencia al terminar una inspección cuando observó condiciones que, a su juicio, pueden violar la Ley FD&C. No es una determinación final de la agencia; la FDA recomienda responder por escrito con un plan de acciones correctivas.' },
    en: { definition: 'The document an FDA investigator gives management at the end of an inspection when they observed conditions that, in their judgment, may violate the FD&C Act. It is not a final agency determination; FDA encourages a written response with a corrective action plan.' },
    sources: [S.form483],
    related: ['carta-advertencia', 'accion-correctiva'],
  },
  {
    id: 'carta-advertencia',
    term: { es: 'Carta de advertencia (Warning Letter)', en: 'Warning Letter' },
    es: { definition: 'Notificación que la FDA envía cuando identifica lo que considera violaciones significativas de requisitos federales. Explica las preocupaciones, da la oportunidad de corregirlas y pide una respuesta dentro de un plazo; la FDA publica estas cartas en su sitio web.' },
    en: { definition: 'A notice FDA sends when it identifies what it believes are significant violations of federal requirements. It explains the concerns, gives the company a chance to correct them and requests a response within a set time; FDA publishes these letters on its website.' },
    sources: [S.warningLetters],
    related: ['formulario-483', 'alerta-importacion'],
  },
  {
    id: 'retiro-recall',
    term: { es: 'Retiro de producto (recall)', en: 'Recall' },
    es: { definition: 'La remoción o corrección por la empresa de un producto ya en el mercado que la FDA considera en violación de la ley y contra el cual podría tomar acción legal, como un decomiso. Puede ser por iniciativa de la empresa, a petición de la FDA o por orden de la FDA; un retiro por una infracción menor (market withdrawal) no cuenta como recall.' },
    en: { definition: 'A firm\'s removal or correction of a marketed product that FDA considers in violation of the law and against which it could take legal action, such as seizure. It can be on the firm\'s own initiative, at FDA\'s request or by FDA order; a market withdrawal for a minor violation is not a recall.' },
    sources: [S.cfr7_3, S.recalls],
    related: ['clases-retiro', 'plan-inocuidad', 'producto-adulterado'],
  },
  {
    id: 'clases-retiro',
    term: { es: 'Clases de retiro: I, II y III', en: 'Recall classes: I, II and III' },
    es: { definition: 'La FDA clasifica cada retiro según el riesgo. Clase I: probabilidad razonable de causar consecuencias graves a la salud o la muerte. Clase II: puede causar efectos temporales o reversibles, o el riesgo grave es remoto. Clase III: no es probable que cause efectos adversos a la salud.' },
    en: { definition: 'FDA classifies each recall by risk. Class I: a reasonable probability of serious adverse health consequences or death. Class II: may cause temporary or medically reversible effects, or the probability of serious harm is remote. Class III: not likely to cause adverse health consequences.' },
    sources: [S.cfr7_3, S.recalls],
    related: ['retiro-recall'],
  },
  {
    id: 'alerta-importacion',
    term: { es: 'Alerta de importación (Import Alert)', en: 'Import Alert' },
    es: { definition: 'Aviso público de la FDA sobre productos y empresas que parecen violar la ley. Permite detener envíos futuros sin examinarlos físicamente (DWPE); el importador debe demostrar que el producto no tiene la violación para que lo liberen.' },
    en: { definition: 'A public FDA notice about products and firms that appear to violate the law. It lets FDA detain future shipments without physical examination (DWPE); the importer must show the product does not have the violation to get it released.' },
    sources: [S.importAlerts],
    related: ['fsvp', 'importador-fsvp', 'carta-advertencia'],
  },

  // ── Imports (FSVP) ───────────────────────────────────────────────────
  {
    id: 'fsvp',
    term: { es: 'FSVP (Programa de verificación de suplidores extranjeros)', en: 'FSVP (Foreign Supplier Verification Program)' },
    abbr: 'FSVP',
    es: { definition: 'Programa que el importador debe desarrollar, mantener y seguir para cada alimento que importa, que dé garantías de que el suplidor extranjero produce con el mismo nivel de protección de salud pública que exigen las reglas de controles preventivos o de inocuidad de productos agrícolas, y que el alimento no está adulterado ni mal etiquetado en cuanto a alérgenos.' },
    en: { definition: 'A program the importer must develop, maintain and follow for each food it imports, providing assurance that the foreign supplier produces it with the same level of public health protection as the preventive controls or produce safety rules require, and that the food is not adulterated or misbranded as to allergens.' },
    sources: [S.cfr1_502, S.fsvp],
    related: ['importador-fsvp', 'suplidor-extranjero', 'programa-cadena-suministro'],
  },
  {
    id: 'importador-fsvp',
    term: { es: 'Importador FSVP', en: 'FSVP importer' },
    es: { definition: 'El dueño o consignatario en EE. UU. de un alimento que se ofrece para importación. Si no hay dueño o consignatario en EE. UU. al momento de la entrada, es el agente o representante en EE. UU. del dueño extranjero, confirmado por una declaración firmada.' },
    en: { definition: 'The US owner or consignee of a food offered for import into the United States. If there is no US owner or consignee at entry, it is the US agent or representative of the foreign owner, confirmed by a signed statement of consent.' },
    sources: [S.cfr1_500, S.fsvp],
    related: ['fsvp', 'suplidor-extranjero'],
  },
  {
    id: 'suplidor-extranjero',
    term: { es: 'Suplidor extranjero', en: 'Foreign supplier' },
    es: { definition: 'Para FSVP, el establecimiento que fabrica o procesa el alimento, cría el animal o cultiva el alimento que se exporta a EE. UU., sin que otro establecimiento lo procese después (salvo etiquetar o algo igual de menor).' },
    en: { definition: 'For FSVP, the establishment that manufactures or processes the food, raises the animal or grows the food exported to the US, with no further processing by another establishment (other than labeling or a similarly minor activity).' },
    sources: [S.cfr1_500],
    related: ['fsvp', 'importador-fsvp'],
  },

  // ── Traceability (FSMA 204) ──────────────────────────────────────────
  {
    id: 'lista-trazabilidad-ftl',
    term: { es: 'Lista de trazabilidad de alimentos (FTL)', en: 'Food Traceability List (FTL)' },
    abbr: 'FTL',
    es: { definition: 'Lista de alimentos de la FDA que requieren registros adicionales de trazabilidad bajo FSMA 204, como quesos blandos, huevos con cáscara, mantequillas de nueces y ciertos productos frescos y mariscos. Incluye también alimentos que llevan un alimento de la lista como ingrediente si este sigue en la misma forma (por ejemplo, fresco). Por orden del Congreso, la FDA no hará cumplir la regla antes del 20 de julio de 2028; la extensión formal de la fecha sigue siendo una propuesta.' },
    en: { definition: 'FDA\'s list of foods that require additional traceability records under FSMA 204, such as soft cheeses, shell eggs, nut butters and certain fresh produce and seafood. It also covers foods that contain a listed food as an ingredient if it stays in the same form (e.g., fresh). By direction of Congress, FDA will not enforce the rule before July 20, 2028; the formal extension of the compliance date is still a proposal.' },
    sources: [S.cfr1_1310, S.ftl, S.ftr],
    related: ['cte', 'kde', 'lote-trazabilidad', 'codigo-lote-trazabilidad'],
  },
  {
    id: 'cte',
    term: { es: 'Evento crítico de rastreo (CTE)', en: 'Critical Tracking Event (CTE)' },
    abbr: 'CTE',
    es: { definition: 'Un evento en la cadena de suministro de un alimento de la FTL que exige guardar registros: cosecha, enfriamiento (antes del empaque inicial), empaque inicial, primer recibo en tierra de alimentos de barcos pesqueros, envío, recibo o transformación.' },
    en: { definition: 'An event in the supply chain of an FTL food that requires records: harvesting, cooling (before initial packing), initial packing, first land-based receiving of food from a fishing vessel, shipping, receiving or transformation.' },
    sources: [S.cfr1_1310, S.ftr],
    related: ['kde', 'lista-trazabilidad-ftl', 'lote-trazabilidad'],
  },
  {
    id: 'kde',
    term: { es: 'Elemento de datos clave (KDE)', en: 'Key Data Element (KDE)' },
    abbr: 'KDE',
    es: { definition: 'La información asociada a un evento crítico de rastreo que hay que registrar y, cuando se pida, entregar a la FDA. Los KDE requeridos varían según el evento, y la FDA puede pedirlos dentro de 24 horas o de otro plazo razonable que acuerde.' },
    en: { definition: 'The information tied to a critical tracking event that must be recorded and, when requested, provided to FDA. The required KDEs vary by event, and FDA can ask for them within 24 hours or another reasonable time it agrees to.' },
    sources: [S.cfr1_1310, S.ftr],
    related: ['cte', 'codigo-lote-trazabilidad', 'lista-trazabilidad-ftl'],
  },
  {
    id: 'lote-trazabilidad',
    term: { es: 'Lote de trazabilidad', en: 'Traceability lot' },
    es: { definition: 'Un lote de alimento de la FTL que se empacó inicialmente (productos agrícolas crudos), que recibió el primer receptor en tierra (alimentos de barcos pesqueros) o que se transformó. Cada lote de trazabilidad lleva su código.' },
    en: { definition: 'A batch or lot of an FTL food that has been initially packed (raw agricultural commodities), received by the first land-based receiver (food from a fishing vessel) or transformed. Each traceability lot gets its own code.' },
    sources: [S.cfr1_1310],
    related: ['codigo-lote-trazabilidad', 'cte'],
  },
  {
    id: 'codigo-lote-trazabilidad',
    term: { es: 'Código de lote de trazabilidad (TLC)', en: 'Traceability lot code (TLC)' },
    abbr: 'TLC',
    es: { definition: 'Un identificador, normalmente alfanumérico, que identifica de forma única un lote de trazabilidad dentro de los registros de quien lo asignó. El lugar donde se asignó se llama la fuente del código de lote de trazabilidad.' },
    en: { definition: 'A descriptor, often alphanumeric, that uniquely identifies a traceability lot within the records of whoever assigned it. The place where it was assigned is called the traceability lot code source.' },
    sources: [S.cfr1_1310],
    related: ['lote-trazabilidad', 'kde'],
  },

  // ── Certification schemes ────────────────────────────────────────────
  {
    id: 'gfsi',
    term: { es: 'GFSI (Iniciativa Global de Inocuidad Alimentaria)', en: 'GFSI (Global Food Safety Initiative)' },
    abbr: 'GFSI',
    es: { definition: 'Iniciativa del Consumer Goods Forum, que reúne a detallistas y fabricantes, que no certifica plantas: evalúa (benchmarking) y reconoce programas de certificación de terceros. Entre los programas que reconoce están SQF, BRCGS y FSSC 22000, bajo el principio de «certificado una vez, aceptado en todas partes».' },
    en: { definition: 'An initiative of the Consumer Goods Forum, bringing together retailers and manufacturers, that does not certify plants itself: it benchmarks and recognizes third-party certification programmes. Recognized programmes include SQF, BRCGS and FSSC 22000, under a "once certified, accepted everywhere" approach.' },
    sources: [S.gfsi, S.gfsiCpo],
    related: ['sqf', 'brcgs'],
  },
  {
    id: 'sqf',
    term: { es: 'SQF (Safe Quality Food)', en: 'SQF (Safe Quality Food)' },
    abbr: 'SQF',
    es: { definition: 'Programa de certificación de inocuidad y calidad del SQF Institute (SQFI), una división de FMI, reconocido por GFSI. Una entidad certificadora licenciada audita la planta contra el código SQF que le aplica (por ejemplo, Food Manufacturing, Edición 10), y la planta designa un SQF Practitioner para mantener el sistema.' },
    en: { definition: 'The food safety and quality certification program of the SQF Institute (SQFI), a division of FMI, recognized by GFSI. A licensed certification body audits the site against the applicable SQF code (for example, Food Manufacturing, Edition 10), and the site designates an SQF Practitioner to maintain the system.' },
    sources: [S.sqf, S.sqfGlossary, S.sqfMfg, S.gfsiCpo],
    related: ['gfsi', 'brcgs', 'no-conformidad'],
  },
  {
    id: 'brcgs',
    term: { es: 'BRCGS Food Safety', en: 'BRCGS Food Safety' },
    abbr: 'BRCGS',
    es: { definition: 'Estándar de certificación de inocuidad alimentaria de BRCGS para fabricantes, reconocido por GFSI. Lo usan los fabricantes para demostrar inocuidad, calidad y cumplimiento legal ante detallistas y marcas.' },
    en: { definition: 'BRCGS\'s food safety certification standard for manufacturers, recognized by GFSI. Manufacturers use it to demonstrate safety, quality and legality to retailers and brands.' },
    sources: [S.brcgs, S.gfsiCpo],
    related: ['gfsi', 'sqf', 'no-conformidad'],
  },
  {
    id: 'no-conformidad',
    term: { es: 'No conformidad', en: 'Non-conformance (non-conformity)' },
    es: { definition: 'El incumplimiento de un requisito, según lo encuentra un auditor. En SQF se clasifica como menor (falla aislada que no compromete la inocuidad), mayor (falla de un elemento del sistema o ausencia de evidencia) o crítica (falla de control con riesgo significativo para la salud pública, o falsificación sistemática de registros).' },
    en: { definition: 'Non-fulfillment of a requirement, as found by an auditor. SQF grades them as minor (an isolated lapse that does not compromise food safety), major (failure of a system element or absence of evidence) or critical (a breakdown of control likely to cause a significant public health risk, or systemic falsification of records).' },
    sources: [S.sqfGlossary],
    related: ['accion-correctiva', 'sqf', 'brcgs'],
  },
];
