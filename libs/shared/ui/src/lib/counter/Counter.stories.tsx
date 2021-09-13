import { number } from '@storybook/addon-knobs';
import React from 'react';
import { Counter, CounterProps } from './Counter';

export default {
  component: Counter,
  title: 'Counter',
};

export const counter = () => {
  const props: CounterProps = {
    count: number('Value', 4200),
  };

  return <Counter {...props} />;
};
