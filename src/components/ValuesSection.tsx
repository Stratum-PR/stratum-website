
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
    <section className="py-16 bg-gradient-to-br from-primary/8 via-white to-secondary/8 relative animate-gradient-flow">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.05] animate-gradient-flow pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(30, 43, 126, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 70% 60%, rgba(38, 106, 178, 0.1) 0%, transparent 50%)`,
        backgroundSize: '200% 200%'
      }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-telegraf font-bold text-2xl md:text-3xl text-primary mb-4 animate-fade-in-up">
            {t('about.values.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-600 max-w-3xl mx-auto">
            {t('about.values.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-2 border-primary/20 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 bg-gradient-to-br from-white via-primary/5 to-white animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-telegraf text-base text-gray-600 leading-relaxed">
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
