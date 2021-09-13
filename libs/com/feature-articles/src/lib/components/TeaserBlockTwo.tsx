import { SectorData } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useArticlesBySector } from '../api/useArticles';
import { LoadingMessage, StyledA } from './Atoms';

type TeaserBlockTwoProps = {
  isMobile: boolean;
  isTablet: boolean;
  teaser: SectorData;
  getPath: GetPathFunction;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '2rem 2rem' : '2rem 0rem')};
`;
const ArticleWrapper = styled.div`
  margin-left: -0.6rem;
  margin-right: -0.6rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const TeaserBlockTwo: FC<TeaserBlockTwoProps> = ({
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
        <Box mb={3}>
          <SectionTitle label={teaser.name} textAlign={isMobile ? 'center' : 'left'} />
        </Box>
        {articlesLoading && (
          <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>
        )}
        {articlesSuccess && (
          <>
            <ArticleWrapper>
              {articles
                .filter((_, index) => (isMobile ? index < 1 : index < 4))
                .map((article) => (
                  <Box
                    pl={1}
                    pr={1}
                    mb={2}
                    key={article.data?.id}
                    maxWidth={isMobile ? '100%' : isTablet ? '50%' : '25%'}
                    flexBasis={isMobile ? '100%' : isTablet ? '50%' : '25%'}
                  >
                    <Link
                      href={getPath('/housing-advice/articles/:article', {
                        article: article?.data?.slug,
                      })}
                      passHref
                    >
                      <StyledA
                        href={getPath('/housing-advice/articles/:article', {
                          article: article?.data?.slug,
                        })}
                      >
                        <LargeTile
                          title={article.data?.relations?.['primarySector']?.data?.name}
                          description={article.data?.title}
                          image={
                            article.data?.cover?.data?.conversions[
                              isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
                            ]
                          }
                          isFavorite={article.data?.isFavorite}
                          clickable
                        />
                      </StyledA>
                    </Link>
                  </Box>
                ))}
            </ArticleWrapper>
            <Box display="flex" justifyContent={isMobile ? 'center' : 'flex-start'}>
              <Button
                href={getPath('/housing-advice/sectors/:sector', { sector: teaser.slug })}
                variant="light"
              >
                {t('app.com.pages.housingAdvice.inspiration.cta')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Wrapper>
  );
};
