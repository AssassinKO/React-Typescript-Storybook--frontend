import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, theme } from '@homeproved/shared/ui';
import { ContentWrapper } from './Atoms';
import { RegistrationStep2Form } from '@homeproved/pro/feature-registration';
import { useMediaQuery } from '@material-ui/core';

type VerifyEmailModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  email: string;
};

export const VerifyEmailModal: FC<VerifyEmailModalProps> = ({ open, onClose, email }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      title={t('app.pro.pages.registration.steps.verifyEmail.titleEmail')}
      titleSize={2.2}
      paddingTop={8}
    >
      <ContentWrapper>
        <RegistrationStep2Form isMobile={isMobile} email={email} />
      </ContentWrapper>
    </Modal>
  );
};
