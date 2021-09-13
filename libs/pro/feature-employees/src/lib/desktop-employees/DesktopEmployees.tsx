import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DesktopEmployee } from './DesktopEmployee';
import { Wrapper, Header, Cell, NoResults } from './Atoms';
import { User } from '@homeproved/shared/data-access';

type DesktopEmployeesProps = {
  employees: User[];
  onUserDeleted: () => void;
  onUserUpdated: () => void;
};

export const DesktopEmployees: FC<DesktopEmployeesProps> = ({
  employees,
  onUserDeleted,
  onUserUpdated,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {employees.length > 0 ? (
        <>
          <Header>
            <Cell header>{t('app.pro.pages.employees.email')}</Cell>
            <Cell header>{t('app.pro.pages.employees.firstName')}</Cell>
            <Cell header>{t('app.pro.pages.employees.name')}</Cell>
            <Cell header edit>
              {t('app.pro.pages.employees.edit')}
            </Cell>
            <Cell header small>
              {t('app.pro.pages.employees.active')}
            </Cell>
          </Header>
          {employees.map((employee, index) => (
            <DesktopEmployee
              key={index}
              employee={employee.data}
              onUserDeleted={onUserDeleted}
              onUserUpdated={onUserUpdated}
            />
          ))}
        </>
      ) : (
        <NoResults>{t('app.pro.pages.employees.noResults')}</NoResults>
      )}
    </Wrapper>
  );
};
