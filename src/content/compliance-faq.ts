/**
 * Food-safety compliance FAQ for /preguntas. Single source for the page, its FAQPage JSON-LD,
 * the static HTML that crawlers read, and llms.txt / content.json (see discoverable-content.ts).
 *
 * Every answer states only what the linked official sources say. AI assistants quote this
 * page, so no invented figures, no clause numbers we could not check against the official
 * text (BRCGS), and dates stated exactly as the source states them. Sources verified
 * November 7, 2026; re-check dates (SQF Edition 10, FSMA 204) before editing.
 */
import { HOME_FAQ } from './home-faq';
import { PR_FAQ_CATEGORY, PR_FAQ_VERIFIED_ON } from './faq-puerto-rico';

export const FAQ_VERIFIED_ON = { es: '7 de noviembre de 2026', en: 'November 7, 2026' };

export interface FaqSource {
  label: string;
  url: string;
}

export interface FaqItem {
  id: string;
  es: { question: string; answer: string };
  en: { question: string; answer: string };
  sources?: FaqSource[];
}

export interface FaqCategory {
  id: string;
  es: string;
  en: string;
  items: FaqItem[];
  /** When this category's sources were last checked, if not FAQ_VERIFIED_ON */
  verifiedOn?: { es: string; en: string };
}

const SRC = {
  pchf: { label: 'FDA: Preventive Controls for Human Food', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food' },
  smallGuide: { label: 'FDA: Small Entity Compliance Guide (PCHF)', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/small-entity-compliance-guide-what-you-need-know-about-current-good-manufacturing-practice-hazard' },
  cfr117_190: { label: '21 CFR 117.190 (registros requeridos)', url: 'https://www.law.cornell.edu/cfr/text/21/117.190' },
  cfr117_305: { label: '21 CFR 117.305 (requisitos de los registros)', url: 'https://www.law.cornell.edu/cfr/text/21/117.305' },
  cfr117_315: { label: '21 CFR 117.315 (retención)', url: 'https://www.law.cornell.edu/cfr/text/21/117.315' },
  ftr: { label: 'FDA: Food Traceability Rule (FSMA 204)', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods' },
  ftl: { label: 'FDA: Food Traceability List', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/food-traceability-list' },
  ftrDate: { label: 'Federal Register: propuesta de nueva fecha (2025)', url: 'https://www.federalregister.gov/documents/2025/08/07/2025-14967/requirements-for-additional-traceability-records-for-certain-foods-compliance-date-extension' },
  allergens: { label: 'FDA: Food Allergies', url: 'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies' },
  cfr117_405: { label: '21 CFR 117.405 (cuándo se requiere)', url: 'https://www.law.cornell.edu/cfr/text/21/117.405' },
  cfr117_410: { label: '21 CFR 117.410 (programa de cadena de suministro)', url: 'https://www.law.cornell.edu/cfr/text/21/117.410' },
  cfr117_430: { label: '21 CFR 117.430 (auditoría anual en sitio)', url: 'https://www.law.cornell.edu/cfr/text/21/117.430' },
  tan: { label: 'FDA: FSMA Technical Assistance Network', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-technical-assistance-network-tan' },
  gfsiCert: { label: 'GFSI: Certification', url: 'https://mygfsi.com/how-to-implement/certification/' },
  gfsiRec: { label: 'GFSI: Recognition', url: 'https://mygfsi.com/how-to-implement/recognition/' },
  sqfCode: { label: 'SQFI: Food Safety Code, Food Manufacturing', url: 'https://www.sqfi.com/the-sqf-code/choose-your-code/library-of-codes/food-manufacturing' },
  sqfWhich: { label: 'SQFI: Which Code Edition Should I Use?', url: 'https://www.sqfi.com/the-sqf-code/comply-with-the-code/which-code-edition-should-i-use' },
  sqfFaq: { label: 'SQFI: Edition 10 FAQ', url: 'https://www.sqfi.com/the-sqf-code/comply-with-the-code/edition-10-faq' },
  brcgs: { label: 'BRCGS: Food Safety', url: 'https://www.brcgs.com/certification-listing/food-safety/' },
  walmart: { label: 'Walmart: Food Safety Requirements', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements' },
  walmartPrivate: { label: 'Walmart: marca privada (Private Brand)', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements/private-branded-products/u-s--produced-and-supplier-imported.html' },
  walmartNational: { label: 'Walmart: marca nacional (National Brand)', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements/national-branded-products/all-other-commodities.html' },
  cfr117_4: { label: "21 CFR 117.4 (capacitación)", url: "https://www.law.cornell.edu/cfr/text/21/117.4" },
  allergenFaq: { label: "FDA: Food Allergen Labeling Guidance FAQ (2025)", url: "https://www.fda.gov/food/food-allergensgluten-free-guidance-documents-regulatory-information/frequently-asked-questions-food-allergen-labeling-guidance-industry" },
  sqfCa: { label: "SQFI: cómo completar acciones correctivas", url: "https://www.sqfi.com/get-certified/help-center/view/how-do-i-complete-my-corrective-actions-in-the-sqf-assessment-database" },
  costcoV3: { label: "Costco (Azzule): Audit Expectations v3.0", url: "https://azzule.com/wp-content/uploads/2025/08/Food-Safety-Quality-Audit-Expectations-V3.pdf" },
  costcoV3Es: { label: "Costco (Azzule): Audit Expectations v3.0 en español", url: "https://azzule.com/wp-content/uploads/2025/08/Food-Safety-Quality-Audit-Expectations-V3-Spanish-Approved_20280827.pdf" },
  costcoCcof: { label: "CCOF: Costco actualiza sus expectativas de auditoría (2025)", url: "https://www.ccof.org/news/costco-releases-updated-food-safety-audit-expectations/" },
} satisfies Record<string, FaqSource>;

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'registros',
    es: 'Registros, etiquetas y suplidores',
    en: 'Records, labels and suppliers',
    items: [
      {
        id: 'que-registros',
        es: {
          question: '¿Qué registros de inocuidad debe guardar una planta de alimentos?',
          answer:
            "Bajo la regla de Controles Preventivos de la FDA (21 CFR 117), una planta guarda su plan de inocuidad y los registros que demuestran que funciona: monitoreo de los controles preventivos (por ejemplo, temperaturas), acciones correctivas, verificación (validación, calibración de instrumentos, pruebas de producto, monitoreo ambiental y revisión de registros), el programa de cadena de suministro cuando aplica, y la capacitación del PCQI (la persona calificada en controles preventivos), del auditor calificado y de los empleados en higiene e inocuidad. Las certificaciones como SQF y BRCGS piden registros parecidos y añaden otros, como control de documentos, auditorías internas y manejo de quejas.",
        },
        en: {
          question: 'What food safety records does a food plant need to keep?',
          answer:
            "Under the FDA Preventive Controls rule (21 CFR 117), a plant keeps its food safety plan and the records that show it works: monitoring of preventive controls (for example, temperatures), corrective actions, verification (validation, instrument calibration, product testing, environmental monitoring and records review), the supply-chain program where it applies, and training records for the PCQI (preventive controls qualified individual), the qualified auditor and employees trained in food hygiene and safety. Certifications such as SQF and BRCGS ask for similar records and add others, such as document control, internal audits and complaint handling.",
        },
        sources: [SRC.cfr117_190, SRC.cfr117_4, SRC.pchf, SRC.sqfCode],
      },
      {
        id: 'registro-valido',
        es: {
          question: '¿Qué debe tener un registro para que sea válido ante la FDA?',
          answer:
            "Según 21 CFR 117.305, los registros pueden ser originales, copias fieles o electrónicos; deben anotar los valores y observaciones reales; ser precisos, indelebles y legibles; hacerse en el momento en que ocurre la actividad; y ser tan detallados como haga falta para mostrar lo que se hizo. Deben incluir el nombre de la planta (y su ubicación cuando sea necesario), la fecha (y la hora cuando aplique), la firma o iniciales de quien hizo la actividad y, cuando aplique, el producto y el código de lote.",
        },
        en: {
          question: 'What makes a record valid for the FDA?',
          answer:
            "Under 21 CFR 117.305, records may be originals, true copies or electronic; they must capture the actual values and observations; be accurate, indelible and legible; be created when the activity happens; and be as detailed as needed to show what was done. They must include the facility name (and location when necessary), the date (and time when appropriate), the signature or initials of the person who did the activity and, where appropriate, the product and lot code.",
        },
        sources: [SRC.cfr117_305],
      },
      {
        id: 'retencion',
        es: {
          question: '¿Por cuánto tiempo hay que guardar los registros?',
          answer:
            "La FDA exige guardarlos por lo menos 2 años después de creados (21 CFR 117.315). Los registros que muestran que un equipo o proceso es adecuado, como las validaciones, se guardan 2 años después de dejar de usar ese equipo o proceso. Pueden estar fuera de la planta si se entregan en 24 horas cuando la FDA los pide, excepto el plan de inocuidad, que debe estar en la planta; un registro electrónico cuenta como \"en la planta\" si se puede abrir desde ella. SQF pide guardarlos por lo menos durante la vida útil del producto, o más si lo exige el cliente o la ley.",
        },
        en: {
          question: 'How long do records have to be kept?',
          answer:
            "The FDA requires keeping them for at least 2 years after they are created (21 CFR 117.315). Records showing that equipment or a process is adequate, such as validations, are kept 2 years after you stop using that equipment or process. Records may be stored offsite if they can be provided within 24 hours of an FDA request, except the food safety plan, which must stay onsite; an electronic record counts as onsite if it can be opened from the plant. SQF asks you to keep them at least for the product's shelf life, or longer if customers or the law require it.",
        },
        sources: [SRC.cfr117_315, SRC.sqfCode],
      },
      {
        id: 'digital',
        es: {
          question: '¿Puedo llevar los registros en formato digital en lugar de papel?',
          answer:
            'Sí. La regla de la FDA acepta registros electrónicos (21 CFR 117.305) y los exime de la Parte 11 a menos que otra regulación la exija. SQF pide que los registros sean legibles, accesibles, recuperables y estén guardados de forma segura, en cualquier formato. Lo importante es que el registro se haga en el momento, sea indeleble (que no se pueda borrar ni cambiar sin dejar rastro) y se encuentre rápido cuando lo piden.',
        },
        en: {
          question: 'Can I keep records digitally instead of on paper?',
          answer:
            'Yes. The FDA rule accepts electronic records (21 CFR 117.305) and exempts them from Part 11 unless another regulation requires it. SQF asks that records be legible, accessible, retrievable and securely stored, in any format. What matters is that the record is made at the time, is indelible (cannot be erased or changed without leaving a trace), and can be found quickly when someone asks for it.',
        },
        sources: [SRC.cfr117_305, SRC.sqfCode],
      },
      {
        id: 'alergenos-etiqueta',
        es: {
          question: '¿Qué alérgenos tengo que declarar en la etiqueta y cómo?',
          answer:
            "La FDA reconoce nueve alérgenos principales: leche, huevo, pescado, crustáceos, nueces de árbol, maní, trigo, soya y ajonjolí (sésamo), que se añadió con la ley FASTER desde el 1 de enero de 2023. Para nueces de árbol, pescado y crustáceos hay que nombrar el tipo específico, como almendra, bacalao o camarón. La etiqueta declara la fuente del alérgeno de una de dos formas: entre paréntesis después del ingrediente, como \"lecitina (soya)\", o en una declaración \"Contiene\" justo después o al lado de la lista de ingredientes, que debe incluir todos los alérgenos principales del producto. Desde su guía de enero de 2025, la FDA ya no considera el coco una nuez de árbol para la etiqueta de alérgenos, aunque sigue apareciendo en la lista de ingredientes. Las advertencias como \"puede contener\" son voluntarias, no sustituyen las buenas prácticas de manufactura y deben ser veraces.",
        },
        en: {
          question: 'Which allergens do I have to declare on the label, and how?',
          answer:
            "The FDA recognizes nine major food allergens: milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans and sesame, which the FASTER Act added effective January 1, 2023. For tree nuts, fish and crustacean shellfish, you must name the specific type, such as almond, cod or shrimp. The label declares the allergen source in one of two ways: in parentheses after the ingredient, such as \"lecithin (soy)\", or in a \"Contains\" statement immediately after or next to the ingredient list, which must list every major allergen in the product. Since its January 2025 guidance, the FDA no longer treats coconut as a tree nut for allergen labeling, although it still appears in the ingredient list. Advisory statements such as \"may contain\" are voluntary, do not replace good manufacturing practices and must be truthful.",
        },
        sources: [SRC.allergens, SRC.allergenFaq],
      },
      {
        id: 'aprobar-suplidores',
        es: {
          question: '¿Cómo apruebo y verifico a mis suplidores?',
          answer:
            "Si tu análisis de peligros identifica un peligro que tu suplidor controla antes de que la materia prima llegue a tu planta, la FDA exige un programa de cadena de suministro basado en riesgo (21 CFR 117.405). Ese programa incluye usar suplidores aprobados, decidir qué verificación hacer y con qué frecuencia, hacerla y documentarla. Las verificaciones pueden ser auditorías en sitio, muestreo y pruebas, o revisar los registros de inocuidad del suplidor. Si hay una probabilidad razonable de que el peligro cause consecuencias graves para la salud o la muerte, la regla pide una auditoría en sitio antes de usar el material y por lo menos una vez al año, salvo una determinación escrita que justifique otra verificación. Si el suplidor es una instalación calificada, una finca pequeña o un productor de huevos con menos de 3,000 gallinas, la regla permite verificarlo con garantías escritas. SQF también exige un programa de suplidores aprobados.",
        },
        en: {
          question: 'How do I approve and verify my suppliers?',
          answer:
            "If your hazard analysis identifies a hazard that your supplier controls before the raw material reaches your plant, the FDA requires a risk-based supply-chain program (21 CFR 117.405). The program includes using approved suppliers, deciding which verification to do and how often, doing it and documenting it. Verification can be onsite audits, sampling and testing, or reviewing the supplier's food safety records. If there is a reasonable probability that the hazard will cause serious adverse health consequences or death, the rule calls for an onsite audit before first use and at least once a year, unless a written determination justifies other verification. If the supplier is a qualified facility, a small farm or an egg producer with fewer than 3,000 hens, the rule allows verification through written assurances. SQF also requires an approved supplier program.",
        },
        sources: [SRC.cfr117_405, SRC.cfr117_410, SRC.cfr117_430, SRC.sqfCode],
      },
    ],
  },
  {
    id: 'fsma',
    es: 'FSMA (FDA)',
    en: 'FSMA (FDA)',
    items: [
      {
        id: 'pchf',
        es: {
          question: '¿Qué es la regla de Controles Preventivos (PCHF) de FSMA?',
          answer:
            "Es la regla de la FDA para alimentos de consumo humano. Exige buenas prácticas de manufactura (CGMP) y, para la mayoría de las plantas, un plan de inocuidad preparado por un PCQI, con análisis de peligros y controles preventivos basados en riesgo; cuando aplica, el plan incluye un programa de cadena de suministro y un plan de retiro. Los negocios muy pequeños (menos de aproximadamente $1 millón al año en ventas de alimentos, ajustado por inflación) son \"instalaciones calificadas\": cumplen con las CGMP y envían a la FDA una atestación cada 2 años, sin el plan completo. Las fechas de cumplimiento ya pasaron: 2017 para negocios pequeños (menos de 500 empleados) y 2018 para negocios muy pequeños. La FDA tiene una guía en lenguaje sencillo para negocios pequeños.",
        },
        en: {
          question: 'What is the FSMA Preventive Controls (PCHF) rule?',
          answer:
            "It is the FDA rule for human food. It requires current good manufacturing practices (CGMPs) and, for most plants, a food safety plan prepared by a PCQI, with a hazard analysis and risk-based preventive controls; where applicable, the plan includes a supply-chain program and a recall plan. Very small businesses (under about $1 million a year in food sales, adjusted for inflation) are \"qualified facilities\": they follow CGMPs and file an attestation with the FDA every 2 years instead of the full plan. The compliance dates have passed: 2017 for small businesses (under 500 employees) and 2018 for very small businesses. The FDA publishes a plain-language guide for small businesses.",
        },
        sources: [SRC.pchf, SRC.smallGuide],
      },
      {
        id: 'fsma204',
        es: {
          question: '¿Qué es la regla de trazabilidad FSMA 204 y cuándo aplica?',
          answer:
            "Exige registros adicionales para los alimentos de la Lista de Trazabilidad de la FDA: eventos críticos de rastreo, datos clave, códigos de lote de trazabilidad y un plan de trazabilidad, y entregar los registros a la FDA en 24 horas cuando los pida. La lista incluye, entre otros, quesos que no son duros, huevos con cascarón, mantequillas de nueces, pepinos, hierbas frescas (como cilantro), hojas verdes, melones, pimientos, tomates, frutas tropicales, frutas y vegetales frescos cortados, pescados de aleta, crustáceos, moluscos bivalvos y ensaladas listas para comer refrigeradas. Por orden del Congreso, la FDA no hará cumplir la regla antes del 20 de julio de 2028; la FDA propuso mover oficialmente la fecha a ese día, pero el cambio aún no es final.",
        },
        en: {
          question: 'What is the FSMA 204 traceability rule and when does it apply?',
          answer:
            "It requires additional records for foods on the FDA's Food Traceability List: critical tracking events, key data elements, traceability lot codes and a traceability plan, and handing records to the FDA within 24 hours when asked. The list includes, among others, non-hard cheeses, shell eggs, nut butters, cucumbers, fresh herbs (such as cilantro), leafy greens, melons, peppers, tomatoes, tropical tree fruits, fresh-cut fruits and vegetables, finfish, crustaceans, bivalve mollusks and refrigerated ready-to-eat deli salads. Under a directive from Congress, the FDA will not enforce the rule before July 20, 2028; the FDA has proposed formally moving the date there, but the change is not yet final.",
        },
        sources: [SRC.ftr, SRC.ftl, SRC.ftrDate],
      },
      {
        id: 'preguntar-fda',
        es: {
          question: '¿Dónde le puedo hacer preguntas sobre FSMA a la FDA?',
          answer:
            "La FDA tiene la FSMA Technical Assistance Network (TAN), donde envías tus preguntas por un formulario en línea. También publica respuestas a las preguntas más comunes.",
        },
        en: {
          question: 'Where can I ask the FDA questions about FSMA?',
          answer:
            "The FDA runs the FSMA Technical Assistance Network (TAN), where you submit questions through an online form. It also publishes answers to common questions.",
        },
        sources: [SRC.tan],
      },
    ],
  },
  {
    id: 'certificaciones',
    es: 'SQF, BRCGS y GFSI',
    en: 'SQF, BRCGS and GFSI',
    items: [
      {
        id: 'gfsi',
        es: {
          question: '¿Qué es GFSI y por qué los clientes piden SQF o BRCGS?',
          answer:
            "GFSI (Global Food Safety Initiative) no certifica plantas: reconoce programas de certificación que cumplen sus requisitos, como SQF y BRCGS. Un certificado reconocido por GFSI es aceptado por muchos compradores, lo que reduce las auditorías distintas que te piden, aunque algunos clientes igual hacen la suya. Por eso muchas cadenas y distribuidores lo piden a sus suplidores.",
        },
        en: {
          question: 'What is GFSI and why do buyers ask for SQF or BRCGS?',
          answer:
            "GFSI (Global Food Safety Initiative) does not certify plants: it recognizes certification programs that meet its requirements, such as SQF and BRCGS. A GFSI-recognized certificate is accepted by many buyers, which reduces the number of separate audits you face, though some customers still run their own. That is why many retailers and distributors ask their suppliers for one.",
        },
        sources: [SRC.gfsiCert, SRC.gfsiRec],
      },
      {
        id: 'sqf-edicion',
        es: {
          question: '¿Qué edición del código SQF aplica?',
          answer:
            "SQFI publicó la Edición 10 en marzo de 2026. Se espera que las auditorías bajo la Edición 10 empiecen no antes del 2 de enero de 2027, sujeto al reconocimiento de GFSI, y SQFI advierte que la fecha puede moverse. Hasta entonces se audita con la Edición 9, y una misma auditoría no mezcla requisitos de las dos ediciones: confirma con tu organismo de certificación cuál te aplica. Los códigos SQF se pueden consultar gratis en sqfi.com.",
        },
        en: {
          question: 'Which edition of the SQF Code applies?',
          answer:
            "SQFI published Edition 10 in March 2026. Edition 10 audits are expected to start no earlier than January 2, 2027, subject to GFSI benchmarking, and SQFI notes the date may move. Until then, audits use Edition 9, and a single audit does not mix requirements from both editions: confirm with your certification body which one applies to you. SQF codes are free to read at sqfi.com.",
        },
        sources: [SRC.sqfWhich, SRC.sqfFaq, SRC.sqfCode],
      },
      {
        id: 'sqf-documentos',
        es: {
          question: '¿Qué pide SQF sobre documentos y registros?',
          answer:
            "La sección 2.2 del código de Manufactura de Alimentos (Edición 10) pide control de documentos (el personal tiene acceso a la versión vigente y los cambios se comunican) y registros que demuestren que el sistema funciona y mejora: legibles, accesibles, recuperables y guardados de forma segura, por lo menos durante la vida útil del producto o más si lo exige el cliente o la ley.",
        },
        en: {
          question: 'What does SQF require for documents and records?',
          answer:
            "Section 2.2 of the Food Manufacturing code (Edition 10) requires document control (staff can access the current version and changes are communicated) and records that show the system is implemented and improving: legible, accessible, retrievable and securely stored, kept at least for the product's shelf life or longer if customers or the law require it.",
        },
        sources: [SRC.sqfCode],
      },
      {
        id: 'brcgs',
        es: {
          question: '¿Qué versión de BRCGS Food Safety está vigente?',
          answer:
            "La vigente es la Issue 9. BRCGS está preparando la Issue 10, pero no ha anunciado fecha de publicación.",
        },
        en: {
          question: 'Which version of BRCGS Food Safety is current?',
          answer:
            "Issue 9 is current. BRCGS is preparing Issue 10 but has not announced a publication date.",
        },
        sources: [SRC.brcgs],
      },
    ],
  },
  {
    id: 'auditorias',
    es: 'Auditorías y certificación',
    en: 'Audits and certification',
    items: [
      {
        id: 'tipos-auditoria',
        es: {
          question: '¿Qué diferencia hay entre una auditoría de primera, segunda y tercera parte?',
          answer:
            "Una auditoría de primera parte es interna: tu propio equipo (o alguien que contratas) revisa si la planta hace lo que dicen sus procedimientos. Una de segunda parte la hace un cliente a su suplidor, por ejemplo un supermercado que audita a quien le vende. Una de tercera parte la hace un organismo independiente contra un estándar como SQF o BRCGS, y es la que puede llevar a un certificado.",
        },
        en: {
          question: 'What is the difference between first-, second- and third-party audits?',
          answer:
            "A first-party audit is internal: your own team (or someone you hire) checks whether the plant does what its procedures say. A second-party audit is done by a customer on its supplier, for example a supermarket auditing a vendor. A third-party audit is done by an independent body against a standard such as SQF or BRCGS, and it is the one that can lead to a certificate.",
        },
      },
      {
        id: 'auditoria-vs-inspeccion',
        es: {
          question: '¿En qué se diferencia una auditoría de certificación de una inspección de la FDA?',
          answer:
            "La inspección de la FDA verifica que cumples la ley y puede tener consecuencias regulatorias. La auditoría de certificación la contratas tú con un organismo de certificación y verifica que cumples un estándar voluntario como SQF o BRCGS; una no conformidad crítica, una puntuación baja o no cerrar las no conformidades a tiempo pueden costarte el certificado. Aun así, no todas las auditorías se anuncian: SQF exige una auditoría sin aviso una vez cada tres años.",
        },
        en: {
          question: 'How is a certification audit different from an FDA inspection?',
          answer:
            "An FDA inspection checks that you comply with the law and can have regulatory consequences. A certification audit is one you arrange with a certification body to check that you meet a voluntary standard such as SQF or BRCGS; a critical nonconformity, a failing score or not closing nonconformities on time can cost you the certificate. Even so, not every audit is announced: SQF requires an unannounced audit once every three years.",
        },
        sources: [SRC.sqfCode, SRC.sqfFaq],
      },
      {
        id: 'dia-auditoria',
        es: {
          question: '¿Qué pasa el día de la auditoría?',
          answer:
            "Suele empezar con una reunión de apertura para confirmar el alcance y la agenda. Luego el auditor recorre la planta y observa la operación, revisa documentos y registros, y entrevista al personal para confirmar que lo escrito es lo que se hace. Termina con una reunión de cierre donde presenta los hallazgos. Empieza a corregir desde ahí: en SQF, el plazo para cerrar las no conformidades cuenta desde el final de la auditoría, no desde que llega el informe.",
        },
        en: {
          question: 'What happens on audit day?',
          answer:
            "It usually starts with an opening meeting to confirm scope and schedule. Then the auditor walks the plant and watches the operation, reviews documents and records, and interviews staff to confirm that what is written is what is done. It ends with a closing meeting where the findings are presented. Start correcting from there: in SQF, the deadline to close nonconformities runs from the end of the audit, not from when the report arrives.",
        },
      },
      {
        id: 'documentos-auditor',
        es: {
          question: '¿Qué documentos debo tener a mano cuando llega el auditor?',
          answer:
            "Como mínimo: el plan de inocuidad con su análisis de peligros, los procedimientos (SOP), los registros de monitoreo (temperaturas, limpieza y sanitación), las acciones correctivas, la verificación (calibración y revisión de registros), el control de alérgenos, la trazabilidad y el último simulacro de retiro, el monitoreo ambiental, la aprobación de suplidores, la capacitación del personal, el control de plagas, las auditorías internas, la revisión gerencial, los planes de fraude y defensa alimentaria, y los informes de auditorías anteriores con su cierre. Lo que más se nota es poder encontrar cualquier registro en minutos, no en horas.",
        },
        en: {
          question: 'Which documents should I have ready when the auditor arrives?',
          answer:
            "At a minimum: the food safety plan with its hazard analysis, the procedures (SOPs), monitoring records (temperatures, cleaning and sanitation), corrective actions, verification (calibration and records review), allergen control, traceability and your latest mock recall, environmental monitoring, supplier approval, staff training, pest control, internal audits, management review, food fraud and food defense plans, and previous audit reports with their close-out. What shows the most is being able to find any record in minutes, not hours.",
        },
        sources: [SRC.cfr117_190, SRC.sqfCode],
      },
      {
        id: 'no-conformidades',
        es: {
          question: '¿Qué es una no conformidad menor, mayor o crítica, y cuánto tiempo tengo para cerrarla?',
          answer:
            "En SQF, una no conformidad menor es una falla aislada o poco frecuente; una mayor es una falla de un elemento del sistema; y una crítica es una pérdida de control en un punto crítico, un programa de prerrequisitos u otro paso crítico que probablemente cause un riesgo significativo para la salud pública o contaminación del producto. Una crítica hace fallar una auditoría inicial o suspende el certificado en una recertificación. Para cerrar las menores y mayores: bajo la Edición 9, la que aplica hoy, normalmente tienes 30 días después de la auditoría, según lo que fije tu organismo de certificación; bajo la Edición 10 serán 40 días calendario desde el final de la auditoría, con evidencia del análisis de causa raíz. Si te auditan bajo BRCGS, confirma los plazos en sus reglas de certificación.",
        },
        en: {
          question: 'What is a minor, major or critical nonconformity, and how long do I have to close it?',
          answer:
            "In SQF, a minor nonconformity is an isolated or infrequent failure; a major one is a failure of a system element; and a critical one is a loss of control at a critical control point, a prerequisite program or another critical step that is likely to cause a significant public health risk or product contamination. A critical one fails an initial audit or suspends the certificate at recertification. To close minors and majors: under Edition 9, which applies today, you typically have 30 days after the audit, as set by your certification body; under Edition 10 it will be 40 calendar days from the end of the audit, with evidence of the root cause analysis. If you are audited under BRCGS, confirm the deadlines in its certification rules.",
        },
        sources: [SRC.sqfCode, SRC.sqfCa, SRC.brcgs],
      },
      {
        id: 'causa-raiz',
        es: {
          question: '¿Qué es un análisis de causa raíz y por qué lo piden?',
          answer:
            'Es investigar por qué ocurrió un problema para corregir la causa y no solo el síntoma, en lugar de culpar a una persona. Técnicas comunes son los "5 porqués" y el diagrama de espina de pescado. SQF exige métodos para identificar la causa raíz como parte de las acciones correctivas, y pide entregar evidencia de ese análisis para cerrar las no conformidades de una auditoría.',
        },
        en: {
          question: 'What is a root cause analysis and why is it required?',
          answer:
            'It is investigating why a problem happened so you fix the cause and not just the symptom, rather than blaming a person. Common techniques are the "5 whys" and the fishbone diagram. SQF requires methods to identify the root cause as part of corrective actions, and asks for evidence of that analysis to close audit nonconformities.',
        },
        sources: [SRC.sqfCode],
      },
      {
        id: 'fraude-alimentario',
        es: {
          question: '¿Qué es la evaluación de vulnerabilidad al fraude alimentario?',
          answer:
            "Es analizar qué materias primas, suplidores o productos son susceptibles a fraude, como sustituir un ingrediente por uno más barato, diluirlo, etiquetar mal el producto final o falsificarlo, y poner controles para reducir ese riesgo. A veces se le llama VACCP. SQF exige documentar, implementar y mantener los métodos, responsables y criterios para identificar la vulnerabilidad de la planta al fraude alimentario, y desarrollar e implementar un plan para mitigarlo.",
        },
        en: {
          question: 'What is a food fraud vulnerability assessment?',
          answer:
            "It is analyzing which raw materials, suppliers or products are susceptible to fraud, such as substituting a cheaper ingredient, diluting it, mislabeling the finished product or counterfeiting it, and putting controls in place to reduce that risk. It is sometimes called VACCP. SQF requires documenting, implementing and maintaining the methods, responsibilities and criteria for identifying the site's vulnerability to food fraud, and developing and implementing a plan to mitigate it.",
        },
        sources: [SRC.sqfCode],
      },
    ],
  },
  {
    id: 'cadenas',
    es: 'Vender a cadenas',
    en: 'Selling to retailers',
    items: [
      {
        id: 'walmart',
        es: {
          question: '¿Qué piden Walmart y Sam’s Club en inocuidad a sus suplidores?',
          answer:
            "Walmart publica sus requisitos de inocuidad para sus operaciones en Estados Unidos y Puerto Rico, que también cubren a Sam’s Club. Para productos de marca privada, cada planta debe estar certificada cada año bajo un estándar reconocido por GFSI. Para marcas nacionales se requiere una auditoría anual de inocuidad aprobada, y la certificación GFSI se recomienda; las inspecciones de la FDA o del estado no sustituyen esa auditoría. Hay reglas distintas para productos frescos, carne molida, aves, mariscos, huevos, embutidos y bayas congeladas, y en varias de esas categorías la certificación GFSI es obligatoria también para marcas nacionales: revisa la página de tu categoría.",
        },
        en: {
          question: 'What do Walmart and Sam’s Club require from suppliers on food safety?',
          answer:
            "Walmart publishes its food safety requirements for its U.S. and Puerto Rico operations, which also cover Sam’s Club. For private-brand products, every site must be certified each year to a GFSI-recognized standard. National brands need an approved annual food safety audit, and GFSI certification is encouraged; FDA or state inspections do not replace that audit. Fresh produce, ground beef, poultry, seafood, eggs, deli meats and frozen berries have their own rules, and several of them require GFSI certification even for national brands: check the page for your category.",
        },
        sources: [SRC.walmart, SRC.walmartPrivate, SRC.walmartNational],
      },
      {
        id: 'costco',
        es: {
          question: '¿Dónde encuentro los requisitos de inocuidad de Costco?',
          answer:
            "Costco no tiene una página de requisitos en costco.com. Sus requisitos están en las Global Food Safety Audit Expectations de Costco (versión 3.0, vigente desde el 1 de septiembre de 2025), con un Costco Addendum. Azzule, la plataforma de auditorías de Costco, publica los documentos, también en español. Confirma la versión vigente con tu comprador de Costco o con una compañía auditora aprobada por Costco.",
        },
        en: {
          question: 'Where can I find Costco’s food safety requirements?',
          answer:
            "Costco has no requirements page on costco.com. Its requirements are in Costco’s Global Food Safety Audit Expectations (version 3.0, effective September 1, 2025), with a Costco Addendum. Azzule, Costco’s audit platform, hosts the documents, including in Spanish. Confirm the current version with your Costco buyer or a Costco-approved audit company.",
        },
        sources: [SRC.costcoV3, SRC.costcoV3Es, SRC.costcoCcof],
      },
      {
        id: 'cadenas-pr',
        es: {
          question: "¿Qué piden las cadenas de Puerto Rico, como Pueblo, Econo, Selectos o Supermax?",
          answer:
            "Cada cadena fija sus requisitos con sus suplidores, normalmente a través del comprador o del distribuidor. Antes de tu primera reunión, pregunta qué auditoría o certificación aceptan (por ejemplo, una auditoría de tercera parte o un certificado reconocido por GFSI), qué seguro de responsabilidad y qué documentos piden, y cómo manejan los retiros. Tener tus registros al día y tu plan de inocuidad listo te ahorra tiempo con cualquier cadena.",
        },
        en: {
          question: "What do Puerto Rico chains such as Pueblo, Econo, Selectos or Supermax require?",
          answer:
            "Each chain sets its requirements with its suppliers, usually through the buyer or the distributor. Before your first meeting, ask which audit or certification they accept (for example, a third-party audit or a GFSI-recognized certificate), what liability insurance and documents they need, and how they handle recalls. Keeping your records current and your food safety plan ready saves time with any chain.",
        },
      },
    ],
  },
  { ...PR_FAQ_CATEGORY, verifiedOn: PR_FAQ_VERIFIED_ON },
  {
    id: 'stratum',
    es: 'Sobre Stratum PR',
    en: 'About Stratum PR',
    items: HOME_FAQ.map((f, i) => ({ id: `stratum-${i + 1}`, es: f.es, en: f.en })),
  },
];

export const ALL_FAQ_ITEMS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
