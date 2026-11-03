import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import type { DiscoverableRoute } from "@/config/discoverable-routes";
import { LEGAL_UPDATED, type LegalDoc } from "@/content/legal";

/** Shared layout for the Privacy, Cookie and Terms pages; the text lives in src/content/legal.ts. */
export function LegalPage({
  route,
  doc,
  action,
}: {
  route: DiscoverableRoute;
  doc: { es: LegalDoc; en: LegalDoc };
  /** Optional control shown under the intro (e.g. the cookie-preferences button) */
  action?: ReactNode;
}) {
  const { t, language } = useLanguage();
  const lang = language === "es" ? "es" : "en";
  const d = doc[lang];

  return (
    <>
      <PageMeta route={route} />
      <section className="bg-topo px-4 pb-14 pt-28 text-white md:pt-32" aria-labelledby="legal-heading">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-[#E6E09E]">{t("legal.eyebrow")}</p>
          <h1 id="legal-heading" className="font-telegraf text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {d.title}
          </h1>
          <p className="mt-4 font-telegraf text-sm text-white/70">
            {t("legal.updated")} {LEGAL_UPDATED[lang]}
          </p>
        </div>
      </section>

      <div className="bg-[#FAFAF8] px-4 py-14 md:py-20">
        <article className="mx-auto max-w-3xl font-telegraf text-[17px] leading-relaxed text-neutral-700">
          <p className="mb-8 text-lg text-[#0b1215]">{d.intro}</p>
          {action && <div className="mb-10">{action}</div>}
          {d.sections.map((s, i) => (
            <section key={s.heading} className="mb-10 border-t border-primary/10 pt-8">
              <h2 className="mb-4 text-xl font-bold text-[#0b1215] md:text-2xl">
                <span className="mr-2 text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.bullets && (
                <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-primary">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {s.table && (
                <div className="mb-4 overflow-x-auto rounded-2xl border border-primary/10 bg-white">
                  <table className="w-full min-w-[560px] text-left text-[15px]">
                    <thead>
                      <tr className="bg-[#F0F2FE]">
                        {s.table.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-bold text-[#0b1215]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-primary/10 align-top">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold text-[#0b1215]" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
