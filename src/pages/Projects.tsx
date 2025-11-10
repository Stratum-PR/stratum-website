import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Heart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { sanityClient, projectsQuery, urlFor, isSanityConfigured } from "@/lib/sanity";
import * as LucideIcons from "lucide-react";

interface SanityProject {
  _id: string;
  title: string;
  titleEs: string;
  slug: { current: string };
  client: string;
  clientEs: string;
  sector: string;
  sectorEs: string;
  summary: string;
  summaryEs: string;
  mainImage?: any;
  publishedAt: string;
  tags?: string[];
  featured?: boolean;
  icon?: string;
}

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if Sanity is configured
        if (!isSanityConfigured || !sanityClient) {
          const errorMsg = 'Projects are not configured. Please set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in Vercel environment variables.';
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
        
        console.log('📡 Fetching projects from Sanity...');
        const fetchedProjects = await sanityClient.fetch<SanityProject[]>(projectsQuery);
        
        console.log('✅ Fetched projects:', fetchedProjects.length);
        if (fetchedProjects.length > 0) {
          console.log('First project:', {
            id: fetchedProjects[0]._id,
            title: fetchedProjects[0].title,
            slug: fetchedProjects[0].slug?.current,
          });
        } else {
          console.warn('⚠️ No projects returned - check if projects are published with publishedAt date');
        }
        
        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
        } else {
          console.error('❌ Unexpected response format:', fetchedProjects);
          setError('Invalid response from server');
          setProjects([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching projects:', err);
        console.error('Error details:', {
          message: err?.message,
          statusCode: err?.statusCode,
          responseBody: err?.responseBody,
          status: err?.status,
          response: err?.response,
        });
        
        let errorMessage = 'Failed to load projects';
        
        // More specific error messages
        if (err?.message?.includes('projectId') || err?.message?.includes('Project ID')) {
          errorMessage = 'Sanity Project ID is missing. Check your .env.local file.';
        } else if (err?.message?.includes('CORS') || err?.message?.includes('Access-Control')) {
          errorMessage = 'CORS error. Check Sanity project settings and add your domain to CORS origins.';
        } else if (err?.statusCode === 401 || err?.status === 401) {
          errorMessage = 'Unauthorized. Check your Sanity project ID is correct.';
        } else if (err?.statusCode === 404 || err?.status === 404) {
          errorMessage = `Project not found. Verify your Sanity project ID: ${sanityClient?.config().projectId || 'unknown'}. Also check if "project" document type exists in Sanity.`;
        } else if (err?.message?.includes('Request error')) {
          errorMessage = 'Network error connecting to Sanity. Check your internet connection and Sanity project settings. If this persists, the "project" document type may not exist in Sanity Studio yet.';
        } else if (err?.message) {
          errorMessage = `Error: ${err.message}`;
        }
        
        setError(errorMessage);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      <section className="py-20 bg-gray-900 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 font-telegraf text-gray-300">Loading projects...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-telegraf text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-telegraf text-gray-300 text-lg mb-4">No projects found.</p>
              <p className="font-telegraf text-gray-400">Create your first project in Sanity Studio!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => {
                const title = language === 'es' ? project.titleEs : project.title;
                const sector = language === 'es' ? project.sectorEs : project.sector;
                const summary = language === 'es' ? project.summaryEs : project.summary;
                const imageUrl = project.mainImage 
                  ? urlFor(project.mainImage).width(800).height(600).url()
                  : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center';
                
                return (
                  <Link key={project._id} to={`/projects/${project.slug.current}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-600 shadow-lg overflow-hidden cursor-pointer h-full bg-gray-800 hover:border-accent hover-lift">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-telegraf font-semibold bg-accent text-black rounded-full uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs font-telegraf bg-accent/20 text-accent rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="font-telegraf font-semibold text-xl text-white mb-2 group-hover:text-accent transition-colors">
                          {title}
                        </h3>
                        <p className="font-telegraf text-sm text-gray-400 mb-3">
                          {sector}
                        </p>
                        <p className="font-telegraf text-gray-300 mb-4 leading-relaxed">
                          {summary}
                        </p>
                        <div className="flex items-center text-accent hover:text-accent/80 transition-colors group/link">
                          <span className="font-telegraf">{t('projects.readmore')}</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
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

export default Projects;
