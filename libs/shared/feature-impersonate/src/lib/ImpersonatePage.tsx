import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useApiFactory, useMutationFetch, UsersApiFactory } from '@homeproved/shared/data-access';
import { useRouter } from 'next/router';
import { useAuthContext } from '@homeproved/shared-feature-auth-codana';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';

export interface ImpersonatePageProps {
  token: string;
  getPath: GetPathFunction;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 6.5rem);
  align-content: stretch;
  justify-items: stretch;
`;

const Content = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: ${({ tablet }) => (tablet ? '100%' : 'calc(100% - 30rem)')};
  background: ${({ theme }) => theme.palette.background.dashboard};
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  span {
    margin-left: 1rem;
  }
`;

const LoadingSidebar = styled.div`
  width: 30rem;
  min-height: 100vh;
  background: #fff;
  padding: 2.2rem 1.5rem;
`;

const LoadingHeader = styled.div`
  background: ${({ theme }) => theme.config.gradients.default};
  height: 6.5rem;
`;

export const ImpersonatePage: FC<ImpersonatePageProps> = ({ token, getPath }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setJwt } = useAuthContext();
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation } = useMutationFetch('impersonate', usersApi.apiAuthImpersonateHashGet);

  useEffect(() => {
    if (mutation.isLoading || mutation.isSuccess) return;

    if (!token) {
      router.push(getPath('/login')).then();
    } else {
      mutation.mutate(token as string);
    }
  }, [token, mutation, router, getPath]);

  useEffect(() => {
    if (!mutation.isSuccess || !token) return;

    setJwt(mutation.data.accessToken, false, mutation.data.expiresIn);
  });

  return (
    <Wrapper>
      <LoadingSidebar />
      <Content>
        <LoadingHeader />
        <LoadingMessage>
          <SvgIcon icon={Icons.INFO} size={2} color={'gradient'} />
          <span>{t('app.pro.dashboard.impersonate')}</span>
        </LoadingMessage>
      </Content>
    </Wrapper>
  );
};
