import { CompaniesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import { useQueryClient } from 'react-query';

export const useCompany = (idOrSlug?: string, forceReFetch = false) => {
  const companiesApi = useApiFactory(CompaniesApiFactory);
  // because id is passed as a prop and use to enable the query, we check if the data exists in cache, to avoid refetching on every render
  const cachedQueryData = useQueryClient().getQueryData(['company', idOrSlug]);
  const {
    query: { data, isLoading, isSuccess, error, refetch },
  } = useQueryFetch(['company', idOrSlug], () => companiesApi.apiCompaniesCompanyGet(idOrSlug), {
    options: {
      enabled: idOrSlug != null && (!cachedQueryData || forceReFetch),
    },
  });

  return { company: data?.data, isLoading, isSuccess, error, refetch };
};
