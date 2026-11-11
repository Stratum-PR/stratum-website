/**
 * Prerender entry: renders one route to HTML at build time (scripts/prerender.ts).
 * Pages are imported eagerly here; the browser build lazy-loads the same components.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import type { ReactNode } from "react";
import { type Pages } from "./AppRoutes";
import { AppTree } from "./AppTree";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Preguntas from "./pages/Preguntas";
import Pregunta from "./pages/Pregunta";
import Guia from "./pages/Guia";
import Autoevaluacion from "./pages/Autoevaluacion";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Unsubscribe from "./pages/Unsubscribe";
import EmailPreferences from "./pages/EmailPreferences";
import Plantillas from "./pages/Plantillas";
import Plantilla from "./pages/Plantilla";
import Glosario from "./pages/Glosario";
import Industrias from "./pages/Industrias";
import Industria from "./pages/Industria";
import InspeccionesFda from "./pages/InspeccionesFda";
import NotFound from "./pages/NotFound";

export { ALL_PAGE_ROUTES, getPublicBaseUrl } from "./config/discoverable-routes";

const pages: Pages = {
  Home,
  About,
  Contact,
  Preguntas,
  Pregunta,
  Guia,
  Autoevaluacion,
  Privacy,
  Terms,
  Cookies,
  Unsubscribe,
  EmailPreferences,
  Plantillas,
  Plantilla,
  Glosario,
  Industrias,
  Industria,
  InspeccionesFda,
  NotFound,
};

export function render(url: string): { html: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const Static = ({ children }: { children: ReactNode }) => <StaticRouter location={url}>{children}</StaticRouter>;
  const html = renderToString(<AppTree router={Static} pages={pages} fallback={null} helmetContext={helmetContext} />);
  return { html, helmet: helmetContext.helmet! };
}
