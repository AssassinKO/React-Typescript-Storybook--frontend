import React from 'react';
import { Tag } from './Tag';
import { text } from '@storybook/addon-knobs';

export default {
  component: Tag,
  title: 'Tag',
};

export const primary = () => {
  return <Tag>{text('Label', 'Homeproved')}</Tag>;
};
