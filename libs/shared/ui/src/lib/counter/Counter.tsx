import React, { FC } from 'react';
import styled from 'styled-components';
import { useCountUp } from 'react-countup';

export type CounterProps = {
  count: number;
};

const StyledCounter = styled.div`
  font-size: 2.5rem;
  line-height: 3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCounterDigit = styled.div`
  padding: 0 0.3rem;
  margin: 0 0.2rem;
  background: linear-gradient(to right bottom, #eee, #fafafa);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.17);
  position: relative;
`;

const Number = styled.div`
  position: relative;
  z-index: 1;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.17);
  width: 100%;
  z-index: 0;
`;

const Notch = styled.div`
  position: absolute;
  background: linear-gradient(to left top, #eee, #fafafa);
  border: 1px solid rgba(0, 0, 0, 0.17);
  width: 0.4rem;
  height: 0.6rem;
  top: 100%;
  transform: translateY(calc(-50% + 0.5px));
  &.notch1 {
    left: 0;
  }
  &.notch2 {
    right: 0;
  }
`;

export const Counter: FC<CounterProps> = ({ count: end_count }) => {
  const { countUp: count, update } = useCountUp({
    end: end_count,
    startOnMount: false,
    duration: 2,
  });

  React.useEffect(() => {
    setTimeout(() => {
      update(end_count);
    }, 1001);
  }, [0, end_count]);

  return (
    <StyledCounter>
      {(
        '0'.repeat(
          end_count.toString().length - count.toString().length > 0
            ? end_count.toString().length - count.toString().length
            : 0
        ) + count.toString()
      )
        .split('')
        .map((e, index) => (
          <StyledCounterDigit key={index}>
            <Number>{e}</Number>
            <Line>
              <Notch className="notch notch1" />
              <Notch className="notch notch2" />
            </Line>
          </StyledCounterDigit>
        ))}
    </StyledCounter>
  );
};
