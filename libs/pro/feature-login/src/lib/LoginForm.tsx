import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { Button, Icons } from '@homeproved/shared/ui';
import { Checkbox, ErrorMessage, Input, isValidEmail } from '@homeproved/shared/feature-forms';
import {
  useApiFactory,
  useMutationFetch,
  UsersApiFactory,
  FormErrorsResponse,
  getErrorMessage,
} from '@homeproved/shared/data-access';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import {
  BackLinkIcon,
  BackLinkLabel,
  BackToProLink,
  FormWrapper,
  Label,
  StyledButtonGroup,
  StyledFormGroup,
} from '@homeproved/pro/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthContext } from '@homeproved/shared-feature-auth-codana';
import Link from 'next/link';
import { VerifyPhoneModal } from './VerifyPhoneModal';
import { useDisclosure } from 'react-use-disclosure';
import { VerifyEmailModal } from './VerifyEmailModal';

const LoginTitle = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
`;

const AnimatedLogo = styled.img`
  display: block;
  max-width: 23rem;
  margin: 0 auto 2rem;
`;

const schema = z.object({
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  password: z.string().min(8, {
    message: 'shared.form.validation.invalidPassword',
  }),
  rememberMe: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export const LoginForm: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { setJwt } = useAuthContext();
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation: loginMutation } = useMutationFetch('login', usersApi.apiAuthLoginPost);
  const { getPath } = useLocalizedRoutes();
  const [rememberMe, setRememberMe] = useState(false);
  const [resetData, setResetData] = useState<FormData>();
  const [backendErrorHandled, setBackendErrorHandled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const {
    open: openVerifyPhoneModal,
    isOpen: verifyPhoneModalOpen,
    close: closeVerifyPhoneModal,
  } = useDisclosure(false);
  const {
    open: openVerifyEmailModal,
    isOpen: verifyEmailModalOpen,
    close: closeVerifyEmailModal,
  } = useDisclosure(false);

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    reset: resetForm,
  } = useForm<FormData>({
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
            password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
            rememberMe: false,
          }
        : {},
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setRememberMe(data.rememberMe);
    setBackendErrorHandled(false);
    loginMutation.mutate({ email: data.email, password: data.password });
    setResetData(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setJwt(loginMutation.data.accessToken, rememberMe, loginMutation.data.expiresIn);
      closeSnackbar();
    }
    if (loginMutation.isError && !backendErrorHandled) {
      if (
        (loginMutation.error as FormErrorsResponse)?.response?.data?.errors?.['phoneVerifiedAt'] !=
        null
      ) {
        setPhoneNumber(
          (loginMutation.error as FormErrorsResponse)?.response?.data?.errors?.['phoneVerifiedAt']
        );
        openVerifyPhoneModal();
        loginMutation.reset();
      } else {
        if (
          (loginMutation.error as FormErrorsResponse)?.response?.data?.errors?.[
            'emailVerifiedAt'
          ] != null
        ) {
          openVerifyEmailModal();
          loginMutation.reset();
        } else {
          enqueueSnackbar(getErrorMessage(loginMutation, t), {
            variant: 'error',
          });
          setBackendErrorHandled(true);
        }
      }
    }
  }, [
    setJwt,
    rememberMe,
    loginMutation,
    enqueueSnackbar,
    closeSnackbar,
    t,
    backendErrorHandled,
    openVerifyPhoneModal,
    openVerifyEmailModal,
  ]);

  return (
    <>
      {isMobile && (
        <>
          <AnimatedLogo src="/animated-logo.gif" alt="Homeproved" />
          <LoginTitle>{t('app.pro.pages.login.title').toUpperCase()}</LoginTitle>
        </>
      )}
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormGroup>
            <Label htmlFor="email">{t('app.pro.pages.login.form.user')}</Label>
            <Input autoComplete="email" name="email" ref={register} />
            {errors.email && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.email.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <Label htmlFor="password">{t('app.pro.pages.login.form.password')}</Label>
            <Input autoComplete="current-password" name="password" type="password" ref={register} />
            {errors.password && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.password.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ onChange, value }) => (
                <Checkbox
                  onChange={onChange}
                  value={value}
                  label={t('app.pro.pages.login.form.rememberMe')}
                  labelColor="#FFF"
                  labelSize={1.5}
                  labelWeight={700}
                  omitBorder
                />
              )}
            />
          </StyledFormGroup>
          <StyledButtonGroup horizontal>
            <Button variant="dark" pill={false} arrow="none" type="submit">
              {t('app.pro.pages.login.form.buttons.submit')}
            </Button>
            <Button variant="text" color="white" href={getPath('/password-forgotten')}>
              {t('app.pro.pages.login.form.buttons.forgotPassword')}
            </Button>
          </StyledButtonGroup>
        </form>
      </FormWrapper>
      <Link href={getPath('/')} passHref>
        <BackToProLink href={getPath('/')}>
          <BackLinkLabel>{t('app.pro.pages.login.backToHome')}</BackLinkLabel>
          <BackLinkIcon icon={Icons.DOUBLE_ANGLE_RIGHT} color="#FFF" size={2.5} />
        </BackToProLink>
      </Link>
      <VerifyPhoneModal
        open={verifyPhoneModalOpen}
        onClose={() => {
          closeVerifyPhoneModal();
          resetForm(resetData);
        }}
        onSuccess={() => {
          closeVerifyPhoneModal();
          handleSubmit(onSubmit)();
        }}
        email={getValues().email}
        phoneNumber={phoneNumber}
      />
      <VerifyEmailModal
        open={verifyEmailModalOpen}
        onClose={() => {
          closeVerifyEmailModal();
          resetForm(resetData);
        }}
        onSuccess={() => {
          closeVerifyEmailModal();
          handleSubmit(onSubmit)();
        }}
        email={getValues().email}
      />
    </>
  );
};
