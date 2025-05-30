
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Camera, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
}

interface TeamMemberCardProps {
  founder: TeamMember;
  isEditMode: boolean;
  currentImage?: string;
  onImageUpload: (imageData: string) => void;
  onImageRemove: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  founder,
  isEditMode,
  currentImage,
  onImageUpload,
  onImageRemove
}) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-primary to-secondary p-8">
        {isEditMode ? (
          <ImageUpload
            currentImage={currentImage}
            onImageUpload={onImageUpload}
            onImageRemove={onImageRemove}
            memberName={founder.name}
          />
        ) : currentImage ? (
          <img
            src={currentImage}
            alt={`${founder.name} profile`}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center">
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
            EXPERTISE
          </h4>
          <div className="flex flex-wrap gap-2">
            {founder.expertise.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${founder.email}`}
            className="text-primary hover:text-secondary transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
