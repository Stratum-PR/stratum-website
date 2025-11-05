import { PortableText as SanityPortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

// Custom components for Portable Text rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(1200).height(630).url()
      return (
        <img
          src={imageUrl}
          alt={value.alt || 'Blog post image'}
          className="w-full h-auto my-8 rounded-xl shadow-lg"
        />
      )
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = value?.blank ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-semibold"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-telegraf font-bold text-4xl text-primary mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-telegraf font-bold text-3xl text-primary mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-telegraf font-bold text-2xl text-primary mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-telegraf font-semibold text-xl text-gray-800 mb-2 mt-4">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="font-telegraf font-semibold text-lg text-gray-800 mb-2 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="font-telegraf font-semibold text-sm text-gray-700 mb-2 mt-3">
        {children}
      </h6>
    ),
    normal: ({ children }: any) => (
      <p className="font-telegraf text-base text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-telegraf text-gray-700 space-y-2 mb-6 ml-6 list-disc">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-telegraf text-gray-700 space-y-2 mb-6 ml-6 list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-2">{children}</li>
    ),
  },
}

interface PortableTextProps {
  value: any
}

export const PortableText = ({ value }: PortableTextProps) => {
  if (!value) {
    console.warn('PortableText: No value provided');
    return null;
  }
  
  // Ensure value is an array (Portable Text format)
  const content = Array.isArray(value) ? value : [value];
  
  try {
    return (
      <SanityPortableText 
        value={content} 
        components={portableTextComponents}
      />
    );
  } catch (error) {
    console.error('Error rendering PortableText:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="font-telegraf text-red-800">Error rendering content. Please try refreshing the page.</p>
      </div>
    );
  }
}

