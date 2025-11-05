// Environment variables for Sanity
// Works in both Vite (browser) and Sanity Studio (Node.js) contexts
export const apiVersion = '2024-01-01'

// Load .env file if we're in Node.js (Sanity Studio)
if (typeof process !== 'undefined' && process.env && typeof window === 'undefined') {
  try {
    // Try to load dotenv if available (for Node.js/Sanity Studio)
    // Sanity Studio should handle .env loading, but we ensure process.env is used
  } catch (e) {
    // dotenv not available, that's okay
  }
}

// Get env vars - works in both Vite and Node.js contexts
function getEnvVar(key: string, defaultValue: string = ''): string {
  // In Node.js/Sanity Studio context - use process.env
  if (typeof process !== 'undefined' && process.env && typeof window === 'undefined') {
    return process.env[key] || process.env[key.replace('VITE_', '')] || defaultValue
  }
  // In Vite/browser context - use import.meta.env
  if (typeof window !== 'undefined' && import.meta && import.meta.env) {
    return import.meta.env[key] || defaultValue
  }
  return defaultValue
}

export const dataset = getEnvVar('VITE_SANITY_DATASET', 'production')
export const projectId = getEnvVar('VITE_SANITY_PROJECT_ID', '')

if (!projectId) {
  console.error('Missing VITE_SANITY_PROJECT_ID in environment variables')
  console.error('Make sure you have a .env file with VITE_SANITY_PROJECT_ID set')
  console.error('Or set it directly: export VITE_SANITY_PROJECT_ID=your_project_id')
}
