
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
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden w-full">
      <div className="flex items-center justify-center p-8 bg-white">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${founder.name} profile`}
            className="w-3/4 h-3/4 object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-full">
            <span className="text-4xl font-telegraf font-bold text-gray-600">
              {founder.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-telegraf font-bold text-lg text-primary mb-2">
          {founder.name}
        </h3>
        <p className="font-telegraf font-semibold text-sm text-secondary mb-3">
          {founder.role}
        </p>
        <p className="font-telegraf text-sm text-gray-600 mb-4 leading-relaxed">
          {founder.bio}
        </p>
        
        <div className="mb-4">
          <h4 className="font-telegraf font-semibold text-xs text-gray-800 mb-2">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {founder.expertise.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs">
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
