import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { SvgIcon, Icons, Button } from '@homeproved/shared/ui';
import {
  companySocialsFormSchema,
  ErrorMessage,
  FormGroup,
  Input,
} from '@homeproved/shared/feature-forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@material-ui/core';

export interface SocialMediaProps {
  data: CompanyData;
  isTablet?: boolean;
  mobileSaveButton?: boolean;
}

const Form = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const Top = styled(({ mobileSaveButton, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin-bottom: 2rem;
  justify-content: ${({ mobileSaveButton }) => mobileSaveButton && 'center'};
`;

const Media = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Label = styled.div`
  flex-basis: 10rem;
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledFormGroup = styled(({ isTablet, ...restProps }) => <FormGroup {...restProps} />)`
  flex: ${({ isTablet }) => (isTablet ? '1 0 100%' : '1')};
  margin: ${({ isTablet }) => (isTablet ? '1rem 0 1rem' : '0 0 0 3rem')};
`;

const StyledInput = styled(Input)`
  border-color: ${({ theme }) => theme.palette.grey['A200']};
  max-height: 3rem;
  font-size: 1.2rem;
  margin-bottom: 0;
`;

const SaveButton = styled(({ mobileSaveButton, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ mobileSaveButton }) => (mobileSaveButton ? '2rem auto 0' : '0 0 0 auto')};
`;

export const SocialMedia: FC<SocialMediaProps> = ({
  data,
  isTablet = false,
  mobileSaveButton = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [resetData, setResetData] = useState(null);
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('companyPost', (body) =>
    companiesApi.apiCompaniesCompanyPatch(data.id.toString(), body)
  );
  const {
    handleSubmit,
    register,
    errors,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      facebook: data.facebook,
      linkedin: data.linkedin,
      twitter: data.twitter,
      instagram: data.instagram,
      whatsapp: data.whatsapp,
    },
    resolver: zodResolver(companySocialsFormSchema),
  });

  const handlePatch = (data) => {
    mutation.mutate(data);
    setResetData(data);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      reset(resetData);
    }
  }, [mutation.isSuccess, reset, resetData]);

  return (
    <Form onSubmit={handleSubmit(handlePatch)} autoComplete={'off'}>
      <Top mobileSaveButton={mobileSaveButton}>
        <Title>{t('app.pro.pages.profile.yourSocials')}</Title>
        {!mobileSaveButton && (
          <SaveButton type={'submit'} variant={'gradient'} disabled={!isDirty}>
            {t('app.pro.pages.profile.save')}
          </SaveButton>
        )}
      </Top>
      <Media>
        <SvgIcon icon={Icons.FACEBOOK} size={2} />
        <Label>{'Facebook'}</Label>
        <StyledFormGroup noMargin isTablet={isTablet}>
          <StyledInput name={'facebook'} ref={register} />
          {errors.facebook && (
            <ErrorMessage color={theme.palette.primary.main}>
              {t(errors.facebook.message)}
            </ErrorMessage>
          )}
        </StyledFormGroup>
      </Media>
      <Media>
        <SvgIcon icon={Icons.LINKEDIN} size={2} />
        <Label>{'LinkedIn'}</Label>
        <StyledFormGroup noMargin isTablet={isTablet}>
          <StyledInput name={'linkedin'} ref={register} />
          {errors.linkedin && (
            <ErrorMessage color={theme.palette.primary.main}>
              {t(errors.linkedin.message)}
            </ErrorMessage>
          )}
        </StyledFormGroup>
      </Media>
      <Media>
        <SvgIcon icon={Icons.TWITTER} size={2} />
        <Label>{'Twitter'}</Label>
        <StyledFormGroup noMargin isTablet={isTablet}>
          <StyledInput name={'twitter'} ref={register} />
          {errors.twitter && (
            <ErrorMessage color={theme.palette.primary.main}>
              {t(errors.twitter.message)}
            </ErrorMessage>
          )}
        </StyledFormGroup>
      </Media>
      <Media>
        <SvgIcon icon={Icons.INSTAGRAM} size={2} />
        <Label>{'Instagram'}</Label>
        <StyledFormGroup noMargin isTablet={isTablet}>
          <StyledInput name={'instagram'} ref={register} />
          {errors.instagram && (
            <ErrorMessage color={theme.palette.primary.main}>
              {t(errors.instagram.message)}
            </ErrorMessage>
          )}
        </StyledFormGroup>
      </Media>
      <Media>
        <SvgIcon icon={Icons.WHATSAPP} size={2} />
        <Label>{'WhatsApp'}</Label>
        <StyledFormGroup noMargin isTablet={isTablet}>
          <StyledInput name={'whatsapp'} ref={register} />
          {errors.whatsapp && (
            <ErrorMessage color={theme.palette.primary.main}>
              {t(errors.whatsapp.message)}
            </ErrorMessage>
          )}
        </StyledFormGroup>
      </Media>
      {mobileSaveButton && (
        <SaveButton
          type={'submit'}
          variant={'gradient'}
          disabled={!isDirty}
          mobileSaveButton={mobileSaveButton}
        >
          {t('app.pro.pages.profile.save')}
        </SaveButton>
      )}
    </Form>
  );
};
