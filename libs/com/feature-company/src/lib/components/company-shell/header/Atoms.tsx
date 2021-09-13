import React from 'react';
import styled from 'styled-components';
import { Score } from '../score/Score';
import { Button } from '@homeproved/shared/ui';

export const Banner = styled(({ isMobile, isTablet, banner, ...restProps }) => (
  <div {...restProps} />
))`
  height: ${({ isMobile }) => (isMobile ? '16rem' : '35rem')};
  background-image: ${({ banner }) => banner && `url('${banner}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${({ isTablet, theme }) => !isTablet && theme.config.defaultBorderRadius};
  position: relative;
  margin: ${({ isMobile, isTablet }) =>
    isMobile ? '-2rem -2rem 2rem' : isTablet ? '-6rem -2rem 2rem' : ''};
  image-rendering: -webkit-optimize-contrast;

  ${({ isTablet }) =>
    !isTablet &&
    `
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 12.5rem;
      bottom: 0;
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
      opacity: 0.6;
    }
  `};
`;

export const BannerFree = styled(({ isMobile, isTablet, banner, ...restProps }) => (
  <div {...restProps} />
))`
  height: 15rem;
  position: relative;
  background: ${({ theme, isTablet }) => isTablet && theme.palette.grey['A200']};
  margin: ${({ isMobile, isTablet }) =>
    isMobile ? '-2rem -2rem 2rem' : isTablet ? '-6rem -2rem 2rem' : '0 0 2rem'};

  ${({ isTablet, banner, theme }) =>
    !banner &&
    !isTablet &&
    `
    &:after {
      content: '';
      background: ${isTablet ? theme.config.gradients.default : theme.palette.grey['100']};
      height: ${isTablet ? '6.6rem' : '11rem'};
      top: 50%;
      left: ${isTablet ? '-2rem' : '0'};
      right: ${isTablet ? '-2rem' : '0'};
      margin-top: ${isTablet ? '-3.3rem' : '-5.5rem'};
      position: absolute;
    }
  `};
`;

export const Content = styled(({ isMobile, banner, ...restProps }) => <div {...restProps} />)`
  display: flex;
  align-items: ${({ banner }) => (banner ? 'flex-end' : 'center')};
  position: absolute;
  z-index: 1;
  top: 0;
  right: ${({ isMobile }) => isMobile && '2rem'};
  bottom: ${({ isMobile, banner }) => (banner ? (isMobile ? '2rem' : '3rem') : '0')};
  left: ${({ isMobile }) => (isMobile ? '2rem' : '3rem')};
`;

export const Logo = styled(({ isMobile, isTablet, banner, ...restProps }) => (
  <div {...restProps} />
))`
  width: ${({ isTablet }) => (isTablet ? '12rem' : '14rem')};
  height: ${({ isTablet }) => (isTablet ? '12rem' : '14rem')};
  margin: ${({ isTablet }) => (isTablet ? '0 auto 2rem' : '0 3rem 0 0')};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  position: relative;
  z-index: 1;
`;

export const ImageWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  z-index: 2;
  background-color: #fff;
  // padding: ${({ isMobile }) => (isMobile ? '1rem' : '2rem')};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};

  img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
`;

export const Title = styled(({ isTablet, banner, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isTablet }) => (isTablet ? '1.8rem' : '2.7rem')};
  font-weight: 700;
  color: ${({ isTablet, banner }) => (isTablet || !banner ? '' : '#fff')};
  margin-right: ${({ isTablet }) => !isTablet && '3rem'};
  margin-bottom: ${({ isTablet }) => isTablet && '2rem'};
`;

export const MobileTitle = styled(({ banner, isMobile, isTablet, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  align-items: center;
  margin-bottom: ${({ banner }) => (banner ? '2rem' : '0')};
  justify-content: space-between;
  margin: ${({ isMobile, isTablet }) => isTablet && !isMobile && '-3rem 0 2rem'};
`;

export const StyledA = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

export const MobileHeader = styled(({ claimed, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  margin-top: ${({ claimed }) => (claimed ? '-8rem' : '-15rem')};
`;

export const MobileHeaderClaim = styled(Button)`
  margin-bottom: 2rem;
`;

export const Claimed = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.4rem;
  background: ${({ theme }) => theme.config.ratings.green};
  border-radius: 50%;
  position: absolute;
  top: -1.25rem;
  right: ${({ isMobile }) => !isMobile && '-1.25rem'};
  left: ${({ isMobile }) => isMobile && '-1.25rem'};
  z-index: 9;
  text-align: center;
`;

export const MobileScore = styled(Score)`
  margin: 2rem auto;
`;

export const DesktopScore = styled(({ banner, ...restProps }) => <Score {...restProps} />)`
  position: absolute;
  right: 3rem;
  bottom: ${({ banner }) => (banner ? '-3rem' : '0.5rem')};
  z-index: 2;
`;

export const MobileLocation = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 100%;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const MobileCity = styled.div`
  margin-left: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: calc(50vw - 12rem); // 12rem = logo width
`;
