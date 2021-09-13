import React from 'react';
import styled from 'styled-components';
import { FormGroup as MuiFormGroup } from '@material-ui/core';

export const FormGroup = styled(({ horizontal = false, noMargin = false, ...restProps }) => (
  <MuiFormGroup {...restProps} />
))`
  position: relative;
  margin-bottom: ${({ noMargin }) => !noMargin && '1.5rem'};
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  justify-content: space-between;
  flex-wrap: nowrap;

  ${({ horizontal }) =>
    horizontal &&
    `
  & > * {
    flex-grow: 1;
  }

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
  `};
`;
