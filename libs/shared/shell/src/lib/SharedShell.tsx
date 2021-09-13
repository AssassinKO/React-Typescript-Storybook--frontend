import React, { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import { Hydrate, HydrateProps } from 'react-query/hydration';
import { CookiesProvider } from 'react-cookie';
import { AppTheme, NotistackProvider, theme } from '@homeproved/shared/ui';
import { PersistentDataProvider, queryClient } from '@homeproved/shared/data-access';
import { AutoLogin } from '@homeproved/shared/feature-auth';
import { AuthorizationRoot } from '@homeproved/shared-feature-auth-codana';
import {
  getURLWithoutSubdomain,
  PageScrollContextProvider,
  useRouterScroll,
} from '@homeproved/shared/util';
import { RegistrationFormDataProvider } from '@homeproved/shared/feature-forms';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

type Props = {
  dehydratedState?: HydrateProps['state'];
};

export const SharedShell: FC<Props> = ({ children, dehydratedState }) => {
  useRouterScroll();
  const cookieDomain =
    typeof window !== 'undefined' ? getURLWithoutSubdomain(window.location.hostname) : undefined;

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <PersistentDataProvider>
          <RegistrationFormDataProvider>
            <PageScrollContextProvider>
              <Hydrate state={dehydratedState}>
                <AppTheme theme={theme}>
                  <NotistackProvider>
                    <AuthorizationRoot autoLogin={<AutoLogin />} cookieDomain={cookieDomain}>
                      <GoogleReCaptchaProvider
                        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      >
                        {children}
                      </GoogleReCaptchaProvider>
                    </AuthorizationRoot>
                  </NotistackProvider>
                </AppTheme>
              </Hydrate>
            </PageScrollContextProvider>
          </RegistrationFormDataProvider>
        </PersistentDataProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};
