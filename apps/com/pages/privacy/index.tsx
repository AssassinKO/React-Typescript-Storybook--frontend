import React from 'react';
import { PrivacyPage, BasicPageUID } from '@homeproved/com/feature-basic-pages';
import { apiFactory, getDehydratedState, PagesApiFactory } from '@homeproved/shared/data-access';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';

export const Index: PageWithAuthorization = () => (
  <PageShell>
    <PrivacyPage />
  </PageShell>
);

export async function getServerSideProps({ locale }) {
  const api = apiFactory(locale, PagesApiFactory);
  const uid: BasicPageUID = 'privacy';

  return {
    props: {
      dehydratedState: await getDehydratedState([
        {
          key: uid,
          fn: async () => {
            const response = await api.apiBasicPageBasicPageGet(uid);
            return response.data;
          },
        },
      ]),
    },
  };
}

export default Index;
