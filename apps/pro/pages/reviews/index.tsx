import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { ReviewsPage } from '@homeproved/shared/feature-reviews';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export const Reviews: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();
  return (
    <DashboardShell>
      <ReviewsPage getPath={getPath} />
    </DashboardShell>
  );
};

Reviews.authenticate = true;

export default Reviews;
