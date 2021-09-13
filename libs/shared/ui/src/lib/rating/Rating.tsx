import React, { FC } from 'react';
import styled from 'styled-components';

export type RatingProps = {
  value: number;
  max: number;
  color?: 'white' | 'dark';
  className?: string;
};

const Wrapper = styled(({ color, ...restProps }) => <div {...restProps} />)`
  font-weight: 900;
  display: flex;
  align-items: baseline;
  color: ${({ color, theme }) => (color === 'white' ? '#FFF' : theme.palette.grey['800'])};
`;

const StyledRatingValue = styled.div`
  font-size: 3rem;
`;

const StyledRatingMax = styled.div`
  font-size: 1rem;
`;

export const Rating: FC<RatingProps> = ({ value, max, color = 'dark', className }) => {
  return (
    <Wrapper color={color} className={className}>
      <StyledRatingValue>{value.toPrecision(2)}</StyledRatingValue>
      <StyledRatingMax>/ {max}</StyledRatingMax>
    </Wrapper>
  );
};
