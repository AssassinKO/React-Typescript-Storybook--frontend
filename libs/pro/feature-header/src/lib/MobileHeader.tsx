import React, { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useDisclosure } from 'react-use-disclosure';
import { LogoPro, OffCanvasToggle } from '@homeproved/shared/ui';
import { OffCanvasMenu } from './OffCanvasMenu';

type MobileHeaderProps = {
  transparent: boolean;
};

const Wrapper = styled(({ transparent, ...restProps }) => <div {...restProps} />)`
  display: flex;
  height: 8rem;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  background: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.config.gradients.default};
`;

export const MobileHeader: FC<MobileHeaderProps> = ({ transparent }) => {
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const { isOpen: offCanvasOpen, toggle: onToggleOffCanvas } = useDisclosure(false);
  const toggleBtnRef: React.RefObject<HTMLDivElement> = React.useRef();

  return (
    <>
      <Wrapper transparent={transparent}>
        <LogoPro width="23rem" onClick={() => router.push(getPath('/'))} />
        <OffCanvasToggle
          innerRef={toggleBtnRef}
          offCanvasOpen={offCanvasOpen}
          onToggleOffCanvas={onToggleOffCanvas}
        />
      </Wrapper>
      <OffCanvasMenu open={offCanvasOpen} toggleOffCanvas={onToggleOffCanvas} />
    </>
  );
};
