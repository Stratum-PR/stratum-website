import { useEffect, useState } from "react";
import {
  ShieldCheck,
  BarChart3,
  Clock,
  Package,
  FileDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";
const PHOTO_INTERVAL_MS = 4000;
const FSMA_CARD_BG = "/img/pexels-towfiqu-barbhuiya-3440682-11412596.jpg";

const HERO_PHOTOS = [
  "/img/hero/hero-1.jpg",
  "/img/hero/hero-2.jpg",
  "/img/hero/hero-3.jpg",
  "/img/hero/hero-4.jpg",
  "/img/hero/hero-5.jpg",
] as const;

const PHOTO_COUNT = HERO_PHOTOS.length;

/**
 * ─── HERO LAYOUT (edit here) ────────────────────────────────────────────────
 *
 * Section uses min-h-[100svh] + flex so tiles fill to the bottom of the viewport.
 * Desktop tile heights are % of the tile row (tall = full, medium/short = shorter).
 */
/** 1 & 5 wide; 2 & 4 narrow; 3 center */
const HERO_TILE_GRID_COLUMNS =
  "minmax(11rem, 2.15fr) minmax(6.5rem, 1.1fr) minmax(6rem, 0.95fr) minmax(6.5rem, 1.1fr) minmax(11rem, 2.15fr)";

const HERO_TILE_GAP = "gap-3 sm:gap-4";

const TILE_MOBILE_TALL = "min-h-[12rem] sm:min-h-[13rem]";
const TILE_MOBILE_MEDIUM = "min-h-[10rem] sm:min-h-[10.5rem]";
const TILE_MOBILE_SHORT = "min-h-[8rem] sm:min-h-[8.5rem]";

const TILE_DESKTOP_TALL = "xl:h-full xl:min-h-0";
const TILE_DESKTOP_MEDIUM = "xl:h-[70%] xl:min-h-[9rem] xl:self-end";
const TILE_DESKTOP_SHORT = "xl:h-[54%] xl:min-h-[8rem] xl:self-end";

/** Desktop (xl+): copy ~58% / tiles ~42%. Mobile: natural stack (no flex squeeze). */
const HERO_COPY_ZONE_CLASS =
  "shrink-0 py-5 sm:py-7 md:py-8 xl:flex xl:flex-[3] xl:basis-0 xl:min-h-0 xl:flex-col xl:justify-center xl:py-10 2xl:py-12";
const HERO_TILES_ZONE_CLASS =
  "shrink-0 w-full pb-2 xl:flex xl:flex-[2] xl:basis-0 xl:min-h-0 xl:flex-col xl:justify-end xl:pb-0";

type FloatingBadge = {
  Icon: LucideIcon;
  bgClass: string;
  iconClass: string;
  style: React.CSSProperties;
  delay: string;
};

/** Positions are relative to the copy block only — never below the CTA. */
const FLOATING_BADGES: FloatingBadge[] = [
  {
    Icon: ShieldCheck,
    bgClass: "bg-primary",
    iconClass: "text-white",
    style: { top: "0%", left: "0%" },
    delay: "0s",
  },
  {
    Icon: BarChart3,
    bgClass: "bg-secondary",
    iconClass: "text-white",
    style: { top: "4%", right: "0%" },
    delay: "0.4s",
  },
  {
    Icon: Clock,
    bgClass: "bg-accent",
    iconClass: "text-primary",
    style: { top: "42%", left: "0%" },
    delay: "0.8s",
  },
  {
    Icon: Package,
    bgClass: "bg-secondary",
    iconClass: "text-white",
    style: { top: "38%", right: "0%" },
    delay: "1.2s",
  },
];

type HomeHeroSectionProps = {
  onChecklistClick: () => void;
};

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
            <div
              className={`w-full h-full bg-gradient-to-br from-primary to-secondary hero-ken-burns ${
                i === photoIndex ? "hero-ken-burns-active" : ""
              }`}
            />
          ) : (
            <img
              src={src}
              alt=""
              className={`w-full h-full object-cover hero-ken-burns ${
                i === photoIndex ? "hero-ken-burns-active" : ""
              }`}
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

const cardMotion =
  "hero-card-stagger shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

function HeroFsmaCard({
  className,
  style,
  onClick,
  compact,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const pad = compact ? "px-4 py-4" : "px-5 py-5 sm:px-6 sm:py-6";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        cardMotion,
        "relative overflow-hidden rounded-2xl text-left flex flex-col h-full isolate",
        className
      )}
      style={style}
    >
      <img
        src={FSMA_CARD_BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/72" aria-hidden />

      <div className={cn("relative z-10 flex flex-col flex-grow min-h-0", pad, "pb-0")}>
        <h2
          className={cn(
            "font-telegraf font-bold text-primary leading-snug",
            compact
              ? "text-lg xl:text-xl leading-tight line-clamp-4"
              : "text-xl sm:text-2xl line-clamp-3"
          )}
        >
          {t("home.hero.card.lead.title")}
        </h2>
        <p
          className={cn(
            "font-telegraf text-neutral-700 mt-2",
            compact ? "text-sm xl:text-base line-clamp-3" : "text-base sm:text-lg line-clamp-3"
          )}
        >
          {t("home.hero.card.lead.subtitle")}
        </p>
      </div>

      <div className="relative z-10 mt-auto w-full shrink-0">
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/0"
          aria-hidden
        />
        <div
          className={cn(
            "relative flex items-center gap-2 text-white",
            compact ? "px-4 pb-4 pt-10" : "px-5 sm:px-6 pb-5 sm:pb-6 pt-12"
          )}
        >
          <FileDown
            className={cn("shrink-0 text-accent", compact ? "h-5 w-5" : "h-6 w-6")}
            aria-hidden
          />
          <span
            className={cn(
              "font-telegraf font-semibold uppercase tracking-wide text-white",
              compact ? "text-xs xl:text-sm" : "text-sm"
            )}
          >
            {t("home.hero.card.lead.kicker")}
          </span>
        </div>
      </div>
    </button>
  );
}

function HeroStat100Card({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(cardMotion, "rounded-2xl bg-accent flex flex-col justify-center", className)}
      style={style}
    >
      <p className="font-telegraf font-bold text-3xl xl:text-4xl text-primary mb-1">100+</p>
      <p className="font-telegraf text-xs sm:text-sm font-medium text-primary leading-snug">
        {t("home.hero.card.stat1.label")}
      </p>
    </div>
  );
}

function HeroStat16Card({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        cardMotion,
        "rounded-2xl bg-white border border-primary/10 flex flex-col justify-center",
        className
      )}
      style={style}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <p className="font-telegraf font-bold text-3xl xl:text-4xl text-primary">16+</p>
        <TrendingUp className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden />
      </div>
      <p className="font-telegraf text-xs sm:text-sm font-medium text-neutral-700 leading-snug">
        {t("home.hero.card.stat2.label")}
      </p>
    </div>
  );
}

function HeroStat200Card({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        cardMotion,
        "rounded-2xl bg-secondary text-white flex flex-col justify-center",
        className
      )}
      style={style}
    >
      <p className="font-telegraf font-bold text-3xl xl:text-4xl mb-1 sm:mb-2">$200M+</p>
      <p className="font-telegraf text-xs sm:text-sm font-medium text-white/95 leading-snug">
        {t("home.hero.card.stat3.label")}
      </p>
    </div>
  );
}

export const HomeHeroSection = ({ onChecklistClick }: HomeHeroSectionProps) => {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [badgesVisible, setBadgesVisible] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % PHOTO_COUNT);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tmr = setTimeout(() => setBadgesVisible(true), 900);
    return () => clearTimeout(tmr);
  }, []);

  const handlePhotoError = (index: number) => {
    setFailedPhotos((prev) => new Set(prev).add(index));
  };

  return (
    <section
      className="hero-section-prodmast relative flex flex-col bg-[#FAFAF8] overflow-x-hidden pt-14 md:pt-16 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-8 xl:min-h-[100svh] xl:pb-8"
      aria-labelledby="hero-heading"
    >
      <div className="relative flex w-full max-w-7xl mx-auto flex-col px-4 sm:px-6 lg:px-8 xl:min-h-0 xl:flex-1">
        <div className="relative flex flex-col xl:min-h-0 xl:flex-1">
          {/* Copy — upper ~58% of hero */}
          <div
            className={cn("relative z-30 mx-auto w-full max-w-5xl text-center", HERO_COPY_ZONE_CLASS)}
          >
            <div className="relative mx-auto w-full max-w-4xl px-2 sm:px-8 md:px-10 lg:px-14">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[4.25rem] sm:bottom-[4.5rem] hidden lg:block"
                aria-hidden
              >
                {FLOATING_BADGES.map(({ Icon, bgClass, iconClass, style, delay }, i) => (
                  <div
                    key={i}
                    className={cn(
                      "hero-float-badge absolute w-8 h-8 lg:w-9 lg:h-9 rounded-full shadow-md flex items-center justify-center",
                      badgesVisible ? "hero-badge-visible" : "opacity-0",
                      bgClass
                    )}
                    style={{ ...style, animationDelay: delay }}
                  >
                    <Icon className={cn("h-3.5 w-3.5 lg:h-4 lg:w-4", iconClass)} strokeWidth={2} />
                  </div>
                ))}
              </div>

              <h1
                id="hero-heading"
                className="font-telegraf font-bold text-primary text-[clamp(1.75rem,6vw,2.5rem)] xl:text-[clamp(2rem,4vw,3.75rem)] leading-[1.15] tracking-tight mb-3 sm:mb-4 md:mb-5 xl:mb-7 hero-animate-in xl:max-w-[24ch] xl:mx-auto"
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
                <span className="block sm:inline">
                  {t("home.hero.subtitle.line1.before")}
                  <span className="text-secondary font-semibold">
                    {t("home.hero.subtitle.line1.accent")}
                  </span>
                  {t("home.hero.subtitle.line1.after")}
                </span>{" "}
                <span className="block sm:inline">{t("home.hero.subtitle.line2")}</span>
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-30 hidden md:inline-flex items-center justify-center font-telegraf font-semibold text-white bg-primary hover:bg-secondary rounded-2xl px-9 sm:px-11 py-3.5 sm:py-4 text-base sm:text-lg transition-colors duration-200 shadow-md hero-animate-in"
                style={{ animationDelay: "0.5s" }}
              >
                {t("home.hero.cta.primary")}
              </a>
            </div>
          </div>

          {/* Tiles */}
          <div className={cn("relative z-10", HERO_TILES_ZONE_CLASS)}>
        {/* Mobile / tablet — tiles 1 & 5 only, side by side */}
        <div className={cn("grid grid-cols-2 xl:hidden", HERO_TILE_GAP)}>
          <div
            className="hero-card-stagger relative h-44 min-h-[11rem] sm:h-52 overflow-hidden rounded-2xl shadow-md"
            style={{ animationDelay: "0.55s" }}
          >
            <HeroPhotoRotator
              photoIndex={photoIndex}
              failedPhotos={failedPhotos}
              onPhotoError={handlePhotoError}
            />
          </div>

          <HeroFsmaCard
            onClick={onChecklistClick}
            compact
            className="h-44 min-h-[11rem] sm:h-52"
            style={{ animationDelay: "0.9s" }}
          />
        </div>

        {/* Desktop */}
        <div
          className={cn(
            "hidden w-full xl:grid xl:h-full xl:min-h-[14rem]",
            HERO_TILE_GAP,
            "items-end"
          )}
          style={{ gridTemplateColumns: HERO_TILE_GRID_COLUMNS }}
        >
          <div
            className={cn(
              "hero-card-stagger relative min-h-0 overflow-hidden rounded-2xl shadow-md",
              TILE_MOBILE_TALL,
              TILE_DESKTOP_TALL
            )}
            style={{ animationDelay: "0.55s" }}
          >
            <HeroPhotoRotator
              photoIndex={photoIndex}
              failedPhotos={failedPhotos}
              onPhotoError={handlePhotoError}
            />
          </div>

          <HeroStat200Card
            className={cn(
              "min-h-0 px-4 py-4 xl:px-5",
              TILE_MOBILE_MEDIUM,
              TILE_DESKTOP_MEDIUM
            )}
            style={{ animationDelay: "0.6s" }}
          />

          <HeroStat16Card
            className={cn(
              "min-h-0 px-4 py-4",
              TILE_MOBILE_SHORT,
              TILE_DESKTOP_SHORT
            )}
            style={{ animationDelay: "0.7s" }}
          />

          <HeroStat100Card
            className={cn(
              "min-h-0 px-4 py-4 xl:px-5",
              TILE_MOBILE_MEDIUM,
              TILE_DESKTOP_MEDIUM
            )}
            style={{ animationDelay: "0.8s" }}
          />

          <HeroFsmaCard
            onClick={onChecklistClick}
            compact
            className={cn("min-h-0", TILE_MOBILE_TALL, TILE_DESKTOP_TALL)}
            style={{ animationDelay: "0.9s" }}
          />
        </div>
          </div>
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
