import React from 'react';
import { ReviewImageToShare, ReviewImageToShareProps } from './ReviewImageToShare';

export default {
  component: ReviewImageToShare,
  title: 'ReviewImageToShare',
};

export const reviewImageToShare = () => {
  const props: ReviewImageToShareProps = {};

  return <ReviewImageToShare {...props} />;
};
