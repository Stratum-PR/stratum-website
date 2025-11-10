
// Add global gtag declaration for TypeScript
declare global {
  function gtag(...args: any[]): void;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

export const updateSEO = (seoData: SEOData) => {
  // Block indexing if on dev/staging domain
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isDevEnvironment = hostname.includes('dev.stratumpr.com') || 
                          hostname.includes('staging.stratumpr.com') || 
                          hostname.includes('.vercel.app');
  
  // Update robots meta tag for dev environments
  if (isDevEnvironment) {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }
  }
  
  // Update title
  document.title = seoData.title;

  // Update HTML lang attribute dynamically
  const isSpanish = /[áéíóúñüÁÉÍÓÚÑÜ]/.test(seoData.title + seoData.description);
  document.documentElement.lang = isSpanish ? 'es' : 'en';

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Update meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords);
  updateMetaTag('og:title', seoData.title, true);
  updateMetaTag('og:description', seoData.description, true);
  updateMetaTag('og:url', seoData.canonical, true);
  updateMetaTag('twitter:title', seoData.title);
  updateMetaTag('twitter:description', seoData.description);

  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, true);
    updateMetaTag('twitter:image', seoData.ogImage);
  }

  if (seoData.ogType) {
    updateMetaTag('og:type', seoData.ogType, true);
  }

  // Update og:locale based on content language (detect from title/description)
  const isSpanishLocale = /[áéíóúñüÁÉÍÓÚÑÜ]/.test(seoData.title + seoData.description);
  updateMetaTag('og:locale', isSpanishLocale ? 'es_PR' : 'en_US', true);

  // Update canonical link - always use production URL even on dev
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  // Always use the provided canonical URL (should be www.stratumpr.com)
  // This ensures dev sites always point to production
  canonical.setAttribute('href', seoData.canonical);

  // Add structured data if provided
  if (seoData.structuredData) {
    const existingScript = document.querySelector('script[type="application/ld+json"][data-page]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page', 'true');
    script.textContent = JSON.stringify(seoData.structuredData);
    document.head.appendChild(script);
  }
};

export const generateImageAlt = (imageSrc: string, context: string = ''): string => {
  const filename = imageSrc.split('/').pop()?.split('.')[0] || '';
  const contextPrefix = context ? `${context} - ` : '';
  
  // Generate meaningful alt text based on filename and context
  const altText = `${contextPrefix}${filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
  return altText;
};

export const trackPageView = (pageName: string) => {
  // Google Analytics 4 page view tracking
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: { custom_parameter: pageName }
    });
  }
};
