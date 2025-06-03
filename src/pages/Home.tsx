import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap, Layers, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOImage from "@/components/SEOImage";
import { lazy, Suspense, useState } from "react";

// Lazy load non-critical components
const WhyWorkWithUsSection = lazy(() => import("@/components/WhyWorkWithUsSection"));

const Home = () => {
  const { t } = useLanguage();
  
  // SEO optimization for home page
  useSEO({
    title: "Stratum PR - Data Analytics & AI Business Automation Consulting Puerto Rico",
    description: "Leading analytics and consulting firm in Puerto Rico specializing in CRM implementation, big data analytics, AI solutions, and strategic business automation. Transform your business with data-driven decisions.",
    keywords: "data analytics Puerto Rico, AI business automation, CRM implementation consulting, big data analytics, business intelligence Puerto Rico, Salesforce implementation, predictive modeling, machine learning consulting, digital transformation Puerto Rico",
    canonical: "https://www.stratumpr.com/",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.stratumpr.com/#webpage",
      "url": "https://www.stratumpr.com/",
      "name": "Stratum PR - The Architecture of Better Decisions",
      "description": "Leading analytics and consulting firm in Puerto Rico specializing in CRM implementation, big data analytics, AI solutions, and strategic business automation.",
      "isPartOf": {
        "@id": "https://www.stratumpr.com/#website"
      },
      "about": {
        "@type": "Thing",
        "name": "Data Analytics and Business Automation Consulting"
      },
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Stratum PR"
      }
    }
  }, "home");

  const services = [
    {
      icon: Layers,
      title: t('services.integration.title'),
      description: t('services.integration.description'),
      simpleExplanation: "We connect all your business software so they work together seamlessly."
    },
    {
      icon: BarChart3,
      title: t('services.crm.title'),
      description: t('services.crm.description'),
      simpleExplanation: "We help you organize and track customers more easily so you never miss opportunities."
    },
    {
      icon: Database,
      title: t('services.bigdata.title'),
      description: t('services.bigdata.description'),
      simpleExplanation: "We turn massive datasets into easy-to-understand insights that guide your decisions."
    },
    {
      icon: Target,
      title: t('services.forecasting.title'),
      description: t('services.forecasting.description'),
      simpleExplanation: "We use your data to forecast future trends so you can plan ahead confidently."
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      simpleExplanation: "We automate repetitive tasks so your team can focus on what really matters."
    },
    {
      icon: Brain,
      title: t('services.decision.title'),
      description: t('services.decision.description'),
      simpleExplanation: "We automate complex decisions using smart algorithms that learn from your data."
    }
  ];

  const stats = [
    {
      value: "16+",
      label: t('stats.experience')
    },
    {
      value: "3.2x",
      label: t('stats.satisfaction')
    },
    {
      value: "30+",
      label: t('stats.projects')
    },
    {
      value: "100%",
      label: t('stats.team')
    }
  ];

  // Component for service card with popover functionality
  const ServiceCardWithPopover = ({ service }: { service: any }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePopoverToggle = () => {
      setIsPopoverOpen(!isPopoverOpen);
    };

    return (
      <Link to="/services" className="block">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full cursor-pointer overflow-visible">
          <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="font-telegraf font-semibold text-lg sm:text-xl text-primary group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100 touch-manipulation"
                    aria-label={`Learn more about ${service.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePopoverToggle();
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
                  side="top"
                  sideOffset={8}
                  align="center"
                >
                  <p className="font-telegraf text-sm text-gray-700 leading-relaxed">
                    {service.simpleExplanation}
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <p className="font-telegraf text-gray-600 flex-grow text-sm sm:text-base">
              {service.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <TooltipProvider>
      <div className="pt-20">
        {/* Hero Section - Optimized for FCP and LCP */}
        <section className="hero-section relative bg-gradient-to-br from-primary via-primary-800 to-secondary flex items-center overflow-hidden">
          {/* Simplified background for better performance */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary-700/85 to-secondary/90"></div>
          
          {/* Reduced animation elements for mobile performance */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-accent/15 to-accent/5 rounded-full blur-3xl animate-float opacity-70 will-change-transform"></div>
            <div 
              className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-primary-600/15 rounded-full blur-3xl animate-float opacity-60 will-change-transform" 
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
            <h1 className="font-telegraf font-bold text-4xl sm:text-5xl md:text-7xl mb-6 animate-fade-in">
              {t('home.hero.title')}
              <span className="block text-accent mt-2">{t('home.hero.subtitle')}</span>
            </h1>

            <p className="font-telegraf text-lg sm:text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
                aria-label="Schedule free consultation with Stratum PR data analytics experts"
              >
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
                aria-label="Explore Stratum PR data analytics and AI automation services"
              >
                <Link to="/services">
                  {t('home.hero.cta.secondary')}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-gray-50" aria-labelledby="stats-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="stats-heading" className="sr-only">Company Statistics and Achievements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-telegraf text-gray-600 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16 sm:py-20" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 id="services-heading" className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6">
                {t('services.grid.title')}
              </h2>
              <p className="font-telegraf text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.grid.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <ServiceCardWithPopover key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="team-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="team-heading" className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6">
              {t('meetteam.title')}
            </h2>
            <p className="font-telegraf text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              {t('meetteam.description')}
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary-700 text-white font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
              aria-label="Learn more about the Stratum PR team"
            >
              <Link to="/about">
                {t('meetteam.button')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Lazy loaded sections for better initial load performance */}
        <Suspense fallback={<div className="h-32 bg-gray-50"></div>}>
          <WhyWorkWithUsSection />
        </Suspense>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-secondary" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 id="cta-heading" className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
              {t('cta.title')}
            </h2>
            <p className="font-telegraf text-lg sm:text-xl mb-8 text-primary-100">
              {t('cta.description')}
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
              aria-label="Get started with Stratum PR data analytics and AI consulting services today"
            >
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('cta.button')}
                <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
};

export default Home;
