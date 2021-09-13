import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { InstantSearchProps } from 'react-instantsearch-dom';
import { Header, Intro, IntroText, Title } from './components/Atoms';
import { ReviewSection } from './components/ReviewSection';
import { ArticleSection } from './components/ArticleSection';
import { SearchSection } from '@homeproved/shared/feature-company-search';
import { SectorData } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Breadcrumb } from '@homeproved/shared/ui';

const PageWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)``;

export type SubsectorPageProps = {
  subSector: SectorData;
  sector: SectorData;
  getPath: GetPathFunction;
  searchClient: InstantSearchProps['searchClient'];
  indexName: InstantSearchProps['indexName'];
  resultsState: InstantSearchProps['resultsState'];
};

export const SubSectorPage: FC<SubsectorPageProps> = ({
  sector,
  subSector,
  getPath,
  searchClient,
  indexName,
  resultsState,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  const isDesktop = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.lg));
  return (
    <PageWrapper>
      {!isMobile && (
        <Breadcrumb includeHomepageLink>
          {sector.name} / <strong>{subSector.name}</strong>
        </Breadcrumb>
      )}
      <div>
        <Header
          mobile={isMobile}
          bgImage={
            subSector.banner &&
            (isMobile
              ? subSector.banner.data.conversions['landscape-s']
              : isTablet
              ? subSector.banner.data.conversions['landscape-m']
              : isDesktop
              ? subSector.banner.data.conversions['landscape-l']
              : subSector.banner.data.conversions['landscape-xl'])
          }
        >
          {!isMobile && (
            <Intro mobile={isMobile}>
              <Title variant="h1" mobile={isMobile}>
                {subSector.name}
              </Title>
              <IntroText variant="body1">{subSector.description}</IntroText>
            </Intro>
          )}
        </Header>
        {isMobile && (
          <Intro mobile={isMobile}>
            <Title variant="h1" mobile={false}>
              {subSector.name}
            </Title>
            <IntroText variant="body1">{t('app.com.pages.sectors.subSector.intro')}</IntroText>
          </Intro>
        )}
      </div>
      <SearchSection
        isMobile={isMobile}
        getPath={getPath}
        searchClient={searchClient}
        indexName={indexName}
        resultsState={resultsState}
        sectorName={sector.name}
        subSectorName={subSector.name}
      />
      <ReviewSection
        isMobile={isMobile}
        sectorName={subSector.name}
        sectorSlug={subSector.slug}
        getPath={getPath}
      />
      <ArticleSection
        isMobile={isMobile}
        sectorName={subSector.name}
        getPath={getPath}
        sectorSlug={subSector.slug}
      />
    </PageWrapper>
  );
};
