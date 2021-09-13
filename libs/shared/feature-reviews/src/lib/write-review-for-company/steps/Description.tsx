import { ErrorMessage, Input, Textarea } from '@homeproved/shared/feature-forms';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldLabel, ReadOnlyHiddenField, ReadOnlyValue } from '../Atoms';
import { Title } from './description/Atoms';
import { ImageList, Images } from './Images';
import { useFormContext } from 'react-hook-form';

type Props = {
  readOnly: boolean;
  onImagesChange: (images: ImageList) => void;
};

export const Description: FC<Props> = ({ readOnly, onImagesChange }) => {
  const { t } = useTranslation();
  const { register, errors, getValues } = useFormContext();

  return (
    <div>
      <Title>{t('reviews.write.description.title')}</Title>
      <ReadOnlyHiddenField readOnly={readOnly}>
        <Textarea
          name="description"
          placeholder={t('reviews.write.description.placeholder')}
          ref={register}
        />
        {errors.description && <ErrorMessage>{t(errors.description.message)}</ErrorMessage>}
      </ReadOnlyHiddenField>
      {readOnly && <ReadOnlyValue>{getValues().description}</ReadOnlyValue>}

      <FieldLabel>{t('reviews.write.description.reviewTitle.title')}</FieldLabel>
      <ReadOnlyHiddenField readOnly={readOnly}>
        <Input
          name="title"
          placeholder={t('reviews.write.description.reviewTitle.placeholder')}
          ref={register}
        />
        {errors.title && <ErrorMessage>{t(errors.title.message)}</ErrorMessage>}
      </ReadOnlyHiddenField>
      {readOnly && <ReadOnlyValue>{getValues().title}</ReadOnlyValue>}

      <Images readOnly={readOnly} onChange={onImagesChange} />
    </div>
  );
};
