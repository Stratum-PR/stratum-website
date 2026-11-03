/**
 * Food-safety compliance FAQ for /preguntas. Single source for the page, its FAQPage JSON-LD,
 * the static HTML that crawlers read, and llms.txt / content.json (see discoverable-content.ts).
 *
 * Every answer states only what the linked official sources say. AI assistants quote this
 * page, so no invented figures, no clause numbers we could not check against the official
 * text (BRCGS), and dates stated exactly as the source states them. Sources verified
 * November 2, 2026; re-check dates (SQF Edition 10, FSMA 204) before editing.
 */
import { HOME_FAQ } from './home-faq';

export const FAQ_VERIFIED_ON = { es: '2 de noviembre de 2026', en: 'November 2, 2026' };

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
  saludPR: { label: 'Departamento de Salud de PR: Salud Ambiental', url: 'https://www.salud.pr.gov/CMS/185' },
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
            'Bajo la regla de Controles Preventivos de la FDA (21 CFR 117), una planta guarda su plan de inocuidad y los registros que demuestran que funciona: monitoreo de los controles preventivos (por ejemplo, temperaturas), acciones correctivas, verificación (validación, calibración de instrumentos, pruebas de producto, monitoreo ambiental y revisión de registros), el programa de cadena de suministro y la capacitación del PCQI. Las certificaciones como SQF y BRCGS piden registros parecidos y añaden otros, como control de documentos, auditorías internas y manejo de quejas.',
        },
        en: {
          question: 'What food safety records does a food plant need to keep?',
          answer:
            "Under the FDA Preventive Controls rule (21 CFR 117), a plant keeps its food safety plan and the records that show it works: monitoring of preventive controls (for example, temperatures), corrective actions, verification (validation, instrument calibration, product testing, environmental monitoring and records review), the supply-chain program and PCQI training. Certifications such as SQF and BRCGS ask for similar records and add others, such as document control, internal audits and complaint handling.",
        },
        sources: [SRC.cfr117_190, SRC.pchf, SRC.sqfCode],
      },
      {
        id: 'registro-valido',
        es: {
          question: '¿Qué debe tener un registro para que sea válido ante la FDA?',
          answer:
            'Según 21 CFR 117.305, los registros pueden ser originales, copias fieles o electrónicos; deben anotar los valores y observaciones reales; ser precisos, indelebles y legibles; hacerse en el momento en que ocurre la actividad; e incluir el nombre y lugar de la planta, la fecha y hora, la firma o iniciales de quien hizo la actividad y, cuando aplique, el producto y el código de lote.',
        },
        en: {
          question: 'What makes a record valid for the FDA?',
          answer:
            'Under 21 CFR 117.305, records may be originals, true copies or electronic; they must capture the actual values and observations; be accurate, indelible and legible; be created when the activity happens; and include the facility name and location, the date and time, the signature or initials of the person who did the activity and, where appropriate, the product and lot code.',
        },
        sources: [SRC.cfr117_305],
      },
      {
        id: 'retencion',
        es: {
          question: '¿Por cuánto tiempo hay que guardar los registros?',
          answer:
            'La FDA exige guardarlos por lo menos 2 años después de creados (21 CFR 117.315). Pueden guardarse fuera de la planta si se pueden recuperar en 24 horas, excepto el plan de inocuidad, que debe estar en la planta. SQF pide fijar la retención según los requisitos del cliente, legales y regulatorios.',
        },
        en: {
          question: 'How long do records have to be kept?',
          answer:
            'The FDA requires keeping them for at least 2 years after they are created (21 CFR 117.315). They may be stored offsite if they can be retrieved within 24 hours, except the food safety plan, which must stay onsite. SQF asks you to set retention based on customer, legal and regulatory requirements.',
        },
        sources: [SRC.cfr117_315, SRC.sqfCode],
      },
      {
        id: 'digital',
        es: {
          question: '¿Puedo llevar los registros en formato digital en lugar de papel?',
          answer:
            'Sí. La regla de la FDA acepta registros electrónicos (21 CFR 117.305) y los exime de la Parte 11 a menos que otra regulación la exija. SQF pide que los registros sean legibles, accesibles, recuperables y estén guardados de forma segura, en cualquier formato. Lo importante es que el registro se haga en el momento, sea indeleble (que no se pueda borrar) y se encuentre rápido cuando lo piden.',
        },
        en: {
          question: 'Can I keep records digitally instead of on paper?',
          answer:
            'Yes. The FDA rule accepts electronic records (21 CFR 117.305) and exempts them from Part 11 unless another regulation requires it. SQF asks that records be legible, accessible, retrievable and securely stored, in any format. What matters is that the record is made at the time, is indelible (cannot be erased), and can be found quickly when someone asks for it.',
        },
        sources: [SRC.cfr117_305, SRC.sqfCode],
      },
      {
        id: 'alergenos-etiqueta',
        es: {
          question: '¿Qué alérgenos tengo que declarar en la etiqueta y cómo?',
          answer:
            'La FDA reconoce nueve alérgenos principales: leche, huevo, pescado, crustáceos, nueces de árbol, maní, trigo, soya y ajonjolí (sésamo). El ajonjolí se añadió con la ley FASTER, vigente desde el 1 de enero de 2023. La etiqueta debe declarar la fuente del alérgeno de una de dos formas: entre paréntesis después del ingrediente, como "lecitina (soya)", o en una declaración "Contiene" justo después o al lado de la lista de ingredientes, como "Contiene trigo, leche y soya". Las advertencias como "puede contener" son voluntarias, no sustituyen las buenas prácticas de manufactura y deben ser veraces.',
        },
        en: {
          question: 'Which allergens do I have to declare on the label, and how?',
          answer:
            'The FDA recognizes nine major food allergens: milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans and sesame. Sesame was added by the FASTER Act, effective January 1, 2023. The label must declare the allergen source in one of two ways: in parentheses after the ingredient, such as "lecithin (soy)", or in a "Contains" statement immediately after or next to the ingredient list, such as "Contains wheat, milk, and soy." Advisory statements such as "may contain" are voluntary, do not replace good manufacturing practices and must be truthful.',
        },
        sources: [SRC.allergens],
      },
      {
        id: 'aprobar-suplidores',
        es: {
          question: '¿Cómo apruebo y verifico a mis suplidores?',
          answer:
            'Si tu análisis de peligros identifica un peligro que tu suplidor controla antes de que la materia prima llegue a tu planta, la FDA exige un programa de cadena de suministro basado en riesgo (21 CFR 117.405). Ese programa incluye usar suplidores aprobados, decidir qué verificación hacer y con qué frecuencia, hacerla y documentarla. Las verificaciones pueden ser auditorías en sitio, muestreo y pruebas, o revisar los registros de inocuidad del suplidor. Si el peligro puede causar consecuencias graves para la salud o la muerte, la regla pide una auditoría en sitio antes de usar el material y por lo menos una vez al año, salvo una determinación escrita que justifique otra verificación. SQF también exige un programa de suplidores aprobados.',
        },
        en: {
          question: 'How do I approve and verify my suppliers?',
          answer:
            'If your hazard analysis identifies a hazard that your supplier controls before the raw material reaches your plant, the FDA requires a risk-based supply-chain program (21 CFR 117.405). The program includes using approved suppliers, deciding which verification to do and how often, doing it and documenting it. Verification can be onsite audits, sampling and testing, or reviewing the supplier’s food safety records. If the hazard could cause serious adverse health consequences or death, the rule calls for an onsite audit before first use and at least once a year, unless a written determination justifies other verification. SQF also requires an approved supplier program.',
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
            'Es la regla de la FDA para alimentos de consumo humano que exige buenas prácticas de manufactura (CGMP), un análisis de peligros y controles preventivos basados en riesgo, documentados en un plan de inocuidad, con su programa de cadena de suministro y plan de retiro. Las fechas de cumplimiento ya pasaron: 2017 para negocios pequeños y 2018 para negocios muy pequeños. La FDA tiene una guía en lenguaje sencillo para negocios pequeños.',
        },
        en: {
          question: 'What is the FSMA Preventive Controls (PCHF) rule?',
          answer:
            'It is the FDA rule for human food that requires current good manufacturing practices (CGMPs), a hazard analysis and risk-based preventive controls, documented in a food safety plan with a supply-chain program and recall plan. The compliance dates have passed: 2017 for small businesses and 2018 for very small businesses. The FDA publishes a plain-language guide for small businesses.',
        },
        sources: [SRC.pchf, SRC.smallGuide],
      },
      {
        id: 'fsma204',
        es: {
          question: '¿Qué es la regla de trazabilidad FSMA 204 y cuándo aplica?',
          answer:
            'Exige registros adicionales para los alimentos de la Lista de Trazabilidad de la FDA: eventos críticos de rastreo, datos clave, códigos de lote de trazabilidad y un plan de trazabilidad, y entregar los registros a la FDA en 24 horas cuando los pida. La lista incluye, entre otros, quesos que no son duros, huevos, mantequillas de nueces, pimientos, tomates, frutas tropicales, frutas y vegetales cortados frescos, pescados y mariscos, y ensaladas listas para comer. Por orden del Congreso, la FDA no hará cumplir la regla antes del 20 de julio de 2028; la FDA propuso mover oficialmente la fecha a ese día, pero el cambio aún no es final.',
        },
        en: {
          question: 'What is the FSMA 204 traceability rule and when does it apply?',
          answer:
            "It requires additional records for foods on the FDA's Food Traceability List: critical tracking events, key data elements, traceability lot codes and a traceability plan, and handing records to the FDA within 24 hours when asked. The list includes, among others, non-hard cheeses, shell eggs, nut butters, peppers, tomatoes, tropical tree fruits, fresh-cut fruits and vegetables, fish and shellfish, and ready-to-eat deli salads. Under a directive from Congress, the FDA will not enforce the rule before July 20, 2028; the FDA has proposed formally moving the date there, but the change is not yet final.",
        },
        sources: [SRC.ftr, SRC.ftl, SRC.ftrDate],
      },
      {
        id: 'preguntar-fda',
        es: {
          question: '¿Dónde le puedo hacer preguntas sobre FSMA a la FDA?',
          answer:
            'La FDA tiene la FSMA Technical Assistance Network (TAN), un servicio gratuito para enviar preguntas por formulario en línea, con respuestas a preguntas frecuentes ya publicadas.',
        },
        en: {
          question: 'Where can I ask the FDA questions about FSMA?',
          answer:
            'The FDA runs the FSMA Technical Assistance Network (TAN), a free service where you submit questions through an online form, with answers to common questions already published.',
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
            'GFSI (Global Food Safety Initiative) no certifica plantas: reconoce programas de certificación que cumplen sus requisitos, como SQF y BRCGS. Un certificado reconocido por GFSI es aceptado por muchos compradores a la vez, lo que evita auditorías repetidas. Por eso muchas cadenas y distribuidores lo piden a sus suplidores.',
        },
        en: {
          question: 'What is GFSI and why do buyers ask for SQF or BRCGS?',
          answer:
            'GFSI (Global Food Safety Initiative) does not certify plants: it recognizes certification programs that meet its requirements, such as SQF and BRCGS. A GFSI-recognized certificate is accepted by many buyers at once, which avoids repeated audits. That is why many retailers and distributors ask their suppliers for one.',
        },
        sources: [SRC.gfsiCert, SRC.gfsiRec],
      },
      {
        id: 'sqf-edicion',
        es: {
          question: '¿Qué edición del código SQF aplica?',
          answer:
            'SQFI publicó la Edición 10 en marzo de 2026, pero las auditorías bajo la Edición 10 no comenzarán antes del 2 de enero de 2027, sujeto al reconocimiento de GFSI. Hasta entonces se audita con la Edición 9. Los códigos SQF se pueden consultar gratis en sqfi.com.',
        },
        en: {
          question: 'Which edition of the SQF Code applies?',
          answer:
            'SQFI published Edition 10 in March 2026, but Edition 10 audits will not start before January 2, 2027, subject to GFSI benchmarking. Until then, audits use Edition 9. SQF codes are free to read at sqfi.com.',
        },
        sources: [SRC.sqfWhich, SRC.sqfFaq, SRC.sqfCode],
      },
      {
        id: 'sqf-documentos',
        es: {
          question: '¿Qué pide SQF sobre documentos y registros?',
          answer:
            'La sección 2.2 del código de Manufactura de Alimentos (Edición 10) pide control de documentos (el personal tiene acceso a la versión vigente y los cambios se comunican) y registros que demuestren que el sistema funciona y mejora: legibles, accesibles, recuperables y guardados de forma segura, con un período de retención definido.',
        },
        en: {
          question: 'What does SQF require for documents and records?',
          answer:
            'Section 2.2 of the Food Manufacturing code (Edition 10) requires document control (staff can access the current version and changes are communicated) and records that show the system is implemented and improving: legible, accessible, retrievable and securely stored, with a defined retention period.',
        },
        sources: [SRC.sqfCode],
      },
      {
        id: 'brcgs',
        es: {
          question: '¿Qué versión de BRCGS Food Safety está vigente?',
          answer:
            'La vigente es la Issue 9. BRCGS está desarrollando la Issue 10, pero no ha anunciado fecha oficial de publicación. El estándar incluye requisitos de control de documentos y de registros; consulta el texto oficial de BRCGS para el detalle de cada cláusula.',
        },
        en: {
          question: 'Which version of BRCGS Food Safety is current?',
          answer:
            'Issue 9 is current. BRCGS is developing Issue 10 but has not announced an official publication date. The standard includes document control and record requirements; see the official BRCGS text for the detail of each clause.',
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
            'Una auditoría de primera parte es interna: tu propio equipo (o alguien que contratas) revisa si la planta hace lo que dicen sus procedimientos. Una de segunda parte la hace un cliente a su suplidor, por ejemplo un supermercado que audita a quien le vende. Una de tercera parte la hace un organismo de certificación independiente contra un estándar como SQF o BRCGS, y es la que lleva a un certificado.',
        },
        en: {
          question: 'What is the difference between first-, second- and third-party audits?',
          answer:
            'A first-party audit is internal: your own team (or someone you hire) checks whether the plant does what its procedures say. A second-party audit is done by a customer on its supplier, for example a supermarket auditing a vendor. A third-party audit is done by an independent certification body against a standard such as SQF or BRCGS, and it is the one that leads to a certificate.',
        },
      },
      {
        id: 'auditoria-vs-inspeccion',
        es: {
          question: '¿En qué se diferencia una auditoría de certificación de una inspección de la FDA?',
          answer:
            'La inspección de la FDA verifica que cumples la ley, normalmente no se anuncia y puede tener consecuencias regulatorias. La auditoría de certificación la contratas tú con un organismo de certificación y verifica que cumples un estándar voluntario como SQF o BRCGS; si fallas, no obtienes el certificado o se suspende el que tienes. Aun así, no todas las auditorías se anuncian: SQF exige una auditoría sin aviso por lo menos una vez cada tres años.',
        },
        en: {
          question: 'How is a certification audit different from an FDA inspection?',
          answer:
            'An FDA inspection checks that you comply with the law, is usually unannounced and can have regulatory consequences. A certification audit is one you arrange with a certification body to check that you meet a voluntary standard such as SQF or BRCGS; if you fail, you do not get the certificate or the one you have is suspended. Even so, not every audit is announced: SQF requires an unannounced audit at least once every three years.',
        },
        sources: [SRC.sqfCode, SRC.sqfFaq],
      },
      {
        id: 'dia-auditoria',
        es: {
          question: '¿Qué pasa el día de la auditoría?',
          answer:
            'Suele empezar con una reunión de apertura para confirmar el alcance y la agenda. Luego el auditor recorre la planta y observa la operación, revisa documentos y registros, y entrevista al personal para confirmar que lo escrito es lo que se hace. Termina con una reunión de cierre donde presenta los hallazgos. Después recibes el informe con las no conformidades que debes corregir.',
        },
        en: {
          question: 'What happens on audit day?',
          answer:
            'It usually starts with an opening meeting to confirm scope and schedule. Then the auditor walks the plant and watches the operation, reviews documents and records, and interviews staff to confirm that what is written is what is done. It ends with a closing meeting where the findings are presented. Afterwards you receive the report with the nonconformities you must correct.',
        },
      },
      {
        id: 'documentos-auditor',
        es: {
          question: '¿Qué documentos debo tener a mano cuando llega el auditor?',
          answer:
            'Como mínimo: el plan de inocuidad con su análisis de peligros, los procedimientos (SOP), los registros de monitoreo (temperaturas, limpieza y sanitación), las acciones correctivas, la verificación (calibración y revisión de registros), la aprobación de suplidores, la capacitación del personal, el control de plagas y los informes de auditorías anteriores con su cierre. Lo que más se nota es poder encontrar cualquier registro en minutos, no en horas.',
        },
        en: {
          question: 'Which documents should I have ready when the auditor arrives?',
          answer:
            'At a minimum: the food safety plan with its hazard analysis, the procedures (SOPs), monitoring records (temperatures, cleaning and sanitation), corrective actions, verification (calibration and records review), supplier approval, staff training, pest control and previous audit reports with their close-out. What shows the most is being able to find any record in minutes, not hours.',
        },
        sources: [SRC.cfr117_190, SRC.sqfCode],
      },
      {
        id: 'no-conformidades',
        es: {
          question: '¿Qué es una no conformidad menor, mayor o crítica, y cuánto tiempo tengo para cerrarla?',
          answer:
            'En SQF, una no conformidad menor es una falla aislada o poco frecuente; una mayor es una falla de un elemento del sistema; y una crítica es una pérdida de control en un punto crítico, un programa de prerrequisitos u otro paso crítico. En la Edición 10 de SQF, las menores y mayores deben cerrarse, con su análisis de causa raíz, dentro de 40 días calendario después de la auditoría; una crítica hace fallar una auditoría inicial o suspende el certificado en una recertificación. Si te auditan bajo la Edición 9 o bajo BRCGS, confirma los plazos en las reglas de certificación de esa edición o estándar.',
        },
        en: {
          question: 'What is a minor, major or critical nonconformity, and how long do I have to close it?',
          answer:
            'In SQF, a minor nonconformity is an isolated or infrequent failure; a major one is a failure of a system element; and a critical one is a loss of control at a critical control point, a prerequisite program or another critical step. Under SQF Edition 10, minor and major nonconformities must be closed, with their root cause analysis, within 40 calendar days of the audit; a critical one fails an initial audit or suspends the certificate at recertification. If you are audited under Edition 9 or BRCGS, confirm the deadlines in that edition’s or standard’s certification rules.',
        },
        sources: [SRC.sqfCode, SRC.brcgs],
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
            'Es analizar qué materias primas, suplidores o productos son susceptibles a fraude, como sustituir un ingrediente por uno más barato, diluirlo, etiquetar mal el producto final o falsificarlo, y poner controles para reducir ese riesgo. A veces se le llama VACCP. SQF exige documentar, implementar y mantener los métodos, responsables y criterios para identificar la vulnerabilidad de la planta al fraude alimentario.',
        },
        en: {
          question: 'What is a food fraud vulnerability assessment?',
          answer:
            'It is analyzing which raw materials, suppliers or products are susceptible to fraud, such as substituting a cheaper ingredient, diluting it, mislabeling the finished product or counterfeiting it, and putting controls in place to reduce that risk. It is sometimes called VACCP. SQF requires documenting, implementing and maintaining the methods, responsibilities and criteria for identifying the site’s vulnerability to food fraud.',
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
            'Walmart publica sus requisitos de inocuidad para sus operaciones en Estados Unidos y Puerto Rico, que también cubren a Sam’s Club. Para productos de marca privada, cada planta debe estar certificada cada año bajo un estándar reconocido por GFSI. Para marcas nacionales se requiere una auditoría anual de inocuidad aprobada, y la certificación GFSI se recomienda; las inspecciones de la FDA o del estado no sustituyen esa auditoría.',
        },
        en: {
          question: 'What do Walmart and Sam’s Club require from suppliers on food safety?',
          answer:
            'Walmart publishes its food safety requirements for its U.S. and Puerto Rico operations, which also cover Sam’s Club. For private-brand products, every site must be certified each year to a GFSI-recognized standard. National brands need an approved annual food safety audit, and GFSI certification is encouraged; FDA or state inspections do not replace that audit.',
        },
        sources: [SRC.walmart, SRC.walmartPrivate, SRC.walmartNational],
      },
      {
        id: 'costco',
        es: {
          question: '¿Dónde encuentro los requisitos de inocuidad de Costco?',
          answer:
            'Costco no publica sus requisitos en una página pública. Los detalla en su manual Food Safety & Quality Audit Expectations; pide la versión vigente a tu comprador de Costco o a un organismo de certificación aprobado por Costco.',
        },
        en: {
          question: 'Where can I find Costco’s food safety requirements?',
          answer:
            'Costco does not publish its requirements on a public page. They are in its Food Safety & Quality Audit Expectations manual; ask your Costco buyer or a Costco-approved certification body for the current version.',
        },
      },
    ],
  },
  {
    id: 'puerto-rico',
    es: 'Puerto Rico',
    en: 'Puerto Rico',
    items: [
      {
        id: 'salud-pr',
        es: {
          question: '¿Qué agencia de Puerto Rico supervisa la higiene de los establecimientos de alimentos?',
          answer:
            'El Departamento de Salud, a través de la División de Salud Ambiental y su área de Higiene y Seguridad de Alimentos, que atiende las condiciones sanitarias e inspecciones de establecimientos de alimentos. Para licencias y permisos, comunícate directamente con el Departamento de Salud.',
        },
        en: {
          question: 'Which Puerto Rico agency oversees hygiene at food establishments?',
          answer:
            'The Department of Health, through its Environmental Health Division and its Food Hygiene and Safety area, which handles sanitary conditions and inspections of food establishments. For licenses and permits, contact the Department of Health directly.',
        },
        sources: [SRC.saludPR],
      },
    ],
  },
  {
    id: 'stratum',
    es: 'Sobre Stratum PR',
    en: 'About Stratum PR',
    items: HOME_FAQ.map((f, i) => ({ id: `stratum-${i + 1}`, es: f.es, en: f.en })),
  },
];

export const ALL_FAQ_ITEMS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
