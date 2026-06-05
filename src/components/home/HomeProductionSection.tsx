import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";

type HomeProductionSectionProps = {
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  headingId?: string;
};

export function HomeProductionSection({
  titleKey = "home.production.title",
  subtitleKey = "home.production.subtitle",
  ctaKey = "home.production.cta",
  headingId = "production-heading",
}: HomeProductionSectionProps = {}) {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-primary py-20 md:py-28 entrance-animation"
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-0 h-full w-[220%] opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            transform: "translateX(-50%) perspective(520px) rotateX(62deg)",
            transformOrigin: "center 0%",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id={headingId}
          className="font-telegraf text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white"
        >
          {t(titleKey)}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-telegraf text-base leading-relaxed text-white/70 md:text-lg">
          {t(subtitleKey)}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3.5 font-telegraf text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
        >
          {t(ctaKey)}
        </a>
      </div>
    </section>
  );
}
