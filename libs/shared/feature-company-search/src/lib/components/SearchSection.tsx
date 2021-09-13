import { usePersistentData } from '@homeproved/shared/data-access';
import { CustomSearchBox } from './CustomSearchBox';
import { Button, SectionTitle } from '@homeproved/shared/ui';
import { Box, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ContentWrapper,
  SearchLabel,
  SearchSectionTitle,
  SearchTitle,
  SearchWrapper,
} from './Atoms';
import { CustomHits } from './CustomHits';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Configure, Index, InstantSearch, InstantSearchProps } from 'react-instantsearch-dom';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { StyledPagination } from '@homeproved/shared/feature-algolia';
import { CustomStats } from './CustomStats';

type SearchSectionProps = {
  isMobile: boolean;
  getPath: GetPathFunction;
  sectorName: string;
  subSectorName: string;
  searchClient?: InstantSearchProps['searchClient'];
  indexName?: InstantSearchProps['indexName'];
  resultsState?: InstantSearchProps['resultsState'];
  widgetsCollector?: InstantSearchProps['widgetsCollector'];
};

export const SearchSection: FC<SearchSectionProps> = ({
  isMobile,
  getPath,
  searchClient,
  indexName,
  resultsState,
  widgetsCollector,
  sectorName,
  subSectorName,
}) => {
  const currentLanguage = useCurrentLanguage();
  const { searchTerm } = usePersistentData();
  const [totalHits, setTotalHits] = useState(0);
  const router = useRouter();
  const { t } = useTranslation();
  const contentWrapperRef = useRef<HTMLDivElement>();

  const executeScroll = () => {
    if (contentWrapperRef && contentWrapperRef.current != null)
      contentWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOnClickAdvancedSearch = () => {
    router.push(getPath('/company-search'), undefined, { shallow: true }).then();
  };

  return (
    <ContentWrapper mobile={isMobile} innerRef={contentWrapperRef}>
      {!isMobile && <SectionTitle label={t('app.com.pages.sectors.subSector.sectionTitle')} />}
      {isMobile && (
        <SearchSectionTitle variant="h2" mobile={isMobile}>
          {t('app.com.pages.sectors.subSector.sectionTitle')}
        </SearchSectionTitle>
      )}

      <Grid container justify="center">
        <Grid item xs={12} sm={8}>
          <InstantSearch
            searchClient={searchClient}
            indexName={indexName}
            resultsState={resultsState}
            widgetsCollector={widgetsCollector}
          >
            <CustomStats setTotalHits={setTotalHits} />
            <Index indexName={indexName}>
              <Configure
                facetFilters={`${currentLanguage}.sectors.lvl1:${sectorName} > ${subSectorName}`}
              />
            </Index>

            <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={3}>
              <SearchWrapper mobile={isMobile}>
                <SearchLabel variant="body1" mobile={isMobile}>
                  {t('app.com.pages.sectors.subSector.searchLabel')}
                </SearchLabel>
                <CustomSearchBox defaultRefinement={searchTerm} placeholder=" " />
              </SearchWrapper>
              {!isMobile && (
                <Button variant="gradient" onClick={handleOnClickAdvancedSearch}>
                  {t('app.com.pages.sectors.subSector.advancedSearch')}
                </Button>
              )}
            </Box>
            {!isMobile && (
              <SearchTitle variant="h3">
                {`${t('app.com.pages.sectors.subSector.searchResults')} `}
                <span style={{ fontWeight: 300 }}>({totalHits})</span>
              </SearchTitle>
            )}
            <Box>
              <CustomHits getPath={getPath} />
              <StyledPagination onExecuteScroll={executeScroll} />
            </Box>
          </InstantSearch>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};
