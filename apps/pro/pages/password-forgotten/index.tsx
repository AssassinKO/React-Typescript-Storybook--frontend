import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { PasswordForgottenPage } from '@homeproved/pro/feature-password-forgotten';

export const Index: PageWithAuthorization = () => <PasswordForgottenPage />;

Index.authenticate = false;
Index.redirectAuthenticatedTo = '/reviews';

export default Index;
