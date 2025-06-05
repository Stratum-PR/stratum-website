
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  resourceSlug: string;
}

export const MarkdownRenderer = ({ resourceSlug }: MarkdownRendererProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/resources/${resourceSlug}.md`);
        if (!response.ok) {
          throw new Error('Failed to fetch resource content');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [resourceSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 font-telegraf text-gray-600">Loading preview...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="font-telegraf text-gray-600 mb-4">Preview not available</p>
        <p className="font-telegraf text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-telegraf font-bold text-3xl text-primary mb-6 mt-8 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-telegraf font-bold text-2xl text-primary mb-4 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-telegraf font-semibold text-xl text-secondary mb-3 mt-5">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="font-telegraf text-gray-700 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="font-telegraf text-gray-700 space-y-2 mb-4 ml-6">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="relative">
              <span className="absolute -left-6 text-primary">•</span>
              {children}
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-primary text-white">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="font-telegraf font-semibold px-4 py-3 text-left border-r border-primary-300 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="font-telegraf px-4 py-3 border-r border-gray-200 last:border-r-0">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              {children}
            </tr>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 mb-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              {children}
            </code>
          ),
          hr: () => (
            <hr className="border-gray-300 my-8" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
