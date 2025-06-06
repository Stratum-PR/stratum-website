
import { enTranslations } from './en';
import { esTranslations } from './es';
import type { Language } from '@/types/language';

export const translations: Record<Language, any> = {
  en: enTranslations,
  es: esTranslations,
};

export { enTranslations, esTranslations };
