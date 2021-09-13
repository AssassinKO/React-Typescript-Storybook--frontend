import React from 'react';
import { FlyoutMenu, FlyoutMenuProps } from './FlyoutMenu';
import { FlyoutMenuItem } from './FlyoutMenuItem';
import { Icons } from '../svg-icon';

export default {
  component: FlyoutMenu,
  title: 'FlyoutMenu',
};

export const headerDropdown = () => {
  const props: FlyoutMenuProps = {
    open: true,
    kebab: false,
  };

  return (
    <FlyoutMenu {...props}>
      <>
        <FlyoutMenuItem href="/" icon={Icons.ELECTRICITY}>
          Reviews zoeken
        </FlyoutMenuItem>
        <FlyoutMenuItem href="/" icon={Icons.INTERIOR}>
          Review schrijven
        </FlyoutMenuItem>
        <FlyoutMenuItem href="/" preserveIconSpace>
          Beoordelingsbeleid
        </FlyoutMenuItem>
      </>
    </FlyoutMenu>
  );
};
