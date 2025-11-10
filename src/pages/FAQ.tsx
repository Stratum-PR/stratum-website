
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData, faqCategories, type FAQItem } from '@/data/faqData';

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();

  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Preguntas Frecuentes | Consultoría Análisis de Datos Puerto Rico - Stratum PR",
    description: "Encuentra respuestas a preguntas comunes sobre nuestros servicios de análisis de datos, enfoque y cómo podemos ayudar a transformar tu negocio en Puerto Rico.",
    keywords: "preguntas frecuentes, FAQ, análisis de datos Puerto Rico, consultoría IA, implementación CRM, automatización empresarial, servicios análisis datos"
  } : {
    title: "Frequently Asked Questions | Data Analytics Consulting Puerto Rico - Stratum PR",
    description: "Find answers to common questions about our data analytics services, approach, and how we can help transform your business in Puerto Rico.",
    keywords: "FAQ, frequently asked questions, data analytics Puerto Rico, AI consulting, CRM implementation, business automation, data analytics services"
  };

  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/faq",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://www.stratumpr.com/faq#webpage",
      "url": "https://www.stratumpr.com/faq",
      "name": seoData.title,
      "description": seoData.description,
      "inLanguage": language === 'es' ? 'es' : 'en',
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": []
      }
    }
  }, 'FAQ');

  const getFAQsByCategory = (category: string): FAQItem[] => {
    return faqData.filter(faq => faq.category === category);
  };

  return (
    <div className="pt-[50px]">
      {/* Hero Section with Background  */}
      <section className="relative pt-8 pb-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0">
          <img 
            src="/img/topographic-linear-background.jpg" 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-2xl md:text-3xl text-white drop-shadow-lg mb-3">
            {t('faq.hero.title')}
          </h1>
          <p className="font-telegraf text-base md:text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {t('faq.hero.description')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-6 bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative animate-gradient-flow">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03] animate-gradient-flow pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(230, 224, 142, 0.1) 0%, transparent 50%)`,
          backgroundSize: '200% 200%'
        }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category) => {
            const categoryFAQs = getFAQsByCategory(category.id);
            
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category.id} className="mb-8">
                <h2 className="text-2xl font-telegraf font-bold text-primary mb-6">
                  {t(category.titleKey)}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {categoryFAQs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border-2 border-primary/20 rounded-lg px-4 sm:px-6 py-2 bg-gradient-to-br from-white via-primary/3 to-white shadow-lg hover:shadow-xl hover-lift transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-base sm:text-lg font-telegraf font-semibold text-gray-900 hover:text-primary transition-colors">
                        {t(faq.question)}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2 pb-4 font-telegraf">
                        {t(faq.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-2xl md:text-3xl mb-4">
            {t('faq.cta.title')}
          </h2>
          <p className="font-telegraf text-base md:text-lg mb-6 text-primary-100 max-w-2xl mx-auto leading-relaxed">
            {t('faq.cta.description')}
          </p>
          <Button asChild className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg text-base">
            <a href="/contact">
              {t('faq.cta.button')}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
