
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Heart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllCaseStudies } from "@/data/caseStudies";
import * as LucideIcons from "lucide-react";

const Projects = () => {
  const { t, language } = useLanguage();
  const caseStudies = getAllCaseStudies();

  // SEO optimization for projects page
  useSEO({
    title: "Projects - Stratum PR Data Analytics Success Stories",
    description: "Explore real-world examples of how Stratum PR delivers data analytics, automation, and strategic decision systems for clients across Puerto Rico and beyond.",
    keywords: "projects Puerto Rico, data analytics success stories, business intelligence examples, CRM implementation results, automation projects, digital transformation examples",
    canonical: "https://www.stratumpr.com/projects",
    ogType: "website"
  }, "projects");

  const handleReadMore = (slug: string) => {
    // Navigate to the individual project page
    window.location.href = `/projects/${slug}`;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {t('projects.hero.title')}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t('projects.hero.description')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map(study => {
              const content = study.content[language];
              const IconComponent = (LucideIcons as any)[study.icon] || LucideIcons.FileText;
              
              return (
                <Card key={study.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-primary/60" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {study.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-telegraf font-semibold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                      {content.title}
                    </h3>
                    <p className="font-telegraf text-sm text-gray-500 mb-3">
                      {content.sector}
                    </p>
                    <p className="font-telegraf text-gray-600 mb-4 leading-relaxed">
                      {content.summary}
                    </p>
                    <Button asChild variant="ghost" className="p-0 h-auto font-telegraf text-primary hover:text-secondary transition-colors group">
                      <Link to={`/projects/${study.slug}`}>
                        {t('projects.readmore')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            {t('projects.cta.title')}
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            {t('projects.cta.description')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              {t('projects.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;
