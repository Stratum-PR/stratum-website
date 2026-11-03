import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

const CONTACT_EMAIL = "contact@stratumpr.com";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=61577145020919", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/stratum.pr/", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com/company/stratumpr", label: "LinkedIn", Icon: Linkedin },
] as const;

type FooterLink = { name: string; href: string; external?: boolean };

export const Footer = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  // Home shows a fixed mobile CTA bar; leave room so it never covers the last footer links
  const hasStickyCta = pathname === "/";
  const currentYear = new Date().getFullYear();

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("footer.column.company"),
      links: [
        { name: t("nav.home"), href: "/" },
        { name: t("footer.about"), href: "/about" },
        { name: t("nav.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.column.resources"),
      links: [
        { name: t("nav.questions"), href: "/preguntas" },
        { name: t("nav.selfcheck"), href: "/autoevaluacion" },
        { name: t("nav.alerts"), href: ALERTAS_URL, external: true },
      ],
    },
  ];

  const linkClass = "font-telegraf text-[15px] text-white/70 transition-colors hover:text-white";
  const navLinkClass = `inline-flex min-h-[44px] items-center ${linkClass}`;

  const renderLink = (item: FooterLink) =>
    item.external ? (
      <a href={item.href} target="_blank" rel="noopener" className={`gap-1 ${navLinkClass}`}>
        {item.name}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    ) : (
      <Link to={item.href} className={navLinkClass}>
        {item.name}
      </Link>
    );

  return (
    <footer className="bg-[#0d1338] text-white">
      <div
        className={`mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20 ${hasStickyCta ? "pb-28 md:pb-10" : "pb-10"}`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-5">
            <Link to="/" aria-label="Stratum PR">
              <img src="/img/stratum-logo-white.png" alt="Stratum" width={640} height={120} className="h-8 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm font-telegraf text-base leading-relaxed text-white/70">{t("footer.description")}</p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h3 className="mb-2 font-telegraf text-xs font-bold uppercase tracking-[0.14em] text-[#E6E09E] lg:mb-3">{col.title}</h3>
              <ul>
                {col.links.map((item) => (
                  <li key={item.href}>{renderLink(item)}</li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-3">
            <h3 className="mb-5 font-telegraf text-xs font-bold uppercase tracking-[0.14em] text-[#E6E09E]">
              {t("footer.column.connect")}
            </h3>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-2xl bg-white px-5 font-telegraf text-[15px] font-semibold text-primary transition-colors hover:bg-[#E6E09E]"
            >
              {t("home.hero.cta.primary")}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`mt-2 flex min-h-[44px] items-center break-all ${linkClass}`}>
              {CONTACT_EMAIL}
            </a>
            <p className="font-telegraf text-[15px] text-white/50">{t("footer.location")}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 lg:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="font-telegraf text-sm text-white/50">
            © {currentYear} Stratum PR LLC. {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link to="/terms" className="inline-flex min-h-[44px] items-center font-telegraf text-sm text-white/50 transition-colors hover:text-white md:min-h-0">
              {t("footer.terms")}
            </Link>
            <Link to="/privacy" className="inline-flex min-h-[44px] items-center font-telegraf text-sm text-white/50 transition-colors hover:text-white md:min-h-0">
              {t("footer.privacy")}
            </Link>
            <Link to="/cookies" className="inline-flex min-h-[44px] items-center font-telegraf text-sm text-white/50 transition-colors hover:text-white md:min-h-0">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
