import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, useTheme } from '@material-ui/core';

type LogoIconProps = {
  color?: 'gradient' | 'dark' | 'white';
  size?: number;
  onClick?: () => void;
  className?: string;
};

const StyledSvgIcon = styled(({ size, ...restProps }) => <SvgIcon {...restProps} />)`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
`;

export const LogoIcon: FC<LogoIconProps> = ({ color = 'white', size = 4, onClick, className }) => {
  const theme = useTheme();
  const path =
    'M98.4 33C98.1 14.7 82.9.1 64.6.5 57.5.6 50.6 3 45 7.4l-8.3-6.3c-2-1.5-4.8-1.5-6.7 0L2.1 23C.8 24 0 25.6 0 27.3v33.9c0 3.1 2.5 5.5 5.5 5.5h47.2c-5.9-2.2-11.1-6-14.9-11H11.1V30l22.3-17.5 4 3 8.8 6.8 9.4 7.1v22c1.1.6 2.3 1 3.5 1.4 2.5.7 5.1 1 7.6 1v-27c0-1.7-.8-3.4-2.2-4.4l-10.3-7.8c10.6-6 24.1-2.3 30.1 8.3 1.9 3.3 2.9 7.1 2.9 10.9v.5l-.6 21.6h-20C59 55.8 54.5 53 54.5 53c-10.2-5.7-14.3-18.3-9.1-28.9l-8.9-6.8c-4.3 7.5-5.5 16.5-3.3 24.9 2.1 7.8 7 14.7 13.7 19.3 0 0 6.5 4.4 13.5 5.2.7.1 1.5.2 2.3.2.8.1 1.7.1 2.5 0h26.9c3 0 5.5-2.4 5.6-5.4l.8-27.7c0-.3 0-.5-.1-.8z';

  return (
    <StyledSvgIcon viewBox="0 0 98.5 67" size={size} onClick={onClick} className={className}>
      {color === 'gradient' ? (
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
          <path fill="url(#gradient)" d={path} />
        </>
      ) : (
        <path fill={color === 'white' ? '#FFF' : theme.palette.grey[800]} d={path} />
      )}
    </StyledSvgIcon>
  );
};
