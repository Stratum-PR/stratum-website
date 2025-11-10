import { Link, useLocation } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Home, Users, Briefcase, HelpCircle, FolderOpen, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
export const Footer = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.about'), href: '/about', icon: Users },
    { name: t('nav.services'), href: '/services', icon: Briefcase },
    { name: t('nav.faq'), href: '/faq', icon: HelpCircle },
    { name: t('nav.resources'), href: '/resources', icon: FolderOpen },
    { name: t('nav.contact'), href: '/contact', icon: Mail },
  ];
  return <footer className="relative text-white bg-black/95 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/Stratum_Icon_whiteline ver 2.svg" alt="Stratum PR Logo" className="h-8 w-8 object-scale-down" />
              <span className="font-telegraf font-bold text-xl text-left px-0">
                {t('footer.companyName').split(' - ')[0]}
                {t('footer.companyName').includes(' - ') && (
                  <span className="text-accent"> - {t('footer.companyName').split(' - ')[1]}</span>
                )}
              </span>
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

          {/* Navigation Links - Enhanced with icons and better styling */}
          <div className="hidden md:block">
            <h3 className="font-telegraf font-semibold text-lg mb-6 text-white">{t('footer.navigation')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`group flex items-center space-x-3 py-2 px-3 rounded-lg transition-all duration-200 font-telegraf ${
                      active
                        ? 'text-accent bg-accent/10 border-l-2 border-accent'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-colors duration-200 ${
                      active ? 'text-accent' : 'text-white/60 group-hover:text-accent'
                    }`} />
                    <span className="text-sm font-medium">{item.name}</span>
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
