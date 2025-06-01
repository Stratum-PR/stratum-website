
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
      className="flex items-center gap-2 font-telegraf font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {language === 'en' ? 'EN' : 'ES'} | {language === 'en' ? 'ES' : 'EN'}
      </span>
    </Button>
  );
};
