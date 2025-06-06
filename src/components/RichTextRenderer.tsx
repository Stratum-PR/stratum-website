
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  content: Document | string;
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  // If content is a string (markdown), render as-is for now
  if (typeof content === 'string') {
    return (
      <div className={`prose prose-lg prose-primary max-w-none ${className}`}>
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // Rich text rendering options for Contentful
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="font-telegraf font-bold text-3xl text-primary mb-6 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="font-telegraf font-bold text-2xl text-primary mb-4 mt-6">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="font-telegraf font-semibold text-xl text-gray-900 mb-3 mt-5">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li className="ml-4">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <blockquote className="border-l-4 border-primary bg-gray-50 p-4 mb-4 italic">
          {children}
        </blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = `https:${file.url}`;
        return (
          <div className="my-8">
            <img
              src={imageUrl}
              alt={title || 'Embedded image'}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {title && (
              <p className="text-sm text-gray-500 text-center mt-2 italic">{title}</p>
            )}
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary underline transition-colors"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className={`prose prose-lg prose-primary max-w-none ${className}`}>
      {documentToReactComponents(content as Document, options)}
    </div>
  );
};

export default RichTextRenderer;
