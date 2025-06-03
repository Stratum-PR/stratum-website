
import { getAllCaseStudies } from '@/data/caseStudies';
import { writeFileSync } from 'fs';
import { join } from 'path';

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
  ]
};

export const generateSitemapEntries = (): SitemapEntry[] => {
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

  // Add dynamic project pages
  const caseStudies = getAllCaseStudies();
  caseStudies.forEach(study => {
    entries.push({
      loc: `${sitemapConfig.baseUrl}/projects/${study.slug}`,
      lastmod: study.publishDate || now,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  return entries;
};

export const generateSitemapXml = (): string => {
  const entries = generateSitemapEntries();
  
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

export const generateSitemapFile = (): void => {
  const sitemapXml = generateSitemapXml();
  const publicPath = join(process.cwd(), 'public', 'sitemap.xml');
  
  try {
    writeFileSync(publicPath, sitemapXml, 'utf8');
    console.log('Sitemap generated successfully at:', publicPath);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};
