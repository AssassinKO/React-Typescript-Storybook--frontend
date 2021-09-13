import React from 'react';
import { useRouter } from 'next/router';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { RealizationsDetailPage } from '@homeproved/shared/feature-realizations';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const router = useRouter();
  const { slug, rslug } = router.query;
  const { getPath } = useLocalizedRoutes();

  return (
    <PageShell tabsMenu={true} padding={false}>
      <RealizationsDetailPage slug={slug as string} rslug={rslug as string} getPath={getPath} />
    </PageShell>
  );
};

export default Index;
