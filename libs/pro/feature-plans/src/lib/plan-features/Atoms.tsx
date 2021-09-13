import styled from 'styled-components';
import { PlanUid } from '../util/helpers';

export const Wrapper = styled(({ plan, isMobile, ...restProps }) => <div {...restProps} />)`
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: ${({ theme }) => theme.config.gradients.rotated};
  padding: 1rem;
  flex: 1 0;

  ${({ plan, isMobile }) =>
    plan === PlanUid.TEAM &&
    !isMobile &&
    `
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `};
`;

export const ModalHeader = styled(({ isMobile, screenTwo, ...restProps }) => (
  <div {...restProps} />
))`
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;

  ${({ isMobile, screenTwo }) =>
    (isMobile || screenTwo) &&
    `
    flex-direction: column;
    justify-content: center;
    text-align: center;
  `};
`;

export const Circle = styled(({ isMobile, screenTwo, ...restProps }) => <div {...restProps} />)`
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.grey['800']};
  width: 18rem;
  height: 18rem;
  min-width: 18rem;
  min-height: 18rem;
  margin: ${({ isMobile, screenTwo }) => (isMobile || screenTwo ? '0 auto 2rem' : '0 3rem 0 0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.div`
  flex: 1 0;
`;

export const Title = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  font-weight: 900;
  font-size: ${({ mobile }) => (mobile ? '1.4rem' : '1.8rem')};
  margin-bottom: 2rem;
`;

export const Team = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 2.6rem;
  text-transform: uppercase;
  font-weight: 600;
  border-bottom: 0.1rem solid #fff;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
`;

export const Homeproved = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem 0 -0.5rem;
`;

export const Price = styled.div`
  font-size: 2rem;
  font-weight: 900;
`;

export const Small = styled.span`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  font-weight: 400;
`;

export const Features = styled(({ isMobile, screenOne, screenTwo, featureModal, ...restProps }) => (
  <div {...restProps} />
))`
  color: #fff;
  margin: 4rem 0 0;
  display: ${({ isMobile, screenOne, screenTwo }) =>
    !isMobile && !screenOne && !screenTwo && 'flex'};
  flex-wrap: wrap;
  ${({ featureModal }) =>
    featureModal &&
    `
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 1.2rem;
    }
    ::-webkit-scrollbar-track {
      background-color: #ffffff5c;
      border-radius: 2rem;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 2rem;
      border: 0.3rem solid transparent;
      background-clip: content-box;
      background-color: #fff;
    }
    scrollbar-width: thin;
    scrollbar-color: #ffffff #ffffff5c;
  `};
`;
