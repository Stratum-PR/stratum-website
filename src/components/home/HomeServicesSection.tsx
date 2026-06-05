import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Clock,
  Moon,
  DollarSign,
  PackageSearch,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICE_CARDS: {
  icon: LucideIcon;
  titleKey: string;
  bodyKey: string;
}[] = [
  { icon: Clock, titleKey: "home.value.benefit1.title", bodyKey: "home.value.benefit1.body" },
  { icon: Moon, titleKey: "home.value.benefit2.title", bodyKey: "home.value.benefit2.body" },
  { icon: DollarSign, titleKey: "home.value.benefit3.title", bodyKey: "home.value.benefit3.body" },
  { icon: PackageSearch, titleKey: "home.value.benefit4.title", bodyKey: "home.value.benefit4.body" },
  { icon: Users, titleKey: "home.value.benefit5.title", bodyKey: "home.value.benefit5.body" },
  { icon: Workflow, titleKey: "home.value.benefit6.title", bodyKey: "home.value.benefit6.body" },
];

export function HomeServicesSection() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-primary py-20 md:py-28 entrance-animation"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="services-heading"
            className="font-telegraf text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white"
          >
            {t("home.services.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-telegraf text-base leading-relaxed text-white/60 md:text-lg">
            {t("home.services.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ icon: Icon, titleKey, bodyKey }) => (
            <Link
              key={titleKey}
              to="/services"
              className="group flex min-h-[15rem] flex-col rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:min-h-[16rem] md:p-7"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                <ArrowUpRight
                  className="h-4 w-4 text-primary/40 transition-colors group-hover:text-secondary"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="mt-auto pt-8 font-telegraf text-lg font-bold leading-snug text-primary">
                {t(titleKey)}
              </h3>
              <p className="mt-3 font-telegraf text-sm leading-relaxed text-neutral-600">
                {t(bodyKey)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
