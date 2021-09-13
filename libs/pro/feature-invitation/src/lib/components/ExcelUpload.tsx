import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import { Icons } from '@homeproved/shared/ui';
import { ErrorMessage } from '@homeproved/shared/feature-forms';
import styled from 'styled-components';
import { Delete, InputWrapper, LabelText, LabelWrapper, Wrapper } from './Atoms';

const StyledErrorMessage = styled(ErrorMessage)`
  position: absolute;
  bottom: 20px;
  width: calc(100% - 2rem);
  text-align: center;
`;

export interface ExcelUploadProps {
  onUpload: (file: unknown) => void;
  onDelete: () => void;
  error?: string | false;
  file: unknown;
}

export const ExcelUpload: FC<ExcelUploadProps> = ({ onUpload, onDelete, error, file }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Dropzone onDrop={(acceptedFiles) => onUpload(acceptedFiles)} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <InputWrapper {...getRootProps()}>
            <input
              {...getInputProps()}
              accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <LabelWrapper>
              <LabelText file={!!file}>
                {file ? file[0].name : t('app.pro.pages.invitation.uploadExcel.uploadButtonText')}
              </LabelText>
            </LabelWrapper>
          </InputWrapper>
        )}
      </Dropzone>
      {!!file && <Delete onClick={onDelete} icon={Icons.DELETE} variant={'white'} />}
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </Wrapper>
  );
};
