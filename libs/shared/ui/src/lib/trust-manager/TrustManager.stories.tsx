import React from 'react';
import { TrustManager, TrustManagerProps } from './TrustManager';

export default {
  component: TrustManager,
  title: 'TrustManager',
};

export const trustManager = () => {
  const props: TrustManagerProps = {};

  return <TrustManager {...props} />;
};
