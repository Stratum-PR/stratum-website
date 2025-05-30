import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Brain, Database, Target, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Database,
      title: "Big Data Analytics",
      description: "Transform complex data into actionable insights"
    },
    {
      icon: Brain,
      title: "AI & Decision Intelligence",
      description: "Intelligent automation for strategic decisions"
    },
    {
      icon: BarChart3,
      title: "CRM Optimization",
      description: "Streamline customer relationships and processes"
    },
    {
      icon: Target,
      title: "Predictive Modeling",
      description: "Forecast trends and optimize outcomes"
    }
  ];

  const stats = [
    { value: "16+", label: "Years of Experience" },
    { value: "F500", label: "Built by veterans of Fortune Top 5 Companies" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "30+", label: "Project Solutions Delivered" },
    { value: "PR", label: "Island Based Team" }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-secondary min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-telegraf font-bold text-5xl md:text-7xl mb-6 animate-fade-in">
            The Architecture of
            <span className="block text-accent">Better Decisions</span>
          </h1>

          <p className="font-telegraf text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
            We build the foundation for strategic excellence through advanced analytics, 
            AI solutions, and data-driven consulting that transforms how businesses operate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              asChild
              size="lg" 
              className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <a href="https://calendly.com/stratumpr" target="_blank" rel="noopener noreferrer">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105"
            >
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-telegraf text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
              Strategic Solutions
            </h2>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              We architect comprehensive solutions that bridge the gap between complex data 
              and strategic business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="font-telegraf font-semibold text-xl text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-telegraf text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            Let's discuss how Stratum PR can architect better decisions for your organization.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <a href="https://calendly.com/stratumpr" target="_blank" rel="noopener noreferrer">
              Get Started Today
              <TrendingUp className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
