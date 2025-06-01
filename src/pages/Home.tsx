import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import SEOImage from "@/components/SEOImage";
const Home = () => {
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
  const features = [{
    icon: Database,
    title: "Big Data Analytics",
    description: "Transform complex data into actionable insights"
  }, {
    icon: Brain,
    title: "AI & Decision Intelligence",
    description: "Intelligent automation for strategic decisions"
  }, {
    icon: BarChart3,
    title: "CRM Optimization",
    description: "Streamline customer relationships and processes"
  }, {
    icon: Target,
    title: "Predictive Modeling",
    description: "Forecast trends and optimize outcomes"
  }];
  const stats = [{
    value: "16+",
    label: "Years of Experience"
  }, {
    value: "100%",
    label: "Client Satisfaction"
  }, {
    value: "30+",
    label: "Project Solutions Delivered"
  }, {
    value: "PR",
    label: "Island Based Team"
  }, {
    value: "Top 5",
    label: "Built by veterans of Fortune Top 5 Companies"
  }];
  return <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-800 to-secondary min-h-screen flex items-center overflow-hidden">
        {/* Sophisticated Overlay with Multiple Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary-700/85 to-secondary/90"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary-800/30 to-accent/10"></div>
        </div>

        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating element */}
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-accent/15 to-accent/5 rounded-full blur-3xl animate-float opacity-70"></div>
          
          {/* Secondary floating element */}
          <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-primary-600/15 rounded-full blur-3xl animate-float opacity-60" style={{
          animationDelay: '1.5s'
        }}></div>
          
          {/* Tertiary accent element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-2xl animate-float opacity-50" style={{
          animationDelay: '3s'
        }}></div>
          
          {/* Geometric accent lines */}
          <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-pulse opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-pulse opacity-30" style={{
          animationDelay: '2s'
        }}></div>
          
          {/* Subtle mesh pattern */}
          <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#E6E08E'}40 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <h1 className="font-telegraf font-bold text-5xl md:text-7xl mb-6 animate-fade-in">
            The Architecture of
            <span className="block text-accent">Better Decisions</span>
          </h1>

          <p className="font-telegraf text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">RTEST We build the foundation for strategic excellence through advanced analytics, AI solutions, and data-driven consulting that transforms how businesses operate in Puerto Rico and beyond.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{
          animationDelay: '0.3s'
        }}>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105" aria-label="Schedule free consultation with Stratum PR data analytics experts">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105" aria-label="Explore Stratum PR data analytics and AI automation services">
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Company Statistics and Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-telegraf text-gray-600">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
              Strategic Solutions for Data Analytics Puerto Rico
            </h2>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              We architect comprehensive solutions that bridge the gap between complex data 
              and strategic business outcomes through AI business automation and CRM implementation consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-telegraf font-semibold text-xl text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-telegraf text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 id="cta-heading" className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            Let's discuss how Stratum PR can architect better decisions for your organization through data analytics Puerto Rico expertise.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105" aria-label="Get started with Stratum PR data analytics and AI consulting services today">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              Get Started Today
              <TrendingUp className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;