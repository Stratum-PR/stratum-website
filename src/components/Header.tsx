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
  
  // Responsive spacing and font size that adapts to device width
  const navSpacing = 'space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6';
  const navFontSize = 'text-base sm:text-lg';
  // Header height - single line when possible
  const headerHeight = 'h-[50px]';
  
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
                  className={`font-telegraf font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent rounded-none ${navFontSize} ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-gray-700 hover:text-primary'
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
          className={`font-telegraf font-medium transition-colors duration-200 ${navFontSize} whitespace-nowrap ${
            isActive(item.href)
              ? 'text-primary border-b-2 border-primary pb-1'
              : 'text-gray-700 hover:text-primary'
          }`}
        >
          {item.name}
        </Link>
      );
    });
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 ${headerHeight}`}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 h-full">
        {/* Single Row: All items centered when space allows, split when too cluttered */}
        <div className="flex items-center justify-center h-full gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <img src="/StratumPR_Logo4.svg" alt="Stratum Logo" className="h-6 sm:h-7 w-auto" />
          </Link>

          {/* Navigation links - centered, visible on xl+ (one line when space allows) */}
          <nav className={`hidden xl:flex items-center ${navSpacing} flex-shrink-0`}>
            {renderNavItems()}
          </nav>

          {/* Language Toggle */}
          <div className="flex-shrink-0">
            <LanguageToggle />
          </div>
          
          {/* CTA Button - Show on desktop/tablet */}
          <div className="hidden md:block flex-shrink-0">
            <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-3 sm:px-4 py-1 text-sm sm:text-md rounded-md transition-all duration-200 hover:shadow-lg whitespace-nowrap">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('nav.schedule')}
              </a>
            </Button>
          </div>

          {/* Hamburger menu button: Show on mobile only */}
          <button
            className={`md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors z-50 relative flex-shrink-0`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-gray-700" />
            ) : (
              <Menu className="h-4 w-4 text-gray-700" />
            )}
          </button>
        </div>

        {/* Second Row: Navigation links - only when space is absolutely too tight (between lg and xl) */}
        <nav className={`hidden xl:hidden lg:flex items-center justify-center ${navSpacing} py-1`}>
          {renderNavItems()}
        </nav>

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
            <div className={`md:hidden fixed top-0 left-0 right-0 z-45 bg-white shadow-xl animate-in slide-in-from-top duration-300`}>
              {/* Header space to match main header height - keeps logo visible */}
              <div className="h-[50px] border-b border-gray-100"></div>
              
              {/* Navigation Content */}
              <div className="bg-white px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-telegraf font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
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
                        className={`block py-2 px-4 ml-2 font-telegraf font-medium text-sm rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
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
