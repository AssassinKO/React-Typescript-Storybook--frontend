import React, { FC } from 'react';
import { useTheme } from '@material-ui/core';
import styled from 'styled-components';

export type StarsProps = {
  count: number;
  size?: number;
  className?: string;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

const Star = styled(({ size: number, ...restProps }) => <svg {...restProps} />)`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  margin: ${({ size }) => `${size / 5}rem`};
`;

export const getStarsCount = (score: number, maxScore = 10): number => {
  const percentage = score / maxScore;

  if (percentage === 0) return 0;
  if (percentage < 0.25) return 1;
  if (percentage < 0.5) return 2;
  if (percentage < 0.75) return 3;
  if (percentage < 1) return 4;
  return 5;
};

export const Stars: FC<StarsProps> = ({ count, size = 1, className }) => {
  const theme = useTheme();

  return (
    <Wrapper className={className}>
      {[...Array(5).keys()].map((n, index) => (
        <Star
          key={index}
          size={size}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            fill:
              n >= count
                ? theme.palette.grey['300']
                : count >= 4
                ? theme.palette.green.main
                : count >= 2
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </Star>
      ))}
    </Wrapper>
  );
};

export default Stars;
