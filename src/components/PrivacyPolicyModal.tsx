
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b shrink-0">
          <DialogTitle className="font-telegraf font-bold text-xl sm:text-2xl text-primary">
            {t('privacy.policy.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6 min-h-0">
          <div className="prose prose-lg max-w-none font-telegraf">
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('privacy.policy.intro')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.types.title')}
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="text-gray-700">{t('privacy.policy.types.contact')}</li>
              <li className="text-gray-700">{t('privacy.policy.types.usage')}</li>
            </ul>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.use.title')}
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="text-gray-700">{t('privacy.policy.use.provide')}</li>
              <li className="text-gray-700">{t('privacy.policy.use.communicate')}</li>
              <li className="text-gray-700">{t('privacy.policy.use.personalize')}</li>
              <li className="text-gray-700">{t('privacy.policy.use.comply')}</li>
            </ul>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.sharing.title')}
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="text-gray-700">{t('privacy.policy.sharing.providers')}</li>
              <li className="text-gray-700">{t('privacy.policy.sharing.legal')}</li>
            </ul>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.protection.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('privacy.policy.protection.measures')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.changes.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('privacy.policy.changes.updates')}
            </p>
            
            <h3 className="font-telegraf font-semibold text-lg text-primary mb-3">
              {t('privacy.policy.contact.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.policy.contact.info')}{' '}
              <a 
                href="mailto:contact@stratumpr.com" 
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                contact@stratumpr.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
