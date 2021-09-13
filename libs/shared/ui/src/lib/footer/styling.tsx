import React from 'react';
import styled from 'styled-components';
import { DEFAULT_WRAPPER_STYLE } from '../default-styles';

export const FooterWrapper = styled(({ transparent, marginTop, isTablet, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ isTablet }) => (isTablet ? '3rem 0' : '7rem 0 6rem 0')};
  background: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.palette.grey['800']};
  position: relative;
  z-index: 1;
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}rem` : '0')};
`;

export const FooterInner = styled(({ center, ...restProps }) => <div {...restProps} />)`
  ${DEFAULT_WRAPPER_STYLE};
  display: flex;
  align-items: flex-start;
  justify-content: ${({ center }) => center && 'center'};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterLinks = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  align-items: ${({ mobile }) => mobile && 'center'};
  margin-bottom: ${({ mobile }) => mobile && '2rem'};

  & > a:not(:last-child) {
    margin-right: ${({ mobile }) => (mobile ? 0 : '2rem')};
  }
`;

export const FooterStyledA = styled.a`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterCopyrightNotice = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  align-items: ${({ mobile }) => mobile && 'center'};
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;

  a {
    color: #fff;
  }

  & > span:not(:last-child) {
    margin-right: 0.5rem;
  }
`;
