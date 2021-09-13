import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Button } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  VerificationCodeFormData,
  verificationCodeFormSchema,
} from '@homeproved/shared/feature-forms';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CodeVerification,
  ReviewsApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';

type VerificationProps = {
  reviewId: string;
  email: string;
  onSuccess: () => void;
};

const Wrapper = styled.div`
  padding: 2rem 4rem;
  background: white;
  border-radius: 0.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const CodeForm = styled.form`
  margin: 3rem 0 2rem 0;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const InputFields = styled.div`
  display: flex;
  width: 22rem;
  margin: 2rem auto;
  justify-content: space-between;

  & > input {
    width: 4.25rem;
    height: 6rem;
    background: ${({ theme }) => theme.palette.grey['A200']};
    border-radius: 0.5rem;
    border: none;
    font-family: ${({ theme }) => theme.config.fonts.Cabrito};
    font-size: 2.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.text.primary};
    text-align: center;
    padding: 0;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const Verification: FC<VerificationProps> = ({ reviewId, email, onSuccess }) => {
  const { t } = useTranslation();
  const translationBaseKey = 'reviews.write.verification';
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [initialFocusGiven, setInitialFocusGiven] = useState(false);
  const [successHandled, setSuccessHandled] = useState(false);
  const { handleSubmit, register, getValues } = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeFormSchema),
  });

  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { mutation: verifyReviewMutation } = useMutationFetch(
    'verifyReviewByCode',
    (body: CodeVerification) => reviewsApi.apiReviewReviewVerifyPost(reviewId, body)
  );

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('code_1') != null && !initialFocusGiven && open) {
        document.getElementById('code_1').focus();
        setInitialFocusGiven(true);
      }
    }, 0);
  }, [initialFocusGiven, open]);

  const handleCodeSubmit = (data: VerificationCodeFormData) => {
    verifyReviewMutation.mutate({
      email,
      code: `${data.code_1}${data.code_2}${data.code_3}${data.code_4}`,
    });
  };

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (verifyReviewMutation.isError) verifyReviewMutation.reset();

    if (
      getValues().code_1 !== '' &&
      getValues().code_2 !== '' &&
      getValues().code_3 !== '' &&
      getValues().code_4 !== ''
    ) {
      setSubmitEnabled(true);
      document.getElementById('submitBtn').focus();
    } else {
      const fieldNumber: number = parseInt(e.target['name'].split('_')[1]);
      const nextFieldNumber: number = fieldNumber === 4 ? 1 : fieldNumber + 1;
      document.getElementById(`code_${nextFieldNumber}`).focus();
    }
  };

  useEffect(() => {
    if (verifyReviewMutation.isSuccess && !successHandled) {
      setSuccessHandled(true);
      onSuccess();
    }
  }, [onSuccess, successHandled, verifyReviewMutation.isSuccess]);

  return (
    <Wrapper>
      <h3>{t(`${translationBaseKey}.title`)}</h3>
      <Description>
        {ReactHtmlParser(t(`${translationBaseKey}.description`).replace('%EMAIL%', email))}
      </Description>
      <CodeForm onSubmit={handleSubmit(handleCodeSubmit)}>
        <Label>{ReactHtmlParser(t(`${translationBaseKey}.code`))}</Label>
        <InputFields>
          <input
            type="number"
            id="code_1"
            name="code_1"
            min={0}
            max={9}
            maxLength={1}
            ref={register}
            onChange={handleChangeInput}
          />
          <input
            type="number"
            id="code_2"
            name="code_2"
            min={0}
            max={9}
            maxLength={1}
            ref={register}
            onChange={handleChangeInput}
          />
          <input
            type="number"
            id="code_3"
            name="code_3"
            min={0}
            max={9}
            maxLength={1}
            ref={register}
            onChange={handleChangeInput}
          />
          <input
            type="number"
            id="code_4"
            name="code_4"
            min={0}
            max={9}
            maxLength={1}
            ref={register}
            onChange={handleChangeInput}
          />
        </InputFields>
        {verifyReviewMutation.isError && (
          <ErrorMessage>{t(`${translationBaseKey}.validateError`)}</ErrorMessage>
        )}
        <Button id="submitBtn" size="large" type="submit" disabled={!submitEnabled}>
          {t(`${translationBaseKey}.validateBtn`)}
        </Button>
      </CodeForm>
    </Wrapper>
  );
};
