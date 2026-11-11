
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAnalytics } from './lib/analytics'

// PostHog only if the visitor already accepted in the consent banner
initAnalytics()

const container = document.getElementById("root")!;
const app = <App />;

// Pages arrive prerendered (scripts/prerender.ts): hydrate them. In development (vite dev)
// #root arrives empty: render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// Performance monitoring
if ('performance' in window && 'measure' in window.performance) {
  window.addEventListener('load', () => {
    performance.mark('app-loaded');
  });
}
