import styled from 'styled-components';
import { Button } from '@homeproved/shared/ui';
import React from 'react';

export const Wrapper = styled(({ gradient, amount, isMobile, ...restProps }) => (
  <div {...restProps} />
))`
  background: ${({ gradient, theme }) => (gradient ? theme.config.gradients.rotated : '#fff')};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: ${({ isMobile, amount }) =>
    isMobile ? '3rem 1rem' : amount === 0 ? '5.5rem 2rem 8rem' : '2rem 2rem 8rem'};
  text-align: center;
  flex: 0 0 100%;
  min-width: ${({ isMobile }) => !isMobile && '18.5rem'};
  position: relative;
  margin: 1rem;
  color: ${({ gradient }) => gradient && '#fff'};

  @media screen and (min-width: 360px) {
    flex: 0 0 calc(50% - 2rem);
  }
  @media screen and (min-width: 950px) and (max-width: 1039px) {
    flex: 0 0 calc(25% - 2rem);
  }
  @media screen and (min-width: 1250px) {
    flex: 0 0 calc(25% - 2rem);
  }
  ${({ isMobile }) =>
    isMobile &&
    `
    display: flex;
    flex-direction: column;

    img {
      order: -1;
      align-self: center;
    }
  `};
`;

export const Label = styled(({ marginBottom, isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1.2rem')};
  font-weight: 900;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '4rem' : '2rem')};

  ${({ isMobile }) =>
    isMobile &&
    `
    margin: 2rem 0 0;
    text-transform: none;
    font-family: inherit;
  `};
`;

export const LabelCabrito = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1.2rem')};
  font-weight: 900;
  letter-spacing: 0.1rem;
  margin: 1.5rem auto 0.5rem;
`;

export const Text = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const NoResultTitle = styled.div`
  font-size: 3rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  letter-spacing: 0.1rem;
  margin: 0 0 2rem;
`;

export const NoResultLabel = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1.2rem')};
  font-weight: 900;
  letter-spacing: 0.1rem;
  margin: 1rem 0;
`;

export const Amount = styled.div`
  font-weight: 900;
  font-size: 3rem;
  margin: 1rem 0;
`;

export const Total = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;

export const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const StyledButton = styled(Button)`
  font-size: 1.1rem;
  border-radius: 3rem;
  padding-right: 3rem;
  padding-left: 2rem;
`;

export const StyledA = styled.a`
  color: inherit;
  text-decoration: underline;
  margin-left: 0.4rem;

  &:hover,
  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
