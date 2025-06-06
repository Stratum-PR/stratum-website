
import en from './en';
import es from './es';
import type { Language } from '@/types/language';

export const translations: Record<Language, Record<string, string>> = {
  en: en,
  es: es,
};

export { en as enTranslations, es as esTranslations };
