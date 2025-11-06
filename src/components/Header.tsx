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
  
  // Navigation items with priority for progressive hiding
  // Priority order: Lower priority items hide first as window shrinks
  const navigation = [
    {
      name: t('nav.home'),
      href: '/',
      priority: 1 // Highest priority - always visible
    }, 
    {
      name: t('nav.services'),
      href: '/services',
      priority: 2 // High priority - hide late
    }, 
    {
      name: t('nav.contact'),
      href: '/contact',
      priority: 3 // Medium-high priority
    },
    {
      name: t('nav.about'),
      href: '/about',
      priority: 4 // Medium priority - hide earlier
    }, 
    {
      name: t('nav.resources'),
      href: '/resources',
      priority: 5 // Lower priority - hide early
    }, 
    {
      name: t('nav.faq'),
      href: '/faq',
      priority: 6 // Lowest priority - hide first
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
  
  const closeMenu = () => setIsMenuOpen(false);
  
  // Render navigation items with progressive visibility
  // Items hide progressively based on priority as window shrinks
  const renderNavItems = () => {
    return navigation.map(item => {
      // Progressive visibility classes based on priority
      // Since parent nav shows at md+, items hide progressively as window shrinks
      // Lower priority items hide at smaller breakpoints
      const visibilityClasses = {
        1: '', // Always visible when nav is visible (no hiding)
        2: 'hidden 2xl:block', // Hide below 2xl (1536px), show at 2xl+
        3: 'hidden xl:block', // Hide below xl (1280px), show at xl+
        4: 'hidden lg:block', // Hide below lg (1024px), show at lg+
        5: 'hidden lg:block', // Hide below lg, show at lg+ (Resources)
        6: 'hidden xl:block' // Hide below xl, show at xl+ (FAQ)
      }[item.priority] || '';

      // Check if this is the Resources item - make it clickable with dropdown
      if (item.href === '/resources') {
        return (
          <NavigationMenu key={item.href} className={visibilityClasses}>
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
          className={`font-telegraf transition-colors duration-200 ${navFontSize} whitespace-nowrap ${visibilityClasses} ${
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

          {/* Center: Navigation links - progressively visible based on window size */}
          {/* Start showing nav items at md breakpoint, center them */}
          <nav className={`hidden md:flex items-center ${navSpacing} absolute left-1/2 transform -translate-x-1/2`}>
            {renderNavItems()}
          </nav>

          {/* Right side: Language Toggle, CTA Button, Hamburger */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 flex-shrink-0 ml-auto">
            {/* Language Toggle */}
            <div className="flex-shrink-0">
              <LanguageToggle />
            </div>
            
            {/* CTA Button - Show progressively: hide on small screens, show from md+ */}
            <div className="hidden md:block flex-shrink-0">
              <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-4 md:px-5 py-2 text-sm rounded-md transition-all duration-200 hover:shadow-lg whitespace-nowrap h-9 md:h-10">
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                </a>
              </Button>
            </div>

            {/* Hamburger menu button: Show only when nav items can't fit (below md breakpoint) */}
            <button
              className={`md:hidden p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-50 relative flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation`}
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
            
            {/* Mobile Navigation Menu - positioned below the header */}
            <div id="mobile-menu" className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-xl animate-in slide-in-from-top duration-300`}>
              {/* Header space to match main header height - keeps logo visible */}
              <div className="h-14 md:h-16 border-b border-gray-100"></div>
              
              {/* Navigation Content */}
              <div className="bg-white px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {/* Main navigation items - including Resources dropdown items as main items */}
                  {navigation.map(item => {
                    // If this is Resources, skip it and show its dropdown items as main items instead
                    if (item.href === '/resources') {
                      return null;
                    }
                    return (
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
                    );
                  })}

                  {/* Resources dropdown items as main menu items (flattened) */}
                  {resourcesDropdown.map(item => (
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
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
