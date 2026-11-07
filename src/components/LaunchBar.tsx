import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BellRing, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ALERTAS_URL } from "@/constants/links";

const BAR_HEIGHT = "2.25rem";
const AUTO_HIDE_MS = 5000;
const QUIET_MS = 10 * 60 * 1000; // after it hides, don't show it again for 10 minutes
const STORAGE_KEY = "launchBarHiddenAt";

const hiddenRecently = () => {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(at) && at > 0 && Date.now() - at < QUIET_MS;
  } catch {
    return false;
  }
};

const rememberHidden = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // storage blocked (private mode): the bar just shows again on the next visit
  }
};

/**
 * Temporary launch announcement for Alertas PR, fixed above the header on every page.
 * It hides itself after 5 seconds (not while the pointer or focus is on it) or with its close button,
 * and stays hidden for 10 minutes. While shown it sets --launch-bar-h, which the header and the
 * spacer in Layout use, so the page slides back up when it goes away.
 * To remove it after the launch: drop <LaunchBar /> and its spacer from Layout.
 */
export function LaunchBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(() => !hiddenRecently());
  const [holding, setHolding] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Reserve (or release) the space above the header before the browser paints
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--launch-bar-h", visible ? BAR_HEIGHT : "0px");
  }, [visible]);
  useEffect(() => () => document.documentElement.style.setProperty("--launch-bar-h", "0px"), []);

  const hide = () => {
    rememberHidden();
    setVisible(false);
  };

  useEffect(() => {
    if (!visible || holding) return;
    const timer = window.setTimeout(hide, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, holding]);

  return (
    <div
      ref={barRef}
      aria-hidden={!visible}
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(e) => {
        if (!barRef.current?.contains(e.relatedTarget as Node)) setHolding(false);
      }}
      className={`fixed inset-x-0 top-0 z-[9999] flex h-[2.25rem] items-center justify-center bg-[#E6E09E] pl-4 pr-11 text-primary transition-transform duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <a
        href={ALERTAS_URL}
        target="_blank"
        rel="noopener"
        tabIndex={visible ? undefined : -1}
        className="flex min-w-0 items-center gap-2 whitespace-nowrap font-telegraf text-[13px] sm:text-sm"
      >
        <BellRing className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">
          <b>{t("launch.new")}</b> <span className="hidden sm:inline">{t("launch.text")}</span>
          <span className="sm:hidden">{t("launch.short")}</span>
        </span>
        <b className="shrink-0 underline underline-offset-[3px]">{t("launch.cta")} →</b>
      </a>
      <button
        type="button"
        onClick={hide}
        tabIndex={visible ? undefined : -1}
        aria-label={t("launch.close")}
        className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
