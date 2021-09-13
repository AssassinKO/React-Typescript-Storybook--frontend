import { ApiConfig, apiFactory, SectorsApiFactory } from '@homeproved/shared/data-access';
import { Language } from '@homeproved/shared/feature-i18n';
import QUERY_KEYS from './queryKeys';
import axios from 'axios';

export const getSectors = (locale: Language) => {
  const api = apiFactory(locale, SectorsApiFactory);

  return {
    key: QUERY_KEYS.SECTORS,
    fn: async () => {
      const response = await api.apiSectorGet();
      return response.data;
    },
  };
};

export const getCityInfo = (citySlug?: string) => {
  if (!citySlug) return null;

  return {
    key: [QUERY_KEYS.CITY_INFO, citySlug],
    fn: async (context: unknown, extractData = true) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_COM_URL}/api/city-info/${citySlug}`
      );
      return extractData ? response.data : response;
    },
  };
};

export const subSector = (locale: Language, citySlug?: string): ApiConfig => [
  getSectors(locale),
  getCityInfo(citySlug),
];
