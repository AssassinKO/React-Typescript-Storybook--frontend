import React from 'react';
import { FaqPage, FaqIndividualsPage, BasicPageUID } from '@homeproved/com/feature-basic-pages';
import { apiFactory, getDehydratedState, PagesApiFactory } from '@homeproved/shared/data-access';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';

export const Index: PageWithAuthorization = () => (
  <PageShell>
    <FaqPage />
    <FaqIndividualsPage />
  </PageShell>
);

export async function getServerSideProps({ locale }) {
  const api = apiFactory(locale, PagesApiFactory);
  const faqUid: BasicPageUID = 'faq';
  const faqIndividualsUid: BasicPageUID = 'faq-individuals';

  return {
    props: {
      dehydratedState: await getDehydratedState([
        {
          key: faqUid,
          fn: async () => {
            const response = await api.apiBasicPageBasicPageGet(faqUid);
            return response.data;
          },
        },
        {
          key: faqIndividualsUid,
          fn: async () => {
            const response = await api.apiBasicPageBasicPageGet(faqIndividualsUid);
            return response.data;
          },
        },
      ]),
    },
  };
}

export default Index;
