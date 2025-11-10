
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
    <section className="py-16 bg-gradient-to-br from-accent/8 via-white to-primary/8 relative animate-gradient-flow" aria-labelledby="process-heading">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.05] animate-gradient-flow pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 25% 50%, rgba(30, 43, 126, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 75% 50%, rgba(230, 224, 142, 0.1) 0%, transparent 50%)`,
        backgroundSize: '200% 200%'
      }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="process-heading" className="font-telegraf font-bold text-2xl text-primary mb-4 animate-fade-in-up">
            {t('services.process.title')}
          </h2>
          <p className="font-telegraf text-base text-gray-600 max-w-3xl mx-auto">
            {t('services.process.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((phase, index) => (
            <Card key={index} className="text-center border-2 border-primary/20 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 bg-gradient-to-br from-white via-primary/5 to-white animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full text-lg font-telegraf font-bold mb-4 shadow-lg hover-scale-icon primary-glow animate-float-slow" style={{animationDelay: `${index * 0.2}s`}}>
                  {phase.step}
                </div>
                <h3 className="font-telegraf font-semibold text-base text-primary mb-3">
                  {phase.title}
                </h3>
                <p className="font-telegraf text-sm text-gray-600 leading-relaxed">
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
