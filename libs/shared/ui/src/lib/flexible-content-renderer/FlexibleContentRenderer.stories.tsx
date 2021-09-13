import React from 'react';
import { FlexibleContentRenderer, FlexibleContentRendererProps } from './FlexibleContentRenderer';

export default {
  component: FlexibleContentRenderer,
  title: 'FlexibleContentRenderer',
};

export const flexibleContentRenderer = () => {
  const props: FlexibleContentRendererProps = {};

  return <FlexibleContentRenderer {...props} />;
};
