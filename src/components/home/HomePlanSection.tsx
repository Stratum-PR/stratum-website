import { useLanguage } from "@/contexts/LanguageContext";
import { CALENDLY_URL } from "@/constants/links";

const STEPS = [
  { titleKey: "home.plan.step1.title", bodyKey: "home.plan.step1.body", dot: "bg-primary" },
  { titleKey: "home.plan.step2.title", bodyKey: "home.plan.step2.body", dot: "bg-[#5FA3DA]" },
  { titleKey: "home.plan.step3.title", bodyKey: "home.plan.step3.body", dot: "bg-[#D9CF6E]" },
] as const;

export function HomePlanSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white pb-16 pt-8 md:pb-24 md:pt-12 entrance-animation" aria-labelledby="plan-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2
            id="plan-heading"
            className="max-w-[22ch] font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
          >
            {t("home.plan.title")}
          </h2>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-7 py-3.5 sm:w-auto font-telegraf text-base font-bold text-white transition-colors hover:bg-secondary"
          >
            {t("home.hero.cta.primary")} →
          </a>
        </div>

        <ol className="relative grid gap-6 md:grid-cols-3 md:gap-10">
          {/* the line that joins the three steps on wide screens */}
          <span
            className="absolute left-0 right-0 top-[71px] hidden h-px bg-gradient-to-r from-primary via-[#5FA3DA] to-[#E6E09E] md:block"
            aria-hidden
          />
          {STEPS.map(({ titleKey, bodyKey, dot }, index) => (
            <li key={titleKey} className="relative grid grid-cols-[auto_1fr] gap-x-4 md:block">
              <span
                className="row-span-3 mb-0 block font-telegraf text-[40px] font-bold md:mb-4 md:text-[56px] leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#1E2B7E]"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`relative -top-[7px] mb-4 hidden h-3.5 w-3.5 rounded-full shadow-[0_0_0_6px_#fff] md:block ${dot}`} aria-hidden />
              <h3 className="mb-1.5 font-telegraf text-xl font-bold text-[#0b1215]">{t(titleKey)}</h3>
              <p className="font-telegraf text-base leading-relaxed text-neutral-600">{t(bodyKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
