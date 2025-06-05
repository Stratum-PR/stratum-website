import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    name: t('nav.contact'),
    href: '/contact'
  }, {
    name: t('nav.faq'),
    href: '/faq'
  }];

  const projectsDropdown = [{
    name: t('projects.hero.title'),
    href: '/projects'
  }, {
    name: t('nav.resources'),
    href: '/resources'
  }, {
    name: t('nav.blog'),
    href: '/blog'
  }];
  
  const isActive = (path: string) => location.pathname === path;
  const isProjectsActive = () => projectsDropdown.some(item => isActive(item.href));
  
  // Dynamic spacing based on language
  const navSpacing = language === 'es' ? 'space-x-4 xl:space-x-6' : 'space-x-6 xl:space-x-8';
  const headerHeight = language === 'es' ? 'h-24 lg:h-20' : 'h-20';
  
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${headerHeight}`}>
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 z-50 relative">
            <img src="/StratumPR_Logo4.svg" alt="Stratum Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation - Show hamburger menu earlier for Spanish */}
          <nav className={`hidden ${language === 'es' ? 'xl:flex' : 'lg:flex'} items-center ${navSpacing}`}>
            {navigation.slice(0, 3).map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-telegraf font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Projects Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`font-telegraf font-medium text-sm lg:text-base whitespace-nowrap ${
                      isProjectsActive()
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {t('projects.hero.title')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      {projectsDropdown.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm rounded-md font-telegraf font-medium transition-colors duration-200 ${
                            isActive(item.href)
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Remaining navigation items */}
            {navigation.slice(3).map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-telegraf font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <LanguageToggle />
            <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg text-sm lg:text-base whitespace-nowrap">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('nav.schedule')}
              </a>
            </Button>
          </nav>

          {/* Mobile menu button - Show earlier for Spanish */}
          <button
            className={`${language === 'es' ? 'xl:hidden' : 'lg:hidden'} p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative`}
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
            <div className="fixed inset-x-0 top-0 z-40 bg-white">
              {/* Header space to match main header height - keeps logo visible */}
              <div className={`${headerHeight} border-b border-gray-100`}></div>
              
              {/* Navigation Content */}
              <div className="bg-white px-4 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {/* First three navigation items */}
                  {navigation.slice(0, 3).map(item => (
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

                  {/* Projects Dropdown Items in Mobile Menu */}
                  <div className="py-2 px-4 border-t border-gray-100 mt-2">
                    <div className="font-telegraf font-medium text-gray-500 mb-2">
                      {t('projects.hero.title')}
                    </div>
                    {projectsDropdown.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block py-2 px-4 ml-2 font-telegraf font-medium text-base rounded-lg transition-all duration-200 ${
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

                  {/* Remaining navigation items */}
                  {navigation.slice(3).map(item => (
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
                  <div className="px-4 py-2">
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
