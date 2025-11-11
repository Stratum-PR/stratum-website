import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const Terms: React.FC = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('terms.page.title'),
    description: t('terms.page.description'),
    keywords: t('terms.page.keywords'),
    canonical: "https://www.stratumpr.com/terms",
  });

  return (
    <div className="min-h-screen bg-white pt-[50px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">
            {t('terms.title')}
          </h1>

          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="font-semibold text-gray-800 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              {t('terms.important')}
            </p>

            <p>{t('terms.intro')}</p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.authorized.title')}
              </h2>
              <p>{t('terms.authorized.content')}</p>
              <p className="mt-4">{t('terms.authorized.additional')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.privacy.title')}
              </h2>
              <p>{t('terms.privacy.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.ownership.title')}
              </h2>
              <p>{t('terms.ownership.content')}</p>
              <p className="mt-4 font-semibold">{t('terms.ownership.copyright')}</p>
              <p className="mt-4">{t('terms.ownership.trademarks')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.disclaimers.title')}
              </h2>
              <p className="font-semibold">{t('terms.disclaimers.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.liability.title')}
              </h2>
              <p className="font-semibold">{t('terms.liability.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.conduct.title')}
              </h2>
              <p className="mb-4">{t('terms.conduct.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('terms.conduct.item1')}</li>
                <li>{t('terms.conduct.item2')}</li>
                <li>{t('terms.conduct.item3')}</li>
                <li>{t('terms.conduct.item4')}</li>
                <li>{t('terms.conduct.item5')}</li>
                <li>{t('terms.conduct.item6')}</li>
                <li>{t('terms.conduct.item7')}</li>
                <li>{t('terms.conduct.item8')}</li>
                <li>{t('terms.conduct.item9')}</li>
                <li>{t('terms.conduct.item10')}</li>
                <li>{t('terms.conduct.item11')}</li>
              </ul>
              <p className="mt-4">{t('terms.conduct.enforcement')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.indemnity.title')}
              </h2>
              <p>{t('terms.indemnity.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.links.title')}
              </h2>
              <p>{t('terms.links.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.california.title')}
              </h2>
              <p>{t('terms.california.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.general.title')}
              </h2>
              <p>{t('terms.general.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t('terms.contact.title')}
              </h2>
              <p>
                {t('terms.contact.content')}{' '}
                <a 
                  href="mailto:contact@stratumpr.com" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  contact@stratumpr.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

