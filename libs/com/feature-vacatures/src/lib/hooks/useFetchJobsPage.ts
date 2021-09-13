import { JobsApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export const useFetchJobsPage = (uid: string) => {
  const api = useApiFactory(JobsApiFactory);

  return useQueryFetch(uid, () => api.apiJobPageJobPageGet(uid));
};

export const useFetchJobsPages = () => {
  const api = useApiFactory(JobsApiFactory);

  return useQueryFetch('job-page', api.apiJobPageGet);
};
