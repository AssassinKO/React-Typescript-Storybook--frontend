import React, { FC } from 'react';
import { PageShell } from '@homeproved/pro/feature-page-shell';
import { RegistrationVerifyEmail } from './verify-email/RegistrationVerifyEmail';

type RegistrationVerifyEmailPageProps = {
  id: string;
  hash: string;
  expires: string;
  signature: string;
};

export const RegistrationVerifyEmailPage: FC<RegistrationVerifyEmailPageProps> = (props) => (
  <PageShell minimalHeader>
    <RegistrationVerifyEmail {...props} />
  </PageShell>
);
