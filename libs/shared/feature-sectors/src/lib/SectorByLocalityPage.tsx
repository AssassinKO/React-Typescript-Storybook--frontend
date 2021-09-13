import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { Button, TopGradient } from '@homeproved/shared/ui';
import { ReviewSection } from './components/ReviewSection';
import { ArticleSection } from './components/ArticleSection';
import { LocalityPrimarySection } from './components/LocalityPrimarySection';
import { useRouter } from 'next/router';
import { ContentWrapper } from '@homeproved/shared/feature-company-search';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { InstantSearchProps } from 'react-instantsearch-dom';
import { CompanyList } from './sector-by-locality-page/CompanyList';
import { useGetCityInfo } from './api/useGetCityInfo';
import { SectorData } from '@homeproved/shared/data-access';

const PageWrapper = styled.div`
  .ais-Pagination {
    * {
      z-index: 0;
    }
  }
  section {
    z-index: 9;
    position: relative;
  }
`;

const SearchTitle = styled(({ isMobile = false, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.8rem;
  position: relative;
  z-index: 9;
  margin-bottom: 2rem;
  ${({ isMobile }) =>
    isMobile &&
    `
  margin-top: 2rem;
  color: #fff;
  margin-bottom: 0;
  `}
`;

const ButtonWrapper = styled(({ isMobile = false, ...restProps }) => <div {...restProps} />)`
  margin: ${({ isMobile }) => (isMobile ? '0 auto 2rem' : '0 0 2rem')};
`;

export type SectorByLocalityPageProps = {
  sector: SectorData;
  locality: string;
  getPath: GetPathFunction;

  searchClient?: InstantSearchProps['searchClient'];
  indexName?: InstantSearchProps['indexName'];
  resultsState?: InstantSearchProps['resultsState'];
  widgetsCollector?: InstantSearchProps['widgetsCollector'];
};

export const SectorByLocalityPage: FC<SectorByLocalityPageProps> = ({
  sector,
  locality,
  getPath,
  searchClient,
  indexName,
  resultsState,
  widgetsCollector,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  const [totalHits, setTotalHits] = useState(0);
  const router = useRouter();
  const contentWrapperRef = useRef<HTMLDivElement>();
  const { data: cityInfo } = useGetCityInfo(locality.toLowerCase());
  const cityName = cityInfo?.fullName || locality;

  const executeScroll = () => {
    if (contentWrapperRef && contentWrapperRef.current != null)
      contentWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOnClickAdvancedSearch = () => {
    router.push(getPath('/company-search'), undefined, { shallow: true }).then();
  };

  return (
    <PageWrapper>
      {isMobile && (
        <SearchTitle variant="h3" align="center" isMobile={isMobile}>
          {`${t('app.com.pages.sectors.subSectorByLocality.inProximity')
            .replace('%SECTOR%', sector.name)
            .replace('%LOCALITY%', cityName)} `}
          <span style={{ fontWeight: 300 }}>({totalHits})</span>
        </SearchTitle>
      )}
      <LocalityPrimarySection
        tablet={isTablet}
        mobile={isMobile}
        sectorName={sector.name}
        locality={cityName}
      />
      <TopGradient isMobile={isMobile} />
      {cityInfo != null ? (
        <>
          <ContentWrapper mobile={isMobile} innerRef={contentWrapperRef}>
            <Grid container justify="center">
              <Grid item xs={12} sm={8}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                  {!isMobile && (
                    <SearchTitle variant="h3">
                      {`${t('app.com.pages.sectors.subSectorByLocality.inProximity')
                        .replace('%SECTOR%', sector.name)
                        .replace('%LOCALITY%', cityName)} `}
                      <span style={{ fontWeight: 300 }}>({totalHits})</span>
                    </SearchTitle>
                  )}
                  <ButtonWrapper isMobile={isMobile}>
                    <Button variant="gradient" onClick={handleOnClickAdvancedSearch}>
                      {t('app.com.pages.sectors.subSector.advancedSearch')}
                    </Button>
                  </ButtonWrapper>
                </Box>
                <Box>
                  <CompanyList
                    sector={sector.name}
                    getPath={getPath}
                    resultsState={resultsState}
                    widgetsCollector={widgetsCollector}
                    indexName={indexName}
                    searchClient={searchClient}
                    setTotalHits={setTotalHits}
                    onExecuteScroll={executeScroll}
                    location={cityInfo.location}
                  />
                </Box>
              </Grid>
            </Grid>
          </ContentWrapper>
          <ReviewSection
            isMobile={isMobile}
            sectorName={sector.name}
            sectorSlug={sector.slug}
            locality={locality}
            getPath={getPath}
            location={cityInfo.location}
          />
          <ArticleSection
            isMobile={isMobile}
            sectorName={sector.name}
            sectorSlug={sector.slug}
            locality={locality}
            getPath={getPath}
            location={cityInfo.location}
          />
        </>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={2} zIndex={9}>
            <Typography variant="body1">
              {t('app.com.pages.sectors.subSectorByLocality.localityNotFound')}
            </Typography>
          </Box>
          <Button href="/">
            {t('app.com.pages.sectors.subSectorByLocality.localityNotFoundCta')}
          </Button>
        </Box>
      )}
    </PageWrapper>
  );
};
