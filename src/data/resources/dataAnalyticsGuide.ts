import { Resource } from './types';

export const dataAnalyticsGuide: Resource = {
  slug: 'data-analytics-starter-guide',
  id: 1,
  metadata: {
    title: {
      en: 'Data Analytics Starter Guide - From Raw Data to Insights',
      es: 'Guía de Inicio de Análisis de Datos - De Datos Crudos a Insights'
    },
    description: {
      en: 'A comprehensive guide for businesses starting their data analytics journey. Learn the fundamentals, best practices, and practical steps to leverage your data.',
      es: 'Una guía completa para empresas que comienzan su viaje de análisis de datos. Aprenda los fundamentos, mejores prácticas y pasos prácticos para aprovechar sus datos.'
    },
    keywords: {
      en: 'data analytics, business intelligence, data visualization, beginner guide, data insights',
      es: 'análisis de datos, inteligencia empresarial, visualización de datos, guía principiante, insights de datos'
    }
  },
  content: {
    en: {
      title: 'Data Analytics Starter Guide',
      summary: 'Your comprehensive introduction to business data analytics',
      description: 'Learn how to start your data analytics journey with this practical guide. Covers data collection, cleaning, analysis, and visualization fundamentals.',
      type: 'guide',
      downloadUrl: '/resources/data-analytics-guide-en.pdf'
    },
    es: {
      title: 'Guía de Inicio de Análisis de Datos',
      summary: 'Su introducción completa al análisis de datos empresariales',
      description: 'Aprenda cómo comenzar su viaje de análisis de datos con esta guía práctica. Cubre fundamentos de recolección, limpieza, análisis y visualización de datos.',
      type: 'guide',
      downloadUrl: '/data-analytics-guide-es.pdf'
    }
  },
  tags: ['Analytics', 'Business Intelligence', 'Data Visualization'],
  icon: 'FileText',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
  featured: true,
  publishDate: '2024-03-15'
}; 