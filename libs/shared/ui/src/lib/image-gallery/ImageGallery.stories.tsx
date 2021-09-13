import React from 'react';
import { array } from '@storybook/addon-knobs';
import { ImageGallery, ImageGalleryProps } from './ImageGallery';

export default {
  component: ImageGallery,
  title: 'Image Gallery',
};

export const imageGallery = () => {
  const props: ImageGalleryProps = {
    images: array('Images', ['']),
  };

  return <ImageGallery {...props} />;
};
