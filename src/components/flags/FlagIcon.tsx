import { cn } from "@/lib/utils";

export type FlagCode = "us" | "pr";

const FLAG_SRC: Record<FlagCode, string> = {
  us: "/img/flags/flag-us.png",
  pr: "/img/flags/flag-pr.png",
};

type FlagIconProps = {
  code: FlagCode;
  className?: string;
};

/** Flag image assets in public/img/flags/ (PNG, rounded emoji-style). */
export const FlagIcon = ({ code, className }: FlagIconProps) => (
  <img
    src={FLAG_SRC[code]}
    alt=""
    width={28}
    height={20}
    className={cn("h-5 w-7 rounded-md object-cover shrink-0", className)}
    aria-hidden
  />
);

export const languageToFlagCode = (language: "en" | "es"): FlagCode =>
  language === "en" ? "us" : "pr";
