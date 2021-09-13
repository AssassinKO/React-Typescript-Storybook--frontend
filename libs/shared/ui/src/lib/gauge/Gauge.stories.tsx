import { number, select } from '@storybook/addon-knobs';
import React from 'react';
import { Gauge, GaugeProps } from './Gauge';

export default {
  component: Gauge,
  title: 'Gauge',
};

export const gauge = () => {
  const props: GaugeProps = {
    size: select('Size', ['small', 'medium', 'large'], 'large'),
    value: number('Value', 40, { min: 0, max: 100, range: true }),
  };

  return <Gauge {...props} />;
};
