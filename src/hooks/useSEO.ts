import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, trackPageView, type SEOData } from '@/utils/seo';

export const useSEO = (seoData: SEOData, pageName?: string) => {
  const location = useLocation();

  useEffect(() => {
    // Update SEO data
    updateSEO(seoData);

    // Update hreflang tags dynamically
    const updateHreflang = () => {
      // Remove existing hreflang tags
      const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflangs.forEach(tag => tag.remove());

      // Detect language from content
      const isSpanish = /[áéíóúñüÁÉÍÓÚÑÜ]/.test(seoData.title + seoData.description);
      // Always use production domain for hreflang tags for SEO consistency
      const currentUrl = `https://www.stratumpr.com${location.pathname}`;

      // Add hreflang tags
      const enLink = document.createElement('link');
      enLink.setAttribute('rel', 'alternate');
      enLink.setAttribute('hreflang', 'en');
      enLink.setAttribute('href', currentUrl);
      document.head.appendChild(enLink);

      const esLink = document.createElement('link');
      esLink.setAttribute('rel', 'alternate');
      esLink.setAttribute('hreflang', 'es');
      esLink.setAttribute('href', currentUrl);
      document.head.appendChild(esLink);

      // Add x-default
      const defaultLink = document.createElement('link');
      defaultLink.setAttribute('rel', 'alternate');
      defaultLink.setAttribute('hreflang', 'x-default');
      defaultLink.setAttribute('href', currentUrl);
      document.head.appendChild(defaultLink);
    };

    updateHreflang();

    // Track page view
    if (pageName) {
      trackPageView(pageName);
    }

    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);
  }, [location.pathname, seoData, pageName]);
};

