    import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap, Layers, Info, Clock, HelpCircle, Server, AlertTriangle, XCircle, Network, Wifi, WifiOff } from "lucide-react";
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
        <section className="hero-section relative flex items-center overflow-hidden h-[80vh]">
          {/* Analytics background image with dark overlay - cropped from top */}
          <div className="absolute inset-0 bg-cover bg-center bg-top bg-no-repeat" style={{backgroundImage: 'url("/img/conny-schneider-s8JOKMUiyo4-unsplash.jpg")'}}></div>
          <div className="absolute inset-0 bg-black/70"></div>
          
          {/* Optimized animation elements for mobile performance */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-accent/15 to-accent/5 rounded-full blur-3xl animate-float opacity-70 will-change-transform"></div>
            <div 
              className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-primary-600/15 rounded-full blur-3xl animate-float opacity-60 will-change-transform" 
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
            <h1 className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
              {t('home.hero.title')}
            </h1>

            <p className="font-telegraf text-base sm:text-lg md:text-xl mb-8 text-primary-100 max-w-4xl mx-auto animate-slide-up">
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
                  {t('home.hero.cta.primary')}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105 text-sm sm:text-base" 
                aria-label="Download the Data Health Checklist"
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
                    <div className="flex space-x-1">
                      <Server className="h-8 w-8 text-red-600 group-hover:text-red-700 stroke-2" />
                      <Server className="h-8 w-8 text-red-600 group-hover:text-red-700 stroke-2" />
                    </div>
                  </div>
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3">
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
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3">
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
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center group-hover:from-yellow-200 group-hover:to-yellow-300 transition-colors">
                    <div className="flex space-x-1">
                      <HelpCircle className="h-6 w-6 text-yellow-600 group-hover:text-yellow-700 stroke-2" />
                      <HelpCircle className="h-6 w-6 text-yellow-600 group-hover:text-yellow-700 stroke-2" />
                      <HelpCircle className="h-6 w-6 text-yellow-600 group-hover:text-yellow-700 stroke-2" />
                    </div>
                  </div>
                  <h3 className="font-telegraf font-bold text-xl text-gray-800 mb-3">
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-telegraf text-xl sm:text-2xl text-gray-800 mb-6 leading-relaxed font-semibold">
                {t('home.guide.description')}
              </p>
              <p className="font-telegraf text-base sm:text-lg text-gray-700 mb-8 font-semibold">
                {t('home.guide.weSpecialize')}
              </p>
            </div>
            
            {/* Service Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {services.map((service, index) => (
                <Link key={index} to="/services" className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                    <CardContent className="p-6 text-center h-full flex flex-col">
                      <div className="flex justify-center mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <service.icon className="h-6 w-6 text-primary group-hover:text-white" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="font-telegraf font-semibold text-lg text-primary group-hover:text-secondary transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="font-telegraf text-gray-600 text-sm flex-grow">
                        {service.simpleExplanation}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Conclusion Text */}
            <div className="text-center">
              <p className="font-telegraf text-lg text-gray-600 italic mb-4">
                {t('home.guide.conclusion')}
              </p>
              <Link to="/about" className="font-telegraf text-primary hover:text-primary-600 underline hover:no-underline transition-colors duration-200">
                Learn more about us.
              </Link>
            </div>
          </div>
        </section>

        {/* Plan Section */}
        <section className="py-16 sm:py-20 bg-white section-container" aria-labelledby="plan-heading">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="plan-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-8 text-center whitespace-nowrap">
              {t('home.plan.title')}
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center justify-center w-full max-w-6xl">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-telegraf font-bold text-lg mr-4 flex-shrink-0">1</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step1') }}>
                </p>
              </div>
              <div className="flex items-center justify-center w-full max-w-6xl">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-telegraf font-bold text-lg mr-4 flex-shrink-0">2</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step2') }}>
                </p>
              </div>
              <div className="flex items-center justify-center w-full max-w-6xl">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-telegraf font-bold text-lg mr-4 flex-shrink-0">3</span>
                <p className="font-telegraf text-base sm:text-lg md:text-xl text-gray-600 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t('home.plan.step3') }}>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two Paths Forward Section */}
        <section className="py-20 sm:py-24 bg-gray-50 section-container" aria-labelledby="two-paths-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="two-paths-heading" className="font-telegraf font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-16 text-center">
              {t('home.twoPaths.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Without Action Column */}
              <div className="bg-white rounded-lg p-10 shadow-lg border-l-4" style={{borderLeftColor: '#B26E26'}}>
                <div className="flex items-center mb-8">
                  <AlertTriangle className="h-10 w-10 mr-4 stroke-2" style={{color: '#B26E26'}} />
                  <h3 className="font-telegraf font-bold text-2xl" style={{color: '#B26E26'}}>
                    {t('home.twoPaths.withoutAction.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-4">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withoutAction.point1.title')}</strong> – {t('home.twoPaths.withoutAction.point1.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withoutAction.point2.title')}</strong> – {t('home.twoPaths.withoutAction.point2.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withoutAction.point3.title')}</strong> – {t('home.twoPaths.withoutAction.point3.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#B26E26'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withoutAction.point4.title')}</strong> – {t('home.twoPaths.withoutAction.point4.description')}
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Broken Systems Illustration - Below text */}
                <div className="mt-8 flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Broken chain/network visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    </div>
                    {/* Manual work icons scattered around */}
                    <div className="absolute top-2 left-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Database className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Server className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <WifiOff className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* With Stratum Column */}
              <div className="bg-white rounded-lg p-10 shadow-lg border-l-4" style={{borderLeftColor: '#266AB2'}}>
                <div className="flex items-center mb-8">
                  <TrendingUp className="h-10 w-10 mr-4 stroke-2" style={{color: '#266AB2'}} />
                  <h3 className="font-telegraf font-bold text-2xl" style={{color: '#266AB2'}}>
                    {t('home.twoPaths.withStratum.title')}
                  </h3>
                </div>
                
                <ul className="font-telegraf text-gray-600 space-y-4">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withStratum.point1.title')}</strong> – {t('home.twoPaths.withStratum.point1.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withStratum.point2.title')}</strong> – {t('home.twoPaths.withStratum.point2.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withStratum.point3.title')}</strong> – {t('home.twoPaths.withStratum.point3.description')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1" style={{color: '#266AB2'}}>•</span>
                    <div>
                      <strong className="text-gray-800">{t('home.twoPaths.withStratum.point4.title')}</strong> – {t('home.twoPaths.withStratum.point4.description')}
                    </div>
                  </li>
                </ul>
                
                {/* Visual: Connected Systems Circle - Below text */}
                <div className="mt-8 flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Central hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center z-10">
                      <Network className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Connected systems around the circle */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <Database className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <Server className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                      <line x1="80" y1="20" x2="80" y2="40" stroke="#266AB2" strokeWidth="2" />
                      <line x1="120" y1="80" x2="100" y2="80" stroke="#266AB2" strokeWidth="2" />
                      <line x1="80" y1="120" x2="80" y2="100" stroke="#266AB2" strokeWidth="2" />
                      <line x1="40" y1="80" x2="60" y2="80" stroke="#266AB2" strokeWidth="2" />
                    </svg>
                    
                    {/* Speed indicators */}
                    <div className="absolute -top-1 -right-1">
                      <Zap className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="absolute -bottom-1 -left-1">
                      <Wifi className="h-5 w-5 text-green-500" />
                    </div>
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
