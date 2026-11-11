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
  Plantillas: ComponentType;
  Plantilla: ComponentType;
  Glosario: ComponentType;
  Industrias: ComponentType;
  Industria: ComponentType;
  InspeccionesFda: ComponentType;
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
        <Route path="/plantillas" element={page(pages.Plantillas)} />
        <Route path="/plantillas/:slug" element={page(pages.Plantilla)} />
        <Route path="/glosario" element={page(pages.Glosario)} />
        <Route path="/industrias" element={page(pages.Industrias)} />
        <Route path="/industrias/:slug" element={page(pages.Industria)} />
        <Route path="/inspecciones-fda-puerto-rico" element={page(pages.InspeccionesFda)} />
        {/* English twins (src/i18n/paths.ts): the same pages, in English */}
        <Route path="/en/templates" element={page(pages.Plantillas)} />
        <Route path="/en/templates/:slug" element={page(pages.Plantilla)} />
        <Route path="/en/glossary" element={page(pages.Glosario)} />
        <Route path="/en/industries" element={page(pages.Industrias)} />
        <Route path="/en/industries/:slug" element={page(pages.Industria)} />
        <Route path="/en/fda-inspections-puerto-rico" element={page(pages.InspeccionesFda)} />
        <Route path="/en" element={page(pages.Home)} />
        <Route path="/en/about" element={page(pages.About)} />
        <Route path="/en/contact" element={page(pages.Contact)} />
        <Route path="/en/self-assessment" element={page(pages.Autoevaluacion)} />
        <Route path="/en/faq" element={page(pages.Preguntas)} />
        <Route path="/en/faq/:slug" element={page(pages.Pregunta)} />
        <Route path="/en/guides/:slug" element={page(pages.Guia)} />
        <Route path="/en/privacy" element={page(pages.Privacy)} />
        <Route path="/en/terms" element={page(pages.Terms)} />
        <Route path="/en/cookies" element={page(pages.Cookies)} />
        <Route path="*" element={page(pages.NotFound)} />
      </Route>
    </Routes>
  );
}
