
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const { hasConsent, acceptAll, rejectAll, saveCustomPreferences } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [customPrefs, setCustomPrefs] = useState({
    analytics: false,
    marketing: false,
  });

  if (hasConsent) {
    return null;
  }

  const handleCustomSave = () => {
    saveCustomPreferences({
      essential: true,
      ...customPrefs,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9995] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4">
      <Card className="mx-auto max-w-3xl rounded-2xl border border-primary/10 bg-white shadow-[0_12px_40px_rgba(30,43,126,0.18)]">
        <CardContent className="p-4 md:p-5">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#0b1215] mb-1 md:mb-2 md:text-lg">
                {t('cookie.title')}
              </h3>
              <p className="text-sm text-neutral-600 mb-0 md:mb-4">
                {t('cookie.description')}{' '}
                <Link 
                  to="/cookies" 
                  className="text-primary hover:text-secondary underline"
                >
                  {t('cookie.privacy.link')}
                </Link>
              </p>
            </div>
          </div>

          {!showCustomize ? (
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
              <Button 
                onClick={() => setShowCustomize(true)}
                variant="outline"
                className="col-span-2 min-h-[44px] rounded-xl border-primary/20 px-5 font-semibold text-primary hover:bg-primary/5"
              >
                <Settings className="w-4 h-4 mr-2" />
                {t('cookie.customize')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox checked={true} disabled />
                  <div>
                    <label className="text-sm font-medium text-[#0b1215]">
                      {t('cookie.essential.title')}
                    </label>
                    <p className="text-xs text-neutral-600">
                      {t('cookie.essential.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={customPrefs.analytics}
                    onCheckedChange={(checked) => 
                      setCustomPrefs(prev => ({ ...prev, analytics: !!checked }))
                    }
                  />
                  <div>
                    <label className="text-sm font-medium text-[#0b1215]">
                      {t('cookie.analytics.title')}
                    </label>
                    <p className="text-xs text-neutral-600">
                      {t('cookie.analytics.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 pt-4 border-t">
                <Button 
                  onClick={handleCustomSave}
                  className="min-h-[44px] rounded-xl bg-primary px-5 font-semibold text-white hover:bg-secondary"
                >
                  {t('cookie.save.preferences')}
                </Button>
                <Button 
                  onClick={() => setShowCustomize(false)}
                  variant="outline"
                  className="min-h-[44px] rounded-xl border-primary/20 px-5 font-semibold text-primary hover:bg-primary/5"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
