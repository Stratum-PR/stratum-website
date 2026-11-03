import { Settings } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";
import { COOKIES_ROUTE } from "@/config/discoverable-routes";
import { COOKIE_POLICY } from "@/content/legal";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/contexts/LanguageContext";

const Cookies = () => {
  const { t } = useLanguage();
  const { withdrawConsent } = useCookieConsent();

  return (
    <LegalPage
      route={COOKIES_ROUTE}
      doc={COOKIE_POLICY}
      action={
        <button
          type="button"
          onClick={withdrawConsent}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-primary px-6 font-telegraf font-semibold text-white transition-colors hover:bg-secondary"
        >
          <Settings className="h-4 w-4" aria-hidden />
          {t("footer.cookiePrefs")}
        </button>
      }
    />
  );
};

export default Cookies;
