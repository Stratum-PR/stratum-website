import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { GUIDE_ROUTES, getPublicBaseUrl } from "@/config/discoverable-routes";
import { GUIDES } from "@/content/guides";
import NotFound from "./NotFound";

/**
 * A long-form guide (Spanish only) at /guias/<slug>. A guide with status 'draft' only exists in
 * builds with VITE_SHOW_DRAFTS=1 (GUIDE_ROUTES leaves it out otherwise), carries noindex and shows
 * a DRAFT banner with its open TODOs.
 */
const Guia = () => {
  const { slug } = useParams();
  const guide = GUIDES.find((g) => g.slug === slug);
  const route = GUIDE_ROUTES.find((r) => r.path === `/guias/${slug}`);
  if (!guide || !route) return <NotFound />;

  const url = getPublicBaseUrl() + route.path;
  const isDraft = guide.status !== "published";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "es-PR",
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
              Preguntas y guías
            </Link>
            <h1 id="guia-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {guide.title}
            </h1>
          </div>
        </section>

        <article lang="es-PR" className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{guide.lead}</p>

          {guide.sections.map((s) => (
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
              <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">Fuentes oficiales</h2>
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
              <p className="mt-3 font-telegraf text-xs text-neutral-500">Fuentes verificadas el {guide.verifiedOn}.</p>
            </div>
          )}

          <SoftCta />
        </article>
      </div>
    </>
  );
};

export default Guia;
