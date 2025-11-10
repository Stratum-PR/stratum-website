
import { useEffect, useState } from 'react';
import { generateSitemapXml } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Generate the sitemap XML content (now async to fetch from Sanity)
        const xml = await generateSitemapXml();
        setSitemapXml(xml);
        
        // Create a blob with the XML content
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace the current page with the XML content
        window.location.replace(url);
      } catch (err: any) {
        console.error('Error generating sitemap:', err);
        setError(err.message || 'Failed to generate sitemap');
      }
    };

    generateSitemap();
  }, []);

  // Show a loading message while generating
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error Generating Sitemap</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
        <p className="text-gray-600">Fetching projects and blog posts from Sanity...</p>
      </div>
    </div>
  );
};

export default Sitemap;
