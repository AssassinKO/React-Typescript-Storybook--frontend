import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { Box, Typography, useTheme } from '@material-ui/core';
import {
  ErrorMessage,
  Input,
  RequestCategoryFormData,
  RequestCategoryFormSchema,
} from '@homeproved/shared/feature-forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SectorsApiFactory, useApiFactory, useMutationFetch } from '@homeproved/shared/data-access';

type RequestCategoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const Description = styled(Typography)`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Label = styled(Typography)`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: bold;
  white-space: nowrap;
  margin-right: 1rem;
`;
const StyledInput = styled(Input)`
  margin-bottom: 0;
  border: ${({ theme }) => `1px solid ${theme.palette.grey['A200']}`};
`;

export const RequestCategoryModal: FC<RequestCategoryModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { register, handleSubmit, errors } = useForm<RequestCategoryFormData>({
    defaultValues: {},
    resolver: zodResolver(RequestCategoryFormSchema),
  });
  const sectorsApi = useApiFactory(SectorsApiFactory);
  const {
    mutation: { isSuccess, mutate },
  } = useMutationFetch('requestCategory', (body) => sectorsApi.apiSectorRequestPost(body));

  const onSubmitRequest = (data: RequestCategoryFormData) => {
    mutate({
      sector: data.message,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('activityPicker.requestCategory.modalTitle')}
      titleAlign="left"
      titleUppercase
      titleFont="PTSans"
      titleSize={1.4}
    >
      {!isSuccess && (
        <>
          <Box borderTop={`1px solid ${theme.palette.grey[200]}`} pt={3} pb={3}>
            <Description variant="body1">
              {t('activityPicker.requestCategory.description')}
            </Description>
          </Box>
          <form onSubmit={handleSubmit(onSubmitRequest)}>
            <Box display="flex" alignItems="center" pb={2}>
              <Label>{t('activityPicker.requestCategory.label')}</Label>
              <Box flex={1}>
                <StyledInput type="text" name="message" defaultValue="" ref={register} />
                {errors.message && <ErrorMessage>{t(errors.message.message)}</ErrorMessage>}
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="gradient" type="submit">
                {t('activityPicker.requestCategory.cta')}
              </Button>
            </Box>
          </form>
        </>
      )}
      {isSuccess && (
        <Box borderTop={`1px solid ${theme.palette.grey[200]}`} pt={3} pb={3}>
            <Description variant="body1">
              {t('activityPicker.requestCategory.successMessage')}
            </Description>
          </Box>
      )}
    </Modal>
  );
};
