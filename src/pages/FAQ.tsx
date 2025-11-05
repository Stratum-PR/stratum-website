
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
  const { t } = useLanguage();

  useSEO({
    title: `${t('nav.faq')} | Stratum PR`,
    description: t('faq.hero.description'),
    keywords: 'FAQ, questions, data analytics, Puerto Rico, consulting, AI, CRM',
    canonical: `${window.location.origin}/faq`,
  }, 'FAQ');

  const getFAQsByCategory = (category: string): FAQItem[] => {
    return faqData.filter(faq => faq.category === category);
  };

  return (
    <div className="pt-[50px]">
      {/* Hero Section with Background */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
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
          <h1 className="font-telegraf font-bold text-3xl md:text-4xl text-white drop-shadow-lg mb-6">
            {t('faq.hero.title')}
          </h1>
          <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {t('faq.hero.description')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category) => {
            const categoryFAQs = getFAQsByCategory(category.id);
            
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-telegraf font-bold text-gray-900 mb-8">
                  {t(category.titleKey)}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {categoryFAQs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border border-gray-200 rounded-lg px-6 py-2 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left text-lg font-telegraf font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {t(faq.question)}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">
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
      <section className="py-12 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-2xl md:text-3xl mb-4">
            {t('faq.cta.title')}
          </h2>
          <p className="font-telegraf text-lg mb-6 text-primary-100 max-w-2xl mx-auto">
            {t('faq.cta.description')}
          </p>
          <Button asChild className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
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
