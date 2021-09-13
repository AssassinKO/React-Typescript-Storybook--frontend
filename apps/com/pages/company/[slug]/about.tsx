import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { CompanyAboutPage, prefetch } from '@homeproved/com/feature-company';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { useRouter } from 'next/router';
import {
  apiFactory,
  CompaniesApiFactory,
  getDehydratedState,
} from '@homeproved/shared/data-access';

export const About: PageWithAuthorization = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <PageShell tabsMenu>
      <CompanyAboutPage slug={slug as string} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, params: { slug } }) {
  const api = apiFactory(locale, CompaniesApiFactory);
  const company = await api.apiCompaniesCompanyGet(slug);

  return {
    props: {
      dehydratedState: await getDehydratedState(prefetch.about(locale, slug)),
      ogImage: company?.data?.data?.lastSocialShare?.data?.original || '',
    },
  };
}

export default About;
