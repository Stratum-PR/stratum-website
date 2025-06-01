import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  BarChart3,
  Settings,
  TrendingUp,
  Brain,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Services = () => {
  // SEO optimization for services page
  useSEO({
    title: "Data Analytics Services Puerto Rico | CRM Implementation | AI Business Automation - Stratum PR",
    description: "Comprehensive data analytics services in Puerto Rico. Specializing in CRM implementation consulting, AI business automation, predictive modeling, and big data analytics. Transform your business with Stratum PR.",
    keywords: "data analytics services Puerto Rico, CRM implementation consulting, AI business automation, big data analytics, Salesforce implementation, predictive modeling services, business intelligence consulting, machine learning Puerto Rico",
    canonical: "https://www.stratumpr.com/services",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.stratumpr.com/services#services",
      "name": "Data Analytics and Business Automation Services",
      "description": "Comprehensive analytics, CRM implementation, AI solutions, and business automation services in Puerto Rico",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Stratum PR"
      },
      "serviceType": [
        "Data Analytics",
        "CRM Implementation",
        "AI Solutions", 
        "Business Automation",
        "Predictive Modeling",
        "Big Data Analytics"
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Puerto Rico"
      }
    }
  }, "services");

  const services = [
    {
      icon: Zap,
      title: "Enterprise Software Integration",
      description: "Seamlessly connect disparate systems to create unified, efficient business processes across your organization.",
      features: [
        "API Development & Integration",
        "Legacy System Modernization",
        "Cloud Migration Strategies",
        "Microservices Architecture",
        "Security & Compliance"
      ],
      deliverables: "Fully integrated ecosystem with reduced operational complexity"
    },
    {
      icon: Settings,
      title: "CRM Implementation & Optimization",
      description: "Streamline customer relationships with integrated CRM solutions that drive sales efficiency and customer satisfaction.",
      features: [
        "Salesforce & HubSpot Implementation",
        "Custom CRM Development",
        "Data Migration & Integration",
        "Workflow Automation",
        "Performance Analytics"
      ],
      deliverables: "90-day implementation timeline with full training and support"
    },
    {
      icon: Database,
      title: "Big Data Analytics & Visualization",
      description: "Transform massive datasets into actionable insights through advanced analytics and intuitive visualization platforms.",
      features: [
        "Data Warehouse Architecture",
        "ETL Pipeline Development",
        "Interactive Dashboards",
        "Real-time Analytics",
        "Custom Reporting Solutions"
      ],
      deliverables: "Comprehensive analytics platform with 24/7 monitoring"
    },
    {
      icon: TrendingUp,
      title: "Forecasting & Predictive Modeling",
      description: "Leverage statistical models and machine learning to predict trends, optimize resources, and mitigate risks.",
      features: [
        "Demand Forecasting Models",
        "Risk Assessment Analytics",
        "Market Trend Analysis",
        "Resource Optimization",
        "Scenario Planning Tools"
      ],
      deliverables: "Predictive models with 85%+ accuracy and automated reporting"
    },
    {
      icon: Brain,
      title: "Process Automation & ETL",
      description: "Implement cutting-edge technologies to automate processes, enhance decision-making, and drive innovation.",
      features: [
        "Natural Language Processing",
        "Computer Vision Applications",
        "Recommendation Systems",
        "Anomaly Detection",
        "Automated Decision Systems"
      ],
      deliverables: "Custom AI solutions with continuous learning capabilities"
    },
    {
      icon: BarChart3,
      title: "AI & Decision Intelligence",
      description: "Create intelligent systems that automate complex business decisions while maintaining strategic oversight and control.",
      features: [
        "Automated Decision Workflows",
        "Business Rule Engines",
        "Strategic Planning Tools",
        "Performance Monitoring",
        "Optimization Algorithms"
      ],
      deliverables: "Intelligent automation platform with strategic decision support"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "We begin with a comprehensive analysis of your current systems, data landscape, and business objectives."
    },
    {
      step: "02",
      title: "Strategic Architecture",
      description: "Our team designs a tailored solution architecture that aligns with your goals and integrates with existing infrastructure."
    },
    {
      step: "03",
      title: "Implementation & Integration",
      description: "We execute the solution with minimal disruption to your operations, ensuring seamless integration and user adoption."
    },
    {
      step: "04",
      title: "Training & Optimization",
      description: "Comprehensive training programs and ongoing optimization ensure maximum value from your investment."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl mb-6">
            Data Analytics Services Puerto Rico
          </h1>
          <p className="font-telegraf text-xl text-primary-100 leading-relaxed mb-8">
            We architect comprehensive solutions that transform complex data into strategic business advantages. Our services span the entire analytics ecosystem, from CRM implementation consulting to AI business automation.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule consultation for data analytics services">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="font-telegraf font-bold text-4xl text-primary mb-6">
              Our Core Services
            </h2>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              Each service is designed to deliver measurable business value while building the foundation for long-term strategic advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl group-hover:bg-secondary transition-colors duration-300">
                        <service.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-telegraf text-2xl text-primary mb-6">
                        {service.title}
                      </CardTitle>
                      <p className="font-telegraf text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div className="mb-6">
                    <h4 className="font-telegraf font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2" role="list">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                          <span className="font-telegraf text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <Badge variant="outline" className="text-primary border-accent/20">
                      {service.deliverables}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="process-heading" className="font-telegraf font-bold text-4xl text-primary mb-6">
              Our Process
            </h2>
            <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology that ensures successful delivery and sustainable long-term value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((phase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-telegraf font-bold mb-6">
                    {phase.step}
                  </div>
                  <h3 className="font-telegraf font-semibold text-xl text-primary mb-4">
                    {phase.title}
                  </h3>
                  <p className="font-telegraf text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            Let's discuss how our data analytics services can transform your business operations and drive strategic growth in Puerto Rico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule free consultation for data analytics services">
                Schedule Free Consultation
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105"
            >
              <Link to="/contact" aria-label="Contact Stratum PR team for data analytics consulting">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
