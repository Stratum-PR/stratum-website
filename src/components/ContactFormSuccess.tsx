
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactFormSuccess = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-12">
      <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
      <h3 className="font-telegraf font-semibold text-2xl text-primary mb-2">
        {t('contact.form.success.title')}
      </h3>
      <p className="font-telegraf text-gray-600">
        {t('contact.form.success.description')}
      </p>
    </div>
  );
};

export default ContactFormSuccess;
