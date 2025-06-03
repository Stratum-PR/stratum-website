
import { useEffect } from 'react';
import { generateSitemapXml } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    // Generate the sitemap XML
    const sitemapXml = generateSitemapXml();
    
    // Create a response with proper XML content-type
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Redirect to the XML content
    window.location.replace(url);
  }, []);

  // Show a loading message while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
        <p className="text-gray-600">You will be redirected to the XML sitemap shortly.</p>
      </div>
    </div>
  );
};

export default Sitemap;
