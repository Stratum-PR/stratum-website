import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild, isPreview }) => ({
  // `vite preview` serves dist/ like Vercel does: each page's own prerendered file, 404.html otherwise
  appType: isPreview ? 'mpa' : 'spa',
  server: {
    host: "localhost",
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  // CommonJS packages whose named exports Node can't import directly: bundle them into the SSR build
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  build: {
    // Enable code splitting and optimize chunks
    // The SSR build (src/entry-server.tsx, for the prerender) keeps its dependencies external: no vendor chunks
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          'query-vendor': ['@tanstack/react-query'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Enable minification (esbuild is faster and included by default)
    minify: 'esbuild',
    // Remove console.log in production
    ...(mode === 'production' && {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }),
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional - disable for smaller builds)
    sourcemap: mode === 'development',
  },
}));
