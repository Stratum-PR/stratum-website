import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>,
)

// Performance optimization: Pre-warm the root
const container = document.getElementById("root")!;
const root = createRoot(container);

// Enable concurrent features for better performance
root.render(<App />);

// Performance monitoring (optional)
if ('performance' in window && 'measure' in window.performance) {
  window.addEventListener('load', () => {
    // Mark when the app is fully loaded
    performance.mark('app-loaded');
  });
}
