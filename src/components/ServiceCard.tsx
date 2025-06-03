
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  deliverables: string;
  tooltip: string;
}

export const ServiceCard = ({ icon: Icon, title, description, features, deliverables, tooltip }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="group flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-help">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl group-hover:bg-secondary transition-colors duration-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <CardTitle className="font-telegraf text-2xl text-primary mb-6">
                  {title}
                </CardTitle>
                <p className="font-telegraf text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 flex-grow flex flex-col justify-between">
            <div className="mb-6">
              <h4 className="font-telegraf font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wide">
                {t('services.features')}
              </h4>
              <ul className="space-y-2" role="list">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                    <span className="font-telegraf text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-auto">
              <Badge variant="outline" className="text-primary border-accent/20">
                {deliverables}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-3 text-sm leading-relaxed">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
