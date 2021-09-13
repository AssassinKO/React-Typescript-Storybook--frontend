import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@homeproved/shared/ui';

export const Wrapper = styled(({ cover, isMobile, isTablet, ...restProps }) => (
  <div {...restProps} />
))`
  flex: ${({ cover, isTablet }) => (cover ? '0 0 100%' : isTablet ? '0 0 50%' : '0 0 33.33%')};
  padding: 1rem;
  height: ${({ cover }) => (cover ? '18rem' : '13rem')};
  min-width: ${({ isMobile }) => !isMobile && '11rem'};
  max-width: ${({ cover }) => !cover && '15rem'};
  position: relative;
`;

export const InputWrapper = styled.div`
  height: 100%;

  &:focus {
    outline: 0;
  }
`;

export const LabelWrapper = styled(({ file, ...restProps }) => <div {...restProps} />)`
  border: ${({ file, theme }) => (file ? '' : `0.2rem dashed ${theme.palette.grey['400']}`)};
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.1s ease-in-out;
  background-image: ${({ file }) => (file == null ? 'none' : `url(${file})`)};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;

  &:hover {
    border-color: ${({ theme }) => theme.palette.grey['700']};
  }
  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  ${InputWrapper}:focus & {
    border-color: ${({ theme }) => theme.palette.grey['700']};
  }
`;

export const LabelText = styled(({ cover, ...restProps }) => <span {...restProps} />)`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.grey['800']};
  display: ${({ cover }) => (cover ? 'flex' : 'inline')};
  align-items: center;
  sup {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.4rem;
  }

  &:before {
    content: '+';
    color: #fff;
    background: ${({ theme }) => theme.config.gradients.default};
    margin: 0.5rem;
    border-radius: 50%;
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Delete = styled(IconButton)`
  width: 2.2rem;
  height: 2.2rem;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  cursor: pointer;
  z-index: 9;
`;
