
import {
  Database,
  BarChart3,
  Settings,
  TrendingUp,
  Brain,
  Zap
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesGrid = () => {
  const { t } = useLanguage();

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

  return (
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
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
