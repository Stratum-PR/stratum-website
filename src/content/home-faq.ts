/**
 * "About Stratum PR" questions, shown as the last group on /preguntas (see compliance-faq.ts). Keep answers factual:
 * AI assistants quote them verbatim, so no invented figures or client results.
 */

export interface BilingualFaq {
  es: { question: string; answer: string };
  en: { question: string; answer: string };
}

export const HOME_FAQ: BilingualFaq[] = [
  {
    es: {
      question: '¿Qué es Stratum PR?',
      answer:
        'Stratum PR es una compañía puertorriqueña de datos y tecnología, con sede en Trujillo Alto. Ayudamos a los fabricantes de alimentos de Puerto Rico a reemplazar los registros en papel y las hojas de cálculo con sistemas digitales para cumplimiento, inventario y trazabilidad.',
    },
    en: {
      question: 'What is Stratum PR?',
      answer:
        'Stratum PR is a Puerto Rican data and technology company based in Trujillo Alto. We help Puerto Rico food manufacturers replace paper logs and spreadsheets with digital systems for compliance, inventory and traceability.',
    },
  },
  {
    es: {
      question: '¿Para quién es Stratum PR?',
      answer:
        'Para fabricantes y procesadores de alimentos en Puerto Rico, sobre todo plantas pequeñas, medianas y negocios familiares que no tienen un departamento de TI propio.',
    },
    en: {
      question: 'Who is Stratum PR for?',
      answer:
        'Food manufacturers and processors in Puerto Rico, especially small and mid-size plants and family businesses that do not have their own IT department.',
    },
  },
  {
    es: {
      question: '¿Cómo ayuda Stratum PR con las inspecciones de la FDA y la ley FSMA?',
      answer:
        'Digitalizamos los registros que piden las inspecciones y auditorías: temperaturas, limpieza, controles preventivos y trazabilidad por lote. Así la documentación está al día todos los días y se encuentra en segundos, en lugar de prepararla a última hora.',
    },
    en: {
      question: 'How does Stratum PR help with FDA inspections and FSMA?',
      answer:
        'We digitize the records that inspections and audits ask for: temperatures, sanitation, preventive controls and lot traceability. Documentation stays current every day and can be found in seconds instead of being assembled at the last minute.',
    },
  },
  {
    es: {
      question: '¿Mi equipo tiene que cambiar cómo trabaja?',
      answer:
        'Muy poco. Diseñamos el sistema alrededor de cómo tu equipo ya trabaja, con una curva de aprendizaje baja y sin funciones que no vas a usar.',
    },
    en: {
      question: 'Does my team have to change how it works?',
      answer:
        'Very little. We design the system around how your team already works, with a low learning curve and no features you will not use.',
    },
  },
  {
    es: {
      question: '¿Cuánto cuesta y cómo empiezo?',
      answer:
        'Depende del tamaño y las necesidades de tu planta. Empiezas con una conversación gratis de 30 minutos, en español o inglés. Luego ves una demo funcionando con tus procesos antes de comprometerte a pagar.',
    },
    en: {
      question: 'How much does it cost and how do I start?',
      answer:
        'It depends on the size and needs of your plant. You start with a free 30-minute conversation, in Spanish or English. Then you see a working demo with your own processes before you commit to paying.',
    },
  },
  {
    es: {
      question: '¿Qué es Alertas PR?',
      answer:
        "Alertas PR es un portal gratuito y público de Stratum PR que reúne en español los retiros de alimentos de la FDA y el USDA y los brotes que investiga el CDC, con un filtro para productos vendidos en Puerto Rico. Se puede usar sin registrarse, y hay alertas por email opcionales.",
    },
    en: {
      question: 'What is Alertas PR?',
      answer:
        "Alertas PR is a free public portal by Stratum PR that collects, in Spanish, FDA and USDA food recalls and CDC outbreak investigations, with a filter for products sold in Puerto Rico. No sign-up is needed to use it, and optional email alerts are available.",
    },
  },
];
