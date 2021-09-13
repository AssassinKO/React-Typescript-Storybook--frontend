import React, { FC } from 'react';
import styled from 'styled-components';
import { Chip as MuiChip } from '@material-ui/core';

type ChipSize = 'normal' | 'large';

export type ChipProps = {
  label: string;
  size?: ChipSize;
  className?: string;
};

const StyledChip = styled(({ size, ...restProps }) => <MuiChip {...restProps} />)`
  display: inline-flex;
  height: auto;
  font-weight: 600;
  font-size: ${({ size }) => (size === 'large' ? '1.5rem' : '1.2rem')};
  ${({ theme }) => `
    font-family: ${theme.config.fonts.PTSans};
    background: ${theme.palette.grey['A200']};
    color: ${theme.palette.text.primary};
    border-radius: ${theme.config.defaultBorderRadius};
  `}
  .MuiChip-label {
    padding: ${({ size }) => (size === 'large' ? '0.6rem' : '0.3rem 0.6rem')};
  }
`;

export const Chip: FC<ChipProps> = ({ label, size = 'normal', className }) => (
  <StyledChip className={className} label={label} size={size} />
);
