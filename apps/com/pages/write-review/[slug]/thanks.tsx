import React, { useEffect } from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { WriteReviewForCompanyThanksPage } from '@homeproved/shared/feature-reviews';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { usePersistentData } from '@homeproved/shared/data-access';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Thanks: PageWithAuthorization = () => {
  const { submittedReview } = usePersistentData();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();

  useEffect(() => {
    if (submittedReview == null) {
      router.push(getPath('/')).then();
    }
  }, [getPath, router, submittedReview]);

  return submittedReview == null ? null : (
    <PageShell>
      <WriteReviewForCompanyThanksPage review={submittedReview} />
    </PageShell>
  );
};

export default Thanks;
