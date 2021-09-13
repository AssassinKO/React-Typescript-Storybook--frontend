import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useJwt, useUser } from '@homeproved/shared-feature-auth-codana';

const isServer = () => typeof window === 'undefined';

export type PageWithAuthorizationProps = {
  authenticate?: boolean;
  redirectAuthenticatedTo?: string;
  redirectUnAuthenticatedTo?: string;
};

type Props = PageWithAuthorizationProps & {
  defaultRedirectUnAuthenticatedTo: string;
};

export const PageAuthenticationWrapper: FC<Props> = ({
  authenticate = false,
  redirectAuthenticatedTo,
  redirectUnAuthenticatedTo,
  defaultRedirectUnAuthenticatedTo,
  children,
}) => {
  const jwt = useJwt();
  const user = useUser();
  const router = useRouter();

  const ssr = isServer();
  const redirectNotAuthenticated = authenticate && !jwt;
  const redirectAuthenticated = !authenticate && Boolean(redirectAuthenticatedTo) && jwt && user;

  useEffect(() => {
    if (redirectNotAuthenticated && !ssr) {
      router.push(redirectUnAuthenticatedTo || defaultRedirectUnAuthenticatedTo).then();
    }
    if (redirectAuthenticated && !ssr) {
      router.push(redirectAuthenticatedTo).then();
    }
  }, [
    defaultRedirectUnAuthenticatedTo,
    redirectAuthenticated,
    redirectAuthenticatedTo,
    redirectNotAuthenticated,
    redirectUnAuthenticatedTo,
    router,
    ssr,
  ]);

  if (redirectAuthenticated || redirectNotAuthenticated) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
