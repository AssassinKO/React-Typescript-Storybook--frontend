import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@homeproved/shared/ui';
import { useLogout } from '@homeproved/shared-feature-auth-codana';


export const LogoutButton: FC = () => {
  const { t } = useTranslation();
  const logout = useLogout();

  return (
    <Button variant="dark" pill={false} onClick={logout}>
      {t('shared.logout')}
    </Button>
  );
};
