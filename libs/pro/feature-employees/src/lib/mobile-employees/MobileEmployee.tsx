import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon, Icons, Modal } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
  Wrapper,
  PassReset,
  StyledButton,
  Active,
  ActiveLabel,
  Edit,
  Delete,
  DeleteText,
  DeleteButton,
  StyledInput,
  Spacer,
  StyledIconButton,
} from './Atoms';
import {
  EmployeesApiFactory,
  useApiFactory,
  useMutationFetch,
  UserData,
  UsersApiFactory,
} from '@homeproved/shared/data-access';
import moment from 'moment';
import { useSnackbar } from 'notistack';

type MobileEmployeeProps = {
  employee: UserData;
  onUserDeleted: () => void;
  onUserUpdated: () => void;
};

export const MobileEmployee: FC<MobileEmployeeProps> = ({
  employee,
  onUserUpdated,
  onUserDeleted,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const employeeApi = useApiFactory(EmployeesApiFactory);
  const { mutation: deleteEmployee } = useMutationFetch('deleteEmployee', (body) =>
    employeeApi.apiCompaniesEmployeesEmployeeDelete(employee.id.toString())
  );

  const { mutation: editEmployee } = useMutationFetch('deleteEmployee', (body) =>
    employeeApi.apiCompaniesEmployeesEmployeePatch(employee.id.toString(), body)
  );

  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation: passwordReset } = useMutationFetch(
    'forgotPassword',
    usersApi.apiAuthForgotPasswordPost
  );

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      email: employee.email,
      firstName: employee.firstName,
      name: employee.lastName,
    },
  });

  const handleEdit = (data) => {
    editEmployee.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.name,
    });
  };

  const handleDelete = () => {
    deleteEmployee.mutate({});
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handlePassReset = () => {
    passwordReset.mutate({ email: getValues().email });
  };

  useEffect(() => {
    if (!passwordReset.isSuccess) return;

    enqueueSnackbar(t('app.pro.pages.employees.passReseted'), {
      variant: 'success',
    });

    passwordReset.reset();
  }, [passwordReset, enqueueSnackbar, t]);

  useEffect(() => {
    if (!deleteEmployee.isSuccess) return;
    setDeleteMode(false);

    enqueueSnackbar(t('app.pro.pages.employees.userDeleted'), {
      variant: 'success',
    });

    deleteEmployee.reset();
    onUserDeleted();
  }, [deleteEmployee, t, enqueueSnackbar, onUserDeleted]);

  useEffect(() => {
    if (!editEmployee.isSuccess) return;
    setEditMode(false);
    editEmployee.reset();
    onUserUpdated();
  }, [editEmployee, onUserUpdated, setEditMode]);

  useEffect(() => {
    if (getValues().email !== employee.email) {
      setValue('email', employee.email);
      setValue('firstName', employee.firstName);
      setValue('name', employee.lastName);
    }
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleEdit)}>
        {!editMode ? (
          <Edit onClick={toggleEdit}>
            <SvgIcon icon={Icons.PENCIL} size={2} />
          </Edit>
        ) : (
          <StyledIconButton type={'submit'} icon={Icons.CHECKMARK} size={1} variant={'green'} />
        )}
        <Spacer flex>
          <StyledInput readOnly={!editMode} innerRef={register} name={'firstName'} bold firstName />
          <StyledInput readOnly={!editMode} innerRef={register} name={'name'} bold lastName />
        </Spacer>
        <Spacer>
          <StyledInput readOnly={!editMode} innerRef={register} name={'email'} />
        </Spacer>
      </form>
      <PassReset>
        <StyledButton arrow={'none'} variant={'text'} onClick={handlePassReset}>
          {t('app.pro.pages.employees.sentAgain')}
        </StyledButton>
      </PassReset>
      <Active>
        <ActiveLabel>
          <SvgIcon icon={Icons.INFO} size={1.4} color={theme.palette.grey['600']} />
          <span>{`${t('app.pro.pages.employees.active')}:`}</span>
        </ActiveLabel>
        {employee['lastLoginAt'] != null
          ? moment(employee['lastLoginAt']).isSame(moment(), 'day')
            ? t('app.pro.pages.employees.today')
            : moment(employee['lastLoginAt']).isSame(moment().subtract(1, 'day'), 'day')
            ? t('app.pro.pages.employees.yesterday')
            : moment(employee['lastLoginAt']).format('DD/MM/YYYY')
          : t('app.pro.pages.employees.neverActive')}
      </Active>
      <Delete onClick={() => setDeleteMode(true)}>
        <SvgIcon icon={Icons.DELETE} color={theme.palette.primary.main} size={1.6} />
      </Delete>
      <Modal
        open={deleteMode}
        onClose={() => setDeleteMode(false)}
        title={t('app.pro.pages.employees.deteleTitle')}
        maxWidth={50}
      >
        <DeleteText>{t('app.pro.pages.employees.deleteText')}</DeleteText>
        <DeleteButton onClick={handleDelete}>{t('app.pro.pages.employees.delete')}</DeleteButton>
      </Modal>
    </Wrapper>
  );
};
