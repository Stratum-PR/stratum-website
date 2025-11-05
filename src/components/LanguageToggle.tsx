
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setLanguage(newLanguage);
  };

  const handleToggle = () => {
    // Immediately toggle language on click
    handleLanguageChange(language === 'en' ? 'es' : 'en');
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="flex items-center gap-2 font-telegraf font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors px-2 lg:px-3 flex-shrink-0"
          aria-label={`Current language: ${language === 'en' ? 'English' : 'Spanish'}`}
        >
          {language === 'en' ? (
            <>
              <span className="text-lg">🇺🇸</span>
              <span className="text-lg font-semibold">English</span>
            </>
          ) : (
            <>
              <span className="text-lg">🇵🇷</span>
              <span className="text-lg font-semibold">Spanish</span>
            </>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-40 p-2">
        {language === 'en' ? (
          <button
            onClick={() => handleLanguageChange('es')}
            className="font-telegraf cursor-pointer flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-lg">🇵🇷</span>
            <span className="font-semibold">Spanish</span>
          </button>
        ) : (
          <button
            onClick={() => handleLanguageChange('en')}
            className="font-telegraf cursor-pointer flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-lg">🇺🇸</span>
            <span className="font-semibold">English</span>
          </button>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
