import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { Chip, ChipProps } from './Chip';

export default {
  component: Chip,
  title: 'Chip',
};

export const primary = () => {
  const props: ChipProps = {
    label: text('Label', 'Lorum Ipsum'),
    size: select('Size', ['normal', 'large'], 'normal'),
  };

  return <Chip {...props} />;
};
