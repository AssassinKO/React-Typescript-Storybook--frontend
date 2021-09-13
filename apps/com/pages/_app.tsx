import React from 'react';
import Head from 'next/head';
import './styles.css';
import { ComShell } from '@homeproved/com/shell';
import { appWithTranslation } from '@homeproved/shared/feature-i18n';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { AppProps, PageAuthenticationWrapper } from '@homeproved/shared/feature-auth';
import { useRemoveSSRStyles } from '@homeproved/shared/util';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { getPath } = useLocalizedRoutes();

  useRemoveSSRStyles();

  return (
    <>
      <Head>
        <title>Homeproved.com</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon.png" />
        <meta name="og:image" content={pageProps?.ogImage} />
        <link rel="stylesheet" href="https://use.typekit.net/yql6lhl.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
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
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&language=nl&region=BE`}
        />
      </Head>
      <ComShell dehydratedState={pageProps?.dehydratedState}>
        <PageAuthenticationWrapper
          authenticate={Component.authenticate}
          redirectAuthenticatedTo={
            Component.redirectAuthenticatedTo
              ? getPath(Component.redirectAuthenticatedTo)
              : undefined
          }
          redirectUnAuthenticatedTo={Component.redirectUnAuthenticatedTo}
          defaultRedirectUnAuthenticatedTo={getPath('/')}
        >
          <Component {...pageProps} />
        </PageAuthenticationWrapper>
      </ComShell>
    </>
  );
};

export default appWithTranslation(CustomApp);
