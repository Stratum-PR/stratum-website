
import { Resource } from './types';

export const processAutomationWorksheet: Resource = {
  slug: 'process-automation-worksheet',
  id: 3,
  metadata: {
    title: {
      en: 'Process Automation Worksheet - ROI Calculator and Implementation Planner',
      es: 'Hoja de Trabajo de Automatización de Procesos - Calculadora ROI y Planificador'
    },
    description: {
      en: 'Interactive worksheet for identifying automation opportunities, calculating ROI, and planning implementation. Includes process inventory, risk assessment, and success metrics tracking.',
      es: 'Hoja de trabajo interactiva para identificar oportunidades de automatización, calcular ROI y planificar implementación. Incluye inventario de procesos, evaluación de riesgos y seguimiento de métricas de éxito.'
    },
    keywords: {
      en: 'process automation, ROI calculator, business process improvement, automation planning, workflow optimization',
      es: 'automatización procesos, calculadora ROI, mejora procesos empresariales, planificación automatización, optimización flujo trabajo'
    }
  },
  content: {
    en: {
      title: 'Process Automation Worksheet',
      summary: 'Strategic planning tool with ROI calculator, risk assessment matrix, and implementation roadmap for business process automation.',
      description: 'Systematically identify and prioritize your automation opportunities with this comprehensive worksheet. Features process inventory templates, ROI calculations, risk assessment matrices, and implementation planning tools to ensure successful automation projects.',
      type: 'worksheet',
      downloadUrl: '/resources/process-automation-worksheet.md'
    },
    es: {
      title: 'Hoja de Trabajo de Automatización de Procesos',
      summary: 'Herramienta de planificación estratégica con calculadora ROI, matriz de evaluación de riesgos y hoja de ruta de implementación para automatización de procesos empresariales.',
      description: 'Identifica y prioriza sistemáticamente tus oportunidades de automatización con esta hoja de trabajo integral. Incluye plantillas de inventario de procesos, cálculos de ROI, matrices de evaluación de riesgos y herramientas de planificación de implementación para asegurar proyectos de automatización exitosos.',
      type: 'worksheet',
      downloadUrl: '/resources/process-automation-worksheet.md'
    }
  },
  tags: ['Process Automation', 'ROI', 'Planning', 'Workflow'],
  icon: 'Settings',
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
  featured: false,
  publishDate: '2024-11-10'
};
