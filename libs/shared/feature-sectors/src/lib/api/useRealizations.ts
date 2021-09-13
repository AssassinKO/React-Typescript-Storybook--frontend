import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

export const useRealizationsBySectorAndLocality = (slug: string, location) => {
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch('relatedRealizationsBySectorAndLocality', () =>
    realizationsApi.apiSectorSectorRealisationsGet(slug, 'desc', 4, location?.lat, location?.lng, {
      options: {
        enabled: !!location,
      },
    })
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};
