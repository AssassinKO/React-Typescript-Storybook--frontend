import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

export const TextVariantButton = styled(({ withIcon, arrow, withArrow, color, ...restProps }) => (
  <MuiButton {...restProps} />
))`
  position: relative;
  border: none;
  border-radius: 0;
  padding: ${({ arrow }) =>
    arrow === 'right' ? '0 4rem 0 0' : arrow === 'left' ? '0 0 0 4rem' : '0'};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 500;
  font-size: 1.6rem;
  text-transform: none;
  text-decoration: underline;
  color: ${({ theme, color }) => (color === 'white' ? '#FFF' : theme.palette.grey['800'])};

  &:hover {
    font-weight: ${({ color }) => (color === 'white' ? 700 : 500)};
    text-decoration: underline;
    background: none;
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.grey['500']};
  }
  @media print {
    display: none;
  }
`;
