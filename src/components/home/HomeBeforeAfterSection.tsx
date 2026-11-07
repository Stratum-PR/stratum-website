import { useLanguage } from "@/contexts/LanguageContext";
import { HubDiagram } from "./HubDiagram";

export function HomeBeforeAfterSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white pb-8 pt-16 md:pb-12 md:pt-24 entrance-animation" aria-labelledby="result-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="result-heading"
          className="text-center font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
        >
          {t("home.result.title")}
        </h2>
        <p className="mb-6 mt-3 text-center font-telegraf text-lg text-neutral-600 md:mb-10">{t("home.result.subtitle")}</p>

        <HubDiagram />
      </div>
    </section>
  );
}
