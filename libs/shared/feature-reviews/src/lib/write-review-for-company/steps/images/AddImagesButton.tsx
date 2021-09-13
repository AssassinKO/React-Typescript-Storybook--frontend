import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropzoneInputProps } from 'react-dropzone';

type AddImagesButtonProps = {
  inputProps: DropzoneInputProps;
  onChange: (files: FileList) => void;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  margin-left: 1rem;
  text-decoration: underline;
  cursor: pointer;

  ${Wrapper}:hover & {
    color: black;
  }
`;

export const AddImagesButton: FC<AddImagesButtonProps> = ({ inputProps, onChange }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <SvgIcon viewBox="0 0 28.703 22.04">
        <defs>
          <linearGradient id="a" y1=".5" x2="1" y2=".5" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#e31e4d" />
            <stop offset="1" stopColor="#ee8b3e" />
          </linearGradient>
        </defs>
        <path
          d="M26.49 22.04H2.213A2.213 2.213 0 010 19.827V2.213A2.213 2.213 0 012.213 0H26.49a2.213 2.213 0 012.21 2.213v17.614a2.221 2.221 0 01-2.21 2.213zM2.213 1.118a1.1 1.1 0 00-1.1 1.1v17.609a1.1 1.1 0 001.1 1.1H26.49a1.1 1.1 0 001.08-1.1V2.213a1.1 1.1 0 00-1.1-1.1z"
          fill="#3a3a3a"
        />
        <path
          d="M2.213 22.041a.551.551 0 01-.322-.1.559.559 0 01-.138-.766l8.363-12.177a.559.559 0 01.452-.245.528.528 0 01.459.23l4.235 5.8 2.742-2.68a.513.513 0 01.375-.161.559.559 0 01.4.184l8.125 8.975a.559.559 0 01-.038.766.567.567 0 01-.766-.038l-7.72-8.524-2.787 2.732a.536.536 0 01-.437.161.582.582 0 01-.406-.23l-4.151-5.69-7.918 11.487a.551.551 0 01-.467.276z"
          fill="#3a3a3a"
        />
        <path
          d="M26.2 11.27a2.65 2.65 0 111.893-.765 2.65 2.65 0 01-1.893.765zm0-4.181a1.532 1.532 0 101.531 1.531A1.532 1.532 0 0026.2 7.088z"
          transform="translate(-5.522 -1.398)"
          fill="url(#a)"
        />
      </SvgIcon>
      <Label htmlFor="fileInput">{t('reviews.write.description.addImages')}</Label>
      <input {...inputProps} onChange={(e) => onChange(e.target.files)} />
    </Wrapper>
  );
};
