import { useState } from "react";
import { ArrowRight, BellRing, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

// Sample screens of the platform (a fictional plant), in public/img/platform/
const PLATFORM_SHOTS = ["hoy", "alerta", "traza"] as const;
type PlatformShot = (typeof PLATFORM_SHOTS)[number];

export function HomeProductsSection() {
  const { t } = useLanguage();
  const [shot, setShot] = useState<PlatformShot>("hoy");

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

        {/* The platform: sample screens (fictional plant) with tabs */}
        <div id="plataforma" className="mt-6 scroll-mt-24 rounded-3xl border border-neutral-200 bg-white px-5 py-8 shadow-[0_20px_50px_rgba(30,43,126,0.08)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-telegraf text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight text-primary">
                {t("home.products.scan.title")}
              </h3>
              <p className="mt-3 font-telegraf text-base leading-relaxed text-neutral-600 md:text-lg">{t("home.products.scan.body")}</p>
              <p className="mt-3 flex items-center gap-2 font-telegraf text-sm font-semibold text-[#14532f]">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
                {t("home.products.scan.data")}
              </p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-telegraf text-lg font-semibold text-white transition-colors hover:bg-secondary sm:w-auto"
            >
              {t("home.products.scan.cta")}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>

          <div role="group" aria-label={t("home.products.scan.shots.label")} className="mt-8 flex flex-wrap gap-2">
            {PLATFORM_SHOTS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={shot === id}
                onClick={() => setShot(id)}
                className={`min-h-[44px] rounded-full px-5 font-telegraf text-base font-semibold transition-colors ${
                  shot === id ? "bg-primary text-white" : "bg-[#F0F2FE] text-primary hover:bg-[#E1E5FD]"
                }`}
              >
                {t(`home.products.scan.shots.${id}.tab`)}
              </button>
            ))}
          </div>
          <p className="mt-4 font-telegraf text-base text-neutral-700" aria-live="polite">
            {t(`home.products.scan.shots.${shot}.caption`)}
          </p>

          {/* Browser frame around the screen */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-[#F6F6F2] shadow-[0_24px_60px_rgba(30,43,126,0.14)]">
            <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-white px-4 py-2.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
            </div>
            <img
              key={shot}
              src={`/img/platform/${shot}.webp`}
              srcSet={`/img/platform/${shot}-960.webp 960w, /img/platform/${shot}.webp 1600w`}
              sizes="(min-width: 1152px) 1056px, 100vw"
              width={1600}
              height={875}
              loading="lazy"
              decoding="async"
              alt={t(`home.products.scan.shots.${shot}.alt`)}
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
