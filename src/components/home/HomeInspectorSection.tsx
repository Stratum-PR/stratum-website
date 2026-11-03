import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ASKS = [
  { key: "home.inspector.item1", dot: "bg-primary" },
  { key: "home.inspector.item2", dot: "bg-primary" },
  // the one moment something went wrong, marked in amber
  { key: "home.inspector.item3", dot: "bg-[#A85A00]" },
  { key: "home.inspector.item4", dot: "bg-primary" },
] as const;

/** "Cumplimiento por diseño": the four things an inspector always asks for, today vs. with Stratum. */
export function HomeInspectorSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FAFAF8] py-16 md:py-24 entrance-animation" aria-labelledby="inspector-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 md:mb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-secondary">
              {t("home.inspector.eyebrow")}
            </p>
            <h2
              id="inspector-heading"
              className="max-w-[18ch] font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
            >
              {t("home.inspector.title")}
            </h2>
          </div>
          <p className="max-w-[38ch] font-telegraf text-lg leading-relaxed text-neutral-600 md:text-xl">
            {t("home.inspector.subtitle")}
          </p>
        </div>

        <ol className="relative grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6">
          {/* the line that joins the four requests on wide screens, through the centre of the markers */}
          <span className="absolute left-4 right-4 top-[15px] hidden h-0.5 bg-[#d6dbe8] lg:block" aria-hidden />
          {ASKS.map(({ key, dot }, index) => (
            <li key={key} className="relative flex flex-col">
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-telegraf text-sm font-bold text-white shadow-[0_0_0_6px_#FAFAF8] ${dot}`}
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span className="whitespace-nowrap bg-[#FAFAF8] pr-2 font-telegraf text-xs font-bold uppercase tracking-[0.1em] text-secondary">
                  {t(`${key}.topic`)}
                </span>
              </div>
              <div className="flex flex-1 flex-col rounded-2xl border border-[#e2e5ec] bg-white p-5 sm:p-6">
                <p className="mb-4 font-telegraf text-lg font-semibold sm:mb-5 leading-snug text-[#0b1215]">“{t(`${key}.ask`)}”</p>
                <p className="mb-5 font-telegraf text-[15px] sm:mb-6 leading-relaxed text-[#7a3328]">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#a33a2c]">
                    {t("home.inspector.today")}
                  </span>
                  {t(`${key}.today`)}
                </p>
                <p className="mt-auto flex gap-2.5 rounded-xl bg-[#EEF8F2] px-3.5 py-3 font-telegraf text-[15px] font-semibold leading-snug text-[#14532f]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />
                  <span>
                    <span className="sr-only">{t("home.inspector.withStratum")}: </span>
                    {t(`${key}.stratum`)}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-primary px-6 py-7 text-white md:mt-16 md:flex-row md:items-center md:justify-between md:gap-8 md:px-9">
          <p className="font-telegraf text-lg font-bold leading-snug [text-wrap:balance] md:text-xl">{t("home.inspector.closing")}</p>
          <Link
            to="/autoevaluacion"
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#E6E09E] px-6 font-telegraf text-base font-bold text-[#141d5c] transition-colors hover:bg-white"
          >
            {t("home.inspector.cta")}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
