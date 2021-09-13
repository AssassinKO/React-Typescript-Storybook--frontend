import React, { FC, RefObject } from 'react';
import styled from 'styled-components';
import { useClientHeight } from '../hooks';

type WithClientHeightProps = {
  show: boolean;
  resetTrigger?: unknown;
};

const Wrapper = styled(({ show, innerRef, height, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  height: ${({ show, height }) => (show ? `${height}px` : '0')};
  transition: height 0.25s ease-in-out;
  overflow: hidden;

  // as long as height is not known, position off screen, to avoid breaking page layout
  ${({ height }) =>
    height == null
      ? `
    position: fixed;
    top: -500rem;
  `
      : `
    position: static;
    top: auto;
  `}
`;

export const WithClientHeight: FC<WithClientHeightProps> = ({ show, resetTrigger, children }) => {
  const myRef: RefObject<HTMLDivElement> = React.useRef();
  const clientHeight = useClientHeight(myRef, show, resetTrigger);

  return (
    <Wrapper innerRef={myRef} show={clientHeight ? show : true} height={clientHeight}>
      {/* Hide content if not owner, to prevent form errors for hidden fields */}
      {(clientHeight == null || show) && children}
    </Wrapper>
  );
};
