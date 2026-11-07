import { useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { PREGUNTAS_ROUTE } from "@/config/discoverable-routes";
import { FAQ_CATEGORIES } from "@/content/compliance-faq";
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

  // A link to a topic or question (e.g. /preguntas#fsma204) opens it, and its topic, then scrolls to it
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      let el: HTMLElement | null = target;
      while (el) {
        if (el instanceof HTMLDetailsElement) el.open = true;
        el = el.parentElement;
      }
      target.scrollIntoView({ block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <>
      <PageMeta route={PREGUNTAS_ROUTE} jsonLd={faqJsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-12 pt-24 text-white md:pb-20 md:pt-32" aria-labelledby="preguntas-heading">
          <div className="mx-auto max-w-4xl">
            <h1 id="preguntas-heading" className="font-telegraf text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {t("faqPage.title")}
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          {/* Topics start closed; each opens to its questions. Answers stay in the page for search engines. */}
          <div className="mb-14 space-y-3">
            {FAQ_CATEGORIES.map((c) => (
              <details key={c.id} id={c.id} className="group/cat scroll-mt-24 rounded-2xl border border-primary/10 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <h2 className="font-telegraf text-xl font-bold tracking-tight text-primary md:text-2xl">{c[lang]}</h2>
                    <span className="font-telegraf text-sm text-neutral-500">
                      {c.items.length} {t("faqPage.questions")}
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open/cat:rotate-180" aria-hidden />
                </summary>
                <div className="border-t border-primary/10">
                  {c.items.map((item) => (
                    <details key={item.id} id={item.id} className="group/q scroll-mt-24 border-b border-primary/[0.06] px-5 py-4 last:border-b-0 md:px-7">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-telegraf text-base font-semibold text-[#0b1215] [&::-webkit-details-marker]:hidden">
                        <h3 className="text-left">{item[lang].question}</h3>
                        <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open/q:rotate-180" aria-hidden />
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
              </details>
            ))}
          </div>

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
