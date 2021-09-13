import React from 'react';
import { ButtonSpinner, ButtonSpinnerProps } from './ButtonSpinner';

export default {
  component: ButtonSpinner,
  title: 'ButtonSpinner',
};

export const buttonSpinner = () => {
  const props: ButtonSpinnerProps = {};

  return <ButtonSpinner {...props} />;
};
