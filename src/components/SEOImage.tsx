
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
  ...props
}) => {
  const altText = alt || generateImageAlt(src, context);

  return (
    <img
      src={src}
      alt={altText}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
};

export default SEOImage;
