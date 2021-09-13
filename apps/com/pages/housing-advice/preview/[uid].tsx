import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';
import { HousingAdviceDetailPage, prefetch } from '@homeproved/com/feature-articles';
import { getDehydratedState } from '@homeproved/shared/data-access';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  const router = useRouter();
  const { uid } = router.query;

  return (
    <PageShell padding={false} footerMargin={0}>
      <HousingAdviceDetailPage getPath={getPath} uid={uid?.toString()} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, params: { uid } }) {
  return {
    props: {
      dehydratedState: await getDehydratedState(prefetch.housingAdvicePreview(locale, uid)),
    },
  };
}

export default Index;
