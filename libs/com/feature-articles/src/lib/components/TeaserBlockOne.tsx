import { SectorData } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useArticlesBySector } from '../api/useArticles';
import { LoadingMessage, StyledA } from './Atoms';

type TeaserBlockOneProps = {
  isMobile: boolean;
  isTablet: boolean;
  teaser: SectorData;
  getPath: GetPathFunction;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '4rem 2rem 2rem' : '4rem 0rem 2rem')};
`;
const ArticleContainer = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin-top: ${({ mobile }) => (mobile ? 0 : '-1rem')};
`;

const ArticleListItem = styled.div`
  display: flex;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
`;

const ArticleList = styled(({ mobile, tablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mobile }) => (mobile ? '1rem' : 0)};
  padding-right: ${({ tablet }) => (tablet ? 0 : '4rem')};
  flex-grow: 1;
`;
const Image = styled.img`
  width: 10rem;
  height: 7rem;
  object-fit: cover;
  object-position: center center;
  margin-right: 1rem;
  flex-shrink: 0;
`;
const ArticleListItemTitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
  font-size: 1.6rem;
  ${({ mobile }) =>
    !mobile &&
    `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  `}
`;
const ArticleListItemDescription = styled(({ mobile, ...restProps }) => (
  <Typography {...restProps} />
))`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  line-height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-width: ${({ mobile }) => (mobile ? '100%' : 'calc(100% - 10rem)')};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Date = styled(Typography)`
  position: absolute;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  line-height: 1.4rem;
  right: 0;
  bottom: 0;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const TeaserBlockOne: FC<TeaserBlockOneProps> = ({
  isMobile,
  isTablet,
  teaser,
  getPath,
}) => {
  const { t } = useTranslation();
  const {
    data: articleData,
    isSuccess: articlesSuccess,
    isLoading: articlesLoading,
  } = useArticlesBySector(teaser.slug);
  const articles = articleData?.data;

  return (
    <Wrapper mobile={isMobile}>
      <Box maxWidth="115.6rem" margin="auto">
        <SectionTitle label={teaser.name} textAlign={isMobile ? 'center' : 'left'} />
        {articlesLoading && (
          <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>
        )}
        {articlesSuccess && (
          <ArticleContainer mobile={isMobile}>
            <ArticleList mobile={isMobile} tablet={isTablet}>
              {articles
                .filter((_, index) => index < 3)
                .map((article) => (
                  <Link
                    href={getPath('/housing-advice/articles/:article', {
                      article: article?.data?.slug,
                    })}
                    passHref
                    key={article.data?.id}
                  >
                    <StyledA
                      href={getPath('/housing-advice/articles/:article', {
                        article: article?.data?.slug,
                      })}
                    >
                      <ArticleListItem>
                        <Image
                          src={article.data?.cover?.data?.conversions['square-s']}
                          alt={article.data?.title}
                        />
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          position="relative"
                          flexGrow={1}
                        >
                          <ArticleListItemTitle variant="h5">
                            {isMobile && <span>DIY:&nbsp;</span>}
                            {article.data?.title}
                          </ArticleListItemTitle>
                          {!isMobile && (
                            <>
                              <ArticleListItemDescription variant="body1" mobile={isMobile}>
                                {article.data?.description}
                              </ArticleListItemDescription>
                              <Date variant="body1">
                                {moment(article.data?.createdAt).locale('nl-be').format('l')}
                              </Date>
                            </>
                          )}
                        </Box>
                      </ArticleListItem>
                    </StyledA>
                  </Link>
                ))}
              <Box
                mt={isMobile ? 3 : 2}
                display="flex"
                justifyContent={isMobile ? 'center' : 'flex-start'}
              >
                <Button
                  href={getPath('/housing-advice/sectors/:sector', { sector: teaser.slug })}
                  variant="light"
                >
                  {t('app.com.pages.housingAdvice.legalAndFinancial.cta')}
                </Button>
              </Box>
            </ArticleList>
            {!isMobile && !isTablet && articles.length > 3 && (
              <Box width="28rem" flexShrink={0}>
                <Link
                  href={getPath('/housing-advice/articles/:article', {
                    article: articles[3]?.data?.slug,
                  })}
                  passHref
                >
                  <StyledA
                    href={getPath('/housing-advice/articles/:article', {
                      article: articles[3]?.data?.slug,
                    })}
                  >
                    <LargeTile
                      title={articles[3].data?.relations?.['primarySector']?.data?.name}
                      description={articles[3].data?.title}
                      image={
                        articles[3].data?.cover?.data?.conversions[
                          isTablet ? 'square-m' : 'square-l'
                        ]
                      }
                      isFavorite={articles[3].data?.isFavorite}
                      clickable
                    />
                  </StyledA>
                </Link>
              </Box>
            )}
          </ArticleContainer>
        )}
      </Box>
    </Wrapper>
  );
};
