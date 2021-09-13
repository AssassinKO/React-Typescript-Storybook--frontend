import flatten from 'lodash/flatten';
import { buildSitemapUrls, fetchData, generateAll } from '../util';
import { CityData, DynamicPaths, SectorId, SectorsResponse } from '../types';
import { createCitySlug } from '@homeproved/shared/util';

let sectorDictionary: Record<SectorId, SectorsResponse[number]> = {};

const data: { sectors: SectorsResponse } = {
  sectors: [],
};

export const getSectorSitemap = async (basePath: string, cityData: CityData) => {
  await prefetchData();
  const allUrls = await buildSitemapUrls(basePath, getDynamicPaths(cityData), {
    filter: ([path]) => path.includes('sector'),
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${allUrls.join('')}
    </urlset>
  `;

  return sitemap;
};

const prefetchData = async () => {
  data.sectors = await fetchData<SectorsResponse>(
    `${process.env.NEXT_PUBLIC_NX_API_ROUTE}/sitemap/sectors`
  );

  sectorDictionary = data.sectors.reduce((prev, localizedSectors) => {
    const id = localizedSectors[Object.keys(localizedSectors)[0]]?.id;
    return {
      ...prev,
      [id]: localizedSectors,
    };
  }, {});
};

const getDynamicPaths = (cityData: CityData): DynamicPaths => ({
  '/sectors/:sector/:subsector': {
    getStaticPaths: (localizedRoute) => {
      const subSectors = data.sectors.filter((sector) =>
        Boolean(sector[Object.keys(sector)[0]].parent_id)
      );

      return generateAll(localizedRoute, subSectors, (path, subSector, locale) => {
        const sector = sectorDictionary[subSector[locale].parent_id];
        return path
          .replace(':subsector', subSector[locale].slug)
          .replace(':sector', sector[locale].slug);
      });
    },
  },
  '/locality/:locality/:sector': {
    getStaticPaths: (localizedRoute) => {
      const sectors = data.sectors.filter(
        (sector) => sector[Object.keys(sector)[0]].parent_id === null
      );

      return flatten(
        Object.entries(cityData).map(([cityId, city]) => {
          return generateAll(localizedRoute, sectors, (path, sector, locale) => {
            const localizedCityName = (
              city.gemeentenamen.find((c) => c.taal === locale) || city.gemeentenamen[0]
            ).spelling;

            return path
              .replace(':locality', createCitySlug(localizedCityName))
              .replace(':sector', sector[locale].slug);
          });
        })
      );
    },
  },
});
