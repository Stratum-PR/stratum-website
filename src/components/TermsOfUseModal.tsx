
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfUseModal = ({ isOpen, onClose }: TermsOfUseModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b shrink-0">
          <DialogTitle className="font-telegraf font-bold text-xl sm:text-2xl text-primary">
            {t('terms.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6 min-h-0">
          <div className="prose prose-lg max-w-none font-telegraf">
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.intro')}
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6 font-semibold uppercase">
              {t('terms.important')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.authorized.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms.authorized.content')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.authorized.additional')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.privacy.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.privacy.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.ownership.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms.ownership.content')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms.ownership.copyright')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.ownership.trademarks')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.disclaimers.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.disclaimers.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.liability.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.liability.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.conduct.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms.conduct.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-gray-700">{t('terms.conduct.item1')}</li>
              <li className="text-gray-700">{t('terms.conduct.item2')}</li>
              <li className="text-gray-700">{t('terms.conduct.item3')}</li>
              <li className="text-gray-700">{t('terms.conduct.item4')}</li>
              <li className="text-gray-700">{t('terms.conduct.item5')}</li>
              <li className="text-gray-700">{t('terms.conduct.item6')}</li>
              <li className="text-gray-700">{t('terms.conduct.item7')}</li>
              <li className="text-gray-700">{t('terms.conduct.item8')}</li>
              <li className="text-gray-700">{t('terms.conduct.item9')}</li>
              <li className="text-gray-700">{t('terms.conduct.item10')}</li>
              <li className="text-gray-700">{t('terms.conduct.item11')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.conduct.enforcement')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.indemnity.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.indemnity.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.links.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.links.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.california.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.california.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.general.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.general.content')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('terms.contact.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('terms.contact.content')}{' '}
              <a 
                href="mailto:contact@stratumpr.com" 
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                contact@stratumpr.com
              </a>
            </p>
            
            <p className="text-gray-700 leading-relaxed text-center font-medium">
              {t('terms.copyright')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
