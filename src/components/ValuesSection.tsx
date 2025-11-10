
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface Value {
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-telegraf font-light text-3xl sm:text-4xl md:text-5xl text-white mb-6 animate-fade-in-up tracking-tight">
            {t('about.values.title')}
          </h2>
          <p className="font-telegraf text-lg text-gray-400 max-w-3xl mx-auto font-light">
            {t('about.values.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border border-gray-700/50 bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift transition-all duration-300 backdrop-blur-sm animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8">
                <h3 className="font-telegraf font-light text-xl sm:text-2xl text-white mb-4 tracking-tight">
                  {value.title}
                </h3>
                <p className="font-telegraf text-base text-gray-400 leading-relaxed font-light">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
