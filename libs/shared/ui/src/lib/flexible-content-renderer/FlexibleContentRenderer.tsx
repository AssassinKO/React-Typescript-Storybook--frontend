import React, { FC } from 'react';
import { FlexibleContent } from '../flexible-content/types';
import { Collapsable, Button, DosAndDonts, Wysiwyg } from '../..';
import { DoubleButton } from '../flexible-content/DoubleButton';
import { TitleWithImage } from '../flexible-content/TitleWithImage';

export type FlexibleTypes =
  | 'button'
  | 'double_button'
  | 'wysiwyg'
  | 'collapsible'
  | 'doDont'
  | 'title_photo';

export type FlexibleContentRendererProps = {
  item: unknown;
  type: FlexibleTypes;
};

export const FlexibleContentRenderer: FC<FlexibleContentRendererProps> = ({ item, type }) => {
  const fields: FlexibleContent = item as FlexibleContent;

  return (
    <>
      {
        {
          wysiwyg: <Wysiwyg title={fields.title} content={fields.content} />,
          doDont: (
            <DosAndDonts
              titleDo={fields.titleDo}
              contentDo={fields.contentDo}
              titleDont={fields.titleDont}
              contentDont={fields.contentDont}
            />
          ),
          button: <Button variant={'gradient'}>{fields.buttonTitle}</Button>,
          double_button: <DoubleButton fields={fields} />,
          collapsible: <Collapsable title={fields.title} text={fields.content} />,
          title_photo: <TitleWithImage title={fields.title} image={fields.image} />,
        }[type]
      }
    </>
  );
};
