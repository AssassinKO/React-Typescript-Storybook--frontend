import React, { FC, useEffect } from 'react';
import { AuthPageWrapper } from '@homeproved/pro/ui';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { LoginForm } from './LoginForm';
import { useCookies } from 'react-cookie';
import { getURLWithoutSubdomain } from '@homeproved/shared/util';
import { useMediaQuery, useTheme } from '@material-ui/core';

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, removeCookie] = useCookies(['upgrade_modal']);

  const cookieDomain =
    typeof window !== 'undefined' ? getURLWithoutSubdomain(window.location.hostname) : undefined;

  useEffect(() => {
    if (!cookies['upgrade_modal']) return;
    removeCookie('upgrade_modal', false, {
      path: '/',
      domain: cookieDomain,
    });
  }, [cookies, removeCookie, cookieDomain]);

  useEffect(() => {
    if (router.query.from === 'password-forgotten' && !!router.query.email) {
      enqueueSnackbar(
        t('app.pro.pages.login.fromPasswordForgotten', {
          replace: {
            email: `'${router.query.email}'`,
          },
        }),
        { variant: 'info' }
      );
    }

    if (router.query.from === 'password-reset') {
      enqueueSnackbar(
        t('app.pro.pages.login.fromPasswordReset', {
          replace: {
            email: `'${router.query.email}'`,
          },
        }),
        { variant: 'info' }
      );
    }
  });

  return (
    <AuthPageWrapper isTablet={isTablet}>
      <LoginForm />
    </AuthPageWrapper>
  );
};
