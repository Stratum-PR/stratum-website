
import { enTranslations } from './en';
import { esTranslations } from './es';
import type { Language } from '@/types/language';

export const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  es: esTranslations,
};
