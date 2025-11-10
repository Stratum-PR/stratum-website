
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
    <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative" aria-labelledby="why-work-with-us-heading">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="why-work-with-us-heading" className="font-telegraf font-light text-3xl sm:text-4xl md:text-5xl text-white mb-6 animate-fade-in-up tracking-tight">
            {t('whyworkwithus.title')}
          </h2>
          <p className="font-telegraf text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            {t('whyworkwithus.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift animate-fade-in-scale backdrop-blur-sm" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-lg mb-6 group-hover:bg-white/10 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-telegraf font-light text-xl text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="font-telegraf text-gray-400 leading-relaxed text-sm font-light">
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
