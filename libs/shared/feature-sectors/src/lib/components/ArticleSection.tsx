import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, SectionTitle, LargeTile, theme } from '@homeproved/shared/ui';
import { Typography, useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useArticlesBySector } from '../api/useArticles';
import { useRealizationsBySectorAndLocality } from '../api/useRealizations';
import { ArticleBox, ArticleSectionWrapper, ButtonWrapper, Title } from './Atoms';

export const ContentWrapper = styled(({ mobile, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  max-width: 115.6rem;
  padding-top: ${({ mobile }) => (mobile ? '2rem' : '4rem')};
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
`;

const Tiles = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem;
  padding: 1rem 0 0;

  > * {
    max-width: 40rem;
    margin: ${({ isMobile }) => (isMobile ? '0 auto 2rem' : '0 1rem 2rem')};
    flex-basis: ${({ isMobile, isTablet }) =>
      isMobile ? '100%' : isTablet ? 'calc(50% - 2rem)' : 'calc(25% - 2.2rem)'};
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

type ArticleSectionProps = {
  isMobile: boolean;
  sectorName: string;
  sectorSlug: string;
  locality?: string;
  getPath: GetPathFunction;
  location?: {
    lat: number;
    lng: number;
  };
};

type Data = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  isFavorite: boolean;
};

export const ArticleSection: FC<ArticleSectionProps> = ({
  isMobile,
  sectorName,
  sectorSlug,
  locality,
  getPath,
  location,
}) => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const title = locality
    ? t('app.com.pages.sectors.subSectorByLocality.articleTitle')
    : t('app.com.pages.sectors.subSector.articleSection.title').replace('%SECTOR%', sectorName);

  const {
    data: articleData,
    isLoading: articlesLoading,
    isSuccess: articleSuccess,
  } = useArticlesBySector(sectorSlug);

  const {
    data: realizationsData,
    isLoading: realizationsLoading,
    isSuccess: realizationsSuccess,
  } = useRealizationsBySectorAndLocality(sectorSlug, location);

  const parsedArticles = useMemo<Data[]>(() => {
    return articleData?.data?.map((article) => ({
      id: article.data?.id,
      title: article.data?.relations?.['primarySector']?.data?.name,
      description: article.data?.title,
      image:
        article.data?.cover?.data?.conversions?.[
          isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
        ],
      url: getPath('/housing-advice/articles/:article', {
        article: article?.data?.slug,
      }),
      isFavorite: article?.data?.isFavorite,
    }));
  }, [articleData, isMobile, isTablet, getPath]);

  const parsedRealizations = useMemo<Data[]>(() => {
    return realizationsData?.data?.map((realization) => ({
      id: realization?.data?.id,
      title: realization?.data?.relations?.['company']?.data.name,
      description: realization?.data?.title,
      image:
        realization.data?.cover?.data?.conversions?.[
          isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
        ],
      url: getPath('/company/:slug/realization/:rslug', {
        slug: realization?.data?.relations?.['company']?.data.slug,
        rslug: realization?.data?.slug,
      }),
      isFavorite: null,
    }));
  }, [realizationsData, isMobile, isTablet, getPath]);

  const parsedData = useMemo<Data[]>(() => {
    if (locality == null) {
      return parsedArticles;
    } else {
      return parsedRealizations?.concat(parsedArticles).slice(0, 4);
    }
  }, [parsedArticles, parsedRealizations, locality]);

  return (
    <ArticleSectionWrapper>
      <ContentWrapper mobile={isMobile}>
        {!isMobile && <SectionTitle textAlign="left" label={title} lineColor="black" />}
        {isMobile && (
          <Title variant="h2" mobile={isMobile}>
            {title}
          </Title>
        )}
        <ArticleBox mobile={isMobile}>
          {articlesLoading ||
            (realizationsLoading && (
              <Typography variant="body1">{t('app.com.pages.housingAdvice.loading')}</Typography>
            ))}
          {articleSuccess && realizationsSuccess && (
            <Tiles isMobile={isMobile} isTablet={isTablet}>
              {parsedData?.map((item) => (
                <Link href={item.url} passHref key={`article-${item.id}`}>
                  <StyledA href={item.url}>
                    <LargeTile
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      smallDarkBorder
                      isFavorite={item.isFavorite}
                      clickable
                    />
                  </StyledA>
                </Link>
              ))}
            </Tiles>
          )}
        </ArticleBox>
        <ButtonWrapper mobile={isMobile}>
          <Button
            variant="light"
            href={
              locality == null
                ? getPath('/housing-advice/sectors/:sector', {
                    sector: sectorSlug,
                  })
                : getPath('/realizations/sectors/:sector', {
                    sector: sectorSlug,
                  })
            }
          >
            {locality == null
              ? t('app.com.pages.sectors.subSector.articleSection.moreArticles')
              : t('app.com.pages.sectors.subSector.articleSection.moreRealizations')}
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </ArticleSectionWrapper>
  );
};
