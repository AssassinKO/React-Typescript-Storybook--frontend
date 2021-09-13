import React, { FC, useState } from 'react';
import { AddImagesButton } from './images/AddImagesButton';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { RemoveImageButton } from '../Atoms';
import { AddMoreImagesButton } from './images/AddMoreImagesButton';
import { ImageList, ImageListItem, ImageListTitle, ImagesWrapper } from './images/Atoms';

type Props = {
  readOnly: boolean;
  onChange: (images: ImageList) => void;
};

export type ImageList = Record<number, File>;

let fileIdAutoIncrement = 0;

export const Images: FC<Props> = ({ readOnly, onChange }) => {
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = useState<ImageList>({});

  const handleDropzone = (acceptedFiles: File[]) => {
    const newImages: ImageList = {};
    for (let i = 0; i < acceptedFiles.length; i++) {
      newImages[fileIdAutoIncrement] = acceptedFiles[i];
      fileIdAutoIncrement++;
    }
    const newValue = {
      ...selectedImages,
      ...newImages,
    };
    setSelectedImages(newValue);
    onChange(newValue);
  };

  const handleFileInput = (files: FileList) => {
    const newImages: ImageList = {};
    for (let i = 0; i < files.length; i++) {
      newImages[fileIdAutoIncrement] = files.item(i);
      fileIdAutoIncrement++;
    }
    const newValue = {
      ...selectedImages,
      ...newImages,
    };
    setSelectedImages(newValue);
    onChange(newValue);
  };

  const handleRemoveImage = (id: number) => {
    const currentImages = selectedImages;
    delete currentImages[id];
    setSelectedImages({
      ...currentImages,
    });
  };

  return readOnly ? (
    <>
      {Object.keys(selectedImages).length > 0 && (
        <ImagesWrapper>
          <ImageListTitle>{t('reviews.write.images.title')}</ImageListTitle>
          <ImageList>
            {Object.entries(selectedImages).map((entry, index) => (
              <ImageListItem key={index}>
                <span>{entry[1].name}</span>
                <RemoveImageButton onClick={() => handleRemoveImage(parseInt(entry[0]))} />
              </ImageListItem>
            ))}
          </ImageList>
        </ImagesWrapper>
      )}
    </>
  ) : (
    <ImagesWrapper>
      <Dropzone
        accept={'image/jpeg, image/png'}
        onDrop={(acceptedFiles) => handleDropzone(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            {Object.keys(selectedImages).length === 0 ? (
              <AddImagesButton inputProps={getInputProps()} onChange={handleFileInput} />
            ) : (
              <>
                <ImageListTitle>{t('reviews.write.images.title')}</ImageListTitle>
                <ImageList>
                  {Object.entries(selectedImages).map((entry, index) => (
                    <ImageListItem key={index}>
                      <span>{entry[1].name}</span>
                      <RemoveImageButton
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveImage(parseInt(entry[0]));
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <AddMoreImagesButton inputProps={getInputProps()} onChange={handleFileInput} />
              </>
            )}
          </div>
        )}
      </Dropzone>
    </ImagesWrapper>
  );
};
