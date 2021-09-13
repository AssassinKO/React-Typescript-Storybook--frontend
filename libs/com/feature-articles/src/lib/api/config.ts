export type QueryParams = {
  date?: 'asc' | 'desc' | '';
  page?: number;
  perPage?: number;
};

export const articleListPagingConfig: QueryParams = {
  date: 'desc',
  page: 1,
  perPage: 12,
};
