
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/contexts/LanguageContext";

interface MarkdownRendererProps {
  resourceSlug: string;
}

// Simple in-memory cache for markdown content
const contentCache = new Map<string, string>();

export const MarkdownRenderer = ({ resourceSlug }: MarkdownRendererProps) => {
  const { t } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const cacheKey = `${resourceSlug}.md`;
        
        // Check cache first
        if (contentCache.has(cacheKey)) {
          setContent(contentCache.get(cacheKey)!);
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/resources/${resourceSlug}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch resource content: ${response.status}`);
        }
        const text = await response.text();
        
        // Cache the content
        contentCache.set(cacheKey, text);
        setContent(text);
      } catch (err) {
        console.error('Error loading markdown content:', err);
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
        <span className="ml-3 font-telegraf text-gray-600">{t('resources.modal.loading')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="font-telegraf text-gray-600 mb-4">{t('resources.modal.error')}</p>
        <p className="font-telegraf text-sm text-gray-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded font-telegraf hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none markdown">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-telegraf font-bold text-3xl text-primary mb-6 mt-8 first:mt-0 border-b border-gray-200 pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-telegraf font-bold text-2xl text-primary mb-4 mt-8 border-b border-gray-100 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-telegraf font-semibold text-xl text-secondary mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-telegraf font-semibold text-lg text-gray-800 mb-2 mt-4">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="font-telegraf text-gray-700 leading-relaxed mb-4 text-base">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="font-telegraf text-gray-700 space-y-2 mb-6 ml-6 list-none">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="font-telegraf text-gray-700 space-y-2 mb-6 ml-6 list-decimal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-6">
              <span className="absolute left-0 text-primary font-bold">•</span>
              <span>{children}</span>
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-primary">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="font-telegraf font-semibold px-6 py-4 text-left text-white text-sm uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="font-telegraf px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-100">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 transition-colors">
              {children}
            </tr>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-gray-600 mb-6 bg-gray-50 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
              {children}
            </pre>
          ),
          hr: () => (
            <hr className="border-gray-300 my-8" />
          ),
          strong: ({ children }) => (
            <strong className="font-telegraf font-bold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="font-telegraf italic text-gray-700">
              {children}
            </em>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
