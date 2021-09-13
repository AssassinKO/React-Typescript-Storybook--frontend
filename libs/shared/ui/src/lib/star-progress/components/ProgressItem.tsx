import { Box, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useCounter } from '../hooks/useCounter';

export type ProgressItemProps = {
  label: string;
  value: number;
  percentage: number;
  progressColor: string;
  fillPercentage: number;
};

const Wrapper = styled.div``;

const Text = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
const Progress = styled(({ color, percentage, ...restProps }) => <div {...restProps} />)`
  background-color: ${({ color }) => color};
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
`;

export const ProgressItem: FC<ProgressItemProps> = ({
  label,
  value,
  percentage,
  fillPercentage,
  progressColor,
}) => {
  const { increment, count } = useCounter(0);

  useEffect(() => {
    const timer = setInterval(increment, 10);
    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Text variant="body1">
          {label}: {value}
        </Text>
        <Text variant="body1">{count < percentage ? count : percentage}%</Text>
      </Box>
      <ProgressBar>
        <Progress
          color={progressColor}
          percentage={count < fillPercentage ? count : fillPercentage}
        />
      </ProgressBar>
    </Wrapper>
  );
};
