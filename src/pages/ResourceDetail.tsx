
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getResourceBySlug } from "@/data/resources";
import { useSEO } from "@/hooks/useSEO";

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  
  const resource = slug ? getResourceBySlug(slug) : undefined;

  if (!resource) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-telegraf text-2xl text-gray-900 mb-4">Resource not found</h1>
          <Link to="/resources">
            <Button className="bg-primary hover:bg-primary-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = resource.content[language];

  // SEO optimization
  useSEO({
    title: `${content.title} - Stratum PR Resources`,
    description: content.description,
    keywords: `${resource.tags.join(', ')}, data assessment, business analytics, Puerto Rico consulting`,
    canonical: `https://www.stratumpr.com/resources/${resource.slug}`,
    ogType: "article"
  }, `resource-${resource.slug}`);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-telegraf">Back to Resources</span>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-sm font-telegraf bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
            {content.title}
          </h1>
          
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>

      {/* Assessment Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="font-telegraf text-2xl text-primary">
                Assessment Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {content.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 border-2 border-primary rounded hover:bg-primary hover:border-primary transition-colors cursor-pointer group">
                        <CheckCircle className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity m-0.5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-telegraf text-gray-700 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-3xl md:text-4xl mb-6">
            Need Help with Your Assessment?
          </h2>
          <p className="font-telegraf text-lg mb-8 text-primary-100">
            Our data experts can guide you through the assessment process and provide personalized recommendations.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              Schedule Expert Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ResourceDetail;
