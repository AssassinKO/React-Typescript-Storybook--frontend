import React, { FC } from 'react';
import { RegistrationWizardSteps } from './RegistrationWizardSteps';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PlanData } from '@homeproved/shared/data-access';

type RegistrationStepPageShellProps = {
  step: number;
  plan: PlanData;
  isMobile: boolean;
};

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6rem;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

export const RegistrationStepIntro: FC<RegistrationStepPageShellProps> = ({
  step,
  plan,
  isMobile,
}) => {
  const { t } = useTranslation();

  return (
    <IntroWrapper>
      <Title>
        {step === 3
          ? t('app.pro.pages.registration.steps.step2.lastStepTitle')
          : t('app.pro.pages.registration.title').replace('%PLAN_TYPE%', plan.name.toUpperCase())}
      </Title>
      <RegistrationWizardSteps isMobile={isMobile} maxWidth={30} activeStep={step} />
    </IntroWrapper>
  );
};
