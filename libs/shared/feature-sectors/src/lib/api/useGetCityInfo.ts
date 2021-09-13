import { useQueryFetch } from '@homeproved/shared/data-access';
import { getCityInfo } from './prefetch';
import { CityInfoData, CitySlug } from '../types';

export const useGetCityInfo = (citySlug: CitySlug) => {
  const api = getCityInfo(citySlug);
  const { query } = useQueryFetch(api.key, async () => await api.fn(null, false), {
    options: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  });

  return {
    data: query.data as CityInfoData,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};
