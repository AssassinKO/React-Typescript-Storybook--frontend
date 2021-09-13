import React from 'react';
import styled from 'styled-components';
import { FormHelperText } from '@material-ui/core';

export const ErrorMessage = styled(({ color = undefined, bold = false, ...restProps }) => (
  <FormHelperText {...restProps} />
))`
  margin-left: 0.5rem;
  color: ${({ color, theme }) => (color ? color : theme.palette.primary.main)};
  font-weight: ${({ bold }) => (bold ? 600 : 300)};
`;
