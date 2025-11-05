import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || ''
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Check if Sanity is properly configured
export const isSanityConfigured = !!projectId

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('🔍 Sanity Client Config:', {
    projectId: projectId || 'MISSING',
    dataset,
    hasProjectId: !!projectId,
    isConfigured: isSanityConfigured,
  })
}

if (!projectId) {
  console.error('❌ CRITICAL: VITE_SANITY_PROJECT_ID is missing!')
  console.error('   Add it to your .env file: VITE_SANITY_PROJECT_ID=your_project_id')
  console.error('   For Vercel: Add VITE_SANITY_PROJECT_ID in Environment Variables section')
}

// Only create client if projectId is configured
// This prevents crashes when env vars are missing in production
let sanityClient: ReturnType<typeof createClient> | null = null

if (projectId) {
  sanityClient = createClient({
    projectId,
    dataset,
    // Disable CDN in development to avoid CORS issues
    // CDN requires CORS configuration, direct API doesn't
    useCdn: import.meta.env.PROD, // Use CDN only in production
    apiVersion: '2024-01-01',
    // Add token if available (for private content, not needed for public read)
    token: import.meta.env.VITE_SANITY_TOKEN || undefined,
  })
} else {
  console.warn('⚠️ Sanity client not initialized - VITE_SANITY_PROJECT_ID is missing')
}

// Export client with null check helper
export { sanityClient }

// Create image builder only if client exists
let builder: ReturnType<typeof imageUrlBuilder> | null = null

if (sanityClient) {
  builder = imageUrlBuilder(sanityClient)
}

export function urlFor(source: any) {
  if (!builder) {
    console.warn('⚠️ Sanity image builder not available - VITE_SANITY_PROJECT_ID is missing')
    // Return a chainable object that matches the imageUrlBuilder interface
    const fallback = {
      width: () => fallback,
      height: () => fallback,
      url: () => ''
    }
    return fallback
  }
  return builder.image(source)
}

// Queries
export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  titleEs,
  slug,
  excerpt,
  excerptEs,
  mainImage,
  publishedAt,
  tags,
  featured,
  "author": author->{name, image}
}`

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  titleEs,
  slug,
  excerpt,
  excerptEs,
  mainImage,
  content,
  contentEs,
  publishedAt,
  tags,
  "author": author->{name, image, bio, bioEs}
}`

export const featuredBlogPostsQuery = `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  titleEs,
  slug,
  excerpt,
  excerptEs,
  mainImage,
  publishedAt,
  tags
}`


