import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { WriteReviewForCompanyPage } from '@homeproved/shared/feature-reviews';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';
import { useCompany } from '@homeproved/shared/feature-company';

export const WriteReview: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  const router = useRouter();
  const { slug } = router.query;
  const { company } = useCompany(slug as string);

  return (
    <PageShell padding={false} innerPadding={false} fullWidth omitFooter>
      <WriteReviewForCompanyPage company={company} getComPath={getPath} />
    </PageShell>
  );
};

export default WriteReview;
