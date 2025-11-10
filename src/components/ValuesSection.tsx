
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
    <section className="py-16 bg-gray-900 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-telegraf font-bold text-2xl md:text-3xl text-white mb-4 animate-fade-in-up">
            {t('about.values.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-300 max-w-3xl mx-auto">
            {t('about.values.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-2 border-gray-600 shadow-lg hover:shadow-xl hover:border-accent hover-lift transition-all duration-300 bg-gray-800 animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <h3 className="font-telegraf font-semibold text-lg text-white mb-3">
                  {value.title}
                </h3>
                <p className="font-telegraf text-base text-gray-300 leading-relaxed">
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
