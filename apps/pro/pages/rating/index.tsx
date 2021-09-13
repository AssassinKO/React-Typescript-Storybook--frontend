import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { RatingsPage } from '@homeproved/shared/feature-ratings';

export const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  return (
    <DashboardShell>
      <RatingsPage getPath={getPath} />
    </DashboardShell>
  );
};

Index.authenticate = true;

export default Index;
