
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProcessSection = () => {
  const { t } = useLanguage();

  const process = [
    {
      step: "01",
      title: t('services.process.step1.title'),
      description: t('services.process.step1.description')
    },
    {
      step: "02",
      title: t('services.process.step2.title'),
      description: t('services.process.step2.description')
    },
    {
      step: "03",
      title: t('services.process.step3.title'),
      description: t('services.process.step3.description')
    },
    {
      step: "04",
      title: t('services.process.step4.title'),
      description: t('services.process.step4.description')
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative" aria-labelledby="process-heading">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="process-heading" className="font-telegraf font-light text-3xl sm:text-4xl md:text-5xl text-white mb-6 animate-fade-in-up tracking-tight">
            {t('services.process.title')}
          </h2>
          <p className="font-telegraf text-lg text-gray-400 max-w-3xl mx-auto font-light">
            {t('services.process.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((phase, index) => (
            <Card key={index} className="text-center border border-gray-700/50 bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift transition-all duration-300 backdrop-blur-sm animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-gray-900 rounded-full text-xl font-telegraf font-light mb-6" style={{animationDelay: `${index * 0.2}s`}}>
                  {phase.step}
                </div>
                <h3 className="font-telegraf font-light text-lg text-white mb-4 tracking-tight">
                  {phase.title}
                </h3>
                <p className="font-telegraf text-sm text-gray-400 leading-relaxed">
                  {phase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
