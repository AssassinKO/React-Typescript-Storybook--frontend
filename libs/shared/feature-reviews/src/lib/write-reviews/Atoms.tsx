import styled from 'styled-components';
import React from 'react';
import { Typography } from '@material-ui/core';

export const Header = styled(({ ...restProps }) => <header {...restProps} />)`
  padding: 0 2rem;
  background: ${({ theme }) => theme.config.gradients.default};
`;

export const SearchTitle = styled(({ mobile, ...restProps }) => <header {...restProps} />)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: 1.8rem;
  margin-bottom: ${({ mobile }) => (mobile ? '1rem' : '2rem')};
  color: #fff;
  text-align: center;
`;

export const SearchWrapper = styled.div`
  max-width: 50rem;
  margin: auto;
  padding: 0 0 6rem;
`;

export const ContentWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  max-width: 90rem;
  padding: ${({ mobile }) => `${mobile ? '2rem' : '4rem'} 2rem 0 2rem`};
  margin: 0 auto;
`;

export const FacetTitle = styled(({ size, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ size }) => (size === 'large' ? '18px' : '16px')};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  line-height: 1;
  margin-bottom: 1rem;
`;

export const ResultsHeader = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ mobile }) => (mobile ? 'block' : 'flex')};
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const NotFoundWrapper = styled.div`
  margin: 6rem auto 4rem auto;
  text-align: center;
`;
