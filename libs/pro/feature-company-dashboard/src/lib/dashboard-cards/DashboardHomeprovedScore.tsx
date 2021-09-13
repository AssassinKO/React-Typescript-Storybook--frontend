import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, Grid, useMediaQuery } from '@material-ui/core';
import { Stars, StarProgress, theme } from '@homeproved/shared/ui';
import styled from 'styled-components';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { StyledButton } from './Atoms';

export interface DashboardHomeprovedScoreProps {
  company: CompanyData;
}

const ShareBox = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ShareTitle = styled.div`
  font-weight: 900;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ScoreLabel = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Score = styled.div`
  font-size: 4rem;
  font-weight: 900;

  span {
    font-size: 1.8rem;
  }
`;

const ScoreSlogan = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  font-size: 2.5rem;
  margin-top: 1rem;
`;

const Overview = styled(({ mobile, ...restProps }) => <Card {...restProps} />)`
  box-shadow: none;
  padding: ${({ mobile }) => (mobile ? '3rem 3rem 1rem' : '3rem 2rem 0rem 2rem')};
`;

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const DashboardHomeprovedScore: FC<DashboardHomeprovedScoreProps> = ({ company }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company?.id?.toString(), {
      options: {
        enabled: !!company,
      },
    })
  );

  return (
    <Overview mobile={isMobile}>
      <Grid container spacing={0}>
        <StyledGrid item xs={12} sm={5} md={3}>
          <Box
            mb={isDesktop ? 3 : 4}
            borderBottom={isMobile ? `1px solid ${theme.palette.grey[200]}` : 'none'}
            pb={isMobile ? '2rem' : 0}
          >
            <ScoreWrapper>
              <ScoreLabel>{'Je homeproved-Score'}</ScoreLabel>
              <Score>
                {companyScore?.data?.data?.score ?? 0}
                <span>/10</span>
              </Score>
              <Stars count={(companyScore?.data?.data?.score / 10) * 5} size={2.2} />
              <ScoreSlogan>
                {companyScore?.data?.data?.score >= 8
                  ? t('app.pro.pages.dashboard.strongWork')
                  : t('app.pro.pages.dashboard.scoreBoost')}
              </ScoreSlogan>
            </ScoreWrapper>
          </Box>
        </StyledGrid>
        <Grid item xs={12} sm={7} md={6}>
          <Box pl={isMobile ? 0 : 4} pr={isMobile ? 0 : 6} mb={3}>
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
        <Grid item xs={12} sm={12} md={3}>
          <ShareBox>
            <ShareTitle>
              {companyScore?.data?.data?.score >= 8
                ? t('app.pro.pages.dashboard.shareGoodScore')
                : t('app.pro.pages.dashboard.shareMediumScore')}
            </ShareTitle>
            <StyledButton size={'small'}>
              {companyScore?.data?.data?.score >= 8
                ? t('app.pro.pages.dashboard.shareScore')
                : t('app.pro.pages.dashboard.upgradeCtaButton')}
            </StyledButton>
          </ShareBox>
        </Grid>
      </Grid>
    </Overview>
  );
};
