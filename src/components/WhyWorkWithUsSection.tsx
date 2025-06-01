
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings, Users } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const WhyWorkWithUsSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: t('whyworkwithus.expertise.title'),
      description: t('whyworkwithus.expertise.description')
    },
    {
      icon: Settings,
      title: t('whyworkwithus.process.title'),
      description: t('whyworkwithus.process.description')
    },
    {
      icon: Users,
      title: t('whyworkwithus.partnership.title'),
      description: t('whyworkwithus.partnership.description')
    }
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="why-work-with-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 id="why-work-with-us-heading" className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
            {t('whyworkwithus.title')}
          </h2>
          <p className="font-telegraf text-xl text-gray-600 max-w-4xl leading-relaxed text-justify">
            {t('whyworkwithus.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 mx-auto">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-white" aria-hidden="true" />
                </div>
                <h3 className="font-telegraf font-semibold text-xl text-primary mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUsSection;
