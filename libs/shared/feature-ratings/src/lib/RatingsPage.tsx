import React, { FC } from 'react';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useTranslation } from 'react-i18next';
import { Box, Card, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useUser } from '@homeproved/shared/feature-auth';
import { theme, SectionTitle, HomeprovedScore, Button } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { CompaniesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';
import { StarProgress } from '@homeproved/shared/ui';

type RatingsPageProps = {
  getPath: GetPathFunction;
};

const Wrapper = styled.div``;
const Overview = styled(({ mobile, ...restProps }) => <Card {...restProps} />)`
  box-shadow: none;
  padding: ${({ mobile }) => (mobile ? '3rem 3rem 1rem' : '3rem 2rem 0rem 2rem')};
`;

const ShareTitle = styled(Typography)`
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 700;
`;
const ShareText = styled(Typography)`
  font-size: 1.2rem;
  line-height: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;
const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.2rem;
  text-align: left;
`;

export const RatingsPage: FC<RatingsPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
  const user = useUser();
  const company = user?.relations?.company?.data;
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company?.id?.toString(), {
      options: {
        enabled: !!company,
      },
    })
  );

  if (!company) return <>{t('app.pro.pages.reviews.errors.companyNotFound')}</>;
  return (
    <Wrapper>
      <Box mb={3} mt={isMobile ? 1 : 0}>
        <SectionTitle
          label={t('app.pro.pages.rating.title')}
          uppercase={true}
          font={'PTSans'}
          textAlign={isMobile ? 'center' : 'left'}
        />
      </Box>
      <Overview mobile={isMobile}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5} md={3}>
            <Box
              mb={isDesktop ? 3 : 4}
              borderBottom={isMobile ? `1px solid ${theme.palette.grey[200]}` : 'none'}
              pb={isMobile ? '2rem' : 0}
            >
              <HomeprovedScore
                score={companyScore?.data?.data?.score ?? 0}
                totalReviews={companyScore?.data?.data?.total ?? ''}
                extendedView={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={5}>
            <Box pl={isDesktop ? 4 : 0} pr={isDesktop ? 6 : 0} mb={isDesktop ? 3 : 4}>
              <StarProgress
                starData={{
                  stars5: companyScore?.data?.data?.distribution?.[5] ?? 0,
                  stars4: companyScore?.data?.data?.distribution?.[4] ?? 0,
                  stars3: companyScore?.data?.data?.distribution?.[3] ?? 0,
                  stars2: companyScore?.data?.data?.distribution?.[2] ?? 0,
                  stars1: companyScore?.data?.data?.distribution?.[1] ?? 0,
                }}
                totalReviews={
                  companyScore?.data?.data != null ? parseInt(companyScore.data.data.total) : 0
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box mb={3}>
              <Box mb={1}>
                <ShareTitle variant="h3">
                  {t('app.pro.pages.rating.overview.share.title')}
                </ShareTitle>
              </Box>
              <Box mb={1}>
                <ShareText variant="body1">
                  {t('app.pro.pages.rating.overview.share.description')}
                </ShareText>
              </Box>
              <Box>
                <StyledButton href={getPath('/')} variant="text">
                  {t('app.pro.pages.rating.overview.share.tip')}
                </StyledButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Overview>
    </Wrapper>
  );
};
