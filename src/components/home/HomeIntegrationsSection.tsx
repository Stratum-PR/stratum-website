import { useLanguage } from "@/contexts/LanguageContext";
import { IntegrationOrbitGraphic } from "@/components/home/IntegrationOrbitGraphic";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";

export function HomeIntegrationsSection() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-white py-16 md:py-24 entrance-animation"
      aria-labelledby="integrations-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <h2
            id="integrations-heading"
            className="font-telegraf text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-neutral-950"
          >
            {t("home.integrations.title")}
          </h2>
          <p className="mt-5 font-telegraf text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("home.integrations.subtitle")}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3.5 font-telegraf text-base font-semibold text-white transition-colors hover:bg-primary"
          >
            {t("home.integrations.cta")}
          </a>
        </div>

        <div className="flex min-h-[20rem] items-center justify-center rounded-[2rem] border border-primary/10 bg-secondary-50 p-8 sm:min-h-[24rem] sm:p-10 md:rounded-[2.5rem] md:p-12">
          <IntegrationOrbitGraphic />
        </div>
      </div>
    </section>
  );
}
