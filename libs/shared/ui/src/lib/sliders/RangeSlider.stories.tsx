import React from 'react';
import { number } from '@storybook/addon-knobs';
import { RangeSlider, RangeSliderProps } from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'Sliders',
};

export const rangeSlider = () => {
  const props: RangeSliderProps = {
    value: number('Value', 50),
    minValue: number('Min Value', 0),
    maxValue: number('Max Value', 100),
  };

  return <RangeSlider {...props} />;
};
