
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, ChevronDown, ChevronUp } from "lucide-react";
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

interface TeamMemberCardProps {
  founder: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ founder }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get translations for this team member
  const translatedName = t(`team.${founder.key}.name`) || founder.name;
  const translatedRole = t(`team.${founder.key}.role`) || founder.role;
  const translatedBio = t(`team.${founder.key}.bio`) || founder.bio;
  const translatedExpertise = t(`team.${founder.key}.expertise`) || founder.expertise.join(', ');
  
  // Convert expertise string to array (split by comma and trim)
  const expertiseArray = translatedExpertise.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  
  // Use translated name for alt text and initials
  const displayName = translatedName;
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 shadow-lg overflow-hidden w-full max-w-[280px] bg-gray-800/50 backdrop-blur-sm hover:border-white/20 hover:bg-gray-800">
      <div className="h-64 bg-gray-700/50 overflow-hidden">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${displayName} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600/50 flex items-center justify-center">
            <span className="text-4xl font-telegraf font-light text-gray-300">
              {displayName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6 bg-transparent">
        <h3 className="font-telegraf font-light text-lg text-white mb-2 tracking-tight">
          {displayName}
        </h3>
        <p className="font-telegraf font-light text-sm text-white/70 mb-4">
          {translatedRole}
        </p>
        <div className="mb-4">
          <p className={`font-telegraf text-sm text-gray-400 leading-relaxed font-light ${isExpanded ? '' : 'line-clamp-3'}`}>
            {translatedBio}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-white hover:text-white/80 text-xs font-telegraf font-light transition-colors"
          >
            {isExpanded ? (
              <>
                <span>{t('about.team.readLess')}</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>{t('about.team.readMore')}</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
        
        <div>
          <h4 className="font-telegraf font-light text-xs text-white/70 mb-2 uppercase tracking-wide">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-1">
            {expertiseArray.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 text-xs px-3 py-1 font-light">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
