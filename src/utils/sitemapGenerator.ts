
import { sanityClient, projectsQuery, blogPostsQuery, isSanityConfigured } from '@/lib/sanity';

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  staticPages: Array<{
    path: string;
    priority: number;
    changefreq: SitemapEntry['changefreq'];
  }>;
}

const sitemapConfig: SitemapConfig = {
  baseUrl: 'https://www.stratumpr.com',
  staticPages: [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/projects', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' },
    { path: '/resources', priority: 0.7, changefreq: 'monthly' },
    { path: '/newsupdates', priority: 0.8, changefreq: 'weekly' },
    { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  ]
};

export const generateSitemapEntries = async (): Promise<SitemapEntry[]> => {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Add static pages
  sitemapConfig.staticPages.forEach(page => {
    entries.push({
      loc: `${sitemapConfig.baseUrl}${page.path}`,
      lastmod: now,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Add dynamic project pages from Sanity
  if (isSanityConfigured && sanityClient) {
    try {
      const projects = await sanityClient.fetch(projectsQuery);
      if (Array.isArray(projects)) {
        projects.forEach((project: any) => {
          if (project.slug?.current) {
            const publishedDate = project.publishedAt 
              ? new Date(project.publishedAt).toISOString().split('T')[0]
              : now;
            entries.push({
              loc: `${sitemapConfig.baseUrl}/projects/${project.slug.current}`,
              lastmod: publishedDate,
              changefreq: 'monthly',
              priority: 0.7
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch projects for sitemap:', error);
      // Continue without projects if fetch fails
    }

    // Add dynamic blog posts from Sanity
    try {
      const blogPosts = await sanityClient.fetch(blogPostsQuery);
      if (Array.isArray(blogPosts)) {
        blogPosts.forEach((post: any) => {
          if (post.slug?.current) {
            const publishedDate = post.publishedAt 
              ? new Date(post.publishedAt).toISOString().split('T')[0]
              : now;
            entries.push({
              loc: `${sitemapConfig.baseUrl}/newsupdates/${post.slug.current}`,
              lastmod: publishedDate,
              changefreq: 'monthly',
              priority: 0.6
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch blog posts for sitemap:', error);
      // Continue without blog posts if fetch fails
    }
  }

  return entries;
};

export const generateSitemapXml = async (): Promise<string> => {
  const entries = await generateSitemapEntries();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};
