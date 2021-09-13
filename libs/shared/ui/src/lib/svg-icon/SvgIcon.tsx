import React, { FC } from 'react';
import { SvgIcon as MuiSvgIcon, Theme, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { Icons } from './Icons';

type IconColor = 'gradient' | string;

export type SvgIconProps = {
  icon: Icons;
  color?: IconColor;
  size?: number;
  mirrored?: boolean;
};

export const StyledSvgIcon = styled(({ size, mirrored, ...other }) => <MuiSvgIcon {...other} />)`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  transform: ${({ mirrored }) => (mirrored ? 'scale(-1,1)' : 'none')};
`;

export const SvgIcon: FC<SvgIconProps> = ({ icon, color, size = 4, mirrored, ...other }) => {
  const theme: Theme = useTheme();
  const iconColor = color || theme.palette.grey['800'];

  return (
    <StyledSvgIcon viewBox="0 0 40 40" size={size} mirrored={mirrored} {...other}>
      {iconColor === 'gradient' ? (
        <>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: theme.palette.primary.main, stopOpacity: 1 }} />
              <stop
                offset="100%"
                style={{ stopColor: theme.palette.secondary.main, stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path fill="url(#gradient)" d={icon} />
        </>
      ) : (
        <path fill={iconColor} d={icon} />
      )}
    </StyledSvgIcon>
  );
};
