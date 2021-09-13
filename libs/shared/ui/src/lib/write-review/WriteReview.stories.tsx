import React from 'react';
import { WriteReview, WriteReviewProps } from './WriteReview';

export default {
  component: WriteReview,
  title: 'WriteReview',
};

export const writeReview = () => {
  const props: WriteReviewProps = {
    button: 'Review Schrijven',
    caption: 'Waar wacht je nog op?',
  };

  return <WriteReview {...props} />;
};
