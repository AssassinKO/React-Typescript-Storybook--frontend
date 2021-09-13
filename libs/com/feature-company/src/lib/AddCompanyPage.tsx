import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@homeproved/shared/data-access';
import {
  AddCompanyFormData,
  addCompanyFormSchemaWithObligatedFields,
  formatMobileNumber,
  optionalFieldsCompanyFormSchema,
  refineCompanyUserForm,
} from '@homeproved/shared/feature-forms';
import { Button, Icons, SectionTitle, SteppedContent, SvgIcon } from '@homeproved/shared/ui';
import { CompanyDataForm } from './components/add-company/CompanyDataForm';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useMutationFetch,
  usePersistentData,
} from '@homeproved/shared/data-access';
import { useSnackbar } from 'notistack';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { InfoBanner } from './components/add-company/InfoBanner';
import { useRouter } from 'next/router';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { ActivityPicker, RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { useDisclosure } from 'react-use-disclosure';

const ButtonWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  padding: ${({ mobile }) => (mobile ? '0 0 2rem' : '2rem 0')};
  margin-bottom: 2rem;
`;

const InfoText = styled(({ popup, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  max-width: 55rem;
  margin: ${({ popup }) => (popup ? ' 0 auto' : '6rem auto 0')};
`;

const StyledA = styled.a`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  display: table;
  margin: 2rem auto 0;
  color: inherit;
  text-decoration: underline;

  &:hover,
  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

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

const StyledSectionTitle = styled(({ mobile, ...restProps }) => <SectionTitle {...restProps} />)`
  ${({ mobile }) =>
    mobile &&
    `
    margin-left: -6rem;
    margin-top: 2rem;
    svg{
      margin-top: -2rem;
    }
  `}
`;

const DEFAULT_COUNTRY = 'BE';

export const AddCompanyPage: FC = () => {
  const { t } = useTranslation();
  const { setCompany } = usePersistentData();
  const router = useRouter();
  const { getPath: getComPath } = useComLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('registerCompany', companiesApi.apiAuthRegisterCompanyPost);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [withUserData, setWithUserData] = useState(false);
  const [submitHandled, setSubmitHandled] = useState(false);
  const [focusHandled, setFocusHandled] = useState(false);
  const [existingCompany, setExistingCompany] = useState<CompanyData>(null);
  const [claimedPopupShown, setClaimedPopupShown] = useState(false);
  const methods = useForm<AddCompanyFormData>({
    defaultValues: {
      country: DEFAULT_COUNTRY,
    },
    // update form validation schema when owner-checkbox changes, to prevent hidden fields from stopping form-validation
    resolver: zodResolver(
      withUserData
        ? refineCompanyUserForm(addCompanyFormSchemaWithObligatedFields)
        : refineCompanyUserForm(optionalFieldsCompanyFormSchema)
    ),
  });
  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);
  const isOwner = methods.watch('owner', false);
  const policyAccepted = methods.watch('acceptPolicy', false);

  useEffect(() => {
    setWithUserData(isOwner);
  }, [isOwner]);

  useEffect(() => {
    if (mutation.isSuccess && !submitHandled) {
      if (isOwner) {
        router
          .push(
            `${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/registration/step2')}?id=${
              mutation.data.data.id
            }`
          )
          .then();
      } else {
        setCompany(mutation.data.data);
        closeSnackbar();
        router.push(getComPath('/add-company/confirmation')).then();
        setSubmitHandled(true);
      }
    }
    if (mutation.isError) {
      enqueueSnackbar(getErrorMessage(mutation, t), {
        variant: 'error',
      });
    }
  }, [
    closeSnackbar,
    enqueueSnackbar,
    getComPath,
    getProPath,
    isOwner,
    mutation,
    router,
    setCompany,
    submitHandled,
    t,
  ]);

  const handleFormSubmit = (data) => {
    mutation.mutate({
      ...data,
      mobile: data.mobile ? formatMobileNumber(data.mobile) : undefined,
      sectorIds: selectedSectors,
      companyId: existingCompany ? existingCompany.id : null,
    });
  };

  const updateFormByCompany = (company?: CompanyData) => {
    if (company == null) {
      if (!focusHandled) {
        const elementId = 'name';
        document.getElementById(elementId).focus();
      }
      setFocusHandled(true);
      setExistingCompany(undefined);
      return;
    }
    const newSectors = [];
    company.relations.sectors.forEach((sector) => {
      newSectors.push(sector.data.id);
    });
    setSelectedSectors(newSectors);
    setExistingCompany(company);
  };

  const handleCloseClaimedPopup = (e) => {
    e.stopPropagation();
    setClaimedPopupShown(true);
  };

  return (
    <>
      <StyledSectionTitle
        label={t('app.com.pages.addCompany.title')}
        icon={Icons.HELMET_OUTLINE}
        underlineMobile={true}
        iconSize={4}
        mobile={isMobile}
      />
      <FormProvider {...methods}>
        <Box pl={isMobile ? '2rem' : 0} pr={isMobile ? '2rem' : 0}>
          <form autoComplete="off" onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <SteppedContent step={1} title={t('app.com.pages.addCompany.companyData')}>
              <CompanyDataForm
                defaultCountry={DEFAULT_COUNTRY}
                isMobile={isMobile}
                onUpdateByCompany={updateFormByCompany}
                optionalFields={!withUserData}
                onTavNumberChanged={() => setExistingCompany(undefined)}
              />
            </SteppedContent>
            <SteppedContent
              step={2}
              title={t('app.com.pages.addCompany.activitiesAndSpecializations')}
            >
              <ActivityPicker
                value={selectedSectors}
                onChange={setSelectedSectors}
                isMobile={isMobile}
                openRequestCategoryModal={onOpenRequestCategoryModal}
              />
            </SteppedContent>
            {existingCompany != null &&
              (existingCompany.claimedAt != null && !claimedPopupShown ? (
                <AlreadyClaimedWrapper>
                  <AlreadyClaimed>
                    <CloseIcon onClick={(event) => handleCloseClaimedPopup(event)}>
                      <SvgIcon icon={Icons.CROSS} size={1.2} color={'dark'} />
                    </CloseIcon>
                    <InfoText popup>
                      {ReactHtmlParser(t('app.com.pages.addCompany.claimedCompany'))}
                    </InfoText>
                    <StyledButton
                      href={getComPath('/company/:slug/reviews', { slug: existingCompany.slug })}
                      target={'_blank'}
                    >
                      {t('app.com.pages.addCompany.viewProfile')}
                    </StyledButton>
                  </AlreadyClaimed>
                  <AlreadyBackdrop />
                </AlreadyClaimedWrapper>
              ) : (
                !isOwner && (
                  <>
                    <InfoText>{t('app.com.pages.addCompany.claimCompany')}</InfoText>
                    <Link
                      href={getComPath('/company/:id', { id: existingCompany.id.toString() })}
                      passHref
                    >
                      <StyledA
                        href={getComPath('/company/:id', { id: existingCompany.id.toString() })}
                        target={'_blank'}
                      >
                        {t('app.com.pages.addCompany.viewProfile')}
                      </StyledA>
                    </Link>
                  </>
                )
              ))}
            <ButtonWrapper mobile={isMobile}>
              <Button
                type="submit"
                size="large"
                disabled={
                  selectedSectors.length === 0 ||
                  (existingCompany == null && isOwner && !policyAccepted) ||
                  (existingCompany != null && existingCompany.claimedAt != null) ||
                  (existingCompany != null &&
                    existingCompany.claimedAt == null &&
                    (!isOwner || !policyAccepted))
                }
              >
                {t('shared.form.buttons.addCompany')}
              </Button>
            </ButtonWrapper>
          </form>
        </Box>
        <InfoBanner isMobile={isMobile} />
      </FormProvider>
      <RequestCategoryModal
        open={isRequestCategoryModalOpen}
        onClose={onCloseRequestCategoryModal}
      />
    </>
  );
};
