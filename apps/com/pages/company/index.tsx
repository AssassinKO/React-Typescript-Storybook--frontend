import { useEffect } from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();

  useEffect(() => {
    router.push(getPath('/')).then();
  }, [router, getPath]);

  return null;
};

export default Index;
