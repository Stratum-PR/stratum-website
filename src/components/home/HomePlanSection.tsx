import { useLanguage } from "@/contexts/LanguageContext";

const STEPS = [
  { titleKey: "home.plan.step1.title", bodyKey: "home.plan.step1.body" },
  { titleKey: "home.plan.step2.title", bodyKey: "home.plan.step2.body" },
  { titleKey: "home.plan.step3.title", bodyKey: "home.plan.step3.body" },
] as const;

export function HomePlanSection() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-primary-50 py-16 md:py-24 entrance-animation"
      aria-labelledby="plan-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="plan-heading"
          className="font-telegraf text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-primary"
        >
          {t("home.plan.title")}
        </h2>

        <ol className="mt-12 space-y-10 md:space-y-14">
          {STEPS.map(({ titleKey, bodyKey }, index) => (
            <li key={titleKey} className="flex gap-6 md:gap-10">
              <span
                className="font-telegraf shrink-0 text-[clamp(3.5rem,10vw,5.5rem)] font-bold leading-none tabular-nums text-primary"
                aria-hidden
              >
                {index + 1}
              </span>
              <div className="pt-1 md:pt-2">
                <h3 className="font-telegraf text-xl font-semibold leading-snug text-primary md:text-2xl">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 font-telegraf text-base leading-relaxed text-gray-600 md:text-lg">
                  {t(bodyKey)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
