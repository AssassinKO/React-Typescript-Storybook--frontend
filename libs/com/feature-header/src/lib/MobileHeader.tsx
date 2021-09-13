import React, { FC } from 'react';
import { LogoCom, OffCanvasToggle } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { OffCanvasMenu } from './OffCanvasMenu';
import { useDisclosure } from 'react-use-disclosure';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import Link from 'next/link';

type MobileHeaderProps = {
  transparent?: boolean;
};

const Wrapper = styled(({ transparent, ...restProps }) => <div {...restProps} />)`
  display: flex;
  height: 8rem;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  align-items: center;
  background: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.config.gradients.default};

  @media screen and (max-width: 359px) {
    justify-content: space-between;
  }
`;

const StyledLogoCom = styled(LogoCom)`
  @media screen and (min-width: 360px) {
    margin: 0 auto;
    position: relative;
    right: -2.6rem; // toggle button width
  }
`;

export const MobileHeader: FC<MobileHeaderProps> = ({ transparent }) => {
  const { getPath } = useLocalizedRoutes();
  const { isOpen: offCanvasOpen, toggle: onToggleOffCanvas } = useDisclosure(false);
  const toggleBtnRef: React.RefObject<HTMLDivElement> = React.useRef();

  return (
    <>
      <Wrapper transparent={transparent}>
        <Link href={getPath('/')}>
          <StyledLogoCom width="22.4rem" />
        </Link>
        <OffCanvasToggle
          innerRef={toggleBtnRef}
          offCanvasOpen={offCanvasOpen}
          onToggleOffCanvas={onToggleOffCanvas}
        />
      </Wrapper>
      <OffCanvasMenu open={offCanvasOpen} onToggleOffCanvas={onToggleOffCanvas} />
    </>
  );
};
