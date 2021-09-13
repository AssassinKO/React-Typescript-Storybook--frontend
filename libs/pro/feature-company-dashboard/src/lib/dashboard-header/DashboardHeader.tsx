import React, { FC } from 'react';
import styled from 'styled-components';
import { CompanyData, UserData } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';

export interface DashboardHeaderProps {
  company: CompanyData;
  user: UserData;
  isMobile?: boolean;
  isTablet?: boolean;
}

const Wrapper = styled(({ banner, isTablet, ...restProps }) => <div {...restProps} />)`
  background-image: ${({ banner }) => banner && `url('${banner}')`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: ${({ isTablet }) => (isTablet ? '-2rem -3rem 2rem' : '-5.5rem -7.2rem 5.5rem')};
  display: flex;
  padding: 4rem;
  border-bottom-right-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  image-rendering: -webkit-optimize-contrast;
`;

const Logo = styled.img`
  width: auto;
  height: 11.4rem;
  box-shadow: 0 0 0 0.5rem rgba(255, 255, 255, 0.7);
`;

const Title = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isMobile }) => (isMobile ? '1.4rem' : '2rem')};
  color: #fff;
  font-weight: 700;
  margin: 0 0 -1rem 3rem;
  align-self: flex-end;
  text-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.5);
`;

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  company,
  user,
  isMobile,
  isTablet,
}) => {
  const { t } = useTranslation();
  const bannerText = t('app.pro.pages.dashboard.userWelcome')
    .replace('%user%', user.firstName)
    .replace('%company%', company.name);

  return (
    <Wrapper
      isTablet={isTablet}
      banner={
        company.cover !== null ? company.cover.data.conversions['banner'] : '/company-banner.png'
      }
    >
      <Logo
        src={
          company.logo !== null ? company.logo.data.conversions['square-m'] : '/logo-default.png'
        }
        alt={company.name}
      />
      <Title isMobile={isMobile}>{bannerText}</Title>
    </Wrapper>
  );
};
