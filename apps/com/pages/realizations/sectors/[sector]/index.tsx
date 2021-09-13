import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { RealizationsSectorPage } from '@homeproved/com/feature-articles';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  const router = useRouter();
  const { sector } = router.query;

  return (
    <PageShell relative={true} fullWidth={true} padding={false}>
      <RealizationsSectorPage getPath={getPath} activeSector={sector?.toString()} />
    </PageShell>
  );
};

export default Index;
