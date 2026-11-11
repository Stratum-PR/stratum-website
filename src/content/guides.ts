/**
 * Long-form compliance guides (Spanish) for small and mid-size food manufacturers in Puerto Rico.
 *
 * Same rules as compliance-faq.ts: every claim comes from the linked official source, dates are
 * stated exactly as the source states them, no invented figures, customers or certifications,
 * and no claims about what Stratum's software does. Anything we could not verify against a
 * primary source lives in `todos`, never in the body. Sources re-checked November 11, 2026
 * (FSMA 204 docket FDA-2014-N-0053 on federalregister.gov: the July 20, 2028 date is still only
 * proposed; SQF Edition 10 audit start date: January 2, 2027, per SQFI).
 *
 * Each guide has an English version (`en`) with the same facts and the same `sources`; it is
 * served at /en/guides/<en.slug>. English slugs are permanent.
 *
 * The page template adds the CTA; do not add one here.
 */

export interface GuideSource { label: string; url: string }
export interface GuideSection { heading: string; paragraphs: string[]; bullets?: string[] }
/** English version of a guide. Shares `status`, `sources`, `verifiedOn` and `todos` with the Spanish one. */
export interface GuideEn {
  slug: string;           // permanent, lowercase ascii, hyphenated; URL /en/guides/<slug>
  title: string;          // H1
  metaTitle: string;      // <= 60 chars, ends with " | Stratum PR"
  description: string;    // 140–160 chars, English
  lead: string;           // direct answer, 2–3 sentences
  sections: GuideSection[];
}
export interface Guide {
  slug: string;
  status: 'draft' | 'published';
  title: string;          // H1, phrased as the reader's question/topic
  metaTitle: string;      // <= 60 chars, ends with " | Stratum PR"
  description: string;    // 140–160 chars, Spanish
  lead: string;           // direct answer, 2–3 sentences
  sections: GuideSection[];
  sources: GuideSource[];
  verifiedOn: string;
  todos: string[];
  en: GuideEn;
}

const SRC = {
  // FDA inspecciones
  iomPage: { label: "FDA: Investigations Operations Manual (IOM)", url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/investigations-operations-manual" },
  iomCh5: { label: "FDA: IOM 2026, Capítulo 5 (Inspecciones), PDF", url: "https://www.fda.gov/media/166533/download" },
  expectInspection: { label: "FDA: What should I expect during an inspection?", url: "https://www.fda.gov/industry/fda-basics-industry/what-should-i-expect-during-inspection" },
  faq483: { label: "FDA: FDA Form 483 Frequently Asked Questions", url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/fda-form-483-frequently-asked-questions" },
  fr2009: { label: "Federal Register (11 de agosto de 2009): Review of Post-Inspection Responses", url: "https://www.govinfo.gov/content/pkg/FR-2009-08-11/html/E9-19107.htm" },
  draft483Drug: { label: "FDA: Responding to FDA Form 483 Observations at the Conclusion of a Drug CGMP Inspection (borrador, 2026)", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/responding-fda-form-483-observations-conclusion-drug-cgmp-inspection" },
  oiiBoundaries: { label: "FDA: OII Inspectorate Boundaries (septiembre de 2024), PDF", url: "https://www.fda.gov/media/182341/download" },
  mouDaco: { label: "FDA: Acuerdo de colaboración FDA (OHFI E-4) y DACO de Puerto Rico", url: "https://www.fda.gov/about-fda/domestic-mous/mou-225-22-029" },
  oiiContacts: { label: "FDA: OII Field Leadership Contacts (actualizada el 6 de octubre de 2026)", url: "https://www.fda.gov/about-fda/contact-office-inspections-and-investigations/oii-field-leadership-contacts" },
  // 21 CFR 117
  cfr117_190: { label: "21 CFR 117.190 (registros requeridos)", url: "https://www.law.cornell.edu/cfr/text/21/117.190" },
  cfr117_305: { label: "21 CFR 117.305 (requisitos de los registros)", url: "https://www.law.cornell.edu/cfr/text/21/117.305" },
  cfr117_315: { label: "21 CFR 117.315 (retención)", url: "https://www.law.cornell.edu/cfr/text/21/117.315" },
  cfr117_320: { label: "21 CFR 117.320 (registros disponibles para revisión oficial)", url: "https://www.law.cornell.edu/cfr/text/21/117.320" },
  // FSMA 204
  ftr: { label: "FDA: Food Traceability Rule (FSMA 204)", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods" },
  ftl: { label: "FDA: Food Traceability List", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/food-traceability-list" },
  ftrDate: { label: "Federal Register (7 de agosto de 2025): propuesta de extensión de la fecha de cumplimiento", url: "https://www.govinfo.gov/content/pkg/FR-2025-08-07/html/2025-14967.htm" },
  ftrMeeting2026: { label: "Federal Register (9 de octubre de 2026): reunión pública sobre trazabilidad a nivel de lote", url: "https://www.govinfo.gov/content/pkg/FR-2026-10-09/html/2026-20720.htm" },
  frDocket: { label: "Federal Register: documentos del expediente FDA-2014-N-0053", url: "https://www.federalregister.gov/documents/search?conditions%5Bdocket_id%5D=FDA-2014-N-0053" },
  cfr1_1305: { label: "21 CFR 1.1305 (exenciones)", url: "https://www.law.cornell.edu/cfr/text/21/1.1305" },
  cfr1_1315: { label: "21 CFR 1.1315 (plan de trazabilidad)", url: "https://www.law.cornell.edu/cfr/text/21/1.1315" },
  cfr1_1340: { label: "21 CFR 1.1340 (envío)", url: "https://www.law.cornell.edu/cfr/text/21/1.1340" },
  cfr1_1345: { label: "21 CFR 1.1345 (recibo)", url: "https://www.law.cornell.edu/cfr/text/21/1.1345" },
  cfr1_1350: { label: "21 CFR 1.1350 (transformación)", url: "https://www.law.cornell.edu/cfr/text/21/1.1350" },
  cfr1_1455: { label: "21 CFR 1.1455 (formato, 24 horas y retención)", url: "https://www.law.cornell.edu/cfr/text/21/1.1455" },
  // SQF
  sqfCode: { label: "SQFI: Food Safety Code: Food Manufacturing, Edición 10", url: "https://www.sqfi.com/the-sqf-code/choose-your-code/library-of-codes/food-manufacturing" },
  sqfEd9Pdf: { label: "SQFI: Food Safety Code: Food Manufacturing, Edición 9 (PDF)", url: "https://www.sqfi.com/docs/sqfilibraries/code-documents/edition-9/code-pdfs/20227fmin_foodmanufacturing_v3-2-final-w-links.pdf?sfvrsn=7f70c75a_8" },
  sqfWhich: { label: "SQFI: Which Code Edition Should I Use?", url: "https://www.sqfi.com/the-sqf-code/comply-with-the-code/which-code-edition-should-i-use" },
  sqfFaq: { label: "SQFI: Edition 10 FAQ", url: "https://www.sqfi.com/the-sqf-code/comply-with-the-code/edition-10-faq" },
  sqfEd10Blog: { label: "SQFI (2 de marzo de 2026): SQF Edition 10 is here", url: "https://www.sqfi.com/news/blog/view/sqfi-blog/2026/03/02/sqf-edition-10-is-here-and-it-starts-your-digital-experience" },
  // HACCP y registros electrónicos
  cfr11_1: { label: "21 CFR 11.1 (alcance y exenciones de la Parte 11)", url: "https://www.law.cornell.edu/cfr/text/21/11.1" },
  cfr11_10: { label: "21 CFR 11.10 (controles para sistemas cerrados)", url: "https://www.law.cornell.edu/cfr/text/21/11.10" },
  cfr113_100: { label: "21 CFR 113.100 (alimentos enlatados de baja acidez: registros)", url: "https://www.law.cornell.edu/cfr/text/21/113.100" },
  cfr114_100: { label: "21 CFR 114.100 (alimentos acidificados: registros)", url: "https://www.law.cornell.edu/cfr/text/21/114.100" },
  cfr120_12: { label: "21 CFR 120.12 (HACCP de jugos: registros)", url: "https://www.law.cornell.edu/cfr/text/21/120.12" },
  cfr123_9: { label: "21 CFR 123.9 (HACCP de pescados y mariscos: registros)", url: "https://www.law.cornell.edu/cfr/text/21/123.9" },
  cfr9_417_5: { label: "9 CFR 417.5 (USDA FSIS: registros HACCP)", url: "https://www.law.cornell.edu/cfr/text/9/417.5" },
} satisfies Record<string, GuideSource>;

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------------------------------------
  {
    slug: 'inspeccion-fda-planta-alimentos-puerto-rico',
    status: 'published',
    title: "Cómo prepararse para una inspección de la FDA en una planta de alimentos en Puerto Rico",
    metaTitle: "Inspección de la FDA en Puerto Rico | Stratum PR",
    description: "Qué pasa cuando llega la FDA a tu planta en Puerto Rico: Formulario 482, registros que pueden pedir, el Formulario 483 y cómo responder en 15 días laborables.",
    lead: "La FDA inspecciona plantas de alimentos en Puerto Rico, y en general no avisa antes de llegar. Prepararse es tener a alguien designado para acompañar al investigador, tener los registros que exige 21 CFR 117 completos y fáciles de encontrar, y saber qué hacer con el Formulario FDA 483 al final. Si recibes un 483, la FDA generalmente da 15 días laborables para responder por escrito antes de decidir si envía una carta de advertencia.",
    sections: [
      {
        heading: "¿Quién inspecciona las plantas de alimentos en Puerto Rico?",
        paragraphs: [
          "La Oficina de Inspecciones e Investigaciones de la FDA (OII) hace las inspecciones de campo. En su documento de límites de inspección (actualizado en septiembre de 2024), la FDA ubica a Puerto Rico en la División Este 4 de su Oficina de Inspección de Alimentos para Consumo Humano (OHFI), junto con Florida y las Islas Vírgenes.",
          "La página de contactos de OII en fda.gov (actualizada el 6 de octubre de 2026) confirma esa agrupación: la División de Inspección de Alimentos para Consumo Humano Este IV cubre Florida, Puerto Rico y las Islas Vírgenes, y su teléfono de oficina es 787-729-8588.",
          "En agosto de 2026, esa misma división (OHFI E-4) firmó un acuerdo de colaboración con el Departamento de Asuntos del Consumidor de Puerto Rico (DACO) para compartir información, coordinar inspecciones basadas en riesgo y responder a emergencias. Es decir, la FDA y DACO pueden coordinar su trabajo, pero cada agencia sigue con su propia autoridad.",
        ],
      },
      {
        heading: "¿Te avisan antes de la inspección?",
        paragraphs: [
          "Normalmente no. El Manual de Operaciones de Investigación de la FDA (IOM), que es la guía principal de los investigadores y está publicado para que la industria lo consulte, dice que el aviso previo es obligatorio para ciertas inspecciones de dispositivos médicos, pero que en general puede ser inapropiado anunciar con anticipación las inspecciones de establecimientos de alimentos, a discreción de la división del programa.",
          "Cuando la FDA sí avisa, el IOM indica que el propósito es asegurar que las personas y los registros correctos estén disponibles, no hacer una cita, y que el aviso para inspecciones domésticas debe darse por lo general con no menos de cinco días calendario. Planifica como si la visita fuera sin aviso.",
        ],
      },
      {
        heading: "Al llegar: credenciales y Formulario FDA 482",
        paragraphs: [
          "Según el IOM 2026 (sección 5.1.4.1), el investigador muestra sus credenciales a la persona de mayor responsabilidad en la planta en ese momento. Puedes examinarlas y anotar el número y el nombre, pero el manual no permite que se fotocopien.",
          "Después entrega el Formulario FDA 482, Aviso de Inspección (Notice of Inspection), firmado, a la persona de mayor responsabilidad (sección 5.1.4.2.1). Si se une otro empleado de la FDA durante la inspección, recibe un 482 nuevo firmado por esa persona.",
        ],
      },
      {
        heading: "Durante la inspección",
        paragraphs: [
          "La FDA explica que el investigador normalmente examina el proceso de producción, revisa ciertos registros y toma muestras. Recomienda que un empleado con conocimiento, como el gerente de planta o de producción, preferiblemente designado de antemano, acompañe al investigador en todo momento, y que el personal pregunte si no entiende lo que el investigador está haciendo.",
          "Si el investigador toma muestras físicas, el IOM indica que debe entregar el Formulario FDA 484, Recibo de Muestras, antes de salir de la planta (sección 5.1.4.2.3).",
        ],
      },
      {
        heading: "Los registros: qué te pueden pedir y en cuánto tiempo",
        paragraphs: [
          "La regla de Controles Preventivos dice que todos los registros que exige la Parte 117 deben estar disponibles con prontitud para revisión y copia oficial cuando un representante autorizado los pida, de forma oral o escrita (21 CFR 117.320).",
          "Los registros se guardan por lo menos 2 años. Pueden estar fuera de la planta si se pueden traer en 24 horas cuando se piden para revisión oficial, excepto el plan de inocuidad, que debe estar en la planta. Un registro electrónico cuenta como \"en la planta\" si se puede abrir desde la planta (21 CFR 117.315).",
          "Para una planta que tiene plan de inocuidad, los registros de implementación incluyen (21 CFR 117.190):",
        ],
        bullets: [
          "La justificación cuando decides no establecer un control preventivo.",
          "El monitoreo de los controles preventivos.",
          "Las acciones correctivas.",
          "La verificación: validación, verificación del monitoreo y de las acciones correctivas, calibración de instrumentos, pruebas de producto, monitoreo ambiental, revisión de registros y reanálisis.",
          "El programa de cadena de suministro.",
          "La capacitación del PCQI y del auditor calificado.",
        ],
      },
      {
        heading: "Al final: el Formulario FDA 483",
        paragraphs: [
          "Si el investigador observó condiciones que pueden violar la ley, al terminar la inspección entrega el Formulario FDA 483, Observaciones de la Inspección, a la gerencia. La FDA explica que cada observación se lee y se discute con la gerencia, que el 483 no es una lista de todo lo que podría estar mal, y que no es una determinación final de la agencia. La FDA lo evalúa junto con el informe de inspección, la evidencia y las respuestas de la empresa.",
          "La FDA también dice que las correcciones hechas de inmediato, en presencia del investigador, se ven como una señal positiva. El IOM permite anotar en el 483 el estado de cada observación (por ejemplo, corregida o prometida) a discreción de la división; es voluntario para la empresa (sección 5.5.11.4).",
        ],
      },
      {
        heading: "Cómo responder: la práctica de los 15 días laborables",
        paragraphs: [
          "La FDA recomienda responder al 483 por escrito con un plan de acción correctiva y ponerlo en marcha con prontitud. En un aviso del Federal Register del 11 de agosto de 2009, la FDA estableció que generalmente da 15 días laborables para responder a las observaciones del 483, y que normalmente no retrasará una carta de advertencia para revisar una respuesta que llegue después de ese plazo.",
          "En marzo de 2026 la FDA publicó un borrador de guía que repite la recomendación de responder en 15 días laborables, pero ese borrador es para inspecciones de medicamentos (CGMP de drogas), no de alimentos. Úsalo como referencia de buenas prácticas, no como una regla para plantas de alimentos.",
        ],
      },
      {
        heading: "Lista práctica para estar listo cualquier día",
        paragraphs: [
          "Estos pasos salen de lo que la FDA y la Parte 117 dicen que el investigador va a ver y pedir:",
        ],
        bullets: [
          "Designa por escrito a la persona que acompaña al investigador y a un sustituto, y practica qué hacer cuando llegan.",
          "Ten el plan de inocuidad en la planta y verifica que esté firmado y al día.",
          "Revisa que los registros de monitoreo, acciones correctivas y verificación de los últimos 2 años estén completos, firmados y se puedan encontrar en minutos.",
          "Si guardas registros fuera de la planta, confirma que puedes traerlos en 24 horas.",
          "Prepara un lugar donde el investigador pueda revisar documentos.",
          "Anota lo que el investigador revisa, las muestras que toma y las preguntas que hace, para preparar tu respuesta.",
          "Si recibes un 483, prepara la respuesta escrita con causa raíz, corrección y evidencia, y envíala dentro de 15 días laborables.",
        ],
      },
    ],
    sources: [
      SRC.iomPage, SRC.iomCh5, SRC.expectInspection, SRC.faq483, SRC.fr2009, SRC.draft483Drug,
      SRC.oiiBoundaries, SRC.oiiContacts, SRC.mouDaco, SRC.cfr117_190, SRC.cfr117_315, SRC.cfr117_320,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): la página de contactos de OII da el teléfono de la División Este IV (787-729-8588) pero no una dirección física. La única dirección de la FDA en San Juan encontrada en fda.gov (466 Ave. Fernández Juncos, San Juan, PR 00901-3223; 787-729-8500) es de la División de Importaciones del Sureste, no de inspecciones domésticas; no se incluyó.",
      "TODO(Jovaniel): confirmar si DACO o el Departamento de Salud de Puerto Rico hacen inspecciones de alimentos por contrato con la FDA en plantas de Puerto Rico; no se encontró fuente primaria.",
    ],
    en: {
      slug: 'fda-inspection-preparation-food-plant-puerto-rico',
      title: "How to prepare for an FDA inspection at a food plant in Puerto Rico",
      metaTitle: "FDA Inspection Prep for Puerto Rico Food Plants | Stratum PR",
      description: "What happens when the FDA inspects your food plant in Puerto Rico: Form 482, the records they can ask for, Form 483, and responding within 15 business days.",
      lead: "The FDA inspects food plants in Puerto Rico, and it generally does not give notice before arriving. Being ready means having someone designated to accompany the investigator, keeping the records required by 21 CFR 117 complete and easy to find, and knowing what to do with FDA Form 483 at the end. If you receive a 483, the FDA generally allows 15 business days for a written response before deciding whether to issue a warning letter.",
      sections: [
        {
          heading: "Who inspects food plants in Puerto Rico?",
          paragraphs: [
            "The FDA's Office of Inspections and Investigations (OII) carries out field inspections. In its inspectorate boundaries document (updated September 2024), the FDA places Puerto Rico in East Division 4 of its Office of Human Food Inspectorate (OHFI), together with Florida and the U.S. Virgin Islands.",
            "OII's contacts page on fda.gov (updated October 6, 2026) confirms that grouping: the Division of Human Food Inspectorate East IV covers Florida, Puerto Rico and the Virgin Islands, and its office phone is 787-729-8588.",
            "In August 2026, that same division (OHFI E-4) signed a partnership agreement with Puerto Rico's Department of Consumer Affairs (DACO) to share information, coordinate risk-based inspections and respond to emergencies. In other words, the FDA and DACO can coordinate their work, but each agency keeps its own authority.",
          ],
        },
        {
          heading: "Will you get advance notice?",
          paragraphs: [
            "Usually not. The FDA's Investigations Operations Manual (IOM), the investigators' primary reference, which is published for industry to consult, says pre-announcement is required for certain medical device inspections, but that pre-announcing food establishment inspections may generally be inappropriate, at the discretion of the program division.",
            "When the FDA does give notice, the IOM says the purpose is to make sure the right people and records are available, not to set an appointment, and that notice for domestic inspections should generally be given no less than five calendar days ahead. Plan as if the visit will be unannounced.",
          ],
        },
        {
          heading: "On arrival: credentials and FDA Form 482",
          paragraphs: [
            "Under the 2026 IOM (section 5.1.4.1), the investigator shows their credentials to the most responsible person at the plant at the time. You may examine them and write down the number and name, but the manual does not allow them to be photocopied.",
            "The investigator then issues a signed FDA Form 482, Notice of Inspection, to the most responsible person (section 5.1.4.2.1). If another FDA employee joins during the inspection, a new 482 signed by that person is issued.",
          ],
        },
        {
          heading: "During the inspection",
          paragraphs: [
            "The FDA explains that the investigator normally examines the production process, reviews certain records and collects samples. It recommends that a knowledgeable employee, such as the plant or production manager, preferably designated in advance, accompany the investigator at all times, and that staff ask if they do not understand what the investigator is doing.",
            "If the investigator collects physical samples, the IOM says they must issue FDA Form 484, Receipt for Samples, before leaving the plant (section 5.1.4.2.3).",
          ],
        },
        {
          heading: "Records: what they can ask for and how fast",
          paragraphs: [
            "The Preventive Controls rule says all records required by Part 117 must be made promptly available for official review and copying when an authorized representative asks for them, orally or in writing (21 CFR 117.320).",
            "Records are kept for at least 2 years. They may be stored offsite if they can be retrieved within 24 hours of a request for official review, except the food safety plan, which must stay onsite. An electronic record counts as onsite if it can be accessed from the plant (21 CFR 117.315).",
            "For a plant with a food safety plan, the implementation records include (21 CFR 117.190):",
          ],
          bullets: [
            "The justification when you decide not to establish a preventive control.",
            "Monitoring of preventive controls.",
            "Corrective actions.",
            "Verification: validation, verification of monitoring and corrective actions, instrument calibration, product testing, environmental monitoring, records review and reanalysis.",
            "The supply-chain program.",
            "Training of the PCQI and the qualified auditor.",
          ],
        },
        {
          heading: "At the close: FDA Form 483",
          paragraphs: [
            "If the investigator observed conditions that may violate the law, they issue FDA Form 483, Inspectional Observations, to management at the end of the inspection. The FDA explains that each observation is read and discussed with management, that the 483 is not an all-inclusive list of everything that could be wrong, and that it is not a final agency determination. The FDA evaluates it together with the inspection report, the evidence and the company's responses.",
            "The FDA also says corrections made right away, in the investigator's presence, are seen as a positive sign. The IOM allows the status of each observation (for example, corrected or promised) to be annotated on the 483 at the division's discretion; it is voluntary for the company (section 5.5.11.4).",
          ],
        },
        {
          heading: "How to respond: the 15-business-day practice",
          paragraphs: [
            "The FDA recommends responding to the 483 in writing with a corrective action plan and implementing it promptly. In an August 11, 2009 Federal Register notice, the FDA stated that it generally allows 15 business days to respond to 483 observations, and that it normally will not delay a warning letter to review a response received after that period.",
            "In March 2026 the FDA published a draft guidance that repeats the 15-business-day recommendation, but that draft is for drug CGMP inspections, not food. Use it as a best-practice reference, not as a rule for food plants.",
          ],
        },
        {
          heading: "A practical checklist to be ready any day",
          paragraphs: [
            "These steps follow from what the FDA and Part 117 say the investigator will look at and ask for:",
          ],
          bullets: [
            "Designate in writing the person who will accompany the investigator, plus a backup, and rehearse what to do when they arrive.",
            "Keep the food safety plan onsite and check that it is signed and current.",
            "Check that monitoring, corrective action and verification records for the last 2 years are complete, signed and can be found in minutes.",
            "If you keep records offsite, confirm you can retrieve them within 24 hours.",
            "Set up a place where the investigator can review documents.",
            "Note what the investigator reviews, the samples they collect and the questions they ask, to prepare your response.",
            "If you receive a 483, prepare a written response with root cause, correction and evidence, and send it within 15 business days.",
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'fsma-204-trazabilidad-fabricantes-pequenos-puerto-rico',
    status: 'published',
    title: "FSMA 204 (trazabilidad) para fabricantes pequeños en Puerto Rico",
    metaTitle: "FSMA 204 para fabricantes en Puerto Rico | Stratum PR",
    description: "Qué exige la regla de trazabilidad FSMA 204 a fabricantes pequeños en Puerto Rico: alimentos cubiertos, CTE, KDE, código de lote, plan, exenciones y fechas.",
    lead: "La regla de trazabilidad de la FDA (FSMA 204) exige registros adicionales a quien fabrica, procesa, empaca o almacena alimentos de la Lista de Trazabilidad, también en Puerto Rico. Si usas o produces uno de esos alimentos, tendrás que registrar datos clave en cada recibo, transformación y envío, asignar códigos de lote de trazabilidad, tener un plan de trazabilidad y entregar los registros en 24 horas. Por orden del Congreso, la FDA no hará cumplir la regla antes del 20 de julio de 2028; la extensión formal de la fecha sigue siendo una propuesta.",
    sections: [
      {
        heading: "¿Cuándo hay que cumplir?",
        paragraphs: [
          "La fecha de cumplimiento original era el 20 de enero de 2026. El 7 de agosto de 2025 la FDA publicó en el Federal Register una propuesta para extenderla 30 meses, hasta el 20 de julio de 2028, y aclaró que la extensión no cambia los requisitos de la regla.",
          "Después, la Ley de Asignaciones Continuas de 2026 (Pub. L. 119-37) ordenó a la FDA no hacer cumplir la regla antes del 20 de julio de 2028, y la FDA dice que cumplirá esa directriz. La sección 780 de esa ley también ordena a la FDA reunirse cada trimestre con la industria para identificar flexibilidades adicionales en el requisito de rastreo a nivel de lote.",
          "La nueva fecha todavía no es final. Al 11 de noviembre de 2026, el expediente de la regla en el Federal Register (FDA-2014-N-0053) tiene la propuesta de extensión del 7 de agosto de 2025, pero ninguna regla final que la adopte, y un aviso de la FDA del 9 de octubre de 2026 todavía la describe como propuesta. Los requisitos no cambian, así que el tiempo extra sirve para prepararse.",
          "Ojo: la sección de introducción (\"Getting Started\") de la página de la FDA sobre la regla todavía dice que la fecha de cumplimiento es el 20 de enero de 2026, aunque la misma página explica la propuesta de extensión y la directriz del Congreso.",
        ],
      },
      {
        heading: "¿Quién está cubierto?",
        paragraphs: [
          "La regla aplica a quien fabrica, procesa, empaca o almacena alimentos de la Lista de Trazabilidad (FTL) para consumo en Estados Unidos, sea doméstico o extranjero. También aplica a alimentos que tienen un ingrediente de la lista, si ese ingrediente se mantiene en la forma en que aparece en la lista (por ejemplo, fresco).",
          "La regla no aplica a alimentos bajo la jurisdicción exclusiva del USDA según las leyes de inspección de carnes, aves y productos de huevo (21 CFR 1.1305(g)).",
        ],
      },
      {
        heading: "La Lista de Trazabilidad de Alimentos",
        paragraphs: [
          "La lista de la FDA incluye:",
        ],
        bullets: [
          "Quesos que no son duros (frescos blandos, blandos madurados o semiblandos de leche pasteurizada, y quesos de leche sin pasteurizar que no son duros). El requesón (cottage cheese) grado \"A\" listado por IMS está exento.",
          "Huevos con cascarón y mantequillas de nueces.",
          "Frescos: pepinos, hierbas, hojas verdes, melones, pimientos, germinados, tomates y frutas tropicales de árbol.",
          "Frescos cortados: hojas verdes, frutas y vegetales.",
          "Pescados de aleta (frescos, congelados y previamente congelados), pescado ahumado, crustáceos y moluscos bivalvos.",
          "Ensaladas listas para comer refrigeradas (deli salads).",
        ],
      },
      {
        heading: "Eventos críticos (CTE) y datos clave (KDE)",
        paragraphs: [
          "Los eventos críticos de rastreo son cosecha, enfriamiento, empaque inicial, primer recibo en tierra (para pescado), envío, recibo y transformación. Una planta de manufactura normalmente tiene tres: recibo, transformación y envío. En cada uno se guardan datos clave enlazados al código de lote.",
          "Al recibir (21 CFR 1.1345): código de lote, cantidad y unidad, descripción del producto, ubicación de quien te lo envió, ubicación donde lo recibiste, fecha de recibo, ubicación de la fuente del código de lote (o una referencia a ella) y tipo y número del documento de referencia.",
          "Al transformar (21 CFR 1.1350): de cada ingrediente de la lista, el código de lote, la descripción y la cantidad usada; del producto nuevo, el código de lote nuevo, la ubicación donde se transformó, la fecha, la descripción, la cantidad y el documento de referencia.",
          "Al enviar (21 CFR 1.1340): código de lote, cantidad y unidad, descripción, ubicación del cliente, ubicación desde donde enviaste, fecha de envío, fuente del código de lote y documento de referencia. Debes pasarle al cliente todos esos datos menos el documento de referencia.",
        ],
      },
      {
        heading: "El código de lote de trazabilidad",
        paragraphs: [
          "Se asigna un código de lote de trazabilidad cuando se empaca por primera vez un producto agrícola crudo, cuando se hace el primer recibo en tierra de pescado o cuando se transforma un alimento. No se crea uno nuevo para otras actividades, como enviar. Para un fabricante, esto quiere decir que cada lote que produces con un ingrediente de la lista necesita su propio código, enlazado a los códigos de los ingredientes que usaste.",
        ],
      },
      {
        heading: "El plan de trazabilidad",
        paragraphs: [
          "La sección 21 CFR 1.1315 exige un plan de trazabilidad que incluya:",
        ],
        bullets: [
          "Los procedimientos que usas para mantener los registros que exige la regla, incluido su formato y dónde se guardan.",
          "Los procedimientos para identificar los alimentos de la lista que fabricas, procesas, empacas o almacenas.",
          "Cómo asignas los códigos de lote de trazabilidad, si aplica.",
          "Un punto de contacto para preguntas sobre el plan y los registros.",
          "Si cultivas o crías un alimento de la lista (excepto huevos), un mapa de la finca o de los contenedores de acuicultura con su ubicación y coordenadas.",
        ],
      },
      {
        heading: "Mantener el plan al día",
        paragraphs: [
          "El plan se actualiza cuando haga falta para que refleje tus prácticas actuales, y la versión anterior se guarda por 2 años después de actualizarlo (21 CFR 1.1315(b)).",
        ],
      },
      {
        heading: "Entregar los registros en 24 horas",
        paragraphs: [
          "Los registros deben estar disponibles para la FDA dentro de 24 horas después de que los pida, o en un tiempo razonable que la FDA acepte. Pueden ser en papel, electrónicos o copias fieles, y se guardan 2 años (21 CFR 1.1455).",
          "Durante un brote, un retiro u otra amenaza a la salud pública, la FDA puede pedirlos como una hoja de cálculo electrónica que se pueda ordenar. La plantilla de la FDA es opcional.",
        ],
      },
      {
        heading: "Exenciones que sí aplican a negocios pequeños",
        paragraphs: [
          "Las exenciones por tamaño de 21 CFR 1.1305 son para fincas y productores pequeños (ventas promedio de no más de $25,000 al año), productores de huevos con menos de 3,000 gallinas, y establecimientos minoristas y restaurantes con ventas promedio de no más de $250,000 al año. Entre esas exenciones no hay una exención por tamaño para fabricantes. Para un fabricante pequeño, el alivio por tamaño es otro: si sus ventas de alimentos promedian no más de $1 millón al año, no tiene que entregar la hoja de cálculo ordenable y puede entregar la información en otra forma (21 CFR 1.1455). Todos los límites son promedios de los 3 años anteriores, ajustados por inflación desde 2020.",
          "Otras exenciones que pueden aplicar a un fabricante:",
        ],
        bullets: [
          "Alimentos que reciben un paso de eliminación (kill step), como la cocción: quien aplica ese paso solo guarda el registro de recibo y el registro del paso (1.1305(d)(3)).",
          "Alimentos que cambias de forma que ya no están en la lista: solo guardas el registro de recibo (1.1305(d)(4)).",
          "Alimentos que ya recibieron el paso de eliminación antes de llegar a ti (1.1305(d)(5)).",
          "La FDA también puede dar exenciones o modificaciones, y dispensas por dificultad económica, según el proceso de la regla.",
        ],
      },
      {
        heading: "Qué hacer ahora",
        paragraphs: [
          "Aunque la FDA no hará cumplir la regla antes del 20 de julio de 2028, los requisitos no cambiaron. Un fabricante pequeño puede empezar así:",
        ],
        bullets: [
          "Revisa tus recetas y materias primas contra la Lista de Trazabilidad.",
          "Verifica si alguna exención aplica (por ejemplo, un paso de cocción) con la herramienta de la FDA y la sección 1.1305.",
          "Define cómo vas a asignar códigos de lote a lo que produces.",
          "Prueba si hoy puedes reunir, para un lote, de quién recibiste cada ingrediente de la lista y a quién enviaste el producto, en menos de 24 horas.",
          "Escribe un borrador de tu plan de trazabilidad.",
        ],
      },
    ],
    sources: [
      SRC.ftr, SRC.ftl, SRC.ftrDate, SRC.frDocket, SRC.cfr1_1305, SRC.cfr1_1315,
      SRC.cfr1_1340, SRC.cfr1_1345, SRC.cfr1_1350, SRC.cfr1_1455,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): vigilar el expediente FDA-2014-N-0053; cuando la FDA publique la regla final de la extensión al 20 de julio de 2028, actualizar la sección de fechas (en español y en inglés).",
      "TODO(Jovaniel): la FDA anunció un borrador de política de discreción para ciertos minoristas y restaurantes pequeños; no se incluyó porque no aplica a fabricantes y no se abrió el documento.",
    ],
    en: {
      slug: 'fsma-204-food-traceability-rule-small-manufacturers',
      title: "FSMA 204 food traceability compliance for small food manufacturers",
      metaTitle: "FSMA 204 Compliance for Small Manufacturers | Stratum PR",
      description: "What the FSMA 204 Food Traceability Rule requires of small food manufacturers: covered foods, CTEs, KDEs, lot codes, traceability plan, exemptions and dates.",
      lead: "The FDA's Food Traceability Rule (FSMA 204) requires additional records from anyone who manufactures, processes, packs or holds foods on the Food Traceability List, including in Puerto Rico. If you use or produce one of those foods, you will need to record key data at each receipt, transformation and shipment, assign traceability lot codes, keep a traceability plan and hand records to the FDA within 24 hours. By order of Congress, the FDA will not enforce the rule before July 20, 2028; the formal extension of the compliance date is still a proposal.",
      sections: [
        {
          heading: "When do you have to comply?",
          paragraphs: [
            "The original compliance date was January 20, 2026. On August 7, 2025 the FDA published a Federal Register proposal to extend it by 30 months, to July 20, 2028, and clarified that the extension does not change the rule's requirements.",
            "Afterwards, the Continuing Appropriations Act of 2026 (Pub. L. 119-37) directed the FDA not to enforce the rule before July 20, 2028, and the FDA says it will comply with that directive. Section 780 of that law also directs the FDA to engage quarterly with industry to identify additional flexibilities for the lot-level tracking requirement.",
            "The new date is not final yet. As of November 11, 2026, the rule's Federal Register docket (FDA-2014-N-0053) contains the August 7, 2025 extension proposal but no final rule adopting it, and an FDA notice from October 9, 2026 still describes the extension as proposed. The requirements have not changed, so the extra time is for getting ready.",
            "Note: the \"Getting Started\" section of the FDA's page on the rule still says the compliance date is January 20, 2026, even though the same page explains the proposed extension and the Congressional directive.",
          ],
        },
        {
          heading: "Who is covered?",
          paragraphs: [
            "The rule applies to anyone who manufactures, processes, packs or holds foods on the Food Traceability List (FTL) for consumption in the United States, domestic or foreign. It also applies to foods that contain a listed ingredient, if that ingredient stays in the form in which it appears on the list (for example, fresh).",
            "The rule does not apply to foods under the exclusive jurisdiction of the USDA under the meat, poultry and egg products inspection laws (21 CFR 1.1305(g)).",
          ],
        },
        {
          heading: "The Food Traceability List",
          paragraphs: [
            "The FDA's list includes:",
          ],
          bullets: [
            "Cheeses other than hard cheeses (fresh soft, soft ripened or semi-soft cheeses made from pasteurized milk, and unpasteurized-milk cheeses other than hard cheeses). IMS-listed Grade \"A\" cottage cheese is exempt.",
            "Shell eggs and nut butters.",
            "Fresh cucumbers, herbs, leafy greens, melons, peppers, sprouts, tomatoes and tropical tree fruits.",
            "Fresh-cut leafy greens, fruits and vegetables.",
            "Finfish (fresh, frozen and previously frozen), smoked finfish, crustaceans and bivalve mollusks.",
            "Refrigerated ready-to-eat deli salads.",
          ],
        },
        {
          heading: "Critical tracking events (CTEs) and key data elements (KDEs)",
          paragraphs: [
            "The critical tracking events are harvesting, cooling, initial packing, first land-based receiving (for seafood), shipping, receiving and transformation. A manufacturing plant usually has three: receiving, transformation and shipping. At each one you keep key data elements linked to the traceability lot code.",
            "When receiving (21 CFR 1.1345): lot code, quantity and unit of measure, product description, location of the immediate previous source, receiving location, date received, location of the traceability lot code source (or a reference to it), and the reference document type and number.",
            "When transforming (21 CFR 1.1350): for each listed ingredient, the lot code, description and quantity used; for the new product, the new lot code, the location where it was transformed, the date, the description, the quantity and the reference document.",
            "When shipping (21 CFR 1.1340): lot code, quantity and unit of measure, description, location of the immediate subsequent recipient, location you shipped from, ship date, lot code source and reference document. You must pass all of that data to your customer except the reference document.",
          ],
        },
        {
          heading: "The traceability lot code",
          paragraphs: [
            "A traceability lot code is assigned when a raw agricultural commodity is initially packed, when seafood is first received on land, or when a food is transformed. A new one is not created for other activities, such as shipping. For a manufacturer, this means each lot you produce with a listed ingredient needs its own code, linked to the codes of the ingredients you used.",
          ],
        },
        {
          heading: "The traceability plan",
          paragraphs: [
            "21 CFR 1.1315 requires a traceability plan that includes:",
          ],
          bullets: [
            "The procedures you use to maintain the records the rule requires, including their format and location.",
            "The procedures you use to identify the listed foods you manufacture, process, pack or hold.",
            "How you assign traceability lot codes, if applicable.",
            "A point of contact for questions about the plan and the records.",
            "If you grow or raise a listed food (other than eggs), a farm map, or a map of aquaculture containers, with locations and coordinates.",
          ],
        },
        {
          heading: "Keeping the plan current",
          paragraphs: [
            "You update the plan as needed so it reflects your current practices, and you keep the previous version for 2 years after you update it (21 CFR 1.1315(b)).",
          ],
        },
        {
          heading: "Producing records within 24 hours",
          paragraphs: [
            "Records must be made available to the FDA within 24 hours of a request, or within a reasonable time the FDA agrees to. They can be paper, electronic or true copies, and they are kept for 2 years (21 CFR 1.1455).",
            "During an outbreak, recall or other public health threat, the FDA can request them as an electronic sortable spreadsheet. The FDA's template is optional.",
          ],
        },
        {
          heading: "Exemptions that matter for small businesses",
          paragraphs: [
            "The size-based exemptions in 21 CFR 1.1305 are for small farms and producers (average annual sales of no more than $25,000), shell egg producers with fewer than 3,000 laying hens, and retail food establishments and restaurants with average annual sales of no more than $250,000. None of those is a size-based exemption for manufacturers. For a small manufacturer, the size-based relief is different: if its average annual food sales are no more than $1 million, it does not have to provide the sortable spreadsheet and can provide the information in another form (21 CFR 1.1455). All thresholds are averages of the previous 3 years, adjusted for inflation from 2020.",
            "Other exemptions that may apply to a manufacturer:",
          ],
          bullets: [
            "Foods that receive a kill step, such as cooking: whoever applies the kill step only keeps the receiving record and a record of the kill step (1.1305(d)(3)).",
            "Foods you change so they are no longer on the list: you only keep the receiving record (1.1305(d)(4)).",
            "Foods that already received a kill step before reaching you (1.1305(d)(5)).",
            "The FDA can also grant exemptions or modified requirements, and waivers for economic hardship, through the rule's process.",
          ],
        },
        {
          heading: "What to do now",
          paragraphs: [
            "Although the FDA will not enforce the rule before July 20, 2028, the requirements have not changed. A small manufacturer can start like this:",
          ],
          bullets: [
            "Check your recipes and raw materials against the Food Traceability List.",
            "Check whether an exemption applies (for example, a cooking step) using the FDA's exemptions tool and section 1.1305.",
            "Decide how you will assign lot codes to what you produce.",
            "Test whether, today, you can pull together for one lot who supplied each listed ingredient and who you shipped the product to, in under 24 hours.",
            "Write a draft of your traceability plan.",
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'lista-cotejo-auditoria-sqf-puerto-rico',
    status: 'published',
    title: "Lista de cotejo para auditoría SQF en Puerto Rico (Edición 9 / transición a Edición 10)",
    metaTitle: "Lista de cotejo para auditoría SQF | Stratum PR",
    description: "Lista de cotejo práctica para una auditoría SQF de manufactura de alimentos, organizada por las secciones de la Edición 9 y lo que cambia en la Edición 10.",
    lead: "Hoy las auditorías SQF de manufactura de alimentos se hacen con la Edición 9. SQFI publicó la Edición 10 en marzo de 2026 y espera que sus auditorías empiecen no antes del 2 de enero de 2027, sujeto al reconocimiento de GFSI. Esta lista sigue las secciones del código de la Edición 9 (Módulo 2, elementos del sistema, y Módulo 11, buenas prácticas de manufactura) para que revises tu planta antes del auditor.",
    sections: [
      {
        heading: "¿Edición 9 o Edición 10?",
        paragraphs: [
          "SQFI anunció el 2 de marzo de 2026 que la Edición 10 del código ya está disponible. Según SQFI, las auditorías bajo la Edición 10 se esperan para el 2 de enero de 2027, no empezarán antes de esa fecha, y la fecha depende del proceso de reconocimiento de GFSI y puede moverse. Hasta que GFSI reconozca la Edición 10, la Edición 9 es el único programa SQF reconocido por GFSI.",
          "Si tu auditoría ocurre antes de la fecha obligatoria de la Edición 10, te auditan con la Edición 9, y los organismos de certificación no mezclan requisitos de las dos ediciones en una misma auditoría. Si una auditoría de la Edición 9 lleva a una auditoría de vigilancia programada después de esa fecha, la vigilancia también se hace con la Edición 9. SQFI dice que no hace falta cambiar la numeración de tus políticas a la de la Edición 10, aunque quizás tengas que revisarlas, y que la Edición 10 añade que todas las plantas tengan un plan de evaluación de la cultura de inocuidad.",
          "Los números de sección de esta lista son de la Edición 9. Los elementos marcados \"obligatorio\" no se pueden declarar \"no aplica\" ni exentos.",
        ],
      },
      {
        heading: "2.1 Compromiso de la gerencia",
        paragraphs: [],
        bullets: [
          "2.1.1 (obligatorio): política de inocuidad firmada por la alta gerencia; liderazgo de la cultura de inocuidad; organigrama; practicante SQF principal y sustituto designados.",
          "2.1.2 (obligatorio): revisión gerencial del sistema por lo menos una vez al año, y actualización mensual del practicante SQF a la gerencia.",
          "2.1.3 (obligatorio): manejo de quejas, análisis de tendencias y acciones correctivas.",
        ],
      },
      {
        heading: "2.2 Control de documentos y registros",
        paragraphs: [],
        bullets: [
          "2.2.1 (obligatorio): manual o sistema documentado de inocuidad.",
          "2.2.2 (obligatorio): control de documentos; el personal usa la versión vigente.",
          "2.2.3 (obligatorio): registros legibles, confirmados por quien hizo la actividad, accesibles, recuperables y guardados de forma segura; retención según cliente y ley, y como mínimo la vida útil del producto.",
        ],
      },
      {
        heading: "2.3 Especificaciones, formulación y suplidores",
        paragraphs: [],
        bullets: [
          "2.3.1: diseño y desarrollo de productos; validación de formulación, vida útil y etiqueta.",
          "2.3.2: especificaciones de materias primas, empaque, servicios y producto terminado; etiquetas exactas y conforme a la ley.",
          "2.3.3: acuerdos con manufactura por contrato y almacenes de terceros.",
          "2.3.4 (obligatorio): programa de suplidores aprobados basado en riesgo, verificación de materias primas y auditorías de suplidores según riesgo.",
        ],
      },
      {
        heading: "2.4 Sistema de inocuidad",
        paragraphs: [],
        bullets: [
          "2.4.1 (obligatorio): cumplimiento de la ley; avisar por escrito a SQFI y al organismo de certificación dentro de 24 horas cuando haya una advertencia o un evento regulatorio.",
          "2.4.2 (obligatorio): buenas prácticas de manufactura del Módulo 11 aplicadas o exentas según una evaluación de riesgo escrita.",
          "2.4.3 (obligatorio): plan de inocuidad según los 12 pasos de HACCP: equipo, descripción y uso del producto, diagrama de flujo, análisis de peligros, PCC, límites críticos, monitoreo, desviaciones, verificación y registros.",
          "2.4.4: muestreo, inspección y análisis; laboratorios.",
          "2.4.5 y 2.4.6: producto no conforme y reproceso.",
          "2.4.7 (obligatorio): liberación de producto, incluida la verificación de etiquetas.",
          "2.4.8: programa de monitoreo ambiental basado en riesgo, con resultados registrados y en tendencia.",
        ],
      },
      {
        heading: "2.5 Verificación del sistema",
        paragraphs: [],
        bullets: [
          "2.5.1 (obligatorio): validación y efectividad de límites críticos y controles.",
          "2.5.2 (obligatorio): calendario de verificación y revisión de registros de monitoreo.",
          "2.5.3 (obligatorio): acciones correctivas y preventivas con análisis de causa raíz y sus registros.",
          "2.5.4 (obligatorio): auditorías internas por personal capacitado e inspecciones regulares de planta y equipo.",
        ],
      },
      {
        heading: "2.6 a 2.9: trazabilidad, crisis, defensa, alérgenos y capacitación",
        paragraphs: [],
        bullets: [
          "2.6.1 (obligatorio): identificación de materias primas, producto en proceso y terminado; controles en cambios de producto y de etiqueta.",
          "2.6.2 (obligatorio): rastreo un paso hacia atrás y uno hacia adelante, fechas de recibo de materiales y revisión anual del sistema.",
          "2.6.3 (obligatorio): procedimiento de retiro probado por lo menos una vez al año; aviso por escrito a SQFI y al organismo de certificación dentro de 24 horas de un evento que requiera notificación pública.",
          "2.6.4: plan de manejo de crisis.",
          "2.7.1 y 2.7.2 (obligatorios): plan de defensa alimentaria y evaluación de vulnerabilidad al fraude alimentario con su plan.",
          "2.8.1 (obligatorio): manejo de alérgenos.",
          "2.9 (2.9.2 obligatorio): programa de capacitación y sus registros.",
        ],
      },
      {
        heading: "Módulo 11: buenas prácticas de manufactura",
        paragraphs: [
          "Recorre la planta con estos temas del Módulo 11 de la Edición 9:",
        ],
        bullets: [
          "11.1 Ubicación y edificio: materiales, iluminación, control de polvo, insectos y plagas, ventilación, equipo y utensilios, y alrededores.",
          "11.2 Operación: mantenimiento y reparaciones, personal de mantenimiento y contratistas, calibración, prevención de plagas, limpieza y sanitización.",
          "11.3 Higiene del personal: lavado de manos, ropa y efectos personales, visitantes y áreas del personal.",
          "11.4 Prácticas del personal que manipula alimentos.",
          "11.5 Agua, hielo y aire: suministro, tratamiento y calidad.",
          "11.6 Recibo, almacenamiento y transporte: refrigeración y congelación, almacén seco, químicos peligrosos, carga y descarga.",
          "11.7 Separación de funciones: procesos de alto riesgo, descongelación, control y detección de materia extraña.",
          "11.8 Manejo de desperdicios.",
        ],
      },
      {
        heading: "Cómo se califica y cuánto tiempo tienes para corregir",
        paragraphs: [
          "En la Edición 9, cada cláusula suma 0 si cumple, 1 por una no conformidad menor, 5 por una mayor y 50 por una crítica, y la puntuación es 100 menos esa suma. De 96 a 100 es Excelente y de 86 a 95 es Buena (recertificación cada 12 meses); de 70 a 85 Cumple (auditoría de vigilancia a los 6 meses); de 0 a 69 no cumple y no hay certificado. Una no conformidad crítica en una auditoría inicial es un fallo automático.",
          "Las no conformidades menores y mayores se cierran en la base de datos de SQFI dentro de 30 días calendario después de terminar la auditoría, con un análisis de causa raíz documentado. El organismo de certificación puede dar más tiempo en ciertos casos, como cambios estructurales, si hay medidas temporales.",
          "El organismo de certificación hace una auditoría sin aviso una vez cada tres años, dentro de la ventana de recertificación de 60 días.",
        ],
      },
      {
        heading: "Qué cambia en la calificación y los plazos con la Edición 10",
        paragraphs: [
          "El código de manufactura de alimentos de la Edición 10 publicado en sqfi.com cambia la calificación (A2:19). Sigue la fórmula 100 menos la suma de deducciones, pero añade las cláusulas centrales (core clauses): 1 punto por no conformidad menor, 2 por menor en una cláusula central, 5 por mayor, 7 por mayor en una cláusula central y 50 por crítica. De 80 a 100 la planta queda certificada con auditoría a los 12 meses, y de 70 a 79 queda certificada con auditoría de vigilancia a los 6 meses.",
          "El plazo para cerrar no conformidades sube a 40 días calendario: las acciones correctivas de no conformidades menores y mayores deben eliminar la causa raíz, ser aprobadas por el auditor y cerrarse en la base de datos de SQFI dentro de 40 días calendario después de terminar la auditoría (A2:21). Si no se entregan a tiempo, la planta no es elegible para la certificación. El organismo de certificación puede dar extensiones (en menores, si no hay amenaza inmediata y hay controles temporales; en mayores, por cambios estructurales, limitaciones de temporada o instalaciones que tardan, con controles interinos), pero la no conformidad igual se marca como cerrada en la base de datos dentro de los 40 días.",
          "La auditoría sin aviso sigue siendo una vez cada tres años, y el primer ciclo empieza con la primera auditoría de recertificación. La planta puede escoger en cambio auditorías de recertificación sin aviso todos los años, lo que SQFI reconoce como \"SQFI Select Site\" (A2:14).",
        ],
      },
    ],
    sources: [SRC.sqfEd9Pdf, SRC.sqfCode, SRC.sqfWhich, SRC.sqfFaq, SRC.sqfEd10Blog],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): los números de sección son del PDF de la Edición 9 en sqfi.com (versión con enlaces, copyright 2020). Confirmar con el organismo de certificación que no hay enmiendas a la Edición 9 que cambien estos números o requisitos.",
      "TODO(Jovaniel): la lista no incluye la numeración de los elementos de la Edición 10 (por ejemplo, 2.1.1.1); hacer una versión de la lista con esa numeración cuando empiecen las auditorías de la Edición 10. La tabla de calificación A2:19 en sqfi.com lista el rango 0 a 69 dos veces con resultados distintos; no se incluyó ese rango.",
      "TODO(Jovaniel): confirmar qué categoría de sector alimentario (FSC) y qué módulo aplica a cada tipo de planta en Puerto Rico; esta lista asume manufactura de alimentos (Módulo 11).",
    ],
    en: {
      slug: 'sqf-audit-checklist-food-manufacturing',
      title: "SQF audit checklist for food manufacturers (Edition 9 and the move to Edition 10)",
      metaTitle: "SQF Audit Checklist for Food Manufacturers | Stratum PR",
      description: "A practical SQF audit checklist for food manufacturing plants, organized by the Edition 9 code sections, plus what changes in Edition 10 scoring and deadlines.",
      lead: "SQF food manufacturing audits are done against Edition 9 today. SQFI released Edition 10 in March 2026 and expects Edition 10 audits to begin January 2, 2027, and not earlier, subject to GFSI recognition. This checklist follows the Edition 9 code sections (Module 2, system elements, and Module 11, good manufacturing practices) so you can review your plant before the auditor does.",
      sections: [
        {
          heading: "Edition 9 or Edition 10?",
          paragraphs: [
            "SQFI announced on March 2, 2026 that Edition 10 of the code is available. According to SQFI, Edition 10 audits are expected to begin January 2, 2027 and will not start before that date; the date depends on the GFSI benchmarking process and may move later. Until GFSI recognizes Edition 10, Edition 9 is the only GFSI-recognized SQF program.",
            "If your audit happens before the mandatory Edition 10 date, you are audited to Edition 9, and certification bodies do not mix requirements from both editions in one audit. If an Edition 9 audit leads to a surveillance audit scheduled after that date, the surveillance audit is also against Edition 9. SQFI says you do not need to renumber your policies to match Edition 10, though you may need to review them, and that Edition 10 adds a requirement for every site to have a food safety culture assessment plan.",
            "The section numbers in this checklist are from Edition 9. Elements marked \"mandatory\" cannot be declared \"not applicable\" or exempt.",
          ],
        },
        {
          heading: "2.1 Management commitment",
          paragraphs: [],
          bullets: [
            "2.1.1 (mandatory): food safety policy signed by senior management; food safety culture leadership; organization chart; designated primary SQF practitioner and substitute.",
            "2.1.2 (mandatory): management review of the system at least once a year, and a monthly update from the SQF practitioner to management.",
            "2.1.3 (mandatory): complaint management, trend analysis and corrective actions.",
          ],
        },
        {
          heading: "2.2 Document control and records",
          paragraphs: [],
          bullets: [
            "2.2.1 (mandatory): a documented food safety manual or system.",
            "2.2.2 (mandatory): document control; staff use the current version.",
            "2.2.3 (mandatory): records that are legible, confirmed by the person who did the activity, accessible, retrievable and stored securely; retention per customer and legal requirements, and at least the product's shelf life.",
          ],
        },
        {
          heading: "2.3 Specifications, formulation and suppliers",
          paragraphs: [],
          bullets: [
            "2.3.1: product design and development; validation of formulation, shelf life and labeling.",
            "2.3.2: specifications for raw materials, packaging, services and finished product; labels accurate and compliant with the law.",
            "2.3.3: agreements with contract manufacturers and third-party warehouses.",
            "2.3.4 (mandatory): a risk-based approved supplier program, raw material verification and supplier audits based on risk.",
          ],
        },
        {
          heading: "2.4 Food safety system",
          paragraphs: [],
          bullets: [
            "2.4.1 (mandatory): legal compliance; notify SQFI and the certification body in writing within 24 hours of a regulatory warning or event.",
            "2.4.2 (mandatory): Module 11 good manufacturing practices applied, or exempted based on a written risk assessment.",
            "2.4.3 (mandatory): a food safety plan following the 12 HACCP steps: team, product description and intended use, flow diagram, hazard analysis, CCPs, critical limits, monitoring, deviations, verification and records.",
            "2.4.4: sampling, inspection and analysis; laboratories.",
            "2.4.5 and 2.4.6: nonconforming product and rework.",
            "2.4.7 (mandatory): product release, including label verification.",
            "2.4.8: a risk-based environmental monitoring program, with results recorded and trended.",
          ],
        },
        {
          heading: "2.5 System verification",
          paragraphs: [],
          bullets: [
            "2.5.1 (mandatory): validation and effectiveness of critical limits and controls.",
            "2.5.2 (mandatory): verification schedule and review of monitoring records.",
            "2.5.3 (mandatory): corrective and preventive actions with root cause analysis, and their records.",
            "2.5.4 (mandatory): internal audits by trained staff, and regular inspections of the plant and equipment.",
          ],
        },
        {
          heading: "2.6 to 2.9: traceability, crisis, defense, allergens and training",
          paragraphs: [],
          bullets: [
            "2.6.1 (mandatory): identification of raw materials, work in progress and finished product; controls at product and label changeovers.",
            "2.6.2 (mandatory): one-up, one-back traceability, receipt dates of materials and an annual review of the system.",
            "2.6.3 (mandatory): a recall procedure tested at least once a year; written notice to SQFI and the certification body within 24 hours of an event that requires public notification.",
            "2.6.4: crisis management plan.",
            "2.7.1 and 2.7.2 (mandatory): food defense plan, and food fraud vulnerability assessment with its plan.",
            "2.8.1 (mandatory): allergen management.",
            "2.9 (2.9.2 mandatory): training program and its records.",
          ],
        },
        {
          heading: "Module 11: good manufacturing practices",
          paragraphs: [
            "Walk the plant with these Edition 9 Module 11 topics:",
          ],
          bullets: [
            "11.1 Site location and premises: materials, lighting, dust, insect and pest proofing, ventilation, equipment and utensils, and grounds.",
            "11.2 Site operation: maintenance and repairs, maintenance staff and contractors, calibration, pest prevention, cleaning and sanitation.",
            "11.3 Personnel hygiene: handwashing, clothing and personal effects, visitors and staff amenities.",
            "11.4 Personnel processing practices.",
            "11.5 Water, ice and air: supply, treatment and quality.",
            "11.6 Receipt, storage and transport: chilled and frozen storage, dry storage, hazardous chemicals, loading and unloading.",
            "11.7 Separation of functions: high-risk processes, thawing, foreign matter control and detection.",
            "11.8 Waste disposal.",
          ],
        },
        {
          heading: "How you are scored and how long you have to fix findings",
          paragraphs: [
            "In Edition 9, each clause deducts 0 if compliant, 1 for a minor nonconformance, 5 for a major and 50 for a critical, and the score is 100 minus that total. 96 to 100 is Excellent and 86 to 95 is Good (recertification every 12 months); 70 to 85 is Complies (surveillance audit at 6 months); 0 to 69 fails to comply and no certificate is issued. A critical nonconformance at an initial audit is an automatic failure.",
            "Minor and major nonconformances are closed in the SQFI database within 30 calendar days of the end of the audit, with a documented root cause analysis. The certification body can allow more time in certain cases, such as structural changes, if temporary measures are in place.",
            "The certification body conducts one unannounced audit every three years, within the 60-day recertification window.",
          ],
        },
        {
          heading: "What changes in scoring and deadlines with Edition 10",
          paragraphs: [
            "The Edition 10 food manufacturing code published on sqfi.com changes the scoring (A2:19). It keeps the formula of 100 minus total deductions but adds core clauses: 1 point for a minor nonconformance, 2 for a core clause minor, 5 for a major, 7 for a core clause major and 50 for a critical. A score of 80 to 100 is certified with a 12-month audit, and 70 to 79 is certified with a 6-month surveillance audit.",
            "The deadline to close nonconformances goes up to 40 calendar days: corrective actions for minor and major nonconformances must eliminate the root cause, be approved by the auditor and be closed in the SQFI Assessment Database within 40 calendar days of the end of the audit (A2:21). If they are not submitted in time, the site is ineligible for certification. The certification body can grant extensions (for minors, when there is no immediate threat to product safety and temporary controls are in place; for majors, for structural changes, seasonal constraints or long lead-time installations, with interim controls), but the nonconformance must still be marked closed in the database within the 40 days.",
            "The unannounced audit is still once every three years, and the first cycle starts with the site's first recertification audit. A site can instead choose unannounced recertification audits every year, which SQFI recognizes as an \"SQFI Select Site\" (A2:14).",
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'registros-haccp-papel-a-digital',
    status: 'published',
    title: "Cómo pasar de registros HACCP en papel a digitales",
    metaTitle: "Registros HACCP: de papel a digital | Stratum PR",
    description: "Qué dicen la FDA y el USDA sobre registros HACCP electrónicos, cuándo aplica la Parte 11 y cómo pasar de papel a digital sin perder registros válidos.",
    lead: "Sí puedes llevar tus registros HACCP y de controles preventivos en formato digital: la FDA y el USDA aceptan registros electrónicos. Lo que cambia según tu producto es el nivel de control que te exigen: la regla de Controles Preventivos (21 CFR 117) exime esos registros de la Parte 11, la regla de HACCP de jugos y la de alimentos enlatados de baja acidez los someten a la Parte 11, y las de pescados y mariscos y de carnes y aves piden controles que aseguren la integridad de los datos y las firmas.",
    sections: [
      {
        heading: "Qué regla aplica a tu planta",
        paragraphs: [
          "Antes de escoger cómo digitalizar, identifica bajo qué regla están tus registros:",
        ],
        bullets: [
          "Controles Preventivos para alimentos de consumo humano (21 CFR 117): la mayoría de las plantas reguladas por la FDA.",
          "Alimentos enlatados de baja acidez (21 CFR 113) y alimentos acidificados (21 CFR 114).",
          "HACCP de jugos (21 CFR 120).",
          "HACCP de pescados y mariscos (21 CFR 123).",
          "HACCP de carnes y aves (9 CFR 417): plantas bajo inspección del Servicio de Inocuidad e Inspección de Alimentos (FSIS) del USDA.",
        ],
      },
      {
        heading: "21 CFR 117: registros electrónicos y la Parte 11",
        paragraphs: [
          "La sección 117.305 dice que los registros pueden ser originales, copias fieles (como fotocopias, fotos, copias escaneadas o microfilm) o registros electrónicos. Además deben:",
        ],
        bullets: [
          "Tener los valores y observaciones reales del monitoreo y, cuando aplique, de la verificación.",
          "Ser precisos, indelebles y legibles.",
          "Hacerse al mismo tiempo que la actividad.",
          "Ser tan detallados como haga falta para saber cómo se hizo el trabajo.",
          "Incluir el nombre de la planta (y su ubicación si hace falta), la fecha y, cuando aplique, la hora, la firma o iniciales de quien hizo la actividad y, cuando aplique, el producto y el código de lote.",
        ],
      },
      {
        heading: "La exención de la Parte 11",
        paragraphs: [
          "Según 117.305(g), los registros que se hacen para cumplir la Parte 117 y que son registros electrónicos según la definición de la Parte 11 están exentos de la Parte 11. Pero si esos mismos registros también los exige otra ley o regulación, siguen sujetos a la Parte 11.",
          "La Parte 11 cubre los registros electrónicos que se crean, modifican, mantienen, archivan, recuperan o transmiten bajo los requisitos de registros de la FDA (21 CFR 11.1(b)). Sus exenciones (11.1(f) a (p)) incluyen la Parte 117, además de las Partes 112, 121 y 507 y algunas secciones y subpartes de la Parte 1, pero no las Partes 113, 114, 120 ni 123.",
          "La Parte 11 es la regla de la FDA sobre registros y firmas electrónicas. Para sistemas cerrados pide, entre otras cosas, validación del sistema, acceso limitado a personas autorizadas, verificación de autoridad y un registro de auditoría seguro, generado por la computadora y con fecha y hora, que guarde quién crea, cambia o borra un registro sin ocultar lo que había antes (21 CFR 11.10).",
          "Aunque tus registros de la Parte 117 estén exentos, la exigencia de que sean indelebles y se hagan en el momento sigue en pie. En la práctica, eso significa que un cambio no debería borrar el valor original sin dejar rastro.",
        ],
      },
      {
        heading: "Enlatados de baja acidez, acidificados, jugos, pescados y mariscos, y carnes y aves",
        paragraphs: [
          "Alimentos enlatados de baja acidez: 21 CFR 113.100(h) dice que los registros pueden llevarse electrónicamente si cumplen la Parte 11. Se guardan por lo menos 1 año en la planta desde la fecha de fabricación y 2 años más en la planta u otro lugar razonablemente accesible (113.100(g)).",
          "Alimentos acidificados: 21 CFR 114.100 no menciona registros electrónicos. Las copias de los registros que exige se guardan 3 años desde la fecha de fabricación, en la planta u otro lugar razonablemente accesible.",
          "HACCP de jugos: 21 CFR 120.12(g) acepta registros computarizados si se mantienen conforme a la Parte 11. Los registros se guardan por lo menos 1 año para jugos perecederos o refrigerados, y 2 años o la vida útil, lo que sea mayor, para productos congelados, preservados o estables. Los registros de monitoreo pueden ir fuera de la planta después de 6 meses si se pueden traer en 24 horas.",
          "HACCP de pescados y mariscos: 21 CFR 123.9(f) acepta registros en computadora si hay controles apropiados para asegurar la integridad de los datos electrónicos y las firmas; la sección 123.9 no menciona la Parte 11. Se guardan por lo menos 1 año para productos refrigerados y 2 años para congelados, preservados o estables, y la información se anota en el momento en que se observa.",
          "HACCP de carnes y aves (USDA FSIS): 9 CFR 417.5(d) acepta registros en computadora con controles apropiados para la integridad de los datos y las firmas. Cada anotación se hace cuando ocurre el evento, con fecha y hora, firmada o con iniciales de quien la hace, y antes de enviar el producto se revisan los registros de producción. Los registros de monitoreo se guardan por lo menos 1 año (matanza y productos refrigerados) o 2 años (congelados, preservados o estables), y pueden ir fuera de la planta después de 6 meses si se entregan en 24 horas cuando FSIS los pide.",
        ],
      },
      {
        heading: "Cuánto tiempo guardar y dónde (21 CFR 117)",
        paragraphs: [
          "Los registros de la Parte 117 se guardan por lo menos 2 años. Pueden estar fuera de la planta si se traen en 24 horas cuando se piden, excepto el plan de inocuidad, que debe estar en la planta. Un registro electrónico cuenta como \"en la planta\" si se puede abrir desde ella (21 CFR 117.315). Todos deben estar disponibles con prontitud para revisión y copia oficial (21 CFR 117.320).",
          "Si tienes certificación SQF, el código pide además que los registros sean legibles, accesibles, recuperables y guardados de forma segura contra acceso no autorizado, pérdida o daño, por lo menos durante la vida útil del producto o lo que exijan el cliente o la ley.",
        ],
      },
      {
        heading: "Pasos para hacer la transición",
        paragraphs: [
          "Estos pasos se derivan de los requisitos anteriores; ajústalos a la regla que te aplique:",
        ],
        bullets: [
          "Haz un inventario de todos tus formularios en papel: monitoreo, acciones correctivas, verificación, calibración, limpieza, recibo, capacitación.",
          "Para cada formulario, confirma que la versión digital capture todos los datos que exige tu regla (planta, fecha, hora, quién lo hizo, producto y lote).",
          "Decide cómo se identifica la persona que anota: cada usuario con su propia cuenta, no una contraseña compartida.",
          "Define qué pasa cuando alguien corrige un valor: el valor original debe quedar visible.",
          "Si produces jugo o alimentos enlatados de baja acidez, confirma que el sistema cumple la Parte 11 antes de dejar el papel.",
          "Corre papel y digital en paralelo por un período corto y compara.",
          "Decide qué hacer con los registros en papel que ya tienes: guárdalos el tiempo que exige tu regla, en papel o como copias fieles escaneadas.",
          "Prueba que puedes encontrar y entregar cualquier registro en menos de 24 horas.",
          "Actualiza tus procedimientos y capacita al personal en la nueva forma de registrar.",
        ],
      },
    ],
    sources: [
      SRC.cfr117_305, SRC.cfr117_315, SRC.cfr117_320, SRC.cfr11_1, SRC.cfr11_10, SRC.cfr113_100,
      SRC.cfr114_100, SRC.cfr120_12, SRC.cfr123_9, SRC.cfr9_417_5, SRC.sqfEd9Pdf,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): FSIS parece tener guía para sus inspectores sobre registros HACCP electrónicos (Directiva 5000.1, controles para atribuir cada anotación y no cambiarla sin dejar rastro; Directiva 5000.9 sobre registros de monitoreo por video u otros medios electrónicos), pero fsis.usda.gov devolvió 403 el 11 de noviembre de 2026 y no se pudo leer la versión vigente; no se incluyó.",
      "TODO(Jovaniel): la guía no menciona la guía de la FDA de 2003 sobre el alcance y la aplicación de la Parte 11 (Scope and Application), que describe discreción de cumplimiento para algunos requisitos; no se abrió. Revisar si conviene añadirla.",
      "TODO(Jovaniel): la guía no dice cuáles de las reglas aplican a cada cliente; un fabricante que tenga registros bajo la Parte 117 y también bajo la 113, 114, 120 o 123 debe confirmarlo con su asesor regulatorio.",
    ],
    en: {
      slug: 'paper-to-digital-haccp-records',
      title: "How to move HACCP records from paper to digital",
      metaTitle: "Paper to Digital HACCP Records | Stratum PR",
      description: "What the FDA and USDA say about electronic HACCP and preventive controls records, when FDA Part 11 applies, and how to go digital without losing valid records.",
      lead: "Yes, you can keep your HACCP and preventive controls records digitally: the FDA and the USDA accept electronic records. What changes by product is the level of control required: the Preventive Controls rule (21 CFR 117) exempts those records from Part 11, the juice HACCP and low-acid canned food rules make them subject to Part 11, and the seafood HACCP and meat and poultry HACCP rules require controls that ensure the integrity of the data and signatures.",
      sections: [
        {
          heading: "Which rule applies to your plant",
          paragraphs: [
            "Before choosing how to go digital, identify which rule your records fall under:",
          ],
          bullets: [
            "Preventive Controls for Human Food (21 CFR 117): most FDA-regulated plants.",
            "Low-acid canned foods (21 CFR 113) and acidified foods (21 CFR 114).",
            "Juice HACCP (21 CFR 120).",
            "Seafood HACCP (21 CFR 123).",
            "Meat and poultry HACCP (9 CFR 417): plants under USDA Food Safety and Inspection Service (FSIS) inspection.",
          ],
        },
        {
          heading: "21 CFR 117: electronic records and Part 11",
          paragraphs: [
            "Section 117.305 says records may be originals, true copies (such as photocopies, pictures, scanned copies or microfilm) or electronic records. They must also:",
          ],
          bullets: [
            "Contain the actual values and observations from monitoring and, where applicable, verification.",
            "Be accurate, indelible and legible.",
            "Be created at the time the activity is performed.",
            "Be as detailed as needed to show how the work was done.",
            "Include the plant name (and location if needed), the date and, where appropriate, the time, the signature or initials of the person who performed the activity and, where appropriate, the product and lot code.",
          ],
        },
        {
          heading: "The Part 11 exemption",
          paragraphs: [
            "Under 117.305(g), records created to meet Part 117 that are electronic records as defined in Part 11 are exempt from Part 11. But if those same records are also required by another law or regulation, they remain subject to Part 11.",
            "Part 11 covers electronic records that are created, modified, maintained, archived, retrieved or transmitted under FDA records requirements (21 CFR 11.1(b)). Its exemptions (11.1(f) through (p)) include Part 117, along with Parts 112, 121 and 507 and certain sections and subparts of Part 1, but not Parts 113, 114, 120 or 123.",
            "Part 11 is the FDA's rule on electronic records and electronic signatures. For closed systems it requires, among other things, system validation, access limited to authorized individuals, authority checks and a secure, computer-generated, time-stamped audit trail that records who creates, modifies or deletes a record without obscuring what was there before (21 CFR 11.10).",
            "Even if your Part 117 records are exempt, the requirement that they be indelible and created at the time of the activity still stands. In practice, that means a change should not erase the original value without a trace.",
          ],
        },
        {
          heading: "Low-acid canned foods, acidified foods, juice, seafood, and meat and poultry",
          paragraphs: [
            "Low-acid canned foods: 21 CFR 113.100(h) says records may be kept electronically if they comply with Part 11. They are kept at the plant for at least 1 year from the date of manufacture and for 2 more years at the plant or another reasonably accessible location (113.100(g)).",
            "Acidified foods: 21 CFR 114.100 does not mention electronic records. Copies of the records it requires are kept for 3 years from the date of manufacture, at the plant or another reasonably accessible location.",
            "Juice HACCP: 21 CFR 120.12(g) accepts computerized records if they are kept in compliance with Part 11. Records are kept at least 1 year for perishable or refrigerated juice, and 2 years or the shelf life, whichever is longer, for frozen, preserved or shelf-stable products. Monitoring records may be moved offsite after 6 months if they can be retrieved within 24 hours.",
            "Seafood HACCP: 21 CFR 123.9(f) accepts records kept on computers if appropriate controls are in place to ensure the integrity of the electronic data and signatures; section 123.9 does not mention Part 11. Records are kept at least 1 year for refrigerated products and 2 years for frozen, preserved or shelf-stable products, and information is entered at the time it is observed.",
            "Meat and poultry HACCP (USDA FSIS): 9 CFR 417.5(d) accepts records kept on computers with appropriate controls for the integrity of the data and signatures. Each entry is made when the event occurs, with the date and time, signed or initialed by the person making it, and production records are reviewed before the product is shipped. Monitoring records are kept at least 1 year (slaughter and refrigerated products) or 2 years (frozen, preserved or shelf-stable), and may be moved offsite after 6 months if they are provided within 24 hours when FSIS requests them.",
          ],
        },
        {
          heading: "How long to keep records and where (21 CFR 117)",
          paragraphs: [
            "Part 117 records are kept for at least 2 years. They may be stored offsite if they can be retrieved within 24 hours of a request, except the food safety plan, which must stay onsite. An electronic record counts as onsite if it can be accessed from the plant (21 CFR 117.315). All of them must be promptly available for official review and copying (21 CFR 117.320).",
            "If you are SQF certified, the code also requires records to be legible, accessible, retrievable and stored securely against unauthorized access, loss or damage, for at least the product's shelf life or whatever the customer or the law requires.",
          ],
        },
        {
          heading: "Steps for the transition",
          paragraphs: [
            "These steps follow from the requirements above; adjust them to the rule that applies to you:",
          ],
          bullets: [
            "Inventory all your paper forms: monitoring, corrective actions, verification, calibration, sanitation, receiving, training.",
            "For each form, confirm the digital version captures all the data your rule requires (plant, date, time, who did it, product and lot).",
            "Decide how the person making an entry is identified: each user with their own account, not a shared password.",
            "Define what happens when someone corrects a value: the original value must stay visible.",
            "If you produce juice or low-acid canned foods, confirm the system complies with Part 11 before you drop paper.",
            "Run paper and digital in parallel for a short period and compare.",
            "Decide what to do with the paper records you already have: keep them for as long as your rule requires, on paper or as scanned true copies.",
            "Test that you can find and produce any record in under 24 hours.",
            "Update your procedures and train staff on the new way of recording.",
          ],
        },
      ],
    },
  },
];
