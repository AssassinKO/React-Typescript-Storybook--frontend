import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { HousingAdviceSectorPage } from '@homeproved/com/feature-articles';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';
import { getDehydratedState } from '@homeproved/shared/data-access';
import { prefetch } from '@homeproved/com/feature-articles';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  const router = useRouter();
  const { sector } = router.query;

  return (
    <PageShell relative={true} fullWidth={true} padding={false}>
      <HousingAdviceSectorPage getPath={getPath} activeSector={sector?.toString()} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, params: { sector } }) {
  return {
    props: {
      dehydratedState: await getDehydratedState(prefetch.housingAdviceForSector(locale, sector)),
    },
  };
}

export default Index;
