import styled from 'styled-components';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import React from 'react';

const CHECKBOX_SIZE = 1.8;

export const CheckboxFormControlLabel = styled(
  ({ labelColor, labelWeight, labelSize, labelCapitalized, align, ...restProps }) => (
    <FormControlLabel {...restProps} />
  )
)`
  margin-left: -0.9rem;
  align-items: ${({ align }) => align};

  .MuiFormControlLabel-label {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    color: ${({ labelColor }) => labelColor};
    font-weight: ${({ labelWeight }) => labelWeight};
    font-size: ${({ labelSize }) => `${labelSize}rem`};
    margin-left: -0.5rem;
    text-transform: ${({ labelCapitalized }) => (labelCapitalized ? 'capitalize' : 'inherit')};
  }
`;

export const StyledCheckbox = styled(({ height, variant, ...restProps }) => (
  <Checkbox {...restProps} />
))`
  position: relative;
  width: 4rem;
  min-width: 0;
  height: ${({ height }) => `${height}rem`};
  min-height: 0;
  border-radius: 100%;
  flex-shrink: 0;
  font-size: 1.4rem;
  margin-right: 0.5rem;

  &.Mui-disabled {
    opacity: 0.25;
  }
`;

export const StyledUnCheckedIcon = styled(({ omitBorder, variant, checked, ...restProps }) => (
  <div {...restProps} />
))`
  position: relative;
  display: block;
  width: ${CHECKBOX_SIZE}rem;
  height: ${CHECKBOX_SIZE}rem;
  border: ${({ omitBorder, theme }) =>
    omitBorder ? '.1rem solid #fff' : `.1rem solid ${theme.palette.grey['500']}`};
  border-radius: 0.3rem;
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  background: ${({ theme, variant, checked }) =>
    checked ? (variant === 'dark' ? theme.palette.grey['800'] : '#fff') : '#fff'};
`;

export const StyledCheckedIcon = styled(({ variant, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: -0.1rem;
  left: -0.1rem;
  width: ${CHECKBOX_SIZE}rem;
  height: ${CHECKBOX_SIZE}rem;
  display: block;
  transform: rotate(45deg);
  &:before {
    display: block;
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 0.3rem;
    background-color: ${({ theme, variant }) =>
      variant === 'light' ? theme.palette.grey['800'] : '#fff'};
    left: calc(50% - 0.3rem);
    top: calc(50% + 0.2rem);
  }
  &:after {
    display: block;
    content: '';
    position: absolute;
    width: 0.3rem;
    height: 1.1rem;
    left: 50%;
    top: calc(50% - 0.6rem);
    background-color: ${({ theme, variant }) =>
      variant === 'light' ? theme.palette.grey['800'] : '#fff'};
  }
`;

export const Opacity50Wrapper = styled.span`
  opacity: 0.5;
`;
