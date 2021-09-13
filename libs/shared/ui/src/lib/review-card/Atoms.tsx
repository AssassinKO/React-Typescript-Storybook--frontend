import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { SvgIcon } from '../svg-icon';

export const StyledReviewCard = styled(({ bordered, mobile, selectable, ...restProps }) => (
  <div {...restProps} />
))`
  background: #fff;
  padding: 2rem 1.5rem;
  box-shadow: ${({ theme, bordered, mobile }) =>
    bordered && !mobile ? 'none' : theme.config.defaultBoxShadow};
  border: ${({ theme, bordered, mobile }) =>
    bordered && !mobile ? `0.2rem solid ${theme.palette.grey['A200']}` : 'none'};
  position: relative;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.2),
      inset 0 0 0 0.1rem ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Author = styled.div`
  display: flex;
`;

export const RatingBalloon = styled(({ color, size = 'medium', ...restProps }) => (
  <div {...restProps} />
))`
  position: absolute;
  right: -1.5rem;
  top: ${({ size }) => (size === 'big' ? '-2rem' : '-2.5rem')};
  width: ${({ size }) => (size === 'big' ? '6rem' : '5rem')};
  height: ${({ size }) => (size === 'big' ? '6rem' : '5rem')};
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-bottom-left-radius: 0;

  font-size: 2.5rem;
  color: #fff;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const Name = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  text-transform: uppercase;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  padding-right: 3rem;
`;
export const Date = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
`;
export const Title = styled(({ teaser, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  line-height: 2.6rem;
  margin-bottom: 0.5rem;
  ${({ teaser }) =>
    teaser &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  `}
`;
export const Text = styled(({ teaser, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.2rem;
  line-height: 2.1rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 1.5rem;
  ${({ teaser }) =>
    teaser &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  `}
`;

export const Header = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey['A200']};
`;
export const Body = styled(({ mobile, teaser, ...restProps }) => <div {...restProps} />)`
  position: relative;
  padding-top: ${({ mobile }) => (mobile ? '1rem' : '1.5rem')};
  ${({ teaser }) =>
    teaser &&
    `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
  `}
  * {
    z-index: 9;
  }
  display: flex;
  flex-direction: column;
`;

export const ReviewButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 -0.4rem;
  flex-wrap: wrap;
`;

export const IconButtonWrapper = styled(({ active, ...restProps }) => <div {...restProps} />)`
  margin: 0 0.4rem;
`;

export const NewLabel = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  position: absolute;
  left: -1rem;
  top: -1rem;
  padding: 0.3rem 0.8rem;
  background: ${({ mobile, theme }) => (mobile ? theme.config.gradients.default : '#000')};
  color: #fff;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 800;
  font-size: 1.2rem;
  border-radius: 0.4rem;
`;

export const StyledSvgIcon = styled(({ mobile, ...restProps }) => <SvgIcon {...restProps} />)`
  width: ${({ mobile }) => (mobile ? '6rem' : '8rem')};
  height: ${({ mobile }) => (mobile ? '6rem' : '8rem')};
  transform: rotate(180deg);
  position: absolute;
  z-index: 0;
  right: 0;
  top: ${({ mobile }) => (mobile ? '4rem' : '5rem')};
`;

export const ProConChipWrapper = styled(({ mobile, size = 'medium', ...restProps }) => (
  <div {...restProps} />
))`
  margin: ${({ mobile, size }) => (mobile || size === 'small' ? '0 -0.3rem' : '0 -0.5rem')};
  display: flex;
  flex-wrap: wrap;
`;
