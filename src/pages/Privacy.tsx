import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const Privacy: React.FC = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('privacy.page.title'),
    description: t('privacy.page.description'),
    keywords: t('privacy.page.keywords'),
    canonical: "https://www.stratumpr.com/privacy",
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t('privacy.title')}
          </h1>

          <div className="text-gray-600 leading-relaxed space-y-6">
            <p>{t('privacy.intro')}</p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('privacy.cookies.what.title')}
              </h2>
              <p>{t('privacy.cookies.what.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('privacy.cookies.types.title')}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{t('privacy.cookies.types.essential.title')}</strong> – {t('privacy.cookies.types.essential.description')}
                </li>
                <li>
                  <strong>{t('privacy.cookies.types.analytics.title')}</strong> – {t('privacy.cookies.types.analytics.description')}
                </li>
                <li>
                  <strong>{t('privacy.cookies.types.marketing.title')}</strong> – {t('privacy.cookies.types.marketing.description')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('privacy.choices.title')}
              </h2>
              <p>{t('privacy.choices.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('privacy.compliance.title')}
              </h2>
              <p>{t('privacy.compliance.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p>
                {t('privacy.contact.description')}{' '}
                <a 
                  href="mailto:info@stratumpr.com" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  info@stratumpr.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
