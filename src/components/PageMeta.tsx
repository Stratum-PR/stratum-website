/**
 * Renders per-page meta tags (title, description, canonical, og, twitter) from a DiscoverableRoute.
 * Resolves og:image to absolute URL when path starts with /.
 *
 * SECURITY: jsonLd must be trusted/sanitized content only (e.g. JSON.stringify of our own
 * structured data). Do not pass user input; it is injected into a <script type="application/ld+json">.
 */

import { Helmet } from 'react-helmet-async';
import { getPublicBaseUrl, safePathForUrl, DEFAULT_OG_IMAGE, type DiscoverableRoute } from '@/config/discoverable-routes';

export interface PageMetaProps {
  route: DiscoverableRoute;
  /** Override og:image (path or full URL). If starts with /, resolved to absolute. */
  image?: string;
  /** Pre-rendered JSON-LD string for structured data. */
  jsonLd?: string;
}

function resolveImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  const base = getPublicBaseUrl();
  const path = image.startsWith('/') ? image : `${image.startsWith('/') ? '' : '/'}${image}`;
  return `${base}${safePathForUrl(path)}`;
}

export function PageMeta({ route, image, jsonLd }: PageMetaProps) {
  const baseUrl = getPublicBaseUrl();
  const canonicalUrl = baseUrl + safePathForUrl(route.path);
  const ogImage = image != null ? resolveImageUrl(image) : resolveImageUrl(DEFAULT_OG_IMAGE);

  return (
    <Helmet>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={route.title} />
      <meta property="og:description" content={route.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      <meta name="twitter:image" content={ogImage} />
      {route.noindex === true && (
        <meta name="robots" content="noindex, nofollow" />
      )}
      {jsonLd != null && jsonLd.trim() !== '' && (
        <script type="application/ld+json">{jsonLd}</script>
      )}
    </Helmet>
  );
}
