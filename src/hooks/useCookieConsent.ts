import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  /** Kept for stored-data compatibility; the site uses no marketing cookies. */
  marketing: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'cookie-consent';
// Lets the footer's "Cookie preferences" link reopen the banner in another component
const CHANGE_EVENT = 'cookie-consent-changed';

declare global {
  interface Window {
    /** Defined in index.html: loads Google Analytics and Microsoft Clarity once. */
    stratumLoadAnalytics?: () => void;
  }
}

const EMPTY: CookiePreferences = { essential: true, analytics: false, marketing: false, timestamp: 0 };

function readStored(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CookiePreferences) : null;
  } catch (error) {
    logger.error('Error parsing cookie consent:', error);
    return null;
  }
}

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>(EMPTY);

  useEffect(() => {
    const sync = () => {
      const stored = readStored();
      setPreferences(stored ?? EMPTY);
      setHasConsent(stored !== null);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  const save = useCallback((analytics: boolean) => {
    const previous = readStored();
    const next: CookiePreferences = { essential: true, analytics, marketing: false, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (analytics) {
      window.stratumLoadAnalytics?.();
    } else if (previous?.analytics) {
      // Analytics scripts can't be unloaded; a reload starts the page without them
      window.location.reload();
    }
  }, []);

  const acceptAll = () => save(true);
  const rejectAll = () => save(false);
  const saveCustomPreferences = (custom: Omit<CookiePreferences, 'timestamp'>) => save(custom.analytics);

  /** Forget the stored choice so the banner asks again. */
  const withdrawConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
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
