/**
 * Long-form compliance guides (Spanish) for small and mid-size food manufacturers in Puerto Rico.
 *
 * Same rules as compliance-faq.ts: every claim comes from the linked official source, dates are
 * stated exactly as the source states them, no invented figures, customers or certifications,
 * and no claims about what Stratum's software does. Anything we could not verify against a
 * primary source lives in `todos`, never in the body. Sources checked November 11, 2026.
 * Re-check the FSMA 204 compliance date and the SQF Edition 10 audit start date before publishing.
 *
 * The page template adds the CTA; do not add one here.
 */

export interface GuideSource { label: string; url: string }
export interface GuideSection { heading: string; paragraphs: string[]; bullets?: string[] }
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
  cfr1_1305: { label: "21 CFR 1.1305 (exenciones)", url: "https://www.law.cornell.edu/cfr/text/21/1.1305" },
  cfr1_1340: { label: "21 CFR 1.1340 (envío)", url: "https://www.law.cornell.edu/cfr/text/21/1.1340" },
  cfr1_1345: { label: "21 CFR 1.1345 (recibo)", url: "https://www.law.cornell.edu/cfr/text/21/1.1345" },
  cfr1_1350: { label: "21 CFR 1.1350 (transformación)", url: "https://www.law.cornell.edu/cfr/text/21/1.1350" },
  cfr1_1455: { label: "21 CFR 1.1455 (formato, 24 horas y retención)", url: "https://www.law.cornell.edu/cfr/text/21/1.1455" },
  // SQF
  sqfCode: { label: "SQFI: Food Safety Code, Food Manufacturing", url: "https://www.sqfi.com/the-sqf-code/choose-your-code/library-of-codes/food-manufacturing" },
  sqfEd9Pdf: { label: "SQFI: Food Safety Code: Food Manufacturing, Edición 9 (PDF)", url: "https://www.sqfi.com/docs/sqfilibraries/code-documents/edition-9/code-pdfs/20227fmin_foodmanufacturing_v3-2-final-w-links.pdf?sfvrsn=7f70c75a_8" },
  sqfWhich: { label: "SQFI: Which Code Edition Should I Use?", url: "https://www.sqfi.com/the-sqf-code/comply-with-the-code/which-code-edition-should-i-use" },
  sqfFaq: { label: "SQFI: Edition 10 FAQ", url: "https://www.sqfi.com/the-sqf-code/comply-with-the-code/edition-10-faq" },
  sqfEd10Blog: { label: "SQFI (2 de marzo de 2026): SQF Edition 10 is here", url: "https://www.sqfi.com/news/blog/view/sqfi-blog/2026/03/02/sqf-edition-10-is-here-and-it-starts-your-digital-experience" },
  // HACCP y registros electrónicos
  cfr11_10: { label: "21 CFR 11.10 (controles para sistemas cerrados)", url: "https://www.law.cornell.edu/cfr/text/21/11.10" },
  cfr120_12: { label: "21 CFR 120.12 (HACCP de jugos: registros)", url: "https://www.law.cornell.edu/cfr/text/21/120.12" },
  cfr123_9: { label: "21 CFR 123.9 (HACCP de pescados y mariscos: registros)", url: "https://www.law.cornell.edu/cfr/text/21/123.9" },
  cfr9_417_5: { label: "9 CFR 417.5 (USDA FSIS: registros HACCP)", url: "https://www.law.cornell.edu/cfr/text/9/417.5" },
} satisfies Record<string, GuideSource>;

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------------------------------------
  {
    slug: 'inspeccion-fda-planta-alimentos-puerto-rico',
    status: 'draft',
    title: "Cómo prepararse para una inspección de la FDA en una planta de alimentos en Puerto Rico",
    metaTitle: "Inspección de la FDA en Puerto Rico | Stratum PR",
    description: "Qué pasa cuando llega la FDA a tu planta en Puerto Rico: Formulario 482, registros que pueden pedir, el Formulario 483 y cómo responder en 15 días laborables.",
    lead: "La FDA inspecciona plantas de alimentos en Puerto Rico, y en general no avisa antes de llegar. Prepararse es tener a alguien designado para acompañar al investigador, tener los registros que exige 21 CFR 117 completos y fáciles de encontrar, y saber qué hacer con el Formulario FDA 483 al final. Si recibes un 483, la FDA generalmente da 15 días laborables para responder por escrito antes de decidir si envía una carta de advertencia.",
    sections: [
      {
        heading: "¿Quién inspecciona las plantas de alimentos en Puerto Rico?",
        paragraphs: [
          "La Oficina de Inspecciones e Investigaciones de la FDA (OII) hace las inspecciones de campo. En su documento de límites de inspección (actualizado en septiembre de 2024), la FDA ubica a Puerto Rico en la División Este 4 de su Oficina de Inspección de Alimentos para Consumo Humano (OHFI), junto con Florida y las Islas Vírgenes.",
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
      SRC.oiiBoundaries, SRC.mouDaco, SRC.cfr117_190, SRC.cfr117_315, SRC.cfr117_320,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): confirmar en fda.gov la dirección y el teléfono vigentes de la oficina de la FDA en San Juan para inspecciones de alimentos (solo se verificó la división OHFI Este 4 y el acuerdo con DACO).",
      "TODO(Jovaniel): confirmar si DACO o el Departamento de Salud de Puerto Rico hacen inspecciones de alimentos por contrato con la FDA en plantas de Puerto Rico; no se encontró fuente primaria.",
      "TODO(Jovaniel): el documento de límites de OII es de septiembre de 2024; confirmar que no haya una versión más reciente antes de publicar.",
    ],
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'fsma-204-trazabilidad-fabricantes-pequenos-puerto-rico',
    status: 'draft',
    title: "FSMA 204 (trazabilidad) para fabricantes pequeños en Puerto Rico",
    metaTitle: "FSMA 204 para fabricantes en Puerto Rico | Stratum PR",
    description: "Qué exige la regla de trazabilidad FSMA 204 a fabricantes pequeños en Puerto Rico: alimentos cubiertos, CTE, KDE, código de lote, plan, exenciones y fechas.",
    lead: "La regla de trazabilidad de la FDA (FSMA 204) exige registros adicionales a quien fabrica, procesa, empaca o almacena alimentos de la Lista de Trazabilidad, también en Puerto Rico. Si usas o produces uno de esos alimentos, tendrás que registrar datos clave en cada recibo, transformación y envío, asignar códigos de lote de trazabilidad, tener un plan de trazabilidad y entregar los registros en 24 horas. Por orden del Congreso, la FDA no hará cumplir la regla antes del 20 de julio de 2028; la extensión formal de la fecha sigue siendo una propuesta.",
    sections: [
      {
        heading: "¿Cuándo hay que cumplir?",
        paragraphs: [
          "La fecha de cumplimiento original era el 20 de enero de 2026. El 7 de agosto de 2025 la FDA publicó en el Federal Register una propuesta para extenderla 30 meses, hasta el 20 de julio de 2028, y aclaró que la extensión no cambia los requisitos de la regla.",
          "Después, la ley de asignaciones continuas para el año fiscal 2026 ordenó a la FDA no hacer cumplir la regla antes del 20 de julio de 2028, y la FDA dice que cumplirá esa directriz. Hasta el 11 de noviembre de 2026 no encontramos una regla final que adopte la nueva fecha: un aviso de la FDA en el Federal Register del 9 de octubre de 2026 todavía describe la extensión como propuesta. Los requisitos no cambian, así que el tiempo extra sirve para prepararse.",
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
          "La regla exige un plan escrito que describa cómo llevas los registros, cómo identificas los alimentos de la lista que manejas, cómo asignas los códigos de lote (si aplica) y una persona de contacto. Si los registros están en varios sistemas, el plan debe decir su formato y dónde están (21 CFR 1.1455).",
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
      SRC.ftr, SRC.ftl, SRC.ftrDate, SRC.ftrMeeting2026, SRC.cfr1_1305, SRC.cfr1_1340, SRC.cfr1_1345,
      SRC.cfr1_1350, SRC.cfr1_1455,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): antes de publicar, volver a buscar en federalregister.gov (expediente FDA-2014-N-0053) si la FDA publicó la regla final que mueve la fecha al 20 de julio de 2028. Al 11 de noviembre de 2026 solo existe la propuesta del 7 de agosto de 2025 y la directriz del Congreso; federalregister.gov bloqueó la búsqueda automatizada, se verificó en govinfo.gov.",
      "TODO(Jovaniel): la página de la FDA sobre la regla todavía dice en una sección que la fecha de cumplimiento es el 20 de enero de 2026; confirmar que no haya cambiado antes de publicar.",
      "TODO(Jovaniel): confirmar el texto exacto de la sección 1.1315 (plan de trazabilidad), incluido el mapa de finca para productores; aquí se resumió desde la página de la FDA.",
      "TODO(Jovaniel): la FDA anunció un borrador de política de discreción para ciertos minoristas y restaurantes pequeños; no se incluyó porque no aplica a fabricantes y no se abrió el documento.",
    ],
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'lista-cotejo-auditoria-sqf-puerto-rico',
    status: 'draft',
    title: "Lista de cotejo para auditoría SQF en Puerto Rico (Edición 9 / transición a Edición 10)",
    metaTitle: "Lista de cotejo para auditoría SQF | Stratum PR",
    description: "Lista de cotejo práctica para una auditoría SQF de manufactura de alimentos, organizada por las secciones de la Edición 9 y lo que cambia en la Edición 10.",
    lead: "Hoy las auditorías SQF de manufactura de alimentos se hacen con la Edición 9. SQFI publicó la Edición 10 en marzo de 2026 y espera que sus auditorías empiecen no antes del 2 de enero de 2027, sujeto al reconocimiento de GFSI. Esta lista sigue las secciones del código de la Edición 9 (Módulo 2, elementos del sistema, y Módulo 11, buenas prácticas de manufactura) para que revises tu planta antes del auditor.",
    sections: [
      {
        heading: "¿Edición 9 o Edición 10?",
        paragraphs: [
          "SQFI anunció el 2 de marzo de 2026 que la Edición 10 del código ya está disponible. Según SQFI, las auditorías bajo la Edición 10 se esperan para el 2 de enero de 2027, no empezarán antes de esa fecha, y la fecha depende del proceso de reconocimiento de GFSI y puede moverse. Hasta que GFSI reconozca la Edición 10, la Edición 9 es el único programa SQF reconocido por GFSI.",
          "Si tu auditoría ocurre antes de la fecha obligatoria de la Edición 10, te auditan con la Edición 9, y los organismos de certificación no mezclan requisitos de las dos ediciones en una misma auditoría. SQFI dice que no hace falta cambiar la numeración de tus políticas a la de la Edición 10, aunque quizás tengas que revisarlas, y que la Edición 10 añade que todas las plantas tengan un plan de evaluación de la cultura de inocuidad.",
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
    ],
    sources: [SRC.sqfEd9Pdf, SRC.sqfCode, SRC.sqfWhich, SRC.sqfFaq, SRC.sqfEd10Blog],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): los números de sección son del PDF de la Edición 9 en sqfi.com (versión con enlaces, copyright 2020). Confirmar con el organismo de certificación que no hay enmiendas a la Edición 9 que cambien estos números o requisitos.",
      "TODO(Jovaniel): confirmar la numeración y los plazos de la Edición 10 (por ejemplo, el plazo para cerrar no conformidades, que en compliance-faq.ts aparece como 40 días calendario); la página de ayuda de SQFI sobre acciones correctivas devolvió 404 el 11 de noviembre de 2026 y no se pudo volver a verificar.",
      "TODO(Jovaniel): confirmar en sqfi.com si la fecha de inicio de auditorías de la Edición 10 sigue siendo el 2 de enero de 2027 (una página de SQFI la daba como \"no antes del 1 de enero de 2027\" según un resultado de búsqueda; no se abrió).",
      "TODO(Jovaniel): confirmar qué categoría de sector alimentario (FSC) y qué módulo aplica a cada tipo de planta en Puerto Rico; esta lista asume manufactura de alimentos (Módulo 11).",
    ],
  },

  // ---------------------------------------------------------------------------------------------
  {
    slug: 'registros-haccp-papel-a-digital',
    status: 'draft',
    title: "Cómo pasar de registros HACCP en papel a digitales",
    metaTitle: "Registros HACCP: de papel a digital | Stratum PR",
    description: "Qué dicen la FDA y el USDA sobre registros HACCP electrónicos, cuándo aplica la Parte 11 y cómo pasar de papel a digital sin perder registros válidos.",
    lead: "Sí puedes llevar tus registros HACCP y de controles preventivos en formato digital: la FDA y el USDA aceptan registros electrónicos. Lo que cambia según tu producto es el nivel de control que te exigen: la regla de Controles Preventivos (21 CFR 117) exime esos registros de la Parte 11, la regla de HACCP de jugos los somete a la Parte 11, y las de pescados y mariscos y de carnes y aves piden controles que aseguren la integridad de los datos y las firmas.",
    sections: [
      {
        heading: "Qué regla aplica a tu planta",
        paragraphs: [
          "Antes de escoger cómo digitalizar, identifica bajo qué regla están tus registros:",
        ],
        bullets: [
          "Controles Preventivos para alimentos de consumo humano (21 CFR 117): la mayoría de las plantas reguladas por la FDA.",
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
          "La Parte 11 es la regla de la FDA sobre registros y firmas electrónicas. Para sistemas cerrados pide, entre otras cosas, validación del sistema, acceso limitado a personas autorizadas, verificación de autoridad y un registro de auditoría seguro, generado por la computadora y con fecha y hora, que guarde quién crea, cambia o borra un registro sin ocultar lo que había antes (21 CFR 11.10).",
          "Aunque tus registros de la Parte 117 estén exentos, la exigencia de que sean indelebles y se hagan en el momento sigue en pie. En la práctica, eso significa que un cambio no debería borrar el valor original sin dejar rastro.",
        ],
      },
      {
        heading: "Jugos, pescados y mariscos, y carnes y aves",
        paragraphs: [
          "HACCP de jugos: 21 CFR 120.12(g) acepta registros computarizados si se mantienen conforme a la Parte 11. Los registros se guardan por lo menos 1 año para jugos perecederos o refrigerados, y 2 años o la vida útil, lo que sea mayor, para productos congelados, preservados o estables. Los registros de monitoreo pueden ir fuera de la planta después de 6 meses si se pueden traer en 24 horas.",
          "HACCP de pescados y mariscos: 21 CFR 123.9(f) acepta registros en computadora si hay controles apropiados para asegurar la integridad de los datos electrónicos y las firmas. Se guardan por lo menos 1 año para productos refrigerados y 2 años para congelados, preservados o estables, y la información se anota en el momento en que se observa.",
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
          "Si produces jugo, confirma que el sistema cumple la Parte 11 antes de dejar el papel.",
          "Corre papel y digital en paralelo por un período corto y compara.",
          "Decide qué hacer con los registros en papel que ya tienes: guárdalos el tiempo que exige tu regla, en papel o como copias fieles escaneadas.",
          "Prueba que puedes encontrar y entregar cualquier registro en menos de 24 horas.",
          "Actualiza tus procedimientos y capacita al personal en la nueva forma de registrar.",
        ],
      },
    ],
    sources: [
      SRC.cfr117_305, SRC.cfr117_315, SRC.cfr117_320, SRC.cfr11_10, SRC.cfr120_12, SRC.cfr123_9,
      SRC.cfr9_417_5, SRC.sqfEd9Pdf,
    ],
    verifiedOn: '11 de noviembre de 2026',
    todos: [
      "TODO(Jovaniel): confirmar con un asesor regulatorio si algún registro de la Parte 117 de nuestros clientes también lo exige otra regulación (por ejemplo, alimentos acidificados o enlatados de baja acidez, 21 CFR 113/114), lo que lo dejaría sujeto a la Parte 11; no se revisaron esas partes.",
      "TODO(Jovaniel): confirmar si FSIS tiene guías publicadas sobre registros electrónicos en plantas de carne y aves; solo se verificó el texto de 9 CFR 417.5.",
      "TODO(Jovaniel): confirmar si 21 CFR 123.9 dice algo sobre la Parte 11 en otro párrafo; la versión revisada solo menciona controles apropiados en 123.9(f).",
    ],
  },
];
