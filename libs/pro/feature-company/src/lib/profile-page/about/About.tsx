import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '@homeproved/shared/ui';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useTheme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@homeproved/shared/feature-forms';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

type AboutProps = {
  data: CompanyData;
  mobileSaveButton?: boolean;
};

const Form = styled.form`
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const Top = styled(({ mobileSaveButton, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ mobileSaveButton }) => mobileSaveButton && 'center'};
`;

const Label = styled.div`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const QuillWrapper = styled.div`
  .ql-toolbar,
  .ql-container {
    border: 0 none;
  }
  .ql-toolbar,
  .ql-editor {
    padding-right: 0;
    padding-left: 0;
  }
  .ql-toolbar {
    margin-left: -0.8rem;
  }
  .ql-container {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
  }
  .ql-editor {
    border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
    border: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
    margin-top: 1rem;
    padding: 1.5rem;

    p {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const SaveButton = styled(({ mobileSaveButton, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ mobileSaveButton }) => (mobileSaveButton ? '2rem auto 0' : '0 0 0 auto')};
`;

export const About: FC<AboutProps> = ({ data, mobileSaveButton = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [resetData, setResetData] = useState(null);
  const [quillChanged, setQuillChanged] = useState(false);
  const [quillContent, setQuillContent] = useState('');
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('companyPost', (body) =>
    companiesApi.apiCompaniesCompanyPatch(data.id.toString(), body)
  );
  const { handleSubmit, errors, reset } = useForm({
    defaultValues: {
      about: quillContent,
    },
  });

  const handlePatch = (data) => {
    mutation.mutate(
      {
        about: quillContent,
      },
      {
        onSuccess: () => setQuillChanged(false),
      }
    );
    setResetData(quillContent);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      reset(resetData);
    }
  }, [mutation.isSuccess, reset, resetData]);

  useEffect(() => {
    setQuillContent(data.about);
  }, [setQuillContent, data]);

  const handleQuillChange = (content) => {
    setQuillContent(content);
    if (content !== quillContent && !!content && !!quillContent) setQuillChanged(true);
  };

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  return (
    <Form onSubmit={handleSubmit(handlePatch)}>
      <Top mobileSaveButton={mobileSaveButton}>
        <Label>{`${t('app.pro.pages.profile.about')} ${data.name}`}</Label>
        {!mobileSaveButton && (
          <SaveButton type={'submit'} variant={'gradient'} disabled={!quillChanged}>
            {t('app.pro.pages.profile.save')}
          </SaveButton>
        )}
      </Top>
      <QuillWrapper>
        <ReactQuill
          value={quillContent}
          theme={'snow'}
          modules={modules}
          formats={formats}
          placeholder={t('app.pro.pages.profile.aboutPlaceholder')}
          onChange={(content) => handleQuillChange(content)}
        />
      </QuillWrapper>
      {errors.about && (
        <ErrorMessage color={theme.palette.primary.main}>{t(errors.about.message)}</ErrorMessage>
      )}
      {mobileSaveButton && (
        <SaveButton
          type={'submit'}
          variant={'gradient'}
          disabled={!quillChanged}
          mobileSaveButton={mobileSaveButton}
        >
          {t('app.pro.pages.profile.save')}
        </SaveButton>
      )}
    </Form>
  );
};
