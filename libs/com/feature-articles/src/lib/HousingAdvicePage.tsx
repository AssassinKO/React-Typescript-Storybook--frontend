import React, { FC, useRef } from 'react';
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
import { useArticles } from './api/useArticles';
import { Cover } from './components/Cover';
import { FourArticles } from './components/FourArticles';
import { NewsletterSection } from './components/NewsletterSection';
import TrackVisibility from 'react-on-screen';
import { MostRead } from './components/MostRead';
import { TeaserBlockOne } from './components/TeaserBlockOne';
import { TeaserBlockTwo } from './components/TeaserBlockTwo';
import Link from 'next/link';
import { useArticleTeasers } from './api/useArticleTeasers';

type HousingAdvicePageProps = {
  getPath: GetPathFunction;
};

export const HousingAdvicePage: FC<HousingAdvicePageProps> = ({ getPath }) => {
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

  const {
    data: articleData,
    isSuccess: articlesSuccess,
    isLoading: articlesLoading,
  } = useArticles();
  const articles = articleData?.data;

  const {
    data: articleTeaserData,
    isSuccess: articleTeaserSuccess,
    isLoading: articleTeaserLoading,
  } = useArticleTeasers();
  const articleTeasers = articleTeaserData?.data;

  return (
    <Wrapper>
      <Box maxWidth="115.6rem" margin="auto">
        <SectionTitle label={t('app.com.pages.housingAdvice.title')} />
        <Box pt={isMobile ? 1 : 3}>
          {(isLoading || articlesLoading) && (
            <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>
          )}
          {isSuccess && articlesSuccess && (
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
                />
                {articles?.length > 0 && (
                  <ContentWrapper desktop={isDesktop}>
                    {!isMobile && (
                      <TrackVisibility>
                        {({ isVisible }) => (
                          <Link
                            href={getPath('/housing-advice/articles/:article', {
                              article: articles[0]?.data?.slug,
                            })}
                            passHref
                          >
                            <StyledA
                              href={getPath('/housing-advice/articles/:article', {
                                article: articles[0]?.data?.slug,
                              })}
                            >
                              <Cover
                                article={{
                                  image: articles[0]?.data?.cover?.data?.conversions,
                                  name: articles[0]?.data?.relations?.['primarySector']?.data?.name,
                                  title: articles[0]?.data?.title,
                                  description: articles[0]?.data?.description,
                                  isFavorite: articles[0]?.data?.isFavorite,
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
                      articles={articles
                        .filter((_, index) => (isMobile ? index < 2 : index > 1))
                        .slice(0, 4)
                        .map((article) => ({
                          id: article?.data?.id,
                          name: article?.data?.relations?.['primarySector']?.data?.name,
                          title: article?.data?.title,
                          image: article?.data?.cover?.data?.conversions,
                          url: getPath('/housing-advice/articles/:article', {
                            article: article?.data?.slug,
                          }),
                          isFavorite: article?.data?.isFavorite,
                        }))}
                      isMobile={isMobile}
                      isTablet={isTablet}
                    />
                    {articles.length > 1 && (
                      <TrackVisibility>
                        {({ isVisible }) => (
                          <NewsletterSection
                            article={{
                              image: articles[1]?.data?.cover?.data?.conversions,
                              name: articles[1]?.data?.relations?.['primarySector']?.data?.name,
                              title: articles[1]?.data?.title,
                              description: articles[1]?.data?.description,
                              isFavorite: articles[1]?.data?.isFavorite,
                              url: getPath('/housing-advice/articles/:article', {
                                article: articles[1]?.data?.slug,
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
                      ? getPath('/housing-advice/sectors/:sector', {
                          sector: sector.data.slug,
                        })
                      : getPath('/housing-advice'), //should actually be a link to a 404 page
                    subItems: sector.data?.descendants?.map((descendant) => ({
                      id: descendant?.['data']?.id,
                      name: descendant?.['data']?.name,
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
      <MostRead isMobile={isMobile} isTablet={isTablet} type="articles" getPath={getPath} />
      {articleTeaserLoading && (
        <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>
      )}
      {articleTeaserSuccess && (
        <>
          {articleTeasers?.[0] != null && (
            <TeaserBlockOne
              isMobile={isMobile}
              isTablet={isTablet}
              teaser={articleTeasers?.[0].data}
              getPath={getPath}
            />
          )}
          {articleTeasers
            ?.filter((_, index) => index !== 0 && (isMobile ? index < 3 : true))
            .map(({ data }) => (
              <TeaserBlockTwo
                teaser={data}
                key={`teaser-block-${data.id}`}
                isMobile={isMobile}
                isTablet={isTablet}
                getPath={getPath}
              />
            ))}
        </>
      )}
    </Wrapper>
  );
};
