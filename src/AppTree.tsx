import React, { type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrollToTop from "./components/ScrollToTop";
import { AppProviders } from "./AppProviders";
import { AppRoutes, type Pages } from "./AppRoutes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

/**
 * The whole React tree, shared by the browser (App.tsx, with BrowserRouter) and the prerender
 * (entry-server.tsx, with StaticRouter). Both must render exactly the same tree: React's generated
 * ids (useId, used by Radix) depend on each component's position, so any extra sibling on one side
 * breaks hydration.
 */
export function AppTree({
  router: Router,
  pages,
  fallback,
  helmetContext,
}: {
  router: (props: { children: ReactNode }) => JSX.Element;
  pages: Pages;
  fallback: ReactNode;
  helmetContext?: object;
}) {
  return (
    <React.StrictMode>
      <AppProviders helmetContext={helmetContext}>
        <Router>
          <LanguageProvider>
            <ErrorBoundary>
              <ScrollToTop />
              <AppRoutes pages={pages} fallback={fallback} />
            </ErrorBoundary>
          </LanguageProvider>
        </Router>
        <Analytics />
      </AppProviders>
      <SpeedInsights />
    </React.StrictMode>
  );
}
