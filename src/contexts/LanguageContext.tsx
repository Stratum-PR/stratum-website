
import React, { createContext, useContext, useState, useEffect, startTransition, ReactNode } from 'react';
import { translations } from '@/translations';
import type { Language, LanguageContextType } from '@/types/language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Only set when the visitor picks a language themselves. The old 'preferred-language' key was also
// written by browser detection, so it is ignored: everyone starts in Spanish until they choose.
const STORAGE_KEY = 'site-language';

const readSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // storage blocked (private mode): fall through to the default
  }
  return 'es';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Starts in Spanish, like the prerendered HTML, so hydration matches. A saved English choice is
  // applied right after, as a transition so it doesn't interrupt pages that are still hydrating.
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = readSavedLanguage();
    if (saved !== 'es') startTransition(() => setLanguageState(saved));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es-PR' : 'en-US';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage blocked: the choice lasts for this visit only
    }
  };

  // Simple translation function - uses the imported translations
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
