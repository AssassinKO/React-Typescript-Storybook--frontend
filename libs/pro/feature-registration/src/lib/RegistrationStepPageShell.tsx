import React, { FC, useEffect } from 'react';
import { PageShell } from '@homeproved/pro/feature-page-shell';
import { useRegistrationPlan } from './hooks/useRegistrationPlan';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const RegistrationStepPageShell: FC = ({ children }) => {
  const { registrationPlan, noFreePlanFound } = useRegistrationPlan();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();

  useEffect(() => {
    if (noFreePlanFound) {
      console.warn('No free plan was found!');
      router.push(getPath('/')).then();
    }
  }, [getPath, noFreePlanFound, router]);

  return <PageShell minimalHeader>{registrationPlan == null ? null : children}</PageShell>;
};
