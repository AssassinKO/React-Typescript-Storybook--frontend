import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import styled from 'styled-components';

const Indicator = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  z-index: 99999;
  width: 5rem;
  text-align: center;
`;

export const BreakpointIndicator = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.between(0, theme.breakpoints.values.xs));
  const sm = useMediaQuery(
    theme.breakpoints.between(theme.breakpoints.values.xs, theme.breakpoints.values.sm)
  );
  const md = useMediaQuery(
    theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)
  );
  const lg = useMediaQuery(
    theme.breakpoints.between(theme.breakpoints.values.md, theme.breakpoints.values.lg)
  );
  const xl = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.lg));

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {xs && <Indicator>xs</Indicator>}
      {sm && <Indicator>sm</Indicator>}
      {md && <Indicator>md</Indicator>}
      {lg && <Indicator>lg</Indicator>}
      {xl && <Indicator>xl</Indicator>}
    </>
  );
};
