import React, { FC } from 'react';
import { MobileEmployee } from './MobileEmployee';
import { User } from '@homeproved/shared/data-access';
import { NoResults, Wrapper } from '../desktop-employees/Atoms';
import { useTranslation } from 'react-i18next';

type MobileEmployeesProps = {
  employees: User[];
  onUserDeleted: () => void;
  onUserUpdated: () => void;
};

export const MobileEmployees: FC<MobileEmployeesProps> = ({
  employees,
  onUserDeleted,
  onUserUpdated,
}) => {
  const { t } = useTranslation();

  return employees.length > 0 ? (
    <>
      {employees.map((employee, index) => (
        <MobileEmployee
          key={index}
          employee={employee.data}
          onUserDeleted={onUserDeleted}
          onUserUpdated={onUserUpdated}
        />
      ))}
    </>
  ) : (
    <Wrapper>
      <NoResults>{t('app.pro.pages.employees.noResults')}</NoResults>
    </Wrapper>
  );
};
