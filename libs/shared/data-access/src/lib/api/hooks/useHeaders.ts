import { useAuthContext } from '@homeproved/shared-feature-auth-codana';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';

const useHeaders = () => {
  const { jwt } = useAuthContext();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept-Language': useCurrentLanguage(),
    Accept: 'application/json',
  };

  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  return headers;
};

export default useHeaders;
