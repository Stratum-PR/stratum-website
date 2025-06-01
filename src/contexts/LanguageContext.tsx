
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
        
        // About page
        'about.hero.title': 'About Stratum PR',
        'about.hero.description': 'Founded in 2025, Stratum PR emerged from a simple observation: most organizations have access to more data than ever before, yet struggle to make better decisions. We bridge this gap by architecting solutions that transform complex information into strategic advantage.',
        'about.mission.title': 'Our Mission',
        'about.mission.description1': 'We exist to democratize advanced analytics and AI capabilities for businesses of all sizes. By combining deep technical expertise with strategic business acumen, we help organizations build the foundation for sustained competitive advantage in an increasingly data-driven world.',
        'about.mission.description2': 'Our approach goes beyond traditional consulting. We don\'t just provide recommendations—we architect and implement complete solutions that integrate seamlessly with your existing operations while positioning you for future growth.',
        'about.values.technical': 'Technical Excellence',
        'about.values.technical.desc': 'We maintain the highest standards in analytical rigor and technical implementation.',
        'about.values.strategic': 'Strategic Clarity',
        'about.values.strategic.desc': 'Every solution is designed with clear business outcomes and measurable impact.',
        'about.values.partnership': 'Client Partnership',
        'about.values.partnership.desc': 'We work as an extension of your team, not just another vendor.',
        'about.values.innovation': 'Innovation Focus',
        'about.values.innovation.desc': 'Continuously exploring emerging technologies to deliver competitive advantages.',
        
        // Contact page
        'contact.hero.title': 'Contact Us',
        'contact.hero.description': 'Ready to transform your business with strategic analytics? Let\'s start the conversation about your goals and how we can help achieve them.',
        'contact.info.title': 'Get in Touch',
        'contact.info.description': 'Multiple ways to reach our team',
        'contact.info.email': 'Email',
        'contact.info.email.desc': 'Send us a message anytime',
        'contact.info.linkedin': 'LinkedIn',
        'contact.info.linkedin.desc': 'Connect with our team',
        'contact.form.name': 'Full Name',
        'contact.form.email': 'Email Address',
        'contact.form.company': 'Company',
        'contact.form.message': 'Tell us about your project',
        'contact.form.submit': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.success': 'Thank you for your message!',
        'contact.form.success.desc': 'We\'ll get back to you within 24 hours.',
        
        // Services page
        'services.hero.title': 'Our Services',
        'services.hero.description': 'Comprehensive analytics and consulting solutions designed to transform your business operations and drive strategic growth.',
        
        // 404 page
        'notfound.title': '404',
        'notfound.description': 'Oops! Page not found',
        'notfound.home': 'Return to Home',
        
        // Footer
        'footer.tagline': 'The Architecture of Better Decisions. We specialize in analytics and consulting solutions that drive strategic business outcomes.',
        'footer.quicklinks': 'Quick Links',
        'footer.contact': 'Contact',
        'footer.copyright': 'All rights reserved.',
        
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
        
        // About page
        'about.hero.title': 'Acerca de Stratum PR',
        'about.hero.description': 'Fundada en 2025, Stratum PR surgió de una observación simple: la mayoría de las organizaciones tienen acceso a más datos que nunca, pero luchan por tomar mejores decisiones. Cerramos esta brecha arquitectando soluciones que transforman información compleja en ventaja estratégica.',
        'about.mission.title': 'Nuestra Misión',
        'about.mission.description1': 'Existimos para democratizar las capacidades avanzadas de análisis e IA para empresas de todos los tamaños. Al combinar experiencia técnica profunda con conocimiento estratégico de negocios, ayudamos a las organizaciones a construir la base para una ventaja competitiva sostenida en un mundo cada vez más basado en datos.',
        'about.mission.description2': 'Nuestro enfoque va más allá de la consultoría tradicional. No solo proporcionamos recomendaciones—arquitectamos e implementamos soluciones completas que se integran perfectamente con sus operaciones existentes mientras los posicionamos para el crecimiento futuro.',
        'about.values.technical': 'Excelencia Técnica',
        'about.values.technical.desc': 'Mantenemos los más altos estándares en rigor analítico e implementación técnica.',
        'about.values.strategic': 'Claridad Estratégica',
        'about.values.strategic.desc': 'Cada solución está diseñada con resultados de negocio claros e impacto medible.',
        'about.values.partnership': 'Asociación con Clientes',
        'about.values.partnership.desc': 'Trabajamos como una extensión de su equipo, no solo otro proveedor.',
        'about.values.innovation': 'Enfoque en Innovación',
        'about.values.innovation.desc': 'Exploramos continuamente tecnologías emergentes para entregar ventajas competitivas.',
        
        // Contact page
        'contact.hero.title': 'Contáctanos',
        'contact.hero.description': '¿Listo para transformar tu negocio con análisis estratégicos? Comencemos la conversación sobre tus objetivos y cómo podemos ayudarte a alcanzarlos.',
        'contact.info.title': 'Ponte en Contacto',
        'contact.info.description': 'Múltiples formas de contactar a nuestro equipo',
        'contact.info.email': 'Correo Electrónico',
        'contact.info.email.desc': 'Envíanos un mensaje en cualquier momento',
        'contact.info.linkedin': 'LinkedIn',
        'contact.info.linkedin.desc': 'Conéctate con nuestro equipo',
        'contact.form.name': 'Nombre Completo',
        'contact.form.email': 'Dirección de Correo',
        'contact.form.company': 'Empresa',
        'contact.form.message': 'Cuéntanos sobre tu proyecto',
        'contact.form.submit': 'Enviar Mensaje',
        'contact.form.sending': 'Enviando...',
        'contact.form.success': '¡Gracias por tu mensaje!',
        'contact.form.success.desc': 'Te responderemos dentro de 24 horas.',
        
        // Services page
        'services.hero.title': 'Nuestros Servicios',
        'services.hero.description': 'Soluciones integrales de análisis y consultoría diseñadas para transformar las operaciones de tu negocio e impulsar el crecimiento estratégico.',
        
        // 404 page
        'notfound.title': '404',
        'notfound.description': '¡Ups! Página no encontrada',
        'notfound.home': 'Volver al Inicio',
        
        // Footer
        'footer.tagline': 'La Arquitectura de Mejores Decisiones. Nos especializamos en soluciones de análisis y consultoría que impulsan resultados estratégicos de negocio.',
        'footer.quicklinks': 'Enlaces Rápidos',
        'footer.contact': 'Contacto',
        'footer.copyright': 'Todos los derechos reservados.',
        
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
