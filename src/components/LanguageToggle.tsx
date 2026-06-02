import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { HEADER_LANG_BUTTON_CLASS } from "@/constants/headerActions";
import { FlagIcon, languageToFlagCode } from "@/components/flags/FlagIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageToggleProps = {
  variant?: "light" | "dark";
  matchHeaderCtaSize?: boolean;
};

const LANGUAGES = [
  { code: "en" as const, flagCode: "us" as const, label: "English" },
  { code: "es" as const, flagCode: "pr" as const, label: "Español" },
];

const HOVER_CLOSE_MS = 120;

const glassWhiteTrigger =
  "bg-transparent backdrop-blur-sm border border-white/60 shadow-sm hover:bg-white/25";
const glassWhiteMenu =
  "bg-white/70 backdrop-blur-md border border-white/50 shadow-lg";
const glassWhiteMenuItem =
  "bg-transparent focus:bg-white/20 data-[highlighted]:bg-white/20 data-[state=checked]:bg-white/20";

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = "dark",
  matchHeaderCtaSize = false,
}) => {
  const { language, setLanguage } = useLanguage();
  const isLight = variant === "light";
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
  };

  const handleOpen = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const pickLanguage = (code: "en" | "es") => {
    setLanguage(code);
    setOpen(false);
  };

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <div
        className="relative"
        onMouseEnter={handleOpen}
        onMouseLeave={scheduleClose}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 gap-2",
              matchHeaderCtaSize
                ? HEADER_LANG_BUTTON_CLASS
                : "h-9 inline-flex items-center justify-center px-2.5",
              isLight ? cn("text-neutral-800", glassWhiteTrigger) : "text-white hover:bg-white/10"
            )}
            aria-label={`Language: ${current.label}. Open menu.`}
          >
            <FlagIcon code={languageToFlagCode(current.code)} className="h-5 w-7" />
            <span className="font-telegraf text-sm font-medium whitespace-nowrap">
              {current.label}
            </span>
            <ChevronDown
              className={cn("h-3.5 w-3.5 shrink-0 opacity-60 transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className={cn(
            "min-w-[11rem] rounded-lg p-1.5",
            isLight ? glassWhiteMenu : "border border-neutral-700 bg-neutral-900 shadow-xl"
          )}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          {LANGUAGES.map(({ code, flagCode, label }) => (
            <DropdownMenuItem
              key={code}
              onSelect={() => pickLanguage(code)}
              className={cn(
                "font-telegraf cursor-pointer gap-3 rounded-md px-3 py-2.5 text-sm",
                isLight
                  ? cn("text-neutral-800 focus:text-neutral-900", glassWhiteMenuItem)
                  : "text-white bg-transparent focus:bg-neutral-800 focus:text-white data-[highlighted]:bg-neutral-800",
                language === code && isLight && "font-semibold",
                language === code && !isLight && "bg-neutral-800/80"
              )}
            >
              <FlagIcon code={flagCode} className="h-5 w-7" />
              <span className="font-medium">{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};
