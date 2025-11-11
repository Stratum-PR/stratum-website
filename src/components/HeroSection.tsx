
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-br from-primary/10 to-secondary/10">
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
          {t('about.hero.title')}
        </h1>
        <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed">
          {t('about.hero.description')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
