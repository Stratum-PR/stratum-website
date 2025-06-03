import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
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
      title: t('services.integration.title'),
      description: t('services.integration.description'),
      features: [
        t('services.integration.feature1'),
        t('services.integration.feature2'),
        t('services.integration.feature3'),
        t('services.integration.feature4'),
        t('services.integration.feature5')
      ],
      deliverables: t('services.integration.deliverable'),
      tooltip: "Streamline your business operations by connecting different software systems and automating data flow between platforms, reducing manual work and improving efficiency."
    },
    {
      icon: Settings,
      title: t('services.crm.title'),
      description: t('services.crm.description'),
      features: [
        t('services.crm.feature1'),
        t('services.crm.feature2'),
        t('services.crm.feature3'),
        t('services.crm.feature4'),
        t('services.crm.feature5')
      ],
      deliverables: t('services.crm.deliverable'),
      tooltip: "Transform your customer relationships with properly configured CRM systems that help you track leads, manage sales pipelines, and improve customer satisfaction through better data organization."
    },
    {
      icon: Database,
      title: t('services.bigdata.title'),
      description: t('services.bigdata.description'),
      features: [
        t('services.bigdata.feature1'),
        t('services.bigdata.feature2'),
        t('services.bigdata.feature3'),
        t('services.bigdata.feature4'),
        t('services.bigdata.feature5')
      ],
      deliverables: t('services.bigdata.deliverable'),
      tooltip: "Unlock the power of your large datasets by implementing robust data processing systems that can handle massive volumes of information and extract meaningful insights for strategic decisions."
    },
    {
      icon: TrendingUp,
      title: t('services.forecasting.title'),
      description: t('services.forecasting.description'),
      features: [
        t('services.forecasting.feature1'),
        t('services.forecasting.feature2'),
        t('services.forecasting.feature3'),
        t('services.forecasting.feature4'),
        t('services.forecasting.feature5')
      ],
      deliverables: t('services.forecasting.deliverable'),
      tooltip: "Predict future trends and outcomes using advanced statistical models and machine learning algorithms, helping you make proactive business decisions and stay ahead of market changes."
    },
    {
      icon: Brain,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      features: [
        t('services.automation.feature1'),
        t('services.automation.feature2'),
        t('services.automation.feature3'),
        t('services.automation.feature4'),
        t('services.automation.feature5')
      ],
      deliverables: t('services.automation.deliverable'),
      tooltip: "Implement intelligent automation solutions that use AI to handle repetitive tasks, make smart decisions, and optimize workflows, freeing up your team for strategic work."
    },
    {
      icon: BarChart3,
      title: t('services.decision.title'),
      description: t('services.decision.description'),
      features: [
        t('services.decision.feature1'),
        t('services.decision.feature2'),
        t('services.decision.feature3'),
        t('services.decision.feature4'),
        t('services.decision.feature5')
      ],
      deliverables: t('services.decision.deliverable'),
      tooltip: "Build comprehensive business intelligence systems with interactive dashboards and reporting tools that transform raw data into actionable insights for better decision-making."
    }
  ];

  const process = [
    {
      step: "01",
      title: t('services.process.step1.title'),
      description: t('services.process.step1.description')
    },
    {
      step: "02",
      title: t('services.process.step2.title'),
      description: t('services.process.step2.description')
    },
    {
      step: "03",
      title: t('services.process.step3.title'),
      description: t('services.process.step3.description')
    },
    {
      step: "04",
      title: t('services.process.step4.title'),
      description: t('services.process.step4.description')
    }
  ];

  return (
    <TooltipProvider>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-telegraf font-bold text-5xl md:text-6xl mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="font-telegraf text-xl text-primary-100 leading-relaxed mb-8">
              {t('services.hero.description')}
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule consultation for data analytics services">
                {t('services.hero.cta')}
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
                {t('services.core.title')}
              </h2>
              <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.core.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card className="group flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-help">
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
                            {t('services.features')}
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
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-3 text-sm leading-relaxed">
                    <p>{service.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="process-heading" className="font-telegraf font-bold text-4xl text-primary mb-6">
                {t('services.process.title')}
              </h2>
              <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.process.description')}
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
              {t('services.cta.title')}
            </h2>
            <p className="font-telegraf text-xl mb-8 text-primary-100">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" aria-label="Schedule free consultation for data analytics services">
                  {t('services.cta.consultation')}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-black border-2 border-primary font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-2xl hover:scale-105"
              >
                <Link to="/contact" aria-label="Contact Stratum PR team for data analytics consulting">{t('services.cta.contact')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
};

export default Services;
