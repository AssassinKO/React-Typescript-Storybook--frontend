import React, { FC } from 'react';
import { RegistrationWizardStep } from './RegistrationWizardStep';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

type RegistrationWizardStepsProps = {
  activeStep: number;
  stepSize?: number;
  maxWidth?: number;
  isMobile?: boolean;
};

const Wrapper = styled(({ maxWidth, ...restProps }) => <div {...restProps} />)`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}rem` : 'none')};
`;

const Line = styled(({ stepSize, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: ${({ stepSize }) => `${stepSize / 2 - 0.1}rem`};
  left: 50%;
  width: ${({ stepSize }) => `calc(100% - ${stepSize}rem)`};
  height: 0.2rem;
  background: ${({ theme }) => theme.palette.grey['600']};
  transform: translateX(-50%);
`;

export const RegistrationWizardSteps: FC<RegistrationWizardStepsProps> = ({
  activeStep,
  stepSize = 6.5,
  maxWidth,
  isMobile = false,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper maxWidth={maxWidth}>
      <Line stepSize={stepSize} />
      <RegistrationWizardStep
        stepSize={stepSize}
        step={1}
        active={activeStep === 1}
        finished={activeStep > 1}
      >
        {t('app.pro.pages.registration.steps.step1.titleAddress')}
      </RegistrationWizardStep>
      <RegistrationWizardStep stepSize={stepSize} step={2} active={activeStep === 2}>
        {isMobile
          ? t('app.pro.pages.registration.steps.step2.titleMobile')
          : t('app.pro.pages.registration.steps.step2.title')}
      </RegistrationWizardStep>
    </Wrapper>
  );
};
