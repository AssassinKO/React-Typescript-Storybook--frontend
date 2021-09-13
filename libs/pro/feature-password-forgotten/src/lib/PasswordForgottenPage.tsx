import React, { FC } from 'react';
import { AuthPageWrapper } from '@homeproved/pro/ui';
import { PasswordForgottenForm } from './PasswordForgottenForm';

export const PasswordForgottenPage: FC = () => (
  <AuthPageWrapper>
    <PasswordForgottenForm />
  </AuthPageWrapper>
);
