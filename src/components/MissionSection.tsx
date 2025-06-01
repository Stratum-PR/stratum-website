
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MissionSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="font-telegraf text-lg text-gray-600 mb-8 leading-relaxed text-justify">
              {t('about.mission.description1')}
            </p>
            <p className="font-telegraf text-lg text-gray-600 leading-relaxed text-justify">
              {t('about.mission.description2')}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
