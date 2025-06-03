
import React from 'react';
import { generateImageAlt } from '@/utils/seo';

interface SEOImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  context?: string;
  priority?: boolean;
  sizes?: string;
  [key: string]: any;
}

const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  context = '',
  priority = false,
  sizes,
  ...props
}) => {
  const altText = alt || generateImageAlt(src, context);
  
  // For priority images (hero, above fold), use eager loading
  const actualLoading = priority ? 'eager' : loading;
  
  // Generate responsive srcset for better mobile performance
  const generateSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `${baseUrl}?w=480&q=75 480w, ${baseUrl}?w=768&q=75 768w, ${baseUrl}?w=1024&q=75 1024w, ${baseUrl}?w=1280&q=75 1280w`;
    }
    return undefined;
  };

  const srcSet = generateSrcSet(src);
  const optimizedSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? optimizedSizes : undefined}
      alt={altText}
      className={className}
      width={width}
      height={height}
      loading={actualLoading}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...props}
    />
  );
};

export default SEOImage;
