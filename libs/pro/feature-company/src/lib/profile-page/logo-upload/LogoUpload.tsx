import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Icons, ImageCropper } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {
  CompanyData,
  MediaApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { CompanyLogoContext } from '@homeproved/pro/feature-dashboard-shell';
import { useMediaQuery, useTheme } from '@material-ui/core';

type FileReaderResult = string | ArrayBuffer | null;

type LogoUploadProps = {
  data?: CompanyData;
};

const Upload = styled(({ file, ...restProps }) => <div {...restProps} />)`
  margin: 0 auto 2rem;
  padding: 2rem;
  max-width: 15rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  border: 0.2rem solid ${({ theme }) => theme.palette.grey['A400']};
`;

const Image = styled(({ file, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  padding-bottom: 100%;
  background-image: ${({ file }) => (file == null ? 'url(/logo-default@2x.png)' : `url(${file})`)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${({ file }) => (file == null ? '' : 'contain')};
  image-rendering: -webkit-optimize-contrast;
`;

const StyledButton = styled(Button)`
  display: table;
  margin: 0 auto 2rem;
`;

export const LogoUpload: FC<LogoUploadProps> = ({ data }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<FileReaderResult>(null);
  const newLogo = useContext(CompanyLogoContext);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const mediaApi = useApiFactory(MediaApiFactory);
  const { mutation: mediaMutation } = useMutationFetch('cover', (body) =>
    mediaApi.apiImageUploadModelIdPost(data.id, body)
  );

  const [showCropzone, setShowCropzone] = useState(false);

  useEffect(() => {
    if (data.logo !== null) {
      setFile(data.logo.data.conversions['square-l']);
    }
  }, [data, setFile]);

  const handleDropzone = (files, data: CompanyData) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const logo = e.target && (e.target as FileReader).result;
      setFile(logo);
      setShowCropzone(true);
      newLogo.setNewLogoSrc(logo as string);
      mediaMutation.mutate({
        collection: 'logo',
        model: 'company',
        photo: logo,
      });
    };
    reader.readAsDataURL(files[0]);
  };

  const handleCroppedImage = (image) => {
    setShowCropzone(false);
    setFile(image);
    newLogo.setNewLogoSrc(image);
    mediaMutation.mutate({
      collection: 'logo',
      model: 'company',
      photo: image,
    });
  };

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleDropzone(acceptedFiles, data)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <StyledButton variant={'dark'} arrow="none" icon={Icons.CAMERA}>
              {file ? t('app.pro.pages.profile.logoEdit') : t('app.pro.pages.profile.logoUpload')}
            </StyledButton>
            <input {...getInputProps()} accept="image/*" />
            <Upload file={file}>
              <Image file={file} />
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
        ratio={1 / 1}
        defaultCropWidth={150}
      />
    </>
  );
};
