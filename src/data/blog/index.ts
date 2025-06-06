import { BlogPost } from './types';
import { aiAutomationPost } from './aiAutomationPost';

const blogPosts: BlogPost[] = [
  aiAutomationPost,
  // Add more blog posts here
];

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogPost['category']) => {
  return blogPosts.filter(post => post.category === category);
};

export type { BlogPost, BlogPostContent } from './types'; 