
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { useState } from "react";

const Resources = () => {
  const { t, language } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Dynamic SEO data based on language
  const seoData = language === 'es' ? {
    title: "Recursos - Guías y Herramientas de Análisis de Datos Stratum PR",
    description: "Accede a nuestros proyectos, noticias y actualizaciones, y lista de verificación de preparación TI para ayudar a tu negocio a aprovechar los datos de manera efectiva.",
    keywords: "recursos análisis de datos, proyectos, noticias actualizaciones, lista verificación TI, análisis de datos Puerto Rico"
  } : {
    title: "Resources - Stratum PR Data Analytics Guides and Tools",
    description: "Access our projects, news and updates, and IT readiness checklist to help your business leverage data effectively.",
    keywords: "data analytics resources, projects, news updates, IT checklist, Puerto Rico data analytics"
  };
  
  // SEO optimization for resources page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/resources",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.stratumpr.com/resources#webpage",
      "url": "https://www.stratumpr.com/resources",
      "name": seoData.title,
      "description": seoData.description,
      "inLanguage": language === 'es' ? 'es' : 'en'
    }
  }, "resources");

  const resources = [
    {
      name: t('projects.hero.title'),
      href: '/projects',
      // High-quality professional business/technology image
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop',
      description: t('resources.projects.description')
    },
    {
      name: t('nav.newsupdates'),
      href: '/newsupdates',
      // High-quality modern office/workspace image
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&auto=format&fit=crop',
      description: t('resources.newsupdates.description')
    },
    {
      name: t('nav.checklist'),
      href: '/checklist',
      // High-quality technology/dashboard image
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop',
      description: t('resources.checklist.description')
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-light text-4xl sm:text-5xl md:text-6xl text-white mb-8 tracking-tight">
            {t('resources.hero.title')}
          </h1>
          <p className="font-telegraf text-xl sm:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
            {t('resources.hero.description')}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const isChecklist = resource.href === '/checklist';
              return isChecklist ? (
                <button
                  key={resource.href}
                  onClick={() => setShowComingSoon(true)}
                  className="text-left"
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 shadow-lg overflow-hidden cursor-pointer h-full w-full bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift backdrop-blur-sm">
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
                    <CardContent className="p-8 text-center">
                      <h3 className="font-telegraf font-light text-xl sm:text-2xl text-white mb-4 group-hover:text-white transition-colors tracking-tight">
                        {resource.name}
                      </h3>
                      <p className="font-telegraf text-gray-400 mb-6 leading-relaxed font-light">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-center text-white hover:text-white/80 transition-colors group/link">
                        <span className="font-telegraf font-light">{t('resources.explore')}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              ) : (
                <Link key={resource.href} to={resource.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 shadow-lg overflow-hidden cursor-pointer h-full bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift backdrop-blur-sm">
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
                    <CardContent className="p-8 text-center">
                      <h3 className="font-telegraf font-light text-xl sm:text-2xl text-white mb-4 group-hover:text-white transition-colors tracking-tight">
                        {resource.name}
                      </h3>
                      <p className="font-telegraf text-gray-400 mb-6 leading-relaxed font-light">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-center text-white hover:text-white/80 transition-colors group/link">
                        <span className="font-telegraf font-light">{t('resources.explore')}</span>
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
      
      {/* Coming Soon Modal for Systems Assessment */}
      <ComingSoonModal open={showComingSoon} onOpenChange={setShowComingSoon} />
    </div>
  );
};

export default Resources;
