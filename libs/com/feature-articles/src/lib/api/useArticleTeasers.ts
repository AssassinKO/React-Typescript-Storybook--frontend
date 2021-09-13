import { SectorsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import QUERY_KEYS from './queryKeys';

export const useArticleTeasers = () => {
  const articleTeasersApi = useApiFactory(SectorsApiFactory);
  const { query } = useQueryFetch(QUERY_KEYS.ARTICLE_TEASERS, () =>
    articleTeasersApi.apiSectorTeasersGet()
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};
