import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CALENDLY_URL } from "@/constants/links";

export function HomeFinalCtaSection() {
  const { t } = useLanguage();

  return (
    <section id="noticias" className="scroll-mt-16 bg-topo px-4 py-12 text-center text-white md:py-16" aria-labelledby="final-cta-heading">
      <h2 id="final-cta-heading" className="mb-8 font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]">
        {t("home.finalCta.title")}
      </h2>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 font-telegraf text-lg font-semibold text-primary transition-colors hover:bg-[#E6E09E] sm:w-auto"
      >
        {t("home.hero.cta.primary")}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </a>
    </section>
  );
}
