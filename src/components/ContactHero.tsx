
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactHero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-telegraf font-bold text-3xl md:text-4xl text-white drop-shadow-lg mb-6">
          {t('contact.hero.title')}
        </h1>
        <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed">
          {t('contact.hero.description')}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
