
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
    <section className="py-12 bg-gradient-to-br from-secondary/8 via-white to-primary/8 relative animate-gradient-flow" aria-labelledby="why-work-with-us-heading">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.05] animate-gradient-flow pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(230, 224, 142, 0.1) 0%, transparent 50%)`,
        backgroundSize: '200% 200%'
      }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="why-work-with-us-heading" className="font-telegraf font-bold text-2xl md:text-3xl text-primary mb-4 animate-fade-in-up">
            {t('whyworkwithus.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('whyworkwithus.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 shadow-lg bg-gradient-to-br from-white via-primary/5 to-secondary/5 hover-lift animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-lg hover-scale-icon primary-glow">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-white" aria-hidden="true" />
                </div>
                <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-telegraf text-gray-600 leading-relaxed text-sm">
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
