import { PlansApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

export function usePlans() {
  const plansApi = useApiFactory(PlansApiFactory);
  const {
    query: { data, isLoading, error },
  } = useQueryFetch('plans', plansApi.apiPlansGet);

  return { plans: data?.data, isLoading, error };
}
