import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { AcceptPolicyField, ErrorMessage, Input } from '@homeproved/shared/feature-forms';
import { useFormContext } from 'react-hook-form';
import { Wrapper, FormFields, Field, Label, Title } from './user-data/Atoms';
import { ReadOnlyHiddenField, ReadOnlyValue } from '../Atoms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type UserDataFormProps = {
  getComPath: GetPathFunction;
  readOnly: boolean;
  isMobile: boolean;
};

export const UserDataForm: FC<UserDataFormProps> = ({ getComPath, readOnly, isMobile }) => {
  const { t } = useTranslation();
  const { register, control, errors, getValues } = useFormContext();
  const baseTranslationKey = 'reviews.write.data';

  return (
    <Wrapper>
      <Title>{t(`${baseTranslationKey}.title`)}</Title>
      <FormFields mobile={isMobile}>
        <Field readOnly={readOnly} mobile={isMobile}>
          <Label readOnly={readOnly}>
            {ReactHtmlParser(
              `${t(`${baseTranslationKey}.firstName`)} ${
                readOnly ? '' : t(`${baseTranslationKey}.notPublic`)
              }`
            )}
          </Label>
          <ReadOnlyHiddenField readOnly={readOnly}>
            <Input name="firstName" ref={register} />
            {errors.firstName && <ErrorMessage>{t(errors.firstName.message)}</ErrorMessage>}
          </ReadOnlyHiddenField>
          {readOnly && <ReadOnlyValue bold>{getValues().firstName}</ReadOnlyValue>}
        </Field>
        <Field readOnly={readOnly} mobile={isMobile}>
          <Label readOnly={readOnly}>
            {ReactHtmlParser(
              `${t(`${baseTranslationKey}.lastName`)} ${
                readOnly ? '' : t(`${baseTranslationKey}.notPublic`)
              }`
            )}
          </Label>
          <ReadOnlyHiddenField readOnly={readOnly}>
            <Input name="lastName" ref={register} />
            {errors.lastName && <ErrorMessage>{t(errors.lastName.message)}</ErrorMessage>}
          </ReadOnlyHiddenField>
          {readOnly && <ReadOnlyValue bold>{getValues().lastName}</ReadOnlyValue>}
        </Field>
        <Field readOnly={readOnly} mobile={isMobile}>
          <Label readOnly={readOnly}>
            {ReactHtmlParser(
              `${t(`${baseTranslationKey}.screenName`)} ${
                readOnly
                  ? t(`${baseTranslationKey}.publicReadOnly`)
                  : t(`${baseTranslationKey}.public`)
              }`
            )}
          </Label>
          <ReadOnlyHiddenField readOnly={readOnly}>
            <Input name="screenName" ref={register} />
            {errors.screenName && <ErrorMessage>{t(errors.screenName.message)}</ErrorMessage>}
          </ReadOnlyHiddenField>
          {readOnly && <ReadOnlyValue bold>{getValues().screenName}</ReadOnlyValue>}
        </Field>
        <Field readOnly={readOnly} mobile={isMobile}>
          <Label readOnly={readOnly}>
            {ReactHtmlParser(
              `${t(`${baseTranslationKey}.email`)} ${
                readOnly ? '' : t(`${baseTranslationKey}.notPublic`)
              }`
            )}
          </Label>
          <ReadOnlyHiddenField readOnly={readOnly}>
            <Input name="email" ref={register} />
            {errors.email && <ErrorMessage>{t(errors.email.message)}</ErrorMessage>}
          </ReadOnlyHiddenField>
          {readOnly && <ReadOnlyValue bold>{getValues().email}</ReadOnlyValue>}
        </Field>
      </FormFields>
      {!readOnly && <AcceptPolicyField comGetPath={getComPath} control={control} />}
    </Wrapper>
  );
};
