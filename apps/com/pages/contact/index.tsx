import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { ContactPage } from '@homeproved/com/feature-contact';

export const Index: PageWithAuthorization = () => {
  return (
    <PageShell innerPadding={false} fullWidth={true}>
      <ContactPage />
    </PageShell>
  );
};

Index.authenticate = false;

export default Index;
