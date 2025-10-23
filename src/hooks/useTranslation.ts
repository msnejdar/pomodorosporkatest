import { translations, Language, TranslationKey } from '../utils/translations';

export function useTranslation(language: Language = 'en') {
  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return { t, language };
}
