import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '@homeproved/com/feature-header';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Footer } from '@homeproved/com/feature-footer';

type PageShellProps = {
  padding?: boolean;
  innerPadding?: boolean;
  footerMargin?: number;
  fullWidth?: boolean;
  omitFooter?: boolean;
  relative?: boolean;
  tabsMenu?: boolean;
};

const Wrapper = styled(({ paddingBottom, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: ${({ paddingBottom }) => paddingBottom && '9rem'};
`;

const ContentWrapper = styled(({ innerPadding, relative, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 0 ${({ innerPadding }) => innerPadding && '2rem'};
  width: 100%;
  background: #fff;
  ${({ relative }) => relative && `position: relative;`}
`;

const Inner = styled(({ padding, isMobile, fullWidth, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '115.6rem')};
  padding-top: ${({ padding, isMobile }) => (padding ? (isMobile ? '2rem' : '6rem') : '')};
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

export const PageShell: FC<PageShellProps> = ({
  padding = true,
  innerPadding = true,
  children,
  footerMargin = 6,
  fullWidth = false,
  omitFooter = false,
  relative = false,
  tabsMenu = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const [paddingBottom, setPaddingBottom] = useState(false);

  useEffect(() => {
    if (!isTablet && !tabsMenu) return null;
    const footer = document.getElementById('main-footer');

    window.addEventListener('scroll', (e) => {
      if (footer?.offsetTop < window.innerHeight) {
        setPaddingBottom(true);
      }
    });
  }, [isTablet, setPaddingBottom, tabsMenu]);

  return (
    <Wrapper paddingBottom={paddingBottom}>
      <Header />
      <ContentWrapper innerPadding={innerPadding} relative={relative}>
        <Inner padding={padding} fullWidth={fullWidth} isMobile={isMobile}>
          {children}
        </Inner>
      </ContentWrapper>
      {!omitFooter && <Footer marginTop={footerMargin} />}
    </Wrapper>
  );
};
