import React, { FC } from 'react';
import styled from 'styled-components';
import { Bounce, Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';

const StyledHomepageTools = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.grey['A200']};
  margin-top: 4rem;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ mobile }) => (mobile ? '0 100vw 8vw 0' : '8vw 100vw 0 0')};
    border-color: ${({ mobile }) =>
      mobile
        ? 'transparent #fff transparent transparent'
        : '#fff transparent transparent transparent'};
  }
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 8vw 100vw;
    border-color: transparent transparent #fff transparent;
  }
`;

const StyledHomepageToolsInner = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => !isMobile && 'flex'};
  padding: ${({ isMobile }) => isMobile && '6rem 2rem'};
`;

const Image = styled.img`
  width: 100%;
  max-width: 31rem;
  display: table;
  margin: auto;
`;

const Text = styled.div`
  max-width: 47.5rem;
  margin: 2rem;
  padding-top: 5rem;
  position: relative;
`;

const StyledHomepageToolsHeader = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: 3rem;
  font-weight: 900;
  text-align: ${({ isMobile }) => isMobile && 'center'};
`;

const StyledHomepageToolsSubHeader = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: ${({ isMobile }) => isMobile && 'center'};
`;

const StyledHomepageToolsText = styled.div`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Arrow = styled(({ isMobile, ...restProps }) => <SvgIcon {...restProps} />)`
  z-index: 2;
  margin-bottom: 4rem;
`;

const StyledButton = styled(({ isMobile, ...restProps }) => <Button {...restProps} />)`
  margin: ${({ isMobile }) => (isMobile ? '2rem auto 0' : '5rem 0 0')};
  position: relative;
  display: ${({ isMobile }) => isMobile && 'table'};

  &:after {
    ${({ isMobile }) => (isMobile ? `content: none;` : `content: '';`)};
    display: block;
    height: 24.5rem;
    width: 9.7rem;
    background: url('stairs.png') no-repeat;
    position: absolute;
    z-index: 2;
    top: 2rem;
    right: 14.5rem;
  }
`;

const Clouds = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  width: 14.4rem;
  height: 10.6rem;
  position: absolute;
  background: url('/clouds.png') no-repeat;
  top: ${({ isMobile }) => (isMobile ? '0' : '-10rem')};
  ${({ isMobile }) =>
    isMobile
      ? `
    left: 25%;
  `
      : `
    right: -5rem;`}
`;

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  margin: ${({ mobile }) => (mobile ? '0 auto' : '6rem auto 4rem')};
  position: relative;
  z-index: 2;
`;

export const HomepageTools: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return (
    <StyledHomepageTools mobile={isMobile}>
      <Wrapper mobile={isMobile}>
        <Clouds isMobile={isMobile} />
        <StyledHomepageToolsInner isMobile={isMobile}>
          <Text>
            <StyledHomepageToolsHeader isMobile={isMobile}>
              {t('app.pro.pages.landing.tools.header')}
            </StyledHomepageToolsHeader>
            <StyledHomepageToolsSubHeader isMobile={isMobile}>
              {t('app.pro.pages.landing.tools.subheader')}
            </StyledHomepageToolsSubHeader>
            <StyledHomepageToolsText>
              {t('app.pro.pages.landing.tools.text')}
            </StyledHomepageToolsText>
            {!isMobile && (
              <StyledButton variant="gradient" isMobile={isMobile}>
                {t('app.pro.pages.landing.tools.button')}
              </StyledButton>
            )}
          </Text>
          <Image src="/img_polaroid-ingoedebanen.png" alt="" loading="lazy" />
          {isMobile && (
            <StyledButton variant="gradient" isMobile={isMobile}>
              {t('app.pro.pages.landing.tools.button')}
            </StyledButton>
          )}
        </StyledHomepageToolsInner>
      </Wrapper>
      <Bounce translateY={2}>
        <Arrow icon={Icons.DOUBLE_ANGLE_DOWN} size={3} color={'#fff'} isMobile={isMobile} />
      </Bounce>
    </StyledHomepageTools>
  );
};
