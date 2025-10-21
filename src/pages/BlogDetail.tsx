
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Tag, CheckCircle } from "lucide-react";
import { useSEO } from '@/hooks/useSEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogPostBySlug } from '@/data/blog';
import NotFound from './NotFound';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const post = slug ? getBlogPostBySlug(slug) : null;

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

  // Split content into sections for structured display
  const contentSections = content.content.split('\n\n');
  const introduction = contentSections.slice(0, 2).join('\n\n');
  const keyInsights = contentSections.slice(2, -2).join('\n\n');
  const takeaways = contentSections.slice(-2).join('\n\n');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-6 font-telegraf"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.hero.title')}
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <Tag className="h-8 w-8 text-primary" />
            <span className="font-telegraf text-sm text-gray-500 uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          <h1 className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
            {content.title}
          </h1>
          
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed mb-8">
            {content.summary}
          </p>

          {/* Article Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="font-telegraf text-sm text-gray-500">Author</p>
                <p className="font-telegraf font-semibold">{content.author.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-telegraf text-sm text-gray-500">Published</p>
                <p className="font-telegraf font-semibold">{new Date(post.publishDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-telegraf text-sm text-gray-500">Read Time</p>
                <p className="font-telegraf font-semibold">{content.readTime} min read</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src={post.image} 
            alt={content.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Introduction
                </h2>
                <div className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  <ReactMarkdown>{introduction || content.summary}</ReactMarkdown>
                </div>
              </div>

              {/* Key Insights */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Key Insights
                </h2>
                <div className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  <ReactMarkdown>{keyInsights || content.content}</ReactMarkdown>
                </div>
              </div>

              {/* Takeaways & Actions */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Takeaways & Actions
                </h2>
                <div className="space-y-4">
                  {takeaways ? (
                    <div className="font-telegraf text-gray-600 leading-relaxed text-justify">
                      <ReactMarkdown>{takeaways}</ReactMarkdown>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="font-telegraf text-gray-600">Consider how these insights apply to your organization's data strategy</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="font-telegraf text-gray-600">Evaluate your current analytics capabilities and identify improvement areas</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="font-telegraf text-gray-600">Contact our team to discuss implementation strategies for your specific needs</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={content.author.image}
                      alt={content.author.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-telegraf font-semibold text-gray-900">{content.author.name}</p>
                      <p className="font-telegraf text-sm text-gray-600">{content.author.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Article Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                    Article Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm font-telegraf bg-secondary/10 text-secondary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            {t('blog.cta.title')}
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            {t('blog.cta.description')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              {t('blog.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
