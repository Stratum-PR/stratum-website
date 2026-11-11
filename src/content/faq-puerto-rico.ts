/**
 * Puerto Rico and exporting to the U.S. FAQ category. Same rules as compliance-faq.ts: every
 * answer states only what the linked official sources say, dates exactly as the source states
 * them, and each answer opens with a direct two-sentence answer (see splitAnswer in faq-pages.ts).
 * Sources verified November 11, 2026. Re-check FSMA 204 (docket FDA-2014-N-0053), the food
 * facility registration renewal window and the GFSI recognised-programme list before editing.
 */
import type { FaqCategory, FaqSource } from './compliance-faq';

export const PR_FAQ_VERIFIED_ON = { es: '11 de noviembre de 2026', en: 'November 11, 2026' };

const SRC = {
  usc321: { label: '21 U.S.C. 321 (definiciones de la ley FD&C)', url: 'https://www.law.cornell.edu/uscode/text/21/321' },
  cfr1_226: { label: '21 CFR 1.226 (quién no tiene que registrarse)', url: 'https://www.law.cornell.edu/cfr/text/21/1.226' },
  cfr1_227: { label: '21 CFR 1.227 (definiciones: instalación doméstica)', url: 'https://www.law.cornell.edu/cfr/text/21/1.227' },
  cfr1_230: { label: '21 CFR 1.230 (cuándo registrarse y renovar)', url: 'https://www.law.cornell.edu/cfr/text/21/1.230' },
  cfr1_500: { label: '21 CFR 1.500 (definiciones FSVP)', url: 'https://www.law.cornell.edu/cfr/text/21/1.500' },
  ffrRenewal2026: { label: 'FDA: recordatorio de renovación del registro (29 de septiembre de 2026)', url: 'https://www.fda.gov/food/hfp-constituent-updates/fda-reminds-food-facilities-biennial-renewal-requirements' },
  ffrOnline: { label: 'FDA: Online Registration of Food Facilities', url: 'https://www.fda.gov/food/registration-food-facilities-and-other-submissions/online-registration-food-facilities' },
  cfr117_3: { label: '21 CFR 117.3 (definiciones)', url: 'https://www.law.cornell.edu/cfr/text/21/117.3' },
  cfr117_5: { label: '21 CFR 117.5 (exenciones)', url: 'https://www.law.cornell.edu/cfr/text/21/117.5' },
  cfr117_180: { label: '21 CFR 117.180 (PCQI)', url: 'https://www.law.cornell.edu/cfr/text/21/117.180' },
  cfr120_1: { label: '21 CFR 120.1 (HACCP de jugos: aplicación)', url: 'https://www.law.cornell.edu/cfr/text/21/120.1' },
  cfr120_8: { label: '21 CFR 120.8 (plan HACCP de jugos)', url: 'https://www.law.cornell.edu/cfr/text/21/120.8' },
  cfr123_6: { label: '21 CFR 123.6 (HACCP de pescados y mariscos)', url: 'https://www.law.cornell.edu/cfr/text/21/123.6' },
  cfr9_417_2: { label: '9 CFR 417.2 (HACCP de carnes y aves, USDA FSIS)', url: 'https://www.law.cornell.edu/cfr/text/9/417.2' },
  inspSmooth: { label: 'FDA: How to Help an FDA Food-Safety Inspection Run Smoothly', url: 'https://www.fda.gov/food/inspections-protect-food-supply/how-help-fda-food-safety-inspection-run-smoothly' },
  inspExpect: { label: 'FDA: What should I expect during an inspection?', url: 'https://www.fda.gov/industry/fda-basics-industry/what-should-i-expect-during-inspection' },
  form483: { label: 'FDA: FDA Form 483 Frequently Asked Questions', url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/fda-form-483-frequently-asked-questions' },
  warningAbout: { label: 'FDA: About Warning and Close-Out Letters', url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/about-warning-and-close-out-letters' },
  warningList: { label: 'FDA: Warning Letters', url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters' },
  ftr: { label: 'FDA: Food Traceability Rule (FSMA 204)', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods' },
  ftl: { label: 'FDA: Food Traceability List', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/food-traceability-list' },
  ftrProposed: { label: 'Federal Register: propuesta de nueva fecha (7 de agosto de 2025)', url: 'https://www.federalregister.gov/documents/2025/08/07/2025-14967/requirements-for-additional-traceability-records-for-certain-foods-compliance-date-extension' },
  ftrMeeting: { label: 'Federal Register: reunión pública sobre trazabilidad por lote (9 de octubre de 2026)', url: 'https://www.federalregister.gov/documents/2026/10/09/2026-20720/challenges-and-solutions-in-lot-level-food-traceability-public-meeting' },
  fsmaFaq: { label: 'FDA: Frequently Asked Questions on FSMA', url: 'https://www.fda.gov/food/food-safety-modernization-act-fsma/frequently-asked-questions-fsma' },
  fspca: { label: 'FSPCA: Preventive Controls for Human Food (V2.0)', url: 'https://www.fspca.net/pchf-pcqi-v2-0' },
  fsvpGuidance: { label: 'FDA: guía de FSVP para importadores (enero de 2023), preguntas A.21 a A.24', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-foreign-supplier-verification-programs-importers-food-humans-and-animals' },
  fdaRegulates: { label: 'FDA: What Does FDA Regulate?', url: 'https://www.fda.gov/about-fda/what-we-do/what-does-fda-regulate' },
  fdaMeats: { label: 'FDA: FDA Regulated Meats and Meat Products', url: 'https://www.fda.gov/food/meat-guidance-documents-regulatory-information/fda-regulated-meats-and-meat-products-human-consumption' },
  gfsiCert: { label: 'GFSI: Certification', url: 'https://mygfsi.com/how-to-implement/certification/' },
  gfsiCpos: { label: 'GFSI: Recognised Certification Programme Owners', url: 'https://mygfsi.com/how-to-implement/recognition/certification-programme-owners/' },
  walmart: { label: 'Walmart: U.S. | Puerto Rico Food Safety Requirements', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements' },
  walmartPrivate: { label: 'Walmart: marca privada (Private Brand)', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements/private-branded-products/u-s--produced-and-supplier-imported.html' },
  walmartNational: { label: 'Walmart: marca nacional (National Brand)', url: 'https://enablement.walmart.com/content/food-safety/en_us/food-safety-requirements/national-branded-products/all-other-commodities.html' },
  cfr101_3: { label: '21 CFR 101.3 (nombre del producto)', url: 'https://www.law.cornell.edu/cfr/text/21/101.3' },
  cfr101_4: { label: '21 CFR 101.4 (lista de ingredientes)', url: 'https://www.law.cornell.edu/cfr/text/21/101.4' },
  cfr101_5: { label: '21 CFR 101.5 (nombre y dirección del fabricante)', url: 'https://www.law.cornell.edu/cfr/text/21/101.5' },
  cfr101_9: { label: '21 CFR 101.9 (información nutricional)', url: 'https://www.law.cornell.edu/cfr/text/21/101.9' },
  cfr101_15: { label: '21 CFR 101.15 (idioma de la etiqueta)', url: 'https://www.law.cornell.edu/cfr/text/21/101.15' },
  allergens: { label: 'FDA: Food Allergies', url: 'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies' },
  smallBizLabel: { label: 'FDA: Small Business Nutrition Labeling Exemption', url: 'https://www.fda.gov/food/labeling-nutrition-guidance-documents-regulatory-information/small-business-nutrition-labeling-exemption' },
} satisfies Record<string, FaqSource>;

export const PR_FAQ_CATEGORY: FaqCategory = {
  id: 'puerto-rico',
  es: 'Puerto Rico y exportación a EE. UU.',
  en: 'Puerto Rico and exporting to the U.S.',
  items: [
    {
      id: 'pr-fsma-aplica',
      es: {
        question: '¿Aplica FSMA en Puerto Rico?',
        answer:
          "Sí. Para la ley federal de alimentos, medicamentos y cosméticos (FD&C), Puerto Rico cuenta como un estado, así que las reglas de FSMA aplican a las plantas de la isla igual que a las de Florida o Texas. La ley define \"State\" como cualquier estado o territorio de los Estados Unidos, el Distrito de Columbia y el Estado Libre Asociado de Puerto Rico (21 U.S.C. 321(a)(1)). La regla de registro de la FDA llama \"instalación doméstica\" a cualquier planta ubicada en un estado, territorio, el Distrito de Columbia o Puerto Rico que fabrique, procese, empaque o almacene alimentos para consumo en los Estados Unidos. La regla de Controles Preventivos (21 CFR 117) aplica a las instalaciones domésticas o extranjeras que tienen que registrarse con la FDA. En la práctica, una planta en Puerto Rico necesita lo mismo que una en el continente: registro con la FDA, buenas prácticas de manufactura y, si no está exenta, un plan de inocuidad preparado por un PCQI.",
      },
      en: {
        question: 'Does FSMA apply in Puerto Rico?',
        answer:
          "Yes. Under the Federal Food, Drug, and Cosmetic Act, Puerto Rico counts as a state, so FSMA rules apply to plants on the island just as they do in Florida or Texas. The Act defines \"State\" as any State or Territory of the United States, the District of Columbia and the Commonwealth of Puerto Rico (21 U.S.C. 321(a)(1)). The FDA registration rule calls any plant located in a State, Territory, the District of Columbia or Puerto Rico that manufactures, processes, packs or holds food for consumption in the United States a \"domestic facility.\" The Preventive Controls rule (21 CFR 117) applies to domestic and foreign facilities that must register with the FDA. In practice, a Puerto Rico plant needs the same things as a mainland plant: FDA registration, current good manufacturing practices and, unless exempt, a food safety plan prepared by a PCQI.",
      },
      sources: [SRC.usc321, SRC.cfr1_227, SRC.cfr117_3],
    },
    {
      id: 'pr-haccp',
      es: {
        question: '¿Qué es un plan HACCP y quién en Puerto Rico lo necesita?',
        answer:
          "HACCP (Análisis de Peligros y Puntos Críticos de Control) es un plan escrito que identifica los peligros de un proceso y los controla en puntos específicos. La ley lo exige a tres grupos: procesadores de jugos (21 CFR 120), procesadores de pescados y mariscos (21 CFR 123) y plantas de carne y aves inspeccionadas por el USDA (9 CFR 417). En los tres casos se empieza con un análisis de peligros, y el plan HACCP escrito se requiere cuando ese análisis encuentra peligros razonablemente probables. Para la regla de jugos, \"jugo\" incluye el líquido extraído de frutas o vegetales, los purés y los concentrados, ya sea que se venda como jugo o se use como ingrediente de bebidas. La mayoría de las demás plantas reguladas por la FDA no hacen un plan HACCP sino un plan de inocuidad bajo la regla de Controles Preventivos (21 CFR 117). Si una planta cumple con la regla de jugos o la de pescados y mariscos, esas actividades quedan fuera de las partes de análisis de peligros y controles preventivos de la Parte 117.",
      },
      en: {
        question: 'Who needs a HACCP plan, and how is it different from an FDA food safety plan?',
        answer:
          "HACCP (Hazard Analysis and Critical Control Point) is a written plan that identifies the hazards in a process and controls them at specific points. U.S. law requires it for three groups: juice processors (21 CFR 120), fish and seafood processors (21 CFR 123) and USDA-inspected meat and poultry establishments (9 CFR 417). In all three, you start with a hazard analysis, and a written HACCP plan is required when that analysis finds hazards that are reasonably likely to occur. For the juice rule, \"juice\" includes liquid extracted from fruits or vegetables, purees and concentrates, whether sold as juice or used as a beverage ingredient. Most other FDA-regulated plants do not write a HACCP plan; they write a food safety plan under the Preventive Controls rule (21 CFR 117). A plant that complies with the juice or seafood HACCP rule is exempt from the hazard analysis and preventive controls parts of Part 117 for those activities.",
      },
      sources: [SRC.cfr120_1, SRC.cfr120_8, SRC.cfr123_6, SRC.cfr9_417_2, SRC.cfr117_5],
    },
    {
      id: 'pr-inspeccion-fda',
      es: {
        question: '¿Qué pasa en una inspección de la FDA en mi planta?',
        answer:
          "Los investigadores de la FDA se identifican con sus credenciales y entregan un Aviso de Inspección (Formulario FDA 482) al dueño, operador o encargado. Luego entrevistan a la gerencia, recorren la planta, piden registros y pueden tomar muestras. La FDA puede inspeccionar por una investigación de rutina, por un estudio o en respuesta a un problema reportado. La entrevista inicial verifica datos administrativos y de la operación, como el horario y el programa de sanitación. En el recorrido observan los procesos, pueden revisar procedimientos y hablar con empleados. Si toman muestras, la FDA recomienda decirles si la planta retendrá el producto voluntariamente hasta tener los resultados. Al final, discuten los hallazgos con la gerencia y, si hay observaciones significativas, dejan una lista escrita: el Formulario FDA 483. La FDA recomienda tener personal disponible para contestar preguntas y entregar documentos, y responder por escrito con las acciones correctivas dentro de 15 días laborables después del cierre de la inspección.",
      },
      en: {
        question: 'What happens during an FDA food plant inspection?',
        answer:
          "FDA investigators show their credentials and hand a Notice of Inspection (FDA Form 482) to the owner, operator or agent in charge. They then interview management, walk through the plant, request records and may collect samples. The FDA may inspect as part of a routine investigation, a survey or a response to a reported problem. The opening interview checks administrative and operational details, such as hours and the sanitation schedule. During the walk-through, investigators observe processes and may review procedures and talk to employees. If they collect samples, the FDA suggests telling them whether the firm will voluntarily hold product until results come back. At the end, they discuss findings with management and, if there are significant observations, leave a written list: the FDA Form 483. The FDA recommends having staff available to answer questions and provide documents, and responding in writing with corrective actions within 15 working days of the inspection's close.",
      },
      sources: [SRC.inspSmooth, SRC.inspExpect, SRC.form483],
    },
    {
      id: 'pr-fsma204-fecha',
      es: {
        question: '¿Cuándo es la fecha de cumplimiento de FSMA 204 (trazabilidad)?',
        answer:
          "La FDA no hará cumplir la regla de trazabilidad antes del 20 de julio de 2028. La fecha original era el 20 de enero de 2026, pero el Congreso le ordenó a la FDA no hacerla cumplir antes del 20 de julio de 2028, y la FDA dice que cumplirá esa orden. La orden vino en la Continuing Appropriations, Agriculture, Legislative Branch, Military Construction and Veterans Affairs, and Extensions Act of 2026. Por separado, la FDA propuso el 7 de agosto de 2025 extender oficialmente la fecha 30 meses, hasta el 20 de julio de 2028; al 11 de noviembre de 2026, el Federal Register no muestra una regla final que adopte ese cambio. La regla en sí se publicó como regla final el 21 de noviembre de 2022. La FDA convocó una reunión pública virtual para el 6 de noviembre de 2026 sobre los retos de la trazabilidad por lote y posibles flexibilidades para cumplir, y acepta comentarios hasta el 6 de diciembre de 2026. La regla aplica a los alimentos de la Lista de Trazabilidad de la FDA.",
      },
      en: {
        question: 'What is the FSMA 204 compliance date?',
        answer:
          "The FDA will not enforce the Food Traceability Rule before July 20, 2028. The original compliance date was January 20, 2026, but Congress directed the FDA not to enforce the rule before July 20, 2028, and the FDA says it intends to comply. The directive came in the Continuing Appropriations, Agriculture, Legislative Branch, Military Construction and Veterans Affairs, and Extensions Act of 2026. Separately, on August 7, 2025, the FDA proposed formally extending the compliance date by 30 months, to July 20, 2028; as of November 11, 2026, the Federal Register shows no final rule adopting that change. The rule itself was published as a final rule on November 21, 2022. The FDA scheduled a virtual public meeting for November 6, 2026 on lot-level traceability challenges and possible compliance flexibilities, with comments accepted through December 6, 2026. The rule covers foods on the FDA's Food Traceability List.",
      },
      sources: [SRC.ftr, SRC.ftrProposed, SRC.ftrMeeting, SRC.ftl],
    },
    {
      id: 'pr-pcqi',
      es: {
        question: '¿Qué es un PCQI y cómo se certifica?',
        answer:
          "El PCQI (individuo calificado en controles preventivos) es la persona que prepara o supervisa el plan de inocuidad de la planta bajo la regla de Controles Preventivos de la FDA. La FDA no tiene un proceso de certificación de PCQI: la persona califica con un adiestramiento por lo menos equivalente al currículo estandarizado que la FDA reconoce, o por experiencia de trabajo que le haya dado ese mismo conocimiento. Según 21 CFR 117.180, el PCQI prepara el plan de inocuidad, valida los controles preventivos, revisa registros y reanaliza el plan, entre otras tareas. Puede ser empleado de la planta o no. Según la FDA, el currículo estandarizado reconocido es el de la Food Safety Preventive Controls Alliance (FSPCA); tomarlo es voluntario, y la FDA evalúa si el plan de inocuidad es adecuado más que los diplomas de la persona. El curso de la FSPCA (versión 2.0) cubre el mismo currículo en un mínimo de 22 horas, presencial, virtual, a su propio ritmo o mixto, y el manual del participante está disponible en español. El adiestramiento debe quedar documentado con la fecha, el tipo y las personas adiestradas.",
      },
      en: {
        question: 'What is a PCQI and how do you get PCQI certified?',
        answer:
          "A PCQI (preventive controls qualified individual) is the person who prepares or oversees a plant's food safety plan under the FDA Preventive Controls rule. The FDA has no PCQI certification process: a person qualifies through training at least equivalent to the standardized curriculum the FDA recognizes, or through job experience that gave them the same knowledge. Under 21 CFR 117.180, the PCQI prepares the food safety plan, validates preventive controls, reviews records and reanalyzes the plan, among other tasks. The PCQI does not have to be an employee of the plant. According to the FDA, the recognized standardized curriculum is the one from the Food Safety Preventive Controls Alliance (FSPCA); taking it is voluntary, and the FDA assesses whether the food safety plan is adequate rather than an individual's credentials. The FSPCA course (version 2.0) covers the same curriculum in at least 22 contact hours, delivered in person, virtually, self-paced or blended, and the participant manual is available in Spanish. Training must be documented with the date, type and people trained.",
      },
      sources: [SRC.cfr117_180, SRC.cfr117_3, SRC.fsmaFaq, SRC.fspca],
    },
    {
      id: 'pr-registro-fda',
      es: {
        question: '¿Necesita mi planta en Puerto Rico registrarse con la FDA?',
        answer:
          "Sí, si fabrica, procesa, empaca o almacena alimentos para consumo en los Estados Unidos y no está exenta. La FDA considera a una planta en Puerto Rico una \"instalación doméstica\", y tiene que registrarse antes de empezar a operar y renovar el registro cada dos años. La renovación se hace entre el 1 de octubre y el 31 de diciembre de cada año par; la de este año cierra el 31 de diciembre de 2026, y la FDA considerará vencido el registro de quien no renueve para esa fecha. Se hace por internet en FDA Industry Systems, no cuesta nada y requiere un identificador único de instalación; la FDA acepta el número DUNS. Las instalaciones calificadas también envían su atestación en ese mismo periodo. No tienen que registrarse las fincas, los establecimientos de venta al detal, los restaurantes, los establecimientos sin fines de lucro que sirven comida directo al consumidor, ciertos barcos pesqueros y las plantas reguladas exclusivamente por el USDA en toda la instalación.",
      },
      en: {
        question: 'Does a Puerto Rico food manufacturer need FDA registration to sell on the U.S. mainland?',
        answer:
          "Yes, if the plant manufactures, processes, packs or holds food for consumption in the United States and is not exempt. The FDA treats a Puerto Rico plant as a \"domestic facility,\" which must register before it starts operating and renew every two years. Renewal runs from October 1 through December 31 of each even-numbered year; this cycle closes December 31, 2026, and the FDA will consider the registration expired for any facility that does not renew by then. Registration is done online through FDA Industry Systems, has no fee and requires a unique facility identifier; the FDA accepts the DUNS number. Qualified facilities also submit their attestation during the same period. Farms, retail food establishments, restaurants, nonprofit food establishments that serve food directly to consumers, certain fishing vessels and plants regulated exclusively by the USDA throughout the entire facility do not have to register.",
      },
      sources: [SRC.cfr1_227, SRC.cfr1_230, SRC.cfr1_226, SRC.ffrRenewal2026, SRC.ffrOnline],
    },
    {
      id: 'pr-fsvp',
      es: {
        question: '¿Se considera importado bajo FSVP un alimento hecho en Puerto Rico?',
        answer:
          "No. El programa de verificación de suplidores extranjeros (FSVP) es para alimentos de suplidores extranjeros, y la FDA trata a una planta en Puerto Rico como instalación doméstica. La guía de la FDA sobre FSVP (enero de 2023) explica que Puerto Rico es parte del territorio aduanero de los Estados Unidos. También indica que ni siquiera el alimento producido en territorios que están fuera de ese territorio aduanero, como Guam, está sujeto a FSVP cuando se envía a los estados, porque quien lo produce no es un suplidor extranjero. Lo que sí aplica en Puerto Rico es lo contrario: FSVP rige cuando alimentos de suplidores extranjeros se importan a cualquier parte del territorio aduanero, incluido Puerto Rico. Si tu empresa importa ingredientes o productos de otro país, puedes ser el importador bajo FSVP, que es el dueño o consignatario en los Estados Unidos del alimento ofrecido para importación. En ese caso, te toca analizar los peligros, evaluar al suplidor extranjero y verificarlo.",
      },
      en: {
        question: 'Is food from Puerto Rico considered imported under FSVP?',
        answer:
          "No. The Foreign Supplier Verification Program (FSVP) covers food from foreign suppliers, and the FDA treats a Puerto Rico plant as a domestic facility. The FDA's FSVP guidance (January 2023) explains that Puerto Rico is part of the customs territory of the United States. It also states that even food produced in U.S. territories outside the customs territory, such as Guam, is not subject to FSVP when shipped into the customs territory, because the producer is not a foreign supplier. What does apply in Puerto Rico is the reverse: FSVP applies when food from foreign suppliers is imported into any part of the customs territory, including Puerto Rico. If your company imports ingredients or products from another country, you may be the FSVP importer, meaning the U.S. owner or consignee of the food offered for import. In that case, you are responsible for analyzing hazards, evaluating the foreign supplier and verifying it.",
      },
      sources: [SRC.fsvpGuidance, SRC.cfr1_500, SRC.cfr1_227, SRC.fsmaFaq],
    },
    {
      id: 'pr-fda-o-usda',
      es: {
        question: 'FDA o USDA: ¿quién regula mi producto?',
        answer:
          "Depende del producto. El Servicio de Inocuidad e Inspección de Alimentos (FSIS) del USDA regula aspectos de la inocuidad y el etiquetado de las carnes tradicionales (no de caza), las aves y ciertos productos de huevo, y la FDA regula los demás alimentos, incluidos suplementos dietarios, agua embotellada, aditivos y fórmulas infantiles. Hay productos con poca carne que le tocan a la FDA. Según la FDA, eso incluye las carnes de caza como venado o conejo, los productos con 3% o menos de carne cruda o menos de 2% de carne cocida, los productos con menos de 2% de carne de ave cocida o menos de 10% de piel de ave cocida, y los sándwiches cerrados, a menos que sean parte de una comida completa. Las plantas de carne y aves inspeccionadas por el USDA siguen la regla HACCP del FSIS (9 CFR 417). Una planta regulada exclusivamente por el USDA en toda la instalación no tiene que registrarse con la FDA; si también hace productos de la FDA, esa exención no aplica.",
      },
      en: {
        question: 'FDA or USDA: who regulates my food product?',
        answer:
          "It depends on the product. The USDA Food Safety and Inspection Service (FSIS) regulates aspects of the safety and labeling of traditional (non-game) meats, poultry and certain egg products, and the FDA regulates other foods, including dietary supplements, bottled water, food additives and infant formula. Some products with small amounts of meat fall to the FDA. According to the FDA, these include game meats such as deer or rabbit, products with 3% or less raw meat or less than 2% cooked meat, products with less than 2% cooked poultry meat or less than 10% cooked poultry skins, and closed-face sandwiches unless part of a dinner. USDA-inspected meat and poultry establishments follow the FSIS HACCP rule (9 CFR 417). A plant regulated exclusively by the USDA throughout the entire facility does not have to register with the FDA; if it also makes FDA-regulated products, that exemption does not apply.",
      },
      sources: [SRC.fdaRegulates, SRC.fdaMeats, SRC.cfr9_417_2, SRC.cfr1_226],
    },
    {
      id: 'pr-certificacion-compradores',
      es: {
        question: '¿Qué certificación de inocuidad piden los compradores en Estados Unidos?',
        answer:
          "Muchos compradores grandes piden una certificación reconocida por GFSI, como SQF, BRCGS o FSSC 22000. GFSI no certifica plantas: reconoce programas de certificación, y la planta se certifica con una auditoría de tercera parte contra uno de esos programas. La lista de GFSI de programas reconocidos incluye, entre otros, SQF Edición 9 (nivel 2), BRCGS Global Standard for Food Safety Issue 9, FSSC 22000 versión 6, IFS Food versión 8 y PrimusGFS versión 3.2; el reconocimiento es por alcance, así que confirma el que aplica a tu operación. Walmart, por ejemplo, publica requisitos para sus operaciones en Estados Unidos y Puerto Rico. Para marca privada, toda planta que fabrique o procese el producto debe estar certificada o evaluada bajo un estándar reconocido por GFSI y mantener la certificación cada año. Para marca nacional exige una auditoría anual aprobada, recomienda la certificación GFSI y no acepta inspecciones de agencias federales, estatales o locales en lugar de la auditoría. Antes de invertir en una certificación, pregúntale a tu comprador cuál acepta.",
      },
      en: {
        question: 'Which food safety certifications do U.S. retailers require from suppliers?',
        answer:
          "Many large buyers ask for a GFSI-recognized certification, such as SQF, BRCGS or FSSC 22000. GFSI does not certify plants: it recognizes certification programs, and a plant gets certified through a third-party audit against one of them. GFSI's list of recognized programs includes, among others, SQF Edition 9 (level 2), the BRCGS Global Standard for Food Safety Issue 9, FSSC 22000 version 6, IFS Food version 8 and PrimusGFS version 3.2; recognition is by scope, so confirm the one that fits your operation. Walmart, for example, publishes requirements for its operations in the United States and Puerto Rico. For private brands, every site that manufactures or processes the product must be certified or assessed to a GFSI-recognized standard and keep that certification every year. For national brands, it requires an approved annual audit, encourages GFSI certification and does not accept federal, state or local regulatory inspections in place of the audit. Before you invest in a certification, ask your buyer which ones they accept.",
      },
      sources: [SRC.gfsiCert, SRC.gfsiCpos, SRC.walmart, SRC.walmartPrivate, SRC.walmartNational],
    },
    {
      id: 'pr-483-carta-advertencia',
      es: {
        question: '¿Qué es un Formulario 483 y qué es una carta de advertencia de la FDA?',
        answer:
          "El Formulario FDA 483 es la lista de observaciones que el investigador le entrega a la gerencia al terminar una inspección cuando vio condiciones que pueden violar la ley. La carta de advertencia (warning letter) es más seria: la FDA la envía cuando identifica violaciones significativas de requisitos federales. El 483 no es una determinación final de la FDA: la agencia lo evalúa junto al informe de inspección, la evidencia recogida y la respuesta de la empresa antes de decidir si toma otra acción. La FDA recomienda contestar el 483 por escrito con un plan de acciones correctivas dentro de 15 días laborables después del cierre de la inspección. La carta de advertencia detalla los problemas, pide una respuesta dentro de un plazo y permite explicar por qué la empresa no está de acuerdo. La FDA publica las cartas de advertencia en su sitio web. Cuando la FDA verifica que las correcciones se hicieron, normalmente con una inspección de seguimiento, puede emitir una carta de cierre; no la emite basándose solo en promesas.",
      },
      en: {
        question: 'What is an FDA Form 483, and how is it different from a warning letter?',
        answer:
          "An FDA Form 483 is the list of observations an investigator gives management at the end of an inspection when they saw conditions that may violate the law. A warning letter is more serious: the FDA sends one when it identifies significant violations of federal requirements. A 483 is not a final agency determination: the FDA weighs it together with the inspection report, the evidence collected and the company's response before deciding on further action. The FDA recommends answering a 483 in writing with a corrective action plan within 15 working days of the inspection's close. A warning letter lists the problems, requests a response within a set timeframe and lets the company explain if it disagrees. The FDA posts warning letters on its website. Once the FDA verifies that corrections were actually made, usually through a follow-up inspection, it may issue a close-out letter; it does not issue one based on promises alone.",
      },
      sources: [SRC.form483, SRC.inspSmooth, SRC.warningAbout, SRC.warningList],
    },
    {
      id: 'pr-etiqueta-espanol',
      es: {
        question: '¿Puedo vender en los estados con la etiqueta solo en español?',
        answer:
          "No, a menos que el producto se distribuya únicamente en Puerto Rico. La regla de la FDA exige que toda la información obligatoria de la etiqueta aparezca en inglés, y solo permite sustituir el inglés por el idioma predominante en artículos distribuidos solamente en Puerto Rico o en un territorio donde predomine otro idioma (21 CFR 101.15(c)(1)). Si tu producto va a salir de la isla, la información obligatoria tiene que estar en inglés. Además, si la etiqueta tiene cualquier texto en otro idioma, como español, toda la información obligatoria tiene que aparecer también en ese idioma (21 CFR 101.15(c)(2)). En la práctica, una etiqueta bilingüe tiene que repetir completa la información obligatoria en los dos idiomas, no solo el nombre o los mensajes de mercadeo. La regla exime de ese segundo requisito solo a paquetes individuales muy pequeños que se sirven con comidas en restaurantes, instituciones y transporte de pasajeros, no destinados a la venta al detal, cuando lo único en otro idioma es el nombre del alimento.",
      },
      en: {
        question: 'Can a Puerto Rico food product be sold in the U.S. with a Spanish-only label?',
        answer:
          "No, unless the product is distributed only in Puerto Rico. FDA rules require all mandatory label information to appear in English, and only allow the predominant language to replace English for articles distributed solely in Puerto Rico or in a territory where another language predominates (21 CFR 101.15(c)(1)). If your product will ship off the island, the mandatory information must be in English. In addition, if the label carries any text in a foreign language, such as Spanish, all mandatory information must also appear in that language (21 CFR 101.15(c)(2)). In practice, a bilingual label has to repeat all the mandatory information in both languages, not just the product name or marketing copy. The only exemption from that second requirement is for very small individual serving packages served with meals in restaurants, institutions and passenger carriers and not sold at retail, when the only foreign-language text is the name of the food.",
      },
      sources: [SRC.cfr101_15],
    },
    {
      id: 'pr-etiqueta-exportar',
      es: {
        question: '¿Qué tiene que llevar la etiqueta de un alimento para venderlo en EE. UU.?',
        answer:
          "Como mínimo, el nombre del producto, la lista de ingredientes, el nombre y lugar de negocio del fabricante, empacador o distribuidor, la información nutricional (Nutrition Facts) y la declaración de alérgenos. Todo eso en inglés si el producto sale de Puerto Rico. El nombre del producto va en el panel principal (21 CFR 101.3). Los ingredientes se listan por su nombre común en orden descendente por peso (21 CFR 101.4). Si tu empresa no fabricó el producto, su nombre va acompañado de una frase como \"Manufactured for\" o \"Distributed by\" (21 CFR 101.5). La información nutricional es obligatoria salvo que aplique una exención (21 CFR 101.9). La FDA tiene exenciones para negocios pequeños: una para quien vende menos de $500,000 al año, o menos de $50,000 en alimentos al consumidor, y otra de bajo volumen para quien tiene menos de 100 empleados a tiempo completo en promedio y vende menos de 100,000 unidades del producto en 12 meses, que requiere un aviso anual a la FDA. Los productos de bajo volumen que hacen declaraciones nutricionales no califican. Los alérgenos que se declaran son los nueve principales, incluido el ajonjolí desde el 1 de enero de 2023.",
      },
      en: {
        question: 'What does a food label need to sell in the U.S.?',
        answer:
          "At a minimum: the product name, the ingredient list, the name and place of business of the manufacturer, packer or distributor, the Nutrition Facts panel and the allergen declaration. All of it must be in English if the product leaves Puerto Rico. The product name goes on the principal display panel (21 CFR 101.3). Ingredients are listed by common name in descending order by weight (21 CFR 101.4). If your company did not make the product, its name must be qualified with a phrase such as \"Manufactured for\" or \"Distributed by\" (21 CFR 101.5). Nutrition labeling is required unless an exemption applies (21 CFR 101.9). The FDA has small business exemptions: one for sellers with annual gross sales of no more than $500,000, or no more than $50,000 in food sales to consumers, and a low-volume one for firms with fewer than 100 full-time equivalent employees on average selling fewer than 100,000 units of the product in 12 months, which requires an annual notice to the FDA. Low-volume products that bear nutrition claims do not qualify. The allergen declaration covers the nine major allergens, including sesame since January 1, 2023.",
      },
      sources: [SRC.cfr101_3, SRC.cfr101_4, SRC.cfr101_5, SRC.cfr101_9, SRC.smallBizLabel, SRC.allergens, SRC.cfr101_15],
    },
  ],
};

/** FAQ item id → permanent URL slugs: /preguntas/<es> and /en/faq/<en>. Never change one after it ships. */
export const PR_FAQ_SLUGS: Record<string, { es: string; en: string }> = {
  'pr-fsma-aplica': { es: 'aplica-fsma-en-puerto-rico', en: 'does-fsma-apply-in-puerto-rico' },
  'pr-haccp': { es: 'que-es-un-plan-haccp-y-quien-lo-necesita', en: 'who-needs-a-haccp-plan' },
  'pr-inspeccion-fda': { es: 'que-pasa-en-una-inspeccion-de-la-fda', en: 'what-happens-during-an-fda-food-inspection' },
  'pr-fsma204-fecha': { es: 'fecha-de-cumplimiento-fsma-204', en: 'fsma-204-compliance-date' },
  'pr-pcqi': { es: 'que-es-un-pcqi-y-como-se-certifica', en: 'what-is-a-pcqi-and-how-to-get-certified' },
  'pr-registro-fda': { es: 'registro-de-planta-de-alimentos-con-la-fda', en: 'fda-food-facility-registration-puerto-rico' },
  'pr-fsvp': { es: 'fsvp-alimentos-de-puerto-rico', en: 'is-puerto-rico-food-imported-under-fsvp' },
  'pr-fda-o-usda': { es: 'fda-o-usda-quien-regula-mi-producto', en: 'fda-or-usda-who-regulates-my-food-product' },
  'pr-certificacion-compradores': { es: 'certificacion-de-inocuidad-que-piden-los-compradores', en: 'food-safety-certifications-us-retailers-require' },
  'pr-483-carta-advertencia': { es: 'formulario-483-y-carta-de-advertencia-fda', en: 'fda-form-483-vs-warning-letter' },
  'pr-etiqueta-espanol': { es: 'etiqueta-solo-en-espanol-para-vender-en-estados-unidos', en: 'spanish-only-food-label-puerto-rico' },
  'pr-etiqueta-exportar': { es: 'que-debe-llevar-la-etiqueta-para-vender-en-estados-unidos', en: 'us-food-label-requirements' },
};

/** Claims left out because no primary source could be fetched on the verification date. */
export const PR_FAQ_TODOS: string[] = [
  'FSVP: no FDA text explicitly addresses food made in Puerto Rico and shipped to the mainland. The "No" answer rests on the FSVP guidance (Puerto Rico is in the customs territory, Q A.22; territory-produced food is not from a foreign supplier, Q A.24) plus 21 CFR 1.227 (Puerto Rico plants are domestic facilities). Consider confirming through the FSMA Technical Assistance Network.',
  'FSIS pages (fsis.usda.gov) returned 403 to automated fetches, so FSIS jurisdiction is cited from FDA pages and 9 CFR 417. Not stated: Siluriformes (catfish) jurisdiction, FSIS egg-product details, dual-jurisdiction plant rules (FSIS Directive 5730.1).',
  'FSMA 204: the August 7, 2025 proposed compliance-date extension had no final rule in the Federal Register as of November 11, 2026. Re-check docket FDA-2014-N-0053 before each edit, and update the November 6, 2026 meeting sentence once it is past.',
  'Labeling: net quantity of contents (21 CFR 101.105) could not be verified from the fetched text and is left out of the label checklist. The no-notice exemption for firms under 10 FTEs selling under 10,000 units is not on the FDA small business exemption page and is left out.',
  'Juice HACCP: the retailer exclusion in the definition of "processor" (21 CFR 120.3) was not fetched and is not stated.',
  'PCQI: the language in which FSPCA courses are taught (Spanish delivery) is not stated on the FSPCA page; only the Spanish participant manual is. No local course providers are named.',
  'Registration: DUNS cost and lead time (seen only in search snippets) are not stated.',
  'GFSI: SQF Edition 10, FSSC 22000 version 7 and BRCGS Issue 9 against GFSI V2024 appear to be in benchmarking (seen only in a search snippet, not fetched). The answer lists only programmes on the fetched recognised-CPO page.',
];
