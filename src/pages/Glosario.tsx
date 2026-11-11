import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import { GLOSSARY, GLOSSARY_PATH, GLOSSARY_VERIFIED_ON, type GlossaryTerm } from "@/content/glossary";

const COPY = {
  es: {
    metaTitle: "Glosario de inocuidad alimentaria: FDA, FSMA y SQF | Stratum PR",
    metaDescription:
      "Qué significan KDE, CTE, PCQI, FSVP, HACCP, Formulario 483, recall y más: términos de la FDA, FSMA, USDA y SQF explicados en español, con la fuente oficial de cada uno.",
    h1: "Glosario de inocuidad alimentaria: FDA, FSMA y SQF",
    intro:
      "Los términos que aparecen en las reglas de la FDA y el USDA, en FSMA y en las auditorías SQF y BRCGS, explicados en palabras sencillas para fabricantes en Puerto Rico y empresas que venden en Estados Unidos. Cada definición resume la fuente oficial que la acompaña; ante cualquier duda, manda el texto oficial.",
    jump: "Ir a la letra",
    sources: "Fuente",
    related: "Ver también",
    verified: "Fuentes verificadas el",
    breadcrumb: "Glosario",
    setName: "Glosario de inocuidad alimentaria de Stratum PR",
  },
  en: {
    metaTitle: "Food safety glossary: FDA, FSMA and SQF terms | Stratum PR",
    metaDescription:
      "What KDE, CTE, PCQI, FSVP, HACCP, Form 483, recall and more mean: FDA, FSMA, USDA and SQF terms explained in plain language, with the official source for each one.",
    h1: "Food safety glossary: FDA, FSMA and SQF terms",
    intro:
      "The terms used in FDA and USDA rules, in FSMA and in SQF and BRCGS audits, explained in plain language for Puerto Rico manufacturers and companies selling in the United States. Each definition summarizes the official source listed with it; when in doubt, the official text governs.",
    jump: "Jump to letter",
    sources: "Source",
    related: "See also",
    verified: "Sources verified on",
    breadcrumb: "Glossary",
    setName: "Stratum PR food safety glossary",
  },
};

/** Accent-free, lowercase sort key so the order is identical in the prerender (Node) and the browser. */
const sortKey = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const letterOf = (t: GlossaryTerm, lang: "es" | "en") => sortKey(t.term[lang]).charAt(0).toUpperCase();

/** One page with every glossary term, A–Z in the visitor's language, each with its own #anchor. */
const Glosario = () => {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const path = GLOSSARY_PATH[lang];
  const url = getPublicBaseUrl() + path;

  const route: DiscoverableRoute = {
    path,
    title: COPY.es.metaTitle,
    description: COPY.es.metaDescription,
    titleEn: COPY.en.metaTitle,
    descriptionEn: COPY.en.metaDescription,
    indexable: true,
    changefreq: "monthly",
    priority: 0.7,
  };

  const byId = new Map(GLOSSARY.map((t) => [t.id, t]));
  const sorted = [...GLOSSARY].sort((a, b) => {
    const ka = sortKey(a.term[lang]);
    const kb = sortKey(b.term[lang]);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
  const groups: { letter: string; terms: GlossaryTerm[] }[] = [];
  for (const t of sorted) {
    const letter = letterOf(t, lang);
    const last = groups[groups.length - 1];
    if (last && last.letter === letter) last.terms.push(t);
    else groups.push({ letter, terms: [t] });
  }

  const setId = `${url}#glosario`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": setId,
        name: c.setName,
        description: c.metaDescription,
        url,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        hasDefinedTerm: sorted.map((t) => ({
          "@type": "DefinedTerm",
          "@id": `${url}#${t.id}`,
          name: t.term[lang],
          ...(t.abbr ? { termCode: t.abbr } : {}),
          description: t[lang].definition,
          url: `${url}#${t.id}`,
          inDefinedTermSet: { "@id": setId },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stratum PR", item: "https://www.stratumpr.com/" },
          { "@type": "ListItem", position: 2, name: c.breadcrumb, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="glosario-heading">
          <div className="mx-auto max-w-3xl">
            <h1 id="glosario-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {c.h1}
            </h1>
            <p className="mt-5 max-w-[68ch] font-telegraf text-base leading-relaxed text-white/85 md:text-lg">{c.intro}</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <nav aria-label={c.jump} className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.letter}>
                  <a
                    href={`#letra-${g.letter.toLowerCase()}`}
                    className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-xl border border-primary/15 bg-white px-3 font-telegraf text-base font-semibold text-primary transition-colors hover:bg-primary/5"
                    aria-label={`${c.jump} ${g.letter}`}
                  >
                    {g.letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g.letter} id={`letra-${g.letter.toLowerCase()}`} className="scroll-mt-24" aria-labelledby={`letra-${g.letter.toLowerCase()}-heading`}>
                <h2
                  id={`letra-${g.letter.toLowerCase()}-heading`}
                  className="border-b border-primary/10 pb-2 font-telegraf text-2xl font-bold tracking-tight text-primary"
                >
                  {g.letter}
                </h2>
                <dl className="mt-4 space-y-8">
                  {g.terms.map((t) => (
                    <div key={t.id} id={t.id} className="scroll-mt-24">
                      <dt className="font-telegraf text-lg font-bold text-[#0b1215] md:text-xl">
                        <a href={`#${t.id}`} className="underline-offset-2 hover:underline">
                          {t.term[lang]}
                        </a>
                      </dt>
                      <dd className="mt-2">
                        <p className="max-w-[68ch] font-telegraf text-base leading-relaxed text-neutral-700">{t[lang].definition}</p>
                        <p className="mt-3 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sources}</p>
                        <ul className="mt-1">
                          {t.sources.map((s) => (
                            <li key={s.url}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-1.5 py-1 font-telegraf text-sm text-secondary underline-offset-2 hover:underline"
                              >
                                {s.label}
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              </a>
                            </li>
                          ))}
                        </ul>
                        {t.related && t.related.length > 0 && (
                          <p className="mt-2 font-telegraf text-sm text-neutral-600">
                            <span className="font-semibold">{c.related}: </span>
                            {t.related
                              .map((id) => byId.get(id))
                              .filter((r): r is GlossaryTerm => r != null)
                              .map((r, i) => (
                                <span key={r.id}>
                                  {i > 0 && ", "}
                                  <a href={`#${r.id}`} className="text-secondary underline-offset-2 hover:underline">
                                    {r.term[lang]}
                                  </a>
                                </span>
                              ))}
                          </p>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-primary/10 pt-6 font-telegraf text-xs text-neutral-500">
            {c.verified} {GLOSSARY_VERIFIED_ON[lang]}.
          </p>

          <SoftCta />
        </div>
      </div>
    </>
  );
};

export default Glosario;
