
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
          {t('about.hero.title')}
        </h1>
        <p className="font-telegraf text-xl text-gray-600 leading-relaxed text-justify">
          {t('about.hero.description')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
