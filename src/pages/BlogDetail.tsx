import { useParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogPostBySlug } from '@/data/blog';
import NotFound from './NotFound';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return <NotFound />;
  }

  const content = post.content[language];

  // SEO optimization
  useSEO({
    title: post.metadata.title[language],
    description: post.metadata.description[language],
    keywords: post.metadata.keywords[language],
    canonical: `https://www.stratumpr.com/blog/${post.slug}`,
    ogType: 'article'
  }, `blog-${post.slug}`);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={post.image}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="font-telegraf font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              {content.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm md:text-base">
              <div className="flex items-center">
                <img
                  src={content.author.image}
                  alt={content.author.name}
                  className="h-10 w-10 rounded-full mr-2"
                />
                <span>{content.author.name}</span>
              </div>
              <span>•</span>
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{content.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-primary max-w-none">
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail; 