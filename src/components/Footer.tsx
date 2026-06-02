import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import TechAnimatedBackground from "@/components/TechAnimatedBackground";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";

export const Footer = () => {
  const { t } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: t("footer.about"), href: "/about" },
    { name: t("footer.team"), href: "/about#team" },
    { name: t("footer.mission"), href: "/about#mission" },
  ];

  const resourceLinks = [
    { name: t("footer.caseStudies"), href: "/projects" },
    { name: t("footer.blog"), href: "/resources" },
    {
      name: t("footer.checklist"),
      onClick: () => setShowComingSoon(true),
    },
    { name: t("nav.faq"), href: "/faq" },
  ];

  const connectLinks = [
    { name: t("footer.schedule"), href: CALENDLY_URL, external: true },
    { name: t("footer.email"), href: "/contact" },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/stratumpr",
      external: true,
    },
  ];

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
    <footer className="relative text-white overflow-hidden bg-gradient-to-br from-primary via-primary-800 to-secondary">
      <div className="absolute inset-0 bg-black/60 z-0" />
      <TechAnimatedBackground className="z-0" opacity={0.5} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Stratum_Icon_whiteline ver 2.svg"
                alt="Stratum"
                className="h-8 w-8"
              />
              <span className="font-telegraf font-bold text-xl">Stratum PR</span>
            </div>
            <p className="text-white/80 font-telegraf text-sm mb-4">{t("footer.description")}</p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/stratumpr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577145020919"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/stratum.pr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-telegraf font-semibold mb-4">{t("footer.column.company")}</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  {renderLink(
                    item,
                    "font-telegraf text-sm text-white/70 hover:text-white transition-colors"
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-telegraf font-semibold mb-4">{t("footer.column.resources")}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  {renderLink(
                    item,
                    "font-telegraf text-sm text-white/70 hover:text-white transition-colors"
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-telegraf font-semibold mb-4">{t("footer.column.connect")}</h3>
            <ul className="space-y-2">
              {connectLinks.map((item) => (
                <li key={item.name}>
                  {renderLink(
                    item,
                    "font-telegraf text-sm text-white/70 hover:text-white transition-colors"
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 font-telegraf text-sm text-center sm:text-left">
            © {currentYear} Stratum PR. {t("footer.copyright")}
          </p>
          <LanguageToggle />
          <div className="flex flex-wrap justify-center gap-4 text-xs font-telegraf text-white/60">
            <Link to="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-white">
              {t("footer.terms")}
            </Link>
            <Link to="/cookies" className="hover:text-white">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>

      <ComingSoonModal open={showComingSoon} onOpenChange={setShowComingSoon} />
    </footer>
  );
};
