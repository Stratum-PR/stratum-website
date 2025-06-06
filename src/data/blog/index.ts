import { BlogPost } from './types';
import { aiAutomationPost } from './aiAutomationPost';

// Static blog posts as fallback
const staticBlogPosts: BlogPost[] = [
  aiAutomationPost,
  // Add more static blog posts here as needed
];

// Keep original functions for backward compatibility and fallback
export const getAllBlogPosts = (): BlogPost[] => {
  return staticBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return staticBlogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogPost['category']) => {
  return staticBlogPosts.filter(post => post.category === category);
};

export type { BlogPost, BlogPostContent } from './types';
