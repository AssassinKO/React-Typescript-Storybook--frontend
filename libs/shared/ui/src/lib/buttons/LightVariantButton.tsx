import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import styled from 'styled-components';
import { getPadding } from './buttonHelpers';

export const LightVariantButton = styled(
  ({ withIcon, arrow, size = 'medium', pill, ...restProps }) => (
    <MuiButton size={size} {...restProps} />
  )
)`
  position: relative;
  background: ${({ theme }) => theme.palette.grey['A200']};
  color: ${({ theme }) => theme.palette.grey['800']};
  border-radius: ${({ theme, size, pill }) =>
    pill
      ? size === 'large'
        ? '2.4rem'
        : size === 'small'
        ? '1rem'
        : '2rem'
      : theme.config.defaultBorderRadius};
  border: none;
  padding: ${({ withIcon, arrow, size }) => getPadding(withIcon, arrow, size)};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.4rem;
  white-space: nowrap;
  text-transform: uppercase;
  &:hover {
    background: ${({ theme }) => theme.palette.grey['A100']};
    color: ${({ theme }) => theme.palette.grey['900']};
  }
  &:disabled {
    background: ${({ theme }) => theme.palette.grey['200']};
    color: ${({ theme }) => theme.palette.grey['500']};
  }
  @media print {
    display: none;
  }
`;
