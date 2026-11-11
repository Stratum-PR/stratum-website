import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '@/translations';
import type { Language, LanguageContextType } from '@/types/language';
import { alternatePath, languageOfPath } from '@/i18n/paths';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * The language comes from the URL: Spanish pages at their own paths, English twins under /en
 * (src/i18n/paths.ts). The prerendered HTML and the browser agree on it, so hydration matches, and
 * search engines see each language at its own address. Switching language opens the twin page.
 * Must sit inside the router.
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const language: Language = languageOfPath(location.pathname);

  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es-PR' : 'en-US';
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    navigate(alternatePath(location.pathname, lang) + location.search);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
