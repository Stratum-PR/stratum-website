import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { sanityClient, blogPostsQuery, urlFor, isSanityConfigured } from "@/lib/sanity";
import { BlogSubscription } from "@/components/BlogSubscription";

interface SanityBlogPost {
  _id: string;
  title: string;
  titleEs: string;
  slug: { current: string };
  excerpt: string;
  excerptEs: string;
  mainImage?: any;
  publishedAt: string;
  tags?: string[];
  featured?: boolean;
  author?: {
    name: string;
    image?: any;
  };
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<SanityBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if Sanity is configured
        if (!isSanityConfigured || !sanityClient) {
          const errorMsg = 'Blog is not configured. Please set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in Vercel environment variables.';
          console.error('❌ Sanity is not configured:', {
            isSanityConfigured,
            hasClient: !!sanityClient,
            projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'MISSING',
            dataset: import.meta.env.VITE_SANITY_DATASET || 'MISSING',
            envMode: import.meta.env.MODE,
            isProd: import.meta.env.PROD,
          });
          setError(errorMsg);
          setLoading(false);
          return;
        }
        
        console.log('📡 Fetching blog posts from Sanity...');
        console.log('Query:', blogPostsQuery);
        console.log('Client config:', {
          projectId: sanityClient.config().projectId,
          dataset: sanityClient.config().dataset,
        });
        
        const posts = await sanityClient.fetch<SanityBlogPost[]>(blogPostsQuery);
        
        console.log('✅ Fetched posts:', posts.length);
        if (posts.length > 0) {
          console.log('First post:', {
            id: posts[0]._id,
            title: posts[0].title,
            slug: posts[0].slug?.current,
          });
        } else {
          console.warn('⚠️ No posts returned - check if posts are published with publishedAt date');
        }
        
        if (Array.isArray(posts)) {
          setBlogPosts(posts);
        } else {
          console.error('❌ Unexpected response format:', posts);
          setError('Invalid response from server');
          setBlogPosts([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching blog posts:', err);
        console.error('Error details:', {
          message: err?.message,
          statusCode: err?.statusCode,
          responseBody: err?.responseBody,
        });
        
        let errorMessage = 'Failed to load blog posts';
        
        if (err?.message?.includes('projectId')) {
          errorMessage = 'Sanity Project ID is missing. Check your .env file.';
        } else if (err?.message?.includes('CORS')) {
          errorMessage = 'CORS error. Check Sanity project settings.';
        } else if (err?.statusCode === 401) {
          errorMessage = 'Unauthorized. Check your Sanity project ID.';
        } else if (err?.statusCode === 404) {
          errorMessage = 'Project not found. Verify your Sanity project ID.';
        }
        
        setError(errorMessage);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // SEO optimization for blog page
  useSEO({
    title: "Blog - Stratum PR Data Analytics Insights and Updates",
    description: "Stay informed with the latest insights, trends, and best practices in data analytics, AI automation, and digital transformation from Stratum PR experts.",
    keywords: "data analytics blog, AI insights, digital transformation, Puerto Rico tech, business intelligence blog",
    canonical: "https://www.stratumpr.com/newsupdates",
    ogType: "website"
  }, "blog");

  return (
    <div className="pt-[50px]">
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-3xl md:text-4xl text-white drop-shadow-lg mb-6">
            {t('blog.hero.title')}
          </h1>
          
          {/* Subscription Box - Below title */}
          <div className="max-w-2xl mx-auto">
            <BlogSubscription />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 font-telegraf text-gray-600">Loading blog posts...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-telegraf text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-telegraf text-gray-600 text-lg mb-4">No blog posts found.</p>
              <p className="font-telegraf text-gray-500">Create your first post in Sanity Studio!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => {
                const title = language === 'es' ? post.titleEs : post.title;
                const excerpt = language === 'es' ? post.excerptEs : post.excerpt;
                const imageUrl = post.mainImage 
                  ? urlFor(post.mainImage).width(800).height(600).url()
                  : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center';
                const authorName = post.author?.name || 'Stratum PR';
                const authorImage = post.author?.image 
                  ? urlFor(post.author.image).width(200).height(200).url()
                  : '/img/default-author.jpg';
                
                return (
                  <Link key={post._id} to={`/newsupdates/${post.slug.current}`} className="group">
                    <Card className="group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden cursor-pointer h-full bg-white rounded-2xl">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-telegraf font-semibold bg-primary text-white rounded-full uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 space-y-4">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs font-telegraf bg-gray-100 text-gray-600 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <h3 className="font-telegraf font-bold text-xl text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {title}
                        </h3>
                        
                        <p className="font-telegraf text-gray-600 leading-relaxed text-sm line-clamp-3">
                          {excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1.5" />
                              <span className="font-medium">{authorName}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center text-primary group-hover:text-secondary transition-colors font-telegraf font-semibold text-sm">
                            <span>{t('blog.readmore')}</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;
