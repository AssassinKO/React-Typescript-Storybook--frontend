import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { DashboardShell } from '@homeproved/pro/feature-dashboard-shell';
import { EmployeesOverviewPage } from '@homeproved/pro/feature-employees';

export const Employees: PageWithAuthorization = () => {
  return (
    <DashboardShell>
      <EmployeesOverviewPage />
    </DashboardShell>
  );
};

Employees.authenticate = true;

export default Employees;
