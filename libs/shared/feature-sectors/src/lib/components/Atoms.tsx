import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

/*
 * Start Subsector page
 */

export const Title = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '2.4rem')};
  margin-bottom: 1rem;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

export const Intro = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${({ mobile }) => (mobile ? '4rem 3rem 3rem' : '4rem')};
  width: ${({ mobile }) => (mobile ? 'calc(100% - 6rem)' : '60rem')};
  margin: ${({ mobile }) => (mobile ? '-13rem 3rem 0' : 0)};
`;

export const IntroText = styled(Typography)`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const Header = styled(({ mobile, bgImage, ...restProps }) => <header {...restProps} />)`
  width: 100%;
  height: ${({ mobile }) => (mobile ? '25rem' : 'auto')};
  background: ${({ bgImage }) => (bgImage ? `url(${bgImage}) center center no-repeat` : 'none')};
  background-size: cover;
  padding: 4rem;
`;

/*
 * End Subsector page
 */

/*
 * Start Article Section
 */

export const ArticleSectionWrapper = styled(({ mobile, ...restProps }) => (
  <section {...restProps} />
))`
  padding: ${({ mobile }) => (mobile ? '2rem 0 4rem' : '3rem 0 5rem')};
`;

export const ButtonWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'center' : 'flex-end')};
`;

export const ArticleOuter = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  border: 2px solid ${({ theme }) => theme.palette.grey['A200']};
  border-radius: 0.5rem;
  padding: 1rem 1rem 2rem;
  max-width: ${({ mobile }) => (mobile ? '40rem' : '100%')};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  cursor: pointer;
  img {
    transition: all 0.3s ease;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export const ArticleBox = styled(({ mobile, ...restProps }) => <Box {...restProps} />)`
  margin-top: ${({ mobile }) => (mobile ? '3rem' : 0)};
  margin-bottom: 1rem;
`;

export const ArticleTag = styled(Typography)`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  letter-spacing: 0.05rem;
  margin-bottom: 1.5rem;
  &:after {
    content: '';
    display: block;
    width: 7rem;
    height: 0.4rem;
    background: ${({ theme }) => theme.config.gradients.default};
    margin-top: 0.5rem;
  }
`;

export const ArticleSpoiler = styled(Typography)`
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: #000;
`;

/*
 * End Article Section
 */
