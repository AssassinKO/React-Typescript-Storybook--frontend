import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { DashboardPage } from '@homeproved/pro/feature-company-dashboard';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const Dashboard: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <DashboardShell>
      <DashboardPage getPath={getPath} />
    </DashboardShell>
  );
};

Dashboard.authenticate = true;

export default Dashboard;
