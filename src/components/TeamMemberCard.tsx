
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
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-primary to-secondary">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${founder.name} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl font-telegraf font-bold text-white">
              {founder.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-8">
        <h3 className="font-telegraf font-bold text-2xl text-primary mb-2">
          {founder.name}
        </h3>
        <p className="font-telegraf font-semibold text-secondary mb-4">
          {founder.role}
        </p>
        <p className="font-telegraf text-gray-600 mb-6 leading-relaxed">
          {founder.bio}
        </p>
        
        <div className="mb-6">
          <h4 className="font-telegraf font-semibold text-sm text-gray-800 mb-3">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {founder.expertise.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white">
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
