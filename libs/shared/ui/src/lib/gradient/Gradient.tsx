import React, { FC } from 'react';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';

type GradientProps = {
  isMobile?: boolean;
};

const Top = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  width: 120rem;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;

  &:before {
    content: '';
    background: ${({ theme }) => theme.config.gradients.default};
    position: absolute;
    top: 0;
    right: calc((-100vw + 118.5rem) / 2);
    bottom: 0;
    left: -30rem;
    margin: auto;
  }
  &:after {
    content: '';
    border-top: 118rem solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 260rem solid #fff;
    position: absolute;
    top: 0;
    right: -110rem;
    bottom: 0;
  }
`;

const Bottom = styled(({ isFooterDesktop, ...restProps }) => <div {...restProps} />)`
  width: 120rem;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;

  &:before {
    content: '';
    background: ${({ theme }) => theme.config.gradients.default};
    position: absolute;
    margin: auto;
    top: 0;
    right: -12rem;
    bottom: 0;
    ${({ isFooterDesktop }) =>
      !isFooterDesktop ? `left: calc((-100vw + 118.5rem) / 2);` : `left: 0;`};
  }
  &:after {
    content: '';
    border-top: 0 solid transparent;
    border-bottom: 120rem solid transparent;
    border-right: 255rem solid #fff;
    position: absolute;
    top: 0;
    ${({ isFooterDesktop }) => (!isFooterDesktop ? `right: -60rem;` : `right: -95rem;`)};
    bottom: 0;
  }
`;

export const TopGradient: FC<GradientProps> = ({ isMobile = false }) => <Top isMobile={isMobile} />;
export const BottomGradient: FC<GradientProps> = ({ isMobile = false }) => {
  const theme = useTheme();
  const isFooterDesktop = useMediaQuery(theme.breakpoints.down(1185));
  return <Bottom isFooterDesktop={isFooterDesktop} />;
};
