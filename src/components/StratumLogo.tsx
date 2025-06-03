
import { cn } from "@/lib/utils";

interface StratumLogoProps {
  className?: string;
}

export const StratumLogo = ({
  className
}: StratumLogoProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="40" height="40" rx="8" fill="currentColor" />
        <path
          d="M12 28V16h4v8h8v-8h4v12h-4v-4h-8v4h-4z"
          fill="white"
        />
      </svg>
    </div>
  );
};
