
import { useEffect } from 'react';
import { generateSitemapXml } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    // Set the content type to XML
    document.contentType = 'application/xml';
    
    // Generate and display the sitemap XML
    const sitemapXml = generateSitemapXml();
    
    // Replace the entire document content with the XML
    document.open();
    document.write(sitemapXml);
    document.close();
  }, []);

  // This component renders nothing visible as it replaces the document content
  return null;
};

export default Sitemap;
