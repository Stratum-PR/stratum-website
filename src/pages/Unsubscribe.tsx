import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const email = searchParams.get('email') || '';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useSEO({
    title: language === 'es' ? 'Cancelar Suscripción - Stratum PR' : 'Unsubscribe - Stratum PR',
    description: language === 'es' 
      ? 'Cancelar tu suscripción al boletín de Stratum PR'
      : 'Unsubscribe from Stratum PR newsletter',
    canonical: 'https://www.stratumpr.com/unsubscribe',
  });

  useEffect(() => {
    if (!email) {
      setStatus('error');
      setMessage(language === 'es' 
        ? 'No se proporcionó una dirección de correo electrónico.'
        : 'No email address provided.');
    }
  }, [email, language]);

  const handleUnsubscribe = async () => {
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      // Call API to unsubscribe
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unsubscribe');
      }

      setStatus('success');
      setMessage(language === 'es'
        ? 'Te has desuscrito exitosamente. Ya no recibirás más correos de nuestro boletín.'
        : 'You have been successfully unsubscribed. You will no longer receive newsletter emails from us.');
    } catch (error: any) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
      setMessage(error?.message || (language === 'es'
        ? 'Ocurrió un error al cancelar la suscripción. Por favor, intenta de nuevo.'
        : 'An error occurred while unsubscribing. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[50px] flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-telegraf">
            {language === 'es' ? 'Cancelar Suscripción' : 'Unsubscribe'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'success' ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <p className="font-telegraf text-gray-700">{message}</p>
              <Button onClick={() => navigate('/')} className="w-full">
                {language === 'es' ? 'Volver al inicio' : 'Return to home'}
              </Button>
            </div>
          ) : status === 'error' ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <p className="font-telegraf text-red-700">{message}</p>
              {email && (
                <Button onClick={handleUnsubscribe} className="w-full">
                  {language === 'es' ? 'Intentar de nuevo' : 'Try again'}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="font-telegraf text-gray-700 text-center">
                {language === 'es'
                  ? `¿Estás seguro de que deseas cancelar tu suscripción para ${email}?`
                  : `Are you sure you want to unsubscribe ${email}?`}
              </p>
              <p className="font-telegraf text-sm text-gray-600 text-center">
                {language === 'es'
                  ? 'Ya no recibirás actualizaciones de nuestro boletín, artículos nuevos ni contenido educativo.'
                  : 'You will no longer receive updates from our newsletter, new articles, or educational content.'}
              </p>
              <Button 
                onClick={handleUnsubscribe} 
                disabled={status === 'loading'}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {status === 'loading'
                  ? (language === 'es' ? 'Cancelando...' : 'Unsubscribing...')
                  : (language === 'es' ? 'Sí, cancelar suscripción' : 'Yes, unsubscribe')}
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="w-full"
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Unsubscribe;

