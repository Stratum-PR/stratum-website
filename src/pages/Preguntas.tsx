import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { GUIDE_ROUTES, PREGUNTAS_ROUTE } from "@/config/discoverable-routes";
import { FAQ_CATEGORIES } from "@/content/compliance-faq";
import { FAQ_SLUGS, faqPathForId } from "@/content/faq-pages";
import { GUIDES } from "@/content/guides";
import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

const Preguntas = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const lang = language === "es" ? "es" : "en";

  // FAQPage structured data: lets search engines and AI assistants read each Q&A directly
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "es" ? "es-PR" : "en-US",
    url: "https://www.stratumpr.com/preguntas",
    mainEntity: FAQ_CATEGORIES.flatMap((c) =>
      c.items.map((item) => ({
        "@type": "Question",
        name: item[lang].question,
        url: `https://www.stratumpr.com${faqPathForId(item.id)}`,
        acceptedAnswer: { "@type": "Answer", text: item[lang].answer },
      }))
    ),
  }).replace(/</g, "\\u003c");

  // Guides that exist in this build (drafts only with VITE_SHOW_DRAFTS=1)
  const guides = GUIDES.filter((g) => GUIDE_ROUTES.some((r) => r.path === `/guias/${g.slug}`));

  // Old links to a question on this page (/preguntas#fsma204) now go to that question's own page
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && FAQ_SLUGS[id]) navigate(faqPathForId(id), { replace: true });
  }, [navigate]);

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
          {/* An index: every question links to its own page with the full answer and sources */}
          <div className="mb-14 space-y-10">
            {FAQ_CATEGORIES.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-24" aria-labelledby={`cat-${c.id}`}>
                <h2 id={`cat-${c.id}`} className="font-telegraf text-xl font-bold tracking-tight text-primary md:text-2xl">
                  {c[lang]}
                </h2>
                <ul className="mt-4 divide-y divide-primary/[0.06] rounded-2xl border border-primary/10 bg-white">
                  {c.items.map((item) => (
                    <li key={item.id} id={item.id} className="scroll-mt-24">
                      <Link
                        to={faqPathForId(item.id)}
                        className="flex items-center justify-between gap-4 px-5 py-4 font-telegraf text-base font-semibold text-[#0b1215] transition-colors hover:bg-primary/[0.03] md:px-7"
                      >
                        <span>{item[lang].question}</span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {guides.length > 0 && (
              <section id="guias" className="scroll-mt-24" aria-labelledby="cat-guias">
                <h2 id="cat-guias" className="font-telegraf text-xl font-bold tracking-tight text-primary md:text-2xl">
                  {lang === "es" ? "Guías" : "Guides (in Spanish)"}
                </h2>
                <ul className="mt-4 divide-y divide-primary/[0.06] rounded-2xl border border-primary/10 bg-white">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        to={`/guias/${g.slug}`}
                        className="flex items-center justify-between gap-4 px-5 py-4 font-telegraf text-base font-semibold text-[#0b1215] transition-colors hover:bg-primary/[0.03] md:px-7"
                      >
                        <span>
                          {g.title}
                          {g.status !== "published" && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900">BORRADOR</span>}
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
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
