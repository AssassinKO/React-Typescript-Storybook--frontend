import React from 'react';
import { PageWithAuthorization, useUser } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { ProfilePage } from '@homeproved/pro/feature-company';

export const Profile: PageWithAuthorization = () => {
  const user = useUser();

  return (
    <DashboardShell>
      <ProfilePage user={user} />
    </DashboardShell>
  );
};

Profile.authenticate = true;

export default Profile;
