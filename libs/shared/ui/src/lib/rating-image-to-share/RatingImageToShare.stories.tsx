import React from 'react';
import { RatingImageToShare, RatingImageToShareProps } from './RatingImageToShare';

export default {
  component: RatingImageToShare,
  title: 'RatingImageToShare',
};

export const ratingImageToShare = () => {
  const props: RatingImageToShareProps = {};

  return <RatingImageToShare {...props} />;
};
