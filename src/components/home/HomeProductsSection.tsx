import { useState } from "react";
import { BellRing } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ALERTAS_URL } from "@/constants/links";

// Sample screens of the platform (a fictional plant), in public/img/platform/
const PLATFORM_SHOTS = ["tablero", "alertas", "lotes", "haccp", "suplidores", "ingredientes", "documentos", "acciones"] as const;
type PlatformShot = (typeof PLATFORM_SHOTS)[number];

/** Showcase of the platform for plant owners, then Alertas PR (the free public site) as its own pill. */
export function HomeProductsSection() {
  const { t } = useLanguage();
  const [shot, setShot] = useState<PlatformShot>("tablero");

  return (
    <section id="productos" className="scroll-mt-20 bg-[#FAFAF8] pb-20 pt-16 md:pb-28 md:pt-24 entrance-animation" aria-labelledby="products-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div id="plataforma" className="scroll-mt-24">
          <h2
            id="products-heading"
            className="font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance] text-primary"
          >
            {t("home.products.title")}
          </h2>

          <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-10">
            {/* Screens: a vertical list with the active one's caption on desktop; a swipeable row of tabs on phones */}
            <div
              role="group"
              aria-label={t("home.products.scan.shots.label")}
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:overflow-visible lg:px-0"
            >
              {PLATFORM_SHOTS.map((id) => {
                const on = shot === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setShot(id)}
                    className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-5 font-telegraf text-base font-semibold transition-colors lg:mb-1 lg:block lg:w-full lg:whitespace-normal lg:rounded-2xl lg:px-4 lg:py-3 lg:text-left lg:text-[17px] ${
                      on
                        ? "bg-primary text-white lg:bg-white lg:font-bold lg:text-primary lg:shadow-[0_10px_30px_-14px_rgba(30,43,126,0.4)]"
                        : "bg-[#F0F2FE] text-primary hover:bg-[#E1E5FD] lg:bg-transparent lg:text-neutral-500 lg:hover:bg-white/70 lg:hover:text-primary"
                    }`}
                  >
                    {t(`home.products.scan.shots.${id}.tab`)}
                    {on && (
                      <span className="mt-1.5 hidden font-telegraf text-[15px] font-normal leading-snug text-neutral-600 lg:block">
                        {t(`home.products.scan.shots.${id}.caption`)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* On phones and tablets the caption sits under the tabs */}
            <p className="mt-4 font-telegraf text-base text-neutral-700 lg:hidden" aria-live="polite">
              {t(`home.products.scan.shots.${shot}.caption`)}
            </p>

            <img
              key={shot}
              src={`/img/platform/${shot}.webp`}
              srcSet={`/img/platform/${shot}-960.webp 960w, /img/platform/${shot}.webp 1600w`}
              sizes="(min-width: 1152px) 810px, 100vw"
              width={1600}
              height={875}
              loading="lazy"
              decoding="async"
              alt={t(`home.products.scan.shots.${shot}.alt`)}
              className="mt-5 block h-auto w-full rounded-2xl shadow-[0_30px_70px_-20px_rgba(30,43,126,0.35),0_0_0_1px_rgba(30,43,126,0.08)] lg:mt-0"
            />
          </div>
        </div>

        {/* Alertas PR: the free public site, its own pill */}
        <div className="mt-10 md:mt-12">
          <div className="flex flex-col items-start gap-5 rounded-[2rem] bg-topo px-6 py-7 text-white md:flex-row md:items-center md:gap-7 md:rounded-full md:py-7 md:pl-7 md:pr-8">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E6E09E] text-primary md:h-[76px] md:w-[76px]" aria-hidden>
              <BellRing className="h-8 w-8" />
            </span>
            <div className="flex-1">
              <p className="mb-1.5 font-telegraf text-xs font-bold uppercase tracking-[0.12em] text-[#E6E09E] md:text-[13px]">
                {t("home.products.alerts.badge")}
              </p>
              <h3 className="font-telegraf text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold leading-tight">{t("home.products.alerts.title")}</h3>
              <p className="mt-1.5 font-telegraf text-base leading-relaxed text-white/80">{t("home.products.alerts.body")}</p>
            </div>
            <a
              href={ALERTAS_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#E6E09E] px-7 py-4 font-telegraf text-lg font-bold text-primary transition-colors hover:bg-white md:w-auto"
            >
              {t("home.products.alerts.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
