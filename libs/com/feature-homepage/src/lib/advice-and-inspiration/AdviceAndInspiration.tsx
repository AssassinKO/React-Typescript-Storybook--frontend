import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomepageContainerWrapper } from '../container/Container';
import { useMostReadArticles } from '@homeproved/com/feature-articles';
import Link from 'next/link';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { NewsletterSubscriptionTile } from '@homeproved/shared/feature-newsletter';

type AdviceAndInspirationProps = {
  getPath: GetPathFunction;
};

const Wrapper = styled.div`
  margin: 6rem 0 0;
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

const StyledButton = styled(({ isTablet, ...restProps }) => <Button {...restProps} />)`
  display: ${({ isTablet }) => isTablet && 'table'};
  margin: ${({ isTablet }) => isTablet && 'auto'};
`;

const StyledA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const AdviceAndInspiration: FC<AdviceAndInspirationProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const { data: articleData, isSuccess, isLoading } = useMostReadArticles();
  const articles = articleData?.data;

  return (
    <HomepageContainerWrapper>
      <Wrapper>
        <SectionTitle
          label={t('app.com.pages.landing.adviceAndInspiration.title')}
          textAlign={isMobile ? 'center' : 'left'}
        />
        {isLoading && (
          <Typography variant="body1">{t('app.com.pages.housingAdvice.loading')}</Typography>
        )}
        {isSuccess && (
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
                    description={article?.data?.title}
                    image={
                      article?.data?.cover?.data?.conversions?.[
                        isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
                      ]
                    }
                    title={article?.data?.relations?.['primarySector']?.data?.name}
                    isFavorite={article?.data?.isFavorite}
                    clickable
                  />
                </StyledA>
              </Link>
            ))}
            {!isMobile && <NewsletterSubscriptionTile />}
          </Tiles>
        )}
        <Box mb={isMobile ? 8 : 0}>
          <StyledButton
            variant="light"
            size="large"
            isTablet={isTablet}
            href={getPath('/housing-advice')}
          >
            {t('app.com.pages.landing.adviceAndInspiration.button')}
          </StyledButton>
        </Box>
        {isMobile && <NewsletterSubscriptionTile isMobile />}
      </Wrapper>
    </HomepageContainerWrapper>
  );
};
