import { Header } from "./Header";
import { LaunchBar } from "./LaunchBar";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { ErrorBoundary } from "./ErrorBoundary";
import { Outlet } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Layout = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[10000] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2.5 focus:font-telegraf focus:font-semibold focus:text-white"
      >
        {t("a11y.skipToContent")}
      </a>
      <LaunchBar />
      {/* pushes the page down by the launch bar's height (the bar and the header are fixed) */}
      <div className="h-[var(--launch-bar-h)] shrink-0 transition-[height] duration-300 ease-out motion-reduce:transition-none" aria-hidden />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
