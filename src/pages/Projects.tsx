
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

  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Proyectos - Historias de Éxito de Análisis de Datos Puerto Rico | Casos de Estudio | Stratum PR",
    description: "Explora historias de éxito reales de análisis de datos y casos de estudio de Stratum PR. Ve cómo hemos ayudado a negocios en Puerto Rico con implementación de CRM, automatización con IA y sistemas de decisiones estratégicas. Proyectos de análisis orientados a resultados.",
    keywords: "proyectos de análisis de datos Puerto Rico, historias de éxito implementación de CRM, casos de estudio automatización con IA, ejemplos de inteligencia empresarial Puerto Rico, casos de estudio de análisis de datos, proyectos de modelado predictivo, historias de éxito transformación digital Puerto Rico, resultados automatización empresarial"
  } : {
    title: "Projects - Stratum PR Data Analytics Success Stories",
    description: "Explore real-world examples of how Stratum PR delivers data analytics, automation, and strategic decision systems for clients across Puerto Rico and beyond.",
    keywords: "projects Puerto Rico, data analytics success stories, business intelligence examples, CRM implementation results, automation projects, digital transformation examples"
  };
  
  // SEO optimization for projects page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/projects",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.stratumpr.com/projects#webpage",
      "url": "https://www.stratumpr.com/projects",
      "name": seoData.title,
      "description": seoData.description,
      "inLanguage": language === 'es' ? 'es' : 'en'
    }
  }, "projects");

  const handleReadMore = (slug: string) => {
    // Navigate to the individual project page
    window.location.href = `/projects/${slug}`;
  };

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
            {t('projects.hero.title')}
          </h1>
          <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {t('projects.hero.description')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-primary/8 via-white to-secondary/8 relative animate-gradient-flow">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-[0.04] animate-gradient-flow pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 40% 30%, rgba(230, 224, 142, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 60% 70%, rgba(38, 106, 178, 0.1) 0%, transparent 50%)`,
          backgroundSize: '200% 200%'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map(study => {
              const content = study.content[language];
              
              return (
                <Link key={study.id} to={`/projects/${study.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 shadow-lg overflow-hidden cursor-pointer h-full bg-gradient-to-br from-white via-primary/5 to-secondary/5 hover-lift">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={study.image} 
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
                      <div className="flex items-center text-primary hover:text-secondary transition-colors group/link">
                        <span className="font-telegraf">{t('projects.readmore')}</span>
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

    </div>
  );
};

export default Projects;
