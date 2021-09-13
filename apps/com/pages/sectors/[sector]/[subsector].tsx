import { PageShell } from '@homeproved/com/feature-page-shell';
import { useRouter } from 'next/router';
import React from 'react';
import { getDehydratedState, SectorDescendant } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useSectors, prefetch, SubSectorPage } from '@homeproved/shared/feature-sectors';
import { ALGOLIA_INDEX, searchClient } from '@homeproved/com/feature-search';
import { SearchSection } from '@homeproved/shared/feature-company-search';
import { getResultsState } from '@homeproved/shared/feature-algolia';

const Index = ({ resultsState }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: sectors, isLoading, error } = useSectors();
  const { getPath } = useLocalizedRoutes();
  if (isLoading) return <>{t('app.pro.pages.profile.activitypicker.loading')}</>;
  if (error) return <>{error.toString()}</>;
  if (!sectors) return <>{t('app.pro.pages.profile.activitypicker.invalid')}</>;
  const { sector, subsector } = router.query;
  const fetchedSector = sectors.find((s) => s.data.slug === sector);

  if (!fetchedSector || fetchedSector.data == null) {
    router.replace(getPath('/sectors')).then();
    return <>{t('app.com.pages.sectors.subSector.redirect')}</>;
  }

  const fetchedSubSector = fetchedSector.data.descendants.find(
    (sectorDescendant: SectorDescendant) => sectorDescendant.data.slug === subsector
  ) as SectorDescendant;

  if (!fetchedSubSector || fetchedSubSector.data == null) {
    router.replace(getPath('/sectors')).then();
    return <>{t('app.com.pages.sectors.subSector.redirect')}</>;
  }

  return (
    <PageShell fullWidth={true} innerPadding={false} padding={false}>
      <SubSectorPage
        sector={fetchedSector.data}
        subSector={fetchedSubSector.data}
        getPath={getPath}
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX.COMPANIES}
        resultsState={resultsState}
      />
    </PageShell>
  );
};

export async function getServerSideProps({ locale, query }) {
  const dehydratedState = await getDehydratedState(prefetch.subSector(locale));
  const resultsState = await getResultsState(
    <SearchSection
      getPath={() => '/'}
      isMobile={false}
      sectorName={query.sector}
      subSectorName={query.subsector}
    />,
    {
      searchClient,
      indexName: ALGOLIA_INDEX.COMPANIES,
    }
  );

  return {
    props: {
      dehydratedState,
      resultsState,
    },
  };
}

export default Index;
