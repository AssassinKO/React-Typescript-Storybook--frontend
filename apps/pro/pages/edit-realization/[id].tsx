import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { EditRealizationPage } from '@homeproved/shared/feature-realizations';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useRouter } from 'next/router';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Id: PageWithAuthorization = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPath: getProPath } = useProLocalizedRoutes();
  const { getPath: getComPath } = useComLocalizedRoutes();

  return (
    <DashboardShell>
      <EditRealizationPage rid={id as string} getProPath={getProPath} getComPath={getComPath} />
    </DashboardShell>
  );
};

Id.authenticate = true;

export default Id;
