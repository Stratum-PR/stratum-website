
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Resources = () => {
  const { t, language } = useLanguage();

  // SEO optimization for resources page
  useSEO({
    title: "Resources - Stratum PR Data Analytics Guides and Tools",
    description: "Access our projects, news and updates, and IT readiness checklist to help your business leverage data effectively.",
    keywords: "data analytics resources, projects, news updates, IT checklist, Puerto Rico data analytics",
    canonical: "https://www.stratumpr.com/resources",
    ogType: "website"
  }, "resources");

  const resources = [
    {
      name: t('projects.hero.title'),
      href: '/projects',
      image: '/img/abbe-sublett-nxZDMUQhN4o-unsplash.jpg',
      description: language === 'en' 
        ? 'Explore real-world examples of our data analytics and automation solutions'
        : 'Explora ejemplos del mundo real de nuestras soluciones de análisis de datos y automatización'
    },
    {
      name: t('nav.newsupdates'),
      href: '/newsupdates',
      image: '/img/kaja-sariwating-al3wpaonTWc-unsplash.jpeg',
      description: language === 'en'
        ? 'Stay informed with the latest insights, trends, and best practices'
        : 'Mantente informado con las últimas perspectivas, tendencias y mejores prácticas'
    },
    {
      name: t('nav.checklist'),
      href: '/checklist',
      image: '/img/document-review-process-quality-control-600nw-2504481787.jpg.webp',
      description: language === 'en'
        ? 'Take our free IT readiness assessment to discover your technology needs'
        : 'Realiza nuestra evaluación gratuita de preparación TI para descubrir tus necesidades tecnológicas'
    }
  ];

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
            {t('resources.hero.title')}
          </h1>
          <p className="font-telegraf text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {t('resources.hero.description')}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => {
              return (
                <Link key={resource.href} to={resource.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={resource.image} 
                        alt={resource.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          (e.target as HTMLImageElement).src = '/img/topographic-linear-background.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-telegraf font-semibold text-xl text-primary mb-3 group-hover:text-secondary transition-colors">
                        {resource.name}
                      </h3>
                      <p className="font-telegraf text-gray-600 mb-6 leading-relaxed">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-center text-primary hover:text-secondary transition-colors group/link">
                        <span className="font-telegraf">{language === 'en' ? 'Explore' : 'Explorar'}</span>
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

export default Resources;
