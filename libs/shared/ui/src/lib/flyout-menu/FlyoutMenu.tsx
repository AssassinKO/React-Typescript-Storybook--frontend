import React, { FC } from 'react';
import { Grow, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { useClickOutside } from '@homeproved/shared/util';

export type FlyoutMenuProps = {
  open: boolean;
  kebab?: boolean;
  onClickAway?: () => void;
  className?: string;
  toggleBtnRef?: React.RefObject<HTMLElement>;
  fullWidth?: boolean;
};

const Wrapper = styled(({ kebab, fullWidth, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  display: inline-flex;
  position: absolute;
  top: ${({ kebab }) => (kebab ? '-.5rem' : 'calc(100% + 2rem)')};
  left: ${({ kebab }) => (kebab ? 'auto' : '50%')};
  right: ${({ kebab }) => (kebab ? '4rem' : 'auto')};
  transform: ${({ kebab }) => (kebab ? 'none' : 'translateX(-50%)')};
  z-index: 99999;
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}
`;

const StyledPaper = styled(({ kebab, fullWidth, ...restProps }) => <Paper {...restProps} />)`
  overflow: visible;
  padding: 0.5rem 0;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%);

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ kebab }) =>
    kebab
      ? `
    &:after {
      content: '';
      position: absolute;
      top: 1.5rem;
      left: 100%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: .75rem 0 .75rem .9rem;
      border-color: transparent transparent transparent #ffffff;
    }
  `
      : `
    &:after {
      content: '';
      position: absolute;
      top: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0.9rem 1.5rem 0.9rem;
      border-color: transparent transparent #fff transparent;
    }
  `}
`;

export const FlyoutMenu: FC<FlyoutMenuProps> = ({
  open,
  kebab = false,
  onClickAway,
  className,
  toggleBtnRef,
  children,
  fullWidth,
}) => {
  const menuRef: React.RefObject<HTMLDivElement> = React.createRef();

  useClickOutside(menuRef, onClickAway ? onClickAway : () => null, toggleBtnRef && [toggleBtnRef]);

  return (
    <Wrapper innerRef={menuRef} kebab={kebab} fullWidth={fullWidth}>
      <Grow in={open} mountOnEnter unmountOnExit>
        <StyledPaper kebab={kebab} className={className} fullWidth={fullWidth}>
          {children}
        </StyledPaper>
      </Grow>
    </Wrapper>
  );
};
