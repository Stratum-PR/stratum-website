
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 font-telegraf font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors px-2 lg:px-3 flex-shrink-0 text-sm sm:text-base md:text-lg lg:text-xl"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      {language === 'en' ? (
        <>
          <span className="text-lg">🇵🇷</span>
          <span className="text-xs lg:text-sm font-semibold">Español</span>
        </>
      ) : (
        <>
          <span className="text-lg">🇺🇸</span>
          <span className="text-xs lg:text-sm font-semibold">English</span>
        </>
      )}
    </Button>
  );
};
