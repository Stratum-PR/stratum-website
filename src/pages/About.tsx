import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ValuesSection from "@/components/ValuesSection";
import TeamSection from "@/components/TeamSection";
import WhyWorkWithUsSection from "@/components/WhyWorkWithUsSection";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  // SEO optimization for about page
  useSEO({
    title: "About Stratum PR - Expert Data Analytics Team Puerto Rico | AI Consulting Founders",
    description: "Meet the expert team behind Stratum PR. Founded in 2025 by experienced data scientists and consultants specializing in AI business automation, CRM implementation, and predictive modeling in Puerto Rico.",
    keywords: "Stratum PR team, data analytics experts Puerto Rico, AI consulting founders, business intelligence consultants, CRM implementation specialists, machine learning experts Caribbean",
    canonical: "https://www.stratumpr.com/about",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.stratumpr.com/about#webpage",
      "url": "https://www.stratumpr.com/about",
      "name": "About Stratum PR - Data Analytics Consulting Team",
      "description": "Meet the expert team behind Stratum PR, specializing in data analytics, AI solutions, and business automation consulting in Puerto Rico.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Stratum PR",
        "foundingDate": "2025",
        "description": "Analytics and consulting firm specializing in data-driven business solutions."
      }
    }
  }, "about");

  const founders = [
    {
      key: "jovaniel",
      name: "Jovaniel Rodriguez",
      role: "Co-Founder, Operations & Growth",
      bio: "Former consultant with 8+ years in enterprise analytics. Jovaniel leads strategic initiatives and client relationships, specializing in digital transformation and data architecture.",
      expertise: ["Strategic Consulting",  "AI/ML", "Digital Modernization", "Data Governance", "Systems Architechture"],
      linkedin: "https://www.linkedin.com/in/jovanielrodriguez-maldonado/",
      email: "j.rodriguez@stratumpr.com",
      image: "/img/Jovaniel.jpg"
    },
    {
      key: "roberto", 
      name: "Roberto Otero",
      role: "Co-Founder, Tech & Build",
      bio: "Data scientist and ML engineer. Roberto oversees technical delivery and innovation, with deep expertise in AI/ML implementations and big data infrastructure.",
      expertise: ["Data Vizualization", "Big Data", "Database Management"],
      linkedin: "https://www.linkedin.com/in/roberto-otero/",
      email: "r.otero@stratumpr.com",
      image: "/img/Roberto.jpg"
    },
    {
      key: "genesis",
      name: "Genesis Rodriguez",
      role: "Co-Founder, Data & Insights",
      bio: "Biostatistician and Applied Researcher, Genesis has a strong background in predictive modeling and health analytics, driving our analytical methodologies to ensures scientific rigor in all modeling approaches.",
      expertise: ["Statistical Modeling", "Predictive Analytics", "Research Methods"],
      linkedin: "https://www.linkedin.com/in/genesismrodriguez/",
      email: "g.rodriguez@stratumpr.com",
      image: "/img/Genesis.jpg"
    }
  ];

  const values = [
    {
      title: t('about.values.technical'),
      description: t('about.values.technical.desc')
    },
    {
      title: t('about.values.strategic'),
      description: t('about.values.strategic.desc')
    },
    {
      title: t('about.values.partnership'), 
      description: t('about.values.partnership.desc')
    },
    {
      title: t('about.values.innovation'),
      description: t('about.values.innovation.desc')
    }
  ];

  return (
    <div className="pt-20">
      <HeroSection />
      <MissionSection />
      <ValuesSection values={values} />
      <TeamSection founders={founders} />
      <WhyWorkWithUsSection />
    </div>
  );
};

export default About;
