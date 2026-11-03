import { ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { PREGUNTAS_ROUTE } from "@/config/discoverable-routes";
import { FAQ_CATEGORIES, FAQ_VERIFIED_ON } from "@/content/compliance-faq";
import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

const Preguntas = () => {
  const { t, language } = useLanguage();
  const lang = language === "es" ? "es" : "en";

  // FAQPage structured data: lets search engines and AI assistants read each Q&A directly
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: FAQ_CATEGORIES.flatMap((c) =>
      c.items.map((item) => ({
        "@type": "Question",
        name: item[lang].question,
        acceptedAnswer: { "@type": "Answer", text: item[lang].answer },
      }))
    ),
  });

  return (
    <>
      <PageMeta route={PREGUNTAS_ROUTE} jsonLd={faqJsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-12 pt-24 text-white md:pb-20 md:pt-32" aria-labelledby="preguntas-heading">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-[#E6E09E]">
              {t("faqPage.eyebrow")}
            </p>
            <h1 id="preguntas-heading" className="font-telegraf text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {t("faqPage.title")}
            </h1>
            <p className="mt-5 max-w-2xl font-telegraf text-lg leading-relaxed text-white/80">{t("faqPage.intro")}</p>
            <nav aria-label={t("faqPage.categoriesLabel")} className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {FAQ_CATEGORIES.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full border border-white/25 px-4 font-telegraf text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                >
                  {c[lang]}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <p className="mb-12 rounded-2xl border border-primary/15 bg-white px-6 py-4 font-telegraf text-sm leading-relaxed text-neutral-600">
            {t("faqPage.disclaimer")} {t("faqPage.verified")} {FAQ_VERIFIED_ON[lang]}.
          </p>

          {FAQ_CATEGORIES.map((c) => (
            <section key={c.id} id={c.id} className="mb-14 scroll-mt-24" aria-labelledby={`${c.id}-heading`}>
              <h2 id={`${c.id}-heading`} className="mb-5 font-telegraf text-2xl font-bold tracking-tight text-primary md:text-3xl">
                {c[lang]}
              </h2>
              <div className="space-y-3">
                {c.items.map((item) => (
                  <details key={item.id} id={item.id} className="group scroll-mt-24 rounded-2xl border border-primary/10 bg-white px-4 py-4 md:px-6 md:py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-telegraf text-base font-semibold text-[#0b1215] md:text-lg [&::-webkit-details-marker]:hidden">
                      <h3 className="text-left">{item[lang].question}</h3>
                      <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="mt-3 max-w-[68ch] font-telegraf text-base leading-relaxed text-neutral-700">{item[lang].answer}</p>
                    {item.sources && item.sources.length > 0 && (
                      <div className="mt-4 border-t border-primary/10 pt-3">
                        <p className="mb-1.5 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">
                          {t("faqPage.sources")}
                        </p>
                        <ul>
                          {item.sources.map((s) => (
                            <li key={s.url}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-1.5 py-1.5 font-telegraf text-sm text-secondary underline-offset-2 hover:underline"
                              >
                                {s.label}
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-3xl bg-topo px-6 py-10 text-center text-white md:px-12" aria-labelledby="preguntas-cta-heading">
            <h2 id="preguntas-cta-heading" className="font-telegraf text-2xl font-bold md:text-3xl">
              {t("faqPage.cta.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-telegraf text-lg text-white/80">{t("faqPage.cta.body")}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-white px-7 sm:w-auto py-3.5 font-telegraf font-semibold text-primary transition-colors hover:bg-[#E6E09E]"
              >
                {t("home.hero.cta.primary")}
              </a>
              <a
                href={ALERTAS_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-white/40 px-7 sm:w-auto py-3.5 font-telegraf font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("home.products.alerts.cta")}
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Preguntas;
