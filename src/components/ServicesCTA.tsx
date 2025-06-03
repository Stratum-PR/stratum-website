
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-heading" className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
          {t('services.cta.title')}
        </h2>
        <p className="font-telegraf text-xl mb-8 text-primary-100">
          {t('services.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule free consultation for data analytics services">
              {t('services.cta.consultation')}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105"
          >
            <Link to="/contact" aria-label="Contact Stratum PR team for data analytics consulting">{t('services.cta.contact')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
