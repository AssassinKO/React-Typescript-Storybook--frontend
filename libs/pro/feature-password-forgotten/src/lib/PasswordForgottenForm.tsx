import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactHtmlParser from 'react-html-parser';
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
  Intro,
  FormWrapper,
  Label,
  LoginLink,
  StyledButtonGroup,
  StyledFormGroup,
  BackToProLink,
} from '@homeproved/pro/ui';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useTheme } from '@material-ui/core';

const schema = z.object({
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
});

type FormData = z.infer<typeof schema>;

export const PasswordForgottenForm: FC = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation } = useMutationFetch('forgotPassword', usersApi.apiAuthForgotPasswordPost);

  const { register, handleSubmit, errors, getValues } = useForm<FormData>({
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'superadmin@calibrator.be',
          }
        : {},
    resolver: zodResolver(schema),
  });

  const setBackendErrorHandled = useRedirectOnSuccess(mutation, getPath('/login'), {
    from: 'password-forgotten',
    email: getValues().email,
  });

  const onSubmit = (data: FormData) => {
    setBackendErrorHandled(false);
    mutation.mutate(data);
  };

  return (
    <>
      <FormWrapper>
        <Intro>
          <div>
            <strong>{t('app.pro.pages.passwordForgotten.title')}</strong>
          </div>
          <div>{ReactHtmlParser(t('app.pro.pages.passwordForgotten.description'))}</div>
        </Intro>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormGroup>
            <Label htmlFor="email">{t('app.pro.pages.passwordForgotten.form.user')}</Label>
            <Input autoComplete="email" ref={register} name="email" />
            {errors.email && (
              <ErrorMessage bold color={theme.palette.grey['900']}>
                {t(errors.email.message)}
              </ErrorMessage>
            )}
          </StyledFormGroup>
          <StyledButtonGroup>
            <Button variant="dark" pill={false} arrow="none" type="submit">
              {t('app.pro.pages.passwordForgotten.form.buttons.submit')}
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
