import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Icons } from '@homeproved/shared/ui';
import { ErrorMessage, Input, isValidEmail } from '@homeproved/shared/feature-forms';
import {
  useApiFactory,
  useMutationFetch,
  UsersApiFactory,
  useRedirectOnSuccess,
} from '@homeproved/shared/data-access';
import {
  BackLinkIcon,
  BackLinkLabel,
  FormWrapper,
  Label,
  LoginLink,
  StyledButtonGroup,
  StyledFormGroup,
  BackToProLink,
} from '@homeproved/pro/ui';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useTheme } from '@material-ui/core';
import Link from 'next/link';

const schema = z
  .object({
    token: z.string(),
    email: z.string().refine(isValidEmail, {
      message: 'shared.form.validation.invalidEmail',
    }),
    password: z.string().min(8, {
      message: 'shared.form.validation.invalidPassword',
    }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'shared.form.validation.invalidPasswordConfirmation',
    path: ['passwordConfirmation'], // set the path of the error
  });

type FormData = z.infer<typeof schema>;

type PasswordResetFormProps = {
  token: string;
};

export const PasswordResetForm: FC<PasswordResetFormProps> = ({ token }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation } = useMutationFetch('resetPassword', usersApi.apiAuthResetPasswordPost);

  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            token,
            email: 'superadmin@calibrator.be',
            password: '',
            passwordConfirmation: '',
          }
        : {},
    resolver: zodResolver(schema),
  });

  const setBackendErrorHandled = useRedirectOnSuccess(mutation, getPath('/login'), {
    from: 'password-reset',
  });

  const onSubmit = (data: FormData) => {
    setBackendErrorHandled(false);
    mutation.mutate(data);
  };

  return (
    <>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="token" value={token} ref={register} />
          <StyledFormGroup>
            <Label htmlFor="email">{t('app.pro.pages.resetPassword.form.user')}</Label>
            <Input autoComplete="email" ref={register} name="email" />
            {errors.email && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.email.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <Label htmlFor="password">{t('app.pro.pages.resetPassword.form.password')}</Label>
            <Input autoComplete="current-password" ref={register} name="password" type="password" />
            {errors.password && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.password.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <Label htmlFor="passwordConfirmation">
              {t('app.pro.pages.resetPassword.form.passwordConfirmation')}
            </Label>
            <Input
              autoComplete="passwordConfirmation"
              ref={register}
              name="passwordConfirmation"
              type="password"
            />
            {errors.passwordConfirmation && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.passwordConfirmation.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledButtonGroup>
            <Button variant="dark" pill={false} arrow="none" type="submit">
              {t('app.pro.pages.resetPassword.form.buttons.submit')}
            </Button>
            <Link href={getPath('/login')} passHref>
              <LoginLink href={getPath('/login')}>
                {t('app.pro.pages.login.form.buttons.submit')}
              </LoginLink>
            </Link>
          </StyledButtonGroup>
        </form>
      </FormWrapper>
      <Link href={getPath('/')} passHref>
        <BackToProLink href={getPath('/')}>
          <BackLinkLabel>{t('app.pro.pages.login.backToHome')}</BackLinkLabel>
          <BackLinkIcon icon={Icons.DOUBLE_ANGLE_RIGHT} color="#FFF" size={2.5} />
        </BackToProLink>
      </Link>
    </>
  );
};
