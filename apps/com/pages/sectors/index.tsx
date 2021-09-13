import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { SectorsPage } from '@homeproved/shared/feature-sectors';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <PageShell>
      <SectorsPage getPath={getPath} />
    </PageShell>
  );
};

export default Index;
