import { ReviewsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export const useReview = (reviewId: string) => {
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { query } = useQueryFetch(['reviews', reviewId], () =>
    reviewsApi.apiReviewReviewGet(reviewId)
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useReviewIds = (reviewId: string) => {
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { query } = useQueryFetch(['reviewIds', reviewId], () =>
    reviewsApi.apiReviewReviewIdListGet(reviewId)
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};
