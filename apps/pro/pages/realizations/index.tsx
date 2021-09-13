import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { RealizationsOverviewPage } from '@homeproved/shared/feature-realizations';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <DashboardShell>
      <RealizationsOverviewPage getPath={getPath} />
    </DashboardShell>
  );
};

Index.authenticate = true;

export default Index;
