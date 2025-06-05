export interface BlogPostContent {
  title: string;
  summary: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  readTime: number; // in minutes
}

export interface BlogPost {
  slug: string;
  id: number;
  metadata: {
    title: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    keywords: {
      en: string;
      es: string;
    };
  };
  content: {
    en: BlogPostContent;
    es: BlogPostContent;
  };
  tags: string[];
  category: 'tech' | 'business' | 'data-science' | 'case-study';
  image: string;
  featured: boolean;
  publishDate: string;
} 