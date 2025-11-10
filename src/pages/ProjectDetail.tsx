
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { sanityClient, projectBySlugQuery, urlFor, isSanityConfigured } from "@/lib/sanity";
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
  challenge: string;
  challengeEs: string;
  solution: string;
  solutionEs: string;
  results: string[];
  resultsEs: string[];
  technologies: string[];
  timeline: string;
  timelineEs: string;
  teamSize: string;
  teamSizeEs: string;
  mainImage?: any;
  publishedAt: string;
  tags?: string[];
  featured?: boolean;
  icon?: string;
  seoTitle?: string;
  seoTitleEs?: string;
  seoDescription?: string;
  seoDescriptionEs?: string;
  seoKeywords?: string;
  seoKeywordsEs?: string;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [project, setProject] = useState<SanityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
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
          setError('Project is not configured. Please set VITE_SANITY_PROJECT_ID in environment variables.');
          setLoading(false);
          return;
        }
        
        console.log('📡 Fetching project by slug:', slug);
        const fetchedProject = await sanityClient.fetch<SanityProject>(projectBySlugQuery, { slug });
        
        console.log('✅ Fetched project:', fetchedProject ? 'Found' : 'Not found');
        
        if (!fetchedProject) {
          console.error('❌ Project not found for slug:', slug);
          setError('Project not found');
          setProject(null);
        } else {
          setProject(fetchedProject);
          setError(null);
        }
      } catch (err: any) {
        console.error('❌ Error fetching project:', err);
        console.error('Error details:', {
          message: err?.message,
          statusCode: err?.statusCode,
          responseBody: err?.responseBody,
        });
        
        let errorMessage = 'Failed to load project';
        
        if (err?.message?.includes('projectId') || err?.message?.includes('Project ID')) {
          errorMessage = 'Sanity Project ID is missing. Check your .env.local file.';
        } else if (err?.message?.includes('CORS') || err?.message?.includes('Access-Control')) {
          errorMessage = 'CORS error. Check Sanity project settings.';
        } else if (err?.statusCode === 401) {
          errorMessage = 'Unauthorized. Check your Sanity project ID is correct.';
        } else if (err?.statusCode === 404) {
          errorMessage = `Project not found. Verify your Sanity project ID: ${sanityClient?.config().projectId || 'unknown'}`;
        } else if (err?.message) {
          errorMessage = `Error: ${err.message}`;
        }
        
        setError(errorMessage);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // Prepare SEO data (must be called before any conditional returns to follow Rules of Hooks)
  const seoTitle = project 
    ? (language === 'es' 
        ? `${project.seoTitleEs || project.titleEs || project.title} - Stratum PR`
        : `${project.seoTitle || project.title} - Stratum PR`)
    : 'Project Not Found - Stratum PR';
  const seoDescription = project
    ? (language === 'es'
        ? (project.seoDescriptionEs || project.summaryEs || project.summary)
        : (project.seoDescription || project.summary))
    : 'The project you\'re looking for doesn\'t exist.';
  const seoKeywords = project
    ? (language === 'es' ? project.seoKeywordsEs : project.seoKeywords)
    : undefined;
  const imageUrl = project?.mainImage 
    ? urlFor(project.mainImage).width(1200).height(800).url()
    : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center';

  // SEO optimization - MUST be called before any conditional returns
  useSEO({
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonical: project 
      ? `https://www.stratumpr.com/projects/${project.slug?.current || slug || ''}`
      : `https://www.stratumpr.com/projects/${slug || ''}`,
    ogType: "article",
    ogImage: imageUrl,
    structuredData: project ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": language === 'es' ? (project.titleEs || project.title) : project.title,
      "description": language === 'es' ? (project.summaryEs || project.summary) : project.summary,
      "image": imageUrl,
      "author": {
        "@type": "Organization",
        "name": "Stratum PR"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Stratum PR",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.stratumpr.com/lovable-uploads/2fa2d4e2-201d-491d-abf3-9f4702b8293c.png"
        }
      },
      "datePublished": project.publishedAt
    } : undefined
  }, `project-${slug || 'unknown'}`);

  // Handle loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-telegraf text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-telegraf font-bold text-4xl text-primary mb-4">
            {error || 'Project Not Found'}
          </h1>
          <p className="font-telegraf text-gray-600 mb-6">
            {error || 'The project you\'re looking for doesn\'t exist.'}
          </p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get localized content with fallbacks
  const title = language === 'es' ? (project.titleEs || project.title) : (project.title || 'Project');
  const client = language === 'es' ? (project.clientEs || project.client) : (project.client || '');
  const sector = language === 'es' ? (project.sectorEs || project.sector) : (project.sector || '');
  const summary = language === 'es' ? (project.summaryEs || project.summary) : (project.summary || '');
  const challenge = language === 'es' ? (project.challengeEs || project.challenge) : (project.challenge || '');
  const solution = language === 'es' ? (project.solutionEs || project.solution) : (project.solution || '');
  const results = language === 'es' ? (project.resultsEs || []) : (project.results || []);
  const timeline = language === 'es' ? (project.timelineEs || project.timeline) : (project.timeline || '');
  const teamSize = language === 'es' ? (project.teamSizeEs || project.teamSize) : (project.teamSize || '');

  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[project.icon] || LucideIcons.FileText;

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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/projects')}
            className="mb-6 font-telegraf text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('projects.hero.title')}
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <IconComponent className="h-8 w-8 text-white" />
            <span className="font-telegraf text-sm text-white/80 uppercase tracking-wide">
              {sector}
            </span>
          </div>

          <h1 className="font-telegraf font-bold text-4xl md:text-5xl text-white drop-shadow-lg mb-6">
            {title}
          </h1>
          
          <p className="font-telegraf text-xl text-white/90 drop-shadow-md leading-relaxed mb-8">
            {summary}
          </p>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Timeline</p>
                <p className="font-telegraf font-semibold text-white">{timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Team Size</p>
                <p className="font-telegraf font-semibold text-white">{teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Client</p>
                <p className="font-telegraf font-semibold text-white">{client}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  The Challenge
                </h2>
                <p className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  {challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Our Solution
                </h2>
                <p className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  {solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Results & Impact
                </h2>
                <div className="space-y-4">
                  {results && results.length > 0 ? (
                    results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="font-telegraf text-gray-600">{result}</p>
                      </div>
                    ))
                  ) : (
                    <p className="font-telegraf text-gray-500 italic">No results data available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-sm font-telegraf bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                      Project Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
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
            <a href="https://calendly.com/admin-stratumpr/30min" target="_blank" rel="noopener noreferrer">
              {t('projects.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
