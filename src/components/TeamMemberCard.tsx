
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
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden w-full max-w-[280px]">
      <div className="h-64 bg-white overflow-hidden">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${displayName} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-telegraf font-bold text-gray-600">
              {displayName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-telegraf font-bold text-base text-primary mb-1">
          {displayName}
        </h3>
        <p className="font-telegraf font-semibold text-xs text-secondary mb-2">
          {translatedRole}
        </p>
        <div className="mb-3">
          <p className={`font-telegraf text-xs text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {translatedBio}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80 text-xs font-telegraf font-semibold transition-colors"
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
          <h4 className="font-telegraf font-semibold text-xs text-gray-800 mb-1.5">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-1">
            {expertiseArray.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs px-2 py-0.5">
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
