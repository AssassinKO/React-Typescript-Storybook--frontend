import React, { FC, useState } from 'react';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@material-ui/core';
import { RegistrationStepIntro } from './steps/RegistrationStepIntro';
import { useRegistrationPlan } from './hooks/useRegistrationPlan';
import { RegistrationStep1Form } from './form/RegistrationStep1Form';
import { RegistrationStepPageShell } from './RegistrationStepPageShell';
import { useRouter } from 'next/router';
import { CompanyIdFromQueryHandler } from './claim/CompanyIdFromQueryHandler';
import { CompanyData } from '@homeproved/shared/data-access';

export const RegistrationStep1Page: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const { registrationPlan } = useRegistrationPlan();
  const router = useRouter();
  const { id } = router.query;
  const [companyById, setCompanyById] = useState<CompanyData>();

  return (
    <RegistrationStepPageShell>
      {id && <CompanyIdFromQueryHandler id={id as string} onCompany={setCompanyById} />}
      {registrationPlan == null ? null : (
        <>
          <RegistrationStepIntro step={1} isMobile={isMobile} plan={registrationPlan} />
          <RegistrationStep1Form companyById={companyById} isMobile={isMobile} />
        </>
      )}
    </RegistrationStepPageShell>
  );
};
