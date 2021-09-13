import React, { FC } from 'react';
import { RequestLinkWrapper } from './Atoms';
import { useTranslation } from 'react-i18next';

type RequestCategoryLink = {
  isMobile?: boolean;
  openRequestCategoryModal: () => void;
};

export const RequestCategoryLink: FC<RequestCategoryLink> = ({
  isMobile,
  openRequestCategoryModal,
}) => {
  const { t } = useTranslation();

  return (
    <RequestLinkWrapper onClick={openRequestCategoryModal} mobile={isMobile}>
        <span>{t('activityPicker.requestCategory.notFound')}</span>
        <u>{t('activityPicker.requestCategory.request')}</u>
      </RequestLinkWrapper>
  );
};
