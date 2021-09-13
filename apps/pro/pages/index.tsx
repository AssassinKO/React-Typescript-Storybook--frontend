import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { Homepage } from '@homeproved/pro/feature-homepage';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const { getPath: getComPath } = useComLocalizedRoutes();

  return <Homepage getComPath={getComPath} />;
};

export default Index;
