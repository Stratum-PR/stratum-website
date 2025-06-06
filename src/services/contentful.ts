
import { createClient, Entry, Asset, EntrySkeletonType } from 'contentful';
import type { Language } from '@/types/language';

// Contentful client configuration
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'demo-space',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'demo-token',
});

// Contentful content type interfaces following EntrySkeletonType structure
export interface ContentfulAuthorFields {
  name: string;
  role: string;
  image: Asset;
  bio?: string;
}

export interface ContentfulAuthor extends EntrySkeletonType {
  contentTypeId: 'author';
  fields: ContentfulAuthorFields;
}

export interface ContentfulTagFields {
  name: string;
  displayName: string;
}

export interface ContentfulTag extends EntrySkeletonType {
  contentTypeId: 'tag';
  fields: ContentfulTagFields;
}

export interface ContentfulBlogPostFields {
  title: string;
  slug: string;
  summary: string;
  content: any; // Rich text content
  heroImage?: Asset;
  category: 'tech' | 'business' | 'data-science' | 'case-study';
  tags: Entry<ContentfulTag>[];
  author: Entry<ContentfulAuthor>;
  featured: boolean;
  publishDate: string;
  readTime: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface ContentfulBlogPost extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: ContentfulBlogPostFields;
}

// Helper function to extract asset URL
export const getAssetUrl = (asset?: Asset): string => {
  if (!asset?.fields?.file?.url) {
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center';
  }
  return `https:${asset.fields.file.url}`;
};

// Fetch all blog posts
export const fetchAllBlogPosts = async (locale: Language = 'en') => {
  try {
    const response = await client.getEntries<ContentfulBlogPost>({
      content_type: 'blogPost',
      locale: locale === 'en' ? 'en-US' : 'es',
      order: '-fields.publishDate',
    });

    return response.items.map(transformContentfulPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch blog post by slug
export const fetchBlogPostBySlug = async (slug: string, locale: Language = 'en') => {
  try {
    const response = await client.getEntries<ContentfulBlogPost>({
      content_type: 'blogPost',
      'fields.slug': slug,
      locale: locale === 'en' ? 'en-US' : 'es',
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformContentfulPost(response.items[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Transform Contentful entry to our blog post format
const transformContentfulPost = (entry: Entry<ContentfulBlogPost>) => {
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    slug: fields.slug,
    metadata: {
      title: {
        en: fields.seoTitle || fields.title,
        es: fields.seoTitle || fields.title,
      },
      description: {
        en: fields.seoDescription || fields.summary,
        es: fields.seoDescription || fields.summary,
      },
      keywords: {
        en: fields.seoKeywords || '',
        es: fields.seoKeywords || '',
      },
    },
    content: {
      en: {
        title: fields.title,
        summary: fields.summary,
        content: fields.content,
        author: {
          name: fields.author?.fields?.name || 'Stratum PR Team',
          role: fields.author?.fields?.role || 'Data Analytics Expert',
          image: getAssetUrl(fields.author?.fields?.image),
        },
        readTime: fields.readTime || 5,
      },
      es: {
        title: fields.title,
        summary: fields.summary,
        content: fields.content,
        author: {
          name: fields.author?.fields?.name || 'Equipo Stratum PR',
          role: fields.author?.fields?.role || 'Experto en Análisis de Datos',
          image: getAssetUrl(fields.author?.fields?.image),
        },
        readTime: fields.readTime || 5,
      },
    },
    tags: fields.tags?.map(tag => tag.fields?.displayName || tag.fields?.name) || [],
    category: fields.category || 'tech',
    image: getAssetUrl(fields.heroImage),
    featured: fields.featured || false,
    publishDate: fields.publishDate,
  };
};

// Fetch blog posts by category
export const fetchBlogPostsByCategory = async (category: string, locale: Language = 'en') => {
  try {
    const response = await client.getEntries<ContentfulBlogPost>({
      content_type: 'blogPost',
      'fields.category': category,
      locale: locale === 'en' ? 'en-US' : 'es',
      order: '-fields.publishDate',
    });

    return response.items.map(transformContentfulPost);
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};
