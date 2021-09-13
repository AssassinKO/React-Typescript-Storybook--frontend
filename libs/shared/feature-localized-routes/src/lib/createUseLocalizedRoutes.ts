import { Language, useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { useRouter } from 'next/router';
import { RoutesDictionary } from './createRoutesDictionary';

type SourceRouteName = string;
type DestinationRouteName = string;

export type RouteParams = {
  [param: string]: string;
};

export type GetPathFunction = (
  destination: DestinationRouteName,
  replaceParams?: RouteParams,
  locale?: Language
) => SourceRouteName;

/*
  Language switcher sends router.pathname to getPath function, this causes routeParams to have a different format
  (eg. company/[id]/reviews vs company/:id/reviews)
  The route should thus be processed in order to avoid unfound destination routes.
*/
const processRoute = (route: string): string => route.replace(/\[/g, ':').replace(/\]/g, '');

const createGetPath = (
  localizedRoutes: RoutesDictionary,
  currentLanguage: Language,
  currentPathname?: string
) => {
  const getPath: GetPathFunction = (
    destination: DestinationRouteName,
    replaceParams: RouteParams = {},
    locale?: Language
  ): SourceRouteName => {
    const processedDestination = processRoute(destination);

    if (localizedRoutes[processedDestination]?.[locale || currentLanguage]) {
      let sourceRoute = localizedRoutes[processedDestination][locale || currentLanguage];
      Object.entries(replaceParams).forEach(
        (replaceParam) =>
          (sourceRoute = sourceRoute.replace(`:${replaceParam[0]}`, replaceParam[1]))
      );
      return sourceRoute;
    } else {
      if (process.env.NODE_ENV === 'development')
        console.warn(
          `Warning: ${locale || currentLanguage} path not found for route ${processedDestination}`
        );
      return processRoute(currentPathname);
    }
  };

  return getPath;
};

export const createGetPathWithLanguage = (localizedRoutes: RoutesDictionary) => (
  language: Language,
  currentPathname?: string
) => createGetPath(localizedRoutes, language, currentPathname);

export const createUseLocalizedRoutes = (localizedRoutes: RoutesDictionary) => () => {
  const currentLanguage = useCurrentLanguage();
  const router = useRouter();

  return { getPath: createGetPathWithLanguage(localizedRoutes)(currentLanguage, router.pathname) };
};

export default createUseLocalizedRoutes;
