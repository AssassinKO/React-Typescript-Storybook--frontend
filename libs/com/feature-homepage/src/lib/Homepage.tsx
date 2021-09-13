import React, { FC } from 'react';
import styled from 'styled-components';
import { Categories } from './categories/Categories';
import { TopGradient, BottomGradient } from '@homeproved/shared/ui';
import { HomepagePrimarySection } from './primary/Primary';
import { AdviceAndInspiration } from './advice-and-inspiration/AdviceAndInspiration';
import { CompaniesSpotlight } from './companies-spotlight/CompaniesSpotlight';
import { Testimonials } from './testimonials/Testimonials';
import { TestimonialsMobile } from './testimonials/TestimonialsMobile';
import { CallToAction } from './calltoaction/CallToAction';
import { ReviewSection, useSectors } from '@homeproved/shared/feature-sectors';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Header } from '@homeproved/com/feature-header';
import { Footer } from '@homeproved/com/feature-footer';
import { TagsAndSocials } from './footer/TagsAndSocials';
import { RatingPlatform } from './primary/RatingPlatform';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  background: #fff;
`;

const Inner = styled.div`
  position: relative;
  z-index: 10;
`;

const Bottom = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  position: relative;
  overflow: hidden;
  margin-top: ${({ tablet }) => (!tablet ? '4rem' : 0)};
`;

const Top = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  background: ${({ theme, isMobile }) =>
    isMobile ? theme.config.gradients.default : 'transparent'};
`;

export const Homepage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  const isFooterDesktop = useMediaQuery(theme.breakpoints.down(1185));
  const { getPath } = useLocalizedRoutes();

  const sectors = useSectors();

  return (
    <Wrapper>
      <Top isMobile={isMobile}>
        <Header homepage transparent />
        <HomepagePrimarySection tablet={isTablet} mobile={isMobile} sectors={sectors?.data} />
        {!isMobile && (
          <>
            <ReviewSection
              isMobile={isMobile}
              getPath={getPath}
              transparentBG
              generalTitle
              bordered
              noTopSpacing
            />
            <TopGradient isMobile={isMobile} />
          </>
        )}
      </Top>
      {isMobile && (
        <>
          <RatingPlatform mobile={isMobile} />
          <ReviewSection
            isMobile={isMobile}
            getPath={getPath}
            transparentBG
            generalTitle
            bordered
            noTopSpacing
          />
        </>
      )}
      <Inner>
        {isMobile ? <TestimonialsMobile /> : <Testimonials />}
        <Categories sectors={sectors?.data} />
        <AdviceAndInspiration getPath={getPath} />
        <CompaniesSpotlight getPath={getPath} />
      </Inner>
      <Bottom tablet={isTablet}>
        <CallToAction getPath={getPath} />
        <TagsAndSocials isMobile={isMobile} isTablet={isFooterDesktop} />
        <Footer transparent={!isFooterDesktop} marginTop={5} />
        {!isFooterDesktop && <BottomGradient />}
      </Bottom>
    </Wrapper>
  );
};
