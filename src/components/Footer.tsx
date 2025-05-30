import { Link } from "react-router-dom";
// import { StratumLogo } from "./StratumLogo"; // Removed since we're using an <img> now
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/img/Icon 1.jpg" alt="Stratum PR Logo" className="h-8 w-8 object-contain" />
              <span className="font-telegraf font-bold text-xl text-left px-0">Stratum PR</span>
            </div>
            <p className="text-primary-100 mb-4 font-telegraf">
              The Architecture of Better Decisions. We specialize in analytics and consulting 
              solutions that drive strategic business outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/stratumpr" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@stratumpr.com" className="text-primary-200 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-telegraf font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-telegraf font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-200" />
                <a href="mailto:hello@stratumpr.com" className="text-primary-200 hover:text-accent transition-colors font-telegraf text-sm">
                  contact@stratumpr.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-200" />
                <span className="text-primary-200 font-telegraf text-sm">
                  Trujillo Alto, P.R.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="text-primary-200 font-telegraf text-sm">
            © {currentYear} Stratum PR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
