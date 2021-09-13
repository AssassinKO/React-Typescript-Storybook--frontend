import React, { FC } from 'react';
import styled from 'styled-components';
import { Wrapper, StyledButton } from './Atoms';
import { useTranslation } from 'react-i18next';

const Title = styled.div`
  font-size: 3.5rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  letter-spacing: 0.1rem;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  margin: 1rem;
`;

export const DashboardPssst: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>Pssst...</Title>
      <Text>{t('app.pro.pages.dashboard.noScoreYet')}</Text>
      <StyledButton variant={'light'}>{t('app.pro.pages.dashboard.inviteClients')}</StyledButton>
    </Wrapper>
  );
};
