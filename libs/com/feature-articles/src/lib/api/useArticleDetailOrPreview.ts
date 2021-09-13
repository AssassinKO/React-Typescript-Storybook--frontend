import { ArticlesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import QUERY_KEYS from './queryKeys';

export const useArticleDetailOrPreview = (slug: string | undefined, uid: string | undefined) => {
  const articlesApi = useApiFactory(ArticlesApiFactory);

  return useQueryFetch([QUERY_KEYS.ARTICLE, slug || uid], () =>
    slug ? articlesApi.apiArticleArticleGet(slug) : articlesApi.apiArticleUidPreviewGet(uid)
  );
};
