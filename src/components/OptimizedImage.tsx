
import React, { useState, useCallback } from 'react';
import { generateImageAlt } from '@/utils/seo';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  context?: string;
  priority?: boolean;
  sizes?: string;
  placeholderColor?: string;
  [key: string]: any;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  context = '',
  priority = false,
  sizes,
  placeholderColor = '#f0f0f0',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const altText = alt || generateImageAlt(src, context);
  const actualLoading = priority ? 'eager' : loading;
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);
  
  // Generate optimized srcset for better mobile performance
  const generateSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `${baseUrl}?w=400&q=75&fm=webp 400w, ${baseUrl}?w=768&q=80&fm=webp 768w, ${baseUrl}?w=1024&q=85&fm=webp 1024w, ${baseUrl}?w=1280&q=85&fm=webp 1280w`;
    }
    return undefined;
  };

  const srcSet = generateSrcSet(src);
  const optimizedSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // Placeholder dimensions
  const placeholderStyle = {
    backgroundColor: placeholderColor,
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
    minHeight: height ? `${height}px` : '200px',
    width: width ? `${width}px` : '100%',
  };

  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-400`}
        style={placeholderStyle}
        aria-label="Image failed to load"
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={!isLoaded ? placeholderStyle : undefined}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 img-loading rounded-inherit"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? optimizedSizes : undefined}
        alt={altText}
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
        width={width}
        height={height}
        loading={actualLoading}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          contentVisibility: 'auto',
          containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto',
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
