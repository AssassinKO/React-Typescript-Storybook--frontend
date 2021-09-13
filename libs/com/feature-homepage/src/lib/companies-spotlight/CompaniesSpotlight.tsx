import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomepageContainerWrapper } from '../container/Container';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import Link from 'next/link';
import { useMostReadRealizations } from '@homeproved/com/feature-articles';

type CompaniesSpotlightProps = {
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
      isMobile ? '100%' : isTablet ? 'calc(50% - 2rem)' : 'calc(25% - 2rem)'};
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

export const CompaniesSpotlight: FC<CompaniesSpotlightProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const { data: realizationData, isSuccess, isLoading } = useMostReadRealizations();
  const realizations = realizationData?.data;

  return (
    <HomepageContainerWrapper>
      <Wrapper>
        <SectionTitle
          label={t('app.com.pages.landing.companiesSpotlight.title')}
          textAlign={isMobile ? 'center' : 'left'}
        />
        {isLoading && (
          <Typography variant="body1">{t('app.com.pages.realizations.loading')}</Typography>
        )}
        {isSuccess && (
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
        )}
        <StyledButton
          variant="light"
          size="large"
          isTablet={isTablet}
          href={getPath('/realizations')}
        >
          {t('app.com.pages.landing.companiesSpotlight.button')}
        </StyledButton>
      </Wrapper>
    </HomepageContainerWrapper>
  );
};
