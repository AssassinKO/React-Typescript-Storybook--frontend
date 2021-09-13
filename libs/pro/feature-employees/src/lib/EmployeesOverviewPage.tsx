import React, { FC } from 'react';
import { SectionTitle } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { DesktopEmployees } from './desktop-employees/DesktopEmployees';
import { MobileEmployees } from './mobile-employees/MobileEmployees';
import { AddEmployee } from './add-employee/AddEmployee';
import { EmployeesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import { useUser } from '@homeproved/shared/feature-auth';

export const EmployeesOverviewPage: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const user = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const employeeApi = useApiFactory(EmployeesApiFactory);
  const { query } = useQueryFetch('employees', employeeApi.apiCompaniesEmployeesGet);

  const refreshOverview = () => {
    query.refetch().then();
  };

  return (
    <>
      <SectionTitle
        label={t('app.pro.pages.employees.title')}
        uppercase={true}
        textAlign={isMobile ? 'center' : 'left'}
        ignoreMobile={true}
        font={'PTSans'}
      />
      {query.isSuccess &&
        (isMobile ? (
          <MobileEmployees
            employees={query.data.data.filter((item) => item.data.id !== user.id)}
            onUserDeleted={refreshOverview}
            onUserUpdated={refreshOverview}
          />
        ) : (
          <DesktopEmployees
            employees={query.data.data.filter((item) => item.data.id !== user.id)}
            onUserDeleted={refreshOverview}
            onUserUpdated={refreshOverview}
          />
        ))}
      <AddEmployee isMobile={isMobile} onUserAdded={refreshOverview} />
    </>
  );
};
