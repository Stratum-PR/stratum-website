import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'About',
    href: '/about'
  }, {
    name: 'Services',
    href: '/services'
  }, {
    name: 'Contact',
    href: '/contact'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lovable-uploads/2fa2d4e2-201d-491d-abf3-9f4702b8293c.png" alt="Stratum Logo" className="h-10 w-auto" />
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`font-telegraf font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-700 hover:text-primary'}`}>
                {item.name}
              </Link>)}
            <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                Schedule Consultation
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`font-telegraf font-medium py-2 px-4 rounded-lg transition-colors ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
              <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold mx-4 mt-2">
                <a href="https://calendly.com/stratumpr" target="_blank" rel="noopener noreferrer">
                  Schedule Consultation
                </a>
              </Button>
            </nav>
          </div>}
      </div>
    </header>;
};
