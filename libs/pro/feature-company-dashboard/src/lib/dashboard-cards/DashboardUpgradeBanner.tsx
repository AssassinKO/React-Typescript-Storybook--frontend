import React, { FC } from 'react';
import styled from 'styled-components';
import { Wrapper } from './Atoms';
import { useTranslation } from 'react-i18next';
import { Button } from '@homeproved/shared/ui';
import { PlanCircle, PlanUid } from '@homeproved/pro/feature-plans';
import { PlansApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

type DashboardUpgradeBannerProps = {
  plan: PlanUid;
  isMobile?: boolean;
};

const StyledWrapper = styled(({ isMobile, ...restProps }) => <Wrapper {...restProps} />)`
  display: ${({ isMobile }) => !isMobile && 'flex'};
  padding: 2rem 4rem;
  align-items: center;
  margin: 0;
`;

const Content = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'left')};
  margin-left: ${({ isMobile }) => !isMobile && '3rem'};
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  font-size: 1.1rem;
  border-radius: 3rem;
  padding-right: 3rem;
  padding-left: 2rem;
`;

export const DashboardUpgradeBanner: FC<DashboardUpgradeBannerProps> = ({
  plan,
  isMobile = false,
}) => {
  const { t } = useTranslation();

  const plansApi = useApiFactory(PlansApiFactory);
  const {
    query: { data: teamPlanData, isSuccess: teamPlanIsSuccess },
  } = useQueryFetch('plans', () => plansApi.apiPlansPlanGet(PlanUid.TEAM));

  return (
    <StyledWrapper gradient isMobile={isMobile}>
      {teamPlanIsSuccess && (
        <PlanCircle plan={plan} teamPlan={teamPlanData.data} isMobile={isMobile} />
      )}
      <Content isMobile={isMobile}>
        <Title>{t('app.pro.pages.dashboard.upgradeCtaLabel')}</Title>
        <Text>{t('app.pro.pages.dashboard.upgradeCtaText')}</Text>
        <StyledButton variant={'white'} size={'small'}>
          {t('app.pro.pages.dashboard.upgradeCtaButton')}
        </StyledButton>
      </Content>
    </StyledWrapper>
  );
};
