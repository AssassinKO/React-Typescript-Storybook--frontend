import { Button, Chip, SvgIcon } from '@homeproved/shared/ui';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

/*
 * START Styles for CompanySearchCard
 */
export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 0 -0.5rem;
`;

export const Company = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StarsContainer = styled.div`
  order: 1;
`;

export const RatingWrapper = styled(Box)`
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};
  margin-bottom: 2rem;
  min-height: 10rem;
`;

export const RatingExtra = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;
export const Reviews = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  order: 2;
`;
export const Title = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  margin-bottom: 2rem;
`;
export const SearchSectionTitle = styled(({ mobile, ...restProps }) => (
  <Typography {...restProps} />
))`
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '2.4rem')};
  margin-bottom: 1rem;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

export const Logo = styled(({ image, ...restProps }) => <div {...restProps} />)`
  width: 7.6rem;
  height: 7.6rem;
  padding: 1rem;
  border-radius: 50%;
  border: 0.1rem solid #d0d0d0;
  position: absolute;
  right: 0;
  z-index: 9;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
    background: ${({ image }) => (image != null ? `url(${image}) center no-repeat` : '')};
    background-size: contain;
  }
`;

export const LocationTag = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  font-size: 1.4rem;
  font-weight: ${({ mobile }) => (mobile ? 300 : 600)};
  text-transform: ${({ mobile }) => (mobile ? 'capitalize' : 'uppercase')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  align-self: flex-end;
  margin-left: 0.5rem;
  margin-bottom: ${({ mobile }) => (mobile ? 0 : '0.7rem')};
`;

export const StyledChip = styled(Chip)`
  margin: 0.5rem;
`;

export const FlagValidated = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 6rem;
  height: 6rem;
  background: ${({ theme }) => theme.config.gradients.rotated};
  z-index: 0;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6rem 0 0 6rem;
    border-color: transparent transparent transparent #fff;
  }
`;

export const IconOuter = styled.div`
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCheckmarkOutlineIcon = styled(SvgIcon)`
  svg,
  path {
    fill: #fff;
  }
`;

export const TextButton = styled(Button)`
  color: #000;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: pt-sans, Arial, sans-serif;
  align-self: center;
  cursor: pointer;
  text-decoration: underline;
`;

/*
 * END Styles for CompanySearchCard
 */

/*
 * START Styles for SearchSection
 */

export const SearchLabel = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 0.7rem;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

export const SearchTitle = styled(Typography)`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

export const ContentWrapper = styled(({ mobile, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  max-width: 115.6rem;
  padding-top: ${({ mobile }) => (mobile ? '2rem' : '4rem')};
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
`;

export const SearchWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  max-width: 50rem;
  width: ${({ mobile }) => (mobile ? '100%' : '40rem')};
  margin: ${({ mobile }) => (mobile ? 'auto' : 0)};
`;

/*
 * END Styles for SearchSection
 */
