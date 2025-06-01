import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Heart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseStudies = () => {
  const { t } = useLanguage();

  // SEO optimization for case studies page
  useSEO({
    title: "Case Studies - Stratum PR Data Analytics Success Stories",
    description: "Explore real-world examples of how Stratum PR delivers data analytics, automation, and strategic decision systems for clients across Puerto Rico and beyond.",
    keywords: "case studies Puerto Rico, data analytics success stories, business intelligence examples, CRM implementation results, automation case studies, digital transformation examples",
    canonical: "https://www.stratumpr.com/case-studies",
    ogType: "website"
  }, "case-studies");

  // Case Studies data
  const caseStudies = [{
    id: 1,
    title: t('casestudies.healthcare.title'),
    client: t('casestudies.healthcare.client'),
    sector: t('casestudies.healthcare.sector'),
    summary: t('casestudies.healthcare.summary'),
    tags: [t('casestudies.healthcare.sector'), "Integration", "Dashboards"],
    icon: Heart,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  }, {
    id: 2,
    title: t('casestudies.municipal.title'),
    client: t('casestudies.municipal.client'),
    sector: t('casestudies.municipal.sector'),
    summary: t('casestudies.municipal.summary'),
    tags: [t('casestudies.municipal.sector'), "Transparency", "Dashboards"],
    icon: Building2,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  }, {
    id: 3,
    title: t('casestudies.sales.title'),
    client: t('casestudies.sales.client'),
    sector: t('casestudies.sales.sector'),
    summary: t('casestudies.sales.summary'),
    tags: [t('casestudies.sales.sector'), "Automation", "Analytics"],
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  }];

  // All tags for filtering
  const allTags = [t('casestudies.filter.all'), t('casestudies.healthcare.sector'), t('casestudies.municipal.sector'), t('casestudies.sales.sector'), "Dashboards", "Integration", "Automation", "Analytics", "Transparency"];

  // Function to handle read more action
  const handleReadMore = (studyId: number) => {
    console.log(`Opening case study ${studyId}`);
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {t('casestudies.hero.title')}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl text-justify">
            {t('casestudies.hero.description')}
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map(study => (
              <Card key={study.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <study.icon className="h-16 w-16 text-primary/60" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {study.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-telegraf font-semibold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                    {study.title}
                  </h3>
                  <p className="font-telegraf text-sm text-gray-500 mb-3">
                    {study.sector}
                  </p>
                  <p className="font-telegraf text-gray-600 mb-4 leading-relaxed text-justify">
                    {study.summary}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-telegraf text-primary hover:text-secondary transition-colors group" onClick={() => handleReadMore(study.id)}>
                    {t('casestudies.readmore')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            {t('casestudies.cta.title')}
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100 text-justify">
            {t('casestudies.cta.description')}
          </p>
          <div className="text-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('casestudies.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
