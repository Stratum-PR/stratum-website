
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
            {t('about.values.title')}
          </h2>
          <p className="font-telegraf text-xl text-gray-600 max-w-3xl text-justify">
            {t('about.values.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="font-telegraf font-semibold text-2xl text-primary mb-4">
                  {value.title}
                </h3>
                <p className="font-telegraf text-gray-600 leading-relaxed text-justify">
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
