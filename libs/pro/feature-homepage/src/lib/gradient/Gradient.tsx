import React, { FC } from 'react';
import styled from 'styled-components';

type GradientProps = {
  mobile?: boolean;
};

const TopWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`;

const Inner = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -2;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 150%;
    background: ${({ theme }) => theme.config.gradients.default};
    z-index: -1;
  }
  &:after {
    content: '';
    transform: rotate(-5deg);
    position: absolute;
    width: 150%;
    height: 120%;
    background-color: #fff;
    background-size: 100% auto;
    z-index: -1;
    top: ${({ mobile }) => (mobile ? '43rem' : '54rem')};
    ${({ mobile }) => (mobile ? `right: -10rem;` : `right: 0;`)};
    ${({ mobile }) => (mobile ? `transform-origin: none;` : `transform-origin: top right`)};
  }
`;

export const TopGradient: FC<GradientProps> = ({ mobile = false }) => (
  <TopWrapper>
    <Inner mobile={mobile} />
  </TopWrapper>
);
