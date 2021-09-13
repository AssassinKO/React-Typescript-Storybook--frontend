import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled(({ isTablet, hasReviews, ...restProps }) => <div {...restProps} />)`
  background-color: ${({ theme, hasReviews, isTablet }) =>
    isTablet && !hasReviews ? 'white' : theme.palette.grey['A200']};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: ${({ isTablet }) => (isTablet ? '6rem 3rem 3rem' : '3rem 6rem')};
  margin-top: ${({ isTablet, hasReviews }) => isTablet && hasReviews && '-5rem'};
  margin-left: ${({ isTablet }) => (isTablet ? '-2rem' : 0)};
  margin-right: ${({ isTablet }) => (isTablet ? '-2rem' : 0)};
`;

export const Title = styled(Typography)`
  font-weight: 700;
  margin-right: 2rem;
  span {
    font-weight: 400;
    margin-left: 0.5rem;
  }
`;

export const NoReviews = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  margin-top: ${({ isTablet }) => isTablet && '-6rem'};
`;

export const NoReviewsTitle = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  font-weight: ${({ isTablet }) => !isTablet && '700'};
  font-family: ${({ isTablet, theme }) => isTablet && theme.config.fonts.PTSans};
  margin-bottom: 3rem;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;
