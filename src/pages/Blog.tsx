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
          useCdn: sanityClient.config().useCdn,
        });
        console.log('Environment:', {
          MODE: import.meta.env.MODE,
          PROD: import.meta.env.PROD,
          DEV: import.meta.env.DEV,
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
        
        // More specific error messages
        if (err?.message?.includes('projectId') || err?.message?.includes('Project ID')) {
          errorMessage = 'Sanity Project ID is missing. Check your .env.local file.';
        } else if (err?.message?.includes('CORS') || err?.message?.includes('Access-Control')) {
          errorMessage = 'CORS error. For localhost, this shouldn\'t happen. Check Sanity project settings.';
        } else if (err?.statusCode === 401) {
          errorMessage = 'Unauthorized. Check your Sanity project ID is correct.';
        } else if (err?.statusCode === 404) {
          errorMessage = `Project not found. Verify your Sanity project ID: ${sanityClient?.config().projectId || 'unknown'}`;
        } else if (err?.message) {
          errorMessage = `Error: ${err.message}`;
        }
        
        // Log full error for debugging
        console.error('Full error object:', err);
        console.error('Error stack:', err?.stack);
        
        setError(errorMessage);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Blog - Perspectivas y Actualizaciones de Análisis de Datos Stratum PR",
    description: "Mantente informado con las últimas perspectivas, tendencias y mejores prácticas en análisis de datos, automatización de IA y transformación digital de los expertos de Stratum PR.",
    keywords: "blog análisis de datos, perspectivas IA, transformación digital, tecnología Puerto Rico, blog inteligencia empresarial"
  } : {
    title: "Blog - Stratum PR Data Analytics Insights and Updates",
    description: "Stay informed with the latest insights, trends, and best practices in data analytics, AI automation, and digital transformation from Stratum PR experts.",
    keywords: "data analytics blog, AI insights, digital transformation, Puerto Rico tech, business intelligence blog"
  };
  
  // SEO optimization for blog page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/newsupdates",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://www.stratumpr.com/newsupdates#blog",
      "url": "https://www.stratumpr.com/newsupdates",
      "name": seoData.title,
      "description": seoData.description,
      "inLanguage": language === 'es' ? 'es' : 'en',
      "publisher": {
        "@type": "Organization",
        "name": "Stratum PR"
      }
    }
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
          <h1 className="font-telegraf font-light text-4xl sm:text-5xl md:text-6xl text-white mb-8 tracking-tight">
            {t('blog.hero.title')}
          </h1>
          
          {/* Subscription Box - Below title */}
          <div className="max-w-2xl mx-auto">
            <BlogSubscription />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white"></div>
              <span className="ml-4 font-telegraf text-gray-400 font-light">Loading blog posts...</span>
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
              <p className="font-telegraf text-gray-300 text-lg mb-4">No blog posts found.</p>
              <p className="font-telegraf text-gray-400">Create your first post in Sanity Studio!</p>
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
                    <Card className="group-hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 shadow-lg overflow-hidden cursor-pointer h-full bg-gray-800/50 rounded-lg hover:border-white/20 hover:bg-gray-800 hover-lift backdrop-blur-sm">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-telegraf font-light bg-white text-gray-900 rounded-full uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 space-y-4">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 text-xs font-telegraf bg-white/5 text-white border border-white/10 rounded-md hover:bg-white/10 transition-colors font-light">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <h3 className="font-telegraf font-light text-xl text-white leading-tight group-hover:text-white transition-colors duration-300 line-clamp-2 tracking-tight">
                          {title}
                        </h3>
                        
                        <p className="font-telegraf text-gray-400 leading-relaxed text-sm line-clamp-3 font-light">
                          {excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1.5" />
                              <span className="font-light">{authorName}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center text-white group-hover:text-white/80 transition-colors font-telegraf font-light text-sm">
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
