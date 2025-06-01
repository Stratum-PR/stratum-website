
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { useSEO } from "@/hooks/useSEO";

const Contact = () => {
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
    <div className="pt-20">
      <ContactHero />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-6">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
