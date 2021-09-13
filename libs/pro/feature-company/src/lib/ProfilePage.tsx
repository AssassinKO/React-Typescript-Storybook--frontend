import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Button, Icons, SectionTitle, SvgIcon } from '@homeproved/shared/ui';
import { About, ActivitySpecializations, BannerUpload, GeneralInfo, Labels } from './profile-page';
import { UserData } from '@homeproved/shared/data-access';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { SocialMedia } from './profile-page/social-media/SocialMedia';
import { useCompany } from '@homeproved/shared/feature-company';

export type ProfilePageProps = {
  user: UserData;
};

const Content = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
`;

const Main = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  flex: 1 1 auto;
  margin-left: ${({ isMobile }) => (isMobile ? '0' : '2rem')};
`;

const Sidebar = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  flex: 0 0 21rem;
  margin: ${({ isMobile }) => (isMobile ? '0' : '-12rem 0 0 2rem')};
  position: relative;
  z-index: 2;
`;

const StyledButton = styled(({ isMobile, ...restProps }) => <Button {...restProps} />)`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'table')};
  margin-left: auto;
  font-size: 1.2rem;
  padding: 0.8rem 2rem 0.8rem 4rem;
  position: ${({ isMobile }) => (isMobile ? 'absolute' : '')};
  z-index: 2;
`;

const NoData = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  span {
    margin-left: 1rem;
  }
`;

export const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const mobileSaveButton = useMediaQuery(theme.breakpoints.down(800));
  const { getPath: comGetPath } = useComLocalizedRoutes();
  const { company, isSuccess, refetch } = useCompany(
    user?.relations?.company?.data?.id?.toString()
  );

  return isSuccess ? (
    <>
      <StyledButton
        icon={Icons.EYE}
        arrow="none"
        pill={false}
        isMobile={isMobile}
        href={
          process.env.NEXT_PUBLIC_COM_URL +
          comGetPath('/company/:slug/reviews', { slug: company.slug })
        }
        target={'_blank'}
      >
        {t('app.pro.pages.profile.viewProfile')}
      </StyledButton>
      {!isMobile && (
        <SectionTitle
          label={t('app.pro.pages.profile.title')}
          uppercase={true}
          font={'PTSans'}
          textAlign={'left'}
        />
      )}
      <BannerUpload isMobile={isMobile} data={company} />
      <Content isMobile={isMobile}>
        <Sidebar isMobile={isMobile}>
          <GeneralInfo data={company} isMobile={isMobile} />
          {isMobile && (
            <Labels
              data={company}
              isMobile={isMobile}
              isTablet={isTablet}
              refetch={refetch}
              mobileSaveButton={mobileSaveButton}
            />
          )}
        </Sidebar>
        <Main isMobile={isMobile}>
          <ActivitySpecializations data={company} mobileSaveButton={mobileSaveButton} />
          {!isMobile && (
            <Labels
              data={company}
              isMobile={isMobile}
              isTablet={isTablet}
              refetch={refetch}
              mobileSaveButton={mobileSaveButton}
            />
          )}
          <About data={company} mobileSaveButton={mobileSaveButton} />
          <SocialMedia data={company} isTablet={isTablet} mobileSaveButton={mobileSaveButton} />
        </Main>
      </Content>
    </>
  ) : (
    <NoData>
      <SvgIcon icon={Icons.INFO} size={2} color={'gradient'} />
      <span>{t('app.pro.pages.profile.noData')}</span>
    </NoData>
  );
};
