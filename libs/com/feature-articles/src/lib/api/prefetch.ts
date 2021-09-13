import { Language } from '@homeproved/shared/feature-i18n';
import {
  ApiConfig,
  apiFactory,
  ArticlesApiFactory,
  SectorsApiFactory,
} from '@homeproved/shared/data-access';
import QUERY_KEYS from './queryKeys';
import { prefetch } from '@homeproved/shared/feature-sectors';
import { articleListPagingConfig } from './config';

const getArticles = (locale: Language) => {
  const api = apiFactory(locale, ArticlesApiFactory);

  return {
    key: QUERY_KEYS.ARTICLES,
    fn: async () => {
      const response = await api.apiArticleGet();
      return response.data;
    },
  };
};

const getArticleTeasers = (locale: Language) => {
  const api = apiFactory(locale, SectorsApiFactory);

  return {
    key: '',
    fn: async () => {
      const response = await api.apiSectorTeasersGet();
      return response.data;
    },
  };
};

const getArticle = (locale: Language, articleSlug: string) => {
  const api = apiFactory(locale, ArticlesApiFactory);

  return {
    key: [QUERY_KEYS.ARTICLE, articleSlug],
    fn: async () => {
      const response = await api.apiArticleArticleGet(articleSlug);
      return response.data;
    },
  };
};

const getArticlePreview = (locale: Language, uid: string) => {
  const api = apiFactory(locale, ArticlesApiFactory);

  return {
    key: [QUERY_KEYS.ARTICLE, uid],
    fn: async () => {
      const response = await api.apiArticleUidPreviewGet(uid);
      return response.data;
    },
  };
};

const getArticlesForSector = (locale: Language, sectorSlug: string) => {
  const api = apiFactory(locale, ArticlesApiFactory);

  return {
    key: [QUERY_KEYS.ARTICLES_BY_SECTOR, sectorSlug],
    fn: async () => {
      const response = await api.apiSectorSectorArticlesGet(
        sectorSlug,
        articleListPagingConfig.date,
        articleListPagingConfig.perPage,
        articleListPagingConfig.page
      );
      return response.data;
    },
  };
};

export const housingAdviceForSector = (locale: Language, sectorSlug: string): ApiConfig => [
  getArticlesForSector(locale, sectorSlug),
  prefetch.getSectors(locale),
];

export const housingAdvice = (locale: Language): ApiConfig => [
  getArticles(locale),
  getArticleTeasers(locale),
  prefetch.getSectors(locale),
];

export const housingAdviceArticle = (locale: Language, articleSlug: string): ApiConfig => [
  getArticle(locale, articleSlug),
];

export const housingAdvicePreview = (locale: Language, uid: string): ApiConfig => [
  getArticlePreview(locale, uid),
];
