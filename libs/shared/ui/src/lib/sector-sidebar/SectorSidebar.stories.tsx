import React from 'react';
import { SectorSidebar, SectorSidebarProps } from './SectorSidebar';

export default {
  component: SectorSidebar,
  title: 'SectorSidebar',
};

export const sectorSidebar = () => {
  const props: SectorSidebarProps = {};

  return <SectorSidebar {...props} />;
};
