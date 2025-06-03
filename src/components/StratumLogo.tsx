
import { cn } from "@/lib/utils";

interface StratumLogoProps {
  className?: string;
}

export const StratumLogo = ({
  className
}: StratumLogoProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src="/lovable-uploads/41444f6f-d6aa-4abd-9e70-e0ada2e44387.png" 
        alt="Stratum Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};
