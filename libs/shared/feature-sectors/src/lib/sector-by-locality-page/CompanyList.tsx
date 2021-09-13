import React, { FC } from 'react';
import { Configure, Index, InstantSearch, InstantSearchProps } from 'react-instantsearch-dom';
import { CustomHits, CustomStats, useCoordinates } from '@homeproved/shared/feature-company-search';
import { StyledPagination } from '@homeproved/shared/feature-algolia';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type Props = {
  sector: string;
  getPath: GetPathFunction;
  searchClient?: InstantSearchProps['searchClient'];
  indexName?: InstantSearchProps['indexName'];
  resultsState?: InstantSearchProps['resultsState'];
  widgetsCollector?: InstantSearchProps['widgetsCollector'];
  setTotalHits?: React.Dispatch<React.SetStateAction<number>>;
  onExecuteScroll?: () => void;
  location?: {
    lat: number;
    lng: number;
  };
};
export const CompanyList: FC<Props> = ({
  searchClient,
  indexName,
  resultsState,
  widgetsCollector,
  sector,
  getPath,
  setTotalHits,
  onExecuteScroll,
  location,
}) => {
  const currentLanguage = useCurrentLanguage();
  const { geoProps } = useCoordinates(20000, location);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      resultsState={resultsState}
      widgetsCollector={widgetsCollector}
    >
      <CustomStats setTotalHits={setTotalHits} />
      <Index indexName={indexName}>
        <Configure
          facetFilters={`${currentLanguage}.sectors.lvl0:${sector}`}
          // restrictSearchableAttributes="city"
          // query={locality}
          {...geoProps}
        />
      </Index>

      <CustomHits getPath={getPath} />
      <StyledPagination onExecuteScroll={onExecuteScroll} />
    </InstantSearch>
  );
};
