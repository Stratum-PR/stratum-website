import { ChevronLeft, ExternalLink } from "lucide-react";
import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SoftCta } from "@/components/SoftCta";
import { getPublicBaseUrl, type DiscoverableRoute } from "@/config/discoverable-routes";
import {
  INSPECTIONS_PR_COPY,
  INSPECTIONS_PR_DATA_AS_OF,
  INSPECTIONS_PR_DATASET_URLS,
  INSPECTIONS_PR_PATH,
  INSPECTIONS_PR_SOURCES,
  PR_FOOD_INSPECTIONS_BY_FY,
  PR_FOOD_RECALLS_BY_YEAR,
  PR_INSPECTIONS_TABLE_FY,
  PR_RECALLS_TABLE_YEARS,
  PR_TOP_CITED_SECTIONS,
  type InspectionsSource,
} from "@/content/fda-inspections-pr";

const SRC = INSPECTIONS_PR_SOURCES;
const CLASS_COLORS = { NAI: "bg-emerald-600", VAI: "bg-amber-500", OAI: "bg-red-600" } as const;

const h2 = "font-telegraf text-xl font-bold text-primary md:text-2xl";
const p = "mt-3 max-w-[68ch] font-telegraf text-base leading-relaxed text-neutral-700";
const th = "px-3 py-2 text-left font-semibold text-primary";
const thNum = "px-3 py-2 text-right font-semibold text-primary";
const td = "px-3 py-2 text-left";
const tdNum = "px-3 py-2 text-right tabular-nums";
const tableWrap = "mt-5 overflow-x-auto rounded-2xl border border-primary/10 bg-white";
const table = "w-full border-collapse font-telegraf text-sm text-neutral-800";
const caption = "caption-top px-3 pb-2 pt-3 text-left font-telegraf text-sm font-semibold text-neutral-700";

/** "Datos al <fecha>. Fuente: <link>" line under each table. */
function AsOf({ lang, sources, note }: { lang: "es" | "en"; sources: InspectionsSource[]; note?: string }) {
  const c = INSPECTIONS_PR_COPY[lang];
  return (
    <p className="mt-2 max-w-[68ch] font-telegraf text-xs leading-relaxed text-neutral-500">
      {c.dataAsOf} {INSPECTIONS_PR_DATA_AS_OF[lang]}. {c.sourceLabel}:{" "}
      {sources.map((s, i) => (
        <span key={s.id}>
          {i > 0 && "; "}
          <a href={s.url} target="_blank" rel="noopener" className="text-secondary underline underline-offset-2">
            {s.label[lang]}
          </a>
        </span>
      ))}
      .{note ? ` ${note}` : ""}
    </p>
  );
}

/**
 * Hub page with aggregate public FDA data on food inspections in Puerto Rico, at
 * /inspecciones-fda-puerto-rico (es) and /en/fda-inspections-puerto-rico (en).
 * Aggregates only: no company is named. Numbers and their method: src/content/fda-inspections-pr.ts.
 */
const InspeccionesFda = () => {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "es";
  const c = INSPECTIONS_PR_COPY[lang];
  const path = INSPECTIONS_PR_PATH[lang];
  const base = getPublicBaseUrl();
  const url = base + path;
  const homeUrl = lang === "es" ? `${base}/` : `${base}/en`;
  const inLanguage = lang === "es" ? "es-PR" : "en-US";

  const fyRows = PR_FOOD_INSPECTIONS_BY_FY.filter(
    (r) => r.fiscalYear >= PR_INSPECTIONS_TABLE_FY.from && r.fiscalYear <= PR_INSPECTIONS_TABLE_FY.to,
  );
  const recallRows = PR_FOOD_RECALLS_BY_YEAR.filter((r) => r.year >= PR_RECALLS_TABLE_YEARS.from && r.year <= PR_RECALLS_TABLE_YEARS.to);
  const maxFyTotal = Math.max(...fyRows.map((r) => r.total));
  const maxCited = Math.max(...PR_TOP_CITED_SECTIONS.map((s) => s.inspections));
  const allSources = Object.values(SRC) as InspectionsSource[];

  const route: DiscoverableRoute = {
    path: INSPECTIONS_PR_PATH.es,
    title: INSPECTIONS_PR_COPY.es.metaTitle,
    description: INSPECTIONS_PR_COPY.es.description,
    titleEn: INSPECTIONS_PR_COPY.en.metaTitle,
    descriptionEn: INSPECTIONS_PR_COPY.en.description,
    indexable: true,
    changefreq: "monthly",
    priority: 0.8,
  };

  const org = { "@id": "https://www.stratumpr.com/#organization" };
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: c.title,
        description: c.description,
        url,
        mainEntityOfPage: url,
        inLanguage,
        dateModified: INSPECTIONS_PR_DATA_AS_OF.iso,
        isPartOf: { "@id": "https://www.stratumpr.com/#website" },
        author: org,
        publisher: org,
        citation: allSources.map((s) => s.url),
        hasPart: [{ "@id": `${url}#inspections-dataset` }, { "@id": `${url}#recalls-dataset` }],
      },
      {
        "@type": "Dataset",
        "@id": `${url}#inspections-dataset`,
        name: c.byYear.caption,
        description: `${c.byYear.caption}. ${c.cited.caption}. ${c.method}`,
        url,
        inLanguage,
        creator: org,
        publisher: org,
        isBasedOn: INSPECTIONS_PR_DATASET_URLS.dashboard,
        license: "https://creativecommons.org/licenses/by/4.0/",
        temporalCoverage: `${PR_INSPECTIONS_TABLE_FY.from - 1}-10-01/${PR_INSPECTIONS_TABLE_FY.to}-09-30`,
        spatialCoverage: { "@type": "Place", name: "Puerto Rico" },
        dateModified: INSPECTIONS_PR_DATA_AS_OF.iso,
      },
      {
        "@type": "Dataset",
        "@id": `${url}#recalls-dataset`,
        name: c.recalls.caption,
        description: `${c.recalls.caption}. ${c.recalls.note}`,
        url,
        inLanguage,
        creator: org,
        publisher: org,
        isBasedOn: INSPECTIONS_PR_DATASET_URLS.openfda,
        license: "https://creativecommons.org/licenses/by/4.0/",
        temporalCoverage: `${PR_RECALLS_TABLE_YEARS.from}/${PR_RECALLS_TABLE_YEARS.to}`,
        spatialCoverage: { "@type": "Place", name: "Puerto Rico" },
        dateModified: INSPECTIONS_PR_DATA_AS_OF.iso,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: homeUrl },
          { "@type": "ListItem", position: 2, name: c.title, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageMeta route={route} jsonLd={jsonLd} />
      <div className="bg-[#FAFAF8]">
        <section className="bg-topo px-4 pb-10 pt-24 text-white md:pb-14 md:pt-32" aria-labelledby="inspecciones-heading">
          <div className="mx-auto max-w-3xl">
            <Link to="/preguntas" className="mb-6 inline-flex items-center gap-1 font-telegraf text-sm text-white/80 underline-offset-2 hover:underline">
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {c.back}
            </Link>
            <h1 id="inspecciones-heading" className="font-telegraf text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {c.title}
            </h1>
          </div>
        </section>

        <article lang={inLanguage} className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <p className="max-w-[68ch] font-telegraf text-lg font-medium leading-relaxed text-[#0b1215] md:text-xl">{c.lead}</p>

          {/* What the classifications mean */}
          <section className="mt-12" aria-labelledby="clasificaciones-heading">
            <h2 id="clasificaciones-heading" className={h2}>
              {c.classifications.heading}
            </h2>
            {c.classifications.paragraphs.map((t, i) => (
              <p key={i} className={p}>
                {t}
              </p>
            ))}
            <dl className="mt-4 max-w-[68ch] space-y-4 font-telegraf text-base leading-relaxed text-neutral-700">
              {c.classifications.items.map((it) => (
                <div key={it.code}>
                  <dt className="flex items-center gap-2 font-semibold text-primary">
                    <span className={`h-3 w-3 flex-none rounded-sm ${CLASS_COLORS[it.code]}`} aria-hidden />
                    {it.code}: {it.name}
                  </dt>
                  <dd className="pl-5">{it.text}</dd>
                </div>
              ))}
            </dl>
            <AsOf lang={lang} sources={[SRC.classificationFaq]} />
          </section>

          {/* Inspections by fiscal year */}
          <section className="mt-12" aria-labelledby="por-ano-heading">
            <h2 id="por-ano-heading" className={h2}>
              {c.byYear.heading}
            </h2>
            {c.byYear.paragraphs.map((t, i) => (
              <p key={i} className={p}>
                {t}
              </p>
            ))}
            <div className={tableWrap}>
              <table className={table}>
                <caption className={caption}>{c.byYear.caption}</caption>
                <thead>
                  <tr className="border-b border-primary/10">
                    <th scope="col" className={th}>
                      {c.byYear.colFy}
                    </th>
                    <th scope="col" className={thNum}>
                      NAI
                    </th>
                    <th scope="col" className={thNum}>
                      VAI
                    </th>
                    <th scope="col" className={thNum}>
                      OAI
                    </th>
                    <th scope="col" className={thNum}>
                      {c.byYear.colTotal}
                    </th>
                    <th scope="col" className="hidden w-[35%] px-3 py-2 sm:table-cell">
                      <span className="sr-only">{c.byYear.colTotal}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fyRows.map((r) => (
                    <tr key={r.fiscalYear} className="border-b border-primary/5 last:border-0">
                      <th scope="row" className={`${td} font-medium`}>
                        {r.fiscalYear}
                      </th>
                      <td className={tdNum}>{r.nai}</td>
                      <td className={tdNum}>{r.vai}</td>
                      <td className={tdNum}>{r.oai}</td>
                      <td className={`${tdNum} font-semibold`}>{r.total}</td>
                      <td className="hidden px-3 py-2 sm:table-cell" aria-hidden>
                        <div className="flex h-3 overflow-hidden rounded-sm bg-neutral-100" style={{ width: `${(r.total / maxFyTotal) * 100}%` }}>
                          <div className={CLASS_COLORS.NAI} style={{ width: `${(r.nai / r.total) * 100}%` }} />
                          <div className={CLASS_COLORS.VAI} style={{ width: `${(r.vai / r.total) * 100}%` }} />
                          <div className={CLASS_COLORS.OAI} style={{ width: `${(r.oai / r.total) * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AsOf lang={lang} sources={[SRC.dashboard]} note={c.byYear.note} />
          </section>

          {/* Form 483 */}
          <section className="mt-12" aria-labelledby="f483-heading">
            <h2 id="f483-heading" className={h2}>
              {c.form483.heading}
            </h2>
            {c.form483.paragraphs.map((t, i) => (
              <p key={i} className={p}>
                {t}
              </p>
            ))}
            <AsOf lang={lang} sources={[SRC.faq483]} />
          </section>

          {/* Most cited sections */}
          <section className="mt-12" aria-labelledby="citadas-heading">
            <h2 id="citadas-heading" className={h2}>
              {c.cited.heading}
            </h2>
            {c.cited.paragraphs.map((t, i) => (
              <p key={i} className={p}>
                {t}
              </p>
            ))}
            <div className={tableWrap}>
              <table className={table}>
                <caption className={caption}>{c.cited.caption}</caption>
                <thead>
                  <tr className="border-b border-primary/10">
                    <th scope="col" className={th}>
                      {c.cited.colSection}
                    </th>
                    <th scope="col" className={th}>
                      {c.cited.colTopic}
                    </th>
                    <th scope="col" className={thNum}>
                      {c.cited.colInspections}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PR_TOP_CITED_SECTIONS.map((s) => (
                    <tr key={s.cfr} className="border-b border-primary/5 align-top last:border-0">
                      <th scope="row" className={`${td} whitespace-nowrap font-medium`}>
                        <a href={s.ecfrUrl} target="_blank" rel="noopener" className="text-secondary underline underline-offset-2">
                          {s.cfr}
                        </a>
                      </th>
                      <td className={td}>{s[lang].topic}</td>
                      <td className={tdNum}>
                        <span className="font-semibold">{s.inspections}</span>
                        <span className="mt-1 block h-2 rounded-sm bg-secondary/70" style={{ width: `${(s.inspections / maxCited) * 100}%`, marginLeft: "auto" }} aria-hidden />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AsOf lang={lang} sources={[SRC.dashboard]} note={c.cited.note} />

            <ol className="mt-8 max-w-[68ch] space-y-5 font-telegraf text-base leading-relaxed text-neutral-700">
              {PR_TOP_CITED_SECTIONS.map((s) => (
                <li key={s.cfr}>
                  <h3 className="font-semibold text-primary">
                    {s[lang].topic} ({s.cfr})
                  </h3>
                  <p className="mt-1">{s[lang].plain}</p>
                  <a
                    href={s.ecfrUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-1 inline-flex items-center gap-1 text-sm text-secondary underline-offset-2 hover:underline"
                  >
                    {c.cited.readRule}: {s.cfr}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {/* Recalls */}
          <section className="mt-12" aria-labelledby="retiros-heading">
            <h2 id="retiros-heading" className={h2}>
              {c.recalls.heading}
            </h2>
            {c.recalls.paragraphs.map((t, i) => (
              <p key={i} className={p}>
                {t}
              </p>
            ))}
            <ul className="mt-3 max-w-[68ch] list-disc space-y-1.5 pl-5 font-telegraf text-base leading-relaxed text-neutral-700">
              {c.recalls.classes.map((k) => (
                <li key={k.name}>
                  <strong className="font-semibold text-primary">{k.name}:</strong> {k.text}
                </li>
              ))}
            </ul>
            <div className={tableWrap}>
              <table className={table}>
                <caption className={caption}>{c.recalls.caption}</caption>
                <thead>
                  <tr className="border-b border-primary/10">
                    <th scope="col" className={th}>
                      {c.recalls.colYear}
                    </th>
                    <th scope="col" className={thNum}>
                      {c.recalls.colEvents}
                    </th>
                    <th scope="col" className={thNum}>
                      {c.recalls.colI}
                    </th>
                    <th scope="col" className={thNum}>
                      {c.recalls.colII}
                    </th>
                    <th scope="col" className={thNum}>
                      {c.recalls.colIII}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recallRows.map((r) => (
                    <tr key={r.year} className="border-b border-primary/5 last:border-0">
                      <th scope="row" className={`${td} font-medium`}>
                        {r.year}
                      </th>
                      <td className={`${tdNum} font-semibold`}>{r.events}</td>
                      <td className={tdNum}>{r.classI}</td>
                      <td className={tdNum}>{r.classII}</td>
                      <td className={tdNum}>{r.classIII}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AsOf lang={lang} sources={[SRC.openfda, SRC.recallDefinitions]} note={c.recalls.note} />
          </section>

          {/* How to prepare */}
          <section className="mt-12" aria-labelledby="preparar-heading">
            <h2 id="preparar-heading" className={h2}>
              {c.prepare.heading}
            </h2>
            <p className={p}>{c.prepare.intro}</p>
            <ul className="mt-3 max-w-[68ch] list-disc space-y-2 pl-5 font-telegraf text-base leading-relaxed text-neutral-700">
              {c.prepare.items.map((it, i) => (
                <li key={i}>
                  {it.text}
                  {it.link && (
                    <>
                      {" "}
                      <Link to={it.link.to} className="font-medium text-secondary underline-offset-2 hover:underline">
                        {it.link.label}
                      </Link>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Sources and method */}
          <div className="mt-12 border-t border-primary/10 pt-6">
            <h2 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-neutral-500">{c.sourcesHeading}</h2>
            <ul>
              {allSources.map((s) => (
                <li key={s.id}>
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
            <p className="mt-3 max-w-[68ch] font-telegraf text-xs leading-relaxed text-neutral-500">{c.method}</p>
            <p className="mt-2 font-telegraf text-xs text-neutral-500">
              {c.dataAsOf} {INSPECTIONS_PR_DATA_AS_OF[lang]}.
            </p>
            <p className="mt-2 font-telegraf text-xs text-neutral-500">
              {lang === "es" ? "Puedes usar estas tablas con la licencia " : "You can reuse these tables under "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener license"
                className="text-secondary underline-offset-2 hover:underline"
              >
                CC BY 4.0
              </a>
              {lang === "es" ? " si das crédito a Stratum. Los datos de la FDA son de dominio público." : " if you credit Stratum. The FDA source data is in the public domain."}
            </p>
          </div>

          <SoftCta />
        </article>
      </div>
    </>
  );
};

export default InspeccionesFda;
