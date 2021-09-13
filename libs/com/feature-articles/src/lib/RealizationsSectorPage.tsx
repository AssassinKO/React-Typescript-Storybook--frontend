import React, { FC, useEffect, useRef, useState } from 'react';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import {
  Breadcrumb,
  Button,
  InfinitePagination,
  LargeTile,
  Pagination,
  SectionTitle,
  SectorMenu,
  SectorSidebar,
  theme,
} from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useSectors } from '@homeproved/shared/feature-sectors';
import { useDisclosure } from 'react-use-disclosure';
import { objectToQueryString, useClickOutside } from '@homeproved/shared/util';
import {
  Wrapper,
  LoadingMessage,
  InnerWrapper,
  ContentWrapper,
  Sidebar,
  StyledA,
  Header,
  Title,
  SubTitle,
  Description,
  Tiles,
  HeaderContainer,
} from './components/Atoms';
import { PaginationMeta, Realisation, Sector, useQueryFetch } from '@homeproved/shared/data-access';
import Link from 'next/link';

type RealizationsSectorPageProps = {
  getPath: GetPathFunction;
  activeSector: string;
};

type RealizationData = {
  data: Realisation[];
  links: unknown;
  meta: unknown;
};

type QueryParams = {
  date?: 'asc' | 'desc' | '';
  page?: number;
  perPage?: number;
};

export const RealizationsSectorPage: FC<RealizationsSectorPageProps> = ({
  getPath,
  activeSector,
}) => {
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

  const realizationsRef = React.useRef<HTMLInputElement>(null);

  const apiRoute = `/api/sector/${activeSector}/realisations?`;

  const [activeSectorChanged, setActiveSectorChanged] = useState(false);

  const [filterQueryParams, setFilterQueryParams] = useState<QueryParams>({
    date: 'desc',
    page: 1,
    perPage: 12,
  });
  const getApiRoute = () => {
    return apiRoute + objectToQueryString(filterQueryParams);
  };
  const {
    query: {
      data: realizationData,
      isSuccess: realizationsSuccess,
      isLoading: realizationsLoading,
      refetch: realizationsRefetch,
    },
  } = useQueryFetch<RealizationData, unknown>(['realizationsBySector'], getApiRoute(), {
    options: {
      enabled: false,
    },
  });

  const realizations = realizationData?.data || [];
  const pagination = realizationData?.meta as PaginationMeta;

  const goToPage = (page: number) => {
    realizationsRef.current.scrollIntoView({ behavior: 'smooth' });
    setFilterQueryParams({ ...filterQueryParams, page: page });
  };

  const loadMorePages = () => {
    setFilterQueryParams({ ...filterQueryParams, perPage: filterQueryParams.perPage + 12 });
  };

  useEffect(() => {
    if (!activeSectorChanged) {
      setFilterQueryParams({ ...filterQueryParams, page: 1 });
      setActiveSectorChanged(true);
    } else {
      realizationsRefetch().then();
    }
  }, [activeSector, activeSectorChanged, filterQueryParams, realizationsRefetch]);

  const findSectorBySlug = (): Sector =>
    sectors?.find(({ data }) => data?.slug === activeSector) ??
    sectors
      ?.find(({ data }) =>
        data?.descendants?.some((descendant) => descendant?.['data']?.slug === activeSector)
      )
      ?.data?.descendants?.find((descendant) => descendant?.['data']?.slug === activeSector);

  if (findSectorBySlug() == null) {
    return (
      <Wrapper>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box mb={1}>
            <Typography variant="body1">
              {t('app.com.pages.realizations.bySector.notFound')}
            </Typography>
          </Box>
          <Button href={getPath('/realizations')}>
            {t('app.com.pages.realizations.bySector.notFoundCta')}
          </Button>
        </Box>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Box maxWidth="115.6rem" margin="auto">
        {!isMobile && (
          <Breadcrumb transparent>
            {`${t('app.com.pages.realizations.bySector.breadCrumbs.inspire')} / `}
            <Link href={getPath('/realizations')} passHref>
              <StyledA href={getPath('/realizations')}>
                {t('app.com.pages.realizations.bySector.breadCrumbs.realizations')}
              </StyledA>
            </Link>{' '}
            / <strong>{findSectorBySlug()?.data?.name}</strong>
          </Breadcrumb>
        )}
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
                  activeSector={activeSector}
                />
                {realizations?.length > 0 && (
                  <ContentWrapper desktop={isDesktop}>
                    <div ref={realizationsRef}>
                      {!isMobile && (
                        <HeaderContainer>
                          <Header mobile={isMobile} tablet={isTablet} noFaq>
                            <Title variant="h1" mobile={isMobile}>
                              {findSectorBySlug()?.data?.name}
                            </Title>
                            <SubTitle variant="h2" mobile={isMobile}>{`${pagination?.total} ${t(
                              'app.com.pages.housingAdvice.bySector.xProjects'
                            )}`}</SubTitle>
                            <Description variant="body1" mobile={isMobile}>
                              {findSectorBySlug()?.data?.description}
                            </Description>
                          </Header>
                        </HeaderContainer>
                      )}
                      <Tiles isMobile={isMobile} isTablet={isTablet}>
                        {realizations.map((realization) => (
                          <Link
                            href={getPath('/company/:slug/realization/:rslug', {
                              slug: realization?.data.relations?.['company']?.data?.slug,
                              rslug: realization?.data?.slug,
                            })}
                            key={`realization-${realization?.data?.id}`}
                          >
                            <StyledA
                              href={getPath('/company/:slug/realization/:rslug', {
                                slug: realization?.data.relations?.['company']?.data?.slug,
                                rslug: realization?.data?.slug,
                              })}
                            >
                              <LargeTile
                                title={realization?.data?.relations?.['company']?.data?.name}
                                description={realization?.data?.title}
                                image={
                                  realization?.data?.cover?.data?.conversions?.[
                                    isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
                                  ]
                                }
                                clickable
                              />
                            </StyledA>
                          </Link>
                        ))}
                      </Tiles>
                    </div>
                    {pagination != null &&
                      (isMobile ? (
                        <InfinitePagination {...pagination} loadMore={loadMorePages} />
                      ) : (
                        <Pagination {...pagination} goToPage={goToPage} defaultPagesToShow={5} />
                      ))}
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
                    isActive: sector.data?.slug === activeSector,
                    url: sector.data?.slug
                      ? getPath('/realizations/sectors/:sector', {
                          sector: sector.data.slug,
                        })
                      : getPath('/realizations'), //should actually be a link to a 404 page
                    subItems: sector.data?.descendants?.map((descendant) => ({
                      id: descendant?.['data']?.id,
                      name: descendant?.['data']?.name,
                      isActive: descendant?.['data']?.slug === activeSector,
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
    </Wrapper>
  );
};
