import { FC } from 'react';
import { Button, ButtonVariant } from '@homeproved/shared/ui';
import { useAuthPending, useUser } from '@homeproved/shared-feature-auth-codana';
import { useTranslation } from 'react-i18next';

const isServer = () => typeof window === 'undefined';

type Props = {
  getPath: (path: string) => string;
  variant?: ButtonVariant;
};

export const AuthButton: FC<Props> = ({ getPath, variant = 'white' }) => {
  const isAuthPending = useAuthPending();
  const { t } = useTranslation();
  const user = useUser();

  if (isAuthPending || isServer()) return null;

  return (
    <Button variant={variant} href={user ? getPath('/profile') : getPath('/login')}>
      {user ? t('app.pro.dashboard.menu.profile.title') : t('app.pro.pages.login.title')}
    </Button>
  );
};
