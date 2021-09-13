import React, { FC } from 'react';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  LoadingMessage,
  StyledA,
  Wrapper,
  ArticleContent,
  ArticleTitle,
  ArticleSubtitle,
  Separator,
  ArticleDescription,
  CustomGrid,
  CustomGridItem,
  FlexibleContentText,
  StyledImage,
  StyledTextButton,
  CoveredImage,
  GalleryTitle,
  Caption,
} from './components/Atoms';
import {
  Breadcrumb,
  Button,
  CompanyCard,
  Icons,
  ImageGallery,
  SectionTitle,
} from '@homeproved/shared/ui';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { useRealizations } from './api/useRealizations';
import { FourArticles } from './components/FourArticles';
import { useArticleDetailOrPreview } from './api/useArticleDetailOrPreview';

type HousingAdviceDetailPageProps = {
  getPath: GetPathFunction;
  article?: string;
  uid?: string;
};

export const HousingAdviceDetailPage: FC<HousingAdviceDetailPageProps> = ({
  getPath,
  article: slug,
  uid,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const {
    query: { data: articleData, error: articleError },
  } = useArticleDetailOrPreview(slug, uid);

  const article = articleData?.data;
  const { data: realizationsData } = useRealizations(article?.relations?.company?.data?.slug);
  const realizations = realizationsData?.data;

  if (articleData == null && articleError == null) {
    return (
      <Wrapper>
        <Box display="flex" alignItems="center" flexDirection="column" mt={7}>
          <LoadingMessage>{t('app.com.pages.housingAdvice.detail.loading')}</LoadingMessage>
        </Box>
      </Wrapper>
    );
  }

  if (articleError != null) {
    return (
      <Wrapper>
        <Box display="flex" alignItems="center" flexDirection="column" mt={7}>
          <Box mb={1}>
            <Typography variant="body1">
              {t('app.com.pages.housingAdvice.detail.notFound')}
            </Typography>
          </Box>
          <Button href={getPath('/housing-advice')}>
            {t('app.com.pages.housingAdvice.detail.notFoundCta')}
          </Button>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!isMobile && (
        <Breadcrumb absolute>
          {`${t('app.com.pages.housingAdvice.detail.breadCrumbs.inspire')} / `}
          <Link href={getPath('/housing-advice')} passHref>
            <StyledA href={getPath('/housing-advice')}>
              {t('app.com.pages.housingAdvice.detail.breadCrumbs.housingAdvice')}
            </StyledA>
          </Link>
          {' / '}
          <Link
            href={getPath('/company/:slug/reviews', {
              slug: article.relations.company.data.slug,
            })}
            passHref
          >
            <StyledA
              href={getPath('/company/:slug/reviews', {
                slug: article.relations.company.data.slug,
              })}
            >
              {articleData.data.relations.company.data.name}
            </StyledA>
          </Link>
        </Breadcrumb>
      )}
      {isMobile && (
        <Box mt={3}>
          <StyledTextButton
            variant="text"
            href={getPath('/housing-advice')}
            icon={Icons.ANGLE_LEFT}
          >
            {t('app.com.pages.housingAdvice.detail.back')}
          </StyledTextButton>
        </Box>
      )}
      <ArticleContent mobile={isMobile}>
        {article?.relations?.company?.data?.name && (
          <Box
            mb={isMobile ? 3 : 1}
            display="flex"
            flexDirection="column"
            alignItems={isMobile ? 'center' : 'flex-start'}
          >
            <Button
              variant={isMobile ? 'dark' : 'gradient'}
              icon={Icons.HELMET}
              pill={false}
              arrow="none"
              href={getPath('/company/:slug/reviews', {
                slug: article.relations.company.data.slug,
              })}
            >
              {article.relations?.company?.data?.name}
            </Button>
          </Box>
        )}
        <ArticleTitle variant="h1" mobile={isMobile}>
          {article.title}
        </ArticleTitle>
        {article?.project != null && (
          <ArticleSubtitle variant="h2" mobile={isMobile}>{`${t(
            'app.com.pages.housingAdvice.detail.project'
          )} '${article?.project}'`}</ArticleSubtitle>
        )}
        <Separator />
        <ArticleDescription variant="body1" mobile={isMobile}>
          {article.description}
        </ArticleDescription>
        {article.flexibleContent?.map((articleContent, index) => (
          <CustomGrid
            key={`flexible-content-${index}`}
            mobile={isMobile}
            noMarginBottom={
              !isTablet &&
              (articleContent['name'] === 'photo_text' ||
                articleContent['name'] === 'text_photo') &&
              (article.flexibleContent[index + 1]?.['name'] === 'photo_text' ||
                article.flexibleContent[index + 1]?.['name'] === 'text_photo')
            }
          >
            {articleContent['name'] === 'photo_text' ? (
              <>
                <CustomGridItem variant="left" mobile={isMobile} tablet={isTablet} order={1}>
                  <StyledImage
                    src={articleContent['fields'].image}
                    alt={articleContent['fields'].caption}
                    title={articleContent['fields'].caption}
                    loading="lazy"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  />
                  <Caption
                    variant="caption"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {articleContent['fields'].caption}
                  </Caption>
                </CustomGridItem>
                <CustomGridItem variant="right" mobile={isMobile} tablet={isTablet} order={2}>
                  <FlexibleContentText
                    tablet={isTablet}
                    mobile={isMobile}
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {ReactHtmlParser(articleContent['fields'].text)}
                  </FlexibleContentText>
                </CustomGridItem>
              </>
            ) : articleContent['name'] === 'text_photo' ? (
              <>
                <CustomGridItem
                  variant="left"
                  mobile={isMobile}
                  tablet={isTablet}
                  order={isTablet ? 2 : 1}
                >
                  <FlexibleContentText
                    tablet={isTablet}
                    mobile={isMobile}
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {ReactHtmlParser(articleContent['fields'].text)}
                  </FlexibleContentText>
                </CustomGridItem>
                <CustomGridItem
                  variant="right"
                  mobile={isMobile}
                  tablet={isTablet}
                  order={isTablet ? 1 : 2}
                >
                  <StyledImage
                    src={articleContent['fields'].image}
                    alt={articleContent['fields'].caption}
                    title={articleContent['fields'].caption}
                    loading="lazy"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  />
                  <Caption
                    variant="caption"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {articleContent['fields'].caption}
                  </Caption>
                </CustomGridItem>
              </>
            ) : articleContent['name'] === 'wysiwyg' ? (
              <CustomGridItem variant="spread" mobile={isMobile} tablet={isTablet} order={1}>
                <FlexibleContentText
                  tablet={isTablet}
                  mobile={isMobile}
                  maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  noPadding
                >
                  {articleContent['fields'].title && (
                    <h2>{ReactHtmlParser(articleContent['fields'].title)}</h2>
                  )}
                  {articleContent['fields'].content &&
                    ReactHtmlParser(articleContent['fields'].content)}
                </FlexibleContentText>
              </CustomGridItem>
            ) : articleContent['name'] === 'double_photo' ? (
              <>
                <CustomGridItem variant="right" mobile={isMobile} tablet={isTablet} order={1}>
                  <CoveredImage
                    src={articleContent['fields'].left_image}
                    alt={articleContent['fields'].captionLeft}
                    title={articleContent['fields'].captionLeft}
                    loading="lazy"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                    marginBottom={isTablet}
                  />
                  <Caption
                    variant="caption"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {articleContent['fields'].captionLeft}
                  </Caption>
                </CustomGridItem>
                <CustomGridItem variant="left" mobile={isMobile} tablet={isTablet} order={2}>
                  <CoveredImage
                    src={articleContent['fields'].right_image}
                    alt={articleContent['fields'].captionRight}
                    title={articleContent['fields'].captionRight}
                    loading="lazy"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  />
                  <Caption
                    variant="caption"
                    maxWidth={isMobile ? '100%' : isTablet ? '75rem' : '100%'}
                  >
                    {articleContent['fields'].captionRight}
                  </Caption>
                </CustomGridItem>
              </>
            ) : articleContent['name'] === 'gallery' ? (
              <Box
                marginLeft={isMobile ? '-0.5rem' : '2.5rem'}
                marginRight={isMobile ? '-0.5rem' : '2.5rem'}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width={isMobile ? 'auto' : '100%'}
              >
                <GalleryTitle variant="h2">
                  {t('app.com.pages.housingAdvice.detail.photoGallery')}
                </GalleryTitle>
                <Box maxWidth="75rem" margin="auto">
                  <ImageGallery
                    images={[articleContent['fields'][0], ...articleContent['fields'].slice(1)]}
                    bigger={true}
                    isMobile={isMobile}
                    company={{
                      name: article?.relations?.company?.data?.name,
                      url: getPath('/company/:slug/reviews', {
                        slug: article?.relations?.company?.data?.slug,
                      }),
                    }}
                  />
                </Box>
              </Box>
            ) : null}
          </CustomGrid>
        ))}
        {!isMobile && article?.relations?.company?.data != null && (
          <>
            <Box mb={5} mt={7}>
              <SectionTitle label={t('app.com.pages.housingAdvice.detail.titleRealizationOf')} />
            </Box>
            <Box mb={7}>
              <CompanyCard
                company={article.relations.company.data}
                companyPath={getPath('/company/:slug', {
                  slug: article.relations.company.data.slug,
                })}
              />
            </Box>
          </>
        )}
        {realizations?.length > 0 && article?.relations?.company?.data != null ? (
          <>
            <Box mb={5} mt={isMobile ? 4 : 0}>
              <SectionTitle
                label={`${t('app.com.pages.housingAdvice.detail.titleMoreArticlesOf')} ${
                  article.relations?.['primarySector']?.data?.name
                }`}
              />
            </Box>
            <Box mb={7}>
              <FourArticles
                articles={realizations.slice(0, 4).map((realization) => ({
                  id: realization?.data?.id,
                  name: article?.relations?.company?.data?.name,
                  title: realization?.data?.title,
                  image: realization?.data?.cover?.data?.conversions,
                  url: getPath('/company/:slug/realization/:rslug', {
                    slug: article.relations?.company?.data?.slug,
                    rslug: realization?.data?.slug,
                  }),
                }))}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </Box>
          </>
        ) : (
          <Box mt={4} mb={7}></Box>
        )}
      </ArticleContent>
    </Wrapper>
  );
};
