import { ReviewsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export const useReviewsLatestGet = (sectorSlug, location) => {
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { query } = useQueryFetch(['reviews', sectorSlug, location], () => {
    if (sectorSlug == null) {
      return reviewsApi.apiReviewLatestGet();
    }
    if (location == null) {
      return reviewsApi.apiSectorSectorReviewsGet(sectorSlug, 'desc', 20);
    }
    return reviewsApi.apiSectorSectorReviewsGet(sectorSlug, 'desc', 20, location.lat, location.lng);
  });
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};
