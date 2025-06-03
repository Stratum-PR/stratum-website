
import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        setHasConsent(true);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setHasConsent(false);
      }
    } else {
      setHasConsent(false);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const rejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const saveCustomPreferences = (customPreferences: Omit<CookiePreferences, 'timestamp'>) => {
    const newPreferences: CookiePreferences = {
      ...customPreferences,
      essential: true, // Always true
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const withdrawConsent = () => {
    localStorage.removeItem('cookie-consent');
    setHasConsent(false);
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: 0,
    });
  };

  return {
    hasConsent,
    preferences,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    withdrawConsent,
  };
};
