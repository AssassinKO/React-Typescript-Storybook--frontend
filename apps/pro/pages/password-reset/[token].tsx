import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PasswordResetPage } from "@homeproved/pro/feature-password-reset";
import { useRouter } from "next/router";
import { useLocalizedRoutes } from "@homeproved/pro/feature-localized-routes";

export const Token: PageWithAuthorization = () => {
  const router = useRouter();
  const { token } = router.query;
  const { getPath } = useLocalizedRoutes();

  if (!token) {
    router.push(getPath('/login')).then();
  }

  return <PasswordResetPage token={token as string} />;
}

Token.authenticate = false;
Token.redirectAuthenticatedTo = '/reviews';

export default Token;
