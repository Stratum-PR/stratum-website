
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

// Lazy load all pages for better code splitting and initial load performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Resources = lazy(() => import("./pages/Resources"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
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
      <p className="font-telegraf text-gray-600">Loading...</p>
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
                <Route path="/services" element={
                  <Suspense fallback={<PageLoader />}>
                    <Services />
                  </Suspense>
                } />
                <Route path="/projects" element={
                  <Suspense fallback={<PageLoader />}>
                    <Projects />
                  </Suspense>
                } />
                <Route path="/solutions" element={
                  <Suspense fallback={<PageLoader />}>
                    <Solutions />
                  </Suspense>
                } />
                <Route path="/resources" element={
                  <Suspense fallback={<PageLoader />}>
                    <Resources />
                  </Suspense>
                } />
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
                <Route path="/blog" element={
                  <Suspense fallback={<PageLoader />}>
                    <Blog />
                  </Suspense>
                } />
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
                <Route path="/projects/:slug" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProjectDetail />
                  </Suspense>
                } />
                {/* Legacy redirects for case-studies URLs */}
                <Route path="/case-studies" element={
                  <Suspense fallback={<PageLoader />}>
                    <Projects />
                  </Suspense>
                } />
                <Route path="/case-studies/:slug" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProjectDetail />
                  </Suspense>
                } />
                <Route path="/contact" element={
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<PageLoader />}>
                    <FAQ />
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
  </QueryClientProvider>
);

export default App;
