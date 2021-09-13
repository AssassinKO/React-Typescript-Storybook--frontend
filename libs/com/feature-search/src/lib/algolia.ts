import algoliasearch from 'algoliasearch/lite';
import keyBy from 'lodash/fp/keyBy';

type Hit = {
  objectID: string;
};
export type CompanyHit = Hit & {
  id: number;
  name: string;
  slug: string;
};

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export const ALGOLIA_INDEX = {
  COMPANIES: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_COMPANIES || 'staging-companies',
  SECTORS: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_SECTORS || 'staging-sectors',
  ARTICLES: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ARTICLES || 'staging-articles',
} as const;

type AlgoliaIndex = typeof ALGOLIA_INDEX[keyof typeof ALGOLIA_INDEX];

export const searchableAttributes: Record<AlgoliaIndex, (language: string) => string> = {
  [ALGOLIA_INDEX.COMPANIES]: (language: string) => `name,${language}.sectors.lvl1`,
  [ALGOLIA_INDEX.SECTORS]: (language: string) => `${language}.name`,
  [ALGOLIA_INDEX.ARTICLES]: (/* language: string */) => `title`,
};

export const sortedIndices: AlgoliaIndex[] = [
  ALGOLIA_INDEX.COMPANIES,
  ALGOLIA_INDEX.SECTORS,
  ALGOLIA_INDEX.ARTICLES,
];

export const keyByIndex = keyBy('index');
