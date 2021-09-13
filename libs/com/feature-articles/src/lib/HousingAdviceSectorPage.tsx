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
import { useSectors, useTeasers } from '@homeproved/shared/feature-sectors';
import { useDisclosure } from 'react-use-disclosure';
import { useClickOutside } from '@homeproved/shared/util';
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
import Link from 'next/link';
import { Sector } from '@homeproved/shared/data-access';
import { FaqBlock } from './components/FaqBlock';
import { useArticlesBySector } from './api/useArticles';
import { articleListPagingConfig } from './api/config';

type HousingAdviceSectorPageProps = {
  getPath: GetPathFunction;
  activeSector: string;
};

export const HousingAdviceSectorPage: FC<HousingAdviceSectorPageProps> = ({
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
  const { data: teasers } = useTeasers();
  const {
    isOpen: offCanvasOpen,
    close: onCloseOffCanvas,
    toggle: onToggleOffCanvas,
  } = useDisclosure(false);
  const sidebarRef: React.RefObject<HTMLDivElement> = useRef();
  const toggleBtnRef: React.RefObject<HTMLDivElement> = useRef();
  useClickOutside(sidebarRef, onCloseOffCanvas, [toggleBtnRef]);

  const articlesRef = React.useRef<HTMLInputElement>(null);

  const [activeSectorChanged, setActiveSectorChanged] = useState(false);
  const [filterQueryParams, setFilterQueryParams] = useState(articleListPagingConfig);

  const { data: articleData, refetch: articlesRefetch } = useArticlesBySector(
    activeSector,
    filterQueryParams.date,
    filterQueryParams.perPage,
    filterQueryParams.page,
    {
      options: {
        enabled: false,
      },
    }
  );

  const articles = articleData?.data || [];
  const pagination = articleData?.meta;

  const goToPage = (page: number) => {
    articlesRef.current.scrollIntoView({ behavior: 'smooth' });
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
      articlesRefetch().then();
    }
  }, [activeSector, activeSectorChanged, filterQueryParams, articlesRefetch]);

  const findSectorBySlug = (): Sector =>
    sectors?.find(({ data }) => data?.slug === activeSector) ??
    sectors
      ?.find(({ data }) =>
        data?.descendants?.some((descendant) => descendant?.['data']?.slug === activeSector)
      )
      ?.data?.descendants?.find((descendant) => descendant?.['data']?.slug === activeSector) ??
    teasers?.find(({ data }) => data?.slug === activeSector);

  if (!isLoading && findSectorBySlug() == null) {
    return (
      <Wrapper>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box mb={1}>
            <Typography variant="body1">
              {t('app.com.pages.housingAdvice.bySector.notFound')}
            </Typography>
          </Box>
          <Button href={getPath('/housing-advice')}>
            {t('app.com.pages.housingAdvice.bySector.notFoundCta')}
          </Button>
        </Box>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Box maxWidth="115.6rem" margin="auto">
        <Box position="relative">
          {!isMobile && (
            <Breadcrumb transparent>
              {`${t('app.com.pages.housingAdvice.bySector.breadCrumbs.inspire')} / `}
              <Link href={getPath('/housing-advice')} passHref>
                <StyledA href={getPath('/housing-advice')}>
                  {t('app.com.pages.housingAdvice.bySector.breadCrumbs.housingAdvice')}
                </StyledA>
              </Link>{' '}
              / <strong>{findSectorBySlug()?.data?.name}</strong>
            </Breadcrumb>
          )}
          <SectionTitle label={t('app.com.pages.housingAdvice.title')} />
        </Box>
        <Box pt={isMobile ? 1 : 3}>
          {isLoading && <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>}
          {isSuccess && (
            <>
              <InnerWrapper mobile={isMobile}>
                <SectorMenu
                  sectors={sectors.map((sector) => ({
                    ...sector,
                    url: getPath('/housing-advice/sectors/:sector', { sector: sector.data.slug }),
                  }))}
                  isMobile={isMobile}
                  isLargerDesktop={isLargerDesktop}
                  offCanvasOpen={offCanvasOpen}
                  onToggleOffCanvas={onToggleOffCanvas}
                  toggleBtnRef={toggleBtnRef}
                  activeSector={activeSector}
                />
                {articles?.length > 0 && (
                  <ContentWrapper desktop={isDesktop}>
                    <div ref={articlesRef}>
                      <HeaderContainer>
                        <Header mobile={isMobile} tablet={isTablet}>
                          <Title variant="h1" mobile={isMobile}>
                            {findSectorBySlug()?.data?.name}
                          </Title>
                          <SubTitle variant="h2" mobile={isMobile}>{`${pagination?.total} ${t(
                            'app.com.pages.housingAdvice.bySector.xProjects'
                          )}`}</SubTitle>
                          <Description variant="body1" mobile={isMobile}>
                            {findSectorBySlug()?.data?.description}
                          </Description>
                          {isMobile && (
                            <Box display="flex" justifyContent="center">
                              <Button variant="gradient" href={getPath('/faq')}>
                                {t('app.com.pages.housingAdvice.bySector.ctaFAQ')}
                              </Button>
                            </Box>
                          )}
                        </Header>
                        {isSmallDesktop && (
                          <FaqBlock isMobile={isMobile} isTablet={isTablet} getPath={getPath} />
                        )}
                      </HeaderContainer>
                      <Tiles isMobile={isMobile} isTablet={isTablet}>
                        {articles.map((article) => (
                          <Link
                            href={getPath('/housing-advice/articles/:article', {
                              article: article?.data?.slug,
                            })}
                            passHref
                            key={`article-${article?.data?.id}`}
                          >
                            <StyledA
                              href={getPath('/housing-advice/articles/:article', {
                                article: article?.data?.slug,
                              })}
                            >
                              <LargeTile
                                title={article?.data?.relations?.['primarySector']?.data?.name}
                                description={article?.data?.title}
                                image={article?.data?.cover?.data?.conversions?.['square-s']}
                                isFavorite={article?.data?.isFavorite}
                                clickable
                              />
                            </StyledA>
                          </Link>
                        ))}
                        {isTablet && !isMobile && (
                          <FaqBlock isMobile={isMobile} isTablet={isTablet} getPath={getPath} />
                        )}
                      </Tiles>
                    </div>
                    {pagination != null &&
                      (isMobile ? (
                        <Box marginTop="-3rem" marginBottom="3rem">
                          <InfinitePagination {...pagination} loadMore={loadMorePages} />
                        </Box>
                      ) : (
                        <Pagination {...pagination} goToPage={goToPage} defaultPagesToShow={5} />
                      ))}
                    {isMobile && (
                      <FaqBlock isMobile={isMobile} isTablet={isTablet} getPath={getPath} />
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
                    isActive: sector?.data?.slug === activeSector,
                    url: sector.data?.slug
                      ? getPath('/housing-advice/sectors/:sector', {
                          sector: sector.data.slug,
                        })
                      : getPath('/housing-advice'), //should actually be a link to a 404 page
                    subItems: sector.data?.descendants?.map((descendant) => ({
                      id: descendant?.['data']?.id,
                      name: descendant?.['data']?.name,
                      isActive: descendant?.['data']?.slug === activeSector,
                      url: descendant?.['data']?.slug
                        ? getPath('/housing-advice/sectors/:sector', {
                            sector: descendant?.['data']?.slug,
                          })
                        : getPath('/housing-advice'), //should actually be a link to a 404 page
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
