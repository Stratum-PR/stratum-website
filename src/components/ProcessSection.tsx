
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
    <section className="py-16 bg-gray-800 relative" aria-labelledby="process-heading">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="process-heading" className="font-telegraf font-bold text-2xl text-white mb-4 animate-fade-in-up">
            {t('services.process.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-300 max-w-3xl mx-auto">
            {t('services.process.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((phase, index) => (
            <Card key={index} className="text-center border-2 border-gray-600 shadow-lg hover:shadow-xl hover:border-accent hover-lift transition-all duration-300 bg-gray-700 animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-black rounded-full text-lg font-telegraf font-bold mb-4 shadow-lg hover-scale-icon primary-glow animate-float-slow" style={{animationDelay: `${index * 0.2}s`}}>
                  {phase.step}
                </div>
                <h3 className="font-telegraf font-semibold text-base text-white mb-3">
                  {phase.title}
                </h3>
                <p className="font-telegraf text-sm text-gray-300 leading-relaxed">
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
