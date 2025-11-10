
import React from 'react';
import TeamMemberCard from "./TeamMemberCard";
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
  image?: string;
}

interface TeamSectionProps {
  founders: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ founders }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-telegraf font-light text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
            {t('about.team.title')}
          </h2>
          <p className="font-telegraf text-lg text-gray-400 max-w-3xl mx-auto font-light">
            {t('about.team.description')}
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-10 max-w-4xl mx-auto`}>
          {founders.map((founder, index) => (
            <TeamMemberCard
              key={index}
              founder={founder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
