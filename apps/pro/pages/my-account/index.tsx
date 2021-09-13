import React from 'react';
import { PageWithAuthorization, useUser } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { MyAccountPage } from '@homeproved/pro/feature-plans';

export const MyAccount: PageWithAuthorization = () => {
  const user = useUser();

  return (
    <DashboardShell>
      <MyAccountPage user={user} />
    </DashboardShell>
  );
};

MyAccount.authenticate = true;

export default MyAccount;
