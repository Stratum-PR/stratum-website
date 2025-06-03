
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesHero = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-telegraf font-bold text-5xl md:text-6xl mb-6">
          {t('services.hero.title')}
        </h1>
        <p className="font-telegraf text-xl text-primary-100 leading-relaxed mb-8">
          {t('services.hero.description')}
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule consultation for data analytics services">
            {t('services.hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
};
