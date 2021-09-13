import React, { FC } from 'react';
import { SendAgainButton, SendAgainConfirmation } from './Atoms';
import { RegistrationFormData } from '@homeproved/shared/feature-forms';
import { useTranslation } from 'react-i18next';
import { useApiFactory, useMutationFetch, UsersApiFactory } from '@homeproved/shared/data-access';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';

type EmailVerificationProps = {
  email: RegistrationFormData['email'];
};

export const EmailVerification: FC<EmailVerificationProps> = ({ email }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const translationBaseKey = 'app.pro.pages.registration.steps.step2';
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation: resendEmailVerificationMutation } = useMutationFetch(
    'resendEmailVerification',
    usersApi.apiAuthEmailVerificationNotificationPost
  );

  const handleSendEmailAgain = () => {
    resendEmailVerificationMutation.mutate({
      email: email,
    });
  };

  return (
    <>
      <SendAgainButton
        size="large"
        onClick={handleSendEmailAgain}
        disabled={resendEmailVerificationMutation.isLoading}
      >
        {t(`${translationBaseKey}.sendAgainBtn`)}
      </SendAgainButton>
      {resendEmailVerificationMutation.isSuccess && !resendEmailVerificationMutation.isLoading && (
        <SendAgainConfirmation>
          <SvgIcon icon={Icons.CHECKMARK} color={theme.palette.green.main} size={1.5} />
          <span>{'Email verzonden.'}</span>
        </SendAgainConfirmation>
      )}
    </>
  );
};
