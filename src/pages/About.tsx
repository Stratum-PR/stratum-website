
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ValuesSection from "@/components/ValuesSection";
import TeamSection from "@/components/TeamSection";
import { useTeamImages } from "@/hooks/useTeamImages";

const About = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { teamImages, handleImageUpload, handleImageRemove } = useTeamImages();

  const founders = [
    {
      key: "jovaniel",
      name: "Jovaniel Rodriguez",
      role: "Co-Founder, Operations & Growth",
      bio: "Former consultant with 8+ years in enterprise analytics. Jovaniel leads strategic initiatives and client relationships, specializing in digital transformation and data architecture.",
      expertise: ["Strategic Consulting", "Digital Transformation", "Enterprise Architecture"],
      linkedin: "https://www.linkedin.com/in/jovanielrodriguez-maldonado/",
      email: "j.rodriguez@stratumpr.com"
    },
    {
      key: "roberto",
      name: "Roberto Otero",
      role: "Co-Founder, Tech & Build",
      bio: "Data scientist and ML engineer. Roberto oversees technical delivery and innovation, with deep expertise in AI/ML implementations and big data infrastructure.",
      expertise: ["Machine Learning", "Big Data", "AI Implementation"],
      linkedin: "https://www.linkedin.com/in/roberto-otero/",
      email: "r.otero@stratumpr.com"
    },
    {
      key: "genesis",
      name: "Genesis Rodriguez",
      role: "Co-Founder, Data & Insights",
      bio: "Biostatistician, lead research scientist at the Puerto Rico Comprehensive Cancer Center (CCC). Genesis drives our analytical methodologies and ensures scientific rigor in all modeling approaches.",
      expertise: ["Statistical Modeling", "Predictive Analytics", "Research Methods"],
      linkedin: "https://www.linkedin.com/in/genesismrodriguez/",
      email: "g.rodriguez@stratumpr.com"
    }
  ];

  const values = [
    {
      title: "Technical Excellence",
      description: "We maintain the highest standards in analytical rigor and technical implementation."
    },
    {
      title: "Strategic Clarity",
      description: "Every solution is designed with clear business outcomes and measurable impact."
    },
    {
      title: "Client Partnership",
      description: "We work as an extension of your team, not just another vendor."
    },
    {
      title: "Innovation Focus",
      description: "Continuously exploring emerging technologies to deliver competitive advantages."
    }
  ];

  return (
    <div className="pt-20">
      <HeroSection />
      <MissionSection />
      <ValuesSection values={values} />
      <TeamSection
        founders={founders}
        isEditMode={isEditMode}
        teamImages={teamImages}
        onEditModeToggle={() => setIsEditMode(!isEditMode)}
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
      />
    </div>
  );
};

export default About;
