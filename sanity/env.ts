// Environment variables for Sanity
// Vite automatically loads .env files - we just need to access them correctly

export const apiVersion = '2024-01-01'

// Get env vars - Vite automatically loads .env files and makes them available
// via import.meta.env in browser/client code
// Sanity Studio may look for NEXT_PUBLIC_ variables, so we check both
function getEnvVar(key: string, defaultValue: string = ''): string {
  // In browser/Vite context - use import.meta.env (Vite loads .env automatically)
  try {
    if (typeof window !== 'undefined' && import.meta && import.meta.env) {
      // Try VITE_ first (our preference), then NEXT_PUBLIC_ (Sanity default), then default
      const viteKey = key
      const nextKey = key.replace('VITE_', 'NEXT_PUBLIC_')
      return import.meta.env[viteKey] || import.meta.env[nextKey] || defaultValue
    }
  } catch (e) {
    // import.meta not available, fall through to process.env
  }
  // Fallback for Node.js context (though Sanity Studio runs via Vite in browser)
  if (typeof process !== 'undefined' && process.env) {
    const viteKey = key
    const nextKey = key.replace('VITE_', 'NEXT_PUBLIC_')
    return process.env[viteKey] || process.env[nextKey] || defaultValue
  }
  return defaultValue
}

export const dataset = getEnvVar('VITE_SANITY_DATASET', 'production')
export const projectId = getEnvVar('VITE_SANITY_PROJECT_ID', '')

if (!projectId) {
  console.error('Missing VITE_SANITY_PROJECT_ID in environment variables')
  console.error('Make sure you have a .env file in the project root with:')
  console.error('  VITE_SANITY_PROJECT_ID=your_project_id_here')
  console.error('  VITE_SANITY_DATASET=production')
  console.error('')
  console.error('Or add NEXT_PUBLIC_ versions for Sanity Studio compatibility:')
  console.error('  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here')
  console.error('  NEXT_PUBLIC_SANITY_DATASET=production')
}

