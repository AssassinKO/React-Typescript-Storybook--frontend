import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { Checkbox } from './checkbox';
import { action } from '@storybook/addon-actions';

export default {
  component: Checkbox,
  title: 'Forms',
};

export const checkBox = () => {
  const props = {
    label: text('Label', 'Onthoud mij'),
    value: boolean('Value', false),
    disabled: boolean('Disabled', false),
    onChange: () => action('OnChange'),
  };

  return <Checkbox {...props} />;
};
