import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, FormGroup, Input } from '@homeproved/shared/feature-forms';
import { useFormContext } from 'react-hook-form';

type CompanyUserFormProps = {
  isMobile: boolean;
};

export const CompanyUserForm: FC<CompanyUserFormProps> = ({ isMobile }) => {
  const { t } = useTranslation();
  const { register, errors } = useFormContext();

  return (
    <>
      <FormGroup horizontal={!isMobile}>
        <FormGroup noMargin={!isMobile}>
          <Input
            placeholder={`${t('shared.form.user.firstName')} *`}
            id="userFirstName"
            name="userFirstName"
            ref={register}
          />
          {errors.userFirstName && <ErrorMessage>{t(errors.userFirstName.message)}</ErrorMessage>}
        </FormGroup>
        <FormGroup noMargin>
          <Input
            placeholder={`${t('shared.form.user.lastName')} *`}
            name="userLastName"
            ref={register}
          />
          {errors.userLastName && <ErrorMessage>{t(errors.userLastName.message)}</ErrorMessage>}
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.email')} *`}
          name="userEmail"
          ref={register}
          autoComplete="new-email"
        />
        {errors.userEmail && <ErrorMessage>{t(errors.userEmail.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.password')} *`}
          name="userPassword"
          ref={register}
          type="password"
          autoComplete="new-password"
        />
        {errors.userPassword && <ErrorMessage>{t(errors.userPassword.message)}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Input
          placeholder={`${t('shared.form.user.passwordConfirm')} *`}
          name="userPasswordConfirmation"
          ref={register}
          type="password"
          autoComplete="new-password"
        />
        {errors.userPasswordConfirmation && (
          <ErrorMessage>{t(errors.userPasswordConfirmation.message)}</ErrorMessage>
        )}
      </FormGroup>
    </>
  );
};
