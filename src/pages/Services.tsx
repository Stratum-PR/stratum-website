
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ServicesHero } from "@/components/ServicesHero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesCTA } from "@/components/ServicesCTA";

const Services = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [highlightedServiceId, setHighlightedServiceId] = useState<string | null>(null);
  
  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Servicios de Análisis de Datos Puerto Rico | Implementación de CRM | Automatización con IA - Stratum PR",
    description: "Servicios integrales de análisis de datos en Puerto Rico. Especializados en consultoría de implementación de CRM, automatización empresarial con IA, modelado predictivo y análisis de big data. Transforma tu negocio con Stratum PR.",
    keywords: "servicios de análisis de datos Puerto Rico, consultoría implementación CRM, automatización empresarial IA, análisis de big data, implementación Salesforce, servicios modelado predictivo, consultoría inteligencia empresarial, aprendizaje automático Puerto Rico"
  } : {
    title: "Data Analytics Services Puerto Rico | CRM Implementation | AI Business Automation - Stratum PR",
    description: "Comprehensive data analytics services in Puerto Rico. Specializing in CRM implementation consulting, AI business automation, predictive modeling, and big data analytics. Transform your business with Stratum PR.",
    keywords: "data analytics services Puerto Rico, CRM implementation consulting, AI business automation, big data analytics, Salesforce implementation, predictive modeling services, business intelligence consulting, machine learning Puerto Rico"
  };
  
  // SEO optimization for services page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/services",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.stratumpr.com/services#services",
      "name": language === 'es' ? "Servicios de Análisis de Datos y Automatización Empresarial" : "Data Analytics and Business Automation Services",
      "description": language === 'es' 
        ? "Servicios integrales de análisis, implementación de CRM, soluciones de IA y automatización empresarial en Puerto Rico"
        : "Comprehensive analytics, CRM implementation, AI solutions, and business automation services in Puerto Rico",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Stratum PR"
      },
      "serviceType": language === 'es' ? [
        "Análisis de Datos",
        "Implementación de CRM",
        "Soluciones de IA", 
        "Automatización Empresarial",
        "Modelado Predictivo",
        "Análisis de Big Data"
      ] : [
        "Data Analytics",
        "CRM Implementation",
        "AI Solutions", 
        "Business Automation",
        "Predictive Modeling",
        "Big Data Analytics"
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Puerto Rico"
      },
      "inLanguage": language === 'es' ? 'es' : 'en'
    }
  }, "services");

  // Scroll to service card when hash is present in URL and highlight it
  useEffect(() => {
    if (location.hash) {
      // Extract service ID from hash (e.g., #service-data-integration -> data-integration)
      const serviceId = location.hash.replace('#service-', '');
      setHighlightedServiceId(serviceId);
      
      // Wait for the page to render, then scroll to the element
      const timer = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          // Use scrollIntoView with block: 'start' and the CSS scroll-padding-top will handle the offset
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
      
      // Remove highlight after 5 seconds
      const highlightTimer = setTimeout(() => {
        setHighlightedServiceId(null);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(highlightTimer);
      };
    } else {
      setHighlightedServiceId(null);
    }
  }, [location.hash]);

  return (
    <div>
      <ServicesHero />
      <ServicesGrid highlightedServiceId={highlightedServiceId} />
      <ProcessSection />
      <ServicesCTA />
    </div>
  );
};

export default Services;
