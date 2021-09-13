import React from 'react';
import { ShadowOverlay, ShadowOverlayProps } from './ShadowOverlay';

export default {
  component: ShadowOverlay,
  title: 'ShadowOverlay',
};

export const shadowOverlay = () => {
  const props: ShadowOverlayProps = {};

  return <ShadowOverlay {...props} />;
};
