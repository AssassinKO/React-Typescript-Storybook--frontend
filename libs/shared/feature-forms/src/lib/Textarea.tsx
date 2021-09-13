import React from 'react';
import styled from 'styled-components';
import { TextareaAutosize, TextareaAutosizeProps } from '@material-ui/core';
import { baseInputStyle } from './styling';

export const Textarea = styled(
  React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
    ({ rowsMin = 5, ...restProps }, ref) => (
      <TextareaAutosize rowsMin={rowsMin} {...restProps} ref={ref} />
    )
  )
)`
  ${baseInputStyle};
  resize: vertical;
  font-size: 1.4rem;
`;
