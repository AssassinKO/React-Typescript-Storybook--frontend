import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

export const useRealizations = (company) => {
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch(
    'moreRealizationsOf',
    () => realizationsApi.apiCompaniesCompanyRealisationsGet(company),
    {
      options: {
        enabled: !!company,
      },
    }
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export const useMostReadRealizations = () => {
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch('mostReadRealizations', () =>
    realizationsApi.apiRealisationMostReadGet('desc', 4)
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};
