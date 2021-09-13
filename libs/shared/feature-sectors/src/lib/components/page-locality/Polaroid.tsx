import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

type PolaroidProps = {
  tablet?: boolean;
  locality: string;
  mobile?: boolean;
};

const Wrapper = styled(({ tablet, mobile, ...restProps }) => <div {...restProps} />)`
  max-width: ${({ tablet }) => (tablet || tablet ? '30rem' : '33rem')};
  margin-top: ${({ tablet }) => tablet && '-2rem'};
  padding-right: 1rem;
  padding-left: 1rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  transform: rotate(-4deg);

  img {
    width: 100%;
    height: auto;
  }
`;

const LocalityInner = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 0.4rem;
  padding: 1rem 2rem;
`;
const Locality = styled(Typography)`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.8rem;
`;
const Dot = styled.span`
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[600]};

  &:nth-of-type(1) {
    left: 0.5rem;
    top: 0.3rem;
  }
  &:nth-of-type(2) {
    right: 0.5rem;
    top: 0.3rem;
  }
  &:nth-of-type(3) {
    left: 0.5rem;
    bottom: 0.3rem;
  }
  &:nth-of-type(4) {
    right: 0.5rem;
    bottom: 0.3rem;
  }
`;

const LocalityContainer = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  bottom: ${({ mobile }) => (mobile ? '7rem' : '6rem')};
  left: 50%;
  transform: translateX(-50%) rotate(-4deg);
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  ${({ mobile }) =>
    mobile &&
    `
    ${LocalityInner}{
      padding: 0.5rem 1rem;
      ${Locality}{
        font-size: 1.4rem;
      }
    }
    ${Dot}{
      width: 0.15rem;
      height: 0.15rem;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.grey[600]};

      &:nth-of-type(1) {
        left: 0.25rem;
        top: 0.15rem;
      }
      &:nth-of-type(2) {
        right: 0.25rem;
        top: 0.15rem;
      }
      &:nth-of-type(3) {
        left: 0.25rem;
        bottom: 0.15rem;
      }
      &:nth-of-type(4) {
        right: 0.25rem;
        bottom: 0.15rem;
      }
    }
  `}
`;

const ImageApproved = styled.img`
  width: 8rem !important;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const Polaroid: FC<PolaroidProps> = ({ tablet = false, mobile = false, locality }) => {
  return (
    <Wrapper tablet={tablet} mobile={mobile}>
      <img src="/homeproved-top-rating-green.png" alt="" loading="lazy" />
      <LocalityContainer mobile={mobile}>
        <LocalityInner>
          <Locality variant="body1">{locality}</Locality>
        </LocalityInner>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </LocalityContainer>
      {mobile && <ImageApproved src="/approved2.png" alt="" loading="lazy" />}
    </Wrapper>
  );
};
