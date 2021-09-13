import React from 'react';
import { FilterMenu, FilterMenuProps } from './FilterMenu';

export default {
  component: FilterMenu,
  title: 'FilterMenu',
};

export const filterMenu = () => {
  const props: FilterMenuProps = {};

  return <FilterMenu {...props} />;
};
