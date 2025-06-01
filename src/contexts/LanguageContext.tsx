
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  // Simple translation function - can be expanded with a proper translation library
  const t = (key: string): string => {
    const translations: Record<Language, Record<string, string>> = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.schedule': 'Schedule Consultation',
        
        // Home page
        'home.hero.title': 'The Architecture of',
        'home.hero.subtitle': 'Better Decisions',
        'home.hero.description': 'We build the foundation for strategic excellence through advanced analytics, AI solutions, and data-driven consulting that transforms how businesses operate in Puerto Rico and beyond.',
        'home.hero.cta.primary': 'Schedule Free Consultation',
        'home.hero.cta.secondary': 'Explore Services',
        
        // Stats
        'stats.experience': 'Years of Experience',
        'stats.satisfaction': 'Client Satisfaction',
        'stats.projects': 'Project Solutions Delivered',
        'stats.team': 'Island Based Team',
        'stats.fortune': 'Built by veterans of Fortune Top 5 Companies',
        
        // Features
        'features.title': 'Strategic Solutions for Data Analytics Puerto Rico',
        'features.description': 'We architect comprehensive solutions that bridge the gap between complex data and strategic business outcomes through AI business automation and CRM implementation consulting.',
        'features.bigdata.title': 'Big Data Analytics',
        'features.bigdata.description': 'Transform complex data into actionable insights',
        'features.ai.title': 'AI & Decision Intelligence',
        'features.ai.description': 'Intelligent automation for strategic decisions',
        'features.crm.title': 'CRM Optimization',
        'features.crm.description': 'Streamline customer relationships and processes',
        'features.predictive.title': 'Predictive Modeling',
        'features.predictive.description': 'Forecast trends and optimize outcomes',
        
        // CTA
        'cta.title': 'Ready to Transform Your Business?',
        'cta.description': 'Let\'s discuss how Stratum PR can architect better decisions for your organization through data analytics Puerto Rico expertise.',
        'cta.button': 'Get Started Today',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.submit': 'Submit',
        'common.cancel': 'Cancel',
      },
      es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.services': 'Servicios',
        'nav.contact': 'Contacto',
        'nav.schedule': 'Programar Consulta',
        
        // Home page
        'home.hero.title': 'La Arquitectura de',
        'home.hero.subtitle': 'Mejores Decisiones',
        'home.hero.description': 'Construimos la base para la excelencia estratégica a través de análisis avanzados, soluciones de IA y consultoría basada en datos que transforma cómo operan las empresas en Puerto Rico y más allá.',
        'home.hero.cta.primary': 'Programar Consulta Gratuita',
        'home.hero.cta.secondary': 'Explorar Servicios',
        
        // Stats
        'stats.experience': 'Años de Experiencia',
        'stats.satisfaction': 'Satisfacción del Cliente',
        'stats.projects': 'Soluciones de Proyectos Entregadas',
        'stats.team': 'Equipo Basado en la Isla',
        'stats.fortune': 'Construido por veteranos de las 5 mejores empresas Fortune',
        
        // Features
        'features.title': 'Soluciones Estratégicas para Análisis de Datos Puerto Rico',
        'features.description': 'Arquitectamos soluciones integrales que conectan datos complejos con resultados estratégicos de negocio a través de automatización empresarial con IA y consultoría de implementación de CRM.',
        'features.bigdata.title': 'Análisis de Big Data',
        'features.bigdata.description': 'Transformar datos complejos en conocimientos accionables',
        'features.ai.title': 'IA e Inteligencia de Decisiones',
        'features.ai.description': 'Automatización inteligente para decisiones estratégicas',
        'features.crm.title': 'Optimización de CRM',
        'features.crm.description': 'Optimizar relaciones con clientes y procesos',
        'features.predictive.title': 'Modelado Predictivo',
        'features.predictive.description': 'Pronosticar tendencias y optimizar resultados',
        
        // CTA
        'cta.title': '¿Listo para Transformar tu Negocio?',
        'cta.description': 'Hablemos sobre cómo Stratum PR puede arquitectar mejores decisiones para tu organización a través de nuestra experiencia en análisis de datos Puerto Rico.',
        'cta.button': 'Comenzar Hoy',
        
        // Common
        'common.loading': 'Cargando...',
        'common.error': 'Error',
        'common.submit': 'Enviar',
        'common.cancel': 'Cancelar',
      }
    };

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
