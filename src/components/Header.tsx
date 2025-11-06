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
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  // Navigation items - simple array, no progressive hiding
  const navigation = [
    {
      name: t('nav.home'),
      href: '/'
    },
    {
      name: t('nav.about'),
      href: '/about'
    },
    {
      name: t('nav.services'),
      href: '/services'
    },
    {
      name: t('nav.faq'),
      href: '/faq'
    },
    {
      name: t('nav.resources'),
      href: '/resources'
    },
    {
      name: t('nav.contact'),
      href: '/contact'
    }
  ];

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
  // Nav spacing: 20-24px between items (tighter spacing, matching Oracle's density)
  const navSpacing = 'space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6';
  // Nav font size: 14px mobile, 17-18px desktop (larger for better readability and density)
  const navFontSize = 'text-sm sm:text-base lg:text-lg';
  // Header height - Enterprise standard (64px desktop, 56px mobile/tablet)
  const headerHeight = 'h-14 md:h-16';
  // Logo size: ~26-28px (40-45% of header height, matching Oracle proportions)
  const logoSize = 'h-6 sm:h-6 md:h-7';
  
  const closeMenu = () => {
    setIsMenuClosing(true);
    // After animation completes, close the menu
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 500); // Match the duration of the slide-out animation
  };
  
  // Render navigation items - all visible, no progressive hiding
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
              <img 
                src={isMenuOpen ? "/img/Logo 2.svg" : "/StratumPR_Logo4.svg"} 
                alt="Stratum Logo" 
                className={`${logoSize} w-auto transition-opacity duration-300 ease-in-out`} 
              />
            </Link>
          </div>

          {/* Center: Navigation links - progressively visible based on window size */}
          {/* Only show navigation menu on desktop (xl+), use hamburger for tablets and mobile */}
          <nav className={`hidden xl:flex items-center ${navSpacing} absolute left-1/2 transform -translate-x-1/2`}>
            {renderNavItems()}
          </nav>

          {/* Right side: Language Toggle, CTA Button, Hamburger */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 flex-shrink-0 ml-auto">
            {/* Language Toggle */}
            <div className="flex-shrink-0">
              <LanguageToggle />
            </div>
            
            {/* CTA Button - Show only on desktop (xl+) */}
            <div className="hidden xl:block flex-shrink-0">
              <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-4 md:px-5 py-2 text-sm rounded-md transition-all duration-200 hover:shadow-lg whitespace-nowrap h-9 md:h-10">
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                </a>
              </Button>
            </div>

            {/* Hamburger menu button: Show on tablets and mobile (below xl breakpoint) */}
            <button
              className={`xl:hidden p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-[60] relative flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation`}
              onClick={() => {
                if (isMenuOpen) {
                  closeMenu();
                } else {
                  setIsMenuOpen(true);
                  setIsMenuClosing(false);
                }
              }}
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
        {(isMenuOpen || isMenuClosing) && (
          <>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
                isMenuClosing ? 'opacity-0' : 'opacity-100'
              }`}
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            {/* Mobile/Tablet Navigation Menu - positioned below the header */}
            <div 
              id="mobile-menu" 
              className={`xl:hidden fixed top-0 left-0 right-0 z-50 bg-primary shadow-xl transition-all duration-500 ease-in-out ${
                isMenuClosing 
                  ? 'opacity-0 -translate-y-full' 
                  : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Header space with Logo 2.svg when menu is open */}
              <div className="h-14 md:h-16 border-b border-primary-700/30 flex items-center px-4 sm:px-5 md:px-6 lg:px-8">
                <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3" onClick={closeMenu}>
                  <img 
                    src="/img/Logo 2.svg" 
                    alt="Stratum Logo" 
                    className={`${logoSize} w-auto transition-opacity duration-300 ease-in-out`} 
                  />
                </Link>
              </div>
              
              {/* Navigation Content */}
              <div className="bg-primary px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {/* Main navigation items */}
                  {navigation.map(item => {
                    // Handle Resources as a dropdown
                    if (item.href === '/resources') {
                      return (
                        <div key={item.href}>
                          <button
                            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                            className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] w-full flex items-center justify-between touch-manipulation ${
                              isActive(item.href) || resourcesDropdown.some(subItem => isActive(subItem.href))
                                ? 'text-white bg-white/20 border-l-4 border-white'
                                : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 text-white transition-transform duration-200 ${
                                isResourcesOpen ? 'transform rotate-180' : ''
                              }`} 
                            />
                          </button>
                          {/* Resources dropdown items */}
                          {isResourcesOpen && (
                            <div className="pl-4 space-y-1 mt-1">
                              {resourcesDropdown.map(subItem => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center touch-manipulation ${
                                    isActive(subItem.href)
                                      ? 'text-white bg-white/20 border-l-4 border-white'
                                      : 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
                                  }`}
                                  onClick={closeMenu}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    // Regular navigation items
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center touch-manipulation ${
                          isActive(item.href)
                            ? 'text-white bg-white/20 border-l-4 border-white'
                            : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20'
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
