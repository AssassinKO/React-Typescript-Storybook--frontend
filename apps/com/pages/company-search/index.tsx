import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { CompanySearchPage } from '@homeproved/com/feature-company-search';

export const CompanySearch: PageWithAuthorization = () => {
  return (
    <PageShell padding={false} innerPadding={false} fullWidth={true}>
      <CompanySearchPage />
    </PageShell>
  );
};

export default CompanySearch;
