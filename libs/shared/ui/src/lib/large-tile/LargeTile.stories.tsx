import { text } from '@storybook/addon-knobs';
import React from 'react';
import { LargeTile, LargeTileProps } from './LargeTile';

export default {
  component: LargeTile,
  title: 'LargeTile',
};

export const primary = () => {
  const props: LargeTileProps = {
    title: text('Title', 'INSPIRATIE'),
    image: text('Image', 'https://i.imgur.com/gMtixAF.jpg'),
    description: text('Description', 'Nieuwe hobby of oude passie? Zo richt jij je hobbykamer in!'),
  };

  return <LargeTile {...props} />;
};
