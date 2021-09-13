import React, { FC } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

type OffCanvasToggleProps = {
  offCanvasOpen: boolean;
  onToggleOffCanvas: () => void;
  innerRef: React.RefObject<HTMLDivElement>;
  className?: string;
  color?: string;
};

const Bar = styled(({ color, ...restProps }) => <div {...restProps} />)`
  display: block;
  position: absolute;
  height: 0.2rem;
  width: 100%;
  background: ${({ color }) => color};
  border-radius: 0.2rem;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
`;

const Wrapper = styled(({ open, innerRef, ...restProps }) => <div ref={innerRef} {...restProps} />)`
  width: 2.6rem;
  height: 1.8rem;
  cursor: pointer;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;

  ${Bar}:nth-child(1) {
    top: 0;
  }

  ${Bar}:nth-child(2), ${Bar}:nth-child(3) {
    top: 50%;
  }

  ${Bar}:nth-child(4) {
    top: 100%;
  }

  &.open {
    ${Bar}:nth-child(1), ${Bar}:nth-child(4) {
      top: 50%;
      width: 0;
      left: 50%;
    }
    ${Bar}:nth-child(2) {
      transform: rotate(45deg);
    }
    ${Bar}:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
`;

export const OffCanvasToggle: FC<OffCanvasToggleProps> = ({
  offCanvasOpen,
  onToggleOffCanvas,
  innerRef,
  className,
  color = '#fff',
}) => (
  <Wrapper
    innerRef={innerRef}
    className={clsx(className, offCanvasOpen ? 'open' : undefined)}
    open={offCanvasOpen}
    onClick={onToggleOffCanvas}
  >
    <Bar color={color} />
    <Bar color={color} />
    <Bar color={color} />
    <Bar color={color} />
  </Wrapper>
);
