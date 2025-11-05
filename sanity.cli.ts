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
  // Configure Vite to use a separate build directory
  vite: (config) => ({
    ...config,
    build: {
      ...config.build,
      outDir: resolve(process.cwd(), '.sanity', 'dist'),
      emptyOutDir: true,
    },
  }),
})
