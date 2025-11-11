import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const EmailPreferences = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const email = searchParams.get('email') || '';
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'es'>('en');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useSEO({
    title: language === 'es' ? 'Preferencias de Correo - Stratum PR' : 'Email Preferences - Stratum PR',
    description: language === 'es' 
      ? 'Cambiar tus preferencias de idioma para correos de Stratum PR'
      : 'Change your language preferences for Stratum PR emails',
    canonical: 'https://www.stratumpr.com/email-preferences',
  });

  useEffect(() => {
    if (!email) {
      setStatus('error');
      setMessage(language === 'es' 
        ? 'No se proporcionó una dirección de correo electrónico.'
        : 'No email address provided.');
    }
  }, [email, language]);

  const handleSave = async () => {
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      // Call API to update language preference
      const response = await fetch('/api/email-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          language: preferredLanguage 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update preferences');
      }

      setStatus('success');
      setMessage(language === 'es'
        ? 'Tus preferencias de idioma han sido actualizadas exitosamente.'
        : 'Your language preferences have been successfully updated.');
    } catch (error: any) {
      console.error('Preferences update error:', error);
      setStatus('error');
      setMessage(error?.message || (language === 'es'
        ? 'Ocurrió un error al actualizar las preferencias. Por favor, intenta de nuevo.'
        : 'An error occurred while updating preferences. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[50px] flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-telegraf">
            {language === 'es' ? 'Preferencias de Correo' : 'Email Preferences'}
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
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="font-telegraf text-sm text-gray-600 mb-2">
                  {language === 'es' ? 'Correo electrónico:' : 'Email:'}
                </p>
                <p className="font-telegraf font-semibold text-gray-900">{email}</p>
              </div>
              
              <div>
                <label className="font-telegraf text-sm font-semibold text-gray-700 mb-2 block">
                  {language === 'es' ? 'Idioma preferido para correos:' : 'Preferred language for emails:'}
                </label>
                <Select value={preferredLanguage} onValueChange={(value: 'en' | 'es') => setPreferredLanguage(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSave} 
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading'
                  ? (language === 'es' ? 'Guardando...' : 'Saving...')
                  : (language === 'es' ? 'Guardar preferencias' : 'Save preferences')}
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

export default EmailPreferences;

