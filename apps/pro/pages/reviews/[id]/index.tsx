import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useRouter } from 'next/router';
import { ReviewsDetailPage } from '@homeproved/shared/feature-reviews';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const Reviews: PageWithAuthorization = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPath } = useProLocalizedRoutes();
  const { getPath: getComPath } = useComLocalizedRoutes();

  return (
    <DashboardShell noPaddingBottom>
      <ReviewsDetailPage id={id as string} getPath={getPath} getComPath={getComPath} />
    </DashboardShell>
  );
};

Reviews.authenticate = true;

export default Reviews;
