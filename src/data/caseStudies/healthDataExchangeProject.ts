
export const healthDataExchangeProject = {
  slug: 'island-health-data-exchange',
  id: 3,
  metadata: {
    title: {
      en: 'Island-Wide Health Data Exchange Infrastructure - Public Health Data Project',
      es: 'Infraestructura de Intercambio de Datos de Salud a Nivel Isla - Proyecto de Datos de Salud Pública'
    },
    description: {
      en: 'How Stratum PR helped the Puerto Rico Department of Health automate and unify its COVID-19 lab reporting, case tracking, and public health response systems.',
      es: 'Cómo Stratum PR ayudó al Departamento de Salud de Puerto Rico a automatizar y unificar sus sistemas de reporte de laboratorio, seguimiento de casos y respuesta de salud pública para COVID-19.'
    },
    keywords: {
      en: 'public health, data exchange, pandemic response, government data automation, Puerto Rico health system',
      es: 'salud pública, intercambio de datos, respuesta a pandemia, automatización de datos gubernamentales, sistema de salud de Puerto Rico'
    }
  },
  content: {
    en: {
      title: 'Island-Wide Health Data Exchange Infrastructure',
      client: 'Puerto Rico Department of Health',
      sector: 'Public Health',
      summary: 'Designed a real-time data pipeline integrating lab results, case management, and contact tracing across the island.',
      challenge: 'COVID-19 exposed deep fragmentation in the health department\'s data systems. Delays, duplication, and data silos impaired outbreak response and resource allocation.',
      solution: 'Stratum designed and implemented a centralized cloud system that connected all laboratories, hospitals, and contact tracing platforms with automated validation, deduplication, and dashboard-ready reporting.',
      results: [
        'Case reporting delay reduced by 90%',
        'Real-time dashboards fed from over 100 integrated data sources',
        'Automated tracking of outbreak clusters and public health actions',
        'System expanded to include flu and RSV surveillance',
        'Recognized as a core data infrastructure by PRDOH leadership'
      ],
      technologies: ['Python', 'SQL Server', 'Power BI', 'Azure', 'Custom APIs'],
      timeline: '5 months',
      teamSize: '6 specialists'
    },
    es: {
      title: 'Infraestructura de Intercambio de Datos de Salud a Nivel Isla',
      client: 'Departamento de Salud de Puerto Rico',
      sector: 'Salud Pública',
      summary: 'Diseñamos una canalización de datos en tiempo real que integra resultados de laboratorio, gestión de casos y rastreo de contactos en toda la isla.',
      challenge: 'La pandemia de COVID-19 reveló una fragmentación crítica en los sistemas de datos de salud del gobierno. Retrasos, duplicación y silos de información afectaban la respuesta efectiva.',
      solution: 'Stratum diseñó e implementó un sistema centralizado en la nube que conecta laboratorios, hospitales y plataformas de rastreo con validación automatizada y paneles en tiempo real.',
      results: [
        'Reducción del 90% en el retraso del reporte de casos',
        'Paneles actualizados en tiempo real desde más de 100 fuentes',
        'Seguimiento automatizado de brotes y respuestas de salud pública',
        'Sistema ampliado para incluir vigilancia de influenza y RSV',
        'Reconocido como infraestructura clave por el DS de Puerto Rico'
      ],
      technologies: ['Python', 'SQL Server', 'Power BI', 'Azure', 'APIs Personalizadas'],
      timeline: '5 meses',
      teamSize: '6 especialistas'
    }
  },
  tags: ['Public Health', 'Data Integration', 'Automation'],
  icon: 'ActivitySquare',
  image: 'https://images.unsplash.com/photo-1576091160551-4d3cea5e1e03?w=800&h=600&fit=crop&crop=center',
  featured: true,
  publishDate: '2024-12-10'
};
