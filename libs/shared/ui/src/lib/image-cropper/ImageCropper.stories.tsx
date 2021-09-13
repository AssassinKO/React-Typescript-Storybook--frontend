import React from 'react';
import { ImageCropper, ImageCropperProps } from './ImageCropper';

export default {
  component: ImageCropper,
  title: 'ImageCropper',
};

export const imageCropper = () => {
  const props: ImageCropperProps = {};

  return <ImageCropper {...props} />;
};
