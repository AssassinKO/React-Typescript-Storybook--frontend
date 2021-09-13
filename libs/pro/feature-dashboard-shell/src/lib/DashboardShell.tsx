import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { useClickOutside, usePageScroll } from '@homeproved/shared/util';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { DashboardFooter } from './DashboardFooter';
import { useDisclosure } from 'react-use-disclosure';
import { useUser } from '@homeproved/shared-feature-auth-codana';
import { useCompany } from '@homeproved/shared/feature-company';
import { useTranslation } from 'react-i18next';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { CompanyLogoContextProvider } from './company-logo-context';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 6.5rem);
  align-content: stretch;
  justify-items: stretch;
`;

const Sidebar = styled(({ offCanvas, offCanvasOpen, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  width: 30rem;
  min-height: ${({ offCanvasOpen }) => !offCanvasOpen && 'calc(100vh - 13rem)'};
  background: #fff;
  padding: 2.2rem 1.5rem;
  transition: left 0.25s ease-in-out;
  ${({ offCanvas, offCanvasOpen }) =>
    offCanvas &&
    `
    position: absolute;
    top: 6.5rem;
    left: ${offCanvasOpen ? '0' : '-30rem'};
    z-index: 99;
    overflow: auto;
  `}
  ${({ offCanvasOpen }) =>
    offCanvasOpen &&
    `
    height: calc(100vh - 6.5rem);
    overflow: auto;
  `}
`;

const Content = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: ${({ tablet }) => (tablet ? '100%' : 'calc(100% - 30rem)')};
  background: ${({ theme }) => theme.palette.background.dashboard};
`;

const DashboardContent = styled(({ height, noPaddingBottom, ...restProps }) => (
  <div {...restProps} />
))`
  align-self: stretch;
  padding: ${({ noPaddingBottom }) => (noPaddingBottom ? '2rem 3rem 0' : '2rem 3rem')};
  flex-grow: 1;
  width: 100%;
  max-width: 110rem;
  min-height: ${({ height }) => `${height}px`};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    padding: 5.5rem 7.2rem;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  span {
    margin-left: 1rem;
  }
`;

const LoadingSidebar = styled.div`
  width: 30rem;
  min-height: 100vh;
  background: #fff;
  padding: 2.2rem 1.5rem;
`;

const LoadingHeader = styled.div`
  background: ${({ theme }) => theme.config.gradients.default};
  height: 6.5rem;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 6.5rem;
  left: 0;
  width: 100%;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
`;

type DashboardShellProps = {
  noPaddingBottom?: boolean;
};

export const DashboardShell: FC<DashboardShellProps> = ({ children, noPaddingBottom }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const user = useUser();
  const { company, isSuccess, isLoading } = useCompany(
    user?.relations?.company?.data?.id?.toString()
  );
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.offCanvas));
  const {
    isOpen: offCanvasOpen,
    close: onCloseOffCanvas,
    toggle: onToggleOffCanvas,
  } = useDisclosure(isTablet);
  const sidebarRef: React.RefObject<HTMLDivElement> = React.useRef();
  const toggleBtnRef: React.RefObject<HTMLDivElement> = React.useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const { setPageScrollEnabled } = usePageScroll();

  useClickOutside(sidebarRef, onCloseOffCanvas, [toggleBtnRef]);

  useEffect(() => {
    setPageScrollEnabled(!offCanvasOpen);
  }, [offCanvasOpen, setPageScrollEnabled]);

  useEffect(() => {
    if (sidebarRef.current == null) return;
    setSidebarHeight(sidebarRef.current.clientHeight);
  }, [sidebarRef, setSidebarHeight, isTablet]);

  return isSuccess ? (
    <>
      <CompanyLogoContextProvider>
        <Wrapper>
          {!isTablet && (
            <Sidebar innerRef={sidebarRef} offCanvas={isTablet} offCanvasOpen={offCanvasOpen}>
              <DashboardSidebar offCanvas={isTablet} user={user} company={company} />
            </Sidebar>
          )}
          <Content tablet={isTablet}>
            {isTablet && (
              <>
                <Sidebar innerRef={sidebarRef} offCanvas={isTablet} offCanvasOpen={offCanvasOpen}>
                  <DashboardSidebar offCanvas={isTablet} user={user} company={company} />
                </Sidebar>
                {offCanvasOpen && <Backdrop />}
              </>
            )}
            <DashboardHeader
              offCanvas={isTablet}
              offCanvasOpen={offCanvasOpen}
              onToggleOffCanvas={onToggleOffCanvas}
              toggleBtnRef={toggleBtnRef}
            />
            <DashboardContent height={sidebarHeight} noPaddingBottom={noPaddingBottom}>
              {children}
            </DashboardContent>
          </Content>
        </Wrapper>
      </CompanyLogoContextProvider>
      <DashboardFooter />
    </>
  ) : (
    <Wrapper>
      <LoadingSidebar />
      <Content>
        <LoadingHeader />
        <LoadingMessage>
          <SvgIcon icon={Icons.INFO} size={2} color={'gradient'} />
          {isLoading && <span>{t('app.pro.dashboard.loading')}</span>}
          {!isSuccess && !isLoading && <span>{t('app.pro.pages.profile.noData')}</span>}
        </LoadingMessage>
      </Content>
    </Wrapper>
  );
};
