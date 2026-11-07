import { CalendarDays, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { CONTACT_ROUTE } from "@/config/discoverable-routes";
import { CALENDLY_URL } from "@/constants/links";

const CONTACT_EMAIL = "contact@stratumpr.com";

const Contact = () => {
  const { t, language } = useLanguage();

  const contactJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://www.stratumpr.com/contact",
    name: CONTACT_ROUTE.title,
    inLanguage: language === "es" ? "es" : "en",
    mainEntity: {
      "@type": "Organization",
      name: "Stratum PR",
      address: { "@type": "PostalAddress", addressLocality: "Trujillo Alto", addressRegion: "PR", addressCountry: "US" },
      contactPoint: { "@type": "ContactPoint", email: CONTACT_EMAIL, contactType: "customer service", availableLanguage: ["es", "en"] },
    },
  });

  const cardClass = "rounded-3xl border border-primary/10 bg-white p-5 md:p-6";

  return (
    <>
      <PageMeta route={CONTACT_ROUTE} jsonLd={contactJsonLd} />

      <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl">
          <h1 id="contact-heading" className="max-w-[16ch] font-telegraf text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {t("contact.title")}
          </h1>
        </div>
      </section>

      <div className="bg-[#FAFAF8] px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-4" aria-label={t("contact.info.title")}>
            <div className={`${cardClass} bg-topo border-0 text-white`}>
              <CalendarDays className="mb-3 h-6 w-6 text-[#E6E09E]" aria-hidden />
              <h2 className="font-telegraf text-xl font-bold">{t("contact.book.title")}</h2>
              <p className="mb-5 mt-1.5 font-telegraf text-base text-white/80">{t("contact.book.body")}</p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center rounded-2xl bg-white px-6 font-telegraf font-semibold text-primary transition-colors hover:bg-[#E6E09E]"
              >
                {t("home.hero.cta.primary")}
              </a>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`${cardClass} block transition-colors hover:border-primary/30`}>
              <Mail className="mb-3 h-6 w-6 text-primary" aria-hidden />
              <h2 className="font-telegraf text-lg font-bold text-[#0b1215]">{t("contact.info.email")}</h2>
              <p className="mt-1 font-telegraf font-semibold text-primary">{CONTACT_EMAIL}</p>
            </a>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Contact;
