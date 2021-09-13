import { buildSitemapUrls, fetchData, generateAll, generateAllForCompany } from '../util';
import { CompanyResponse, DynamicPaths } from '../types';
import flatten from 'lodash/flatten';

const data: { companies: CompanyResponse } = {
  companies: [],
};

export const getCompanySitemap = async (basePath: string) => {
  await prefetchData();
  const allUrls = await buildSitemapUrls(basePath, dynamicPaths, {
    filter: ([path]) => path.includes('company'),
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allUrls.join('')}
</urlset>
  `;

  return sitemap;
};

const prefetchData = async () => {
  data.companies = await fetchData<CompanyResponse>(
    `${process.env.NEXT_PUBLIC_NX_API_ROUTE}/sitemap/companies`
  );
  console.log(data.companies);
};

const dynamicPaths: DynamicPaths = {
  '/write-review/:slug': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug/reviews': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug/about': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug/realizations': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug/contact': {
    getStaticPaths: (localizedRoute) => generateAllForCompany(data.companies, localizedRoute),
  },
  '/company/:slug/realization/:rslug': {
    getStaticPaths: (localizedRoute) => {
      return flatten(
        data.companies
          .filter((c) => c.realisations.length)
          .map((company) => {
            return generateAll(
              localizedRoute,
              company.realisations,
              (path, realisation, locale) => {
                return path
                  .replace(':slug', company.slug)
                  .replace(':rslug', realisation[locale].slug);
              }
            );
          })
      );
    },
  },
};
