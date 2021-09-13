import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { BrochurePage } from '@homeproved/pro/feature-brochure';

export const Brochure: PageWithAuthorization = () => <BrochurePage />;

Brochure.authenticate = false;

export default Brochure;
