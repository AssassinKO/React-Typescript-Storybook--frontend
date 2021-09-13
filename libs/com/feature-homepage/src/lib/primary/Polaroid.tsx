import React, { FC } from 'react';
import styled from 'styled-components';

type PolaroidProps = {
  tablet?: boolean;
};

const Wrapper = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  max-width: ${({ tablet }) => (tablet ? '30rem' : '33rem')};
  margin-top: ${({ tablet }) => tablet && '-2rem'};
  margin-right: 1rem;
  margin-left: 1rem;

  img {
    width: 100%;
    height: auto;
    transform: rotate(-4deg);
  }
`;

export const Polaroid: FC<PolaroidProps> = ({ tablet = false }) => {
  return (
    <Wrapper tablet={tablet}>
      <img src="/homeproved-top-rating-green.png" alt="" loading="lazy" />
    </Wrapper>
  );
};
