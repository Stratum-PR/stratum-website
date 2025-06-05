import { BlogPost } from './types';
import { aiAutomationPost } from './aiAutomationPost';

export const blogPostsData = [
  aiAutomationPost,
  // Add more blog posts here
];

export const getBlogPostBySlug = (slug: string) => {
  return blogPostsData.find(post => post.slug === slug);
};

export const getAllBlogPosts = () => {
  return blogPostsData;
};

export const getBlogPostsByCategory = (category: BlogPost['category']) => {
  return blogPostsData.filter(post => post.category === category);
};

export type { BlogPost, BlogPostContent } from './types'; 