import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: relative;
  width: 6rem;
  height: 6rem;
`;

const ThumbImg = styled.img`
  position: absolute;
  max-width: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 0.8rem);
  height: calc(100% + 0.8rem);
`;

const getThumb = (score: number) => {
  if (score <= 3) return '1-2-3';
  return Math.ceil(score).toString();
};

export const SmileyThumb: FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const thumb = getThumb(props['aria-valuenow']);

  return (
    <Wrapper {...props}>
      <ThumbImg src={`/review-slider-thumb/${thumb}.svg`} />
    </Wrapper>
  );
};
