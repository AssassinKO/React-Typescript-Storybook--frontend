import React, { FC } from 'react';
import styled from 'styled-components';
import { Wrapper } from './Atoms';
import { useTranslation } from 'react-i18next';
import { Button } from '@homeproved/shared/ui';

const StyledWrapper = styled(Wrapper)`
  display: flex;
  padding: 2rem;
  height: 20rem;
  align-items: center;
`;

const Content = styled.div`
  text-align: left;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 0.1rem;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  font-size: 1.1rem;
`;

const Image = styled.div`
  flex: 0 0 25rem;
  background: url('/promo-image.jpeg') no-repeat center;
  background-size: cover;
  height: 100%;
  margin-right: 3rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

export const DashboardPromoTools: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledWrapper gradient>
      <Image />
      <Content>
        <Title>{t('app.pro.pages.dashboard.promoTitle')}</Title>
        <Text>{t('app.pro.pages.dashboard.promoText')}</Text>
        <StyledButton variant={'white'}>{t('app.pro.pages.dashboard.promoOrder')}</StyledButton>
      </Content>
    </StyledWrapper>
  );
};
