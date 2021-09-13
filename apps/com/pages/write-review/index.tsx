import React from 'react';
import { PageShell } from '@homeproved/com/feature-page-shell';
import { WriteReviewPage } from '@homeproved/shared/feature-reviews';
import { ALGOLIA_INDEX, searchClient } from '@homeproved/com/feature-search';
import { InstantSearch } from 'react-instantsearch-dom';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const Index: PageWithAuthorization = () => {
  const { getPath } = useLocalizedRoutes();

  return (
    <PageShell padding={false} innerPadding={false} fullWidth={true} omitFooter>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX.COMPANIES}>
        <WriteReviewPage getPath={getPath} />
      </InstantSearch>
    </PageShell>
  );
};

export default Index;
