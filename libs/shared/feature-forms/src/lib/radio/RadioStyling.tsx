import styled from 'styled-components';
import { FormControlLabel, Radio } from '@material-ui/core';
import React from 'react';

const RADIO_SIZE = 1.8;

export const RadioFormControlLabel = styled(
  ({ labelColor, labelWeight, labelSize, ...restProps }) => <FormControlLabel {...restProps} />
)`
  margin-left: -0.9rem;

  .MuiFormControlLabel-label {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    color: ${({ labelColor }) => labelColor};
    font-weight: ${({ labelWeight }) => labelWeight};
    font-size: ${({ labelSize }) => `${labelSize}rem`};
  }
`;

export const StyledRadio = styled(({ height, ...restProps }) => <Radio {...restProps} />)`
  position: relative;
  width: 4rem;
  min-width: 0;
  height: ${({ height }) => `${height}rem`};
  min-height: 0;
  border-radius: 100%;
  flex-shrink: 0;
  font-size: 1.4rem;

  &.Mui-disabled {
    opacity: 0.25;
  }
`;

export const StyledUnCheckedIcon = styled(({ omitBorder, ...restProps }) => <div {...restProps} />)`
  position: relative;
  display: block;
  width: ${RADIO_SIZE}rem;
  height: ${RADIO_SIZE}rem;
  border: ${({ omitBorder, theme }) =>
    omitBorder ? '.1rem solid #fff' : `.1rem solid ${theme.palette.grey['500']}`};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  background: #fff;
`;

export const StyledCheckedIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  display: block;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.grey['800']};
  border-radius: 50%;
`;

export const Opacity50Wrapper = styled.span`
  opacity: 0.5;
`;
