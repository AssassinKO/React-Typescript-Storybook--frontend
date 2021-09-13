import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HomeprovedScore, Icons, LogoPro } from '@homeproved/shared/ui';
import { SidebarMenuSection } from './SidebarMenuSection';
import { useTranslation } from 'react-i18next';
import {
  CompaniesApiFactory,
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
  UserData,
  CompanyData,
} from '@homeproved/shared/data-access';
import { useMediaQuery, useTheme } from '@material-ui/core';

type DashboardSidebarProps = {
  user: UserData;
  company: CompanyData;
  offCanvas: boolean;
};

const LogoWrapper = styled.div`
  padding: 0 2rem;
`;

const StyledLogoPro = styled(LogoPro)`
  margin-bottom: 3rem;
`;

const SidebarMenu = styled(({ offCanvas, ...restProps }) => <div {...restProps} />)`
  margin-top: ${({ offCanvas }) => (offCanvas ? '1rem' : '4rem')};
`;

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ offCanvas, user, company }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileProDashboard = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.proDashboard)
  );
  const [limitReached, setLimitReached] = useState<boolean>(false);

  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch('realizationsGet', () =>
    realizationsApi.apiCompaniesCompanyRealisationsGet(company?.id?.toString())
  );

  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company?.id?.toString(), {
      options: {
        enabled: !!company,
      },
    })
  );

  useEffect(() => {
    if (query.isSuccess && !!company.relations.subscription) {
      const realizations = query.data.data.length;
      const limit = company.relations.subscription.data.features.realisationsNr;
      if (realizations >= limit) setLimitReached(true);
    } else if (query.isSuccess && company.relations.subscription == null) {
      setLimitReached(true);
    }
  }, [company, query, setLimitReached]);

  return (
    <>
      {!offCanvas && (
        <>
          <LogoWrapper>
            <StyledLogoPro fullColor />
          </LogoWrapper>
          <HomeprovedScore
            score={companyScore?.data?.data != null ? companyScore.data.data.score : 0}
            totalReviews={companyScore?.data?.data != null ? companyScore.data.data.total : ''}
          />
        </>
      )}
      <SidebarMenu offCanvas={offCanvas}>
        {mobileProDashboard && (
          <SidebarMenuSection
            items={[
              {
                icon: Icons.DASHBOARD,
                href: '/dashboard',
                label: t('app.pro.dashboard.menu.dashboard'),
              },
            ]}
          />
        )}
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.reviews.title')}
          items={[
            {
              icon: Icons.STAR_OUTLINE,
              href: '/reviews',
              label: t('app.pro.dashboard.menu.reviews.items.myReviews'),
            },
            {
              icon: Icons.SCORE,
              href: '/rating',
              label: t('app.pro.dashboard.menu.reviews.items.myScore'),
            },
          ]}
        />
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.profile.title')}
          items={[
            {
              icon: Icons.HELMET_OUTLINE,
              href: '/profile',
              label: t('app.pro.dashboard.menu.profile.items.profile'),
            },
            // {
            //   icon: Icons.LOCATION_OUTLINE,
            //   href: '/',
            //   label: t('app.pro.dashboard.menu.profile.items.locations'),
            // },
          ]}
        />
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.realizations.title')}
          items={
            !limitReached
              ? [
                  {
                    icon: Icons.REALIZATION,
                    href: '/realizations',
                    label: t('app.pro.dashboard.menu.realizations.items.myRealizations'),
                  },
                  {
                    icon: Icons.PLUS,
                    iconSize: 1.8,
                    href: '/add-realization',
                    label: t('app.pro.dashboard.menu.realizations.items.addRealization'),
                  },
                ]
              : [
                  {
                    icon: Icons.REALIZATION,
                    href: '/realizations',
                    label: t('app.pro.dashboard.menu.realizations.items.myRealizations'),
                  },
                ]
          }
        />
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.collectReviews.title')}
          items={[
            {
              icon: Icons.EMAIL,
              href: '/invitation',
              label: t('app.pro.dashboard.menu.collectReviews.items.email'),
            },
            // {
            //   icon: Icons.REVIEW_INVITE,
            //   href: '/',
            //   label: t('app.pro.dashboard.menu.collectReviews.items.cards'),
            // },
            // {
            //   icon: Icons.MOBILE_INVITE,
            //   href: '/',
            //   label: t('app.pro.dashboard.menu.collectReviews.items.mobile'),
            // },
            // {
            //   icon: Icons.INVITE_STATS,
            //   href: '/',
            //   label: t('app.pro.dashboard.menu.collectReviews.items.stats'),
            // },
          ]}
        />
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.promoTools.title')}
          items={[
            {
              icon: Icons.SOCIAL_SHARE,
              href: '/social-share',
              label: t('app.pro.dashboard.menu.promoTools.items.socialShare'),
            },
            {
              icon: Icons.WIDGETS,
              href: '/',
              label: t('app.pro.dashboard.menu.promoTools.items.widgets'),
            },
            {
              icon: Icons.PROMO_TOOLS,
              href: '/',
              label: t('app.pro.dashboard.menu.promoTools.items.tools'),
            },
            {
              icon: Icons.COMPANY_FILE,
              href: '/',
              label: t('app.pro.dashboard.menu.promoTools.items.file'),
            },
          ]}
        />
        <SidebarMenuSection
          title={t('app.pro.dashboard.menu.settings.title')}
          items={[
            {
              icon: Icons.PACKS,
              href: '/my-account',
              label: t('app.pro.dashboard.menu.settings.items.myAccount'),
            },
            {
              icon: Icons.USER,
              href: '/employees',
              label: t('app.pro.dashboard.menu.settings.items.users'),
            },
            // {
            //   icon: Icons.BILLING,
            //   href: '/',
            //   label: t('app.pro.dashboard.menu.settings.items.billing'),
            // },
            {
              icon: Icons.CONTACT,
              href: '/',
              label: t('app.pro.dashboard.menu.settings.items.contact'),
            },
          ]}
        />
      </SidebarMenu>
    </>
  );
};
