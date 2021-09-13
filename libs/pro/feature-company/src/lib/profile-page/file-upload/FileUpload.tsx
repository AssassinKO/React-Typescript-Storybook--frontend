import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormGroup } from '@homeproved/shared/feature-forms';
import Dropzone from 'react-dropzone';
import { Button, SvgIcon, Icons } from '@homeproved/shared/ui';
import { CompanyData } from '@homeproved/shared/data-access';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type FileReaderResult = string | ArrayBuffer | null;

export interface FileUploadProps {
  label?: string;
  type: 'iso9001' | 'iso14001' | 'vca' | 'atg';
  data: CompanyData;
  handleFileUpload?: (file: FileReaderResult, type: string) => void;
  handleFileDelete?: (fileId: string) => void;
}

const Wrapper = styled(FormGroup)`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  justify-content: flex-start;
`;

const Label = styled.div`
  margin-right: 1rem;
  font-weight: 900;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  flex: 0 0 25%;
`;

const FileUploaded = styled.div`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  display: flex;
  width: 75%;
`;

const FileName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 90%;
  min-height: 2.4rem;
  white-space: nowrap;
`;

const UploadButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
`;

const DeleteIcon = styled(SvgIcon)`
  cursor: pointer;
  margin-left: 0.5rem;
`;

export const FileUpload: FC<FileUploadProps> = ({
  label = '',
  data,
  type,
  handleFileUpload,
  handleFileDelete,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [file, setFile] = useState<FileReaderResult>(null);
  const [fileName, setFileName] = useState<FileReaderResult>('');

  const handleDropzone = (files, data: CompanyData) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      setFileName(files[0].name);
      setFile(e.target && (e.target as FileReader).result);
      handleFileUpload(e.target && (e.target as FileReader).result, type);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleDelete = () => {
    setFile(null);
    setFileName('');
    if (data[type]) {
      handleFileDelete(data[type].data.id.toString());
    } else {
      handleFileDelete(type);
    }
  };

  useEffect(() => {
    if (!data[type]) return;
    setFile(data[type].data.original);
    setFileName(data[type].data.fileName);
  }, [data, type, setFile, setFileName]);

  return (
    <Wrapper noMargin>
      {label !== '' && <Label>{label}</Label>}
      {!file ? (
        <Dropzone onDrop={(acceptedFiles) => handleDropzone(acceptedFiles, data)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <UploadButton variant={'dark'} arrow={'none'}>
                {t('app.pro.pages.profile.upload')}
              </UploadButton>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      ) : (
        <FileUploaded>
          <FileName>{fileName}</FileName>
          <span onClick={handleDelete}>
            <DeleteIcon icon={Icons.CROSS} color={theme.palette.primary.main} size={0.8} />
          </span>
        </FileUploaded>
      )}
    </Wrapper>
  );
};
