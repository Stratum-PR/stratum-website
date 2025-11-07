import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ open, onOpenChange }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { subscribeToBlog } = await import('@/services/resend');
      
      await subscribeToBlog(email, language as 'en' | 'es');
      
      setStatus('success');
      setMessage(t('comingSoon.newsletter.success'));
      setEmail('');
      
      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onOpenChange(false);
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      const errorMessage = error?.message || t('comingSoon.newsletter.error');
      setMessage(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-telegraf font-bold text-2xl text-primary">
            {t('comingSoon.title')}
          </DialogTitle>
          <DialogDescription className="font-telegraf text-gray-600 pt-2">
            {t('comingSoon.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {status === 'success' ? (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="font-telegraf text-sm text-green-800">{message}</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="font-telegraf text-sm text-red-800">{message}</p>
            </div>
          ) : (
            <>
              <p className="font-telegraf text-sm text-gray-600 mb-4">
                {t('comingSoon.newsletter.description')}
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder={t('comingSoon.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="font-telegraf"
                />
                <Button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold"
                >
                  {status === 'loading' ? t('comingSoon.newsletter.subscribing') : t('comingSoon.newsletter.button')}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

