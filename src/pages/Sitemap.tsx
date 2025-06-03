
import { useEffect } from 'react';
import { generateSitemapXml } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    // Generate the sitemap XML content
    const sitemapXml = generateSitemapXml();
    
    // Create a blob with the XML content
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to download/view the sitemap
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    
    // Replace the current page with the XML content
    window.location.replace(url);
  }, []);

  // Show a loading message while generating
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
