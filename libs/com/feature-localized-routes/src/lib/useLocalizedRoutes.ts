import {
  createGetPathWithLanguage,
  createRoutesDictionary,
  createUseLocalizedRoutes,
} from '@homeproved/shared/feature-localized-routes';

export const routes = createRoutesDictionary({
  nl: require('./nl.json'),
  fr: require('./fr.json'),
  en: require('./en.json'),
});

export const useLocalizedRoutes = createUseLocalizedRoutes(routes);

export const getPathWithLanguage = createGetPathWithLanguage(routes);
