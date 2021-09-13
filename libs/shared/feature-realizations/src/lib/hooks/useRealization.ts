import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

export const useRealization = (id?: string) => {
  const realisationsApi = useApiFactory(RealisationApiFactory);
  const {
    query: { data, isLoading, isSuccess, error },
  } = useQueryFetch(['realization', id], () => realisationsApi.apiRealisationRealisationGet(id), {
    options: {
      enabled: id != null,
      refetchOnWindowFocus: false,
    },
  });

  return { realization: data?.data, isLoading, isSuccess, error };
};
