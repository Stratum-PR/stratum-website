
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactHero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-telegraf font-bold text-5xl md:text-6xl mb-6">
          {t('contact.hero.title')}
        </h1>
        <p className="font-telegraf text-xl text-primary-100 leading-relaxed">
          {t('contact.hero.description')}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
