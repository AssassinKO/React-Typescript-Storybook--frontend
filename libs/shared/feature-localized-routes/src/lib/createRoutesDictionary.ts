import { Language } from '@homeproved/shared/feature-i18n';

type Destination = string;
type Source = string;
type LocalizedRoute = {
  source: Source;
  destination: Destination;
};
type LocalizedRoutes = Record<Language, LocalizedRoute[]>;

export type RoutesDictionary = Record<Destination, Partial<Record<Language, Source>>>;

export const createRoutesDictionary = (routes: LocalizedRoutes): RoutesDictionary => {
  const result: RoutesDictionary = {};

  Object.entries(routes).forEach((localeRoutes) => {
    localeRoutes[1].forEach((route) => {
      if (!result[route.destination]) result[route.destination] = {};
      result[route.destination][localeRoutes[0]] = route.source;
    });
  });

  return result;
};
