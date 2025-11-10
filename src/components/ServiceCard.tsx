
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
    <Card className="group flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-600 shadow-lg bg-gray-800 hover:border-accent hover-lift">
      <CardHeader className="bg-gray-700 pb-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-black rounded-xl group-hover:bg-accent/90 transition-colors duration-300">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <CardTitle className="font-telegraf text-lg text-white">
                {title}
              </CardTitle>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="text-gray-400 hover:text-accent transition-colors p-1 rounded-full hover:bg-gray-700"
                    aria-label={`Learn more about ${title}`}
                    onClick={handlePopoverToggle}
                    type="button"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-4 bg-gray-800 border border-gray-600 shadow-lg rounded-lg z-50"
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
            <p className="font-telegraf text-sm text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <h4 className="font-telegraf font-semibold text-xs text-white mb-2 uppercase tracking-wide">
            {t('services.features')}
          </h4>
          <ul className="space-y-1.5" role="list">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" aria-hidden="true" />
                <span className="font-telegraf text-xs text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-3 border-t border-gray-600 mt-auto">
          <Badge variant="outline" className="text-accent border-accent/30 text-xs bg-accent/10">
            {deliverables}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

