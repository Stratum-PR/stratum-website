import { Settings } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/contexts/LanguageContext";

/** Shows the visitor's current analytics choice and reopens the consent banner to change it. */
export const CookiePrefsButton = () => {
  const { t } = useLanguage();
  const { hasConsent, analytics, withdrawConsent } = useCookieConsent();
  const status = hasConsent ? (analytics ? "cookie.status.granted" : "cookie.status.denied") : "cookie.status.none";

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
      <button
        type="button"
        onClick={withdrawConsent}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-primary px-6 font-telegraf font-semibold text-white transition-colors hover:bg-secondary"
      >
        <Settings className="h-4 w-4" aria-hidden />
        {t("footer.cookiePrefs")}
      </button>
      {hasConsent !== null && (
        <p className="font-telegraf text-sm text-neutral-600" aria-live="polite">
          {t(status)}
        </p>
      )}
    </div>
  );
};
