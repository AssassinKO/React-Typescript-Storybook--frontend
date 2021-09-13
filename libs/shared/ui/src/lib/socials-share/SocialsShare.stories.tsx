import React from 'react';
import { object, text } from '@storybook/addon-knobs';
import { SocialsShare, SocialsShareProps } from './SocialsShare';

export default {
  component: SocialsShare,
  title: 'Social Share Buttons',
};

export const socialsShare = () => {
  const props: SocialsShareProps = {
    media: object('Media', ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email']),
    label: text('Label', 'Share this page'),
  };

  return <SocialsShare {...props} />;
};
