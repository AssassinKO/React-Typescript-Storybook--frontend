import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { AddCompanyConfirmationPage } from '@homeproved/com/feature-company';
import { PageShell } from '@homeproved/com/feature-page-shell';

export const AddCompanyConfirmation: PageWithAuthorization = () => (
  <PageShell footerMargin={0}>
    <AddCompanyConfirmationPage />
  </PageShell>
);

export default AddCompanyConfirmation;
