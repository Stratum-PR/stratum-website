import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllBlogPosts } from "@/data/blog";

const Blog = () => {
  const { t, language } = useLanguage();
  const blogPosts = getAllBlogPosts();

  // SEO optimization for blog page
  useSEO({
    title: "Blog - Stratum PR Data Analytics Insights and Updates",
    description: "Stay informed with the latest insights, trends, and best practices in data analytics, AI automation, and digital transformation from Stratum PR experts.",
    keywords: "data analytics blog, AI insights, digital transformation, Puerto Rico tech, business intelligence blog",
    canonical: "https://www.stratumpr.com/blog",
    ogType: "website"
  }, "blog");

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {t('blog.hero.title')}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t('blog.hero.description')}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => {
              const content = post.content[language];
              
              return (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full capitalize">
                          {post.category}
                        </span>
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-secondary/10 text-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-telegraf font-semibold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {content.title}
                      </h3>
                      <p className="font-telegraf text-gray-600 mb-4 leading-relaxed">
                        {content.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{content.author.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{content.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center text-primary hover:text-secondary transition-colors group/link">
                        <span className="font-telegraf">{t('blog.readmore')}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
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

export default Blog;