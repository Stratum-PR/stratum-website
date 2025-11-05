import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const BlogSubscription = () => {
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
      setMessage(t('blog.subscribe.success'));
      setEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      setStatus('error');
      // Show more detailed error message
      const errorMessage = error?.message || t('blog.subscribe.error');
      setMessage(errorMessage);
      
      // Log detailed error for debugging
      if (import.meta.env.DEV) {
        console.error('Detailed subscription error:', {
          error,
          message: error?.message,
          stack: error?.stack
        });
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Header: Icon and text */}
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-telegraf font-bold text-lg sm:text-xl text-primary">
                {t('blog.subscribe.title')}
              </h3>
              <p className="font-telegraf text-sm text-gray-600">
                {t('blog.subscribe.description')}
              </p>
            </div>
          </div>

          {/* Form on second line */}
          <div className="w-full">
            {status === 'success' ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <p className="font-telegraf text-sm text-green-800">{message}</p>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="font-telegraf text-sm text-red-800">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  type="email"
                  placeholder={t('blog.subscribe.email.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="flex-1 font-telegraf w-full sm:w-auto"
                />
                <Button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-6 whitespace-nowrap w-full sm:w-auto"
                >
                  {status === 'loading' ? 'Subscribing...' : t('blog.subscribe.button')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

