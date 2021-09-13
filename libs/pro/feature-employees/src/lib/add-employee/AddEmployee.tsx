import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormGroup, Input } from '@homeproved/shared/feature-forms';
import { Button } from '@homeproved/shared/ui';
import {
  EmployeesApiFactory,
  ErrorMessageResponse,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useSnackbar } from 'notistack';

type AddEmployeeProps = {
  isMobile?: boolean;
  onUserAdded: () => void;
};

const Title = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: ${({ isMobile }) => isMobile && '600'};
  text-align: ${({ isMobile }) => isMobile && 'center'};
  font-size: ${({ isMobile }) => !isMobile && '2rem'};
  margin: ${({ isMobile }) => (isMobile ? '3rem 0 2rem' : '2rem 0 1rem')};
`;

const Form = styled(({ isMobile, ...restProps }) => <form {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 2rem;
  display: ${({ isMobile }) => !isMobile && 'flex'};
`;

const StyledFormGroup = styled(({ isMobile, ...restProps }) => <FormGroup {...restProps} />)`
  margin: ${({ isMobile }) => !isMobile && '0 1.5rem -0.5rem 0'};
`;

const StyledInput = styled(Input)`
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['A400']};
`;

const StyledButton = styled(({ isMobile, ...restProps }) => <Button {...restProps} />)`
  border-radius: 2rem;
  font-size: 1.2rem;
  display: table;
  margin: ${({ isMobile }) => (isMobile ? 'auto' : 'auto 0')};
`;

export const AddEmployee: FC<AddEmployeeProps> = ({ isMobile = false, onUserAdded }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const employeeApi = useApiFactory(EmployeesApiFactory);
  const { mutation } = useMutationFetch('createEmployee', (body) =>
    employeeApi.apiCompaniesEmployeesPost(body)
  );

  const addUser = (data) => {
    mutation.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.name,
    });
  };

  useEffect(() => {
    if (!mutation.isSuccess) return;

    enqueueSnackbar(t('app.pro.pages.employees.userAdded'), {
      variant: 'success',
    });

    mutation.reset();

    reset({
      email: '',
      firstName: '',
      lastName: '',
    });

    onUserAdded();
  }, [t, mutation, reset, enqueueSnackbar, onUserAdded]);

  useEffect(() => {
    if (!mutation.isError) return;

    if (
      (mutation.error as ErrorMessageResponse)?.response?.data?.message.includes('Duplicate entry')
    ) {
      enqueueSnackbar(t('app.pro.pages.employees.duplicateEntry'), {
        variant: 'error',
      });
    }
  }, [t, mutation, enqueueSnackbar]);

  return (
    <>
      <Title isMobile={isMobile}>{`${t('app.pro.pages.employees.addNewUser')}:`}</Title>
      <Form onSubmit={handleSubmit(addUser)} isMobile={isMobile}>
        <StyledFormGroup isMobile={isMobile}>
          <StyledInput
            name={'email'}
            ref={register}
            placeholder={t('app.pro.pages.employees.email')}
          />
        </StyledFormGroup>
        <StyledFormGroup isMobile={isMobile}>
          <StyledInput
            name={'firstName'}
            ref={register}
            placeholder={t('app.pro.pages.employees.firstName')}
          />
        </StyledFormGroup>
        <StyledFormGroup isMobile={isMobile}>
          <StyledInput
            name={'name'}
            ref={register}
            placeholder={t('app.pro.pages.employees.name')}
          />
        </StyledFormGroup>
        <StyledButton
          isMobile={isMobile}
          size={'small'}
          type={'submit'}
          disabled={mutation.isLoading}
        >
          {t('app.pro.pages.employees.add')}
        </StyledButton>
      </Form>
    </>
  );
};
