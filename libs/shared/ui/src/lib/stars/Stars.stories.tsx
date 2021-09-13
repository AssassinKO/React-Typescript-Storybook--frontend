import React from 'react';
import { number } from '@storybook/addon-knobs';
import { Stars, StarsProps } from './Stars';

export default {
  component: Stars,
  title: 'Stars',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: StarsProps = {
    count: number('Stars', 5),
  };

  return <Stars {...props} />;
};
