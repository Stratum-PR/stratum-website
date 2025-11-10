import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import TechAnimatedBackground from "@/components/TechAnimatedBackground";
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
  const [showComingSoon, setShowComingSoon] = useState(false);
  const touchHandledRef = useRef(false);
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
    href: '/projects',
    isChecklist: false
  }, {
    name: t('nav.newsupdates'),
    href: '/newsupdates',
    isChecklist: false
  }, {
    name: t('nav.checklist'),
    href: '/checklist',
    isChecklist: true // Flag to trigger modal instead of navigation
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

  const openMenu = () => {
    setIsMenuClosing(false);
    setIsMenuOpen(true);
  };
  
  // Render navigation items - all visible, no progressive hiding
  const renderNavItems = () => {
    return navigation.map(item => {
      // Check if this is the Resources item - make it clickable with dropdown
      if (item.href === '/resources') {
        return (
          <NavigationMenu key={item.href} className="[&>div>div]:!bg-black/95 [&>div>div]:!border-gray-800">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`font-telegraf !bg-transparent hover:!bg-transparent data-[state=open]:!bg-transparent data-[state=open]:!text-white data-[state=open]:!opacity-100 rounded-none ${navFontSize} ${
                    isActive(item.href)
                      ? 'text-white border-b-2 border-accent font-bold'
                      : 'text-white/80 hover:text-white font-medium'
                  }`}
                  onClick={(e) => {
                    // Navigate to resources on click
                    e.preventDefault();
                    navigate('/resources');
                  }}
                >
                  {t('nav.resources')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-black/95 border-gray-800">
                  <div className="w-48 p-2 bg-black/95">
                    {resourcesDropdown.map(dropdownItem => (
                      dropdownItem.isChecklist ? (
                        <button
                          key={dropdownItem.name}
                          onClick={() => setShowComingSoon(true)}
                          className="block w-full text-left px-4 py-3 font-telegraf font-medium text-base text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        >
                          {dropdownItem.name}
                        </button>
                      ) : (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className={`block px-4 py-3 font-telegraf font-medium text-base rounded-md transition-colors ${
                            isActive(dropdownItem.href)
                              ? 'text-white border-b-2 border-accent font-bold'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      )
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
              ? 'text-white border-b-2 border-accent font-bold'
              : 'text-white/80 hover:text-white font-medium'
          }`}
        >
          {item.name}
        </Link>
      );
    });
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] relative overflow-hidden bg-black ${headerHeight}`}>
      
      <div className="relative z-10 w-full px-4 sm:px-5 md:px-6 lg:px-8 h-full">
        {/* Oracle-style layout: Logo (left) | Nav (center) | Actions (right) */}
        <div className="flex items-center h-full">
          {/* Left side: Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* Logo - Oracle-style sizing: ~26-28px (40-45% of header height) */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3">
              <img 
                src="/img/Logo 2.svg" 
                alt="Stratum Logo" 
                key="main-logo"
                className={`${logoSize} w-auto`}
                style={{ 
                  imageRendering: 'auto',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </Link>
          </div>

          {/* Center: Navigation links - progressively visible based on window size */}
          {/* Only show navigation menu on desktop (xl+), use hamburger for tablets and mobile */}
          <nav className={`hidden xl:flex items-center ${navSpacing} absolute left-1/2 transform -translate-x-1/2`}>
            {renderNavItems()}
          </nav>

          {/* Right side: Language Toggle, CTA Button, Hamburger */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 flex-shrink-0 ml-auto" style={{ position: 'relative', zIndex: 70 }}>
            {/* Language Toggle */}
            <div className="flex-shrink-0">
              <LanguageToggle />
            </div>
            
            {/* CTA Button - Show only on desktop (xl+) */}
            <div className="hidden xl:block flex-shrink-0">
              <Button asChild className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-4 md:px-5 py-2 text-sm rounded-md transition-all duration-200 hover:shadow-lg whitespace-nowrap h-9 md:h-10">
                <a href="https://calendly.com/admin-stratumpr/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                </a>
              </Button>
            </div>

            {/* Hamburger menu button: Show on tablets and mobile (below xl breakpoint) */}
            <button
              type="button"
              className={`xl:hidden p-2.5 rounded-lg transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation ${
                isMenuOpen 
                  ? 'bg-transparent hover:bg-transparent active:bg-transparent' 
                  : 'hover:bg-white/10 active:bg-white/20'
              }`}
              onClick={(e) => {
                // Prevent click if touch was already handled (to avoid double-toggle)
                if (touchHandledRef.current) {
                  e.preventDefault();
                  touchHandledRef.current = false;
                  return;
                }
                e.stopPropagation();
                if (isMenuOpen) {
                  closeMenu();
                } else {
                  openMenu();
                }
              }}
              onTouchStart={(e) => {
                // Mark that touch is being handled
                touchHandledRef.current = true;
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMenuOpen) {
                  closeMenu();
                } else {
                  openMenu();
                }
                // Reset after a short delay to allow click event to be ignored if it fires
                setTimeout(() => {
                  touchHandledRef.current = false;
                }, 300);
              }}
              style={{
                position: 'relative',
                zIndex: 70,
                pointerEvents: 'auto',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none'
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-white pointer-events-none" />
              ) : (
                <Menu className="h-5 w-5 text-white pointer-events-none" />
              )}
            </button>
          </div>
        </div>

        {/* Pre-render logo images for burger menu to prevent pop-in */}
        <div className="xl:hidden fixed -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <img src="/Stratum_Icon_whiteline ver 2.svg" alt="" />
          <img src="/img/Logo_Text_Only.svg" alt="" />
        </div>

        {/* Mobile Navigation Overlay - rendered via portal to escape header stacking context */}
        {(isMenuOpen || isMenuClosing) && typeof document !== 'undefined' && createPortal(
          <>
            {/* Backdrop - starts below navbar */}
            <div 
              className={`xl:hidden fixed top-14 md:top-16 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ease-out ${
                isMenuClosing ? 'opacity-0' : isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeMenu}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              aria-hidden="true"
              style={{ 
                pointerEvents: isMenuOpen ? 'auto' : 'none',
                zIndex: 9998
              }}
            />
            
            {/* Mobile/Tablet Navigation Menu - positioned below the header */}
            <div 
              id="mobile-menu" 
              className={`xl:hidden fixed top-14 md:top-16 left-0 right-0 bg-gradient-to-br from-primary via-primary-800 to-secondary shadow-xl transition-all duration-500 ease-out overflow-hidden ${
                isMenuClosing 
                  ? 'opacity-0 -translate-y-full' 
                  : isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-full'
              }`}
              style={{ zIndex: 9999 }}
            >
              {/* Dark overlay for better text contrast - same as hero section */}
              <div className="absolute inset-0 bg-black/40 z-0"></div>
              
              {/* Tech animated background - exact same as hero section for seamless particle flow */}
              {isMenuOpen && !isMenuClosing && (
                <TechAnimatedBackground className="z-0" opacity={0.7} />
              )}
              
              {/* Navigation Content */}
              <div className={`relative z-10 px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-500 ease-out ${
                isMenuClosing 
                  ? 'opacity-0 translate-y-4' 
                  : isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}>
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
                                ? 'text-black bg-accent border-l-4 border-accent'
                                : 'text-white/90 hover:text-white hover:bg-primary-800/50 active:bg-primary-800'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isActive(item.href) || resourcesDropdown.some(subItem => isActive(subItem.href))
                                  ? 'text-black'
                                  : 'text-white'
                              } ${isResourcesOpen ? 'transform rotate-180' : ''}`} 
                            />
                          </button>
                          {/* Resources dropdown items */}
                          {isResourcesOpen && (
                            <div className="pl-4 space-y-1 mt-1">
                              {resourcesDropdown.map(subItem => (
                                subItem.isChecklist ? (
                                  <button
                                    key={subItem.name}
                                    onClick={() => {
                                      setShowComingSoon(true);
                                      closeMenu();
                                    }}
                                    className="font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center touch-manipulation w-full text-left text-white/80 hover:text-white hover:bg-primary-800/50 active:bg-primary-800"
                                  >
                                    {subItem.name}
                                  </button>
                                ) : (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center touch-manipulation ${
                                      isActive(subItem.href)
                                        ? 'text-black bg-accent border-l-4 border-accent'
                                        : 'text-white/80 hover:text-white hover:bg-primary-800/50 active:bg-primary-800'
                                    }`}
                                    onClick={closeMenu}
                                  >
                                    {subItem.name}
                                  </Link>
                                )
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
                        className={`font-telegraf font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base min-h-[44px] flex items-center ${
                          isActive(item.href)
                            ? 'text-black bg-accent border-l-4 border-accent'
                            : 'text-white/90 hover:text-white hover:bg-primary-800/50 active:bg-primary-800'
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
          </>,
          document.body
        )}
      </div>
      
      {/* Coming Soon Modal for Systems Assessment */}
      <ComingSoonModal open={showComingSoon} onOpenChange={setShowComingSoon} />
    </header>
  );
};
