// Helper functions to fetch blog posts from both hardcoded data and Sanity
import { sanityClient, blogPostsQuery, blogPostBySlugQuery } from '@/lib/sanity';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blog';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export interface SanityBlogPost {
  _id: string;
  title: string;
  titleEs: string;
  slug: { current: string };
  excerpt: string;
  excerptEs: string;
  mainImage?: any;
  content?: any;
  contentEs?: any;
  publishedAt: string;
  tags?: string[];
  featured?: boolean;
  author?: {
    name: string;
    image?: any;
    bio?: string;
    bioEs?: string;
  };
}

// Convert Sanity post to match existing BlogPost interface
export function convertSanityPostToBlogPost(sanityPost: SanityBlogPost, language: 'en' | 'es') {
  const imageUrl = sanityPost.mainImage ? urlFor(sanityPost.mainImage).width(1200).height(630).url() : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center';
  
  return {
    id: sanityPost._id,
    slug: sanityPost.slug.current,
    title: language === 'es' ? sanityPost.titleEs : sanityPost.title,
    excerpt: language === 'es' ? sanityPost.excerptEs : sanityPost.excerpt,
    content: sanityPost.content || sanityPost.contentEs || '',
    publishedAt: sanityPost.publishedAt,
    tags: sanityPost.tags || [],
    featured: sanityPost.featured || false,
    author: {
      name: sanityPost.author?.name || 'Stratum PR',
      image: sanityPost.author?.image ? urlFor(sanityPost.author.image).width(200).height(200).url() : '/img/default-author.jpg',
      role: 'Data Analytics Expert'
    },
    image: imageUrl,
    category: 'Analytics',
    readTime: 5 // Default, could calculate from content
  };
}

// Fetch all blog posts (hybrid: hardcoded + Sanity)
export async function fetchAllBlogPosts() {
  const hardcodedPosts = getAllBlogPosts();
  
  try {
    // Try to fetch from Sanity if configured
    if (import.meta.env.VITE_SANITY_PROJECT_ID) {
      const sanityPosts = await sanityClient.fetch<SanityBlogPost[]>(blogPostsQuery);
      // Convert Sanity posts to match hardcoded format
      // For now, we'll return both and let the UI handle it
      return {
        hardcoded: hardcodedPosts,
        sanity: sanityPosts
      };
    }
  } catch (error) {
    console.error('Error fetching Sanity posts:', error);
    // If Sanity fails, just return hardcoded posts
  }
  
  return {
    hardcoded: hardcodedPosts,
    sanity: []
  };
}

// Fetch single blog post by slug (hybrid)
export async function fetchBlogPostBySlug(slug: string) {
  // First check hardcoded posts
  const hardcodedPost = getBlogPostBySlug(slug);
  if (hardcodedPost) {
    return { type: 'hardcoded', post: hardcodedPost };
  }
  
  // Then check Sanity if configured
  if (import.meta.env.VITE_SANITY_PROJECT_ID) {
    try {
      const sanityPost = await sanityClient.fetch<SanityBlogPost>(blogPostBySlugQuery, { slug });
      if (sanityPost) {
        return { type: 'sanity', post: sanityPost };
      }
    } catch (error) {
      console.error('Error fetching Sanity post:', error);
    }
  }
  
  return null;
}


