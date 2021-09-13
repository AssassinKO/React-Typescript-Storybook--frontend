import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SectionTitle, Button } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { YourPackage } from './my-account';
import { PlanFeatures } from './plan-features/PlanFeatures';
import {
  PlansApiFactory,
  useApiFactory,
  useQueryFetch,
  UserData,
} from '@homeproved/shared/data-access';
import { useCompany } from '@homeproved/shared/feature-company';
import { PlanUid } from './util/helpers';

type MyAccountPageProps = {
  user: UserData;
};

const BoxWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => !isMobile && 'flex'};
  flex-wrap: wrap;
  margin: 0 -1rem;
`;

const Box = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  flex: 0 0 calc(50% - 2rem);
  margin: 0 1rem 2rem;
  padding: 2rem 3rem 2.5rem;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: ${({ isMobile }) => isMobile && 'center'};
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  border-radius: 2rem;
  margin-top: 2rem;
`;

const PlanWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => !isMobile && 'flex'};
`;

export const MyAccountPage: FC<MyAccountPageProps> = ({ user }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const [currentPlan, setCurrentPlan] = useState<PlanUid>(PlanUid.FREE);
  const { company, isSuccess } = useCompany(user?.relations?.company?.data?.id?.toString());
  const plansApi = useApiFactory(PlansApiFactory);
  const {
    query: { data: teamPlanData, isSuccess: teamPlanIsSuccess },
  } = useQueryFetch('plans', () => plansApi.apiPlansPlanGet(PlanUid.TEAM));

  useEffect(() => {
    if (!isSuccess) return;
    if (company.relations.subscription.data.uid !== PlanUid.FREE) setCurrentPlan(PlanUid.TEAM);
  }, [isSuccess, company]);

  return (
    <>
      <SectionTitle
        label={t('app.pro.pages.myAccount.title')}
        uppercase={true}
        textAlign={isMobile ? 'center' : 'left'}
        ignoreMobile={true}
        font={'PTSans'}
      />
      <BoxWrapper isMobile={isMobile}>
        <Box isMobile={isMobile}>
          <Label>{t('app.pro.pages.myAccount.billingInfo')}</Label>
          <div>{t('app.pro.pages.myAccount.billingInfoText')}</div>
          <StyledButton size={'small'}>
            {t('app.pro.pages.myAccount.billingInfoButton')}
          </StyledButton>
        </Box>
        <Box isMobile={isMobile}>
          <Label>{t('app.pro.pages.myAccount.invoices')}</Label>
          <div>{t('app.pro.pages.myAccount.invoicesText')}</div>
          <StyledButton size={'small'}>{t('app.pro.pages.myAccount.invoicesButton')}</StyledButton>
        </Box>
      </BoxWrapper>
      {teamPlanIsSuccess && isSuccess && (
        <PlanWrapper isMobile={isMobile}>
          <YourPackage plan={currentPlan} teamPlan={teamPlanData.data} isMobile={isMobile} />
          <PlanFeatures plan={currentPlan} teamPlan={teamPlanData.data} company={company} />
        </PlanWrapper>
      )}
    </>
  );
};
