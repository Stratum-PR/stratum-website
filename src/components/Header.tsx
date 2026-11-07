import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageButtons, LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEADER_ACTION_BUTTON_CLASS } from "@/constants/headerActions";

import { ALERTAS_URL, CALENDLY_URL } from "@/constants/links";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const touchHandledRef = useRef(false);
  const location = useLocation();
  const { t } = useLanguage();

  // external: opens in a new tab; plain: an <a> (in-page anchor) rather than a router Link
  const navigation: { name: string; href: string; external?: boolean; plain?: boolean }[] = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.questions"), href: "/preguntas" },
    { name: t("nav.alerts"), href: ALERTAS_URL, external: true },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const renderNavLink = (item: (typeof navigation)[number], className: string, onClick?: () => void) =>
    item.external || item.plain ? (
      <a
        key={item.href}
        href={item.href}
        className={className}
        onClick={onClick}
        {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {item.name}
      </a>
    ) : (
      <Link key={item.href} to={item.href} className={className} onClick={onClick}>
        {item.name}
      </Link>
    );

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const closeMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 400);
  };

  const openMenu = () => {
    setIsMenuClosing(false);
    setIsMenuOpen(true);
  };

  const linkClass = (active: boolean) =>
    `font-telegraf text-[15px] transition-colors whitespace-nowrap ${
      active ? "text-primary font-semibold" : "text-neutral-700 hover:text-primary"
    }`;

  return (
    <header className="fixed top-[var(--launch-bar-h,0px)] transition-[top] duration-300 ease-out motion-reduce:transition-none left-0 right-0 z-[9998] h-14 md:h-16 bg-white/95 backdrop-blur border-b border-primary/10">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Stratum PR">
            <img src="/img/stratum-logo-color.png" alt="Stratum" width={640} height={120} className="h-7 w-auto md:h-8" />
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-5 px-4 xl:gap-8 xl:px-6">
            {navigation.map((item) => renderNavLink(item, linkClass(isActive(item.href))))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-0">
            <div className="hidden md:block">
              <LanguageToggle variant="light" matchHeaderCtaSize />
            </div>
            <div className="hidden lg:block">
              <Button
                asChild
                className={`font-telegraf font-semibold rounded-xl bg-primary hover:bg-secondary text-white ${HEADER_ACTION_BUTTON_CLASS}`}
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  {t("nav.bookDemo")}
                </a>
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden p-2.5 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-primary/5 text-primary"
              onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {(isMenuOpen || isMenuClosing) &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className={`lg:hidden fixed inset-0 top-[calc(3.5rem+var(--launch-bar-h,0px))] md:top-[calc(4rem+var(--launch-bar-h,0px))] bg-black/20 z-[9998] transition-opacity ${
                isMenuClosing ? "opacity-0" : "opacity-100"
              }`}
              onClick={closeMenu}
              aria-hidden
            />
            <div
              className={`lg:hidden fixed top-[calc(3.5rem+var(--launch-bar-h,0px))] md:top-[calc(4rem+var(--launch-bar-h,0px))] left-0 right-0 bg-white border-b border-primary/10 shadow-lg z-[9999] transition-all ${
                isMenuClosing ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navigation.map((item) =>
                  renderNavLink(
                    item,
                    `font-telegraf py-3 px-4 rounded-lg text-base min-h-[44px] flex items-center ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-neutral-800 hover:bg-neutral-50"
                    }`,
                    closeMenu
                  )
                )}
                <div className="pt-2 pb-1 px-4">
                  <LanguageButtons />
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 font-telegraf font-semibold py-3 px-4 rounded-xl text-center bg-primary text-white min-h-[44px] flex items-center justify-center hover:bg-secondary"
                >
                  {t("nav.bookDemo")}
                </a>
              </nav>
            </div>
          </>,
          document.body
        )}
    </header>
  );
};
