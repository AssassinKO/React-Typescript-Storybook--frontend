import React from 'react';
import { StarProgress, StarProgressProps } from './StarProgress';

export default {
  component: StarProgress,
  title: 'StarProgress',
};

export const starProgress = () => {
  const props: StarProgressProps = {};

  return <StarProgress {...props} />;
};
