import { ArrowRight, BellRing, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

export function HomeProductsSection() {
  const { t } = useLanguage();

  return (
    <section id="productos" className="scroll-mt-20 bg-[#FAFAF8] py-16 md:py-24 entrance-animation" aria-labelledby="products-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="products-heading"
          className="mb-10 text-center font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
        >
          {t("home.products.title")}
        </h2>

        {/* Alertas PR: free public portal, given the most room */}
        <div className="relative overflow-hidden rounded-3xl bg-topo px-5 py-8 text-white md:px-12 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-telegraf text-sm font-semibold text-[#E6E09E]">
                <BellRing className="h-4 w-4" aria-hidden />
                {t("home.products.alerts.badge")}
              </p>
              <h3 className="font-telegraf text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">
                {t("home.products.alerts.title")}
              </h3>
              <p className="mt-3 font-telegraf text-base leading-relaxed text-white/80 md:text-lg">
                {t("home.products.alerts.body")}
              </p>
            </div>
            <a
              href={ALERTAS_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#E6E09E] sm:w-auto px-8 py-4 font-telegraf text-lg font-bold text-primary transition-colors hover:bg-white"
            >
              {t("home.products.alerts.cta")}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#FAFAF8] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <h3 className="font-telegraf text-xl font-bold text-primary">{t("home.products.scan.title")}</h3>
            <p className="mt-1 font-telegraf text-base text-neutral-600">{t("home.products.scan.body")}</p>
            <p className="mt-3 flex items-center gap-2 font-telegraf text-sm font-semibold text-[#14532f]">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
              {t("home.products.scan.data")}
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 font-telegraf font-semibold text-primary hover:text-secondary"
          >
            {t("home.products.scan.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
