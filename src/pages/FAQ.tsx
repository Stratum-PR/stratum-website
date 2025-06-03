
import React from 'react';
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-telegraf font-bold text-gray-900 mb-6">
            {t('faq.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('faq.hero.description')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-24">
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
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-telegraf font-bold text-white mb-6">
            {t('faq.cta.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t('faq.cta.description')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-telegraf font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
          >
            {t('faq.cta.button')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
