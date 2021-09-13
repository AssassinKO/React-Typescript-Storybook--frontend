const config = require('../../libs/shared/feature-i18n/src/lib/config.json');

module.exports = {
  i18n: {
    defaultLocale: config.defaultLanguage,
    locales: config.supportedLanguages,
    localeDetection: config.languageDetection,
  },
};
