import React from 'react';
import styled from 'styled-components';
import { FormGroup, Input } from '@homeproved/shared/feature-forms';
import { Button } from '@homeproved/shared/ui';

export const Form = styled.form`
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

export const Top = styled.div`
  display: flex;
`;

export const Title = styled.div`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const IntroTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 1.3rem;
`;

export const IntroText = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  line-height: 1.75;
`;

export const StyledInput = styled(Input)`
  border-color: ${({ theme }) => theme.palette.grey['A200']};
  max-height: 3rem;
  font-size: 1.2rem;
  margin-bottom: 0;
`;

export const Label = styled.div`
  margin-right: 1rem;
  font-weight: 900;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  flex: 0 0 40%;
`;

export const InfoAndUploads = styled(({ isMobile, isTablet, ...restProps }) => (
  <div {...restProps} />
))`
  display: ${({ isMobile, isTablet }) => (isTablet || isMobile ? 'block' : 'flex')};
  justify-content: space-between;
  margin: 3rem 0;

  > div {
    flex: 1;
    max-width: ${({ isTablet }) => !isTablet && '48%'};
  }
`;

export const InfoItem = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile, isTablet }) => (isTablet || isMobile ? 'block' : 'flex')};
  align-items: center;
  margin-bottom: 2rem;
`;

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;
`;

export const LabelsWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  margin-top: 1rem;
  ${({ isMobile }) => !isMobile && `display: flex;`}
  flex-wrap: wrap;

  > * {
    flex: 0 0 50%;
  }
`;

export const SaveButton = styled(({ mobileSaveButton, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ mobileSaveButton }) => (mobileSaveButton ? '2rem auto 0' : '0 0 0 auto')};
`;
