import React from 'react';
import { text } from '@storybook/addon-knobs';
import { LocationTag, LocationTagProps } from './LocationTag';

export default {
  component: LocationTag,
  title: 'LocationTag',
};

export const primary = () => {
  const props: LocationTagProps = {
    location: text('Location', 'Kontich')
  };

  return <LocationTag {...props}/>;
};
