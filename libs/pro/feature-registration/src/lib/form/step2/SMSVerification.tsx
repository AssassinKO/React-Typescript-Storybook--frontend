import React, { FC, useEffect, useState } from 'react';
import { Button } from '@homeproved/shared/ui';
import {
  SendAgainButton,
  VerificationCodeInput,
  VerificationLabel,
  VerificationCodeInputGroup,
  ButtonWrapper,
} from './Atoms';
import {
  RegistrationFormData,
  SMSVerificationFormData,
  smsVerificationFormSchema,
} from '@homeproved/shared/feature-forms';
import { useTranslation } from 'react-i18next';
import { useApiFactory, useMutationFetch, UsersApiFactory } from '@homeproved/shared/data-access';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationResult } from 'react-query';

type SmsVerificationProps = {
  isMobile: boolean;
  registrationFormData: RegistrationFormData;
  onVerificationSuccess: () => void;
  onVerificationError: (error: UseMutationResult) => void;
};

export const SMSVerification: FC<SmsVerificationProps> = ({
  isMobile,
  registrationFormData,
  onVerificationSuccess,
}) => {
  const { t } = useTranslation();
  const translationBaseKey = 'app.pro.pages.registration.steps.step2';
  const [verificationSuccessHandled, setVerificationSuccessHandled] = useState(false);
  const { handleSubmit, register } = useForm<SMSVerificationFormData>({
    resolver: zodResolver(smsVerificationFormSchema),
  });
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation: verifyPhoneMutation } = useMutationFetch(
    'verifyPhone',
    usersApi.apiAuthPhoneVerifyPost
  );
  const { mutation: resendPhoneVerificationMutation } = useMutationFetch(
    'resendPhoneVerification',
    usersApi.apiAuthPhoneVerificationNotificationPost
  );

  const handleSendSMSAgain = () => {
    resendPhoneVerificationMutation.mutate({
      email: registrationFormData.userEmail,
    });
  };

  const handleSubmitForm = (data: SMSVerificationFormData) => {
    verifyPhoneMutation.mutate({
      email: registrationFormData.userEmail,
      code: data.smsCode,
    });
  };

  useEffect(() => {
    if (verifyPhoneMutation.isSuccess && !verificationSuccessHandled) {
      onVerificationSuccess();
      setVerificationSuccessHandled(true);
    }
  }, [onVerificationSuccess, verificationSuccessHandled, verifyPhoneMutation.isSuccess]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <VerificationCodeInputGroup>
        <VerificationLabel>{t(`${translationBaseKey}.sms.verificationCode`)}</VerificationLabel>
        <VerificationCodeInput name="smsCode" ref={register} />
      </VerificationCodeInputGroup>
      <SendAgainButton variant="text" onClick={handleSendSMSAgain}>
        {isMobile ? t(`${translationBaseKey}.sendSMSAgain`) : t(`${translationBaseKey}.sendAgain`)}
      </SendAgainButton>
      <ButtonWrapper>
        <Button type="submit" size="large">
          {t(`${translationBaseKey}.submitBtn`)}
        </Button>
      </ButtonWrapper>
    </form>
  );
};
