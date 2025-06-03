
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

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
      className="flex items-center gap-1.5 font-telegraf font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors px-2 lg:px-3 flex-shrink-0"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
      <span className="text-xs lg:text-sm font-semibold">
        {language === 'en' ? 'EN' : 'ES'} | {language === 'en' ? 'ES' : 'EN'}
      </span>
    </Button>
  );
};
