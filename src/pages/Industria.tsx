import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import { FAQ_PAGES } from "@/content/faq-pages";
import { SECTORS, SECTORS_INDEX_PATH, SECTORS_VERIFIED_ON, sectorBySlug, sectorPath } from "@/content/sectors";
import NotFound from "./NotFound";

const COPY = {
  es: {
    back: "Todas las industrias",
    index: "Industrias",
    sources: "Fuentes oficiales",
    verified: "Fuentes verificadas el",
    questions: "Preguntas relacionadas",
    related: "Otras industrias",
  },
  en: {
    back: "All industries",
    index: "Industries",
    sources: "Official sources",
    verified: "Sources verified on",
    questions: "Related questions",
    related: "Other industries",
  },
};

/** One industry: which federal food safety rules apply to it, with sources. Matches a Spanish or English slug. */
const Industria = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const sector = sectorBySlug(slug);
  if (!sector) return <NotFound />;

  const content = sector[lang];
  const path = sectorPath(sector, lang);
  const base = getPublicBaseUrl();
  const url = base + path;
  const route: DiscoverableRoute = {
    path,
    title: sector.es.metaTitle,
    description: sector.es.description,
    titleEn: sector.en.metaTitle,
    descriptionEn: sector.en.description,
    indexable: true,
    changefreq: "monthly",
    priority: 0.8,
  };

  const questions = sector.faqSlugs
    .map((s) => FAQ_PAGES.find((p) => p.slug === s))
    .filter((p): p is (typeof FAQ_PAGES)[number] => p != null);
  const related = sector.related
    .map((id) => SECTORS.find((s) => s.id === id))
    .filter((s): s is (typeof SECTORS)[number] => s != null);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: content.title,
        description: content.description,
        url,
        mainEntityOfPage: url,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        author: { "@id": "https://www.stratumpr.com/#organization" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        citation: sector.sources.map((s) => s.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stratum PR", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: c.index, item: base + SECTORS_INDEX_PATH[lang] },
          { "@type": "ListItem", position: 3, name: content.title, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="industria-heading">
          <div className="mx-auto max-w-3xl">
            <Link
              to={SECTORS_INDEX_PATH[lang]}
              className="mb-6 inline-flex items-center gap-1 font-telegraf text-sm text-white/80 underline-offset-2 hover:underline"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {c.back}
            </Link>
            <h1 id="industria-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {content.title}
            </h1>
          </div>
        </section>

        <article lang={lang === "es" ? "es-PR" : "en-US"} className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{content.lead}</p>

          {content.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-telegraf text-xl font-bold text-primary md:text-2xl">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 max-w-[68ch] font-telegraf text-base leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-3 max-w-[68ch] list-disc space-y-1.5 pl-5 font-telegraf text-base leading-relaxed text-neutral-700">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {sector.sources.length > 0 && (
            <div className="mt-12 border-t border-primary/10 pt-6">
              <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sources}</h2>
              <ul>
                {sector.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 py-1.5 font-telegraf text-sm text-secondary underline-offset-2 hover:underline"
                    >
                      {s.label[lang]}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-telegraf text-xs text-neutral-500">
                {c.verified} {SECTORS_VERIFIED_ON[lang]}.
              </p>
            </div>
          )}

          {questions.length > 0 && (
            <nav className="mt-12" aria-labelledby="industria-questions-heading">
              <h2 id="industria-questions-heading" className="font-telegraf text-lg font-bold text-primary">
                {c.questions}
              </h2>
              <ul className="mt-3 space-y-1">
                {questions.map((p) => (
                  <li key={p.slug}>
                    <Link to={p.path} className="inline-block py-1.5 font-telegraf text-base text-secondary underline-offset-2 hover:underline">
                      {p.item[lang].question}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {related.length > 0 && (
            <nav className="mt-10" aria-labelledby="industria-related-heading">
              <h2 id="industria-related-heading" className="font-telegraf text-lg font-bold text-primary">
                {c.related}
              </h2>
              <ul className="mt-3 space-y-1">
                {related.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={sectorPath(s, lang)}
                      className="inline-block py-1.5 font-telegraf text-base text-secondary underline-offset-2 hover:underline"
                    >
                      {s[lang].title}
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

export default Industria;
