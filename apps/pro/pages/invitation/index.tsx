import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { InvitationPage } from '@homeproved/pro/feature-invitation';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <DashboardShell>
      <InvitationPage getPath={getPath} />
    </DashboardShell>
  );
};

Index.authenticate = true;

export default Index;
