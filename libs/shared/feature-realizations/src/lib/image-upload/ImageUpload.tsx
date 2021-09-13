import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import { Icons, ImageCropper } from '@homeproved/shared/ui';
import { Wrapper, InputWrapper, LabelWrapper, LabelText, Delete } from './Atoms';
import { ErrorMessage } from '@homeproved/shared/feature-forms';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

type FileReaderResult = string | ArrayBuffer | null;

export interface ImageUploadProps {
  id?: number;
  uniqueKey: string;
  cover?: boolean;
  required?: boolean;
  onUpload?: (image: FileReaderResult, id: number, uniqueKey: string) => void;
  onDelete?: (image: string, uniqueKey) => void;
  excistingFile?: string;
  error?: string | false;
  isMobile?: boolean;
  isTablet?: boolean;
}

const StyledErrorMessage = styled(ErrorMessage)`
  position: absolute;
  bottom: 2rem;
  width: calc(100% - 2rem);
  text-align: center;
`;

export const ImageUpload: FC<ImageUploadProps> = ({
  id,
  uniqueKey,
  cover = false,
  onUpload,
  onDelete,
  excistingFile = null,
  error,
  isMobile = false,
  isTablet = false,
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<FileReaderResult>(null);

  const [showCropzone, setShowCropzone] = useState(false);

  useEffect(() => {
    if (excistingFile === null) return;

    setFile(excistingFile);
  }, [setFile, excistingFile]);

  const handleDropzone = (files) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const image = e.target && (e.target as FileReader).result;
      setFile(image);
      setShowCropzone(true);
      onUpload(image, id, uniqueKey);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleDelete = (file) => {
    setFile(null);
    onDelete(file, uniqueKey);
  };
  const handleCroppedImage = (image) => {
    setShowCropzone(false);
    setFile(image);
    onUpload(image, id, uniqueKey);
  };

  return (
    <Wrapper cover={cover} isMobile={isMobile} isTablet={isTablet}>
      <Dropzone onDrop={(acceptedFiles) => handleDropzone(acceptedFiles)} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <InputWrapper {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            <LabelWrapper file={file}>
              {!file && (
                <LabelText cover={cover}>
                  {cover
                    ? ReactHtmlParser(
                        `${t('app.pro.pages.realizations.add.cover')}&nbsp;<sup>*</sup>`
                      )
                    : t('app.pro.pages.realizations.add.photo')}
                </LabelText>
              )}
            </LabelWrapper>
          </InputWrapper>
        )}
      </Dropzone>
      {!!file && (
        <Delete onClick={() => handleDelete(file)} icon={Icons.DELETE} variant={'white'} />
      )}
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      <ImageCropper
        open={showCropzone}
        onClose={setShowCropzone}
        image={file}
        onCroppedImage={handleCroppedImage}
        isTablet={isTablet}
        ratio={16 / 9}
        defaultCropWidth={600}
      />
    </Wrapper>
  );
};

export default ImageUpload;
