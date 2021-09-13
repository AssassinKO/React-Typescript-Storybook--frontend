import { ArticlesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import QUERY_KEYS from './queryKeys';

export const useArticles = () => {
  const articlesApi = useApiFactory(ArticlesApiFactory);
  const { query } = useQueryFetch(QUERY_KEYS.ARTICLES, () => articlesApi.apiArticleGet());
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export const useArticlesBySector = (
  sectorSlug: string,
  date?: string,
  perPage?: number,
  page?: number,
  config?: unknown
) => {
  const articlesApi = useApiFactory(ArticlesApiFactory);
  const { query } = useQueryFetch(
    [QUERY_KEYS.ARTICLES_BY_SECTOR, sectorSlug],
    () => articlesApi.apiSectorSectorArticlesGet(sectorSlug, date, perPage, page),
    config
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};

export const useArticle = (slug: string) => {
  const articlesApi = useApiFactory(ArticlesApiFactory);
  const { query } = useQueryFetch('article', () => articlesApi.apiArticleArticleGet(slug));
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export const useMostReadArticles = () => {
  const articlesApi = useApiFactory(ArticlesApiFactory);
  const { query } = useQueryFetch('mostReadArticles', () =>
    articlesApi.apiArticleMostReadGet('desc', 3)
  );
  return {
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};
