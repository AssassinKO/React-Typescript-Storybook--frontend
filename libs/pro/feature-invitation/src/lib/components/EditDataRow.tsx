import {
  AddClientsFormData,
  AddClientsFormSchema,
  ErrorMessage,
} from '@homeproved/shared/feature-forms';
import { Button, IconButton, Icons } from '@homeproved/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Client } from './AddClientsTable';
import { Data, FormRow, StyledInput } from './Atoms';

type EditDataRowProps = {
  client: Client;
  clients: Client[];
  onEditClient: (client: Client) => void;
  isMobile: boolean;
};

export const EditDataRow: FC<EditDataRowProps> = ({ client, clients, onEditClient, isMobile }) => {
  const { t } = useTranslation();
  const { register, errors, setError, reset, handleSubmit } = useForm<AddClientsFormData>({
    resolver: zodResolver(AddClientsFormSchema),
  });

  const [clientToBeEdited, setClientToBeEdited] = useState<Client>(client);
  const handleEditClient = (clientData) => {
    if (clients.some(({ email, uuid }) => email === clientData.email && uuid !== client.uuid)) {
      setError('email', {
        type: 'manual',
        message: 'shared.form.validation.emailNotUnique',
      });
    } else {
      onEditClient(clientToBeEdited);
      reset();
    }
  };
  const handleChangeEmail = (event) => {
    setClientToBeEdited({ ...clientToBeEdited, email: event.target.value });
  };
  const handleChangeName = (event) => {
    setClientToBeEdited({ ...clientToBeEdited, name: event.target.value });
  };

  return (
    <FormRow onSubmit={handleSubmit(handleEditClient)}>
      <Data mobile={isMobile}>
        {isMobile && (
          <Box display="flex" marginLeft="-1.5rem" pr={1}>
            <IconButton type="submit" icon={Icons.SAVE} variant="green">
              {t('app.pro.pages.invitation.uploadManually.table.save')}
            </IconButton>
          </Box>
        )}
        <Box display="flex" flexDirection="column" width="100%">
          <StyledInput
            placeholder={t('app.pro.pages.invitation.uploadManually.form.email.placeholder')}
            name="email"
            ref={register}
            value={clientToBeEdited.email}
            onChange={handleChangeEmail}
          />
          {errors.email && (
            <ErrorMessage>{errors.email ? t(errors.email.message) : ' '}</ErrorMessage>
          )}
        </Box>
      </Data>
      <Data mobile={isMobile}>
        <Box display="flex" flexDirection="column" width="100%">
          <StyledInput
            placeholder={t('app.pro.pages.invitation.uploadManually.table.name.placeholder')}
            name="name"
            ref={register}
            value={clientToBeEdited.name}
            onChange={handleChangeName}
          />
          {errors.name && <ErrorMessage>{errors.name ? t(errors.name.message) : ' '}</ErrorMessage>}
        </Box>
      </Data>
      {!isMobile && (
        <Data mobile={isMobile}>
          <Button
            variant="green"
            type="submit"
            size="small"
            arrow="none"
            style={{ position: 'absolute' }}
          >
            {t('app.pro.pages.invitation.uploadManually.table.save')}
          </Button>
        </Data>
      )}
    </FormRow>
  );
};
