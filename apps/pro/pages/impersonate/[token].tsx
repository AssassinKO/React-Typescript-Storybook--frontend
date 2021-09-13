import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { ImpersonatePage } from '@homeproved/shared/feature-impersonate';

export const Token: PageWithAuthorization = () => {
  const router = useRouter();
  const { token } = router.query;
  const { getPath } = useLocalizedRoutes();

  return <ImpersonatePage token={token as string} getPath={getPath} />;
};

Token.authenticate = false;
Token.redirectAuthenticatedTo = '/dashboard';

export default Token;
