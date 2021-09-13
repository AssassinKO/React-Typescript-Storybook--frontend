import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './types';
import config from './config.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const initI18n = (
  translations: Record<string, unknown>,
  language = config.defaultLanguage as Language
) => {
  const commonConfiguration = {
    debug: false,
    fallbackLng: config.defaultLanguage,
    supportedLngs: config.supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        'path',
        'querystring',
        'localStorage',
        'sessionStorage',
        'cookie',
        'htmlTag',
        'navigator',
        'subdomain',
      ],
    },
  };

  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...commonConfiguration,
      resources: {
        [language]: {
          translation: translations,
        },
      },
    });
};

export default initI18n;
