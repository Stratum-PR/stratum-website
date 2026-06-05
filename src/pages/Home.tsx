import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { LANDING_ROUTE } from "@/config/discoverable-routes";
import OptimizedImage from "@/components/OptimizedImage";
import { useEffect } from "react";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeIntegrationsSection } from "@/components/home/HomeIntegrationsSection";
import { HomePlanSection } from "@/components/home/HomePlanSection";
import { HomeProductionSection } from "@/components/home/HomeProductionSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { HomeStakesSection } from "@/components/home/HomeStakesSection";

const FOUNDERS = [
  { key: "jovaniel" as const, image: "/img/Jovaniel.jpg", bioKey: "home.guide.founder1.bio" },
  { key: "genesis" as const, image: "/img/Genesis.jpg", bioKey: "home.guide.founder2.bio" },
];

const Home = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const sessionKey = "homePageAnimated";
    if (sessionStorage.getItem(sessionKey)) {
      document.body.classList.add("no-animation");
      document.querySelectorAll(".entrance-animation").forEach((el) => el.classList.add("animate"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".entrance-animation").forEach((el) => observer.observe(el));
    sessionStorage.setItem(sessionKey, "true");
    return () => observer.disconnect();
  }, []);

  const seoData =
    language === "es"
      ? {
          title: "Stratum PR — Sistemas Digitales para Fabricantes de Alimentos",
          description:
            "Sistemas digitales a la medida para fabricantes de alimentos en Puerto Rico. Cumplimiento FSMA, inventario y documentación sin el pánico de auditoría.",
          keywords:
            "fabricantes de alimentos Puerto Rico, FSMA, cumplimiento alimentario, sistemas digitales, SQF, trazabilidad, software manufactura alimentos",
        }
      : {
          title: "Stratum PR — Custom Digital Systems for Food Manufacturers",
          description:
            "Custom digital systems for Puerto Rico food manufacturers. FSMA compliance, inventory, and documentation — without spreadsheet chaos or audit panic.",
          keywords:
            "food manufacturer Puerto Rico, FSMA compliance, digital systems, SQF documentation, food production software, traceability, custom software",
        };

  useSEO(
    {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      canonical: "https://www.stratumpr.com/",
      ogType: "website",
      ogTitle: seoData.title,
      ogImage: "https://www.stratumpr.com/img/StratumPR-Preview-Image.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://www.stratumpr.com/",
        name: seoData.title,
        description: seoData.description,
        inLanguage: language === "es" ? "es" : "en",
      },
    },
    "home",
    { skipMeta: true }
  );

  return (
    <>
      <PageMeta route={LANDING_ROUTE} />
      <div>
        <HomeHeroSection />

        <HomeIntegrationsSection />
        <HomeProductionSection />

        <HomeStakesSection />

        <HomeServicesSection />

        {/* 4. Guide */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-secondary/5 to-primary/5 entrance-animation" aria-labelledby="guide-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-telegraf text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto text-center mb-12">
              {t("home.guide.empathy")}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {FOUNDERS.map(({ key, image, bioKey }) => (
                <Card key={key} className="overflow-hidden">
                  <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <OptimizedImage
                      src={image}
                      alt={t(`team.${key}.name`)}
                      className="w-28 h-28 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-telegraf font-bold text-xl text-primary">{t(`team.${key}.name`)}</h3>
                      <p className="font-telegraf text-sm text-accent font-medium mb-2">{t(`team.${key}.role`)}</p>
                      <p className="font-telegraf text-gray-600 text-sm leading-relaxed">{t(bioKey)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <HomePlanSection />

        <HomeProductionSection
          titleKey="home.finalCta.title"
          subtitleKey="home.finalCta.subtitle"
          ctaKey="home.hero.cta.primary"
          headingId="final-cta-heading"
        />
      </div>
    </>
  );
};

export default Home;
