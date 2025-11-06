
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/translations';
import type { Language, LanguageContextType } from '@/types/language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Detect browser/device language and load from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      // User has previously selected a language - use it
      setLanguageState(savedLanguage);
    } else {
      // First visit: Detect browser/device language
      const browserLanguage = navigator.language || (navigator as any).userLanguage || 'en';
      
      // Extract language code (e.g., 'es' from 'es-PR', 'es-MX', 'es-ES', etc.)
      const languageCode = browserLanguage.toLowerCase().split('-')[0];
      
      // Set to Spanish if browser language starts with 'es', otherwise default to English
      const detectedLanguage: Language = languageCode === 'es' ? 'es' : 'en';
      
      setLanguageState(detectedLanguage);
      localStorage.setItem('preferred-language', detectedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
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
