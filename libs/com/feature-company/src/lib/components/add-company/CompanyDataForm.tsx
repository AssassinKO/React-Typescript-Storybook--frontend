import React, { FC } from 'react';
import { AcceptPolicyField, Checkbox, FormGroup } from '@homeproved/shared/feature-forms';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CompanyForm, CompanyUserForm } from '@homeproved/shared/feature-company';
import { WithClientHeight } from '@homeproved/shared/util';
import { CompanyData } from '@homeproved/shared/data-access';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

type CompanyDataFormProps = {
  defaultCountry: string;
  isMobile: boolean;
  onUpdateByCompany: (company: CompanyData) => void;
  optionalFields?: boolean;
  onTavNumberChanged?: () => void;
};

export const CompanyDataForm: FC<CompanyDataFormProps> = ({
  defaultCountry,
  isMobile,
  onUpdateByCompany,
  optionalFields = false,
  onTavNumberChanged,
}) => {
  const { t } = useTranslation();
  const { register, control, watch, errors } = useFormContext();
  const isOwner = watch('owner', false);
  const { getPath } = useLocalizedRoutes();

  return (
    <>
      <input type="hidden" name="country" value={defaultCountry} ref={register} />
      <CompanyForm
        onUpdateByCompany={onUpdateByCompany}
        optionalFields={optionalFields}
        onTavNumberChanged={onTavNumberChanged}
      />
      <FormGroup>
        <Controller
          name="owner"
          control={control}
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox
              label={t('app.com.pages.addCompany.form.ownerCheckbox')}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </FormGroup>
      <WithClientHeight show={isOwner} resetTrigger={errors}>
        <CompanyUserForm isMobile={isMobile} />
        <FormGroup>
          <AcceptPolicyField control={control} comGetPath={getPath} />
        </FormGroup>
      </WithClientHeight>
    </>
  );
};
