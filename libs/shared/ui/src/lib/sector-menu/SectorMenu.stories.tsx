import React from 'react';
import { SectorMenu, SectorMenuProps } from './SectorMenu';

export default {
  component: SectorMenu,
  title: 'SectorMenu',
};

export const sectorMenu = () => {
  const props: SectorMenuProps = {};

  return <SectorMenu {...props} />;
};
