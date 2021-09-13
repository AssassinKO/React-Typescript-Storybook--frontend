import React, { FC } from 'react';
import { IconButtonProps } from '@material-ui/core';
import { IconButton } from '../buttons';
import styled from 'styled-components';
import { useDisclosure } from 'react-use-disclosure';
import { FlyoutMenu } from '../flyout-menu';
import { Icons } from '../svg-icon';

const Wrapper = styled.div`
  position: relative;
`;

export const KebabMenu: FC<IconButtonProps> = ({ children }) => {
  const { isOpen: menuOpen, close: closeMenu, toggle: toggleMenu } = useDisclosure(false);
  const ref = React.useRef();

  return (
    <Wrapper>
      <div ref={ref}>
        <IconButton innerRef={ref} variant="transparent" icon={Icons.KEBAB} onClick={toggleMenu} />
      </div>
      <FlyoutMenu toggleBtnRef={ref} kebab open={menuOpen} onClickAway={closeMenu}>
        {children}
      </FlyoutMenu>
    </Wrapper>
  );
};
