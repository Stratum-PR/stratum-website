import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from "@/components/LocalizedLink";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/** Non-blocking analytics notice. Essential-only until the visitor taps "Aceptar". */
export const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const { hasConsent, acceptAll, rejectAll } = useCookieConsent();

  // null = still reading the cookie; true = already chose
  if (hasConsent !== false) {
    return null;
  }

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 z-[9995] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4"
    >
      <Card className="mx-auto max-w-3xl rounded-2xl border border-primary/10 bg-white shadow-[0_12px_40px_rgba(30,43,126,0.18)]">
        <CardContent className="p-4 md:p-5">
          <h3 id="cookie-consent-title" className="mb-1 text-base font-semibold text-[#0b1215] md:mb-2 md:text-lg">
            {t('cookie.title')}
          </h3>
          <p className="mb-3 text-sm text-neutral-600 md:mb-4">
            {t('cookie.description')}{' '}
            <Link to="/cookies" className="text-primary underline hover:text-secondary">
              {t('cookie.privacy.link')}
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3">
            <Button
              onClick={acceptAll}
              className="min-h-[44px] rounded-xl bg-primary px-5 font-semibold text-white hover:bg-secondary"
            >
              {t('cookie.accept.all')}
            </Button>
            <Button
              onClick={rejectAll}
              variant="outline"
              className="min-h-[44px] rounded-xl border-primary/20 px-5 font-semibold text-primary hover:bg-primary/5"
            >
              {t('cookie.reject.all')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
