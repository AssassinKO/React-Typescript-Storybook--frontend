import { PagesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import { BasicPageUID } from '../types';

export const useFetchBasicPage = (uid: BasicPageUID) => {
  const api = useApiFactory(PagesApiFactory);

  return useQueryFetch(
    uid,
    () => api.apiBasicPageBasicPageGet(uid) /*{
    options: { enabled: false },
  }*/
  );
};
