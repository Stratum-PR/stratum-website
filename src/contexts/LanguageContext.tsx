
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

  // Load language from localStorage on mount, defaulting to English
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    } else {
      // If no saved language or invalid value, default to English
      setLanguageState('en');
      localStorage.setItem('preferred-language', 'en');
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
        'nav.casestudies': 'Case Studies',
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
        
        // Services Grid
        'services.grid.title': 'Strategic Solutions for Data Analytics Puerto Rico',
        'services.grid.subtitle': 'Explore the capabilities we bring to government, nonprofit, and enterprise clients across the island.',
        
        // Meet Our Team
        'meetteam.title': 'Meet Our Team',
        'meetteam.description': 'We\'re a small but mighty team of data professionals, strategists, and technologists driven by a shared mission—to build systems that make decisions smarter and lives easier.',
        'meetteam.button': 'Meet Our Team',

        // Why Work With Us
        'whyworkwithus.title': 'Why Work With Us',
        'whyworkwithus.description': 'Stratum PR may be new, but our team is not. Founded by senior consultants and data specialists with years of experience delivering results for Fortune 500 companies, federal recovery programs, and Puerto Rico government agencies, we bring the discipline of enterprise work into a focused, agile firm built for impact.',
        'whyworkwithus.expertise.title': 'Proven Expertise',
        'whyworkwithus.expertise.description': 'We\'ve designed systems, dashboards, and automation tools for organizations like ICF, UnitedHealth Group, and the Puerto Rico Department of Health. We know the stakes—and how to deliver.',
        'whyworkwithus.process.title': 'Process-Driven Clarity',
        'whyworkwithus.process.description': 'We don\'t just build dashboards—we help clients untangle messy data and implement frameworks that actually support decision-making, planning, and accountability.',
        'whyworkwithus.partnership.title': 'Personalized Partnership',
        'whyworkwithus.partnership.description': 'We take on fewer clients so we can work with you, not just for you. Our size means you\'ll always be working directly with decision-makers, not just junior staff or vendors.',
        
        // CTA
        'cta.title': 'Ready to Transform Your Business?',
        'cta.description': 'Let\'s discuss how Stratum PR can architect better decisions for your organization through data analytics Puerto Rico expertise.',
        'cta.button': 'Get Started Today',
        
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
        
        // About page
        'about.hero.title': 'About Stratum PR',
        'about.hero.description': 'Founded in 2025, Stratum PR emerged from a simple observation: most organizations have access to more data than ever before, yet struggle to make better decisions. We bridge this gap by architecting solutions that transform complex information into strategic advantage.',
        'about.mission.title': 'Our Mission',
        'about.mission.description1': 'We exist to democratize advanced analytics and AI capabilities for businesses of all sizes. By combining deep technical expertise with strategic business acumen, we help organizations build the foundation for sustained competitive advantage in an increasingly data-driven world.',
        'about.mission.description2': 'Our approach goes beyond traditional consulting. We don\'t just provide recommendations—we architect and implement complete solutions that integrate seamlessly with your existing operations while positioning you for future growth.',
        'about.values.title': 'Our Values',
        'about.values.description': 'These principles guide every decision we make and every solution we deliver.',
        'about.values.technical': 'Technical Excellence',
        'about.values.technical.desc': 'We maintain the highest standards in analytical rigor and technical implementation.',
        'about.values.strategic': 'Strategic Clarity',
        'about.values.strategic.desc': 'Every solution is designed with clear business outcomes and measurable impact.',
        'about.values.partnership': 'Client Partnership',
        'about.values.partnership.desc': 'We work as an extension of your team, not just another vendor.',
        'about.values.innovation': 'Innovation Focus',
        'about.values.innovation.desc': 'Continuously exploring emerging technologies to deliver competitive advantages.',
        'about.team.title': 'Meet Our Leadership Team',
        'about.team.description': 'Our founding team brings together more than a decade of experience from leading projects at Fortune 500 companies, consulting firms, technology companies, and academic institutions.',
        'about.team.expertise': 'EXPERTISE',
        
        // Team member data
        'team.jovaniel.name': 'Jovaniel Agosto',
        'team.jovaniel.role': 'Chief Executive Officer',
        'team.jovaniel.bio': 'Jovaniel brings over 10 years of experience in strategic consulting and data analytics, having led transformational projects at Fortune 500 companies. His expertise spans business intelligence, process optimization, and organizational change management.',
        'team.jovaniel.expertise': 'Strategic Consulting, Business Intelligence, Change Management, Data Analytics',
        
        'team.genesis.name': 'Genesis Tavarez',
        'team.genesis.role': 'Chief Technology Officer',
        'team.genesis.bio': 'Genesis is a seasoned technology leader with extensive experience in AI implementation, software architecture, and digital transformation. She has successfully delivered enterprise-scale solutions across multiple industries.',
        'team.genesis.expertise': 'AI Implementation, Software Architecture, Digital Transformation, Enterprise Solutions',
        
        'team.roberto.name': 'Roberto Santiago',
        'team.roberto.role': 'Chief Operating Officer',
        'team.roberto.bio': 'Roberto specializes in operational excellence and system integration, with a proven track record of optimizing business processes and implementing scalable solutions for growing organizations.',
        'team.roberto.expertise': 'Operations Management, System Integration, Process Optimization, Scalable Solutions',
        
        // Services page
        'services.hero.title': 'Data Analytics Services Puerto Rico',
        'services.hero.description': 'We architect comprehensive solutions that transform complex data into strategic business advantages. Our services span the entire analytics ecosystem, from CRM implementation consulting to AI business automation.',
        'services.hero.cta': 'Schedule Consultation',
        'services.core.title': 'Our Core Services',
        'services.core.description': 'Each service is designed to deliver measurable business value while building the foundation for long-term strategic advantage.',
        'services.integration.title': 'Enterprise Software Integration',
        'services.integration.description': 'Seamlessly connect disparate systems to create unified, efficient business processes across your organization.',
        'services.integration.feature1': 'API Development & Integration',
        'services.integration.feature2': 'Legacy System Modernization',
        'services.integration.feature3': 'Cloud Migration Strategies',
        'services.integration.feature4': 'Microservices Architecture',
        'services.integration.feature5': 'Security & Compliance',
        'services.integration.deliverable': 'Fully integrated ecosystem with reduced operational complexity',
        'services.crm.title': 'CRM Implementation & Optimization',
        'services.crm.description': 'Streamline customer relationships with integrated CRM solutions that drive sales efficiency and customer satisfaction.',
        'services.crm.feature1': 'Salesforce & HubSpot Implementation',
        'services.crm.feature2': 'Custom CRM Development',
        'services.crm.feature3': 'Data Migration & Integration',
        'services.crm.feature4': 'Workflow Automation',
        'services.crm.feature5': 'Performance Analytics',
        'services.crm.deliverable': '90-day implementation timeline with full training and support',
        'services.bigdata.title': 'Big Data Analytics & Visualization',
        'services.bigdata.description': 'Transform massive datasets into actionable insights through advanced analytics and intuitive visualization platforms.',
        'services.bigdata.feature1': 'Data Warehouse Architecture',
        'services.bigdata.feature2': 'ETL Pipeline Development',
        'services.bigdata.feature3': 'Interactive Dashboards',
        'services.bigdata.feature4': 'Real-time Analytics',
        'services.bigdata.feature5': 'Custom Reporting Solutions',
        'services.bigdata.deliverable': 'Comprehensive analytics platform with 24/7 monitoring',
        'services.forecasting.title': 'Forecasting & Predictive Modeling',
        'services.forecasting.description': 'Leverage statistical models and machine learning to predict trends, optimize resources, and mitigate risks.',
        'services.forecasting.feature1': 'Demand Forecasting Models',
        'services.forecasting.feature2': 'Risk Assessment Analytics',
        'services.forecasting.feature3': 'Market Trend Analysis',
        'services.forecasting.feature4': 'Resource Optimization',
        'services.forecasting.feature5': 'Scenario Planning Tools',
        'services.forecasting.deliverable': 'Predictive models with 85%+ accuracy and automated reporting',
        'services.automation.title': 'Process Automation & ETL',
        'services.automation.description': 'Implement cutting-edge technologies to automate processes, enhance decision-making, and drive innovation.',
        'services.automation.feature1': 'Natural Language Processing',
        'services.automation.feature2': 'Computer Vision Applications',
        'services.automation.feature3': 'Recommendation Systems',
        'services.automation.feature4': 'Anomaly Detection',
        'services.automation.feature5': 'Automated Decision Systems',
        'services.automation.deliverable': 'Custom AI solutions with continuous learning capabilities',
        'services.decision.title': 'AI & Decision Intelligence',
        'services.decision.description': 'Create intelligent systems that automate complex business decisions while maintaining strategic oversight and control.',
        'services.decision.feature1': 'Automated Decision Workflows',
        'services.decision.feature2': 'Business Rule Engines',
        'services.decision.feature3': 'Strategic Planning Tools',
        'services.decision.feature4': 'Performance Monitoring',
        'services.decision.feature5': 'Optimization Algorithms',
        'services.decision.deliverable': 'Intelligent automation platform with strategic decision support',
        'services.process.title': 'Our Process',
        'services.process.description': 'We follow a proven methodology that ensures successful delivery and sustainable long-term value.',
        'services.process.step1.title': 'Discovery & Assessment',
        'services.process.step1.description': 'We begin with a comprehensive analysis of your current systems, data landscape, and business objectives.',
        'services.process.step2.title': 'Strategic Architecture',
        'services.process.step2.description': 'Our team designs a tailored solution architecture that aligns with your goals and integrates with existing infrastructure.',
        'services.process.step3.title': 'Implementation & Integration',
        'services.process.step3.description': 'We execute the solution with minimal disruption to your operations, ensuring seamless integration and user adoption.',
        'services.process.step4.title': 'Training & Optimization',
        'services.process.step4.description': 'Comprehensive training programs and ongoing optimization ensure maximum value from your investment.',
        'services.cta.title': 'Ready to Get Started?',
        'services.cta.description': 'Let\'s discuss how our data analytics services can transform your business operations and drive strategic growth in Puerto Rico.',
        'services.cta.consultation': 'Schedule Free Consultation',
        'services.cta.contact': 'Contact Our Team',
        'services.features': 'Key Features',
        
        // Contact page
        'contact.hero.title': 'Contact Us',
        'contact.hero.description': 'Ready to transform your business with strategic analytics? Let\'s start the conversation about your goals and how we can help achieve them.',
        'contact.form.title': 'Send us a Message',
        'contact.form.description': 'Fill out the form below and we\'ll get back to you within 24 hours.',
        'contact.form.security': 'This form is protected against spam and automated submissions',
        'contact.form.name': 'Full Name',
        'contact.form.email': 'Email Address',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.form.sending': 'Sending Message...',
        'contact.form.success.title': 'Message Sent Successfully!',
        'contact.form.success.description': 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
        'contact.info.title': 'Get in Touch',
        'contact.info.description': 'Multiple ways to reach our team',
        'contact.info.email': 'Email',
        'contact.info.email.desc': 'Send us a message anytime',
        'contact.info.linkedin': 'LinkedIn',
        'contact.info.linkedin.desc': 'Connect with our team',
        
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
        
        // Case Studies page
        'casestudies.hero.title': 'Case Studies',
        'casestudies.hero.description': 'A look inside our impact—real clients, real results.',
        'casestudies.filter.all': 'All',
        'casestudies.readmore': 'Read More',
        'casestudies.cta.title': 'Ready to Create Your Success Story?',
        'casestudies.cta.description': 'Let\'s discuss how we can help transform your data into actionable insights.',
        'casestudies.cta.button': 'Schedule Consultation',
        
        // Case study examples
        'casestudies.healthcare.title': 'Healthcare Data Integration Platform',
        'casestudies.healthcare.client': 'Regional Healthcare Network',
        'casestudies.healthcare.sector': 'Healthcare',
        'casestudies.healthcare.summary': 'Streamlined patient data across 12 facilities, reducing administrative overhead by 40% and improving care coordination.',
        
        'casestudies.municipal.title': 'Municipal Budget Transparency Dashboard',
        'casestudies.municipal.client': 'Puerto Rico Municipality',
        'casestudies.municipal.sector': 'Government',
        'casestudies.municipal.summary': 'Created real-time budget tracking system that increased citizen engagement and improved fiscal accountability.',
        
        'casestudies.sales.title': 'Sales Performance Analytics Suite',
        'casestudies.sales.client': 'Fortune 500 Technology Company',
        'casestudies.sales.sector': 'Technology',
        'casestudies.sales.summary': 'Automated sales reporting pipeline that reduced manual work by 60% and improved forecast accuracy by 25%.',
      },
      es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.services': 'Servicios',
        'nav.contact': 'Contacto',
        'nav.casestudies': 'Casos de Estudio',
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
        
        // Services Grid
        'services.grid.title': 'Soluciones Estratégicas para Análisis de Datos Puerto Rico',
        'services.grid.subtitle': 'Explora las capacidades que brindamos a clientes gubernamentales, sin fines de lucro y empresariales en toda la isla.',
        
        // Meet Our Team
        'meetteam.title': 'Conoce a Nuestro Equipo',
        'meetteam.description': 'Somos un equipo pequeño pero poderoso de profesionales de datos, estrategas y tecnólogos impulsados por una misión compartida: construir sistemas que hagan las decisiones más inteligentes y la vida más fácil.',
        'meetteam.button': 'Conoce a Nuestro Equipo',

        // Why Work With Us
        'whyworkwithus.title': 'Por Qué Trabajar Con Nosotros',
        'whyworkwithus.description': 'Stratum PR puede ser nueva, pero nuestro equipo no. Fundada por consultores senior y especialistas en datos con años de experiencia entregando resultados para empresas Fortune 500, programas federales de recuperación y agencias del gobierno de Puerto Rico, traemos la disciplina del trabajo empresarial a una firma enfocada y ágil construida para el impacto.',
        'whyworkwithus.expertise.title': 'Experiencia Comprobada',
        'whyworkwithus.expertise.description': 'Hemos diseñado sistemas, dashboards y herramientas de automatización para organizaciones como ICF, UnitedHealth Group y el Departamento de Salud de Puerto Rico. Conocemos lo que está en juego—y cómo entregar.',
        'whyworkwithus.process.title': 'Claridad Basada en Procesos',
        'whyworkwithus.process.description': 'No solo construimos dashboards—ayudamos a los clientes a desenredar datos desordenados e implementar marcos que realmente apoyen la toma de decisiones, planificación y responsabilidad.',
        'whyworkwithus.partnership.title': 'Asociación Personalizada',
        'whyworkwithus.partnership.description': 'Tomamos menos clientes para poder trabajar contigo, no solo para ti. Nuestro tamaño significa que siempre trabajarás directamente con los tomadores de decisiones, no solo con personal junior o proveedores.',
        
        // CTA
        'cta.title': '¿Listo para Transformar tu Negocio?',
        'cta.description': 'Hablemos sobre cómo Stratum PR puede arquitectar mejores decisiones para tu organización a través de nuestra experiencia en análisis de datos Puerto Rico.',
        'cta.button': 'Comenzar Hoy',
        
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
        
        // About page
        'about.hero.title': 'Acerca de Stratum PR',
        'about.hero.description': 'Fundada en 2025, Stratum PR surgió de una observación simple: la mayoría de las organizaciones tienen acceso a más datos que nunca, pero luchan por tomar mejores decisiones. Cerramos esta brecha arquitectando soluciones que transforman información compleja en ventaja estratégica.',
        'about.mission.title': 'Nuestra Misión',
        'about.mission.description1': 'Existimos para democratizar las capacidades avanzadas de análisis e IA para empresas de todos los tamaños. Al combinar experiencia técnica profunda con conocimiento estratégico de negocios, ayudamos a las organizaciones a construir la base para una ventaja competitiva sostenida en un mundo cada vez más basado en datos.',
        'about.mission.description2': 'Nuestro enfoque va más allá de la consultoría tradicional. No solo proporcionamos recomendaciones—arquitectamos e implementamos soluciones completas que se integran perfectamente con sus operaciones existentes mientras los posicionamos para el crecimiento futuro.',
        'about.values.title': 'Nuestros Valores',
        'about.values.description': 'Estos principios guían cada decisión que tomamos y cada solución que entregamos.',
        'about.values.technical': 'Excelencia Técnica',
        'about.values.technical.desc': 'Mantenemos los más altos estándares en rigor analítico e implementación técnica.',
        'about.values.strategic': 'Claridad Estratégica',
        'about.values.strategic.desc': 'Cada solución está diseñada con resultados de negocio claros e impacto medible.',
        'about.values.partnership': 'Asociación con Clientes',
        'about.values.partnership.desc': 'Trabajamos como una extensión de su equipo, no solo otro proveedor.',
        'about.values.innovation': 'Enfoque en Innovación',
        'about.values.innovation.desc': 'Exploramos continuamente tecnologías emergentes para entregar ventajas competitivas.',
        'about.team.title': 'Conoce a Nuestro Equipo de Liderazgo',
        'about.team.description': 'Nuestro equipo fundador reúne más de una década de experiencia liderando proyectos en empresas Fortune 500, firmas consultoras, empresas tecnológicas e instituciones académicas.',
        'about.team.expertise': 'EXPERIENCIA',
        
        // Team member data
        'team.jovaniel.name': 'Jovaniel Agosto',
        'team.jovaniel.role': 'Director Ejecutivo',
        'team.jovaniel.bio': 'Jovaniel aporta más de 10 años de experiencia en consultoría estratégica y análisis de datos, habiendo liderado proyectos transformacionales en empresas Fortune 500. Su experiencia abarca inteligencia empresarial, optimización de procesos y gestión del cambio organizacional.',
        'team.jovaniel.expertise': 'Consultoría Estratégica, Inteligencia Empresarial, Gestión del Cambio, Análisis de Datos',
        
        'team.genesis.name': 'Genesis Tavarez',
        'team.genesis.role': 'Directora de Tecnología',
        'team.genesis.bio': 'Genesis es una líder tecnológica experimentada con amplia experiencia en implementación de IA, arquitectura de software y transformación digital. Ha entregado exitosamente soluciones a escala empresarial en múltiples industrias.',
        'team.genesis.expertise': 'Implementación de IA, Arquitectura de Software, Transformación Digital, Soluciones Empresariales',
        
        'team.roberto.name': 'Roberto Santiago',
        'team.roberto.role': 'Director de Operaciones',
        'team.roberto.bio': 'Roberto se especializa en excelencia operacional e integración de sistemas, con un historial comprobado de optimizar procesos de negocio e implementar soluciones escalables para organizaciones en crecimiento.',
        'team.roberto.expertise': 'Gestión de Operaciones, Integración de Sistemas, Optimización de Procesos, Soluciones Escalables',
        
        // Services page
        'services.hero.title': 'Servicios de Análisis de Datos Puerto Rico',
        'services.hero.description': 'Arquitectamos soluciones integrales que transforman datos complejos en ventajas estratégicas de negocio. Nuestros servicios abarcan todo el ecosistema de análisis, desde consultoría de implementación de CRM hasta automatización empresarial con IA.',
        'services.hero.cta': 'Programar Consulta',
        'services.core.title': 'Nuestros Servicios Principales',
        'services.core.description': 'Cada servicio está diseñado para entregar valor de negocio medible mientras construye la base para ventaja estratégica a largo plazo.',
        'services.integration.title': 'Integración de Software Empresarial',
        'services.integration.description': 'Conecta sistemas dispares de manera fluida para crear procesos de negocio unificados y eficientes en toda tu organización.',
        'services.integration.feature1': 'Desarrollo e Integración de API',
        'services.integration.feature2': 'Modernización de Sistemas Legados',
        'services.integration.feature3': 'Estrategias de Migración a la Nube',
        'services.integration.feature4': 'Arquitectura de Microservicios',
        'services.integration.feature5': 'Seguridad y Cumplimiento',
        'services.integration.deliverable': 'Ecosistema completamente integrado con complejidad operacional reducida',
        'services.crm.title': 'Implementación y Optimización de CRM',
        'services.crm.description': 'Optimiza las relaciones con clientes con soluciones CRM integradas que impulsan la eficiencia de ventas y la satisfacción del cliente.',
        'services.crm.feature1': 'Implementación de Salesforce y HubSpot',
        'services.crm.feature2': 'Desarrollo de CRM Personalizado',
        'services.crm.feature3': 'Migración e Integración de Datos',
        'services.crm.feature4': 'Automatización de Flujos de Trabajo',
        'services.crm.feature5': 'Análisis de Rendimiento',
        'services.crm.deliverable': 'Cronograma de implementación de 90 días con entrenamiento y soporte completo',
        'services.bigdata.title': 'Análisis de Big Data y Visualización',
        'services.bigdata.description': 'Transforma conjuntos de datos masivos en insights accionables a través de análisis avanzados y plataformas de visualización intuitivas.',
        'services.bigdata.feature1': 'Arquitectura de Almacén de Datos',
        'services.bigdata.feature2': 'Desarrollo de Pipelines ETL',
        'services.bigdata.feature3': 'Dashboards Interactivos',
        'services.bigdata.feature4': 'Análisis en Tiempo Real',
        'services.bigdata.feature5': 'Soluciones de Reportes Personalizados',
        'services.bigdata.deliverable': 'Plataforma de análisis integral con monitoreo 24/7',
        'services.forecasting.title': 'Pronósticos y Modelado Predictivo',
        'services.forecasting.description': 'Aprovecha modelos estadísticos y aprendizaje automático para predecir tendencias, optimizar recursos y mitigar riesgos.',
        'services.forecasting.feature1': 'Modelos de Pronóstico de Demanda',
        'services.forecasting.feature2': 'Análisis de Evaluación de Riesgos',
        'services.forecasting.feature3': 'Análisis de Tendencias de Mercado',
        'services.forecasting.feature4': 'Optimización de Recursos',
        'services.forecasting.feature5': 'Herramientas de Planificación de Escenarios',
        'services.forecasting.deliverable': 'Modelos predictivos con 85%+ de precisión y reportes automatizados',
        'services.automation.title': 'Automatización de Procesos y ETL',
        'services.automation.description': 'Implementa tecnologías de vanguardia para automatizar procesos, mejorar la toma de decisiones e impulsar la innovación.',
        'services.automation.feature1': 'Procesamiento de Lenguaje Natural',
        'services.automation.feature2': 'Aplicaciones de Visión Computacional',
        'services.automation.feature3': 'Sistemas de Recomendación',
        'services.automation.feature4': 'Detección de Anomalías',
        'services.automation.feature5': 'Sistemas de Decisión Automatizados',
        'services.automation.deliverable': 'Soluciones de IA personalizadas con capacidades de aprendizaje continuo',
        'services.decision.title': 'IA e Inteligencia de Decisiones',
        'services.decision.description': 'Crea sistemas inteligentes que automatizan decisiones de negocio complejas mientras mantienen supervisión estratégica y control.',
        'services.decision.feature1': 'Flujos de Trabajo de Decisión Automatizados',
        'services.decision.feature2': 'Motores de Reglas de Negocio',
        'services.decision.feature3': 'Herramientas de Planificación Estratégica',
        'services.decision.feature4': 'Monitoreo de Rendimiento',
        'services.decision.feature5': 'Algoritmos de Optimización',
        'services.decision.deliverable': 'Plataforma de automatización inteligente con soporte de decisiones estratégicas',
        'services.process.title': 'Nuestro Proceso',
        'services.process.description': 'Seguimos una metodología probada que asegura entrega exitosa y valor sostenible a largo plazo.',
        'services.process.step1.title': 'Descubrimiento y Evaluación',
        'services.process.step1.description': 'Comenzamos con un análisis integral de tus sistemas actuales, panorama de datos y objetivos de negocio.',
        'services.process.step2.title': 'Arquitectura Estratégica',
        'services.process.step2.description': 'Nuestro equipo diseña una arquitectura de solución personalizada que se alinea con tus objetivos e integra con la infraestructura existente.',
        'services.process.step3.title': 'Implementación e Integración',
        'services.process.step3.description': 'Ejecutamos la solución con mínima interrupción a tus operaciones, asegurando integración fluida y adopción del usuario.',
        'services.process.step4.title': 'Entrenamiento y Optimización',
        'services.process.step4.description': 'Programas de entrenamiento integral y optimización continua aseguran el máximo valor de tu inversión.',
        'services.cta.title': '¿Listo para Comenzar?',
        'services.cta.description': 'Hablemos sobre cómo nuestros servicios de análisis de datos pueden transformar las operaciones de tu negocio e impulsar el crecimiento estratégico en Puerto Rico.',
        'services.cta.consultation': 'Programar Consulta Gratuita',
        'services.cta.contact': 'Contactar a Nuestro Equipo',
        'services.features': 'Características Clave',
        
        // Contact page
        'contact.hero.title': 'Contáctanos',
        'contact.hero.description': '¿Listo para transformar tu negocio con análisis estratégicos? Comencemos la conversación sobre tus objetivos y cómo podemos ayudarte a alcanzarlos.',
        'contact.form.title': 'Envíanos un Mensaje',
        'contact.form.description': 'Completa el formulario a continuación y te responderemos dentro de 24 horas.',
        'contact.form.security': 'Este formulario está protegido contra spam y envíos automatizados',
        'contact.form.name': 'Nombre Completo',
        'contact.form.email': 'Dirección de Correo',
        'contact.form.subject': 'Asunto',
        'contact.form.message': 'Mensaje',
        'contact.form.submit': 'Enviar Mensaje',
        'contact.form.sending': 'Enviando Mensaje...',
        'contact.form.success.title': '¡Mensaje Enviado Exitosamente!',
        'contact.form.success.description': 'Gracias por contactarnos. Te responderemos dentro de 24 horas.',
        'contact.info.title': 'Ponte en Contacto',
        'contact.info.description': 'Múltiples formas de contactar a nuestro equipo',
        'contact.info.email': 'Correo Electrónico',
        'contact.info.email.desc': 'Envíanos un mensaje en cualquier momento',
        'contact.info.linkedin': 'LinkedIn',
        'contact.info.linkedin.desc': 'Conéctate con nuestro equipo',
        
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
        
        // Case Studies page
        'casestudies.hero.title': 'Casos de Estudio',
        'casestudies.hero.description': 'Una mirada al interior de nuestro impacto—clientes reales, resultados reales.',
        'casestudies.filter.all': 'Todos',
        'casestudies.readmore': 'Leer Más',
        'casestudies.cta.title': '¿Listo para Crear tu Historia de Éxito?',
        'casestudies.cta.description': 'Hablemos sobre cómo podemos ayudarte a transformar tus datos en conocimientos accionables.',
        'casestudies.cta.button': 'Programar Consulta',
        
        // Case study examples
        'casestudies.healthcare.title': 'Plataforma de Integración de Datos de Salud',
        'casestudies.healthcare.client': 'Red de Salud Regional',
        'casestudies.healthcare.sector': 'Salud',
        'casestudies.healthcare.summary': 'Optimizó datos de pacientes en 12 instalaciones, reduciendo la sobrecarga administrativa en 40% y mejorando la coordinación de atención.',
        
        'casestudies.municipal.title': 'Dashboard de Transparencia Presupuestaria Municipal',
        'casestudies.municipal.client': 'Municipio de Puerto Rico',
        'casestudies.municipal.sector': 'Gobierno',
        'casestudies.municipal.summary': 'Creó sistema de seguimiento presupuestario en tiempo real que aumentó la participación ciudadana y mejoró la responsabilidad fiscal.',
        
        'casestudies.sales.title': 'Suite de Análisis de Rendimiento de Ventas',
        'casestudies.sales.client': 'Empresa Tecnológica Fortune 500',
        'casestudies.sales.sector': 'Tecnología',
        'casestudies.sales.summary': 'Automatizó pipeline de reportes de ventas que redujo el trabajo manual en 60% y mejoró la precisión de pronósticos en 25%.',
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
