import React from 'react';
import { Collapsable, CollapsableProps } from './Collapsable';
import { text } from '@storybook/addon-knobs';

export default {
  component: Collapsable,
  title: 'Collapsable',
};

export const collapsable = () => {
  const props: CollapsableProps = {
    title: text('Title', 'Mollis Sem Inceptos Ultricies Bibendum'),
    text: text(
      'Text',
      'Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.'
    ),
  };

  return <Collapsable {...props} />;
};
