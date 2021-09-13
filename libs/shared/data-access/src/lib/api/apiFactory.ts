import { Language, useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { Configuration } from './generated-api';
import { useJwt } from '@homeproved/shared-feature-auth-codana';

type ApiFactoryFn<TReturn> = (configuration?: Configuration) => TReturn;

export const apiFactory = <
  TApiFactory extends ApiFactoryFn<TReturn>,
  TReturn = ReturnType<TApiFactory>
>(
  language: Language,
  ApiFactory: TApiFactory,
  jwt?: string
): TReturn => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': language,
    ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
  };

  return ApiFactory(
    new Configuration({
      basePath: process.env.NEXT_PUBLIC_NX_API_ROUTE || ' ',
      baseOptions: {
        headers,
      },
    })
  );
};

export const useApiFactory = <
  TApiFactory extends ApiFactoryFn<TReturn>,
  TReturn = ReturnType<TApiFactory>
>(
  ApiFactory: TApiFactory
): TReturn => {
  const currentLanguage = useCurrentLanguage();
  const jwt = useJwt();

  return apiFactory(currentLanguage, ApiFactory, jwt);
};
