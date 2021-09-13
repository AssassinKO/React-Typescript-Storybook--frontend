import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  DashboardRealizations,
  DashboardInvitations,
  DashboardPlan,
  DashboardReviews,
  DashboardUpgradeBanner,
  DashboardHomeprovedScore,
} from './dashboard-cards';
import { DashboardHeader } from './dashboard-header/DashboardHeader';
import { useCompany } from '@homeproved/shared/feature-company';
import { useUser } from '@homeproved/shared/feature-auth';
import {
  CompaniesApiFactory,
  PlansApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { PlanFeatures, PlanUid } from '@homeproved/pro/feature-plans';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { RecentReviews } from './recent-reviews/RecentReviews';

type DashboardPageProps = {
  getPath: GetPathFunction;
};

const DashboardCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2rem -1rem;

  @media screen and (min-width: 360px) {
    flex-direction: row;
  }
`;

export const DashboardPage: FC<DashboardPageProps> = ({ getPath }) => {
  const user = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanUid>(PlanUid.FREE);
  const { company, isSuccess } = useCompany(user?.relations?.company?.data?.id?.toString());

  const proDashboardApi = useApiFactory(CompaniesApiFactory);
  const { query } = useQueryFetch(
    'pro-dashboard-get',
    () => proDashboardApi.apiCompaniesProDashboardGet(company.id.toString()),
    {
      options: {
        enabled: isSuccess,
        refetchOnWindowFocus: false,
      },
    }
  );

  const plansApi = useApiFactory(PlansApiFactory);
  const {
    query: { data: teamPlanData, isSuccess: teamPlanIsSuccess },
  } = useQueryFetch(['plans', company.id], () => plansApi.apiPlansPlanGet(PlanUid.TEAM), {
    options: {
      enabled: isSuccess,
      refetchOnWindowFocus: false,
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    if (company.relations.subscription.data.uid !== PlanUid.FREE) setCurrentPlan(PlanUid.TEAM);
  }, [isSuccess, company]);

  useEffect(() => {
    if (!teamPlanIsSuccess || !isSuccess) return;
    if (teamPlanIsSuccess && currentPlan !== PlanUid.TEAM) setShowUpgradeModal(true);
  }, [teamPlanIsSuccess, isSuccess, currentPlan]);

  useEffect(() => {
    if (!company) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof Chargebee !== 'function') return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cbInstance = Chargebee.getInstance();
    const cart = cbInstance.getCart();

    const customer = {
      id: company.chargebeeId,
      first_name: user.firstName,
      last_name: user.lastName,
      email: company.email,
      company: company.name,
      vat_number: company.vat,
      billing_address: {
        first_name: user.firstName,
        last_name: user.lastName,
        company: company.name,
        email: company.email,
        city: company.city,
        zip: company.postalCode,
        country: company.country,
        phone: company.phone,
        line1: `${company.street} ${company.streetNr}`,
        line2: '',
      },
    };

    cart.setCustomer(customer);
  }, [company, user]);

  const handleChargebeeUpgrade = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Chargebee.registerAgain();
  };

  return (
    isSuccess &&
    query.isSuccess && (
      <>
        <DashboardHeader company={company} user={user} isMobile={isMobile} isTablet={isTablet} />
        <DashboardCardWrapper>
          {isMobile ? (
            <>
              <DashboardReviews amount={0} getPath={getPath} isMobile={isMobile} />
              <DashboardInvitations
                amount={query.data.data.numberOfInvitesForReviews}
                remaining={query.data.data.numberOfInvitesRemainingForReviews}
                plan={company.relations.subscription.data.uid as PlanUid}
                chargebeeUpgrade={handleChargebeeUpgrade}
                getPath={getPath}
                isMobile={isMobile}
              />
              <DashboardRealizations
                amount={query.data.data.numberOfRealisations}
                remaining={query.data.data.numberOfRealisationsRemaining}
                getPath={getPath}
                plan={company.relations.subscription.data.uid as PlanUid}
                chargebeeUpgrade={handleChargebeeUpgrade}
                isMobile={isMobile}
              />
              <DashboardPlan
                getPath={getPath}
                plan={company.relations.subscription.data.uid as PlanUid}
                isMobile={isMobile}
              />
            </>
          ) : (
            <>
              <DashboardPlan
                getPath={getPath}
                plan={company.relations.subscription.data.uid as PlanUid}
                isMobile={isMobile}
              />
              <DashboardInvitations
                amount={query.data.data.numberOfInvitesForReviews}
                remaining={query.data.data.numberOfInvitesRemainingForReviews}
                plan={company.relations.subscription.data.uid as PlanUid}
                chargebeeUpgrade={handleChargebeeUpgrade}
                getPath={getPath}
                isMobile={isMobile}
              />
              <DashboardReviews
                amount={query.data.data.totalReviews}
                getPath={getPath}
                isMobile={isMobile}
              />
              <DashboardRealizations
                amount={query.data.data.numberOfRealisations}
                remaining={query.data.data.numberOfRealisationsRemaining}
                getPath={getPath}
                plan={company.relations.subscription.data.uid as PlanUid}
                chargebeeUpgrade={handleChargebeeUpgrade}
                isMobile={isMobile}
              />
            </>
          )}
        </DashboardCardWrapper>
        {company.relations.subscription.data.uid !== PlanUid.TEAM ? (
          <DashboardUpgradeBanner
            isMobile={isMobile}
            plan={company.relations.subscription.data.uid as PlanUid}
          />
        ) : (
          <DashboardHomeprovedScore company={company} />
        )}
        {query.data.data.recentReviews.length > 0 && (
          <RecentReviews
            reviews={query.data.data.recentReviews}
            company={company}
            getPath={getPath}
            isMobile={isMobile}
          />
        )}
        {showUpgradeModal && (
          <PlanFeatures
            plan={currentPlan}
            teamPlan={teamPlanData.data}
            modal={true}
            company={company}
          />
        )}
      </>
    )
  );
};
