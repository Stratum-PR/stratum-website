import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteUrl } from "@/i18n/paths";
import { PageMeta } from "@/components/PageMeta";
import { LANDING_ROUTE } from "@/config/discoverable-routes";
import { useEffect } from "react";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProblemSection } from "@/components/home/HomeProblemSection";
import { HomePlanSection } from "@/components/home/HomePlanSection";
import { HomeBeforeAfterSection } from "@/components/home/HomeBeforeAfterSection";
import { HomeProductsSection } from "@/components/home/HomeProductsSection";
import { HomeFinalCtaSection } from "@/components/home/HomeFinalCtaSection";

const Home = () => {
  const { language } = useLanguage();

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
          title: "Stratum PR — Tecnología para Fabricantes de Alimentos",
          description:
            "Ayudamos a los fabricantes de alimentos a dejar el papel atrás: registros, inventario y trazabilidad digitales para llegar a cada inspección con tranquilidad.",
          keywords:
            "fabricantes de alimentos Puerto Rico, FSMA, FSMA 204, trazabilidad, inspección FDA, registros digitales, seguridad alimentaria",
        }
      : {
          title: "Stratum PR — Technology for Food Manufacturers",
          description:
            "We help food manufacturers leave paper behind: digital records, inventory and traceability so every inspection comes with peace of mind.",
          keywords:
            "food manufacturer Puerto Rico, FSMA, FSMA 204, traceability, FDA inspection, digital records, food safety",
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
        url: siteUrl("/", language),
        name: seoData.title,
        description: seoData.description,
        inLanguage: language === "es" ? "es-PR" : "en-US",
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
        <HomeProblemSection />
        <HomeBeforeAfterSection />
        <HomePlanSection />
        <HomeProductsSection />
        <HomeFinalCtaSection />
      </div>
    </>
  );
};

export default Home;
