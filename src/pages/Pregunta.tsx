import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { FAQ_PAGE_ROUTES, getPublicBaseUrl } from "@/config/discoverable-routes";
import { FAQ_VERIFIED_ON } from "@/content/compliance-faq";
import { FAQ_PAGES, faqPageBySlug, splitAnswer } from "@/content/faq-pages";
import NotFound from "./NotFound";

const COPY = {
  es: { back: "Todas las preguntas", sources: "Fuentes oficiales", verified: "Fuentes verificadas el", related: "Otras preguntas sobre" },
  en: { back: "All questions", sources: "Official sources", verified: "Sources verified on", related: "More questions about" },
};

/** One FAQ question as its own page: H1 is the question, the direct answer first, then the detail. */
const Pregunta = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const page = faqPageBySlug(slug);
  if (!page) return <NotFound />;

  const { item, category } = page;
  const route = FAQ_PAGE_ROUTES.find((r) => r.path === page.path)!;
  const { lead, detail } = splitAnswer(item[lang].answer);
  const url = getPublicBaseUrl() + page.path;
  const related = FAQ_PAGES.filter((p) => p.category.id === category.id && p.slug !== page.slug);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        mainEntity: {
          "@type": "Question",
          name: item[lang].question,
          acceptedAnswer: { "@type": "Answer", text: item[lang].answer },
        },
        ...(item.sources?.length ? { citation: item.sources.map((s) => s.url) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stratum PR", item: "https://www.stratumpr.com/" },
          { "@type": "ListItem", position: 2, name: lang === "es" ? "Preguntas" : "Questions", item: "https://www.stratumpr.com/preguntas" },
          { "@type": "ListItem", position: 3, name: item[lang].question, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="pregunta-heading">
          <div className="mx-auto max-w-3xl">
            <Link
              to={`/preguntas#${category.id}`}
              className="mb-6 inline-flex items-center gap-1 font-telegraf text-sm text-white/80 underline-offset-2 hover:underline"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {c.back} · {category[lang]}
            </Link>
            <h1 id="pregunta-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {item[lang].question}
            </h1>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{lead}</p>
          {detail && <p className="mt-5 max-w-[68ch] font-telegraf text-base leading-relaxed text-neutral-700">{detail}</p>}

          {item.sources && item.sources.length > 0 && (
            <div className="mt-10 border-t border-primary/10 pt-6">
              <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sources}</h2>
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
              <p className="mt-3 font-telegraf text-xs text-neutral-500">
                {c.verified} {FAQ_VERIFIED_ON[lang]}.
              </p>
            </div>
          )}

          {related.length > 0 && (
            <nav className="mt-12" aria-labelledby="related-heading">
              <h2 id="related-heading" className="font-telegraf text-lg font-bold text-primary">
                {c.related} {category[lang].toLowerCase()}
              </h2>
              <ul className="mt-3 space-y-1">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={p.path} className="inline-block py-1.5 font-telegraf text-base text-secondary underline-offset-2 hover:underline">
                      {p.item[lang].question}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <SoftCta />
        </article>
      </div>
    </>
  );
};

export default Pregunta;
