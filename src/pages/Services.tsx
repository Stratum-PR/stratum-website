
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ServicesHero } from "@/components/ServicesHero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesCTA } from "@/components/ServicesCTA";

const Services = () => {
  const { t } = useLanguage();
  
  // SEO optimization for services page
  useSEO({
    title: "Data Analytics Services Puerto Rico | CRM Implementation | AI Business Automation - Stratum PR",
    description: "Comprehensive data analytics services in Puerto Rico. Specializing in CRM implementation consulting, AI business automation, predictive modeling, and big data analytics. Transform your business with Stratum PR.",
    keywords: "data analytics services Puerto Rico, CRM implementation consulting, AI business automation, big data analytics, Salesforce implementation, predictive modeling services, business intelligence consulting, machine learning Puerto Rico",
    canonical: "https://www.stratumpr.com/services",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.stratumpr.com/services#services",
      "name": "Data Analytics and Business Automation Services",
      "description": "Comprehensive analytics, CRM implementation, AI solutions, and business automation services in Puerto Rico",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Stratum PR"
      },
      "serviceType": [
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
      }
    }
  }, "services");

  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
      <div className="pt-20">
        <ServicesHero />
        <ServicesGrid />
        <ProcessSection />
        <ServicesCTA />
      </div>
    </TooltipProvider>
  );
};

export default Services;
