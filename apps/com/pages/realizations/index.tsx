import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { RealizationsPage } from '@homeproved/com/feature-articles';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <PageShell relative={true} fullWidth={true}>
      <RealizationsPage getPath={getPath} />
    </PageShell>
  );
};

export default Index;
