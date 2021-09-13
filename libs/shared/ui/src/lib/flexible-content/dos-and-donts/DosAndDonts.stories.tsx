import { text } from '@storybook/addon-knobs';
import React from 'react';
import { DosAndDonts, DosAndDontsProps } from './DosAndDonts';

export default {
  component: DosAndDonts,
  title: 'Flexible Content/DosAndDonts',
};

export const dosAndDonts = () => {
  const props: DosAndDontsProps = {
    titleDo: text('Title Do', 'Do'),
    contentDo: text('Content Do', 'Nullam id dolor id nibh ultricies vehicula ut id elit.'),
    titleDont: text('Title Dont', 'Dont'),
    contentDont: text('Content Dont', 'Nullam id dolor id nibh ultricies vehicula ut id elit.'),
  };

  return <DosAndDonts {...props} />;
};
