import React, { FC, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@material-ui/core';
import { RegistrationStepIntro } from './steps/RegistrationStepIntro';
import { RegistrationStepPageShell } from './RegistrationStepPageShell';
import { RegistrationStep2Form } from './form/RegistrationStep2Form';
import { useRegistrationFormData } from './hooks/useRegistrationFormData';
import { useRegistrationPlan } from './hooks/useRegistrationPlan';
import { useRouter } from 'next/router';

export const RegistrationStep2Page: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const router = useRouter();
  const { id } = router.query;
  const { registrationPlan, clear: clearRegistrationPlan } = useRegistrationPlan();
  const { registrationFormData, clear: clearRegistrationFormData } = useRegistrationFormData(
    id?.toString()
  );

  useEffect(() => {
    return () => {
      clearRegistrationPlan();
      clearRegistrationFormData();
    };
  }, [clearRegistrationFormData, clearRegistrationPlan]);

  return (
    <RegistrationStepPageShell>
      {registrationFormData == null || registrationPlan == null ? null : (
        <>
          <RegistrationStepIntro step={3} isMobile={isMobile} plan={registrationPlan} />
          <RegistrationStep2Form isMobile={isMobile} email={registrationFormData.email} />
        </>
      )}
    </RegistrationStepPageShell>
  );
};
