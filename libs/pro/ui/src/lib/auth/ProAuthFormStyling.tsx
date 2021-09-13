import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormLabel } from '@material-ui/core';
import { SvgIcon } from '@homeproved/shared/ui';

export const FormWrapper = styled.div`
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #fff;
`;

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 1.5rem;
`;

export const Label = styled(FormLabel)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

export const Intro = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.5rem;
  color: #fff;
  margin: 2rem 0 3rem 0;
`;

export const StyledButtonGroup = styled(({ horizontal, ...restProps }) => <div {...restProps} />)`
  display: flex;
  ${({ horizontal }) =>
    horizontal
      ? `
    flex-direction: row;
    justify-content: space-between;
  `
      : `
    flex-direction: column;
    align-items: flex-start
  `}
`;

export const BackToProLink = styled.a`
  position: relative;
  display: inline-block;
  padding-right: 4rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const BackLinkLabel = styled.span`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
`;

export const BackLinkIcon = styled(SvgIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const LoginLink = styled.a`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.5rem;
  margin: 1rem 0;
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #fff;
  }
  &:hover {
    font-weight: 700;
  }
`;
