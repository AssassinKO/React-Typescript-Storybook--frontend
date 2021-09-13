import React from 'react';
import Head from 'next/head';
import './styles.css';
import { ProShell } from '@homeproved/pro/shell';
import { appWithTranslation, useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { AppProps, PageAuthenticationWrapper } from '@homeproved/shared/feature-auth';
import { useRemoveSSRStyles } from '@homeproved/shared/util';
import 'react-image-crop/dist/ReactCrop.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { getPath } = useLocalizedRoutes();
  const currentLang = useCurrentLanguage();

  useRemoveSSRStyles();

  return (
    <>
      <Head>
        <title>Homeproved.pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/yql6lhl.css" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&language=${currentLang}`}
        />
        <script src="https://js.chargebee.com/v2/chargebee.js" data-cb-site="homeproved-test" />
      </Head>
      <ProShell dehydratedState={pageProps?.dehydratedState}>
        <PageAuthenticationWrapper
          authenticate={Component.authenticate}
          redirectAuthenticatedTo={
            Component.redirectAuthenticatedTo
              ? getPath(Component.redirectAuthenticatedTo)
              : undefined
          }
          redirectUnAuthenticatedTo={Component.redirectUnAuthenticatedTo}
          defaultRedirectUnAuthenticatedTo={getPath('/login')}
        >
          <Component {...pageProps} />
        </PageAuthenticationWrapper>
      </ProShell>
    </>
  );
};

export default appWithTranslation(CustomApp);
