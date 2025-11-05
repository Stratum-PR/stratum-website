
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  
  // SEO optimization for contact page
  useSEO({
    title: "Contact Stratum PR - Data Analytics Consulting Puerto Rico | Schedule Free Consultation",
    description: "Contact Stratum PR for expert data analytics consulting in Puerto Rico. Schedule a free consultation for CRM implementation, AI business automation, and predictive modeling services. Get in touch today.",
    keywords: "contact Stratum PR, data analytics consultation Puerto Rico, CRM implementation quote, AI business automation contact, schedule consultation, analytics consulting Puerto Rico",
    canonical: "https://www.stratumpr.com/contact",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://www.stratumpr.com/contact#webpage",
      "url": "https://www.stratumpr.com/contact",
      "name": "Contact Stratum PR - Data Analytics Consulting",
      "description": "Get in touch with Stratum PR for expert data analytics consulting services in Puerto Rico.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Stratum PR",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@stratumpr.com",
          "contactType": "Customer Service"
        }
      }
    }
  }, "contact");

  return (
    <div className="pt-[50px]">
      {/* Hero Section with Background */}
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
            {t('contact.hero.title')}
          </h1>
          <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {t('contact.hero.description')}
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Message Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            {/* Email - Takes 1 column, smaller */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:contact@stratumpr.com"
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <svg className="h-4 w-4 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-telegraf font-medium text-sm text-gray-900 mb-1">
                        {t('contact.info.email')}
                      </h4>
                      <p className="font-telegraf text-primary font-medium text-sm">
                        contact@stratumpr.com
                      </p>
                      <p className="font-telegraf text-xs text-gray-600 mt-1">
                        {t('contact.info.email.desc')}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
