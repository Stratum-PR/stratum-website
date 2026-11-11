import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { SoftCta } from "@/components/SoftCta";
import { GUIDE_ROUTES, getPublicBaseUrl } from "@/config/discoverable-routes";
import { GUIDES } from "@/content/guides";
import NotFound from "./NotFound";

const COPY = {
  es: { back: "Preguntas y guías", sources: "Fuentes oficiales", verified: "Fuentes verificadas el" },
  en: { back: "Questions and guides", sources: "Official sources", verified: "Sources verified on" },
};

const MONTHS: Record<string, string> = {
  enero: "January", febrero: "February", marzo: "March", abril: "April", mayo: "May", junio: "June", julio: "July",
  agosto: "August", septiembre: "September", octubre: "October", noviembre: "November", diciembre: "December",
};

/** "11 de noviembre de 2026" → "November 11, 2026" (the guides store the date in Spanish). */
function englishDate(es: string): string {
  const m = /^(\d{1,2}) de (\p{L}+) de (\d{4})$/u.exec(es.trim());
  return m && MONTHS[m[2].toLowerCase()] ? `${MONTHS[m[2].toLowerCase()]} ${m[1]}, ${m[3]}` : es;
}

/**
 * A long-form guide at /guias/<slug>, and in English at /en/guides/<en slug>. A guide with status 'draft' only exists in
 * builds with VITE_SHOW_DRAFTS=1 (GUIDE_ROUTES leaves it out otherwise), carries noindex and shows
 * a DRAFT banner with its open TODOs.
 */
const Guia = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const guide = GUIDES.find((g) => (lang === "en" ? g.en.slug : g.slug) === slug);
  const route = guide && GUIDE_ROUTES.find((r) => r.path === `/guias/${guide.slug}`);
  if (!guide || !route) return <NotFound />;

  const text = lang === "en" ? guide.en : guide;
  const url = getPublicBaseUrl() + (lang === "en" ? `/en/guides/${guide.en.slug}` : route.path);
  const isDraft = guide.status !== "published";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: text.title,
    description: text.description,
    url,
    mainEntityOfPage: url,
    inLanguage: lang === "es" ? "es-PR" : "en-US",
    isPartOf: { "@id": "https://www.stratumpr.com/#website" },
    author: { "@id": "https://www.stratumpr.com/#organization" },
    publisher: { "@id": "https://www.stratumpr.com/#organization" },
    citation: guide.sources.map((s) => s.url),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        {isDraft && (
          <div role="note" className="border-b-2 border-amber-400 bg-amber-50 px-4 py-4 pt-20 font-telegraf text-amber-950 md:pt-24">
            <div className="mx-auto max-w-3xl">
              <p className="font-bold">BORRADOR (DRAFT): no publicado, no indexado. Revisar antes de publicar.</p>
              {guide.todos.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {guide.todos.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="guia-heading">
          <div className="mx-auto max-w-3xl">
            <Link to="/preguntas" className="mb-6 inline-flex items-center gap-1 font-telegraf text-sm text-white/80 underline-offset-2 hover:underline">
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {c.back}
            </Link>
            <h1 id="guia-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {text.title}
            </h1>
          </div>
        </section>

        <article lang={lang === "es" ? "es-PR" : "en-US"} className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{text.lead}</p>

          {text.sections.map((s) => (
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

          {guide.sources.length > 0 && (
            <div className="mt-12 border-t border-primary/10 pt-6">
              <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sources}</h2>
              <ul>
                {guide.sources.map((s) => (
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
                {c.verified} {lang === "en" ? englishDate(guide.verifiedOn) : guide.verifiedOn}.
              </p>
            </div>
          )}

          <SoftCta />
        </article>
      </div>
    </>
  );
};

export default Guia;
