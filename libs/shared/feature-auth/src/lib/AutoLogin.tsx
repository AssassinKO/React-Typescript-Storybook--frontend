import React, { FC, useEffect } from 'react';
import { useApiFactory, useQueryFetch, UsersApiFactory } from '@homeproved/shared/data-access';
import { useAuthContext, useLogout } from '@homeproved/shared-feature-auth-codana';
import { AxiosError } from 'axios';

type Props = {
  loader?: React.ReactNode;
};

export const AutoLogin: FC<Props> = ({ loader, children }) => {
  const { setUser } = useAuthContext();
  const usersApi = useApiFactory(UsersApiFactory);
  const logout = useLogout();
  const { query } = useQueryFetch('me', usersApi.apiAuthMeGet, { options: { retry: false } });

  const notAuthenticated = (query.error as AxiosError)?.response?.status === 401;

  useEffect(() => {
    if (query.isSuccess) setUser(query.data.data);
    if (notAuthenticated) logout();
  }, [notAuthenticated, logout, query, setUser]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return loader ? <div>{loader}</div> : <>{children}</>;
};
