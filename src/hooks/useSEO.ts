
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, trackPageView, type SEOData } from '@/utils/seo';

export const useSEO = (seoData: SEOData, pageName?: string) => {
  const location = useLocation();

  useEffect(() => {
    // Update SEO data
    updateSEO(seoData);

    // Track page view
    if (pageName) {
      trackPageView(pageName);
    }

    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);
  }, [location.pathname, seoData, pageName]);
};
