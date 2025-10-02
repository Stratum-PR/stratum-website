import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap, Layers, Info, Clock, HelpCircle, Server, AlertTriangle, XCircle, Network, Wifi, WifiOff, Link as LinkIcon, RotateCcw, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/OptimizedImage";
import { lazy, Suspense, useState, useEffect } from "react";

// Lazy load non-critical components with better loading states
const WhyWorkWithUsSection = lazy(() => import("@/components/WhyWorkWithUsSection"));

const Home = () => {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  // Hydration optimization
  useEffect(() => {
    setIsClient(true);
  }, []);
  
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
                  className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100"
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
          <p className="font-telegraf text-gray-600 flex-grow text-sm sm:text-base">
            {service.description}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <TooltipProvider>
      <div className="pt-20">
        {/* Hero Section - Optimized for FCP and LCP */}
        <section className="hero-section relative flex items-center overflow-hidden h-[60vh]">
          {/* Hero poster background image with dark overlay - cropped from top */}
          <div className="absolute inset-0 bg-cover bg-center bg-top bg-no-repeat" style={{backgroundImage: 'url("/img/hero_poster.png")'}}></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Optimized animation elements for mobile performance */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-accent/15 to-accent/5 rounded-full blur-3xl animate-float opacity-70 will-change-transform"></div>
            <div 
              className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-primary-600/15 rounded-full blur-3xl animate-float opacity-60 will-change-transform" 
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
            <h1 className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              {t('home.hero.title')}
            </h1>

            <p className="font-telegraf text-lg sm:text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto animate-slide-up leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-base sm:text-lg" 
                aria-label="Schedule free consultation with Stratum PR data analytics experts"
                style={{minHeight: '56px', minWidth: '200px'}}
              >
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('home.hero.cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </a>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105 text-base sm:text-lg" 
                aria-label="Download the Data Health Checklist"
                style={{minHeight: '56px', minWidth: '200px'}}
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {t('home.hero.cta.secondary')}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 sm:py-20 bg-white section-container" aria-labelledby="problem-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="problem-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-12 text-center">
              {t('home.problem.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Fragmented Data Box */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group ">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-colors">
                    <div className="flex items-center space-x-1">
                      <Link2 className="h-6 w-6 text-red-600 group-hover:text-red-700 stroke-2" />
                      <div className="w-1 h-4 bg-red-600"></div>
                      <Link2 className="h-6 w-6 text-red-600 group-hover:text-red-700 stroke-2 rotate-45" />
                    </div>
                  </div>
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box1.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed">
                    {t('home.problem.box1.subtitle')}
                  </p>
                </div>
              </div>

              {/* Manual Work Box */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group ">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-colors">
                    <Clock className="h-10 w-10 text-orange-600 group-hover:text-orange-700 stroke-2" />
                  </div>
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box2.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed">
                    {t('home.problem.box2.subtitle')}
                  </p>
                </div>
              </div>

              {/* Gut-based Decisions Box */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group ">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center group-hover:from-yellow-200 group-hover:to-yellow-300 transition-colors relative overflow-hidden">
                    {/* Outer spiral */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-80 animate-spin" style={{animationDuration: '4s'}}></div>
                    {/* Middle spiral */}
                    <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-90 animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
                    {/* Inner spiral */}
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-95 animate-spin" style={{animationDuration: '2s'}}></div>
                    {/* Center dot */}
                    <div className="absolute inset-6 bg-yellow-600 rounded-full animate-pulse"></div>
                    {/* Spiral lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                      <path d="M40,40 Q20,20 40,20 Q60,20 60,40 Q60,60 40,60 Q20,60 20,40" stroke="#fbbf24" strokeWidth="2" fill="none" className="animate-spin" style={{animationDuration: '3s'}}/>
                      <path d="M40,40 Q30,30 40,30 Q50,30 50,40 Q50,50 40,50 Q30,50 30,40" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}/>
                    </svg>
                  </div>
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center">
                    {t('home.problem.box3.title')}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed">
                    {t('home.problem.box3.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Blue Background Message */}
            <div className="bg-primary text-white rounded-lg p-8 text-center">
              <p className="font-telegraf text-xl sm:text-2xl font-semibold leading-relaxed">
                {t('home.problem.conclusion')}
              </p>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section className="py-16 sm:py-20 bg-gray-50 section-container" aria-labelledby="guide-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-12">
                <div>
                  <p className="font-telegraf text-4xl sm:text-5xl lg:text-6xl text-gray-800 leading-relaxed font-bold mb-8" style={{color: '#1E2B7E'}}>
                    {t('home.guide.description')}
                  </p>
                  <p className="font-telegraf text-2xl sm:text-3xl text-gray-700 mb-8">
                    <Link to="/about" className="text-primary hover:text-primary-600 underline hover:no-underline transition-colors duration-200 font-semibold">
                      More about us here.
                    </Link>
                  </p>
                </div>
                
                {/* Enhanced Technology Image with Branding Kit Colors */}
                <div className="w-full h-96 bg-gradient-to-br from-[#E6E09E] via-[#266AB2] to-[#1E2B7E] rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E6E09E]/20 to-[#1E2B7E]/30"></div>
                  <div className="text-center relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#E6E09E] to-[#266AB2] rounded-full flex items-center justify-center shadow-2xl">
                      <Brain className="h-12 w-12 text-white" />
                    </div>
                    <p className="font-telegraf text-white text-2xl font-bold">Technology & Innovation</p>
                    <p className="font-telegraf text-white/80 text-lg mt-2">The Architecture of Better Decisions</p>
                  </div>
                  
                  {/* Dynamic geometric shapes */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-lg rotate-45 animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-8 w-8 h-8 bg-white/25 rounded-lg rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
              </div>

              {/* Right Side - Enhanced Services Grid */}
              <div>
                <h2 className="font-telegraf text-3xl sm:text-4xl text-gray-800 mb-12 font-bold text-center" style={{color: '#1E2B7E'}}>
                  {t('home.guide.weSpecialize')}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <Link key={index} to="/services" className="group">
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                        <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                          <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#E6E09E] to-[#266AB2] rounded-xl group-hover:from-[#266AB2] group-hover:to-[#1E2B7E] transition-all duration-300 shadow-lg">
                              <service.icon className="h-10 w-10 text-white group-hover:text-white" aria-hidden="true" />
                            </div>
                          </div>
                          <h3 className="font-telegraf font-bold text-2xl text-primary group-hover:text-secondary transition-colors">
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
            <div className="text-center mt-16">
              <p className="font-telegraf text-3xl sm:text-4xl text-gray-600 italic mb-6 font-semibold">
                {t('home.guide.conclusion')}
              </p>
              <Link to="/services" className="font-telegraf text-primary hover:text-primary-600 underline hover:no-underline transition-colors duration-200 text-2xl sm:text-3xl font-bold">
                Learn more about our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Plan Section */}
        <section className="py-20 sm:py-28 bg-white section-container" aria-labelledby="plan-heading">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="plan-heading" className="font-telegraf font-bold text-4xl sm:text-5xl md:text-6xl text-primary mb-16 text-center whitespace-nowrap" style={{color: '#1E2B7E'}}>
              {t('home.plan.title')}
            </h2>
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center justify-center w-full max-w-7xl">
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 flex items-center justify-center font-telegraf font-bold text-xl mr-6 flex-shrink-0 shadow-lg">1</span>
                <p className="font-telegraf text-xl sm:text-2xl md:text-3xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step1') }}>
                </p>
              </div>
              <div className="flex items-center justify-center w-full max-w-7xl">
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 flex items-center justify-center font-telegraf font-bold text-xl mr-6 flex-shrink-0 shadow-lg">2</span>
                <p className="font-telegraf text-xl sm:text-2xl md:text-3xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step2') }}>
                </p>
              </div>
              <div className="flex items-center justify-center w-full max-w-7xl">
                <span className="bg-gradient-to-br from-[#E6E09E] to-[#266AB2] text-white rounded-full w-12 h-12 flex items-center justify-center font-telegraf font-bold text-xl mr-6 flex-shrink-0 shadow-lg">3</span>
                <p className="font-telegraf text-xl sm:text-2xl md:text-3xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step3') }}>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two Paths Forward Section */}
        <section className="py-32 sm:py-40 bg-gray-50 section-container" aria-labelledby="two-paths-heading">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="two-paths-heading" className="font-telegraf font-bold text-4xl sm:text-5xl md:text-6xl text-primary mb-24 text-center" style={{color: '#1E2B7E'}}>
              {t('home.twoPaths.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Without Action Column */}
              <div className="bg-white rounded-2xl p-16 shadow-2xl border-l-8" style={{borderLeftColor: '#B26E26'}}>
                <div className="flex items-center mb-12">
                  <AlertTriangle className="h-16 w-16 mr-8 stroke-2" style={{color: '#B26E26'}} />
                  <h3 className="font-telegraf font-bold text-4xl" style={{color: '#B26E26'}}>
                    {t('home.twoPaths.withoutAction.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-8 text-2xl">
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withoutAction.point1.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withoutAction.point1.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withoutAction.point2.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withoutAction.point2.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withoutAction.point3.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withoutAction.point3.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withoutAction.point4.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withoutAction.point4.description')}</span>
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Dynamic Fragmented Systems - Below text */}
                <div className="mt-12 flex justify-center">
                  <div className="relative w-80 h-80">
                    {/* Fragmented systems with pulsing animation */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 animate-pulse">
                      <Database className="h-8 w-8 text-red-600 animate-bounce" />
                    </div>
                    <div className="absolute top-4 right-4 w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 animate-pulse" style={{animationDelay: '0.5s'}}>
                      <Server className="h-8 w-8 text-red-600 animate-bounce" />
                    </div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 animate-pulse" style={{animationDelay: '1s'}}>
                      <BarChart3 className="h-8 w-8 text-red-600 animate-bounce" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center border-2 border-red-300 animate-pulse" style={{animationDelay: '1.5s'}}>
                      <Brain className="h-8 w-8 text-red-600 animate-bounce" />
                    </div>
                    
                    {/* Central chaos indicator with rotation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-spin">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Disconnected state with pulsing */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12">
                      <WifiOff className="h-8 w-8 text-red-500 animate-pulse" />
                    </div>
                    
                    {/* Dynamic broken connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                      <line x1="80" y1="80" x2="160" y2="160" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4">
                        <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite"/>
                      </line>
                      <line x1="240" y1="80" x2="160" y2="160" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4">
                        <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" begin="0.25s"/>
                      </line>
                      <line x1="80" y1="240" x2="160" y2="160" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4">
                        <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                      </line>
                      <line x1="240" y1="240" x2="160" y2="160" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4">
                        <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" begin="0.75s"/>
                      </line>
                    </svg>
                  </div>
                </div>
              </div>

              {/* With Stratum Column */}
              <div className="bg-white rounded-2xl p-16 shadow-2xl border-l-8" style={{borderLeftColor: '#266AB2'}}>
                <div className="flex items-center mb-12">
                  <TrendingUp className="h-16 w-16 mr-8 stroke-2" style={{color: '#266AB2'}} />
                  <h3 className="font-telegraf font-bold text-4xl" style={{color: '#266AB2'}}>
                    {t('home.twoPaths.withStratum.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-8 text-2xl">
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withStratum.point1.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withStratum.point1.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withStratum.point2.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withStratum.point2.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withStratum.point3.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withStratum.point3.description')}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-6 mt-3 text-3xl" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800 text-3xl">{t('home.twoPaths.withStratum.point4.title')}</strong> – <span className="text-2xl">{t('home.twoPaths.withStratum.point4.description')}</span>
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Dynamic Connected Systems Network - Below text */}
                <div className="mt-12 flex justify-center">
                  <div className="relative w-80 h-80">
                    {/* Central AI hub with pulsing animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-10 shadow-2xl animate-pulse">
                      <Brain className="h-10 w-10 text-white animate-bounce" />
                    </div>
                    
                    {/* Connected systems with dynamic animations */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg animate-pulse">
                      <Database className="h-8 w-8 text-green-600 animate-bounce" />
                    </div>
                    <div className="absolute top-4 right-4 w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg animate-pulse" style={{animationDelay: '0.3s'}}>
                      <Server className="h-8 w-8 text-green-600 animate-bounce" />
                    </div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg animate-pulse" style={{animationDelay: '0.6s'}}>
                      <BarChart3 className="h-8 w-8 text-green-600 animate-bounce" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center border-2 border-green-400 shadow-lg animate-pulse" style={{animationDelay: '0.9s'}}>
                      <Network className="h-8 w-8 text-green-600 animate-bounce" />
                    </div>
                    
                    {/* WiFi connectivity with pulsing */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
                      <Wifi className="h-8 w-8 text-green-500 animate-pulse" />
                    </div>
                    
                    {/* Speed indicators with rotation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-16">
                      <Zap className="h-8 w-8 text-yellow-500 animate-spin" />
                    </div>
                    
                    {/* Dynamic connection lines with flowing data */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                      <line x1="80" y1="80" x2="160" y2="160" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                      </line>
                      <line x1="240" y1="80" x2="160" y2="160" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </line>
                      <line x1="80" y1="240" x2="160" y2="160" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </line>
                      <line x1="240" y1="240" x2="160" y2="160" stroke="#10b981" strokeWidth="4">
                        <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                      </line>
                      
                      {/* Enhanced data flow indicators */}
                      <circle cx="120" cy="120" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="200" cy="120" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                      </circle>
                      <circle cx="120" cy="200" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                      </circle>
                      <circle cx="200" cy="200" r="3" fill="#10b981">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-secondary section-container" aria-labelledby="final-cta-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 id="final-cta-heading" className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl mb-8">
              {t('home.finalCta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
                aria-label="Schedule free consultation with Stratum PR"
            >
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('home.finalCta.consultation')}
                </a>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-black border-2 border-white font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
                aria-label="Download the Data Health Checklist"
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {t('home.finalCta.checklist')}
              </a>
            </Button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
};

export default Home;
