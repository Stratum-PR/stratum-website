import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CALENDLY_URL, PLATFORM_URL } from "@/constants/links";

const PHOTO_INTERVAL_MS = 5500;

const HERO_PHOTOS = [
  { src: "/img/hero/hero-1.webp", altKey: "home.hero.photo1" },
  { src: "/img/hero/hero-2.webp", altKey: "home.hero.photo2" },
  { src: "/img/hero/hero-3.webp", altKey: "home.hero.photo3" },
  { src: "/img/hero/hero-4.webp", altKey: "home.hero.photo4" },
  { src: "/img/hero/hero-5.webp", altKey: "home.hero.photo5" },
] as const;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const HomeHeroSection = () => {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);
  // Visitors who ask for reduced motion start paused (WCAG 2.2.2)
  const [paused, setPaused] = useState(prefersReducedMotion);
  // Sticky mobile CTA appears only once the hero's own CTAs have scrolled out of view
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const el = ctaRowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      // Only show after scrolling past (CTA row above the viewport), not before it loads in
      setShowStickyCta(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="bg-[#FAFAF8]" aria-labelledby="hero-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-12 pt-24 sm:px-6 md:pt-28 lg:flex-row lg:gap-14 lg:px-8 lg:pb-20">
        <div className="w-full lg:flex-[1.15]">
          <h1
            id="hero-heading"
            className="mb-5 font-telegraf text-[clamp(2.25rem,5.5vw,3.625rem)] font-bold leading-[1.1] tracking-tight text-primary"
          >
            <span className="sr-only">{t("home.hero.title")}</span>
            <span className="block" aria-hidden>{t("home.hero.headline.line1")}</span>
            <span className="block" aria-hidden>{t("home.hero.headline.line2")}</span>
          </h1>
          <p className="mb-2 font-telegraf text-lg font-semibold text-secondary md:text-xl">{t("home.hero.kicker")}</p>
          <p className="mb-6 max-w-xl font-telegraf text-lg leading-relaxed text-neutral-600 md:mb-8 md:text-xl">
            {t("home.hero.subtitle")}
          </p>
          <div ref={ctaRowRef} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 sm:w-auto sm:px-9 lg:px-6 whitespace-nowrap font-telegraf text-lg lg:text-base font-semibold text-white transition-colors hover:bg-secondary"
            >
              {t("home.hero.cta.primary")}
            </a>
            <a
              href={PLATFORM_URL}
              className="inline-flex w-full items-center justify-center rounded-2xl border-[1.5px] border-primary px-6 py-4 sm:w-auto sm:px-7 lg:px-5 whitespace-nowrap font-telegraf text-lg lg:text-base font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              {t("home.hero.cta.platform")}
            </a>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription={t("home.hero.carousel.role")}
          aria-label={t("home.hero.carousel.label")}
          className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-[#dde2ea] shadow-[0_20px_50px_rgba(30,43,126,0.15)] sm:h-[420px] lg:h-[560px] lg:flex-1"
        >
          {HERO_PHOTOS.map(({ src, altKey }, i) => (
            <img
              key={src}
              src={src}
              // 768/960px copies for phones and tablets; the frame is cropped by height, so desktop needs ~1100px
              srcSet={`${src.replace(".webp", "-768.webp")} 768w, ${src.replace(".webp", "-960.webp")} 960w, ${src} 1600w`}
              sizes="(min-width: 1024px) 1100px, 100vw"
              alt={t(altKey)}
              aria-hidden={i !== photoIndex}
              // Crossfade plus a slow zoom-out on the visible photo (Ken Burns); off for reduced motion
              className={`absolute inset-0 h-full w-full object-cover [transition:opacity_1400ms_ease-in-out,transform_7000ms_ease-out] motion-reduce:!transform-none ${
                i === photoIndex ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              // the first photo is the LCP element; fetch it ahead of everything else
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))}
          <div className="absolute bottom-5 left-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={t(paused ? "home.hero.carousel.play" : "home.hero.carousel.pause")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(2,8,23,0.6)] text-white transition-colors hover:bg-[rgba(2,8,23,0.8)]"
            >
              {paused ? <Play className="h-4 w-4" fill="currentColor" aria-hidden /> : <Pause className="h-4 w-4" fill="currentColor" aria-hidden />}
            </button>
            <div className="flex gap-1.5 rounded-full bg-[rgba(2,8,23,0.45)] px-2.5 py-2" aria-hidden>
              {HERO_PHOTOS.map(({ src }, i) => (
                <span
                  key={src}
                  className={`h-2 w-2 rounded-full bg-white transition-opacity ${i === photoIndex ? "opacity-100" : "opacity-45"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!showStickyCta}
        className={`fixed bottom-0 left-0 right-0 z-[9990] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          showStickyCta ? "translate-y-0" : "pointer-events-none translate-y-full"
        } border-t border-primary/10 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden`}
      >
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showStickyCta ? undefined : -1}
          className="flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 font-telegraf font-semibold text-white transition-colors hover:bg-secondary"
        >
          {t("home.hero.cta.primary")}
        </a>
      </div>
    </section>
  );
};
