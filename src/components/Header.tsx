import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEADER_ACTION_BUTTON_CLASS } from "@/constants/headerActions";

const CALENDLY_URL = "https://calendly.com/admin-stratumpr/30min";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const touchHandledRef = useRef(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.contact"), href: "/contact" },
  ];

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
    `font-telegraf text-sm lg:text-base transition-colors whitespace-nowrap ${
      active ? "text-primary font-bold" : "text-neutral-800/80 hover:text-primary font-medium"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[9998] h-14 md:h-16 bg-white border-b border-primary/10 shadow-sm">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center flex-shrink-0 gap-2.5">
            <img
              src="/Stratum_Icon_whiteline ver 2.svg"
              alt=""
              className="h-8 w-8 object-contain [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(42%)_saturate(2472%)_hue-rotate(212deg)_brightness(92%)_contrast(95%)]"
              aria-hidden
            />
            <span className="font-telegraf font-bold text-lg text-primary tracking-tight">Stratum</span>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-8 flex-1 absolute left-1/2 -translate-x-1/2">
            {navigation.map((item) => (
              <Link key={item.href} to={item.href} className={linkClass(isActive(item.href))}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            <div className="hidden md:block">
              <LanguageToggle variant="light" matchHeaderCtaSize />
            </div>
            <Button
              asChild
              className={`hidden lg:inline-flex font-telegraf font-semibold rounded-lg bg-secondary hover:bg-primary text-white shadow-sm ${HEADER_ACTION_BUTTON_CLASS}`}
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {t("nav.bookDemo")}
              </a>
            </Button>

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
              className={`lg:hidden fixed inset-0 top-14 md:top-16 bg-black/20 z-[9998] transition-opacity ${
                isMenuClosing ? "opacity-0" : "opacity-100"
              }`}
              onClick={closeMenu}
              aria-hidden
            />
            <div
              className={`lg:hidden fixed top-14 md:top-16 left-0 right-0 bg-white border-b border-primary/10 shadow-lg z-[9999] transition-all ${
                isMenuClosing ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={`font-telegraf py-3 px-4 rounded-lg text-base min-h-[44px] flex items-center ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 pb-1 px-4">
                  <LanguageToggle variant="light" matchHeaderCtaSize />
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 font-telegraf font-semibold py-3 px-4 rounded-lg text-center bg-secondary text-white min-h-[44px] flex items-center justify-center hover:bg-primary"
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
