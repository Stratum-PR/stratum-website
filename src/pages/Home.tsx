import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Moon,
  DollarSign,
  PackageSearch,
  Users,
  Workflow,
  MessageCircle,
  Wrench,
  CheckCircle,
  Play,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { LANDING_ROUTE } from "@/config/discoverable-routes";
import OptimizedImage from "@/components/OptimizedImage";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { useState, useEffect } from "react";
import { sanitizeHtml } from "@/lib/sanitize";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";

const FOUNDERS = [
  { key: "jovaniel" as const, image: "/img/Jovaniel.jpg", bioKey: "home.guide.founder1.bio" },
  { key: "genesis" as const, image: "/img/Genesis.jpg", bioKey: "home.guide.founder2.bio" },
];

const VALUE_BENEFITS = [
  { icon: Clock, titleKey: "home.value.benefit1.title", bodyKey: "home.value.benefit1.body" },
  { icon: Moon, titleKey: "home.value.benefit2.title", bodyKey: "home.value.benefit2.body" },
  { icon: DollarSign, titleKey: "home.value.benefit3.title", bodyKey: "home.value.benefit3.body" },
  { icon: PackageSearch, titleKey: "home.value.benefit4.title", bodyKey: "home.value.benefit4.body" },
  { icon: Users, titleKey: "home.value.benefit5.title", bodyKey: "home.value.benefit5.body" },
  { icon: Workflow, titleKey: "home.value.benefit6.title", bodyKey: "home.value.benefit6.body" },
];

const STAKE_KEYS = [
  "home.stakes.point1",
  "home.stakes.point2",
  "home.stakes.point3",
  "home.stakes.point4",
  "home.stakes.point5",
] as const;

const PLAN_STEPS = [
  { icon: MessageCircle, titleKey: "home.plan.step1.title", bodyKey: "home.plan.step1.body" },
  { icon: Wrench, titleKey: "home.plan.step2.title", bodyKey: "home.plan.step2.body" },
  { icon: CheckCircle, titleKey: "home.plan.step3.title", bodyKey: "home.plan.step3.body" },
] as const;

const Home = () => {
  const { t, language } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);

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

  const openChecklist = () => setShowComingSoon(true);

  return (
    <>
      <PageMeta route={LANDING_ROUTE} />
      <div>
        <HomeHeroSection onChecklistClick={openChecklist} />

        {/* 2. Stakes */}
        <section
          className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/5 entrance-animation"
          aria-labelledby="stakes-heading"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="stakes-heading" className="font-telegraf font-bold text-2xl md:text-4xl text-primary text-center mb-6">
              {t("home.stakes.title")}
            </h2>
            <p className="font-telegraf text-lg text-gray-700 text-center mb-8">{t("home.stakes.intro")}</p>
            <ul className="space-y-4 mb-10">
              {STAKE_KEYS.map((key) => (
                <li key={key} className="flex gap-3 font-telegraf text-gray-700">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="font-telegraf text-lg md:text-xl text-primary font-semibold text-center italic">
              {t("home.stakes.closing")}
            </p>
          </div>
        </section>

        {/* 3. Value proposition */}
        <section className="py-16 md:py-20 bg-white entrance-animation" aria-labelledby="value-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="value-heading" className="font-telegraf font-bold text-2xl md:text-4xl text-primary text-center mb-12">
              {t("home.value.title")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUE_BENEFITS.map(({ icon: Icon, titleKey, bodyKey }) => (
                <Card key={titleKey} className="border-primary/15 shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <h3 className="font-telegraf font-bold text-lg text-primary mb-2">{t(titleKey)}</h3>
                    <p className="font-telegraf text-gray-600 text-sm leading-relaxed">{t(bodyKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                t("home.guide.stat.experience"),
                t("home.guide.stat.roi"),
                t("home.guide.stat.interviews"),
                t("home.guide.stat.programs"),
              ].map((label) => (
                <div
                  key={label}
                  className="bg-primary text-white rounded-lg p-4 text-center font-telegraf font-semibold text-sm"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-10 rounded-xl bg-primary px-6 py-5">
              <img src="/NSF I-Corps new logo_white.avif" alt="NSF I-Corps" className="h-10 object-contain" />
              <img src="/logo-guayacan-white-footer.webp" alt="Grupo Guayacán" className="h-9 object-contain" />
            </div>

            <blockquote className="max-w-2xl mx-auto text-center mb-8">
              <Quote className="h-8 w-8 text-accent mx-auto mb-3" aria-hidden />
              <p className="font-telegraf text-xl italic text-gray-800">{t("home.guide.testimonial")}</p>
              <footer className="font-telegraf text-gray-500 mt-2">{t("home.guide.testimonialAttribution")}</footer>
            </blockquote>

            <div className="flex items-start gap-3 max-w-2xl mx-auto bg-accent/15 border border-accent/40 rounded-xl p-5 mb-6">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden />
              <p className="font-telegraf font-semibold text-primary">{t("home.guide.noLockIn")}</p>
            </div>

            <p className="text-center">
              <Link to="/about" className="font-telegraf text-primary font-semibold hover:underline">
                {t("home.guide.moreAboutUs")} →
              </Link>
            </p>
          </div>
        </section>

        {/* 5. Plan */}
        <section className="py-16 md:py-20 bg-white entrance-animation" aria-labelledby="plan-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="plan-heading" className="font-telegraf font-bold text-2xl md:text-4xl text-primary text-center mb-12">
              {t("home.plan.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {PLAN_STEPS.map(({ icon: Icon, titleKey, bodyKey }, index) => (
                <div key={titleKey} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold font-telegraf">
                    {index + 1}
                  </div>
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden />
                  <h3 className="font-telegraf font-bold text-lg text-primary mb-2">{t(titleKey)}</h3>
                  <p className="font-telegraf text-gray-600 text-sm leading-relaxed">{t(bodyKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Explanatory paragraph (SEO) */}
        <section className="py-16 md:py-20 bg-gray-50 entrance-animation" aria-labelledby="story-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              id="story-heading"
              className="font-telegraf text-gray-700 space-y-4 text-base md:text-lg leading-relaxed prose prose-p:mb-4"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(t("home.story.content")) }}
            />
            <div className="mt-10 text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-800 font-telegraf">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  {t("home.hero.cta.primary")}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. Video placeholder */}
        <section className="py-16 md:py-20 bg-white entrance-animation" aria-labelledby="video-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="video-heading" className="font-telegraf font-bold text-2xl md:text-3xl text-primary mb-8">
              {t("home.video.title")}
            </h2>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-4 p-8">
              <Play className="h-16 w-16 text-primary/40" aria-hidden />
              <p className="font-telegraf text-gray-600">{t("home.video.placeholder")}</p>
            </div>
          </div>
        </section>

        {/* 8. Case study */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-white entrance-animation" aria-labelledby="case-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="case-heading" className="font-telegraf font-bold text-2xl md:text-4xl text-primary text-center mb-8">
              {t("home.case.title")}
            </h2>
            <Card className="shadow-lg border-primary/20">
              <CardContent className="p-8 space-y-4 font-telegraf text-gray-700">
                <p>{t("home.case.challenge")}</p>
                <p>{t("home.case.solution")}</p>
                <p className="font-semibold text-primary">{t("home.case.result")}</p>
                <Link
                  to="/projects"
                  className="inline-flex items-center text-primary font-semibold hover:underline pt-2"
                >
                  {t("home.case.readMore")}
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
                <p className="text-sm text-gray-500 pt-2">{t("home.case.comingSoon")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className="relative py-16 bg-gradient-to-br from-primary via-primary-800 to-secondary text-white entrance-animation">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-telegraf font-bold text-2xl md:text-3xl mb-4">{t("home.finalCta.title")}</h2>
            <p className="font-telegraf text-white/85 mb-8">{t("home.finalCta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  {t("home.finalCta.consultation")}
                </a>
              </Button>
              <Button
                onClick={openChecklist}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary font-telegraf"
              >
                {t("home.finalCta.checklist")}
              </Button>
            </div>
          </div>
        </section>
      </div>

      <ComingSoonModal open={showComingSoon} onOpenChange={setShowComingSoon} />
    </>
  );
};

export default Home;
