import React, { FC, FocusEvent, useState } from 'react';
import {
  ErrorMessage,
  FormGroup,
  GooglePlacesAddressAutoComplete,
  Input,
  useTavNumberBlur,
} from '@homeproved/shared/feature-forms';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { CompanyData } from '@homeproved/shared/data-access';
import { GetCompanyByVatHandler } from './GetCompanyByVatHandler';

type CompanyBillingFormProps = {
  isMobile: boolean;
  onUpdateByCompany?: (company: CompanyData) => void;
};

export const CompanyBillingForm: FC<CompanyBillingFormProps> = ({
  isMobile,
  onUpdateByCompany,
}) => {
  const { t } = useTranslation();
  const { register, errors, setValue } = useFormContext();
  const [fetchingCompanyByVat, setFetchingCompanyByVat] = useState(false);
  const [fetchCompanyByVatCompleted, setFetchCompanyByVatCompleted] = useState(false);
  const { handleTavNumberBlur, tavNumber, tavNumberIsValid } = useTavNumberBlur();

  const handleCompanyByTav = (company?: CompanyData) => {
    setFetchingCompanyByVat(false);
    setFetchCompanyByVatCompleted(true);
    if (company == null) return;
    updateFormByCompany(company);
  };

  const updateFormByCompany = (company: CompanyData) => {
    const setValueConfig = { shouldValidate: true, shouldDirty: true };

    setValue('billingName', company.name, setValueConfig);
    setValue('billingStreet', company.street, setValueConfig);
    setValue('billingStreetNr', company.streetNr, setValueConfig);
    setValue('billingPostalCode', company.postalCode, setValueConfig);
    setValue('billingCity', company.city, setValueConfig);
    setValue('billingCountry', company.country, setValueConfig);
    setValue('billingEmail', company.email, setValueConfig);
    setValue('billingPhone', company.phone, setValueConfig);

    if (onUpdateByCompany != null) onUpdateByCompany(company);
  };

  return (
    <>
      {tavNumberIsValid && !fetchCompanyByVatCompleted && (
        <GetCompanyByVatHandler
          vat={tavNumber}
          onFetching={() => setFetchingCompanyByVat(true)}
          onCompany={handleCompanyByTav}
        />
      )}
      <FormGroup>
        <input type="hidden" name="billingCountry" value="BE" ref={register} />
        <Input
          placeholder={`${t('shared.form.company.tav')} *`}
          name="billingVat"
          ref={register}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            if (e.target.value !== tavNumber) setFetchCompanyByVatCompleted(false);
            handleTavNumberBlur(e);
          }}
        />
        {errors.billingVat && (
          <ErrorMessage>{t('shared.form.validation.invalidBelgianVatNumber')}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.company.name')} *`}
          name="billingName"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.billingName && <ErrorMessage>{t(errors.billingName.message)}</ErrorMessage>}
      </FormGroup>

      <GooglePlacesAddressAutoComplete
        updateByVatCompleted={fetchCompanyByVatCompleted}
        fieldPrefix="billing"
      />

      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.email')} *`}
          name="billingEmail"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.billingEmail && <ErrorMessage>{t(errors.billingEmail.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.phone')} *`}
          name="billingPhone"
          ref={register}
          disabled={fetchingCompanyByVat}
        />
        {errors.billingPhone && <ErrorMessage>{t(errors.billingPhone.message)}</ErrorMessage>}
      </FormGroup>
    </>
  );
};
