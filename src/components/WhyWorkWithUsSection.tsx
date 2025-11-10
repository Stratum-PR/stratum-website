
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
    <section className="py-12 bg-gray-900 relative" aria-labelledby="why-work-with-us-heading">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="why-work-with-us-heading" className="font-telegraf font-bold text-2xl md:text-3xl text-white mb-4 animate-fade-in-up">
            {t('whyworkwithus.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('whyworkwithus.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-600 shadow-lg bg-gray-800 hover:border-accent hover-lift animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-xl mb-4 group-hover:bg-accent/30 transition-all duration-300 shadow-lg hover-scale-icon primary-glow">
                  <feature.icon className="h-7 w-7 text-accent group-hover:text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-telegraf font-semibold text-lg text-white mb-3">
                  {feature.title}
                </h3>
                <p className="font-telegraf text-gray-300 leading-relaxed text-sm">
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
