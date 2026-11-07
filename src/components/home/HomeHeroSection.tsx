import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const PHRASE_INTERVAL_MS = 2600;
// Highlighted phrase under the headline, one per platform module
const HERO_PHRASE_KEYS = [
  "home.hero.phrase1",
  "home.hero.phrase2",
  "home.hero.phrase4",
  "home.hero.phrase5",
  "home.hero.phrase6",
  "home.hero.phrase7",
] as const;

// Horizontal padding of the pill (px-3 / sm:px-4), added to the measured text width
const pillPaddingX = () => (typeof window !== "undefined" && window.innerWidth >= 640 ? 32 : 24);

const RotatingHighlight = ({ phrases, paused }: { phrases: string[]; paused: boolean }) => {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureBoxRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [reserveTwoLines, setReserveTwoLines] = useState(false);
  const [available, setAvailable] = useState(Infinity);
  const phrasesKey = phrases.join("|");

  // Measure every phrase off-screen so the pill can animate to each one's width.
  // A ResizeObserver on the measuring box re-measures whenever the font size changes
  // (viewport resize, font load), which window "resize" alone can miss.
  useLayoutEffect(() => {
    const measure = () => {
      const next = phrases.map((_, i) => {
        const el = measureRefs.current[i];
        return el ? Math.ceil(el.getBoundingClientRect().width) + pillPaddingX() : 0;
      });
      setWidths(next);
      // On narrow screens a long phrase wraps; reserve two lines so the page below doesn't jump
      const avail = wrapRef.current?.clientWidth ?? Infinity;
      setAvailable(avail);
      setReserveTwoLines(next.some((w) => w > avail));
    };
    measure();
    document.fonts?.ready.then(measure);
    const box = measureBoxRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrasesKey]);

  useEffect(() => setIndex(0), [phrasesKey]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % phrases.length), PHRASE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, phrases.length]);

  return (
    <span
      ref={wrapRef}
      className="relative mt-1 block"
      // two lines of 1.1em plus the pill's bottom padding
      style={reserveTwoLines ? { minHeight: "calc(2.2em + 0.25rem)" } : undefined}
      aria-hidden
    >
      {/* Zero-size clip box so the off-screen copies never widen the page */}
      <span className="invisible absolute left-0 top-0 h-0 w-0 overflow-hidden">
        <span ref={measureBoxRef} className="flex w-max flex-col items-start whitespace-nowrap">
          {phrases.map((p, i) => (
            <span key={i} ref={(el) => (measureRefs.current[i] = el)} className="inline-block">
              {p}
            </span>
          ))}
        </span>
      </span>
      <span
        className="inline-block max-w-full overflow-hidden align-top rounded-2xl bg-accent px-3 pb-1 text-primary [transition:width_500ms_cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none sm:px-4"
        style={widths[index] ? { width: widths[index] } : undefined}
      >
        <span key={`${index}-${phrases[index]}`} // a phrase wider than the column wraps inside the two lines reserved above, instead of being cut off
          className={`hero-phrase-in block ${widths[index] && widths[index] > available ? "whitespace-normal" : "whitespace-nowrap"}`}
        >
          {phrases[index]}
        </span>
      </span>
    </span>
  );
};

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
    // From lg (1024px): the photo carousel fills the whole hero behind the text, under a navy gradient,
    // with white text on the left (option C). Below lg: text on top, photo card below, as before.
    <section
      className="relative overflow-hidden bg-[#FAFAF8] lg:flex lg:min-h-[clamp(600px,calc(100svh_-_140px),820px)] lg:items-center lg:bg-primary"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-12 pt-24 sm:px-6 md:pt-28 lg:w-full lg:items-start lg:px-8 lg:py-24">
        {/* min-w-0: the column keeps its share of the row, so a long rotating phrase never widens it
            (which re-wrapped the headline and moved the buttons and photo) */}
        <div className="w-full min-w-0 lg:relative lg:z-10 lg:max-w-[780px]">
          <h1
            id="hero-heading"
            className="mb-6 font-telegraf text-[clamp(2.25rem,4.6vw,3rem)] lg:text-[clamp(3rem,3.6vw,3.5rem)] font-bold md:mb-8 leading-[1.1] tracking-tight text-primary lg:text-white"
          >
            <span className="sr-only">{t("home.hero.title")}</span>
            <span className="block" aria-hidden>{t("home.hero.headline.line1")}</span>
            <span className="block" aria-hidden>{t("home.hero.headline.line2")}</span>
            <RotatingHighlight phrases={HERO_PHRASE_KEYS.map((k) => t(k))} paused={paused} />
          </h1>
          <div ref={ctaRowRef} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 sm:w-auto sm:px-9 lg:px-8 whitespace-nowrap font-telegraf text-lg font-semibold text-white transition-colors hover:bg-secondary lg:bg-[#E6E09E] lg:text-primary lg:hover:bg-white"
            >
              {t("home.hero.cta.primary")}
            </a>
            <a
              href={PLATFORM_URL}
              className="inline-flex w-full items-center justify-center rounded-2xl border-[1.5px] border-primary px-6 py-4 sm:w-auto sm:px-7 whitespace-nowrap font-telegraf text-lg font-semibold text-primary transition-colors hover:bg-primary/5 lg:border-white/60 lg:text-white lg:hover:bg-white/10"
            >
              {t("home.hero.cta.platform")}
            </a>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription={t("home.hero.carousel.role")}
          aria-label={t("home.hero.carousel.label")}
          // Below lg: a rounded photo card under the text. From lg: absolutely positioned to fill the section behind the text
          className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-[#dde2ea] shadow-[0_20px_50px_rgba(30,43,126,0.15)] sm:h-[420px] lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:rounded-none lg:bg-primary lg:shadow-none"
        >
          {HERO_PHOTOS.map(({ src, altKey }, i) => (
            <img
              key={src}
              src={src}
              // 768/960px copies for phones and tablets; from lg the photo spans the full window width.
              // 1600w is the largest source we have (wider screens upscale it slightly behind the overlay).
              srcSet={`${src.replace(".webp", "-768.webp")} 768w, ${src.replace(".webp", "-960.webp")} 960w, ${src} 1600w`}
              sizes="100vw"
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
          {/* Navy gradient so the white headline stays readable over any photo (lg and up only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(30,43,126,0.94)_0%,rgba(30,43,126,0.82)_40%,rgba(30,43,126,0.25)_72%,rgba(30,43,126,0.05)_100%)] lg:block"
          />
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 lg:bottom-8 lg:left-auto lg:right-8">
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
