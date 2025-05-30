
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import TeamMemberCard from "./TeamMemberCard";

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
}

interface TeamSectionProps {
  founders: TeamMember[];
  isEditMode: boolean;
  teamImages: { [key: string]: string };
  onEditModeToggle: () => void;
  onImageUpload: (memberKey: string, imageData: string) => void;
  onImageRemove: (memberKey: string) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  founders,
  isEditMode,
  teamImages,
  onEditModeToggle,
  onImageUpload,
  onImageRemove
}) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h2 className="font-telegraf font-bold text-4xl text-primary">
              Meet the Team
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditModeToggle}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditMode ? 'Done' : 'Edit Photos'}
            </Button>
          </div>
          <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
            Our founding team brings together more than a decade of experience from leading 
           Fortune 500 companies, consulting firms, technology companies, and academic institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <TeamMemberCard
              key={index}
              founder={founder}
              isEditMode={isEditMode}
              currentImage={teamImages[founder.key]}
              onImageUpload={(imageData) => onImageUpload(founder.key, imageData)}
              onImageRemove={() => onImageRemove(founder.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
