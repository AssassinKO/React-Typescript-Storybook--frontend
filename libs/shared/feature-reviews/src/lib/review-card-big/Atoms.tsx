import { Button, IconButton } from '@homeproved/shared/ui';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const StyledReviewCard = styled(({ mobile, blueBorder, userView, ...restProps }) => (
  <div {...restProps} />
))`
  background: #fff;
  padding: ${({ userView, mobile }) => (mobile && userView ? '2rem 0' : '2rem 3rem')};
  box-shadow: none;
  position: relative;
  border-radius: ${({ mobile }) => (mobile ? 0 : '0.4rem')};
  position: relative;
  border: ${({ blueBorder, mobile, theme }) =>
    !mobile && blueBorder ? `2px solid ${theme.palette.grey['A100']}` : 'none'};
  margin: ${({ mobile, userView }) => (mobile && !userView ? '0 -3rem' : 0)};
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
`;

export const RatingBalloon = styled(({ color, mobile, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  right: 0;
  top: ${({ mobile }) => (mobile ? '-1rem' : '3rem')};
  width: ${({ mobile }) => (mobile ? '6rem' : '8rem')};
  height: ${({ mobile }) => (mobile ? '6rem' : '8rem')};
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-bottom-left-radius: 0;

  font-size: ${({ mobile }) => (mobile ? '2.8rem' : '4rem')};
  color: #fff;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const Name = styled(({ fontSize, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  text-transform: uppercase;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
export const Date = styled(({ fontSize, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;
export const Title = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.6rem' : '1.8rem')};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  line-height: 2.4rem;
  margin-bottom: 0.7rem;
`;
export const Text = styled(({ size = 1.8, lineHeight = 2.1, grey, ...restProps }) => (
  <Typography {...restProps} />
))`
  font-size: ${({ size }) => `${size}rem`};
  line-height: ${({ lineHeight }) => `${lineHeight}rem`};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: ${({ grey }) => (grey ? '#6A6A6A' : '#3A3A3A')};
  span {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 700;
  }
`;

export const ProConChipWrapper = styled.div`
  margin: 0 -0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

export const Header = styled(({ userView, mobile, ...restProps }) => <div {...restProps} />)`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey['A200']};
  display: flex;
  justify-content: space-between;
  align-items: ${({ userView, mobile }) => (userView && mobile ? 'flex-start' : 'center')};
  flex-direction: ${({ userView, mobile }) => (userView && mobile ? 'column' : 'row')};
  position: relative;
`;

export const Activities = styled(({ userView, mobile, ...restProps }) => <div {...restProps} />)`
  max-width: ${({ userView, mobile }) => (userView && mobile ? '100%' : '50%')};
  border-top: ${({ userView, mobile, theme }) =>
    userView && mobile ? `0.1rem solid ${theme.palette.grey['A200']}` : 'none'};
  padding-top: ${({ userView, mobile }) => (userView && mobile ? '1.5rem' : 0)};
  margin-top: ${({ userView, mobile }) => (userView && mobile ? '2rem' : 0)};
  width: ${({ userView, mobile }) => (userView && mobile ? '100%' : 'auto')};
  * {
    text-align: ${({ userView, mobile }) => (userView && mobile ? 'left' : 'right')};
    margin-bottom: 0;
  }
`;

export const Body = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding-top: ${({ mobile }) => (mobile ? '2rem' : '2.5rem')};
  position: relative;
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

export const ReportProblem = styled.div`
  position: absolute;
  width: 23rem;
  right: -26rem;
  bottom: 0;
`;

export const AssessmentPolicyButton = styled(Button)`
  font-size: 1.2rem;
  font-weight: 700;
  padding-left: 3rem;
  svg {
    left: 0;
  }
`;

export const ReportProblemTitle = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const ReviewControlText = styled(Typography)`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  line-height: 1.6rem;
`;
export const StyledIconButton = styled(({ active, ...restProps }) => <IconButton {...restProps} />)`
  width: 4rem;
  height: 4rem;
  border: ${({ active, theme }) => (!active ? `1px solid ${theme.palette.grey['A200']}` : 'none')};
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;
export const StyledTextButton = styled(
  ({ success, blocked = false, separator = false, biggerIcon = false, ...restProps }) => (
    <Button {...restProps} />
  )
)`
  position: relative;
  padding: 0 0 0 4rem;
  text-decoration: none;
  font-weight: ${({ success, blocked }) => (blocked || success ? 800 : 300)};
  margin-left: -1rem;
  display: flex;
  align-items: center;
  svg {
    width: ${({ biggerIcon }) => (biggerIcon ? '2.2rem' : '2rem')};
    height: ${({ biggerIcon }) => (biggerIcon ? '2.2rem' : '2rem')};
    top: ${({ biggerIcon }) => (biggerIcon ? '41%' : '50%')};
  }
  svg,
  path {
    fill: ${({ success, blocked, theme }) =>
      blocked
        ? theme.palette.primary.main
        : success
        ? theme.palette.green.main
        : theme.palette.grey[800]};
  }
  color: ${({ success, blocked, theme }) =>
    blocked
      ? theme.palette.primary.main
      : success
      ? theme.palette.green.main
      : theme.palette.grey[800]};
  ${({ separator, theme }) =>
    separator &&
    `
    &:after{
      content: '';
      display: block;
      position: absolute;
      right: -2rem;
      top: 50%;
      transform: translateY(-50%);
      bottom: 0;
      height: calc(100% - 1.5rem);
      width: 0.1rem;
      background-color: ${theme.palette.grey[800]};
    }
  `}
  ${({ success, blocked }) =>
    (success || blocked) &&
    `
    cursor: default;
    &:hover{
      font-weight: 700;
      text-decoration: none;
    }
  `}
`;

export const ButtonWrapper = styled.div`
  max-width: 25%;
  cursor: pointer;
`;

export const ButtonFlag = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`;
