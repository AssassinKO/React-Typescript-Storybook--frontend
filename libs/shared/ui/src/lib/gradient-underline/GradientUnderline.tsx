import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

export type GradientUnderlineProps = { text: string; color: string };

const StyledGradientUnderline = styled(({ color, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${({ color }) => color};
  position: relative;
  margin-bottom: 2.4rem;
  letter-spacing: 0.03rem;
  &:after {
    content: '';
    display: block;
    width: 6.5rem;
    height: 0.3rem;
    background: ${({ theme }) => theme.config.gradients.default};
    bottom: -1rem;
    position: absolute;
  }
`;

export const GradientUnderline: FC<GradientUnderlineProps> = ({ text, color }) => {
  return (
    <StyledGradientUnderline variant="h4" color={color}>
      {text}
    </StyledGradientUnderline>
  );
};
