import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CompaniesApiFactory,
  Company,
  CompanyData,
  MediaApiFactory,
  TagsApiFactory,
  useApiFactory,
  useMutationFetch,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { Checkbox, FormGroup } from '@homeproved/shared/feature-forms';
import { FileUpload } from '../file-upload/FileUpload';
import { useForm } from 'react-hook-form';
import { toggledArray } from '@homeproved/shared/util';
import {
  Form,
  Top,
  Title,
  IntroTitle,
  IntroText,
  StyledInput,
  Label,
  InfoAndUploads,
  InfoItem,
  StyledFormGroup,
  LabelsWrapper,
  SaveButton,
} from './Atoms';
import { RefetchOptions, QueryObserverResult } from 'react-query';
import moment from 'moment';

export type LabelsProps = {
  data?: CompanyData;
  isMobile: boolean;
  isTablet: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Company, unknown>>;
  mobileSaveButton?: boolean;
};

export const Labels: FC<LabelsProps> = ({
  data,
  isMobile,
  isTablet,
  refetch,
  mobileSaveButton = false,
}) => {
  const { t } = useTranslation();
  const [resetData, setResetData] = useState(null);
  const [coupledTags, setCoupledTags] = useState<number[]>([]);
  const [enableSave, setEnableSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);
  const tagsApi = useApiFactory(TagsApiFactory);
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const mediaApi = useApiFactory(MediaApiFactory);

  const { query } = useQueryFetch('tags', '/api/tag/company_external');

  const { mutation: companyPatchMutation } = useMutationFetch('companyPatch', (body) =>
    companiesApi.apiCompaniesCompanyPatch(data.id.toString(), body)
  );

  const { mutation: tagsPatchMutation } = useMutationFetch('tagsPatch', (body) =>
    tagsApi.apiTagCouplePost(body)
  );

  const { mutation: mediaMutation } = useMutationFetch('fileUpload', (body) =>
    mediaApi.apiFilePost(body)
  );

  const { mutation: deleteMutation } = useMutationFetch('fileDelete', (body) =>
    mediaApi.apiMediaMediaDelete(body as string)
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      foundedAt: moment(data.foundedAt, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      numEmployees: data.numEmployees,
      governmentNr: data.governmentNr,
    },
  });

  const handlePatch = (companyPatchData) => {
    companyPatchMutation.mutate(
      {
        foundedAt: moment(companyPatchData.foundedAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        numEmployees: companyPatchData.numEmployees,
        governmentNr: companyPatchData.governmentNr,
      },
      { onSuccess: () => refetch().then() }
    );
    tagsPatchMutation.mutate({
      tags: coupledTags,
      modelType: 'company',
      modelId: data.id,
    });
    files.forEach((item, index) => {
      mediaMutation.mutate({
        collection: item.type,
        modelId: data.id,
        modelType: 'company',
        file: item.file,
      });
    });
    deleteFiles.forEach((item, index) => {
      deleteMutation.mutate(item);
      if (deleteFiles.length === index + 1) setDeleteFiles([]);
    });
    setResetData(companyPatchData);
  };

  const handleFileUpload = (file, type) => {
    setEnableSave(true);
    setFiles([...files, { file: file, type: type }]);
  };

  const handleFileDelete = (fileId) => {
    const types = ['iso9001', 'iso14001', 'vca', 'atg'];

    if (types.includes(fileId)) {
      const newArr = files.filter((obj) => obj.type !== fileId);
      setFiles(newArr);
      if (newArr.length === 0 && deleteFiles.length === 0) setEnableSave(false);
    } else {
      setEnableSave(true);
      setDeleteFiles([...deleteFiles, fileId]);
    }
  };

  useEffect(() => {
    if (!data.relations || !data.relations.externalTags) return;
    const result = [];
    data.relations.externalTags.forEach((tag) => {
      result.push(tag.data.id);
    });
    setCoupledTags(result);
  }, [data, setCoupledTags]);

  useEffect(() => {
    if (companyPatchMutation.isSuccess) {
      reset(resetData);
      setEnableSave(false);
    }
  }, [companyPatchMutation.isSuccess, reset, resetData]);

  const handleCheckboxChange = (id) => {
    setCoupledTags(toggledArray(coupledTags, id));
    setEnableSave(true);
  };

  return (
    query.isSuccess && (
      <Form autoComplete={'off'} onSubmit={handleSubmit(handlePatch)}>
        {!mobileSaveButton && (
          <Top>
            <Title>{t('app.pro.pages.profile.yourLabels')}</Title>
            <SaveButton type={'submit'} variant={'gradient'} disabled={!(enableSave || isDirty)}>
              {t('app.pro.pages.profile.save')}
            </SaveButton>
          </Top>
        )}
        <IntroTitle>{t('app.pro.pages.profile.labelsIntroTitle')}</IntroTitle>
        <IntroText>{t('app.pro.pages.profile.labelsIntroText')}</IntroText>
        <InfoAndUploads isMobile={isMobile} isTablet={isTablet}>
          <div>
            <InfoItem isMobile={isMobile} isTablet={isTablet}>
              <Label>{t('app.pro.pages.profile.startDate')}</Label>
              <FormGroup noMargin>
                <StyledInput name={'foundedAt'} ref={register} placeholder={'DD/MM/YYYY'} />
              </FormGroup>
            </InfoItem>
            <InfoItem isMobile={isMobile} isTablet={isTablet}>
              <Label>{t('app.pro.pages.profile.employeesTotal')}</Label>
              <FormGroup noMargin>
                <StyledInput name={'numEmployees'} ref={register} />
              </FormGroup>
            </InfoItem>
            <InfoItem isMobile={isMobile} isTablet={isTablet}>
              <Label>{t('app.pro.pages.profile.govNr')}</Label>
              <FormGroup noMargin>
                <StyledInput name={'governmentNr'} ref={register} />
              </FormGroup>
            </InfoItem>
          </div>
          <div>
            <FileUpload
              label={'VCA'}
              type={'vca'}
              data={data}
              handleFileUpload={handleFileUpload}
              handleFileDelete={handleFileDelete}
            />
            <FileUpload
              label={'ISO 9001'}
              type={'iso9001'}
              data={data}
              handleFileUpload={handleFileUpload}
              handleFileDelete={handleFileDelete}
            />
            <FileUpload
              label={'ISO 14001'}
              type={'iso14001'}
              data={data}
              handleFileUpload={handleFileUpload}
              handleFileDelete={handleFileDelete}
            />
            <FileUpload
              label={'ATG'}
              type={'atg'}
              data={data}
              handleFileUpload={handleFileUpload}
              handleFileDelete={handleFileDelete}
            />
          </div>
        </InfoAndUploads>
        {!!query.data && (
          <>
            <IntroText>{t('app.pro.pages.profile.checkLabels')}</IntroText>
            <LabelsWrapper isMobile={isMobile}>
              {query.data['data'].map((item, index) => {
                return (
                  <StyledFormGroup key={index}>
                    <Checkbox
                      label={item.data.name}
                      onChange={() => handleCheckboxChange(item.data.id)}
                      labelWeight={900}
                      variant={'dark'}
                      value={coupledTags.includes(item.data.id)}
                    />
                  </StyledFormGroup>
                );
              })}
            </LabelsWrapper>
          </>
        )}
        {mobileSaveButton && (
          <SaveButton
            type={'submit'}
            variant={'gradient'}
            disabled={!(enableSave || isDirty)}
            mobileSaveButton={mobileSaveButton}
          >
            {t('app.pro.pages.profile.save')}
          </SaveButton>
        )}
      </Form>
    )
  );
};
