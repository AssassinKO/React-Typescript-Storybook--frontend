import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { HomepageContainerWrapper } from '../container/Container';
import { RatingPlatform } from './RatingPlatform';
import { Polaroid } from './Polaroid';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { SearchSuggestions } from '@homeproved/com/feature-search';
import Link from 'next/link';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { Sector } from '@homeproved/shared/data-access';

type HomepagePrimarySectionProps = {
  tablet?: boolean;
  mobile?: boolean;
  sectors: Sector[] | null;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 7.5rem 0;
`;

const TabletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0 6rem 0;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MobileWrapper = styled.div`
  margin: 4rem auto 6rem;
  max-width: 45rem;
`;

const SearchWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding-top: ${({ tablet, mobile }) => (mobile ? '0' : tablet ? '2rem' : '5rem')};
  flex-basis: 35%;
`;

const SearchTitle = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

const StyledLink = styled(({ mobile, ...restProps }) => <span {...restProps} />)`
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

export const HomepagePrimarySection: FC<HomepagePrimarySectionProps> = ({
  tablet = false,
  mobile = false,
  sectors,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const showPolaroid = useMediaQuery(theme.breakpoints.down(1000));
  const { getPath } = useLocalizedRoutes();

  return (
    <HomepageContainerWrapper>
      {mobile ? (
        <MobileWrapper>
          <SearchWrapper mobile>
            <SearchTitle mobile={mobile}>{t('app.com.pages.landing.primary.search')}</SearchTitle>
            <SearchSuggestions searchMode="compact" sectors={sectors} />
            <Box mt={2} display="flex" flexDirection="column">
              <Link href={getPath('/company-search')}>
                <StyledLink mobile={mobile}>
                  {t('app.com.pages.sectors.subSector.advancedSearch')}
                </StyledLink>
              </Link>
            </Box>
          </SearchWrapper>
        </MobileWrapper>
      ) : (
        <>
          {!tablet && (
            <Wrapper>
              <RatingPlatform />
              <Polaroid />
              <SearchWrapper>
                <SearchTitle mobile={mobile}>
                  {t('app.com.pages.landing.primary.search')}
                </SearchTitle>
                <SearchSuggestions searchMode="compact" sectors={sectors} />
                <Box mt={2}>
                  <Link href={getPath('/company-search')}>
                    <StyledLink mobile={mobile}>
                      {t('app.com.pages.sectors.subSector.advancedSearch')}
                    </StyledLink>
                  </Link>
                </Box>
              </SearchWrapper>
            </Wrapper>
          )}
          {tablet && (
            <TabletWrapper>
              <Group>
                <RatingPlatform tablet />
                {!showPolaroid && <Polaroid />}
                <SearchWrapper>
                  <SearchTitle mobile={mobile}>
                    {t('app.com.pages.landing.primary.search')}
                  </SearchTitle>
                  <SearchSuggestions searchMode="compact" sectors={sectors} />
                  <Box mt={2}>
                    <Link href={getPath('/company-search')}>
                      <StyledLink mobile={mobile}>
                        {t('app.com.pages.sectors.subSector.advancedSearch')}
                      </StyledLink>
                    </Link>
                  </Box>
                </SearchWrapper>
              </Group>
            </TabletWrapper>
          )}
        </>
      )}
    </HomepageContainerWrapper>
  );
};
