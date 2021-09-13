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
  const { article } = router.query;

  return (
    <PageShell padding={false} footerMargin={0}>
      <HousingAdviceDetailPage getPath={getPath} article={article?.toString()} />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, params: { article } }) {
  if (article === 'undefined') {
    return { props: {} };
  }

  return {
    props: {
      dehydratedState: await getDehydratedState(prefetch.housingAdviceArticle(locale, article)),
    },
  };
}

export default Index;
