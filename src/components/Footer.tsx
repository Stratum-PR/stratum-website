import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";
const CONTACT_EMAIL = "contact@stratumpr.com";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/profile.php?id=61577145020919",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/stratum.pr/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://linkedin.com/company/stratumpr",
    label: "LinkedIn",
    Icon: Linkedin,
  },
] as const;

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: t("footer.about"), href: "/about" },
    { name: t("footer.team"), href: "/about#team" },
    { name: t("footer.mission"), href: "/about#mission" },
  ];

  const resourceLinks = [
    { name: t("footer.caseStudies"), href: "/projects" },
    { name: t("footer.blog"), href: "/resources" },
    { name: t("nav.faq"), href: "/faq" },
  ];

  const connectLinks = [
    { name: t("footer.schedule"), href: CALENDLY_URL, external: true },
    { name: t("footer.email"), href: "/contact" },
  ];

  const linkClass =
    "font-telegraf text-sm text-[#9ca3af] transition-colors hover:text-white";

  const renderLink = (
    item: { name: string; href?: string; external?: boolean; onClick?: () => void },
    className: string
  ) => {
    if (item.onClick) {
      return (
        <button type="button" onClick={item.onClick} className={`text-left ${className}`}>
          {item.name}
        </button>
      );
    }
    if (item.external && item.href) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
          {item.name}
        </a>
      );
    }
    return (
      <Link to={item.href ?? "/"} className={className}>
        {item.name}
      </Link>
    );
  };

  return (
    <footer className="bg-[#0b1215] text-[#9ca3af]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/Stratum_Icon_whiteline ver 2.svg"
                alt=""
                className="h-9 w-9"
              />
              <span className="font-telegraf text-xl font-bold text-white">Stratum PR</span>
            </div>
            <p className="max-w-sm font-telegraf text-sm leading-relaxed text-[#9ca3af]">
              {t("footer.description")}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2328] text-white transition-colors hover:bg-[#243038]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 font-telegraf text-base font-semibold text-white">
              {t("footer.column.company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>{renderLink(item, linkClass)}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 font-telegraf text-base font-semibold text-white">
              {t("footer.column.resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item.name}>{renderLink(item, linkClass)}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 font-telegraf text-base font-semibold text-white">
              {t("footer.column.connect")}
            </h3>
            <ul className="space-y-3">
              {connectLinks.map((item) => (
                <li key={item.name}>{renderLink(item, linkClass)}</li>
              ))}
            </ul>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 block font-telegraf text-sm text-[#9ca3af] transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-telegraf text-sm text-[#9ca3af]">
            © {currentYear} Stratum PR. {t("footer.copyright")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <LanguageToggle variant="dark" />
            <Link to="/terms" className={`${linkClass} text-xs`}>
              {t("footer.terms")}
            </Link>
            <Link to="/privacy" className={`${linkClass} text-xs`}>
              {t("footer.privacy")}
            </Link>
            <Link to="/cookies" className={`${linkClass} text-xs`}>
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};
