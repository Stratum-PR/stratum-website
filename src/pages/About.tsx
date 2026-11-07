import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import OptimizedImage from "@/components/OptimizedImage";
import { ABOUT_ROUTE } from "@/config/discoverable-routes";
import { CALENDLY_URL, PLATFORM_URL } from "@/constants/links";

// Programs that back Stratum PR, shown in the band under the intro
const PROGRAMS = [
  { src: "/img/nsf-icorps-color.webp", alt: "NSF I-Corps, Cohorte 21", width: 400, height: 166, className: "h-14" },
  { src: "/img/guayacan-color.webp", alt: "Grupo Guayacán", width: 300, height: 214, className: "h-16" },
  { src: "/img/fase1-logo.png", alt: "Fase1", width: 94, height: 94, className: "h-16" },
  { src: "/img/microsoft-for-startups.webp", alt: "Microsoft for Startups", width: 524, height: 224, className: "h-16" },
  { src: "/img/nvidia-inception.svg", alt: "NVIDIA Inception Program", width: 500, height: 216, className: "h-[4.5rem]" },
] as const;

const FOUNDERS = [
  { key: "jovaniel" as const, image: "/img/Jovaniel.webp", bioKey: "home.guide.founder1.bio" },
  { key: "genesis" as const, image: "/img/Genesis.webp", bioKey: "home.guide.founder2.bio" },
];

const About = () => {
  const { t, language } = useLanguage();

  const aboutJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://www.stratumpr.com/about",
    name: ABOUT_ROUTE.title,
    inLanguage: language === "es" ? "es" : "en",
    mainEntity: {
      "@type": "Organization",
      name: "Stratum PR",
      url: "https://www.stratumpr.com",
      foundingDate: "2025",
      founder: FOUNDERS.map(({ key }) => ({ "@type": "Person", name: t(`team.${key}.name`), jobTitle: t(`team.${key}.role`) })),
    },
  });

  return (
    <>
      <PageMeta route={ABOUT_ROUTE} jsonLd={aboutJsonLd} />

      <section className="bg-topo px-4 pb-14 pt-24 text-white md:pb-20 md:pt-36" aria-labelledby="about-heading">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-[#E6E09E]">
            {t("about.eyebrow")}
          </p>
          <h1
            id="about-heading"
            className="max-w-[18ch] font-telegraf text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em]"
          >
            {t("about.title")}
          </h1>
          <p className="mt-5 max-w-2xl font-telegraf text-base leading-relaxed text-white/80 md:mt-7 md:text-xl">{t("home.guide.empathy")}</p>

        </div>
      </section>

      {/* Programs that back the company: a full-width light band so every logo reads in its own colors */}
      <section className="border-b border-primary/10 bg-white px-4 py-10" aria-labelledby="programs-heading">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
          <h2 id="programs-heading" className="font-telegraf text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
            {t("about.programs.title")}
          </h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 md:gap-x-12">
            {PROGRAMS.map(({ src, alt, width, height, className }) => (
              <li key={src}>
                <img src={src} alt={alt} width={width} height={height} className={`w-auto ${className}`} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#FAFAF8] px-4 py-14 md:py-28" aria-labelledby="founders-heading">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-primary">{t("about.founders.eyebrow")}</p>
          <h2
            id="founders-heading"
            className="mb-8 max-w-[20ch] md:mb-14 font-telegraf text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-[#0b1215]"
          >
            {t("about.founders.title")}
          </h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-10">
            {FOUNDERS.map(({ key, image, bioKey }) => (
              // Mobile: small photo beside name/role, bio full width below. sm+: photo beside the whole block.
              <article
                key={key}
                className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 sm:flex sm:flex-row sm:items-start sm:gap-6"
              >
                <OptimizedImage
                  src={image}
                  alt={t(`team.${key}.name`)}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-[0_14px_30px_rgba(30,43,126,0.15)] sm:h-40 sm:w-40"
                  loading="lazy"
                />
                <div className="contents sm:block sm:flex-1 sm:border-t sm:border-[#0b1215] sm:pt-4">
                  <div className="border-t border-[#0b1215] pt-3 sm:border-0 sm:pt-0">
                    <h3 className="font-telegraf text-xl font-bold text-[#0b1215] sm:text-2xl">{t(`team.${key}.name`)}</h3>
                    <p className="mt-1 font-telegraf font-semibold text-secondary sm:mb-3">{t(`team.${key}.role`)}</p>
                  </div>
                  <p className="col-span-2 font-telegraf text-base leading-relaxed text-neutral-600">{t(bioKey)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-topo px-4 py-16 text-center text-white md:py-24" aria-labelledby="about-cta-heading">
        <h2 id="about-cta-heading" className="font-telegraf text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight">
          {t("about.cta.title")}
        </h2>
        <p className="mx-auto mb-8 mt-3 max-w-xl font-telegraf text-lg text-white/80">{t("about.cta.body")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-white px-8 sm:w-auto py-4 font-telegraf text-lg font-semibold text-primary transition-colors hover:bg-[#E6E09E]"
          >
            {t("home.hero.cta.primary")}
          </a>
          <a
            href={PLATFORM_URL}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-white/40 px-8 sm:w-auto py-4 font-telegraf text-lg font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("home.hero.cta.platform")}
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
