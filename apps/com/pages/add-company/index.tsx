import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { AddCompanyPage } from '@homeproved/com/feature-company';
import { PageShell } from '@homeproved/com/feature-page-shell';

export const AddCompany: PageWithAuthorization = () => (
  <PageShell footerMargin={0}>
    <AddCompanyPage />
  </PageShell>
);

export default AddCompany;
