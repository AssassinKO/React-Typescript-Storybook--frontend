import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LogoUpload } from '../logo-upload/LogoUpload';
import { SvgIcon, Icons, Button } from '@homeproved/shared/ui';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import {
  companyGeneralInfoFormSchema,
  ErrorMessage,
  FormGroup,
  GooglePlacesAddressAutoComplete,
  Input,
} from '@homeproved/shared/feature-forms';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@material-ui/core';

export type GeneralInfoProps = {
  data: CompanyData;
  isMobile?: boolean;
};

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const CompanyName = styled.div`
  display: table;
  margin: 2rem auto;
  padding: 0 2rem 0.5rem;
  text-align: center;
  border-bottom: 0.1rem solid;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-left: 0.5rem;
`;

const SaveButton = styled(Button)`
  display: table;
  margin: 3rem auto 0;
`;

const StyledInput = styled(Input)`
  border-color: ${({ theme }) => theme.palette.grey['A200']};
  max-height: 3rem;
  font-size: 1.2rem;
`;

const VatNumber = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 2rem;
`;

export const GeneralInfo: FC<GeneralInfoProps> = ({ data, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [resetData, setResetData] = useState(null);
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('companyPatch', (body) =>
    companiesApi.apiCompaniesCompanyPatch(data.id.toString(), body)
  );
  const methods = useForm({
    defaultValues: {
      phone: data.phone,
      email: data.email,
      url: data.url,
    },
    resolver: zodResolver(companyGeneralInfoFormSchema),
  });

  const handlePatch = (data) => {
    mutation.mutate(data);
    setResetData(data);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      methods.reset(resetData);
    }
  }, [mutation.isSuccess, methods, resetData]);

  return (
    <Wrapper>
      <LogoUpload data={data} />
      <CompanyName>{data.name}</CompanyName>
      <form onSubmit={methods.handleSubmit(handlePatch)} autoComplete={'off'}>
        <FormProvider {...methods}>
          <div>
            <Label>
              <SvgIcon icon={Icons.PHONE} size={1.5} />
              <Title>{t('app.pro.pages.profile.phone')}</Title>
            </Label>
            <FormGroup>
              <StyledInput name={'phone'} ref={methods.register} />
              {methods.errors.phone && (
                <ErrorMessage color={theme.palette.primary.main}>
                  {t(methods.errors.phone.message)}
                </ErrorMessage>
              )}
            </FormGroup>
          </div>
          <div>
            <Label>
              <SvgIcon icon={Icons.EMAIL} size={1.5} />
              <Title>{t('app.pro.pages.profile.email')}</Title>
            </Label>
            <FormGroup>
              <StyledInput name={'email'} ref={methods.register} />
              {methods.errors.email && (
                <ErrorMessage color={theme.palette.primary.main}>
                  {t(methods.errors.email.message)}
                </ErrorMessage>
              )}
            </FormGroup>
          </div>
          <div>
            <Label>
              <SvgIcon icon={Icons.LOCATION_OUTLINE} size={1.5} />
              <Title>{t('app.pro.pages.profile.adress')}</Title>
            </Label>
            <GooglePlacesAddressAutoComplete
              updateByVatCompleted={false}
              companyById={data}
              variant={'small'}
            />
          </div>
          <div>
            <Label>
              <SvgIcon icon={Icons.GLOBE} size={1.5} />
              <Title>{t('app.pro.pages.profile.website')}</Title>
            </Label>
            <FormGroup>
              <StyledInput name={'url'} ref={methods.register} />
              {methods.errors.url && (
                <ErrorMessage color={theme.palette.primary.main}>
                  {t(methods.errors.url.message)}
                </ErrorMessage>
              )}
            </FormGroup>
          </div>
          <div>
            <Label>
              <SvgIcon icon={Icons.GOVERNMENT} size={1.5} />
              <Title>{t('app.pro.pages.profile.vatNumber')}</Title>
            </Label>
            <VatNumber>{data.vat}</VatNumber>
          </div>
          <SaveButton type={'submit'} variant={'gradient'} disabled={!methods.formState.isDirty}>
            {t('app.pro.pages.profile.save')}
          </SaveButton>
        </FormProvider>
      </form>
    </Wrapper>
  );
};
