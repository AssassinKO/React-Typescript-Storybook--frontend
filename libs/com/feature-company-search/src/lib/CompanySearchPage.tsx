import React, { useEffect, useState } from 'react';
import { Configure, Index, InstantSearch } from 'react-instantsearch-dom';
import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { ALGOLIA_INDEX, searchClient } from '@homeproved/com/feature-search';
import {
  CustomHits,
  CustomSearchBox,
  CustomStats,
  useCoordinates,
} from '@homeproved/shared/feature-company-search';
import { useTranslation } from 'react-i18next';
import { Button, Icons, ShadowOverlay } from '@homeproved/shared/ui';
import {
  ContentWrapper,
  FacetTitle,
  Header,
  SearchTitle,
  SearchWrapper,
  Separator,
  Sidebar,
} from './components/Atoms';
import { useDisclosure } from 'react-use-disclosure';
import { useClickOutside, usePageScroll } from '@homeproved/shared/util';
import { CompanySearchSidebar } from './components/CompanySearchSidebar';
import styled from 'styled-components';
import FilterComponent from './components/FilterComponent';
import { usePersistentData } from '@homeproved/shared/data-access';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { StyledPagination } from '@homeproved/shared/feature-algolia';

const PageWrapper = styled(({ height, ...restProps }) => <div {...restProps} />)`
  min-height: ${({ height }) => `${height}px`};
`;

export const CompanySearchPage = () => {
  const { t } = useTranslation();
  const { searchTerm } = usePersistentData();
  const { getPath } = useLocalizedRoutes();
  const { geoProps } = useCoordinates();
  const { setPageScrollEnabled } = usePageScroll();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const {
    isOpen: offCanvasOpen,
    close: onCloseOffCanvas,
    toggle: onToggleOffCanvas,
  } = useDisclosure(isMobile);

  const [totalHits, setTotalHits] = useState(0);
  const sidebarRef: React.RefObject<HTMLDivElement> = React.useRef();
  const toggleBtnRef: React.RefObject<HTMLDivElement> = React.useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => {
    setPageScrollEnabled(!offCanvasOpen);
  }, [offCanvasOpen, setPageScrollEnabled]);

  useClickOutside(sidebarRef, onCloseOffCanvas, [toggleBtnRef]);

  useEffect(() => {
    if (sidebarRef.current == null) return;
    setSidebarHeight(sidebarRef.current.clientHeight);
  }, [sidebarRef, setSidebarHeight, isMobile]);

  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX.COMPANIES}>
      <CustomStats setTotalHits={setTotalHits} />
      <Index indexName={ALGOLIA_INDEX.COMPANIES} key={ALGOLIA_INDEX.COMPANIES}>
        <Configure {...geoProps} />
      </Index>
      {/* START Sidebar */}
      {isMobile && (
        <>
          <Sidebar innerRef={sidebarRef} mobile={isMobile} offCanvasOpen={offCanvasOpen}>
            <CompanySearchSidebar
              offCanvas={isMobile}
              onToggleOffCanvas={onToggleOffCanvas}
              toggleBtnRef={toggleBtnRef}
            >
              <FilterComponent isMobile={isMobile} />
            </CompanySearchSidebar>
          </Sidebar>
          {offCanvasOpen && <ShadowOverlay />}
        </>
      )}
      {/* END Sidebar */}
      <PageWrapper height={sidebarHeight}>
        <Header>
          <SearchTitle mobile={isMobile}>{t('app.com.pages.companySearch.title')}</SearchTitle>
          <SearchWrapper>
            <CustomSearchBox
              defaultRefinement={searchTerm}
              placeholder={t('app.com.pages.companySearch.placeholder')}
            />
          </SearchWrapper>
        </Header>
        <ContentWrapper mobile={isMobile}>
          <Grid container spacing={6}>
            {!isMobile && (
              <Grid item xs={12} sm={4}>
                <FilterComponent isMobile={isMobile} />
              </Grid>
            )}
            <Grid item xs={12} sm={8}>
              {isMobile && (
                <Box maxWidth="50rem" margin="auto" mb={3}>
                  <Button
                    arrow="none"
                    variant="dark"
                    pill={false}
                    icon={Icons.FILTER}
                    fullWidth
                    onClick={onToggleOffCanvas}
                    innerRef={toggleBtnRef}
                  >
                    {t('app.com.pages.companySearch.filterSection.filterBtnText')}
                  </Button>
                </Box>
              )}
              <FacetTitle size="large" mobile={isMobile}>
                {`${t('app.com.pages.companySearch.mainSection.title')} `}
                <span style={{ fontWeight: 300 }}>({totalHits})</span>
              </FacetTitle>
              {isMobile && <Separator />}
              <CustomHits getPath={getPath} />
              <StyledPagination />
            </Grid>
          </Grid>
        </ContentWrapper>
      </PageWrapper>
    </InstantSearch>
  );
};
