
import { useEffect } from 'react';
import { generateSitemapFile } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    // Generate the sitemap XML file in public folder
    generateSitemapFile();
    
    // Redirect to the generated XML file
    window.location.replace('/sitemap.xml');
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
