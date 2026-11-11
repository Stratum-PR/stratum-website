import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, type ComponentType, type ReactNode } from "react";
import Layout from "./components/Layout";

/**
 * The page components, passed in by the caller: the browser build passes lazy-loaded pages
 * (code splitting), the prerender (src/entry-server.tsx) passes the same pages imported eagerly,
 * because renderToString cannot wait for lazy chunks. Both render the same routes below.
 */
export interface Pages {
  Home: ComponentType;
  About: ComponentType;
  Contact: ComponentType;
  Preguntas: ComponentType;
  Pregunta: ComponentType;
  Guia: ComponentType;
  Autoevaluacion: ComponentType;
  Privacy: ComponentType;
  Terms: ComponentType;
  Cookies: ComponentType;
  Unsubscribe: ComponentType;
  EmailPreferences: ComponentType;
  NotFound: ComponentType;
}

export function AppRoutes({ pages, fallback }: { pages: Pages; fallback: ReactNode }) {
  const page = (P: ComponentType) => (
    <Suspense fallback={fallback}>
      <P />
    </Suspense>
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={page(pages.Home)} />
        <Route path="/about" element={page(pages.About)} />
        <Route path="/services" element={<Navigate to="/" replace />} />
        <Route path="/projects" element={<Navigate to="/" replace />} />
        <Route path="/solutions" element={<Navigate to="/" replace />} />
        {/* The blog was retired: old links go to the home page */}
        <Route path="/resources" element={<Navigate to="/" replace />} />
        <Route path="/newsupdates/*" element={<Navigate to="/" replace />} />
        <Route path="/blog/*" element={<Navigate to="/" replace />} />
        <Route path="/projects/:slug" element={<Navigate to="/" replace />} />
        {/* Legacy redirects for case-studies URLs */}
        <Route path="/case-studies" element={<Navigate to="/" replace />} />
        <Route path="/case-studies/:slug" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={page(pages.Contact)} />
        <Route path="/faq" element={<Navigate to="/preguntas" replace />} />
        <Route path="/autoevaluacion" element={page(pages.Autoevaluacion)} />
        <Route path="/preguntas" element={page(pages.Preguntas)} />
        <Route path="/preguntas/:slug" element={page(pages.Pregunta)} />
        <Route path="/guias/:slug" element={page(pages.Guia)} />
        <Route path="/privacy" element={page(pages.Privacy)} />
        <Route path="/terms" element={page(pages.Terms)} />
        <Route path="/cookies" element={page(pages.Cookies)} />
        <Route path="/unsubscribe" element={page(pages.Unsubscribe)} />
        <Route path="/email-preferences" element={page(pages.EmailPreferences)} />
        <Route path="*" element={page(pages.NotFound)} />
      </Route>
    </Routes>
  );
}
