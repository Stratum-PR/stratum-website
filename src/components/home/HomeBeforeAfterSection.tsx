import { useLanguage } from "@/contexts/LanguageContext";
import { HubDiagram } from "./HubDiagram";

const ROWS = [1, 2, 3, 4, 5] as const;

export function HomeBeforeAfterSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 md:py-24 entrance-animation" aria-labelledby="result-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="result-heading"
          className="text-center font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
        >
          {t("home.result.title")}
        </h2>
        <p className="mb-6 mt-3 text-center font-telegraf text-lg text-neutral-600 md:mb-10">{t("home.result.subtitle")}</p>

        <div className="mb-8 md:mb-12">
          <HubDiagram />
        </div>

        <table className="hidden w-full table-fixed overflow-hidden rounded-2xl font-telegraf shadow-[0_10px_40px_rgba(30,43,126,0.12)] md:table">
          <thead>
            <tr>
              <th scope="col" className="bg-[#FAFAF8] px-5 py-5 text-left text-lg font-bold text-neutral-600 md:px-8">
                {t("home.result.before")}
              </th>
              <th scope="col" className="bg-primary px-5 py-5 text-left text-lg font-bold text-white md:px-8">
                {t("home.result.after")}
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((n) => (
              <tr key={n} className="border-t border-[#eceef3]">
                <td className="bg-[#FAFAF8] px-5 py-5 align-top text-base leading-snug text-neutral-600 md:px-8 md:text-lg">
                  {t(`home.result.row${n}.before`)}
                </td>
                <td className="bg-white px-5 py-5 align-top text-base font-semibold leading-snug text-primary md:px-8 md:text-lg">
                  {t(`home.result.row${n}.after`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: each before/after pair as its own card instead of a cramped two-column table */}
        <ul className="space-y-3 font-telegraf md:hidden">
          {ROWS.map((n) => (
            <li
              key={n}
              className="overflow-hidden rounded-2xl border border-[#eceef3] bg-white shadow-[0_6px_24px_rgba(30,43,126,0.08)]"
            >
              <div className="bg-[#FAFAF8] px-5 py-3.5">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
                  {t("home.result.before")}
                </p>
                <p className="text-[15px] leading-snug text-neutral-500 line-through decoration-neutral-400">
                  {t(`home.result.row${n}.before`)}
                </p>
              </div>
              <div className="border-t border-[#eceef3] px-5 py-3.5">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                  {t("home.result.after")}
                </p>
                <p className="text-base font-semibold leading-snug text-primary">{t(`home.result.row${n}.after`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
