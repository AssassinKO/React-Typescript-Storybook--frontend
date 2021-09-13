import React from 'react';
import { StepsWysiwyg, StepsWysiwygProps } from './StepsWysiwyg';
import { number, text } from '@storybook/addon-knobs';

export default {
  component: StepsWysiwyg,
  title: 'Flexible Content/StepsWysiwyg',
};

export const stepsWysiwyg = () => {
  const props: StepsWysiwygProps = {
    step: number('Step', 1),
    title: text('Title', 'Lorum ipsum'),
    content: text(
      'Content',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.'
    ),
  };

  return (
    <div style={{ paddingLeft: '9rem' }}>
      <StepsWysiwyg {...props} />
    </div>
  );
};
