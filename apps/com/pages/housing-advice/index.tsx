import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { HousingAdvicePage, prefetch } from '@homeproved/com/feature-articles';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { getDehydratedState } from '@homeproved/shared/data-access';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <PageShell relative={true} fullWidth={true}>
      <HousingAdvicePage getPath={getPath} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      dehydratedState: await getDehydratedState(prefetch.housingAdvice(locale)),
    },
  };
}

export default Index;
