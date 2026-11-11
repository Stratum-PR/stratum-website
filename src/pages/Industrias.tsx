import { Link } from "@/components/LocalizedLink";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import { SECTORS, SECTORS_INDEX_PATH, SECTORS_VERIFIED_ON, sectorPath } from "@/content/sectors";

const COPY = {
  es: {
    title: "Reglas de inocuidad por industria en Puerto Rico",
    metaTitle: "Reglas de inocuidad por industria en PR | Stratum PR",
    description:
      "Qué reglas federales de inocuidad aplican a tu planta en Puerto Rico según lo que produces: jugos, mariscos, acidificados, panaderías, café, carnes y almacenes.",
    lead:
      "Las reglas de inocuidad que te aplican dependen de lo que produces. La mayoría de las plantas de alimentos en Puerto Rico caen bajo la regla de controles preventivos de la FDA (21 CFR 117), pero los jugos, los pescados y mariscos, los alimentos acidificados y enlatados, y las carnes y aves tienen reglas propias. Escoge tu industria para ver qué exige cada regla, con enlaces al texto oficial.",
    verified: "Fuentes verificadas el",
  },
  en: {
    title: "Food safety rules by industry in Puerto Rico",
    metaTitle: "Food safety rules by industry in PR | Stratum PR",
    description:
      "Which federal food safety rules apply to your plant in Puerto Rico based on what you make: juice, seafood, acidified foods, bakery, coffee, meat, warehouses.",
    lead:
      "The food safety rules that apply to you depend on what you make. Most food plants in Puerto Rico fall under FDA’s preventive controls rule (21 CFR 117), but juice, seafood, acidified and canned foods, and meat and poultry have rules of their own. Pick your industry to see what each rule requires, with links to the official text.",
    verified: "Sources verified on",
  },
};

/** Index of industry pages: one link per sector. */
const Industrias = () => {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const path = SECTORS_INDEX_PATH[lang];
  const base = getPublicBaseUrl();
  const url = base + path;
  const route: DiscoverableRoute = {
    path,
    title: COPY.es.metaTitle,
    description: COPY.es.description,
    titleEn: COPY.en.metaTitle,
    descriptionEn: COPY.en.description,
    indexable: true,
    changefreq: "monthly",
    priority: 0.8,
  };

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: c.title,
        description: c.description,
        url,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: SECTORS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s[lang].title,
            url: base + sectorPath(s, lang),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stratum PR", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: c.title, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="industrias-heading">
          <div className="mx-auto max-w-3xl">
            <h1 id="industrias-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {c.title}
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{c.lead}</p>

          <ul className="mt-10 space-y-4">
            {SECTORS.map((s) => (
              <li key={s.id}>
                <Link
                  to={sectorPath(s, lang)}
                  className="group block rounded-2xl border border-primary/10 bg-white px-5 py-5 transition-colors hover:border-primary/30 md:px-6"
                >
                  <h2 className="flex items-start justify-between gap-3 font-telegraf text-lg font-bold text-primary md:text-xl">
                    <span>{s[lang].title}</span>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                  </h2>
                  <p className="mt-2 max-w-[68ch] font-telegraf text-sm leading-relaxed text-neutral-700 md:text-base">{s[lang].description}</p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-telegraf text-xs text-neutral-500">
            {c.verified} {SECTORS_VERIFIED_ON[lang]}.
          </p>

          <SoftCta />
        </div>
      </div>
    </>
  );
};

export default Industrias;
