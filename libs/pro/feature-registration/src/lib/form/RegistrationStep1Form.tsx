import React, { FC, useEffect, useState } from 'react';
import { Button, SvgIcon, Icons } from '@homeproved/shared/ui';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyForm, CompanyUserForm } from '@homeproved/shared/feature-company';
import {
  AcceptPolicyField,
  formatMobileNumber,
  FormGroup,
  FormSection,
  processVatInput,
  refineCompanyUserForm,
  RegistrationFormData,
  registrationFormSchema,
  useRegistrationFormData,
} from '@homeproved/shared/feature-forms';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import {
  CompaniesApiFactory,
  CompanyData,
  getErrorMessage,
  Sector,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { ActivityPicker, RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import { prefillForm } from './step1/helpers';
import { ButtonWrapper, Wrapper } from './step1/Atoms';
import { useSnackbar } from 'notistack';
import ReactHtmlParser from 'react-html-parser';
import { useDisclosure } from 'react-use-disclosure';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type RegistrationFormProps = {
  companyById?: CompanyData;
  isMobile: boolean;
};

const AlreadyClaimedWrapper = styled.div`
  margin: 4rem auto;
  max-width: 60rem;
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: #fff;
`;

const AlreadyBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.2;
  z-index: 9;
`;

const AlreadyClaimed = styled.div`
  margin: 4rem auto;
  max-width: 60rem;
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 25vh;
  left: 0;
  right: 0;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin: 3rem auto 0;
  display: table;
`;

const InfoText = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  max-width: 55rem;
  margin: 0 auto;
`;

export const RegistrationStep1Form: FC<RegistrationFormProps> = ({ companyById, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const activityPickerMobile = useMediaQuery(theme.breakpoints.down(700));
  const router = useRouter();
  const { getPath: proGetPath } = useProLocalizedRoutes();
  const { getPath: comGetPath } = useComLocalizedRoutes();
  const { setData: setRegistrationFormData } = useRegistrationFormData();
  const [focusHandled, setFocusHandled] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(refineCompanyUserForm(registrationFormSchema)),
  });
  const policyAccepted = methods.watch('acceptPolicy', false);
  const [allowFormPrefill, setAllowFormPrefill] = useState(true);
  const [prefillRegistrationFormCompleted, setPrefillRegistrationFormCompleted] = useState(false);
  const { data: prefilledRegistrationFormData } = useRegistrationFormData();
  const [existingCompany, setExistingCompany] = useState<CompanyData>();
  const [showAlreadyClaimed, setShowAlreadyClaimed] = useState(false);
  const [claimedPopupShown, setClaimedPopupShown] = useState(false);
  const [companyByIdHandled, setCompanyByIdHandled] = useState(false);

  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('registerCompany', companiesApi.apiAuthRegisterCompanyPost);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (data: RegistrationFormData) => {
    const result = data;

    executeRecaptcha('registration').then(() => {
      result.vat = processVatInput(data.vat);
      setAllowFormPrefill(false);
      setRegistrationFormData({
        ...result,
        mobile: formatMobileNumber(result.mobile),
        sectorIds: selectedSectors,
      });

      mutation.mutate({
        ...result,
        vat: processVatInput(data.vat),
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        mobile: formatMobileNumber(result.mobile),
        sectorIds: selectedSectors,
        companyId: companyById ? companyById.id : null,
      });
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      closeSnackbar();
      router.push(proGetPath('/registration/step2'), undefined, { shallow: true }).then();
    }
    if (mutation.isError) {
      enqueueSnackbar(getErrorMessage(mutation, t), {
        variant: 'error',
      });
    }
  }, [router, proGetPath, mutation, mutation.isSuccess, t, closeSnackbar, enqueueSnackbar]);

  const handleFocusAfterFetchByVat = (company?: CompanyData) => {
    setExistingCompany(company);
    if (!focusHandled) {
      const elementId = company ? 'userFirstName' : 'name';
      document.getElementById(elementId).focus();
    }
    setFocusHandled(true);
  };

  const handleCloseClaimedPopup = (e) => {
    e.stopPropagation();
    setShowAlreadyClaimed(false);
  };

  // Extract setValue method from methods, to be able to pass it as a separate dependency to useEffect
  const setValue = methods.setValue;

  useEffect(() => {
    if (existingCompany) {
      const setValueConfig = { shouldValidate: false, shouldDirty: true };

      setValue('vat', existingCompany.vat, setValueConfig);
      setValue('name', existingCompany.name, setValueConfig);
      setValue('email', existingCompany.email, setValueConfig);
      setValue('phone', existingCompany.phone, setValueConfig);
      setValue('mobile', formatMobileNumber(existingCompany.mobile), setValueConfig);
      setValue('url', existingCompany.url, setValueConfig);
      setValue('userFirstName', existingCompany.relations.user?.data?.firstName, setValueConfig);
      setValue('userLastName', existingCompany.relations.user?.data?.lastName, setValueConfig);
      setValue('userEmail', existingCompany.relations.user?.data?.email, setValueConfig);

      const sectors = [];
      existingCompany.relations.sectors.forEach((sector) =>
        sector.data.descendants.forEach((subsector: Sector) => sectors.push(subsector.data.id))
      );
      setSelectedSectors(sectors);

      if (existingCompany.claimedAt != null && !claimedPopupShown) {
        setClaimedPopupShown(true);
        setShowAlreadyClaimed(true);
      }
    }
  }, [existingCompany, setValue, claimedPopupShown]);

  useEffect(() => {
    if (!!companyById && !companyByIdHandled) {
      setExistingCompany(companyById);
      setCompanyByIdHandled(true);
    }
  }, [companyById, companyByIdHandled]);

  useEffect(() => {
    if (prefilledRegistrationFormData && allowFormPrefill) {
      prefillForm(prefilledRegistrationFormData, methods, setSelectedSectors);
      setPrefillRegistrationFormCompleted(true);
      setAllowFormPrefill(false);
    }
  }, [allowFormPrefill, methods, prefilledRegistrationFormData]);

  return (
    <Wrapper>
      {executeRecaptcha && (
        <>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormProvider {...methods}>
              <FormSection title={t('app.pro.pages.registration.steps.step1.titleAddress')}>
                <CompanyForm
                  onUpdateByCompany={handleFocusAfterFetchByVat}
                  onTavNumberChanged={() => setExistingCompany(undefined)}
                  companyById={companyById}
                  prefillRegistrationFormCompleted={prefillRegistrationFormCompleted}
                />
              </FormSection>
              <FormSection title={t('app.pro.pages.registration.steps.step1.titleUser')}>
                <CompanyUserForm isMobile={isMobile} />
              </FormSection>
              <FormSection title={t('app.com.pages.addCompany.activitiesAndSpecializations')}>
                <ActivityPicker
                  value={selectedSectors}
                  onChange={setSelectedSectors}
                  isMobile={activityPickerMobile}
                  openRequestCategoryModal={onOpenRequestCategoryModal}
                />
              </FormSection>
              <FormGroup>
                <AcceptPolicyField control={methods.control} comGetPath={comGetPath} />
              </FormGroup>
              {showAlreadyClaimed && (
                <AlreadyClaimedWrapper>
                  <AlreadyClaimed>
                    <CloseIcon onClick={(event) => handleCloseClaimedPopup(event)}>
                      <SvgIcon icon={Icons.CROSS} size={1.2} color={'dark'} />
                    </CloseIcon>
                    <InfoText>
                      {ReactHtmlParser(t('app.com.pages.addCompany.claimedCompany'))}
                    </InfoText>
                    <StyledButton
                      target={'_blank'}
                      href={
                        process.env.NEXT_PUBLIC_COM_URL +
                        comGetPath('/company/:slug/reviews', { slug: existingCompany.slug })
                      }
                    >
                      {t('app.com.pages.addCompany.viewProfile')}
                    </StyledButton>
                  </AlreadyClaimed>
                  <AlreadyBackdrop />
                </AlreadyClaimedWrapper>
              )}
              <ButtonWrapper>
                <Button
                  type="submit"
                  size="large"
                  disabled={
                    selectedSectors.length === 0 ||
                    !policyAccepted ||
                    mutation.isLoading ||
                    (existingCompany && existingCompany.claimedAt != null)
                  }
                >
                  {t('shared.form.buttons.next')}
                </Button>
              </ButtonWrapper>
            </FormProvider>
          </form>
          <RequestCategoryModal
            open={isRequestCategoryModalOpen}
            onClose={onCloseRequestCategoryModal}
          />
        </>
      )}
    </Wrapper>
  );
};
