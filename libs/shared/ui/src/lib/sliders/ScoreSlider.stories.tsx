import React from 'react';
import { boolean, number } from '@storybook/addon-knobs';
import { ScoreSlider, ScoreSliderProps } from './ScoreSlider';

export default {
  component: ScoreSlider,
  title: 'Sliders',
};

export const scoreSlider = () => {
  const props: ScoreSliderProps = {
    value: number('Value', 7),
    minValue: number('Min Value', 0),
    maxValue: number('Max Value', 10),
    disabled: boolean('Disabled', false),
  };

  return <ScoreSlider {...props} />;
};
