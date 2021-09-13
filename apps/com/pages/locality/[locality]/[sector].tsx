import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import {
  CityInfoData,
  CompanyList,
  prefetch,
  SectorByLocalityPage,
  useSectors,
} from '@homeproved/shared/feature-sectors';
import { Header } from '@homeproved/com/feature-header';
import { Footer } from '@homeproved/com/feature-footer';
import { searchClient, ALGOLIA_INDEX } from '@homeproved/com/feature-search';
import { getDehydratedState } from '@homeproved/shared/data-access';
import { getResultsState } from '@homeproved/shared/feature-algolia';

const Index = ({ resultsState }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: sectors, isLoading, error } = useSectors();
  const { getPath } = useLocalizedRoutes();
  const { sector, locality } = router.query;
  const fetchedSector = sectors.find((s) => s.data.slug === sector);

  useEffect(() => {
    if (!fetchedSector || fetchedSector.data == null) {
      router.replace(getPath('/sectors')).then();
    }
  }, [fetchedSector, getPath, router, t]);

  if (isLoading) return <>{t('app.pro.pages.profile.activitypicker.loading')}</>;
  if (error) return <>{error.toString()}</>;
  if (!sectors) return <>{t('app.pro.pages.profile.activitypicker.invalid')}</>;

  return fetchedSector == null ? null : (
    <>
      <Header transparent />
      <SectorByLocalityPage
        sector={fetchedSector.data}
        locality={locality.toString()}
        getPath={getPath}
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX.COMPANIES}
        resultsState={resultsState}
      />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ locale, query }) {
  const dehydratedState = await getDehydratedState(prefetch.subSector(locale, query.locality));

  const resultsState = await getResultsState(
    <CompanyList
      getPath={() => '/'}
      sector={query.sector}
      location={(dehydratedState.queries[1]?.state.data as CityInfoData)?.location}
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
