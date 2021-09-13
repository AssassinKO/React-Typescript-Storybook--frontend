import React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { SectionTitle } from './SectionTitle';
import { Icons } from '../svg-icon';

export default {
  component: SectionTitle,
  title: 'Section Title',
};

export const title = () => {
  const WithIcon = boolean('Add icon', false);
  const IconSelect = WithIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;

  return (
    <SectionTitle
      label={text('Label', 'Section Title')}
      textAlign={select('Text Align', ['center', 'left', 'right'], 'center')}
      icon={IconSelect}
      uppercase={boolean('Uppercase', false)}
      font={select('Font', ['Cabrito', 'PTSans'], 'Cabrito')}
    />
  );
};
