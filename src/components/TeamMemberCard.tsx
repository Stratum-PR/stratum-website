
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
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
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden w-full max-w-[280px]">
      <div className="h-48 bg-white overflow-hidden">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${founder.name} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-telegraf font-bold text-gray-600">
              {founder.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-telegraf font-bold text-base text-primary mb-1">
          {founder.name}
        </h3>
        <p className="font-telegraf font-semibold text-xs text-secondary mb-2">
          {founder.role}
        </p>
        <p className="font-telegraf text-xs text-gray-600 mb-3 leading-relaxed line-clamp-3">
          {founder.bio}
        </p>
        
        <div>
          <h4 className="font-telegraf font-semibold text-xs text-gray-800 mb-1.5">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-1">
            {founder.expertise.map((skill, skillIndex) => (
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
