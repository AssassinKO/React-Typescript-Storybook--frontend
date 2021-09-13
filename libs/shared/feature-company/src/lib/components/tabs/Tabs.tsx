import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icons } from '@homeproved/shared/ui';
import { Tab } from '../tab/Tab';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

export type TabsProps = {
  slug: string;
  isMobile?: boolean;
  isTablet?: boolean;
  activeTab: string;
  showRealizationsTab?: boolean;
  getPath: GetPathFunction;
};

const Wrapper = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin: ${({ isMobile }) => !isMobile && '0 0 2rem'};
  transition: bottom 0.2s ease-in-out;
  bottom: -15rem;

  &.show {
    bottom: 0;
  }
  ${({ isTablet, theme }) =>
    isTablet &&
    `
    position: fixed;
    right: 0;
    left: 0;
    margin-bottom: 0;
    z-index: 99;
    background: ${theme.palette.grey['800']};
    justify-content: center;
  `};
`;

export const Tabs: FC<TabsProps> = ({
  slug,
  isMobile,
  isTablet,
  activeTab,
  showRealizationsTab = true,
  getPath,
}) => {
  const { t } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!isTablet) return null;
    const footer = document.getElementById('main-footer');

    if (footer.offsetTop < window.innerHeight) {
      setShowMobileMenu(true);
    } else {
      window.onscroll = (e) => {
        const footerHeight = footer.offsetHeight;
        const element = document.documentElement;
        setShowMobileMenu(
          element.scrollHeight - footerHeight - element.scrollTop >= element.clientHeight
        );
      };
    }
  }, [isTablet, setShowMobileMenu]);

  return (
    <Wrapper
      isMobile={isMobile}
      isTablet={isTablet}
      className={showMobileMenu && isTablet ? 'show' : ''}
    >
      <Tab
        label={t('app.com.pages.company.companyShell.tabs.reviews')}
        href={getPath('/company/:slug/reviews', { slug })}
        active={activeTab === 'reviews'}
        isMobile={isMobile}
        isTablet={isTablet}
        icon={Icons.STAR_SOLID}
      />
      <Tab
        label={t('app.com.pages.company.companyShell.tabs.aboutUs')}
        href={getPath('/company/:slug/about', { slug })}
        active={activeTab === 'about'}
        isMobile={isMobile}
        isTablet={isTablet}
        icon={Icons.HELMET_SOLID}
      />
      {showRealizationsTab && (
        <Tab
          label={t('app.com.pages.company.companyShell.tabs.realizations')}
          href={getPath('/company/:slug/realizations', { slug })}
          active={activeTab === 'realizations'}
          isMobile={isMobile}
          isTablet={isTablet}
          icon={Icons.BINOCULARS}
        />
      )}
      <Tab
        label={t('app.com.pages.company.companyShell.tabs.contact')}
        href={getPath('/company/:slug/contact', { slug })}
        active={activeTab === 'contact'}
        isMobile={isMobile}
        isTablet={isTablet}
        icon={Icons.ENVELOPE_OUTLINE}
      />
    </Wrapper>
  );
};
