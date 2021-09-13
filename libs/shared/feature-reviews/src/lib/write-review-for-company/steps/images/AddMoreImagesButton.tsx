import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DropzoneInputProps } from 'react-dropzone';

type AddMoreImagesButtonProps = {
  inputProps: DropzoneInputProps;
  onChange: (files: FileList) => void;
};

const Label = styled.label`
  display: inline;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    color: ${({ theme }) => theme.palette.grey['800']};
  }
`;

export const AddMoreImagesButton: FC<AddMoreImagesButtonProps> = ({ inputProps, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <Label htmlFor="fileInput">{t('reviews.write.images.moreLink')}</Label>
      <input {...inputProps} onChange={(e) => onChange(e.target.files)} />
    </>
  );
};
