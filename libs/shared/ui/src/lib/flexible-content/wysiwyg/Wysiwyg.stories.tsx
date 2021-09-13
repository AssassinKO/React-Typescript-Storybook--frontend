import React from 'react';
import { Wysiwyg, WysiwygProps } from './Wysiwyg';
import { text } from '@storybook/addon-knobs';

export default {
  component: Wysiwyg,
  title: 'Flexible Content/Wysiwyg',
};

export const wysiwyg = () => {
  const props: WysiwygProps = {
    title: text('Title', 'Lorum ipsum'),
    content: text(
      'Content',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.'
    ),
  };

  return <Wysiwyg {...props} />;
};
