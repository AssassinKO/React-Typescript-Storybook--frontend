import { ReviewsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export const useProCons = () => {
  const proConsApi = useApiFactory(ReviewsApiFactory);
  const { query } = useQueryFetch('proCons', proConsApi.apiProConPointsGet);

  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    refetch: query.refetch,
  };
};
