import React, { FC } from 'react';
import { Icons, Modal } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@material-ui/core';
import { Plans } from '../Plans';

type ChangePlanModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ChangePlanModal: FC<ChangePlanModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(940));

  return (
    <Modal open={open} onClose={onClose} title={t('plans.changeYourPlan')} icon={Icons.PACKS}>
      <Plans excludeFree onSelectPlan={onClose} mobile={isTablet} />
    </Modal>
  );
};
