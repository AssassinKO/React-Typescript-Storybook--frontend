import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ApiConfig } from '../../types';

export const getDehydratedState = async (prefetchConfig: ApiConfig) => {
  const queryClient = new QueryClient();

  const promises = prefetchConfig.filter(Boolean).map(({ key, fn }) => {
    return queryClient.prefetchQuery(key, fn);
  });

  await Promise.all(promises);

  return dehydrate(queryClient);
};
