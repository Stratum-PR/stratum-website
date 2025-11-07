
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import * as LucideIcons from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const project = slug ? getCaseStudyBySlug(slug) : null;

  // Handle project not found
  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-telegraf font-bold text-4xl text-primary mb-4">
            Project Not Found
          </h1>
          <p className="font-telegraf text-gray-600 mb-6">
            The project you're looking for doesn't exist.
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

  const content = project.content[language];
  const metadata = project.metadata;

  // SEO optimization for individual project
  useSEO({
    title: metadata.title[language],
    description: metadata.description[language],
    keywords: metadata.keywords[language],
    canonical: `https://www.stratumpr.com/projects/${project.slug}`,
    ogType: "article",
    ogImage: project.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": content.title,
      "description": content.summary,
      "image": project.image,
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
      "datePublished": project.publishDate
    }
  }, `project-${project.slug}`);

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
              {content.sector}
            </span>
          </div>

          <h1 className="font-telegraf font-bold text-4xl md:text-5xl text-white drop-shadow-lg mb-6">
            {content.title}
          </h1>
          
          <p className="font-telegraf text-xl text-white/90 drop-shadow-md leading-relaxed mb-8">
            {content.summary}
          </p>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Timeline</p>
                <p className="font-telegraf font-semibold text-white">{content.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Team Size</p>
                <p className="font-telegraf font-semibold text-white">{content.teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-white" />
              <div>
                <p className="font-telegraf text-sm text-white/80">Client</p>
                <p className="font-telegraf font-semibold text-white">{content.client}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src={project.image} 
            alt={content.title}
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
                  {content.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Our Solution
                </h2>
                <p className="font-telegraf text-gray-600 leading-relaxed text-justify">
                  {content.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="font-telegraf font-bold text-3xl text-primary mb-6">
                  Results & Impact
                </h2>
                <div className="space-y-4">
                  {content.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-600">{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-telegraf font-semibold text-lg text-primary mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {content.technologies.map((tech, index) => (
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

              {/* Tags */}
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
