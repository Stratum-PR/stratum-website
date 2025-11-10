
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useSEO } from '@/hooks/useSEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { sanityClient, blogPostBySlugQuery, urlFor, isSanityConfigured } from '@/lib/sanity';
import NotFound from './NotFound';
import { PortableText } from '@/components/PortableText';
import { BlogSubscription } from '@/components/BlogSubscription';

interface SanityBlogPost {
  _id: string;
  title: string;
  titleEs: string;
  slug: { current: string };
  excerpt: string;
  excerptEs: string;
  mainImage?: any;
  content?: any;
  contentEs?: any;
  publishedAt: string;
  tags?: string[];
  author?: {
    name: string;
    image?: any;
    bio?: string;
    bioEs?: string;
  };
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [post, setPost] = useState<SanityBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Check if Sanity is configured
        if (!isSanityConfigured || !sanityClient) {
          console.error('❌ Sanity is not configured - missing VITE_SANITY_PROJECT_ID');
          setError('Blog is not configured. Please set VITE_SANITY_PROJECT_ID in environment variables.');
          setLoading(false);
          return;
        }
        
        console.log('📡 Fetching blog post by slug:', slug);
        const fetchedPost = await sanityClient.fetch<SanityBlogPost>(blogPostBySlugQuery, { slug });
        
        console.log('✅ Fetched post:', fetchedPost ? 'Found' : 'Not found');
        
        if (!fetchedPost) {
          console.error('❌ Post not found for slug:', slug);
          setError('Post not found');
          setPost(null);
        } else {
          console.log('Post data:', {
            id: fetchedPost._id,
            title: fetchedPost.title,
            hasContent: !!fetchedPost.content,
            hasContentEs: !!fetchedPost.contentEs,
            hasAuthor: !!fetchedPost.author,
            contentType: typeof fetchedPost.content,
            isContentArray: Array.isArray(fetchedPost.content),
          });
          setPost(fetchedPost);
          setError(null);
        }
      } catch (err: any) {
        console.error('❌ Error fetching blog post:', err);
        console.error('Error details:', {
          message: err?.message,
          statusCode: err?.statusCode,
          responseBody: err?.responseBody,
          stack: err?.stack,
        });
        
        let errorMessage = 'Failed to load blog post';
        
        if (err?.message?.includes('CORS')) {
          errorMessage = 'CORS error. Try refreshing the page.';
        } else if (err?.statusCode === 404) {
          errorMessage = 'Post not found.';
        } else if (err?.message) {
          errorMessage = `Error: ${err.message}`;
        }
        
        setError(errorMessage);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Calculate values for SEO (before conditional returns to satisfy hooks rules)
  const title = post ? (language === 'es' ? post.titleEs : post.title) : '';
  const excerpt = post ? (language === 'es' ? post.excerptEs : post.excerpt) : '';
  const content = post ? (language === 'es' ? post.contentEs : post.content) : null;
  
  // SEO optimization - MUST be called before any conditional returns
  useSEO({
    title: post ? `${title} - Stratum PR Blog` : 'Blog Post - Stratum PR',
    description: excerpt || 'Read our latest insights on data analytics and business intelligence',
    keywords: (post?.tags && Array.isArray(post.tags)) ? post.tags.join(', ') : 'data analytics, business intelligence',
            canonical: post ? `https://www.stratumpr.com/newsupdates/${post.slug.current}` : 'https://www.stratumpr.com/newsupdates',
    ogType: 'article'
  }, `blog-${slug || 'unknown'}`);

  // Now safe to do conditional returns
  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-4 font-telegraf text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (error || !post) {
    // Show error message instead of just NotFound
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="font-telegraf font-bold text-3xl text-primary mb-4">Error Loading Post</h1>
          <p className="font-telegraf text-gray-600 mb-6">{error || 'Post not found'}</p>
          <Button onClick={() => navigate('/blog')} className="font-telegraf">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          <div className="mt-8 p-4 bg-gray-100 rounded text-left">
            <p className="font-telegraf text-sm text-gray-600">
              <strong>Debug Info:</strong>
            </p>
            <p className="font-telegraf text-xs text-gray-500 mt-2">
              Slug: {slug}
            </p>
            <p className="font-telegraf text-xs text-gray-500">
              Error: {error || 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Validate content before rendering
  if (!content) {
    console.error('❌ No content available for this post');
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-telegraf font-bold text-3xl text-primary mb-4">Content Not Available</h1>
          <p className="font-telegraf text-gray-600 mb-6">This post doesn't have content yet.</p>
          <Button onClick={() => navigate('/blog')} className="font-telegraf">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  // Extract post data (post is guaranteed to exist here)
  const authorName = post.author?.name || 'Stratum PR';
  
  // Safely generate image URLs with error handling
  let authorImage = '/img/default-author.jpg';
  try {
    if (post.author?.image) {
      authorImage = urlFor(post.author.image).width(200).height(200).url();
    }
  } catch (err) {
    console.warn('Error generating author image URL:', err);
  }
  
  let authorBio = '';
  try {
    authorBio = language === 'es' 
      ? (post.author?.bioEs || post.author?.bio || '')
      : (post.author?.bio || '');
  } catch (err) {
    console.warn('Error reading author bio:', err);
  }
  
  let mainImageUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop&crop=center';
  try {
    if (post.mainImage) {
      mainImageUrl = urlFor(post.mainImage).width(1200).height(630).url();
    }
  } catch (err) {
    console.warn('Error generating main image URL:', err);
  }

  return (
    <div>
      {/* Hero Section with Background */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0">
          <img 
            src="/img/topographic-linear-background.jpg" 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/newsupdates')}
            className="mb-6 font-telegraf text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.hero.title')}
          </Button>
          
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-telegraf bg-white/20 text-white rounded-full uppercase tracking-wide backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-telegraf font-bold text-3xl md:text-4xl text-white drop-shadow-lg mb-6">
            {title}
          </h1>
          
          <p className="font-telegraf text-xl text-white/90 drop-shadow-md leading-relaxed mb-8">
            {excerpt}
          </p>

          {/* Article Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Author</p>
                <p className="font-telegraf font-semibold text-white">{authorName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Published</p>
                <p className="font-telegraf font-semibold text-white">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {post.mainImage && (
        <section className="pb-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={mainImageUrl} 
              alt={title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pt-0 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="font-telegraf text-gray-700 leading-relaxed prose prose-lg max-w-none [&>*:first-child]:!mt-0 [&_h6]:!text-sm [&_h6]:!font-semibold [&_h6]:!mb-1 [&_h6]:!mt-2 [&_h6]:!leading-normal">
                <PortableText value={content} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Article Tags */}
              {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Subscription */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSubscription />
        </div>
      </section>

    </div>
  );
};

export default BlogDetail;
