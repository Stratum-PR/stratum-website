
export interface Resource {
  id: string;
  slug: string;
  image: string;
  tags: string[];
  content: {
    en: {
      title: string;
      description: string;
      items: string[];
    };
    es: {
      title: string;
      description: string;
      items: string[];
    };
  };
}

export const resources: Resource[] = [
  {
    id: "data-pipeline-health",
    slug: "data-pipeline-health-check",
    image: "/img/Icon 1.png",
    tags: ["Assessment", "Data Pipeline", "Health Check"],
    content: {
      en: {
        title: "Check if you have a Healthy Data Management Pipeline",
        description: "Evaluate your organization's data pipeline health with our comprehensive checklist. Identify gaps and opportunities for improvement.",
        items: [
          "Data sources are properly documented and cataloged",
          "Data quality monitoring is in place",
          "Regular data backups and recovery procedures exist",
          "Data access controls and permissions are managed",
          "Data lineage and transformation processes are tracked",
          "Performance monitoring and alerting systems are active",
          "Data governance policies are established and followed",
          "Regular data audits and compliance checks are performed"
        ]
      },
      es: {
        title: "Verifica si tienes un Pipeline de Gestión de Datos Saludable",
        description: "Evalúa la salud del pipeline de datos de tu organización con nuestra lista de verificación integral. Identifica brechas y oportunidades de mejora.",
        items: [
          "Las fuentes de datos están debidamente documentadas y catalogadas",
          "Se tiene monitoreo de calidad de datos implementado",
          "Existen procedimientos regulares de respaldo y recuperación de datos",
          "Se gestionan los controles de acceso y permisos de datos",
          "Se rastrean los procesos de linaje y transformación de datos",
          "Los sistemas de monitoreo de rendimiento y alertas están activos",
          "Las políticas de gobernanza de datos están establecidas y seguidas",
          "Se realizan auditorías regulares de datos y verificaciones de cumplimiento"
        ]
      }
    }
  },
  {
    id: "consulting-needs-assessment",
    slug: "data-consulting-needs-assessment",
    image: "/img/Genesis.png",
    tags: ["Consulting", "Assessment", "Strategy"],
    content: {
      en: {
        title: "Data Consulting Needs Assessment",
        description: "Determine your organization's data consulting requirements and identify areas where professional guidance can drive the most value.",
        items: [
          "Current data strategy alignment with business objectives",
          "Existing analytics capabilities and skill gaps",
          "Data infrastructure scalability and performance issues",
          "Compliance and regulatory requirements assessment",
          "ROI measurement and KPI tracking effectiveness",
          "Technology stack optimization opportunities",
          "Change management and training needs evaluation",
          "Integration challenges with existing systems"
        ]
      },
      es: {
        title: "Evaluación de Necesidades de Consultoría de Datos",
        description: "Determina los requerimientos de consultoría de datos de tu organización e identifica áreas donde la orientación profesional puede generar mayor valor.",
        items: [
          "Alineación de la estrategia de datos actual con objetivos empresariales",
          "Capacidades analíticas existentes y brechas de habilidades",
          "Problemas de escalabilidad y rendimiento de la infraestructura de datos",
          "Evaluación de requisitos de cumplimiento y regulatorios",
          "Efectividad de medición de ROI y seguimiento de KPIs",
          "Oportunidades de optimización del stack tecnológico",
          "Evaluación de necesidades de gestión de cambio y capacitación",
          "Desafíos de integración con sistemas existentes"
        ]
      }
    }
  }
];

export const getAllResources = (): Resource[] => {
  return resources;
};

export const getResourceBySlug = (slug: string): Resource | undefined => {
  return resources.find(resource => resource.slug === slug);
};
