import React, { FC } from 'react';
import styled from 'styled-components';
import 'animate.css';

export type BounceProps = {
  translateY?: number;
};
const Outer = styled(({ translateY, ...restProps }) => <div {...restProps} />)`
  margin: auto;
  transform: ${({ translateY }) => `translateY(${translateY}rem)`};
`;

const StyledBounce = styled.div`
  animation-duration: 3s;
`;

export const Bounce: FC<BounceProps> = ({ children, translateY = 0 }) => {
  return (
    <Outer translateY={translateY}>
      <StyledBounce className="animate__animated animate__bounce animate__infinite">
        {children}
      </StyledBounce>
    </Outer>
  );
};
