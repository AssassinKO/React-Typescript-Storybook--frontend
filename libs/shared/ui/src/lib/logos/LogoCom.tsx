import React, { FC } from 'react';
import { SvgIcon, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { LogoProps } from './types';

const Wrapper = styled(({ width, onClick, ...restProps }) => (
  <div onClick={onClick} {...restProps} />
))`
  display: flex;
  align-items: center;
  width: ${({ width }) => width};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const StyledSvgIcon = styled(SvgIcon)`
  width: 100%;
  height: auto;
`;

export const LogoCom: FC<LogoProps> = ({
  fullColor = false,
  width = '100%',
  onClick,
  className,
}) => {
  const theme = useTheme();

  return (
    <Wrapper width={width} onClick={onClick} className={className}>
      <StyledSvgIcon viewBox="0 0 631.9 81.9">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: theme.palette.primary.main, stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: theme.palette.secondary.main, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          fill={fullColor ? 'url(#gradient)' : '#FFF'}
          d="M98.4 33C98.1 14.7 82.9.1 64.6.5 57.5.6 50.6 3 45 7.4l-8.3-6.3c-2-1.5-4.8-1.5-6.7 0L2.1 23C.8 24 0 25.6 0 27.3v33.9c0 3.1 2.5 5.5 5.5 5.5h47.2c-5.9-2.2-11.1-6-14.9-11H11.1V30l22.3-17.5 4 3 8.8 6.8 9.4 7.1v22c1.1.6 2.3 1 3.5 1.4 2.5.7 5.1 1 7.6 1v-27c0-1.7-.8-3.4-2.2-4.4l-10.3-7.8c10.6-6 24.1-2.3 30.1 8.3 1.9 3.3 2.9 7.1 2.9 10.9v.5l-.6 21.6h-20C59 55.8 54.5 53 54.5 53c-10.2-5.7-14.3-18.3-9.1-28.9l-8.9-6.8c-4.3 7.5-5.5 16.5-3.3 24.9 2.1 7.8 7 14.7 13.7 19.3 0 0 6.5 4.4 13.5 5.2.7.1 1.5.2 2.3.2.8.1 1.7.1 2.5 0h26.9c3 0 5.5-2.4 5.6-5.4l.8-27.7c0-.3 0-.5-.1-.8z"
        />
        <path
          fill={fullColor ? theme.palette.grey['800'] : '#FFF'}
          d="M119.8 29.5h-.8c-1 0-1.3-.3-1.3-1.1v-3.5c0-1 .3-1.3 1.3-1.3h16.1c1 0 1.3.2 1.3 1.3v3.5c0 .8-.2 1.1-1.3 1.1h-.8c-2.2 0-2.9.4-2.9 3.1v9.7h18.1v-9.7c0-2.6-.8-3.1-2.9-3.1h-.8c-1 0-1.3-.3-1.3-1.1v-3.5c0-1 .3-1.3 1.3-1.3h16.1c1 0 1.2.2 1.2 1.3v3.5c0 .8-.2 1.1-1.2 1.1h-.8c-2.2 0-2.9.4-2.9 3.1V58c0 2.8.8 3.1 2.9 3.1h.8c1.1 0 1.3.3 1.3 1v3.5c0 1-.3 1.3-1.3 1.3h-16.1c-1 0-1.3-.2-1.3-1.3v-3.5c0-.7.2-1 1.3-1h.8c2.1 0 2.9-.5 2.9-3.1V48h-18.1v10c0 2.8.8 3.1 2.9 3.1h.8c1.1 0 1.3.3 1.3 1v3.5c0 1-.3 1.3-1.3 1.3h-16c-1 0-1.3-.2-1.3-1.3v-3.5c0-.7.2-1 1.3-1h.7c2.1 0 2.9-.5 2.9-3.1V32.6c0-2.6-.8-3.1-2.9-3.1zm63.3 4.8c11.5 0 16.1 7.7 16.1 16.7 0 8.9-4.6 16.7-16.1 16.7s-16-7.8-16-16.7c0-9 4.6-16.7 16-16.7zm-7.4 16.8c0 6.8 2.3 11 7.4 11 5.1 0 7.4-4.1 7.4-11s-2.3-11-7.4-11c-5-.1-7.4 4.1-7.4 11zm40.9 2.2v4.9c0 2.6.5 3 1.9 3h.7c1 0 1.2.3 1.2 1v3.5c0 1-.2 1.3-1.2 1.3H205c-.9 0-1.3-.2-1.3-1.3v-3.5c0-.7.2-1 1.3-1h.6c2.2 0 2.9-.5 2.9-3V43.8c0-1.9-.3-2.5-3.4-2.5-.9 0-1.1-.5-1.1-1.3v-3.3c0-.9.3-1.2 1.3-1.3l10-.5c1.1 0 1.4.5 1.4 1.7v2.5c1.8-3.4 5.5-4.8 10-4.8 4.1 0 7.3 1.6 8.6 5.9 1.6-4.1 5.6-5.9 10.6-5.9 5.3 0 9.2 2.6 9.2 10.5v13.7c0 1.9.6 2.8 1.8 2.8 1.1 0 1.3-.2 1.9-.2.4-.1.6.1.6.6v3.6c0 .6-.1 1.2-.8 1.4-.9.4-2 .7-4.9.7-3.2 0-6.8-1.3-6.8-6.9V45.9c0-2.9-1.1-4.9-4.1-4.9-4.6 0-7 4.5-7 12.2v5.5c.1 2.1.9 2.4 2.9 2.4h.7c1.1 0 1.3.3 1.3 1v3.5c0 1-.2 1.3-1.3 1.3h-14.2c-1 0-1.2-.2-1.2-1.3v-3.5c0-.7.2-1 1.2-1h.6c1.3 0 1.8-.4 1.9-2.3v-13c0-2.9-1.1-4.9-4-4.9-4.8.2-7.1 4.7-7.1 12.4zm75.1-8.6c0 6-4 10.1-13.1 10.1-2.4 0-4.7-.3-7-.8.6 5 3.1 7.2 8.9 7.2 3.1 0 6.2-.6 8.2-1.4 1-.4 1.7-.8 2.3-.8.5 0 .7.3.7.9v3.5c0 1-.2 1.4-1.3 1.9-2.4 1.2-6.6 2-10.6 2-12.1 0-17-6.8-17-16.3 0-9.8 5.3-16.7 15.8-16.7 8.4 0 13.1 3.9 13.1 10.4zm-20.1 3.8c2.2.5 4.5.8 6.2.8 3.8 0 6.4-1.5 6.4-4.7 0-3-2-4.6-5.5-4.6-3.7 0-6.5 2.1-7.1 8.5zm25.8-7.1c-1 0-1.1-.5-1.1-1.3v-3.3c0-.9.3-1.2 1.3-1.3l10-.5c1.1 0 1.4.5 1.4 1.7v2.9c2.7-4 6.4-5 10-5 7.4 0 12.2 4 12.2 15.9 0 10.9-5.6 17.3-14.4 17.3-3.1 0-5.6-.5-7.7-1.4h-.1v6.7c0 2.6.7 3 2.9 3h.8c1.1 0 1.3.3 1.3 1v3.5c0 1-.3 1.3-1.3 1.3H297c-1 0-1.3-.2-1.3-1.3v-3.5c0-.7.2-1 1.3-1h.8c2.2 0 2.9-.4 2.9-3V43.8c.1-1.8-.3-2.4-3.3-2.4zm11.6 9.5V60c1.2.7 3.8 1.4 6.1 1.4 5.8 0 7.5-5.3 7.5-11s-1.2-9.6-6-9.6c-4.8.1-7.1 3.6-7.6 10.1zm28.5-9.5c-.9 0-1.1-.5-1.1-1.3v-3.3c0-.9.2-1.2 1.3-1.3l10-.5c1.1 0 1.4.5 1.4 1.7v6c.8-2.8 3.5-8.3 10-8.3 4.6 0 6.2 2.6 6.2 6.3 0 2.9-2.3 4.8-4.8 4.8-2.3 0-4.3-1.7-4.3-4.5v-.6c-4.5 1.4-7.1 8.7-7.1 14.9v2.9c0 2.6.7 3 2.9 3h2c1 0 1.3.3 1.3 1v3.6c0 1-.3 1.2-1.3 1.2h-16.9c-1 0-1.3-.2-1.3-1.3v-3.5c0-.7.2-1 1.3-1h.8c2.2 0 3-.5 3-3V43.8c.1-1.8-.3-2.4-3.4-2.4zm46.6-7.1c11.5 0 16.1 7.7 16.1 16.7 0 8.9-4.6 16.7-16.1 16.7s-16-7.8-16-16.7c-.1-9 4.5-16.7 16-16.7zm-7.4 16.8c0 6.8 2.3 11 7.4 11s7.4-4.1 7.4-11-2.3-11-7.4-11c-5.1-.1-7.4 4.1-7.4 11zm43.6 8.2l5.5-15.5c.8-1.9-.2-2.5-1.9-2.5l-.4-.1c-1-.1-1.2-.5-1.2-1.3v-3.2c0-1 .3-1.3 1.2-1.3h13.6c1 0 1.3.2 1.3 1.3v3.2c0 .8-.2 1.3-1.3 1.4h-.8c-1.4.1-2.3.2-3.4 2.9l-8.7 22.3c-.3.7-.4.9-1.4.9h-6.5c-.7 0-1-.2-1.3-.8l-8.8-22.1c-1.3-2.9-1.7-2.8-3.6-3.2l-.4-.1c-1-.2-1.2-.7-1.2-1.4v-3.2c0-1 .3-1.3 1.2-1.3h14.9c1 0 1.2.2 1.2 1.3v3.2c0 .7-.2 1.2-1.3 1.3l-.3.1c-1.8.1-2.6.7-1.8 3.1l5.4 15zm50-14.6c0 6-4 10.1-13.1 10.1-2.4 0-4.7-.3-7-.8.6 5 3.1 7.2 8.9 7.2 3.1 0 6.2-.6 8.2-1.4 1-.4 1.7-.8 2.3-.8.5 0 .7.3.7.9v3.5c0 1-.2 1.4-1.3 1.9-2.4 1.2-6.6 2-10.6 2-12.1 0-17-6.8-17-16.3 0-9.8 5.3-16.7 15.8-16.7 8.5 0 13.1 3.9 13.1 10.4zm-20.1 3.8c2.2.5 4.5.8 6.2.8 3.8 0 6.4-1.5 6.4-4.7 0-3-2-4.6-5.5-4.6-3.6 0-6.5 2.1-7.1 8.5zm57.7 12.8c1.1 0 1.3-.2 1.9-.2.4-.1.6.1.6.6v3.6c0 .6-.1 1.2-.8 1.4-1 .4-2 .7-4.9.7-2.6 0-5.5-.8-6.4-4.1-2.6 3.7-6.1 4.6-9.4 4.6-7.4 0-13-3.8-13-15.4s5.6-17.8 14.3-17.8c3.4 0 5.8.9 7.7 2.4v-7c-.1-1.6-.5-2.2-1.9-2.3l-1.4-.1c-1.1-.1-1.3-.7-1.3-1.4v-3.1c0-1.1.2-1.3 1.3-1.3l10-.5c1.1 0 1.4.5 1.4 1.7v36.1c.2 1.3.8 2.1 1.9 2.1zm-10-9.9v-8.6c-1.1-1-3.6-1.9-5.9-1.9-5.3 0-7.6 4.6-7.6 11.2 0 5.9 1.8 9.4 6.2 9.4 4.5 0 6.9-3.9 7.3-10.1zm20.7 11.2c1.2 0 2.2.9 2.2 2.5 0 1.5-1.1 2.5-2.4 2.5s-2.2-.9-2.2-2.3c.1-1.6 1.2-2.7 2.4-2.7zm22.7 2.7c4 0 6.4-1.5 7.7-2.3.7-.4 1-.4 1 .4v.6c0 .5 0 .7-.5 1-1.2.9-4.3 2.4-8.5 2.4-9.1 0-12.8-6.7-12.8-16 0-10 4.6-17.2 12.8-17.2 6.4 0 8.8 4.1 8.8 7.8 0 1.3-.9 2.2-2 2.2-1 0-1.9-.8-1.9-2.1 0-1.1.7-2 1.6-2.2-.8-2-2.8-3.5-6.4-3.5-7.3 0-10.3 6.9-10.3 15-.1 8 2.8 13.9 10.5 13.9zm26.7-31c8.7 0 12.1 7.1 12.1 16.7 0 9.5-3.4 16.7-12.1 16.7-8.8 0-12.1-7.2-12.1-16.7 0-9.6 3.4-16.7 12.1-16.7zM558.3 51c0 8.4 2.5 14.6 9.7 14.6s9.7-6.2 9.7-14.6-2.5-14.6-9.7-14.6-9.7 6.2-9.7 14.6zm34.5-3.5v15.8c0 1.3.4 1.6 1.7 1.6h2.2c.7 0 .7.1.7.7v.7c0 .4-.1.7-.7.7h-10.3c-.5 0-.7-.2-.7-.8v-.6c0-.6.1-.7.7-.7h2.2c1.3 0 1.7-.2 1.7-1.6V38.9c0-1.4-.4-1.5-2.3-1.5h-1.9c-.5 0-.7-.1-.7-.6v-.7c0-.7.2-.8.7-.8l5.3-.4c1 0 1.3.5 1.3 1.7V40c1.7-3.9 4.7-5.7 8.6-5.7 3.8 0 6.8 2.1 8 6.1 1.7-4.1 5-6.1 9.2-6.1 5.1 0 8.6 3.7 8.6 10.5v17.9c0 1.6.6 2.4 1.7 2.4.9 0 1.4-.2 2-.4.6-.2.8-.2.8.5v.8c0 .5-.1.7-.7.8-1 .3-1.4.4-2.6.4-1.6 0-3.8-.6-3.8-4.5V45.4c0-5.2-1.9-8.7-6.5-8.7-5.6 0-8.3 3.9-8.3 10.8v15.8c0 1.3.5 1.6 1.8 1.6h2.2c.5 0 .7.1.7.7v.7c0 .4-.2.7-.7.7h-10.3c-.5 0-.7-.2-.7-.8v-.6c0-.6.1-.7.7-.7h2.2c1.3 0 1.7-.2 1.7-1.6V45.4c0-5.2-1.9-8.7-6.5-8.7-5.3 0-8 3.9-8 10.8z"
        />
      </StyledSvgIcon>
    </Wrapper>
  );
};
