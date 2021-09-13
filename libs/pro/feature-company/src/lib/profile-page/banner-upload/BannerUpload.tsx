import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, Icons, ImageCropper } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import {
  CompanyData,
  MediaApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useMediaQuery, useTheme } from '@material-ui/core';

export type BannerUploadProps = {
  isMobile?: boolean;
  data?: CompanyData;
};

type FileReaderResult = string | ArrayBuffer | null;

const Wrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  margin: ${({ isMobile }) => (isMobile ? '-2rem -3rem 0' : '0')};
`;

const Upload = styled(({ file, ...restProps }) => <div {...restProps} />)`
  height: 15rem;
  background-image: ${({ file }) => (file == null ? 'url(/company-banner.png)' : `url(${file})`)};
  background-position: ${({ file }) => (file == null ? 'center bottom' : 'center')};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  image-rendering: -webkit-optimize-contrast;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 3;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 3;
`;

export const BannerUpload: FC<BannerUploadProps> = ({ isMobile, data }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<FileReaderResult>(null);

  const mediaApi = useApiFactory(MediaApiFactory);
  const { mutation: mediaMutation } = useMutationFetch('cover', (body) =>
    mediaApi.apiImageUploadModelIdPost(data.id, body)
  );
  const [showCropzone, setShowCropzone] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (data.cover !== null && data.cover.data.conversions) {
      setFile(data.cover.data.conversions['banner']);
    }
  }, [data, setFile]);

  const handleDropzone = (files) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const banner = e.target && (e.target as FileReader).result;
      setFile(banner);
      setShowCropzone(true);
      mediaMutation.mutate({
        collection: 'cover',
        model: 'company',
        photo: banner,
      });
    };
    reader.readAsDataURL(files[0]);
  };

  const handleCroppedImage = (image) => {
    setShowCropzone(false);
    setFile(image);
    mediaMutation.mutate({
      collection: 'cover',
      model: 'company',
      photo: image,
    });
  };

  return (
    <Wrapper isMobile={isMobile}>
      <Dropzone onDrop={(acceptedFiles) => handleDropzone(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            <Upload file={file}>
              {isMobile ? (
                <StyledIconButton icon={Icons.CAMERA} />
              ) : (
                <StyledButton variant={'dark'} arrow="none" icon={Icons.CAMERA}>
                  {file
                    ? t('app.pro.pages.profile.coverEdit')
                    : t('app.pro.pages.profile.coverUpload')}
                </StyledButton>
              )}
            </Upload>
          </div>
        )}
      </Dropzone>
      <ImageCropper
        open={showCropzone}
        onClose={setShowCropzone}
        image={file}
        onCroppedImage={handleCroppedImage}
        isTablet={isTablet}
        ratio={1156 / 350}
        defaultCropWidth={1156}
      />
    </Wrapper>
  );
};
