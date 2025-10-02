import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const navigation = [{
    name: t('nav.home'),
    href: '/'
  }, {
    name: t('nav.about'),
    href: '/about'
  }, {
    name: t('nav.services'),
    href: '/services'
  }, {
    name: t('projects.hero.title'),
    href: '/projects'
  }, {
    name: t('nav.faq'),
    href: '/faq'
  }, {
    name: t('nav.contact'),
    href: '/contact'
  }];
  
  const isActive = (path: string) => location.pathname === path;
  
  // Consistent spacing and font size for nav items across all languages
  const navSpacing = 'space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12';
  const navFontSize = 'text-sm sm:text-base md:text-lg lg:text-xl';
  const headerHeight = 'h-20';
  
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${headerHeight} gap-8`}>
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 z-50 relative">
            <img src="/StratumPR_Logo4.svg" alt="Stratum Logo" className="h-10 w-auto" />
          </Link>


          {/* Desktop Navigation - Responsive font/spacing, never scrolls, switches to hamburger if too small */}
          <nav className={`hidden xl:flex items-center ${navSpacing}`}>
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-telegraf font-medium transition-colors duration-200 ${navFontSize} whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageToggle />
            <Button asChild className={`bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg ${navFontSize} whitespace-nowrap`}>
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('nav.schedule')}
              </a>
            </Button>
          </nav>

          {/* Hamburger menu button: show below xl (or adjust as needed) */}
          <button
            className={`xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            {/* Mobile Navigation Menu - positioned below the header */}
            <div className={`xl:hidden fixed top-0 left-0 right-0 z-45 bg-white shadow-xl animate-in slide-in-from-top duration-300`}>
              {/* Header space to match main header height - keeps logo visible */}
              <div className={`${headerHeight} border-b border-gray-100`}></div>
              
              {/* Navigation Content */}
              <div className="bg-white px-4 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Language Toggle in Mobile Menu */}
                  <div className="px-4 py-2 border-t border-gray-100 mt-4 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-telegraf font-medium text-gray-700">Language</span>
                      <LanguageToggle />
                    </div>
                  </div>
                  
                  {/* CTA Button in Mobile Menu */}
                  <div className="px-4 pt-4">
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
                      onClick={closeMenu}
                    >
                      <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                        {t('nav.schedule')}
                      </a>
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
