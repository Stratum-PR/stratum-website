import { Link } from "@/components/LocalizedLink";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import { TEMPLATES, TEMPLATES_INDEX_PATH, TEMPLATES_VERIFIED_ON, templatePath } from "@/content/templates";

const COPY = {
  es: {
    h1: "Plantillas gratis de registros de inocuidad",
    lead:
      "Formularios en blanco para imprimir y llenar a mano, escritos en español para las reglas federales de la FDA. Cada plantilla explica qué pide la regla, cómo usar la hoja y enlaza al texto oficial del reglamento.",
    open: "Ver e imprimir",
    verified: "Fuentes verificadas el",
    metaTitle: "Plantillas gratis de registros de inocuidad | Stratum PR",
    metaDescription:
      "Plantillas gratis para imprimir: monitoreo HACCP y de saneamiento, registros de recibo y envío FSMA 204 y simulacro de retiro, con fuentes de la FDA.",
    breadcrumb: "Plantillas",
  },
  en: {
    h1: "Free food safety record templates",
    lead:
      "Blank forms to print and fill in by hand, written for FDA's federal rules in Spanish and English. Each template explains what the rule asks for, how to use the sheet, and links to the official regulatory text.",
    open: "View and print",
    verified: "Sources verified on",
    metaTitle: "Free food safety record templates | Stratum PR",
    metaDescription:
      "Free printable templates: HACCP and sanitation monitoring logs, FSMA 204 receiving and shipping KDE sheets, and a mock recall checklist, with FDA sources.",
    breadcrumb: "Templates",
  },
};

/** Index of the free record templates, at /plantillas (es) and /en/templates (en). */
const Plantillas = () => {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const path = TEMPLATES_INDEX_PATH[lang];
  const url = getPublicBaseUrl() + path;

  const route: DiscoverableRoute = {
    path,
    title: c.metaTitle,
    description: c.metaDescription,
    titleEn: COPY.en.metaTitle,
    descriptionEn: COPY.en.metaDescription,
    changefreq: "monthly",
    priority: 0.7,
  };

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: c.h1,
        description: c.metaDescription,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: TEMPLATES.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t[lang].title,
            url: getPublicBaseUrl() + templatePath(t, lang),
          })),
        },
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
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="plantillas-heading">
          <div className="mx-auto max-w-3xl">
            <h1 id="plantillas-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {c.h1}
            </h1>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{c.lead}</p>

          <ul className="mt-10 space-y-4">
            {TEMPLATES.map((t) => (
              <li key={t.id}>
                <Link
                  to={templatePath(t, lang)}
                  className="group flex gap-4 rounded-2xl border border-primary/10 bg-white p-5 transition-colors hover:border-primary/30 md:p-6"
                >
                  <FileText className="mt-1 h-6 w-6 flex-none text-secondary" aria-hidden />
                  <span>
                    <span className="block font-telegraf text-lg font-bold text-primary group-hover:underline">{t[lang].title}</span>
                    <span className="mt-1 block font-telegraf text-sm leading-relaxed text-neutral-700">{t[lang].description}</span>
                    <span className="mt-2 block font-telegraf text-sm font-medium text-secondary">{c.open} →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-telegraf text-xs text-neutral-500">
            {c.verified} {TEMPLATES_VERIFIED_ON[lang]}.
          </p>

          <SoftCta />
        </article>
      </div>
    </>
  );
};

export default Plantillas;
