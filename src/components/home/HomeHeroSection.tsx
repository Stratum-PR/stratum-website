import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";
const PHOTO_INTERVAL_MS = 4000;
const HERO_WORKER_IMAGE = "/img/hero/worker1.png";

const HERO_PHOTOS = [
  "/img/hero/hero-1.jpg",
  "/img/hero/hero-2.jpg",
  "/img/hero/hero-3.jpg",
  "/img/hero/hero-4.jpg",
  "/img/hero/hero-5.jpg",
] as const;

const PHOTO_COUNT = HERO_PHOTOS.length;

const HERO_CAROUSEL_HEIGHT =
  "h-[34vh] min-h-[11rem] sm:min-h-[12rem] md:h-[38vh] xl:h-[42vh]";

const HERO_CAROUSEL_BOTTOM =
  "bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-0";

/** Keeps title/CTA in the cream area above the carousel strip */
const HERO_COPY_CLEARANCE =
  "bottom-[calc(34vh+5.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(36vh+5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[38vh] xl:bottom-[42vh]";

function HeroPhotoRotator({
  photoIndex,
  failedPhotos,
  onPhotoError,
}: {
  photoIndex: number;
  failedPhotos: Set<number>;
  onPhotoError: (index: number) => void;
}) {
  return (
    <>
      {HERO_PHOTOS.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === photoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== photoIndex}
        >
          {failedPhotos.has(i) ? (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary" />
          ) : (
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={() => onPhotoError(i)}
            />
          )}
        </div>
      ))}
    </>
  );
}

export const HomeHeroSection = () => {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [failedPhotos, setFailedPhotos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % PHOTO_COUNT);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const handlePhotoError = (index: number) => {
    setFailedPhotos((prev) => new Set(prev).add(index));
  };

  return (
    <section
      className="hero-section-prodmast relative flex min-h-[100svh] flex-col overflow-x-hidden bg-[#FAFAF8] pt-14 md:pt-16 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      aria-labelledby="hero-heading"
    >
      {/* Carousel + worker — one bottom edge */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0",
          HERO_CAROUSEL_BOTTOM
        )}
        aria-hidden
      >
        <div
          className={cn(
            "relative z-0 w-full overflow-hidden",
            HERO_CAROUSEL_HEIGHT
          )}
        >
          <div className="relative h-full w-full">
            <HeroPhotoRotator
              photoIndex={photoIndex}
              failedPhotos={failedPhotos}
              onPhotoError={handlePhotoError}
            />
            <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden>
              <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#FAFAF8]/35 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[32%] max-w-md bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/70 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#FAFAF8]/45 to-transparent" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 z-[5] hidden md:block h-[min(82vh,calc(100svh-3.5rem))]">
          <div className="absolute inset-y-0 left-0 w-[55%] max-w-xl bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-end">
            <img
              src={HERO_WORKER_IMAGE}
              alt=""
              className="block h-auto max-h-full w-auto max-w-[min(68vw,40rem)] xl:max-w-[min(72vw,44rem)] object-contain [object-position:bottom_right] origin-bottom-right scale-[0.8] select-none"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Copy — cream zone above carousel */}
      <div
        className={cn(
          "absolute inset-x-0 top-14 md:top-16 z-10 flex flex-col justify-start",
          "px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10 lg:pt-12",
          HERO_COPY_CLEARANCE
        )}
      >
        <div className="relative mx-auto w-full max-w-4xl text-center px-2 sm:px-8 md:px-10 lg:px-14">
            <h1
              id="hero-heading"
              className="font-telegraf font-bold text-primary text-[clamp(1.75rem,6vw,2.5rem)] xl:text-[clamp(2rem,4vw,3.75rem)] leading-[1.15] tracking-tight mb-3 sm:mb-4 md:mb-5 xl:mb-7 hero-animate-in xl:max-w-[32ch] xl:mx-auto"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="sr-only">{t("home.hero.title")}</span>
              <span className="block">{t("home.hero.headline.line1")}</span>
              <span className="block">{t("home.hero.headline.line2")}</span>
            </h1>
            <p
              className="font-telegraf text-[clamp(0.9375rem,3.5vw,1.125rem)] xl:text-[clamp(1rem,2.1vw,1.3125rem)] text-neutral-600 max-w-2xl mx-auto mb-5 sm:mb-6 xl:mb-9 leading-[1.5] hero-animate-in"
              style={{ animationDelay: "0.4s" }}
            >
              {t("home.hero.subtitle")}
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 hidden md:inline-flex items-center justify-center font-telegraf font-semibold text-white bg-primary hover:bg-secondary rounded-2xl px-9 sm:px-11 py-3.5 sm:py-4 text-base sm:text-lg transition-colors duration-200 shadow-md hero-animate-in"
              style={{ animationDelay: "0.5s" }}
            >
              {t("home.hero.cta.primary")}
            </a>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9990] p-3 bg-white/95 backdrop-blur-sm border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center font-telegraf font-semibold text-white bg-primary hover:bg-secondary rounded-2xl px-6 py-3.5 transition-colors"
        >
          {t("home.hero.cta.primary")}
        </a>
      </div>
    </section>
  );
};
