import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

export type GaugeProps = {
  value: number;
  size: 'small' | 'medium' | 'large';
};

const StyledGauge = styled.div<GaugeProps>`
  font-size: ${({ size }) => (size == 'large' ? '4rem' : size == 'medium' ? '3rem' : '2.4rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme }) => theme.palette.grey['200']} ${({ value }) => 100 - value}%,
    transparent 0%
  );
  position: absolute;
  left: -0.5%;
  right: -0.5%;
  top: -0.5%;
  bottom: -0.5%;
  width: 101%;
  height: 101%;
`;

const StyledGaugeOuter = styled.div<GaugeProps & { mobile: boolean }>`
  background: ${({ theme }) => theme.config.gradients.default};
  border-radius: 50%;
  width: 4em;
  height: 4em;
  font-size: ${({ size }) => (size == 'large' ? '4rem' : size == 'medium' ? '3rem' : '2.4rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledGaugeInner = styled.div`
  width: 3em;
  height: 3em;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGaugeNumber = styled.div`
  font-size: 1em;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  span {
    font-size: 0.5em;
  }
`;

export const Gauge: FC<GaugeProps> = (props) => {
  const { value } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  return (
    <StyledGaugeOuter {...props} mobile={isMobile}>
      <StyledGauge {...props}>
        <StyledGaugeInner>
          <StyledGaugeNumber>
            {value}
            <span>%</span>
          </StyledGaugeNumber>
        </StyledGaugeInner>
      </StyledGauge>
    </StyledGaugeOuter>
  );
};
