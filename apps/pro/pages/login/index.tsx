import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { LoginPage } from '@homeproved/pro/feature-login';

export const Index: PageWithAuthorization = () => <LoginPage />;

Index.authenticate = false;
Index.redirectAuthenticatedTo = '/dashboard';

export default Index;
