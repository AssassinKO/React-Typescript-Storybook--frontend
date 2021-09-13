import React, { FC } from 'react';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';
import {
  CompanyData,
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { Header } from './components/company-shell/header/Header';
import { Tabs } from '@homeproved/shared/feature-company';
import { ClaimTile } from './components/company-shell/claim-tile/ClaimTile';
import { ContactInfo } from './components/company-shell/contact-info/ContactInfo';
import { RecentRealizations } from './components/company-shell/recent-realizations/RecentRealizations';
import { CompanyStructuredData } from './components/company-shell/CompanyStructuredData';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export type CompanyShellTab = 'reviews' | 'about' | 'realizations' | 'contact';

export type CompanyShellProps = {
  slug: string;
  data: CompanyData;
  activeTab: CompanyShellTab;
  hasReviews?: boolean;
  isReviewDetail?: boolean;
};

const Flex = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  margin: ${({ isTablet }) => (isTablet ? '0' : '0 -2rem')};
`;

const DesktopTabs = styled.div`
  display: flex;
`;

const Sidebar = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  flex-basis: 30%;
  max-width: 30%;
  padding: ${({ isTablet }) => (isTablet ? 0 : '2rem')};
`;

const Content = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  flex-basis: ${({ isTablet }) => (isTablet ? '100%' : '70%')};
  max-width: ${({ isTablet }) => (isTablet ? '100%' : '70%')};
  padding: ${({ isTablet }) => (isTablet ? 0 : '2rem')};
`;

export const CompanyShell: FC<CompanyShellProps> = ({
  children,
  slug,
  data,
  activeTab,
  hasReviews = false,
  isReviewDetail = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { getPath } = useLocalizedRoutes();

  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query: realizationsQuery } = useQueryFetch(['realizationsGet', slug], () =>
    realizationsApi.apiCompaniesCompanyRealisationsGet(slug)
  );
  return (
    <>
      {!(isMobile && isReviewDetail) && (
        <>
          <Header
            data={data}
            claimed={!!data.claimedAt}
            isMobile={isMobile}
            isTablet={isTablet}
            hasReviews={hasReviews}
            activeTab={activeTab}
          />
          {!isTablet && !!data.claimedAt && (
            <DesktopTabs>
              <Tabs
                slug={slug}
                activeTab={activeTab}
                isMobile={isMobile}
                isTablet={isTablet}
                showRealizationsTab={
                  realizationsQuery.isSuccess &&
                  !!realizationsQuery.data.data &&
                  realizationsQuery.data.data.length > 0
                }
                getPath={getPath}
              />
            </DesktopTabs>
          )}
          {isTablet && !!data.claimedAt && (
            <Tabs
              slug={slug}
              activeTab={activeTab}
              isMobile={isMobile}
              isTablet={isTablet}
              getPath={getPath}
            />
          )}
        </>
      )}
      <Flex isMobile={isMobile} isTablet={isTablet}>
        {!isTablet && (
          <Sidebar isTablet={isTablet}>
            <ContactInfo slug={slug} data={data} />
            {!!data.claimedAt &&
              activeTab !== 'realizations' &&
              data.relations.recentRealisation !== null && <RecentRealizations slug={slug} />}
            {!data.claimedAt && <ClaimTile data={data} />}
          </Sidebar>
        )}
        <Content isTablet={isTablet}>{children}</Content>
      </Flex>
      {!(isMobile && isReviewDetail) && (
        <>
          {!data.claimedAt && isTablet && <ClaimTile data={data} />}
          <CompanyStructuredData company={data} />
        </>
      )}
    </>
  );
};
