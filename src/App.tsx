import { BrowserRouter } from "react-router-dom";
// The home page ships with the main bundle so the hero (the LCP image) renders without waiting for a second chunk
import Home from "./pages/Home";
import { lazy as reactLazy, type ComponentType, type ReactNode } from "react";
import { type Pages } from "./AppRoutes";
import { AppTree } from "./AppTree";

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

// Lazy load all other pages for code splitting. Prerendered pages hydrate: React keeps the
// server HTML on screen while a page's chunk loads, so there is no loading flash.
const pages: Pages = {
  Home,
  About: lazy(() => import("./pages/About")),
  Contact: lazy(() => import("./pages/Contact")),
  Preguntas: lazy(() => import("./pages/Preguntas")),
  Pregunta: lazy(() => import("./pages/Pregunta")),
  Guia: lazy(() => import("./pages/Guia")),
  Autoevaluacion: lazy(() => import("./pages/Autoevaluacion")),
  Privacy: lazy(() => import("./pages/Privacy")),
  Terms: lazy(() => import("./pages/Terms")),
  Cookies: lazy(() => import("./pages/Cookies")),
  Unsubscribe: lazy(() => import("./pages/Unsubscribe")),
  EmailPreferences: lazy(() => import("./pages/EmailPreferences")),
  NotFound: lazy(() => import("./pages/NotFound")),
};

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="font-telegraf text-neutral-600">Cargando…</p>
    </div>
  </div>
);

const Browser = ({ children }: { children: ReactNode }) => <BrowserRouter>{children}</BrowserRouter>;

const App = () => <AppTree router={Browser} pages={pages} fallback={<PageLoader />} />;

export default App;
