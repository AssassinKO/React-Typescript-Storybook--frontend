import React, { FC } from 'react';
import styled from 'styled-components';
import { Wrapper, StyledButton } from './Atoms';
import { useTranslation } from 'react-i18next';

const Title = styled.div`
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 0;
  color: #fff;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.6rem;
  margin: 1rem;
  color: #fff;
`;

export const DashboardInviteClients: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper gradient>
      <Title>{t('app.pro.pages.dashboard.inviteClientsTitle')}</Title>
      <Text>{t('app.pro.pages.dashboard.inviteClientsText')}</Text>
      <StyledButton variant={'white'} pill={false} size={'small'}>
        {t('app.pro.pages.dashboard.inviteClients')}
      </StyledButton>
    </Wrapper>
  );
};
