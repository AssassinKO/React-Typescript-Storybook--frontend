import React from 'react';
import { ResponsiveImage, ResponsiveImageProps } from './ResponsiveImage';

export default {
  component: ResponsiveImage,
  title: 'ResponsiveImage',
};

export const responsiveImage = () => {
  const props: ResponsiveImageProps = {};

  return <ResponsiveImage {...props} />;
};
