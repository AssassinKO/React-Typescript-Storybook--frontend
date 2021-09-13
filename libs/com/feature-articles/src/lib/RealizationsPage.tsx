import React, { FC, useEffect, useRef, useState } from 'react';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { SectionTitle, SectorMenu, SectorSidebar, theme } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery } from '@material-ui/core';
import { useSectors } from '@homeproved/shared/feature-sectors';
import { useDisclosure } from 'react-use-disclosure';
import { useClickOutside } from '@homeproved/shared/util';
import {
  Wrapper,
  LoadingMessage,
  InnerWrapper,
  ContentWrapper,
  Sidebar,
  StyledA,
} from './components/Atoms';
import { Cover } from './components/Cover';
import { FourArticles } from './components/FourArticles';
import { NewsletterSection } from './components/NewsletterSection';
import TrackVisibility from 'react-on-screen';
import { MostRead } from './components/MostRead';
import { InfiniteRealizations } from './components/InfiniteRealizations';
import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import Link from 'next/link';

type RealizationsPageProps = {
  getPath: GetPathFunction;
};

export const RealizationsPage: FC<RealizationsPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.sm));
  const isDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
  const isLargerDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md + 80));
  const { data: sectors, isLoading, isSuccess } = useSectors();
  const {
    isOpen: offCanvasOpen,
    close: onCloseOffCanvas,
    toggle: onToggleOffCanvas,
  } = useDisclosure(false);
  const sidebarRef: React.RefObject<HTMLDivElement> = useRef();
  const toggleBtnRef: React.RefObject<HTMLDivElement> = useRef();
  useClickOutside(sidebarRef, onCloseOffCanvas, [toggleBtnRef]);

  const [perPage, setPerPage] = useState(9);
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const getApiRoute = () => realizationsApi.apiRealisationGet('desc', perPage);
  const { query } = useQueryFetch('realizations', getApiRoute);
  const {
    data: realizationData,
    isSuccess: realizationsSuccess,
    isLoading: realizationsLoading,
    refetch: realizationsRefetch,
    isFetching: realizationsFetching,
  } = query;
  const realizations = realizationData?.data;
  useEffect(() => {
    realizationsRefetch();
  }, [perPage, realizationsRefetch]);

  const loadMore = () => {
    setPerPage(perPage + 3);
  };

  return (
    <Wrapper>
      <Box maxWidth="115.6rem" margin="auto">
        <SectionTitle label={t('app.com.pages.realizations.title')} />
        <Box pt={isMobile ? 1 : 3}>
          {(isLoading || realizationsLoading) && (
            <LoadingMessage>{t('app.com.pages.realizations.loading')}</LoadingMessage>
          )}
          {isSuccess && realizationsSuccess && (
            <>
              <InnerWrapper mobile={isMobile}>
                <SectorMenu
                  sectors={sectors.map((sector) => ({
                    ...sector,
                    url: getPath('/realizations/sectors/:sector', { sector: sector.data.slug }),
                  }))}
                  isMobile={isMobile}
                  isLargerDesktop={isLargerDesktop}
                  offCanvasOpen={offCanvasOpen}
                  onToggleOffCanvas={onToggleOffCanvas}
                  toggleBtnRef={toggleBtnRef}
                />
                {realizations?.length > 0 && (
                  <ContentWrapper desktop={isDesktop}>
                    {!isMobile && (
                      <TrackVisibility>
                        {({ isVisible }) => (
                          <Link
                            href={getPath('/company/:slug/realization/:rslug', {
                              slug: realizations[0]?.data.relations?.['company']?.data?.slug,
                              rslug: realizations[0]?.data?.slug,
                            })}
                          >
                            <StyledA
                              href={getPath('/company/:slug/realization/:rslug', {
                                slug: realizations[0]?.data.relations?.['company']?.data?.slug,
                                rslug: realizations[0]?.data?.slug,
                              })}
                            >
                              <Cover
                                article={{
                                  image: realizations[0]?.data?.cover?.data?.conversions,
                                  name: realizations[0]?.data?.relations?.['company']?.data?.name,
                                  title: realizations[0]?.data?.title,
                                  description: realizations[0]?.data?.subtitle,
                                }}
                                isVisible={isVisible}
                                isMobile={isMobile}
                                isTablet={isTablet}
                                height="38rem"
                                showDescription={true}
                                bannerMaxWidth="85rem"
                              />
                            </StyledA>
                          </Link>
                        )}
                      </TrackVisibility>
                    )}
                    <FourArticles
                      articles={realizations
                        .filter((_, index) => (isMobile ? index < 2 : index > 1))
                        .slice(0, 4)
                        .map((realization) => ({
                          id: realization?.data?.id,
                          name: realization?.data?.relations?.['company']?.data?.name,
                          title: realization?.data?.title,
                          image: realization?.data?.cover?.data?.conversions,
                          url: getPath('/company/:slug/realization/:rslug', {
                            slug: realization?.data.relations?.['company']?.data?.slug,
                            rslug: realization?.data?.slug,
                          }),
                        }))}
                      isMobile={isMobile}
                      isTablet={isTablet}
                    />
                    {realizations.length > 1 && (
                      <TrackVisibility>
                        {({ isVisible }) => (
                          <NewsletterSection
                            article={{
                              image: realizations[1]?.data?.cover?.data?.conversions,
                              name: realizations[1]?.data?.relations?.['company']?.data?.name,
                              title: realizations[1]?.data?.title,
                              description: realizations[1]?.data?.subtitle,
                              url: getPath('/company/:slug/realization/:rslug', {
                                slug: realizations[1]?.data.relations?.['company']?.data?.slug,
                                rslug: realizations[1]?.data?.slug,
                              }),
                            }}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            isDesktop={isDesktop}
                            isVisible={isVisible}
                          />
                        )}
                      </TrackVisibility>
                    )}
                  </ContentWrapper>
                )}
              </InnerWrapper>
              <Sidebar
                innerRef={sidebarRef}
                offCanvas={true}
                offCanvasOpen={offCanvasOpen}
                smallDesktop={isSmallDesktop}
              >
                <SectorSidebar
                  items={sectors.map((sector) => ({
                    id: sector.data?.id,
                    name: sector.data?.name,
                    icon: sector.data?.icon,
                    url: sector.data?.slug
                      ? getPath('/realizations/sectors/:sector', {
                          sector: sector.data.slug,
                        })
                      : getPath('/realizations'), //should actually be a link to a 404 page
                    subItems: sector.data?.descendants?.map((descendant) => ({
                      id: descendant?.['data']?.id,
                      name: descendant?.['data']?.name,
                      url: descendant?.['data']?.slug
                        ? getPath('/realizations/sectors/:sector', {
                            sector: descendant?.['data']?.slug,
                          })
                        : getPath('/realizations'), //should actually be a link to a 404 page
                    })),
                  }))}
                  offCanvas={true}
                  onToggleOffCanvas={onToggleOffCanvas}
                />
              </Sidebar>
            </>
          )}
        </Box>
      </Box>
      <MostRead isMobile={isMobile} isTablet={isTablet} type="realizations" getPath={getPath} />
      <InfiniteRealizations
        isMobile={isMobile}
        isTablet={isTablet}
        realizations={
          realizationsSuccess
            ? realizations.filter((_, index) => (isMobile ? index > 1 : index > 5))
            : []
        }
        getPath={getPath}
        loadMore={loadMore}
        isLoading={realizationsFetching}
        noMoreRealizations={realizationData?.['meta']?.total === realizations?.length}
      />
    </Wrapper>
  );
};
