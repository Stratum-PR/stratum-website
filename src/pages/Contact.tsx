
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t, language } = useLanguage();
  
  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Contacta Stratum PR - Consultoría Análisis de Datos Puerto Rico | Agenda Consulta Gratuita",
    description: "Contacta Stratum PR para consultoría experta en análisis de datos en Puerto Rico. Agenda una consulta gratuita para implementación de CRM, automatización empresarial con IA y servicios de modelado predictivo. Ponte en contacto hoy.",
    keywords: "contactar Stratum PR, consulta análisis de datos Puerto Rico, cotización implementación CRM, contacto automatización empresarial IA, agendar consulta, consultoría análisis Puerto Rico"
  } : {
    title: "Contact Stratum PR - Data Analytics Consulting Puerto Rico | Schedule Free Consultation",
    description: "Contact Stratum PR for expert data analytics consulting in Puerto Rico. Schedule a free consultation for CRM implementation, AI business automation, and predictive modeling services. Get in touch today.",
    keywords: "contact Stratum PR, data analytics consultation Puerto Rico, CRM implementation quote, AI business automation contact, schedule consultation, analytics consulting Puerto Rico"
  };
  
  // SEO optimization for contact page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/contact",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://www.stratumpr.com/contact#webpage",
      "url": "https://www.stratumpr.com/contact",
      "name": language === 'es' ? "Contacta Stratum PR - Consultoría en Análisis de Datos" : "Contact Stratum PR - Data Analytics Consulting",
      "description": language === 'es'
        ? "Ponte en contacto con Stratum PR para servicios de consultoría experta en análisis de datos en Puerto Rico."
        : "Get in touch with Stratum PR for expert data analytics consulting services in Puerto Rico.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Stratum PR",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@stratumpr.com",
          "contactType": "Customer Service"
        }
      },
      "inLanguage": language === 'es' ? 'es' : 'en'
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
          <h1 className="font-telegraf font-light text-4xl sm:text-5xl md:text-6xl text-white mb-8 tracking-tight">
            {t('contact.hero.title')}
          </h1>
          <p className="font-telegraf text-xl sm:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
            {t('contact.hero.description')}
          </p>
        </div>
      </section>
      
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Message Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            {/* Email - Takes 1 column, smaller */}
            <div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 shadow-lg hover:border-white/20 hover:bg-gray-800 hover-lift backdrop-blur-sm">
                <h3 className="font-telegraf font-light text-xl text-white mb-6 tracking-tight">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:contact@stratumpr.com"
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-telegraf font-light text-sm text-white/70 mb-1 uppercase tracking-wide">
                        {t('contact.info.email')}
                      </h4>
                      <p className="font-telegraf text-white font-light text-base">
                        contact@stratumpr.com
                      </p>
                      <p className="font-telegraf text-xs text-gray-400 mt-2 font-light">
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
