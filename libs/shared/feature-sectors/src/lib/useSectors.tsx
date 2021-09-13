import { SectorsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import QUERY_KEYS from './api/queryKeys';

export function useSectors() {
  const sectorsApi = useApiFactory(SectorsApiFactory);
  const {
    query: { data, isLoading, isSuccess, error },
  } = useQueryFetch(QUERY_KEYS.SECTORS, sectorsApi.apiSectorGet);
  return { data: data?.data, isLoading, isSuccess, error };
}

export function useTeasers() {
  const sectorsApi = useApiFactory(SectorsApiFactory);
  const {
    query: { data, isLoading, isSuccess, error },
  } = useQueryFetch('sectorTeasers', sectorsApi.apiSectorTeasersGet);
  return { data: data?.data, isLoading, isSuccess, error };
}
