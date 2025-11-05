/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env file for CLI commands
config({ path: resolve(process.cwd(), '.env') })
config({ path: resolve(process.cwd(), '.env.local') })

// Use VITE_ prefix (matching your .env file)
// Also support NEXT_PUBLIC_ for compatibility if someone has that set
const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.VITE_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({ 
  api: { projectId, dataset },
  // Configure Vite to use a separate build directory and resolve path aliases
  vite: (config) => {
    const srcPath = resolve(process.cwd(), 'src');
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': srcPath,
        },
      },
      build: {
        ...config.build,
        outDir: resolve(process.cwd(), '.sanity', 'dist'),
        emptyOutDir: true,
      },
      // Suppress dependency pre-bundling warnings for src files
      // These are just warnings and won't prevent the studio from running
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [
          ...(config.optimizeDeps?.exclude || []),
          '@sanity/visual-editing',
        ],
      },
    };
  },
})
