import React, { FC, FocusEvent, useState } from 'react';
import {
  ErrorMessage,
  formatMobileNumber,
  FormGroup,
  GooglePlacesAddressAutoComplete,
  Input,
  processVatInput,
  useTavNumberBlur,
} from '@homeproved/shared/feature-forms';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetCompanyByVatHandler } from './GetCompanyByVatHandler';
import { CompanyData } from '@homeproved/shared/data-access';

type CompanyFormProps = {
  onUpdateByCompany?: (company?: CompanyData) => void;
  optionalFields?: boolean;
  companyById?: CompanyData;
  prefillRegistrationFormCompleted?: boolean;
  onTavNumberChanged?: () => void;
};

export const CompanyForm: FC<CompanyFormProps> = ({
  onUpdateByCompany,
  optionalFields = false,
  companyById,
  prefillRegistrationFormCompleted = false,
  onTavNumberChanged,
}) => {
  const { t } = useTranslation();
  const { register, errors, setValue } = useFormContext();
  const [fetchingCompanyByVat, setFetchingCompanyByVat] = useState(false);
  const [fetchCompanyByVatCompleted, setFetchCompanyByVatCompleted] = useState(false);
  const { handleTavNumberBlur, tavNumber, tavNumberIsValid } = useTavNumberBlur();

  const handleCompanyByTav = (company?: CompanyData) => {
    setFetchingCompanyByVat(false);
    if (company == null) {
      if (onUpdateByCompany != null) setTimeout(onUpdateByCompany, 0);
      return;
    }
    updateFormByCompany(company);
    setFetchCompanyByVatCompleted(true);
  };

  const updateFormByCompany = (company: CompanyData) => {
    const setValueConfig = { shouldValidate: true, shouldDirty: true };

    setValue('name', company.name, setValueConfig);
    setValue('street', company.street, setValueConfig);
    setValue('streetNr', company.streetNr, setValueConfig);
    setValue('postalCode', company.postalCode, setValueConfig);
    setValue('city', company.city, setValueConfig);
    setValue('province', company.province, setValueConfig);
    setValue('country', company.country, setValueConfig);
    setValue('latitude', company.latitude, setValueConfig);
    setValue('longitude', company.longitude, setValueConfig);
    setValue('email', company.email, setValueConfig);
    setValue('phone', company.phone, setValueConfig);
    setValue('mobile', formatMobileNumber(company.phone), setValueConfig);
    setValue('url', company.url, setValueConfig);

    if (onUpdateByCompany != null) onUpdateByCompany(company);
  };

  return (
    <>
      {tavNumberIsValid && !fetchCompanyByVatCompleted && (
        <GetCompanyByVatHandler
          vat={processVatInput(tavNumber)}
          onFetching={() => setFetchingCompanyByVat(true)}
          onCompany={handleCompanyByTav}
        />
      )}
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.company.tav')}${optionalFields ? '' : ' *'}`}
          name="vat"
          ref={register}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            if (e.target.value !== tavNumber) setFetchCompanyByVatCompleted(false);
            if (onTavNumberChanged != null) onTavNumberChanged();
            handleTavNumberBlur(e);
          }}
        />
        {errors.vat && (
          <ErrorMessage>{t('shared.form.validation.invalidBelgianVatNumber')}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.company.name')} *`}
          id="name"
          name="name"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.name && <ErrorMessage>{t(errors.name.message)}</ErrorMessage>}
      </FormGroup>

      <GooglePlacesAddressAutoComplete
        updateByVatCompleted={fetchCompanyByVatCompleted}
        companyById={companyById}
        prefillRegistrationFormCompleted={prefillRegistrationFormCompleted}
      />

      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.email')}${optionalFields ? '' : ' *'}`}
          name="email"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.email && <ErrorMessage>{t(errors.email.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.phone')}`}
          name="phone"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.phone && <ErrorMessage>{t(errors.phone.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.mobile')}${optionalFields ? '' : ' *'}`}
          name="mobile"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.mobile && <ErrorMessage>{t(errors.mobile.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={t('shared.form.company.site')}
          name="url"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
      </FormGroup>
    </>
  );
};
