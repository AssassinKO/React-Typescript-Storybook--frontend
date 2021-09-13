import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

/*
 * START Styles for CompanySearchPage
 */
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

export const ContentWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  max-width: 115.6rem;
  padding-top: ${({ mobile }) => (mobile ? '2rem' : '4rem')};
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
`;
export const FacetTitle = styled(({ size, mobile, ...restProps }) => <Typography {...restProps} />)`
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
  font-size: ${({ size }) => (size === 'large' ? '18px' : '16px')};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  line-height: 1;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;
export const SearchWrapper = styled.div`
  max-width: 50rem;
  margin: auto;
  padding: 0 0 6rem;
`;

export const Separator = styled.div`
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};
`;

export const Sidebar = styled(({ mobile, offCanvasOpen, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  width: 30rem;
  height: 100vh;
  background: #fff;
  padding: 1.2rem 1.5rem;
  transition: left 0.25s ease-in-out;
  overflow: scroll;
  ${({ mobile, offCanvasOpen }) =>
    mobile &&
    `
    position: fixed;
    top: 0;
    left: ${offCanvasOpen ? 0 : '-30rem'};
    z-index: 99;
  `}
`;

/*
 * END Styles for CompanySearchPage
 */
