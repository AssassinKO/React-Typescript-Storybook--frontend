import React from 'react';
import { apiFactory, getDehydratedState, JobsApiFactory } from '@homeproved/shared/data-access';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { useRouter } from 'next/router';
import { VacaturesDetailPage } from '@homeproved/com/feature-vacatures';

export const Index: PageWithAuthorization = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <PageShell>
      <VacaturesDetailPage slug={slug as string} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, slug }) {
  const api = apiFactory(locale, JobsApiFactory);

  return {
    props: {
      dehydratedState: await getDehydratedState([
        {
          key: slug,
          fn: async () => {
            const response = await api.apiJobPageJobPageGet(slug as string);
            return response.data;
          },
        },
      ]),
    },
  };
}

export default Index;
