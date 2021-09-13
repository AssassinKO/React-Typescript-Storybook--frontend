import { ArticlesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export const useArticlesBySector = (slug: string) => {
  const articlesApi = useApiFactory(ArticlesApiFactory);
  const { query } = useQueryFetch(['relatedArticlesBySector', slug], () =>
    articlesApi.apiSectorSectorArticlesGet(slug, 'desc', 4)
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};
