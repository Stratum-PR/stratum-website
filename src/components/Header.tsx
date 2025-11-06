import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    name: t('nav.resources'),
    href: '/resources'
  }, {
    name: t('nav.faq'),
    href: '/faq'
  }, {
    name: t('nav.contact'),
    href: '/contact'
  }];

  const resourcesDropdown = [{
    name: t('projects.hero.title'),
    href: '/projects'
  }, {
    name: t('nav.newsupdates'),
    href: '/newsupdates'
  }, {
    name: t('nav.checklist'),
    href: '/checklist'
  }];
  
  const isActive = (path: string) => location.pathname === path;
  
  // Oracle-style spacing and sizing - Harmonized logo and nav sizes
  // Nav spacing: 24-32px between items (matching Oracle's generous spacing)
  const navSpacing = 'space-x-4 sm:space-x-5 md:space-x-6 lg:space-x-8';
  // Nav font size: 14-16px (standard enterprise nav size, matching Oracle)
  const navFontSize = 'text-sm sm:text-base';
  // Header height - Enterprise standard (64px desktop, 56px mobile/tablet)
  const headerHeight = 'h-14 md:h-16';
  // Logo size: ~26-28px (40-45% of header height, matching Oracle proportions)
  const logoSize = 'h-6 sm:h-6 md:h-7';
  
  const closeMenu = () => setIsMenuOpen(false);
  
  // Render navigation items
  const renderNavItems = () => {
    return navigation.map(item => {
      // Check if this is the Resources item - make it clickable with dropdown
      if (item.href === '/resources') {
        return (
          <NavigationMenu key={item.href}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`font-telegraf bg-transparent hover:bg-transparent data-[state=open]:bg-transparent rounded-none ${navFontSize} ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary font-bold'
                      : 'text-gray-700 hover:text-primary font-medium'
                  }`}
                  onClick={(e) => {
                    // Navigate to resources on click
                    e.preventDefault();
                    navigate('/resources');
                  }}
                >
                  {t('nav.resources')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    {resourcesDropdown.map(dropdownItem => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-4 py-3 font-telegraf font-medium text-base text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        );
      }
      return (
        <Link
          key={item.name}
          to={item.href}
          className={`font-telegraf transition-colors duration-200 ${navFontSize} whitespace-nowrap ${
            isActive(item.href)
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-gray-700 hover:text-primary font-medium'
          }`}
        >
          {item.name}
        </Link>
      );
    });
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 ${headerHeight}`}>
      <div className="w-full px-4 sm:px-5 md:px-6 lg:px-8 h-full">
        {/* Oracle-style layout: Logo (left) | Nav (center) | Actions (right) */}
        <div className="flex items-center h-full">
          {/* Left side: Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* Logo - Oracle-style sizing: ~26-28px (40-45% of header height) */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3">
              <img src="/StratumPR_Logo4.svg" alt="Stratum Logo" className={`${logoSize} w-auto`} />
            </Link>
          </div>

          {/* Center: Navigation links - visible on xl+ (centered with absolute positioning) */}
          <nav className={`hidden xl:flex items-center ${navSpacing} absolute left-1/2 transform -translate-x-1/2`}>
            {renderNavItems()}
          </nav>

          {/* Right side: Language Toggle, CTA Button, Hamburger */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 flex-shrink-0 ml-auto">
            {/* Language Toggle */}
            <div className="flex-shrink-0">
              <LanguageToggle />
            </div>
            
            {/* CTA Button - Show on desktop only (xl+) */}
            <div className="hidden xl:block flex-shrink-0">
              <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-4 md:px-5 py-2 text-sm rounded-md transition-all duration-200 hover:shadow-lg whitespace-nowrap h-9 md:h-10">
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                </a>
              </Button>
            </div>

            {/* Hamburger menu button: Show on tablets and mobile (below xl breakpoint) */}
            <button
              className={`xl:hidden p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-50 relative flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
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
            
            {/* Mobile/Tablet Navigation Menu - positioned below the header */}
            <div id="mobile-menu" className={`xl:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-xl animate-in slide-in-from-top duration-300`}>
              {/* Header space to match main header height - keeps logo visible */}
              <div className="h-14 md:h-16 border-b border-gray-100"></div>
              
              {/* Navigation Content */}
              <div className="bg-white px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center touch-manipulation ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100'
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Resources Dropdown Items in Mobile Menu */}
                  <div className="py-2 px-4 border-t border-gray-100 mt-2">
                    <div className="font-telegraf font-medium text-gray-500 mb-2 text-xs">
                      {t('nav.resources')} - {language === 'en' ? 'More' : 'Más'}
                    </div>
                    {resourcesDropdown.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block py-3 px-4 ml-2 font-telegraf font-medium text-base rounded-lg transition-all duration-200 min-h-[44px] flex items-center touch-manipulation ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100'
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
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
