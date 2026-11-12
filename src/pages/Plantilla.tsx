import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { ChevronLeft, ExternalLink, FileDown, FileSpreadsheet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import { TEMPLATES_INDEX_PATH, TEMPLATES_VERIFIED_ON, templateBySlug, templateDownloadPath, templatePath, type Template, type TemplateLang } from "@/content/templates";
import NotFound from "./NotFound";

const COPY = {
  es: {
    back: "Todas las plantillas",
    index: "Plantillas",
    howTo: "Cómo usar esta plantilla",
    legal: "Qué dice la regla",
    sources: "Fuentes oficiales",
    verified: "Fuentes verificadas el",
    form: "Vista previa del formulario",
    downloadPdf: "Descargar PDF",
    downloadXlsx: "Descargar Excel",
    downloadHint: "PDF listo para imprimir en papel carta horizontal, con las instrucciones en la segunda página. Excel para llenarlo en la computadora.",
    company: "Empresa / planta",
    location: "Ubicación (dirección)",
    product: "Producto / área / línea",
    period: "Período (desde / hasta)",
    sheet: "Hoja ____ de ____",
    footer: "Plantilla gratis de stratumpr.com. Ajústala a tu plan de inocuidad; no lo sustituye.",
  },
  en: {
    back: "All templates",
    index: "Templates",
    howTo: "How to use this template",
    legal: "What the rule says",
    sources: "Official sources",
    verified: "Sources verified on",
    form: "Form preview",
    downloadPdf: "Download PDF",
    downloadXlsx: "Download Excel",
    downloadHint: "PDF ready to print on landscape letter paper, with the instructions on page two. Excel to fill in on a computer.",
    company: "Company / facility",
    location: "Location (address)",
    product: "Product / area / line",
    period: "Period (from / to)",
    sheet: "Sheet ____ of ____",
    footer: "Free template from stratumpr.com. Adapt it to your food safety plan; it does not replace it.",
  },
};

/**
 * Download links to the PDF and Excel files that scripts/generate-template-files.ts builds into
 * dist/ from templates.ts. Plain links (no JS), so they work prerendered and before hydration.
 */
const DownloadButtons = ({ template, lang, onDark = false }: { template: Template; lang: TemplateLang; onDark?: boolean }) => {
  const c = COPY[lang];
  const base =
    "inline-flex items-center gap-2 rounded-xl px-5 py-3 font-telegraf text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2";
  const primary = onDark ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90";
  const secondary = onDark
    ? "border border-white/60 text-white hover:bg-white/10"
    : "border border-primary/30 bg-white text-primary hover:border-primary/60";
  const pdf = templateDownloadPath(template, lang, "pdf");
  const xlsx = templateDownloadPath(template, lang, "xlsx");
  return (
    <div className="flex flex-wrap gap-3">
      <a href={pdf} download={pdf.split("/").pop()} type="application/pdf" className={`${base} ${primary}`}>
        <FileDown className="h-4 w-4" aria-hidden />
        {c.downloadPdf}
      </a>
      <a
        href={xlsx}
        download={xlsx.split("/").pop()}
        type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className={`${base} ${secondary}`}
      >
        <FileSpreadsheet className="h-4 w-4" aria-hidden />
        {c.downloadXlsx}
      </a>
    </div>
  );
};

/** One printable record template at /plantillas/<es slug> or /en/templates/<en slug>. */
const Plantilla = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = COPY[lang];
  const template = templateBySlug(slug);
  if (!template) return <NotFound />;

  const t = template[lang];
  const path = templatePath(template, lang);
  const indexPath = TEMPLATES_INDEX_PATH[lang];
  const base = getPublicBaseUrl();
  const url = base + path;

  const route: DiscoverableRoute = {
    path,
    title: template.es.metaTitle,
    description: template.es.description,
    titleEn: template.en.metaTitle,
    descriptionEn: template.en.description,
    changefreq: "monthly",
    priority: 0.6,
  };

  const prefilled = t.prefilledRows ?? [];
  const rowCount = Math.max(template.rowsToPrint, prefilled.length);
  const rows = Array.from({ length: rowCount }, (_, i) => prefilled[i] ?? "");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DigitalDocument",
        "@id": `${url}#template`,
        name: t.title,
        headline: t.title,
        description: t.description,
        url,
        mainEntityOfPage: url,
        inLanguage: lang === "es" ? "es-PR" : "en-US",
        isAccessibleForFree: true,
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        author: { "@id": "https://www.stratumpr.com/#organization" },
        publisher: { "@id": "https://www.stratumpr.com/#organization" },
        citation: template.sources.map((s) => s.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stratum PR", item: "https://www.stratumpr.com/" },
          { "@type": "ListItem", position: 2, name: c.index, item: base + indexPath },
          { "@type": "ListItem", position: 3, name: t.title, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="plantilla-heading">
          <div className="mx-auto max-w-3xl">
            <Link to={indexPath} className="mb-6 inline-flex items-center gap-1 font-telegraf text-sm text-white/80 underline-offset-2 hover:underline">
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {c.back}
            </Link>
            <h1 id="plantilla-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {t.title}
            </h1>
            <div className="mt-8">
              <DownloadButtons template={template} lang={lang} onDark />
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{t.lead}</p>

          <section className="mt-10" aria-labelledby="howto-heading">
            <h2 id="howto-heading" className="font-telegraf text-xl font-bold text-primary md:text-2xl">
              {c.howTo}
            </h2>
            <ol className="mt-3 max-w-[68ch] list-decimal space-y-1.5 pl-5 font-telegraf text-base leading-relaxed text-neutral-700">
              {t.howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mt-10" aria-labelledby="legal-heading">
            <h2 id="legal-heading" className="font-telegraf text-xl font-bold text-primary md:text-2xl">
              {c.legal}
            </h2>
            <ul className="mt-3 max-w-[68ch] list-disc space-y-2 pl-5 font-telegraf text-base leading-relaxed text-neutral-700">
              {t.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>

          <div className="mt-8 border-t border-primary/10 pt-6">
            <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sources}</h2>
            <ul>
              {template.sources.map((s) => (
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
              {c.verified} {TEMPLATES_VERIFIED_ON[lang]}.
            </p>
          </div>
        </article>

        <section className="mx-auto max-w-6xl px-4" aria-labelledby="form-heading">
          <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-3">
            <div className="max-w-md">
              <h2 id="form-heading" className="font-telegraf text-xl font-bold text-primary md:text-2xl">
                {c.form}
              </h2>
              <p className="mt-1 font-telegraf text-sm text-neutral-500">{c.downloadHint}</p>
            </div>
            <DownloadButtons template={template} lang={lang} />
          </div>

          <div
            id="plantilla-form"
            className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 font-telegraf text-[#0b1215] md:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1e2b7e] pb-2">
              <p className="text-base font-bold text-[#1e2b7e]">{t.title}</p>
              <p className="text-xs text-neutral-600">{c.sheet}</p>
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {[c.company, c.location, c.product, c.period].map((label) => (
                <div key={label} className="flex items-end gap-2">
                  <dt className="whitespace-nowrap font-medium">{label}:</dt>
                  <dd className="h-6 flex-1 border-b border-neutral-400" />
                </div>
              ))}
            </dl>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[56rem] border-collapse text-left text-xs">
                <thead>
                  <tr>
                    <th scope="col" className="w-8 border border-neutral-400 bg-neutral-100 px-1.5 py-1.5 text-center font-bold">
                      #
                    </th>
                    {t.columns.map((col) => (
                      <th key={col} scope="col" className="border border-neutral-400 bg-neutral-100 px-1.5 py-1.5 align-bottom font-bold leading-tight">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((first, i) => (
                    <tr key={i} className="h-9">
                      <td className="border border-neutral-400 px-1.5 text-center text-neutral-500">{i + 1}</td>
                      {t.columns.map((col, j) => (
                        <td key={col} className="border border-neutral-400 px-1.5 py-1 align-top leading-tight">
                          {j === 0 ? first : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 text-sm sm:grid-cols-2">
              {t.signoff.map((label) => (
                <div key={label} className="flex items-end gap-2">
                  <span className="font-medium sm:whitespace-nowrap">{label}:</span>
                  <span className="h-6 min-w-[4rem] flex-1 border-b border-neutral-400" />
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-neutral-500">
              {c.footer} {template.sources.slice(0, 3).map((s) => s.label.split(" (")[0]).join(" · ")}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 pb-12 md:pb-16">
          <SoftCta />
        </div>
      </div>
    </>
  );
};

export default Plantilla;
