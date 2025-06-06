
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";
import { useSEO } from '@/hooks/useSEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPost } from '@/hooks/useBlog';
import RichTextRenderer from '@/components/RichTextRenderer';
import NotFound from './NotFound';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { data: post, isLoading, error } = useBlogPost(slug || '', language);

  // Loading skeleton
  const BlogDetailSkeleton = () => (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="w-full h-96 rounded-xl" />
        </div>
      </section>
    </div>
  );

  // Error handling
  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

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
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center";
            }}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <RichTextRenderer content={content.content} />
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
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                      }}
                    />
                    <div>
                      <p className="font-telegraf font-semibold text-gray-900">{content.author.name}</p>
                      <p className="font-telegraf text-sm text-gray-600">{content.author.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {post.tags.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                      Tags
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
              )}
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
