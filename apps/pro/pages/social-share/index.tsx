import React from 'react';
import { PageWithAuthorization, useUser } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { SocialSharePage } from '@homeproved/pro/feature-social-share';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const SocialShare: PageWithAuthorization = () => {
  const user = useUser();
  const { getPath: getComPath } = useComLocalizedRoutes();

  return (
    <DashboardShell>
      <SocialSharePage user={user} getComPath={getComPath} />
    </DashboardShell>
  );
};

SocialShare.authenticate = true;

export default SocialShare;
