
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Get the root container
const container = document.getElementById("root")!;
const root = createRoot(container);

// Render the app with React StrictMode and SpeedInsights
root.render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>
);

// Performance monitoring
if ('performance' in window && 'measure' in window.performance) {
  window.addEventListener('load', () => {
    performance.mark('app-loaded');
  });
}
