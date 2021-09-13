import React from 'react';
import { number } from '@storybook/addon-knobs';
import { Rating, RatingProps } from './Rating';

export default {
  component: Rating,
  title: 'Rating',
};

export const rating = () => {
  const props: RatingProps = {
    value: number('Value', 5),
    max: number('Max', 10)
  };

  return <Rating {...props} />;
};
