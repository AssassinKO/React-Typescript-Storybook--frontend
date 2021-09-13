import styled from 'styled-components';
import React from 'react';
import { Chip } from '../..';

export const Wrapper = styled.div`
  margin: 3rem 0;
  padding: 3rem 0;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    flex-direction: row;
  }
  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.xs + 'px'}) and (max-width: ${({ theme }) =>
      theme.breakpoints.values.sm + 'px'}) {
    flex-wrap: wrap;
  }
`;

export const Company = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  flex: 0 0 60%;
  display: flex;
  flex-direction: ${({ mobile }) => mobile && 'column'};
  align-items: center;
  padding: 0 3rem;
  order: 1;
  margin-bottom: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin-bottom: 0;
    flex: 1;
  }
`;

export const ReviewsText = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  margin: 2rem 0;
  padding: 0 3rem;
  order: 2;
  flex: 1;
  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.xs + 'px'}) and (max-width: ${({ theme }) =>
      theme.breakpoints.values.sm + 'px'}) {
    margin: 2rem 0 0;
    order: 3;
    flex: 0 0 100%;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 0;
    border: solid ${({ theme }) => theme.palette.grey['300']};
    border-width: 0 0.1rem;
    order: 2;
  }
`;

export const Rating = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  margin: ${({ isMobile }) => isMobile && '2rem 0 0'};
  padding: 0 3rem;
  order: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.xs + 'px'}) and (max-width: ${({ theme }) =>
      theme.breakpoints.values.sm + 'px'}) {
    order: 2;
    margin: 0 2rem 0 auto;
    padding: 0;
  }
`;

export const Logo = styled(({ image, mobile, ...restProps }) => <div {...restProps} />)`
  width: 15rem;
  height: 15rem;
  margin: ${({ mobile }) => (mobile ? '0 0 2rem' : '0 3rem 0 0')};
  padding: 2.5rem;
  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
    background: ${({ image }) => (image !== '' ? `url(${image}) center no-repeat` : '')};
    background-size: contain;
  }
`;

export const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-decoration: underline;
  margin-bottom: 1rem;
`;

export const StyledChip = styled(Chip)`
  margin: 0.5rem;
`;

export const StyledA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
`;
