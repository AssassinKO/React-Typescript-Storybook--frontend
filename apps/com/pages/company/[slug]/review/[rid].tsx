import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useRouter } from 'next/router';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { CompanyReviewDetailPage } from '@homeproved/com/feature-company';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core';

export const Review: PageWithAuthorization = () => {
  const router = useRouter();
  const { slug, rid } = router.query;
  const { getPath } = useComLocalizedRoutes();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  return (
    <PageShell
      footerMargin={isMobile ? 0 : 6}
      fullWidth={isMobile}
      padding={!isMobile}
      tabsMenu={true}
    >
      <CompanyReviewDetailPage slug={slug as string} rid={rid as string} getPath={getPath} />
    </PageShell>
  );
};

export default Review;
