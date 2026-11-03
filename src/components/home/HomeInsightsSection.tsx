import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { INSIGHTS } from "@/content/selfcheck";

/** Figures from Stratum PR's NSF I-Corps interviews, on a dark band, leading into the self-check. */
export function HomeInsightsSection() {
  const { t, language } = useLanguage();
  const lang = language === "es" ? "es" : "en";

  return (
    <section className="bg-topo-deep py-16 text-white md:py-24 entrance-animation" aria-labelledby="insights-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <h2
            id="insights-heading"
            className="max-w-[18ch] font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]"
          >
            {t("home.insights.title")}
          </h2>
          <p className="max-w-[32ch] font-telegraf text-[15px] text-white/65">{t("home.insights.source")}</p>
        </div>

        <ul className="grid grid-cols-2 gap-y-8 lg:grid-cols-5 lg:gap-y-10">
          {INSIGHTS.map((ins) => (
            <li key={ins.pct} className="border-l border-white/20 px-4 last:col-span-2 sm:px-6 lg:last:col-span-1">
              <p className="mb-2 font-telegraf text-[44px] font-bold leading-none tracking-[-0.04em] text-[#E6E09E] sm:mb-3 sm:text-[64px]">
                {ins.pct}
                <span className="text-[24px] sm:text-[32px]">%</span>
              </p>
              <p className="font-telegraf text-[15px] leading-snug text-white/85 sm:text-[17px]">{ins.text[lang]}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center md:mt-14">
          <Link
            to="/autoevaluacion"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#E6E09E] px-5 font-telegraf text-base font-bold sm:w-auto sm:px-7 sm:text-lg text-[#141d5c] transition-colors hover:bg-white"
          >
            {t("home.insights.cta")}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
