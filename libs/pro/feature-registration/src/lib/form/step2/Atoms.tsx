import React from 'react';
import styled from 'styled-components';
import { Input } from '@homeproved/shared/feature-forms';
import { Button } from '@homeproved/shared/ui';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto 3rem auto;
`;

export const Section = styled.div`
  flex: 1;
  padding: 0 5rem;
  text-align: center;

  &:last-child:not(:first-child) {
    border-left: 0.1rem solid ${({ theme }) => theme.palette.grey['800']};
  }
`;

export const Description = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export const VerificationLabel = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 1rem 0 0.5rem 0;
`;

export const VerificationCodeInput = styled(Input)`
  text-align: center;
  max-width: 20rem;
`;

export const VerificationCodeInputGroup = styled.div`
  margin: 2rem 0;
`;

export const SendAgainButton = styled(Button)`
  margin-bottom: 2rem;

  &:hover {
    font-weight: 700;
  }
`;

export const SendAgainConfirmation = styled.div`
  margin: -1rem 0 2rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 1rem;
  }
`;

export const ContactStatement = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.5rem;
  text-align: center;
`;

export const FormSectionsWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  justify-content: space-evenly;
  max-width: 60rem;
  margin: ${({ isMobile }) => (isMobile ? '0 0 3rem 0' : '0 auto 5rem auto')};
`;

export const IconsWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  & > svg:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const ButtonWrapper = styled.div``;
