import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { HomepageContainerWrapper } from '@homeproved/com/feature-homepage';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { useMostReadArticles } from '@homeproved/com/feature-articles';
import Link from 'next/link';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { NewsletterSubscriptionTile } from '@homeproved/shared/feature-newsletter';

type NewTrendsProps = {
  getComPath: GetPathFunction;
};

const Wrapper = styled.div`
  margin: 6rem 0;
`;

const Tiles = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem 2rem;
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

const StyledSectionTitle = styled(({ mobile, ...restProps }) => <SectionTitle {...restProps} />)`
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

const StyledA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const NewTrends: FC<NewTrendsProps> = ({ getComPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const { data: articleData, isSuccess } = useMostReadArticles();
  const articles = articleData?.data;

  return (
    isSuccess && (
      <HomepageContainerWrapper>
        <Wrapper>
          <StyledSectionTitle
            label={ReactHtmlParser(
              t('app.pro.pages.landing.newTrends.title').replace(
                '%BREAK_MOBILE%',
                isMobile ? '<br />' : ' '
              )
            )}
            textAlign={isMobile ? 'center' : 'left'}
            mobile={isMobile}
          />
          <Tiles isMobile={isMobile} isTablet={isTablet}>
            {articles.map((article, index) => (
              <Link
                key={index}
                href={
                  process.env.NEXT_PUBLIC_COM_URL +
                  getComPath('/housing-advice/articles/:article', {
                    article: article.data.slug,
                  })
                }
                passHref
              >
                <StyledA
                  href={
                    process.env.NEXT_PUBLIC_COM_URL +
                    getComPath('/housing-advice/articles/:article', {
                      article: article.data.slug,
                    })
                  }
                  target={'_blank'}
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
            <NewsletterSubscriptionTile />
          </Tiles>
          <StyledButton variant="light" size="large" isTablet={isTablet}>
            {t('app.pro.pages.landing.newTrends.button')}
          </StyledButton>
        </Wrapper>
      </HomepageContainerWrapper>
    )
  );
};
