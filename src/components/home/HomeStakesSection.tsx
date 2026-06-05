import {
  ShieldAlert,
  PackageX,
  FileSpreadsheet,
  UserX,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STAKE_CARDS: { icon: LucideIcon; titleKey: string; bodyKey: string }[] = [
  { icon: ShieldAlert, titleKey: "home.stakes.card1.title", bodyKey: "home.stakes.card1.body" },
  { icon: PackageX, titleKey: "home.stakes.card2.title", bodyKey: "home.stakes.card2.body" },
  { icon: FileSpreadsheet, titleKey: "home.stakes.card3.title", bodyKey: "home.stakes.card3.body" },
  { icon: UserX, titleKey: "home.stakes.card4.title", bodyKey: "home.stakes.card4.body" },
  { icon: Clock3, titleKey: "home.stakes.card5.title", bodyKey: "home.stakes.card5.body" },
];

export function HomeStakesSection() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-[#FAFAF8] py-16 md:py-24 entrance-animation"
      aria-labelledby="stakes-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="stakes-heading"
            className="font-telegraf text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-primary"
          >
            {t("home.stakes.title")}
          </h2>
          <p className="mt-4 font-telegraf text-base text-neutral-600 md:text-lg">
            {t("home.stakes.intro")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STAKE_CARDS.map(({ icon: Icon, titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="flex flex-col rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="font-telegraf text-base font-bold leading-snug text-primary">
                {t(titleKey)}
              </h3>
              <p className="mt-2 font-telegraf text-sm leading-relaxed text-neutral-600">
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-primary/15 bg-primary/[0.04] px-6 py-5 text-center font-telegraf text-base font-semibold leading-relaxed text-primary md:text-lg">
          {t("home.stakes.closing")}
        </p>
      </div>
    </section>
  );
}
