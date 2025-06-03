
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-white shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('cookie.title')}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('cookie.description')}{' '}
                <Link 
                  to="/privacy" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('cookie.privacy.link')}
                </Link>
              </p>
            </div>
          </div>

          {!showCustomize ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={acceptAll}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('cookie.accept.all')}
              </Button>
              <Button 
                onClick={rejectAll}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {t('cookie.reject.all')}
              </Button>
              <Button 
                onClick={() => setShowCustomize(true)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
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
                    <label className="text-sm font-medium text-gray-900">
                      {t('cookie.essential.title')}
                    </label>
                    <p className="text-xs text-gray-500">
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
                    <label className="text-sm font-medium text-gray-900">
                      {t('cookie.analytics.title')}
                    </label>
                    <p className="text-xs text-gray-500">
                      {t('cookie.analytics.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={customPrefs.marketing}
                    onCheckedChange={(checked) => 
                      setCustomPrefs(prev => ({ ...prev, marketing: !!checked }))
                    }
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      {t('cookie.marketing.title')}
                    </label>
                    <p className="text-xs text-gray-500">
                      {t('cookie.marketing.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button 
                  onClick={handleCustomSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t('cookie.save.preferences')}
                </Button>
                <Button 
                  onClick={() => setShowCustomize(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
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
