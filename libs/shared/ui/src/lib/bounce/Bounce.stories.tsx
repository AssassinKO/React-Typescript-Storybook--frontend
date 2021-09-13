import React from 'react';
import { Bounce, BounceProps } from './Bounce';

export default {
  component: Bounce,
  title: 'Bounce',
};

export const bounce = () => {
  const props: BounceProps = {};

  return <Bounce {...props} />;
};
