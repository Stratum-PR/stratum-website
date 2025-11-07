
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="absolute inset-0">
        <img 
          src="/img/topographic-linear-background.jpg" 
          alt="" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-telegraf font-bold text-3xl md:text-4xl text-white drop-shadow-lg mb-6">
          {t('services.hero.title')}
        </h1>
        <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed mb-8">
          {t('services.hero.description')}
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 py-3 text-sm rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <a href="https://calendly.com/admin-stratumpr/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule consultation for data analytics services">
            {t('services.hero.cta')}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
};
