import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Footer } from '@homeproved/pro/feature-footer';
import { Header } from '@homeproved/pro/feature-header';
import { Plans } from '@homeproved/pro/feature-plans';
import { HomepagePoints } from './points/Points';
import { TopGradient } from './gradient/Gradient';
import { HomepagePrimary } from './primary/Primary';
import { HomepageTools } from './tools/Tools';
import { HomepagePolicy } from './policy/Policy';
import { HomepageContact } from './contact/Contact';
import { HomepageGauges } from './gauges/Gauges';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { NewTrends } from './new-trends/NewTrends';
import { SectionTitle } from '@homeproved/shared/ui';
import TrackVisibility from 'react-on-screen';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type HomepageProps = {
  getComPath: GetPathFunction;
};

export const Wrapper = styled.div`
  position: relative;
  background: #fff;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 10;
`;

const PlansSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const Title = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '3rem')};
  font-weight: 700;
  max-width: 70rem;
  text-align: center;
`;

export const Homepage: FC<HomepageProps> = ({ getComPath }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const smBreakpoint = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const handleSelectPlan = () => {
    router.push(getPath('/registration/step1')).then();
  };

  return (
    <Wrapper>
      <TopGradient mobile={isMobile} />
      <Inner>
        <Header homepage transparent />
        <HomepagePrimary />
        <TrackVisibility>
          {({ isVisible }) => <HomepageGauges isVisible={isVisible} />}
        </TrackVisibility>
        <HomepageTools />
        <PlansSection id="packs">
          {isMobile ? (
            <>
              <Box display="flex" pl={2} pr={2} mb={2} width="100%" flexDirection="column">
                <SectionTitle
                  label={t('plans.plans').toUpperCase()}
                  textAlign="center"
                  ignoreMobile
                />
              </Box>
              <Box pl={2} pr={2} mb={2}>
                <Title variant="h3" mobile={isMobile}>
                  {t('app.pro.pages.landing.pricing.header')}
                </Title>
              </Box>
            </>
          ) : (
            <Title>{t('app.pro.pages.landing.pricing.title')}</Title>
          )}
          <Plans onSelectPlan={handleSelectPlan} mobile={isMobile} />
        </PlansSection>
        {!smBreakpoint && (
          <>
            <HomepagePolicy />
            <HomepagePoints />
          </>
        )}
        <HomepageContact />
        <NewTrends getComPath={getComPath} />
        <Footer />
      </Inner>
    </Wrapper>
  );
};

export default Homepage;
