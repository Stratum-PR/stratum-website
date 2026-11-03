
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import { lazy as reactLazy, Suspense, type ComponentType } from "react";
import { Analytics } from "@vercel/analytics/react";

// After a new deploy, a tab still running the old build asks for page chunks that no longer exist.
// Reload once to pick up the new build instead of showing the error screen.
const RELOAD_FLAG = "chunk-reload";
const lazy = <T extends ComponentType<any>>(load: () => Promise<{ default: T }>) =>
  reactLazy(() =>
    load()
      .then((module) => {
        try {
          sessionStorage.removeItem(RELOAD_FLAG);
        } catch {
          // storage blocked: nothing to clear
        }
        return module;
      })
      .catch((error) => {
        let reloaded = true;
        try {
          reloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
          if (!reloaded) sessionStorage.setItem(RELOAD_FLAG, "1");
        } catch {
          // storage blocked: don't risk a reload loop, show the error screen
        }
        if (reloaded) throw error;
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      })
  );

// Lazy load all pages for better code splitting and initial load performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Preguntas = lazy(() => import("./pages/Preguntas"));
const Autoevaluacion = lazy(() => import("./pages/Autoevaluacion"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const EmailPreferences = lazy(() => import("./pages/EmailPreferences"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
// CHECKLIST TEMPORARILY DISABLED - Uncomment when ready to enable
// const Checklist = lazy(() => import("./pages/Checklist"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Studio = lazy(() => import("./pages/Studio"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="font-telegraf text-neutral-600">Cargando…</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <LanguageProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route 
                path="/studio/*" 
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Studio />
                  </Suspense>
                } 
              />
              <Route element={<Layout />}>
                <Route path="/" element={
                  <Suspense fallback={<PageLoader />}>
                    <Home />
                  </Suspense>
                } />
                <Route path="/about" element={
                  <Suspense fallback={<PageLoader />}>
                    <About />
                  </Suspense>
                } />
                <Route path="/services" element={<Navigate to="/" replace />} />
                <Route path="/projects" element={<Navigate to="/" replace />} />
                <Route path="/solutions" element={<Navigate to="/" replace />} />
                <Route path="/resources" element={<Navigate to="/newsupdates" replace />} />
                <Route path="/newsupdates" element={
                  <Suspense fallback={<PageLoader />}>
                    <Blog />
                  </Suspense>
                } />
                <Route path="/newsupdates/:slug" element={
                  <Suspense fallback={<PageLoader />}>
                    <BlogDetail />
                  </Suspense>
                } />
                {/* Legacy redirect for /blog */}
                <Route path="/blog" element={<Navigate to="/newsupdates" replace />} />
                <Route path="/blog/:slug" element={
                  <Suspense fallback={<PageLoader />}>
                    <BlogDetail />
                  </Suspense>
                } />
                {/* CHECKLIST ROUTE TEMPORARILY DISABLED - Uncomment when ready to enable
                <Route path="/checklist" element={
                  <Suspense fallback={<PageLoader />}>
                    <Checklist />
                  </Suspense>
                } />
                */}
                <Route path="/projects/:slug" element={<Navigate to="/" replace />} />
                {/* Legacy redirects for case-studies URLs */}
                <Route path="/case-studies" element={<Navigate to="/" replace />} />
                <Route path="/case-studies/:slug" element={<Navigate to="/" replace />} />
                <Route path="/contact" element={
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                } />
                <Route path="/faq" element={<Navigate to="/preguntas" replace />} />
                <Route path="/autoevaluacion" element={
                  <Suspense fallback={<PageLoader />}>
                    <Autoevaluacion />
                  </Suspense>
                } />
                <Route path="/preguntas" element={
                  <Suspense fallback={<PageLoader />}>
                    <Preguntas />
                  </Suspense>
                } />
                <Route path="/privacy" element={
                  <Suspense fallback={<PageLoader />}>
                    <Privacy />
                  </Suspense>
                } />
                <Route path="/terms" element={
                  <Suspense fallback={<PageLoader />}>
                    <Terms />
                  </Suspense>
                } />
                <Route path="/cookies" element={
                  <Suspense fallback={<PageLoader />}>
                    <Cookies />
                  </Suspense>
                } />
                <Route path="/unsubscribe" element={
                  <Suspense fallback={<PageLoader />}>
                    <Unsubscribe />
                  </Suspense>
                } />
                <Route path="/email-preferences" element={
                  <Suspense fallback={<PageLoader />}>
                    <EmailPreferences />
                  </Suspense>
                } />
                <Route path="/sitemap.xml" element={
                  <Suspense fallback={<PageLoader />}>
                    <Sitemap />
                  </Suspense>
                } />
                <Route path="*" element={
                  <Suspense fallback={<PageLoader />}>
                    <NotFound />
                  </Suspense>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
          <Analytics />
        </ErrorBoundary>
      </LanguageProvider>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
