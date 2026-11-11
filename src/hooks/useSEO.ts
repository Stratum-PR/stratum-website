import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, type SEOData } from '@/utils/seo';

export interface UseSEOOptions {
  /** When true, do not update document title/meta (use PageMeta/Helmet instead). */
  skipMeta?: boolean;
}

export const useSEO = (seoData: SEOData, pageName?: string, options?: UseSEOOptions) => {
  const location = useLocation();
  const skipMeta = options?.skipMeta === true;

  useEffect(() => {
    if (!skipMeta) {
      updateSEO(seoData);
    }

    // No hreflang: the site has one URL per page (the language switch only changes the text in the browser)

    // Page views are captured by PostHog (with consent) on each route change

    // Scroll to top on route change for better UX, unless the link targets a section (ScrollToTop handles it)
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, seoData, pageName]);
};

