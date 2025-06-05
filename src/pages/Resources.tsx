
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllResources } from "@/data/resources";

const Resources = () => {
  const { language } = useLanguage();
  const resources = getAllResources();

  // SEO optimization for resources page
  useSEO({
    title: "Resources - Stratum PR Data Analytics Tools & Assessments",
    description: "Access powerful tools and assessments to evaluate and improve your organization's data management capabilities. Free resources from Puerto Rico's leading data consultancy.",
    keywords: "data assessment tools, business intelligence evaluation, data pipeline health check, consulting needs assessment, data management resources Puerto Rico",
    canonical: "https://www.stratumpr.com/resources",
    ogType: "website"
  }, "resources");

  const pageContent = {
    en: {
      hero: {
        title: "Resources",
        description: "Powerful tools and assessments to help you evaluate and improve your organization's data management capabilities."
      },
      readmore: "Start Assessment",
      cta: {
        title: "Need Personalized Guidance?",
        description: "Our experts can provide personalized recommendations based on your assessment results.",
        button: "Schedule Consultation"
      }
    },
    es: {
      hero: {
        title: "Recursos",
        description: "Herramientas poderosas y evaluaciones para ayudarte a evaluar y mejorar las capacidades de datos de tu organización."
      },
      readmore: "Iniciar Evaluación",
      cta: {
        title: "¿Necesitas Orientación Personalizada?",
        description: "Nuestros expertos pueden proporcionar recomendaciones personalizadas basadas en los resultados de tu evaluación.",
        button: "Programar Consulta"
      }
    }
  };

  const content = pageContent[language];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {content.hero.title}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map(resource => {
              const resourceContent = resource.content[language];
              
              return (
                <Link key={resource.id} to={`/resources/${resource.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={resource.image} 
                        alt={resourceContent.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-telegraf font-semibold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {resourceContent.title}
                      </h3>
                      <p className="font-telegraf text-gray-600 mb-4 leading-relaxed">
                        {resourceContent.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <CheckSquare className="h-4 w-4 mr-1" />
                          <span className="font-telegraf text-sm">{resourceContent.items.length} items</span>
                        </div>
                        <div className="flex items-center text-primary hover:text-secondary transition-colors group/link">
                          <span className="font-telegraf">{content.readmore}</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </div>
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
            {content.cta.title}
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            {content.cta.description}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              {content.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Resources;
