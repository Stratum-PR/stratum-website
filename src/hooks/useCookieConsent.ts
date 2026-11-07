import { useState, useEffect, useCallback } from 'react';
import { readConsent, startAnalytics, stopAnalytics, writeConsent, type Consent } from '@/lib/analytics';

// Lets the footer's and legal pages' "Cookie preferences" buttons reopen the banner in another component
const CHANGE_EVENT = 'cookie-consent-changed';

/** The visitor's analytics choice, stored in the "stratum_analytics" cookie. No choice means essential-only. */
export const useCookieConsent = () => {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  const save = useCallback((next: Consent | null) => {
    writeConsent(next);
    if (next === 'granted') startAnalytics();
    else stopAnalytics();
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    /** null while reading the cookie on first render, so the banner doesn't flash */
    hasConsent: consent === undefined ? null : consent !== null,
    analytics: consent === 'granted',
    acceptAll: () => save('granted'),
    rejectAll: () => save('denied'),
    /** Forget the stored choice so the banner asks again; analytics stop until the visitor accepts again. */
    withdrawConsent: () => save(null),
  };
};
