import React from 'react';
import { AppContext, AppProps } from 'next/app';
import i18next from 'i18next';
import hoistNonReactStatics from 'hoist-non-react-statics';
import initI18n from './init';
import useCurrentLanguage from './useCurrentLanguage';
import { Language } from './types';

const appWithTranslation = (WrappedComponent) => {
  const AppWithTranslation = (
    props: AppProps & { translations: Record<string, unknown>; locale: Language }
  ) => {
    if (!i18next.isInitialized) {
      initI18n(props.translations, props.locale).then();
      i18next.changeLanguage(props.locale).then();
    }
    const lang = useCurrentLanguage();
    return <WrappedComponent key={lang} {...props} />;
  };

  AppWithTranslation.getInitialProps = async (appContext: AppContext) => {
    const isServer = typeof window === 'undefined';
    const appProps = (await WrappedComponent.getInitialProps?.(appContext)) || {};

    let translations = i18next?.getDataByLanguage?.(appContext.router.locale)?.translation;

    if (!translations && (!isServer || process.env.NEXT_PUBLIC_NX_API_ROUTE)) {
      translations = await fetch(`${process.env.NEXT_PUBLIC_NX_API_ROUTE || ''}/api/labels`, {
        headers: {
          'Accept-Language': appContext.router.locale,
        },
      }).then((response) => response.json());
      i18next.addResourceBundle?.(appContext.router.locale, 'translation', translations);
    }

    if (i18next.isInitialized && i18next.language !== appContext.router.locale) {
      await i18next.changeLanguage(appContext.router.locale);
    }

    return { ...appProps, translations: translations || {}, locale: appContext.router.locale };
  };

  return hoistNonReactStatics(AppWithTranslation, WrappedComponent);
};

export default appWithTranslation;
