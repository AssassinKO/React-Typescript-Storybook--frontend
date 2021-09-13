import React, { FC } from 'react';
import { PageShell } from '@homeproved/pro/feature-page-shell';
import { RegistrationThanks } from './thanks/RegistrationThanks';

export const RegistrationThanksPage: FC = () => (
  <PageShell minimalHeader>
    <RegistrationThanks />
  </PageShell>
);
