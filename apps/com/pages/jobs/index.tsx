import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { VacaturesPage } from '@homeproved/com/feature-vacatures';
import { apiFactory, getDehydratedState, JobsApiFactory } from '@homeproved/shared/data-access';

export const Index: PageWithAuthorization = () => (
  <PageShell>
    <VacaturesPage />
  </PageShell>
);

export async function getServerSideProps({ locale }) {
  const api = apiFactory(locale, JobsApiFactory);

  return {
    props: {
      dehydratedState: await getDehydratedState([
        {
          key: 'job-page',
          fn: async () => {
            const response = await api.apiJobPageGet();
            return response.data;
          },
        },
      ]),
    },
  };
}

export default Index;
