import axios from 'axios';
import { Language } from '@homeproved/shared/feature-i18n';
import { CompanyResponse, DynamicPaths, Url } from './types';
import omit from 'lodash/omit';
import { routes } from '@homeproved/com/feature-localized-routes';
import { blackList } from './blacklist';

/**
 * Just a simple Axios wrapper
 * @param url
 */
export const fetchData = async <T>(url: string) => {
  try {
    const response = await axios.get<{ data: T }>(url);
    return response.data.data;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

/**
 * Generate all localized tuples for the given data
 *
 * @param localizedRoute { nl: '/nl/route/:id', en: '/en/english-route/:id', fr: '/fr/french-route/:id' }
 * @param data Any array
 * @param replacerFn A function to replace the dynamic part of the url with actual data
 */
export const generateAll = <T>(
  localizedRoute: Partial<Record<Language, string>>,
  data: T[],
  replacerFn: (path: string, item: T, locale: Language) => string
): [Language, Url][][] => {
  return data.map((item) => {
    const entries = Object.entries(localizedRoute);
    return entries.map(([locale, path]) => {
      return [locale as Language, replacerFn(path, item, locale as Language)];
    });
  });
};

/**
 * Wrapper for generateAll, replaces :id in the url with every company id
 *
 * @param companies
 * @param localizedRoute { nl: '/nl/route/:id', en: '/en/english-route/:id', fr: '/fr/french-route/:id' }
 */
export const generateAllForCompany = (
  companies: CompanyResponse,
  localizedRoute: Partial<Record<Language, string>>
) => {
  return generateAll(localizedRoute, companies, (path, company, locale) => {
    return path.replace(':slug', company.slug);
  });
};

type Config = {
  filter?: ([path, localizedRoute]) => boolean;
};
/**
 * Build actual XML tags for every route
 *
 * @param basePath
 * @param dynamicPaths
 * @param config
 */
export const buildSitemapUrls = async (
  basePath: string,
  dynamicPaths: DynamicPaths,
  config: Config = { filter: () => true }
): Promise<string[]> => {
  let allUrls = [];

  for (const [path, localizedRoute] of Object.entries(omit(routes, blackList)).filter(
    config.filter
  )) {
    const paths = dynamicPaths[path]
      ? dynamicPaths[path].getStaticPaths(localizedRoute)
      : [Object.entries(localizedRoute) as [Language, Url][]];

    allUrls = allUrls.concat(
      paths.map((entries) => {
        const firstPath = entries[0][1];

        // We don't want to index dynamic paths if they aren't handled by dynamicPaths[path].getPaths
        if (firstPath.includes(':')) {
          return '';
        }

        return `
            <url>
              <loc>${basePath}${firstPath}</loc>
              ${entries
                .map(
                  ([lang, href]) => `<xhtml:link
                     rel="alternate"
                     hreflang="${lang}"
                     href="${basePath}${href}" />`
                )
                .join('')}

               <lastmod>${new Date().toISOString()}</lastmod>
               <changefreq>weekly</changefreq>
               <priority>1.0</priority>
            </url>
        `;
      })
    );
  }

  return allUrls;
};
