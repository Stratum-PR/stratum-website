import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
export const Footer = () => {
  const {
    t
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  return <footer className="text-white bg-[#000953]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-3">
              <img src="/Stratum_Icon_whiteline ver 2.svg" alt="Stratum PR Logo" className="h-7 w-7 sm:h-8 sm:w-8 object-scale-down" />
              <span className="font-telegraf font-bold text-base sm:text-lg md:text-xl text-left px-0">Stratum PR - The Architecture of Better Decisions.</span>
            </div>
            <p className="text-primary-100 mb-1.5 sm:mb-3 font-telegraf text-sm sm:text-base">
              Your strategic partner for business intelligence solutions in Puerto Rico.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://linkedin.com/company/stratumpr" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-accent transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577145020919" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-accent transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://www.instagram.com/stratum.pr/" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-accent transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links - Reordered to match header: Home, About, Services, FAQ, Resources, Contact */}
          <div>
            <h3 className="font-telegraf font-semibold text-base sm:text-lg mb-1.5 sm:mb-3">Navigation</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Link to="/" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.home')}
                </Link>
                <Link to="/about" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.about')}
                </Link>
                <Link to="/services" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.services')}
                </Link>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Link to="/faq" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.faq')}
                </Link>
                <Link to="/resources" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.resources')}
                </Link>
                <Link to="/contact" className="block text-primary-200 hover:text-accent transition-colors font-telegraf text-sm sm:text-base">
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-2 sm:mt-4 pt-2 sm:pt-4 text-center">
          <p className="text-primary-200 font-telegraf text-xs sm:text-sm">
            © {currentYear} Stratum PR. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
};
