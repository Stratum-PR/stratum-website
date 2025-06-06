import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
export const Footer = () => {
  const {
    t
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  return <footer className="text-white bg-[#000953]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/Stratum bold whitelines.svg" alt="Stratum PR Logo" className="h-10 w-10 object-contain" />
              <span className="font-telegraf font-bold text-xl text-left px-0">Stratum PR</span>
            </div>
            <p className="text-primary-100 mb-4 font-telegraf">
              {t('footer.tagline')}
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
            <h3 className="font-telegraf font-semibold text-lg mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('projects.hero.title')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-accent transition-colors font-telegraf">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-telegraf font-semibold text-lg mb-4">{t('footer.contact')}</h3>
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
            © {currentYear} Stratum PR. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
};
