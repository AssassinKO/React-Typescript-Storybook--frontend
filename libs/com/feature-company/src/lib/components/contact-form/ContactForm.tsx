import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CompaniesApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { Button } from '@homeproved/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AcceptPolicyField,
  CompanyContactFormData,
  companyContactSchema,
  ErrorMessage,
  Input,
  Textarea,
} from '@homeproved/shared/feature-forms';
import { useSnackbar } from 'notistack';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import {
  ButtonWrapper,
  Field,
  FieldWrapper,
  FieldWrapperThirdSplit,
  Form,
  Label,
  TOSWrapper,
  SuccessMessage,
  SuccessMessageText,
} from './Atoms';

export type ContactFormProps = {
  slug: string;
  isTablet: boolean;
};

export const ContactForm: FC<ContactFormProps> = ({ slug, isTablet }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('companyContactPost', (body) =>
    companiesApi.apiCompaniesCompanyContactPost(slug, body)
  );

  const { register, handleSubmit, errors, control, watch } = useForm<CompanyContactFormData>({
    defaultValues: {},
    resolver: zodResolver(companyContactSchema),
  });

  const isTOSAccepted = watch('acceptPolicy', false);

  const onSubmitRequest = (data: CompanyContactFormData) => {
    mutation.mutate({
      city: data.city,
      email: data.email,
      name: data.name,
      phone: data.phone,
      postalCode: data.postal,
      street: data.street,
      streetNr: data.number,
      message: data.description,
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      closeSnackbar();
      enqueueSnackbar(t('app.com.pages.company.contact_form.success'), {
        variant: 'success',
      });
    }
    if (mutation.isError) {
      enqueueSnackbar(t('app.com.pages.company.contact_form.error'), {
        variant: 'error',
      });
    }
  }, [closeSnackbar, enqueueSnackbar, mutation.isError, mutation.isSuccess, t]);
  return (
    <Form tablet={isTablet} onSubmit={handleSubmit(onSubmitRequest)}>
      {mutation.isSuccess && (
        <SuccessMessage>
          <SuccessMessageText>
            {t('app.com.pages.company.contact_form.successMessage')}
          </SuccessMessageText>
        </SuccessMessage>
      )}
      <FieldWrapper>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.message')}</Label>
          <Textarea
            placeholder={t('app.com.pages.company.contact_form.messagePlaceholder')}
            name="description"
            ref={register}
          />
          {errors.description && <ErrorMessage>{t(errors.description.message)}</ErrorMessage>}
        </Field>
      </FieldWrapper>
      <FieldWrapper>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.name')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.namePlaceholder')}
            name="name"
            ref={register}
          />
          {errors.name && <ErrorMessage>{t(errors.name.message)}</ErrorMessage>}
        </Field>
      </FieldWrapper>
      <FieldWrapper>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.street')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.streetPlaceholder')}
            name="street"
            ref={register}
          />
          {errors.street && <ErrorMessage>{t(errors.street.message)}</ErrorMessage>}
        </Field>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.number')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.numberPlaceholder')}
            name="number"
            ref={register}
          />
          {errors.number && <ErrorMessage>{t(errors.number.message)}</ErrorMessage>}
        </Field>
      </FieldWrapper>
      <FieldWrapperThirdSplit>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.postal')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.postPlaceholder')}
            name="postal"
            ref={register}
          />
          {errors.postal && <ErrorMessage>{t(errors.postal.message)}</ErrorMessage>}
        </Field>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.city')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.cityPlaceholder')}
            name="city"
            ref={register}
          />
          {errors.city && <ErrorMessage>{t(errors.city.message)}</ErrorMessage>}
        </Field>
      </FieldWrapperThirdSplit>
      <FieldWrapper>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.email')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.emailPlaceholder')}
            name="email"
            ref={register}
          />
          {errors.email && <ErrorMessage>{t(errors.email.message)}</ErrorMessage>}
        </Field>
        <Field tablet={isTablet}>
          <Label>{t('app.com.pages.company.contact_form.phone')}</Label>
          <Input
            placeholder={t('app.com.pages.company.contact_form.phonePlaceholder')}
            name="phone"
            ref={register}
          />
          {errors.phone && <ErrorMessage>{t(errors.phone.message)}</ErrorMessage>}
        </Field>
      </FieldWrapper>
      <TOSWrapper>
        <AcceptPolicyField control={control} comGetPath={getPath} />
      </TOSWrapper>
      <ButtonWrapper isTablet={isTablet}>
        <Button type="submit" size="large" disabled={!isTOSAccepted}>
          {t('app.com.pages.company.contact_form.send')}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};
