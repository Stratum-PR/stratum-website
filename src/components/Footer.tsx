import { Link, useLocation } from "react-router-dom";
import { Linkedin, Facebook, Instagram, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TechAnimatedBackground from "@/components/TechAnimatedBackground";
export const Footer = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.resources'), href: '/resources' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const legalLinks = [
    { name: t('footer.privacy'), href: '/privacy' },
    { name: t('footer.cookies'), href: '/cookies' },
    { name: t('footer.terms'), href: '/terms' },
  ];
  return <footer className="relative text-white overflow-hidden bg-gradient-to-br from-primary via-primary-800 to-secondary">
      {/* Dark overlay - darker than navbar for visual distinction */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Tech animated background - slightly less opacity than navbar */}
      <TechAnimatedBackground className="z-0" opacity={0.5} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-start space-x-3 mb-4 mt-7">
              <img src="/Stratum_Icon_whiteline ver 2.svg" alt="Stratum PR Icon" className="h-8 w-8 object-scale-down" style={{ marginTop: 'calc(1.25rem - 2rem + 0.5rem)' }} />
              <div className="flex flex-col">
                <span className="font-telegraf font-bold text-xl text-left px-0 leading-tight">
                  Stratum PR
                </span>
                <span className="font-telegraf text-accent text-sm md:text-base mt-0.5">
                  {t('footer.companyName').replace('Stratum PR ', '')}
                </span>
              </div>
            </div>
            <p className="text-white/80 mb-4 font-telegraf">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/stratumpr" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577145020919" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/stratum.pr/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links - Compact with arrows in multicolumn */}
          <div className="hidden md:block">
            <h3 className="font-telegraf font-semibold text-base mb-3 text-white">{t('footer.navigation')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`group flex items-center justify-between py-1.5 px-2 rounded transition-all duration-200 font-telegraf text-sm ${
                      active
                        ? 'text-accent'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-200 ${
                      active ? 'text-accent' : 'text-white/50 group-hover:text-accent group-hover:translate-x-0.5'
                    }`} />
                  </Link>
                );
              })}
              {legalLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`group flex items-center justify-between py-1.5 px-2 rounded transition-all duration-200 font-telegraf text-xs ${
                      active
                        ? 'text-accent'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-200 ${
                      active ? 'text-accent' : 'text-white/40 group-hover:text-white/60 group-hover:translate-x-0.5'
                    }`} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-accent mt-8 pt-8 text-center">
          <p className="text-white/80 font-telegraf text-sm">
            © {currentYear} Stratum PR. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
};
