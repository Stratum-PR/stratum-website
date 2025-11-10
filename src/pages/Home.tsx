import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap, Layers, Info, Clock, HelpCircle, Server, AlertTriangle, XCircle, Network, Wifi, WifiOff, Link as LinkIcon, RotateCcw, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/OptimizedImage";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { lazy, Suspense, useState, useEffect } from "react";
import TechAnimatedBackground from "@/components/TechAnimatedBackground";
import RotatingText from "@/components/RotatingText";

// Lazy load non-critical components with better loading states
const WhyWorkWithUsSection = lazy(() => import("@/components/WhyWorkWithUsSection"));

const Home = () => {
  const { t, language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  // Hydration optimization 
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Dynamic SEO data based on language (optimized for 50-60 char titles, 150-160 char descriptions)
  const seoData = language === 'es' ? {
    title: "Consultoría IA Puerto Rico | Análisis Datos - Stratum PR",
    description: "Firma líder de análisis y consultoría en Puerto Rico. Especializados en implementación de CRM, análisis de big data, soluciones de IA y automatización empresarial. Transforma tu negocio con decisiones basadas en datos.",
    keywords: "consultoría de IA Puerto Rico, análisis de datos Puerto Rico, automatización comercial Puerto Rico, implementación de CRM Puerto Rico, inteligencia empresarial Puerto Rico, análisis de big data, modelado predictivo, consultoría de aprendizaje automático, transformación digital Puerto Rico"
  } : {
    title: "AI Consulting Puerto Rico | Data Analytics - Stratum PR",
    description: "Expert AI consulting and data analytics services in Puerto Rico. Specializing in AI business automation, CRM implementation, and predictive modeling. 100% Puerto Rico based. Free consultation available.",
    keywords: "AI consulting Puerto Rico, data analytics consulting Puerto Rico, AI business automation Puerto Rico, CRM Puerto Rico, CRM implementation consulting Puerto Rico, commercial automation Puerto Rico, big data analytics consulting, business intelligence Puerto Rico, Salesforce implementation Puerto Rico, predictive modeling services Puerto Rico, machine learning consulting Puerto Rico, digital transformation consulting Puerto Rico, data analytics services, business automation solutions Puerto Rico"
  };
  
  // SEO optimization for home page
  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: "https://www.stratumpr.com/",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.stratumpr.com/#website",
          "url": "https://www.stratumpr.com/",
          "name": "Stratum PR",
          "description": language === 'es' 
            ? "Firma líder de análisis y consultoría en Puerto Rico especializada en implementación de CRM, análisis de big data, soluciones de IA y automatización estratégica empresarial."
            : "Leading analytics and consulting firm in Puerto Rico specializing in CRM implementation, big data analytics, AI solutions, and strategic business automation.",
          "inLanguage": language === 'es' ? 'es' : 'en',
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.stratumpr.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "@id": "https://www.stratumpr.com/#webpage",
          "url": "https://www.stratumpr.com/",
          "name": seoData.title,
          "description": seoData.description,
          "inLanguage": language === 'es' ? 'es' : 'en',
          "isPartOf": {
            "@id": "https://www.stratumpr.com/#website"
          },
          "about": {
            "@type": "Thing",
            "name": language === 'es' ? "Análisis de Datos y Automatización Empresarial" : "Data Analytics and Business Automation Consulting"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.stratumpr.com/#business",
          "name": "Stratum PR",
          "alternateName": "Stratum Puerto Rico",
          "description": language === 'es'
            ? "Firma líder de análisis y consultoría en Puerto Rico especializada en implementación de CRM, análisis de big data, soluciones de IA y automatización estratégica empresarial."
            : "Leading analytics and consulting firm in Puerto Rico specializing in CRM implementation, big data analytics, AI solutions, and strategic business automation.",
          "url": "https://www.stratumpr.com",
          "logo": "https://www.stratumpr.com/img/stratum-pr-logo.png",
          "telephone": "+1-787-XXX-XXXX",
          "email": "contact@stratumpr.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Trujillo Alto",
            "addressRegion": "PR",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.2208,
            "longitude": -66.5901
          },
          "areaServed": {
            "@type": "Place",
            "name": "Puerto Rico"
          },
          "foundingDate": "2025",
          "founders": [
            {
              "@type": "Person",
              "name": "Jovaniel Rodriguez",
              "jobTitle": "Co-Founder, Technology Infrastructure"
            },
            {
              "@type": "Person", 
              "name": "Roberto Otero",
              "jobTitle": "Co-Founder, Tech & Build"
            },
            {
              "@type": "Person",
              "name": "Genesis Rodriguez", 
              "jobTitle": "Co-Founder, Data & Insights"
            }
          ],
          "sameAs": [
            "https://linkedin.com/company/stratumpr",
            "https://twitter.com/stratumpr"
          ],
          "inLanguage": language === 'es' ? 'es' : 'en'
        },
        {
          "@type": "OfferCatalog",
          "@id": "https://www.stratumpr.com/#services",
          "name": language === 'es' ? "Servicios de Stratum PR" : "Stratum PR Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": language === 'es' ? "Consultoría de IA" : "AI Consulting",
                "description": language === 'es' ? "Soluciones de inteligencia artificial para automatización empresarial" : "Artificial intelligence solutions for business automation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": language === 'es' ? "Implementación de CRM" : "CRM Implementation",
                "description": language === 'es' ? "Implementación y optimización de sistemas CRM" : "CRM system implementation and optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": language === 'es' ? "Análisis de Big Data" : "Big Data Analytics",
                "description": language === 'es' ? "Análisis de grandes volúmenes de datos para insights empresariales" : "Large-scale data analysis for business insights"
              }
            }
          ],
          "inLanguage": language === 'es' ? 'es' : 'en'
        }
      ]
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

  // Optimized service card component with better performance
  const ServiceCardWithPopover = ({ service }: { service: any }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleCardClick = () => {
      // Navigate to services page when clicking the card area
      window.location.href = '/services';
    };

    const handlePopoverToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsPopoverOpen(!isPopoverOpen);
    };

    return (
      <Card 
        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full "
        onClick={handleCardClick}
      >
        <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:text-white" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h3 className="font-telegraf font-semibold text-base sm:text-lg md:text-xl text-primary group-hover:text-secondary transition-colors">
              {service.title}
            </h3>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <button 
                  className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-gray-100 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  aria-label={`Learn more about ${service.title}`}
                  onClick={handlePopoverToggle}
                  type="button"
                >
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
                side="top"
                sideOffset={8}
                align="center"
                avoidCollisions={true}
                collisionPadding={20}
              >
                <p className="font-telegraf text-sm text-gray-700 leading-relaxed">
                  {service.simpleExplanation}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <p className="font-telegraf text-gray-600 flex-grow text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <TooltipProvider>
      <div className="pt-14 md:pt-16">
        {/* Hero Section - Techy animated background similar to Evertec */}
        <section className="hero-section relative flex items-center justify-center overflow-hidden min-h-[85vh] sm:min-h-[90vh] bg-gradient-to-br from-primary via-primary-800 to-secondary">
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          {/* Tech animated background */}
          <TechAnimatedBackground className="z-0" opacity={0.7} />

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center text-white z-10">
            {/* SEO-friendly H1 - visible to search engines */}
            <h1 className="sr-only">
              {language === 'es' 
                ? 'Consultoría de IA y Análisis de Datos en Puerto Rico - Stratum PR'
                : 'AI Consulting and Data Analytics in Puerto Rico - Stratum PR'}
            </h1>
            {/* Visual H1 for users */}
            <div className="font-telegraf font-bold mb-6 sm:mb-8 animate-fade-in leading-tight" role="presentation" aria-hidden="true">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <RotatingText
                  baseText="We power"
                  words={['data analytics', 'business automation', 'digital transformation', 'AI solutions', 'intelligent systems']}
                  colors={['#E6E08E', '#E6E08E', '#E6E08E', '#E6E08E', '#E6E08E']}
                  className="block"
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2500}
                />
              </div>
            </div>

            {/* Puerto Rico Badge */}
            <div className="mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.15s'}}>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-accent/25 via-accent/30 to-accent/25 backdrop-blur-sm border border-accent/40 rounded-full text-accent font-telegraf font-semibold text-sm sm:text-base shadow-lg accent-glow animate-float-slow">
                {t('home.hero.badge')}
              </span>
            </div>

            <p className="font-telegraf text-base sm:text-lg md:text-xl mb-10 sm:mb-12 text-white/80 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{animationDelay: '0.2s'}}>
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up px-2 sm:px-0" style={{animationDelay: '0.4s'}}>
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-base sm:text-lg h-auto w-full sm:w-auto" 
                aria-label="Schedule free consultation with Stratum PR data analytics experts"
              >
                <a href="https://calendly.com/admin-stratumpr/30min" target="_blank" rel="noopener noreferrer">
                  {t('home.hero.cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 inline" aria-hidden="true" />
                </a>
              </Button>

              <Button 
                onClick={() => setShowComingSoon(true)}
                variant="outline" 
                size="lg" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary font-telegraf font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-base sm:text-lg h-auto w-full sm:w-auto" 
                aria-label="Take the Systems Assessment"
              >
                {t('home.hero.cta.secondary')}
              </Button>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        {/* Problem Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 section-container relative animate-gradient-flow" aria-labelledby="problem-heading">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-[0.08] animate-gradient-flow pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(230, 224, 142, 0.25) 0%, transparent 50%),
                              radial-gradient(circle at 70% 60%, rgba(38, 106, 178, 0.2) 0%, transparent 50%)`,
            backgroundSize: '200% 200%'
          }}></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="problem-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-10 md:mb-12 text-center animate-fade-in-up">
              {t('home.problem.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
              {/* Fragmented Data Box */}
              <div className="bg-gradient-to-br from-red-50/80 via-white to-primary/10 border-2 border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group shadow-lg shadow-primary/10 hover-lift animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center group-hover:from-red-300 group-hover:to-red-400 transition-all duration-300 shadow-lg hover-scale-icon">
                    <Database className="h-7 w-7 md:h-8 md:w-8 text-red-600 group-hover:text-red-700" />
                  </div>
                  <h3 className="font-telegraf font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box1.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t('home.problem.box1.subtitle')}
                  </p>
                </div>
              </div>

              {/* Manual Work Box */}
              <div className="bg-gradient-to-br from-orange-50/80 via-white to-secondary/10 border-2 border-secondary/30 rounded-lg p-6 md:p-8 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 group shadow-lg shadow-secondary/10 hover-lift animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 shadow-lg hover-scale-icon animate-icon-pulse">
                    <Clock className="h-7 w-7 md:h-8 md:w-8 text-orange-600 group-hover:text-orange-700 stroke-2" />
                  </div>
                  <h3 className="font-telegraf font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box2.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t('home.problem.box2.subtitle')}
                  </p>
                </div>
              </div>

              {/* Gut-based Decisions Box */}
              <div className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 border-2 border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group shadow-lg shadow-primary/10 hover-lift animate-fade-in-scale" style={{animationDelay: '0.3s'}}>
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center group-hover:from-primary/40 group-hover:to-secondary/40 transition-all duration-300 shadow-lg hover-scale-icon primary-glow">
                    <HelpCircle className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:text-primary-800" />
                  </div>
                  <h3 className="font-telegraf font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box3.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t('home.problem.box3.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Blue Background Message */}
            <div className="bg-gradient-to-r from-primary via-primary-800 to-secondary text-white rounded-lg p-6 md:p-8 text-center shadow-xl animate-gradient-flow hover-glow">
              <p className="font-telegraf text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
                {t('home.problem.conclusion')}
              </p>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

        {/* Guide Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-secondary/8 via-white to-primary/8 section-container relative" aria-labelledby="guide-heading">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-[0.1] animate-gradient-flow pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(30, 43, 126, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, rgba(38, 106, 178, 0.15) 0%, transparent 50%)`,
            backgroundSize: '200% 200%'
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="font-telegraf text-xl sm:text-2xl md:text-3xl text-gray-800 leading-relaxed font-bold mb-6" style={{color: '#1E2B7E'}}>
                    {t('home.guide.description')}
                  </p>
                  <p className="font-telegraf text-base sm:text-lg text-gray-700 mb-6">
                    <Link to="/about" className="text-primary hover:text-primary-600 underline hover:no-underline transition-colors duration-200 font-semibold">
                      {t('home.guide.moreAboutUs')}
                    </Link>
                  </p>
                </div>

                {/* Puerto Rico Image */}
                <div className="w-full">
                  <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
                    <OptimizedImage 
                      src="https://images.unsplash.com/photo-1590099461831-30e3dacdca40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1200" 
                      alt="Puerto Rico - Modern Business and Technology Hub" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      placeholderColor="#e0e7ef"
                      context="Puerto Rico business technology"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center font-telegraf">
                    {t('home.guide.photoBy')}{' '}
                    <a 
                      href="https://unsplash.com/@sklepacki" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-600 underline hover:no-underline transition-colors"
                    >
                      Stephanie Klepacki
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Side - Enhanced Services Grid */}
              <div>
                <h2 className="font-telegraf text-xl sm:text-2xl md:text-3xl text-gray-800 mb-6 md:mb-8 font-bold text-center animate-fade-in-up" style={{color: '#1E2B7E'}}>
                  {t('home.guide.weSpecialize')}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {services.map((service, index) => (
                    <Link key={index} to="/services" className="group">
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/8 via-white to-secondary/8 hover:from-primary/15 hover:via-accent/5 hover:to-secondary/15 hover-lift animate-fade-in-scale" style={{animationDelay: `${index * 0.1}s`}}>
                        <CardContent className="p-4 sm:p-5 md:p-6 text-center h-full flex flex-col justify-center">
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#E6E09E] to-[#266AB2] rounded-xl group-hover:from-[#266AB2] group-hover:to-[#1E2B7E] transition-all duration-300 shadow-lg hover-scale-icon primary-glow">
                              <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:text-white animate-icon-pulse" style={{animationDelay: `${index * 0.2}s`}} aria-hidden="true" />
                            </div>
                          </div>
                          <h3 className="font-telegraf font-bold text-sm sm:text-base text-primary group-hover:text-secondary transition-colors">
                            {service.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Conclusion Text */}
            <div className="text-center mt-10 md:mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-lg">
              <p className="font-telegraf text-lg sm:text-xl md:text-2xl text-gray-700 italic mb-4 font-semibold">
                {t('home.guide.conclusion')}
              </p>
              <Link to="/services" className="font-telegraf text-primary hover:text-primary-600 underline hover:no-underline transition-colors duration-200 text-base sm:text-lg font-bold">
                {t('home.guide.learnMoreServices')}
              </Link>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

        {/* Plan Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-accent/8 via-white to-primary/10 section-container relative animate-gradient-flow" aria-labelledby="plan-heading">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-[0.08] animate-gradient-flow pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 40% 30%, rgba(30, 43, 126, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 60% 70%, rgba(230, 224, 142, 0.2) 0%, transparent 50%)`,
            backgroundSize: '200% 200%'
          }}></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="plan-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-10 md:mb-12 text-center animate-fade-in-up" style={{color: '#1E2B7E'}}>
              {t('home.plan.title')}
            </h2>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-telegraf font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg hover-scale-icon primary-glow animate-float-slow">1</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.plan.step1') }}>
                </p>
              </div>
              <div className="flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-telegraf font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg hover-scale-icon secondary-glow animate-float-slow" style={{animationDelay: '0.5s'}}>2</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.plan.step2') }}>
                </p>
              </div>
              <div className="flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-telegraf font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg hover-scale-icon accent-glow animate-float-slow" style={{animationDelay: '1s'}}>3</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.plan.step3') }}>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        {/* Two Paths Forward Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/8 via-secondary/5 to-primary/8 section-container relative" aria-labelledby="two-paths-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="two-paths-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-10 md:mb-12 text-center animate-fade-in-up" style={{color: '#1E2B7E'}}>
              {t('home.twoPaths.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-8 lg:gap-6">
              {/* Without Action Column */}
              <div className="bg-gradient-to-br from-red-50/90 via-white to-orange-50/60 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border-l-4 md:border-l-8 border-2 border-red-200/60" style={{borderLeftColor: '#B26E26'}}>
                <div className="flex items-center mb-5 sm:mb-6 md:mb-8">
                  <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 mr-2 sm:mr-3 md:mr-4 stroke-2 flex-shrink-0" style={{color: '#B26E26'}} />
                  <h3 className="font-telegraf font-bold text-base sm:text-lg md:text-xl" style={{color: '#B26E26'}}>
                    {t('home.twoPaths.withoutAction.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-2.5 sm:space-y-3 md:space-y-4 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withoutAction.point1.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withoutAction.point1.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withoutAction.point2.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withoutAction.point2.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withoutAction.point3.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withoutAction.point3.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withoutAction.point4.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withoutAction.point4.description')}</span>
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Dynamic Fragmented Systems - Below text */}
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    {/* Fragmented systems with slow pulsing animation */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 slow-pulse">
                      <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-600 slow-bounce" />
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 slow-pulse" style={{animationDelay: '1.25s'}}>
                      <Server className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-600 slow-bounce" style={{animationDelay: '1s'}} />
                    </div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 slow-pulse" style={{animationDelay: '2.5s'}}>
                      <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-600 slow-bounce" style={{animationDelay: '2s'}} />
                    </div>
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 slow-pulse" style={{animationDelay: '3.75s'}}>
                      <Network className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-600 slow-bounce" style={{animationDelay: '3s'}} />
                    </div>
                    
                    {/* Central chaos indicator - broken system */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg system-error">
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Disconnected state with slow pulsing */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-9 sm:mt-10 md:mt-12">
                      <WifiOff className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-500 slow-pulse" />
                    </div>
                    
                    {/* Dynamic broken connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                      <line x1="80" y1="80" x2="140" y2="140" stroke="#ef4444" strokeWidth="3" strokeDasharray="12,8"/>
                      <line x1="240" y1="80" x2="180" y2="140" stroke="#ef4444" strokeWidth="3" strokeDasharray="12,8"/>
                      <line x1="80" y1="240" x2="140" y2="180" stroke="#ef4444" strokeWidth="3" strokeDasharray="12,8"/>
                      <line x1="240" y1="240" x2="180" y2="180" stroke="#ef4444" strokeWidth="3" strokeDasharray="12,8"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* With Stratum Column */}
              <div className="bg-gradient-to-br from-blue-50/90 via-white to-primary/10 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border-l-4 md:border-l-8 border-2 border-primary/30" style={{borderLeftColor: '#266AB2'}}>
                <div className="flex items-center mb-5 sm:mb-6 md:mb-8">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 mr-2 sm:mr-3 md:mr-4 stroke-2 flex-shrink-0" style={{color: '#266AB2'}} />
                  <h3 className="font-telegraf font-bold text-base sm:text-lg md:text-xl" style={{color: '#266AB2'}}>
                    {t('home.twoPaths.withStratum.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-2.5 sm:space-y-3 md:space-y-4 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withStratum.point1.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withStratum.point1.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withStratum.point2.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withStratum.point2.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withStratum.point3.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withStratum.point3.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 sm:mr-3 mt-1 text-sm sm:text-base md:text-lg flex-shrink-0" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-sm sm:text-base md:text-lg">{t('home.twoPaths.withStratum.point4.title')}</strong> – <span className="text-xs sm:text-sm sm:text-base">{t('home.twoPaths.withStratum.point4.description')}</span>
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Dynamic Connected Systems Network - Below text */}
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    {/* Expanding pulse rings - behind the boxes, limited expansion */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full border-2 border-green-400 network-pulse z-0"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full border-2 border-green-400 network-pulse z-0" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full border-2 border-green-400 network-pulse z-0" style={{animationDelay: '1s'}}></div>
                    
                    {/* Central AI hub - opaque and static */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center z-10 shadow-2xl">
                      <Brain className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                    </div>
                    
                    {/* Connected systems with slow pulsing animation */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg slow-pulse">
                      <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 slow-bounce" />
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg slow-pulse" style={{animationDelay: '1.25s'}}>
                      <Server className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 slow-bounce" style={{animationDelay: '1s'}} />
                    </div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg slow-pulse" style={{animationDelay: '2.5s'}}>
                      <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 slow-bounce" style={{animationDelay: '2s'}} />
                    </div>
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg slow-pulse" style={{animationDelay: '3.75s'}}>
                      <Network className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 slow-bounce" style={{animationDelay: '3s'}} />
                    </div>
                    
                    {/* WiFi connectivity with slow pulsing */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 sm:mt-14 md:mt-16">
                      <Wifi className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 slow-pulse" />
                    </div>
                    
                    {/* Speed indicators with slow bounce animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-12 sm:-mt-14 md:-mt-16">
                      <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-500 slow-bounce" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    </div>
                    
                    {/* Dynamic connection lines with flowing data */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                      <line x1="80" y1="80" x2="140" y2="140" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="3s" repeatCount="indefinite"/>
                      </line>
                      <line x1="240" y1="80" x2="180" y2="140" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="3s" repeatCount="indefinite" begin="0.75s"/>
                      </line>
                      <line x1="80" y1="240" x2="140" y2="180" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="3s" repeatCount="indefinite" begin="1.5s"/>
                      </line>
                      <line x1="240" y1="240" x2="180" y2="180" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="3s" repeatCount="indefinite" begin="2.25s"/>
                      </line>
                      
                      {/* Enhanced data flow indicators */}
                      <circle cx="120" cy="120" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="200" cy="120" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" begin="0.6s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" begin="0.6s"/>
                      </circle>
                      <circle cx="120" cy="200" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" begin="1.2s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" begin="1.2s"/>
                      </circle>
                      <circle cx="200" cy="200" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" begin="1.8s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" begin="1.8s"/>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

        {/* Final CTA Section - Matching Hero Section Animated Background */}
        <section className="relative flex items-center justify-center overflow-hidden py-12 sm:py-16 bg-gradient-to-tl from-primary via-primary-800 to-secondary text-white" aria-labelledby="final-cta-heading">
          {/* Dark overlay for better text contrast - same as hero section */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          {/* Tech animated background - temporarily removed */}
          {/* <TechAnimatedBackground className="z-0" opacity={0.7} /> */}

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="font-telegraf font-bold text-2xl md:text-3xl mb-4 sm:mb-6">
              {t('home.finalCta.title')}
            </h2>
            <p className="font-telegraf text-base mb-4 sm:mb-6 text-primary-100">
              {t('home.finalCta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 py-3 text-sm rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <a href="https://calendly.com/admin-stratumpr/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule free consultation for data analytics services">
                  {t('services.cta.consultation')}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-6 py-3 text-sm rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105"
              >
                <Link to="/contact" aria-label="Contact Stratum PR team for data analytics consulting">{t('services.cta.contact')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Coming Soon Modal for Systems Assessment */}
      <ComingSoonModal open={showComingSoon} onOpenChange={setShowComingSoon} />
    </TooltipProvider>
  );
};

export default Home;
