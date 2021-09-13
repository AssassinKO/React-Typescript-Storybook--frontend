import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { IconTile, IconTileProps } from './IconTile';
import { Icons } from '../svg-icon';

export default {
  component: IconTile,
  title: 'Icon Tile',
};

export const iconTile = () => {
  const props: IconTileProps = {
    icon: select('Icon', Icons, Icons.ELECTRICITY),
    label: text('Label', 'Etiam Pharetra Justo Ipsum'),
  };

  return <IconTile {...props} />;
};
