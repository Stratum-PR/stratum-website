
import { useQuery } from '@tanstack/react-query';
import { fetchAllBlogPosts, fetchBlogPostBySlug, fetchBlogPostsByCategory } from '@/services/contentful';
import { getAllBlogPosts, getBlogPostBySlug, getBlogPostsByCategory } from '@/data/blog';
import type { Language } from '@/types/language';
import type { BlogPost } from '@/data/blog/types';

// Hook for fetching all blog posts
export const useAllBlogPosts = (language: Language) => {
  return useQuery({
    queryKey: ['blogPosts', language],
    queryFn: async () => {
      // Try Contentful first, fallback to static data
      const contentfulPosts = await fetchAllBlogPosts(language);
      if (contentfulPosts.length > 0) {
        return contentfulPosts;
      }
      // Fallback to static blog posts
      return getAllBlogPosts();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single blog post by slug
export const useBlogPost = (slug: string, language: Language) => {
  return useQuery({
    queryKey: ['blogPost', slug, language],
    queryFn: async () => {
      // Try Contentful first, fallback to static data
      const contentfulPost = await fetchBlogPostBySlug(slug, language);
      if (contentfulPost) {
        return contentfulPost;
      }
      // Fallback to static blog post
      return getBlogPostBySlug(slug);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug,
  });
};

// Hook for fetching blog posts by category
export const useBlogPostsByCategory = (category: BlogPost['category'], language: Language) => {
  return useQuery({
    queryKey: ['blogPostsByCategory', category, language],
    queryFn: async () => {
      // Try Contentful first, fallback to static data
      const contentfulPosts = await fetchBlogPostsByCategory(category, language);
      if (contentfulPosts.length > 0) {
        return contentfulPosts;
      }
      // Fallback to static blog posts
      return getBlogPostsByCategory(category);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
