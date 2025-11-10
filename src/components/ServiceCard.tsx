
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle, LucideIcon, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  deliverables: string;
  tooltip: string;
  simpleExplanation: string;
}

export const ServiceCard = ({ icon: Icon, title, description, features, deliverables, tooltip, simpleExplanation }: ServiceCardProps) => {
  const { t } = useLanguage();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Card className="group flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 bg-gray-800/50 hover:border-white/20 hover:bg-gray-800 hover-lift backdrop-blur-sm">
      <CardHeader className="bg-transparent pb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors duration-300">
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <CardTitle className="font-telegraf text-xl text-white font-light tracking-tight">
                {title}
              </CardTitle>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
                    aria-label={`Learn more about ${title}`}
                    onClick={handlePopoverToggle}
                    type="button"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-4 bg-gray-800 border border-white/10 shadow-lg rounded-lg z-50 backdrop-blur-sm"
                  side="top"
                  sideOffset={8}
                  align="center"
                  avoidCollisions={true}
                  collisionPadding={20}
                >
                  <p className="font-telegraf text-sm text-gray-300 leading-relaxed">
                    {simpleExplanation}
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <p className="font-telegraf text-sm text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div className="mb-6">
          <h4 className="font-telegraf font-light text-xs text-white/70 mb-3 uppercase tracking-wide">
            {t('services.features')}
          </h4>
          <ul className="space-y-2" role="list">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-white flex-shrink-0" aria-hidden="true" />
                <span className="font-telegraf text-sm text-gray-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-white/10 mt-auto">
          <Badge variant="outline" className="text-white border-white/20 text-xs bg-white/5">
            {deliverables}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

