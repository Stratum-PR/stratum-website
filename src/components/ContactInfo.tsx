
import { Mail, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactInfo = () => {
  const { t } = useLanguage();
  
  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: "contact@stratumpr.com",
      href: "mailto:contact@stratumpr.com",
      description: t('contact.info.email.desc')
    },
    {
      icon: Linkedin,
      title: t('contact.info.linkedin'),
      value: "linkedin.com/company/stratumpr",
      href: "https://linkedin.com/company/stratumpr",
      description: t('contact.info.linkedin.desc')
    }
  ];

  return (
    <Card className="border-2 border-gray-600 shadow-lg bg-gray-800">
      <CardHeader>
        <CardTitle className="font-telegraf text-2xl text-white">
          {t('contact.info.title')}
        </CardTitle>
        <p className="font-telegraf text-gray-300">
          {t('contact.info.description')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactInfo.map((info, index) => (
          <a
            key={index}
            href={info.href}
            target={info.href.startsWith('http') ? '_blank' : undefined}
            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                <info.icon className="h-5 w-5 text-accent group-hover:text-accent" />
              </div>
            </div>
            <div>
              <h3 className="font-telegraf font-semibold text-white">
                {info.title}
              </h3>
              <p className="font-telegraf text-accent font-medium">
                {info.value}
              </p>
              <p className="font-telegraf text-sm text-gray-400">
                {info.description}
              </p>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
