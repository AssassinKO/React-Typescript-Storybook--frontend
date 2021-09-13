import React from 'react';
import { ImageCarrousel, ImageCarrouselProps } from './ImageCarrousel';

export default {
  component: ImageCarrousel,
  title: 'ImageCarrousel',
};

export const imageCarrousel = () => {
  const props: ImageCarrouselProps = {};

  return <ImageCarrousel {...props} />;
};
