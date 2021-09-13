import React from 'react';
import { GradientUnderline, GradientUnderlineProps } from './GradientUnderline';

export default {
  component: GradientUnderline,
  title: 'GradientUnderline',
};

export const gradientUnderline = () => {
  const props: GradientUnderlineProps = {};

  return <GradientUnderline {...props} />;
};
