import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons, Button, Modal } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import {
  CompaniesApiFactory,
  ReviewsApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useForm } from 'react-hook-form';
import {
  Input,
  Textarea,
  ErrorMessage,
  AcceptPolicyField,
  reportIssueFormSchema,
  ReportIssueFormData,
} from '../../';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useMediaQuery, useTheme } from '@material-ui/core';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type ReportPopupState = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companyId?: string;
  reviewId?: string;
  getPath: GetPathFunction;
  callBack?: () => void;
  isReported?: boolean;
  userData?: UserData;
  isCompany?: boolean;
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 2rem;
`;

const Split = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  width: 100%;
  padding: 1rem 1rem;
  font-size: 1.6rem;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Terms = styled.div`
  width: 100%;
  padding: 0 0.8rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 4rem;
`;

const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    max-width: 300px;
    text-align: center;
  }
`;

export const ReportPopup: FC<ReportPopupState> = ({
  isOpen,
  setOpen,
  companyId,
  reviewId,
  getPath,
  userData,
  callBack,
  isReported,
  isCompany,
}) => {
  const { t } = useTranslation();
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const {
    mutation: { isSuccess, mutate },
  } = useMutationFetch('complaintsPost', (body) => {
    if (companyId) {
      return companiesApi.apiCompaniesCompanyComplaintPost(companyId, body);
    } else {
      return reviewsApi.apiReviewReviewComplaintPost(reviewId, body);
    }
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  const { register, handleSubmit, errors, control, watch } = useForm<ReportIssueFormData>({
    defaultValues: {},
    resolver: !isCompany && zodResolver(reportIssueFormSchema),
  });

  const isTOSAccepted = watch('acceptPolicy', false);

  const onSubmit = (data: ReportIssueFormData) => {
    if (isCompany) {
      mutate({
        email: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        message: data.description,
      });
    } else {
      mutate({
        email: data.email,
        firstName: data.first,
        lastName: data.last,
        message: data.description,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && !isReported) {
      callBack != null && callBack();
    }
  }, [isSuccess, callBack, isReported]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
      title={isSuccess ? t('shared.report.successHeader') : t('shared.report.makeHeader')}
      icon={Icons.FLAG}
      maxWidth={isMobile && window.innerWidth * 0.085}
      paddingBottomMobile={3}
      height="auto"
      centerTitleMobile
      borderRadiusMobile={1}
      width="56rem"
    >
      {!isSuccess && !isReported && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Split>
            <Field>
              <Label>{t('shared.report.form.first')}</Label>
              <Input
                type="text"
                name="first"
                defaultValue={userData?.firstName}
                ref={register}
                disabled={isCompany}
              />
              {errors.first && <ErrorMessage>{t(errors.first.message)}</ErrorMessage>}
            </Field>
            <Field>
              <Label>{t('shared.report.form.last')}</Label>
              <Input
                type="text"
                name="last"
                defaultValue={userData?.lastName}
                ref={register}
                disabled={isCompany}
              />
              {errors.last && <ErrorMessage>{t(errors.last.message)}</ErrorMessage>}
            </Field>
          </Split>
          <Field>
            <Label>{t('shared.report.form.email')}</Label>
            <Input
              type="text"
              name="email"
              defaultValue={userData?.email}
              ref={register}
              disabled={isCompany}
            />
            {errors.email && <ErrorMessage>{t(errors.email.message)}</ErrorMessage>}
          </Field>
          <Field>
            <Label>{t('shared.report.form.description')}</Label>
            <Textarea
              placeholder={t('shared.report.form.descriptionPlaceholder')}
              name="description"
              rowsMin={3}
              ref={register}
            />
            {errors.description && <ErrorMessage>{t(errors.description.message)}</ErrorMessage>}
          </Field>
          {!isCompany && (
            <Terms>
              <AcceptPolicyField control={control} comGetPath={getPath} />
            </Terms>
          )}
          {errors.acceptPolicy && <ErrorMessage>{t(errors.acceptPolicy.message)}</ErrorMessage>}
          <ButtonWrapper>
            <Button
              variant="gradient"
              size="large"
              type="submit"
              disabled={!isTOSAccepted && !isCompany}
            >
              {t('shared.report.form.submit')}
            </Button>
          </ButtonWrapper>
        </Form>
      )}
      {(isSuccess || isReported) && (
        <FlexCenter>
          <SvgIcon icon={Icons.BINOCULARS} size={10} color="gradient" />
          <b>{t('shared.report.success.caption')}</b>
          <span>{t('shared.report.success.subCaption')}</span>
        </FlexCenter>
      )}
    </Modal>
  );
};
