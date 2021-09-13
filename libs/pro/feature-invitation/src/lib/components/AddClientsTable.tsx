import {
  AddClientsFormData,
  AddClientsFormSchema,
  ErrorMessage,
} from '@homeproved/shared/feature-forms';
import { Button, Icons, Modal, SvgIcon } from '@homeproved/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, useTheme } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generateUUID } from '../helpers';
import {
  Data,
  DataContent,
  Description,
  InputItem,
  InputItemLabel,
  InputWrapperForm,
  ReceiversTable,
  ReceiversTitle,
  Row,
  StyledInput,
  Table,
  TableWrapper,
  Title,
  ThumbsUp,
  ModalBody,
  ModalContent,
} from './Atoms';
import { DataRow } from './DataRow';
import { EditDataRow } from './EditDataRow';
import ReactHtmlParser from 'react-html-parser';
import {
  CompanyData,
  InvitationsApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { AcceptGDPRField } from './AcceptGDPRField';

type AddClientsTableProps = {
  isMobile: boolean;
  company: CompanyData;
  remainingInvites: number;
};

export type Client = {
  email: string;
  name: string;
  editMode: boolean;
  uuid: number;
};

export const AddClientsTable: FC<AddClientsTableProps> = ({
  isMobile,
  company,
  remainingInvites,
}) => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { register, errors, setError, reset, handleSubmit } = useForm<AddClientsFormData>({
    resolver: zodResolver(AddClientsFormSchema),
  });
  const invitationsApi = useApiFactory(InvitationsApiFactory);
  const {
    mutation: postManuallyAddedClientsMutation,
  } = useMutationFetch('postManuallyAddedClients', (body) =>
    invitationsApi.apiCompaniesInviteForReviewPost(body, {})
  );
  const [showUpgradeText, setShowUpgradeText] = useState(false);
  const [isGDPRAccepted, setIsGDPRAccepted] = useState(false);

  useEffect(() => {
    if (postManuallyAddedClientsMutation.isSuccess && !isOpen) {
      setIsOpen(true);
      setClients([]);
    }
    if (postManuallyAddedClientsMutation.isError && !isOpen) {
      setIsOpen(true);
    }
  }, [postManuallyAddedClientsMutation, isOpen]);
  useEffect(() => {
    if (clients.length >= remainingInvites) {
      setShowUpgradeText(true);
    } else {
      setShowUpgradeText(false);
    }
  }, [clients, company, remainingInvites]);

  const handleAddClient = (clientData) => {
    if (clients.some(({ email }) => email === clientData.email)) {
      setError('email', {
        type: 'manual',
        message: 'shared.form.validation.emailNotUnique',
      });
    } else {
      setClients([...clients, { ...clientData, uuid: generateUUID(), editMode: false }]);
      reset();
    }
  };
  const removeClient = (client: Client) => {
    setClients(clients.filter(({ email }) => client.email !== email));
  };
  const setEditMode = ({ email }: Client, editMode: boolean) => {
    setClients(
      clients.map((client) => {
        if (client.email === email) {
          return {
            ...client,
            editMode,
          };
        }
        return client;
      })
    );
  };
  const handleEditClient = ({ email, name, uuid }: Client) => {
    setClients(
      clients.map((client) => {
        if (client.uuid === uuid) {
          return {
            ...client,
            email,
            name,
            editMode: false,
          };
        }
        return client;
      })
    );
  };

  const sendManuallyAddedClients = () => {
    if (isGDPRAccepted) {
      postManuallyAddedClientsMutation.mutate({
        invitations: clients.map(({ email, name }) => ({ email, name })),
      });
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    postManuallyAddedClientsMutation.reset();
  };

  return (
    <>
      <Title variant="h2">{t('app.pro.pages.invitation.uploadManually.title')}</Title>
      <Description variant="body1">
        {t('app.pro.pages.invitation.uploadManually.description')}
      </Description>
      <InputWrapperForm mobile={isMobile} onSubmit={handleSubmit(handleAddClient)}>
        <InputItem marginBottom={isMobile ? 2 : 5} mobile={isMobile}>
          <InputItemLabel>
            {t('app.pro.pages.invitation.uploadManually.form.name.label')}
          </InputItemLabel>
          <StyledInput
            placeholder={t('app.pro.pages.invitation.uploadManually.form.name.placeholder')}
            name="name"
            ref={register}
          />
          {(errors.name || (errors.email && !isMobile) || showUpgradeText) && (
            <ErrorMessage>{errors.name ? t(errors.name.message) : ' '}</ErrorMessage>
          )}
        </InputItem>
        <InputItem marginBottom={isMobile ? 3 : 5} mobile={isMobile}>
          <InputItemLabel>
            {t('app.pro.pages.invitation.uploadManually.form.email.label')}
          </InputItemLabel>
          <StyledInput
            placeholder={t('app.pro.pages.invitation.uploadManually.form.email.placeholder')}
            name="email"
            ref={register}
          />
          {((errors.name && !isMobile) || errors.email || showUpgradeText) && (
            <ErrorMessage>{errors.email ? t(errors.email.message) : ' '}</ErrorMessage>
          )}
        </InputItem>
        <InputItem marginBottom={isMobile ? 3.5 : 5} mobile={isMobile}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={isMobile ? 'center' : 'flex-start'}
          >
            <Button variant="dark" type="submit" disabled={showUpgradeText}>
              {t('app.pro.pages.invitation.uploadManually.form.buttonText')}
            </Button>
          </Box>
          {(errors.name || errors.email || showUpgradeText) && !isMobile && (
            <ErrorMessage> </ErrorMessage>
          )}
        </InputItem>
      </InputWrapperForm>
      {clients.length > 0 && (
        <ReceiversTable mobile={isMobile}>
          <ReceiversTitle variant="h3">
            {t('app.pro.pages.invitation.uploadManually.table.title')}
          </ReceiversTitle>
          <TableWrapper>
            <Table mobile={isMobile}>
              <Row header>
                <Data mobile={isMobile}>
                  <DataContent variant="body1" mobile={isMobile}>
                    {t('app.pro.pages.invitation.uploadManually.table.email')}
                  </DataContent>
                </Data>
                <Data mobile={isMobile}>
                  <DataContent variant="body1" mobile={isMobile}>
                    {t('app.pro.pages.invitation.uploadManually.table.name')}
                  </DataContent>
                </Data>
                {!isMobile && (
                  <Data mobile={isMobile}>
                    <DataContent variant="body1" mobile={isMobile}>
                      {t('app.pro.pages.invitation.uploadManually.table.edit')}
                    </DataContent>
                  </Data>
                )}
              </Row>
              {clients.map((client) =>
                client.editMode ? (
                  <EditDataRow
                    client={client}
                    clients={clients}
                    onEditClient={handleEditClient}
                    key={client.email}
                    isMobile={isMobile}
                  />
                ) : (
                  <DataRow
                    client={client}
                    setEditMode={setEditMode}
                    removeClient={removeClient}
                    key={client.email}
                    isMobile={isMobile}
                  />
                )
              )}
            </Table>
          </TableWrapper>
        </ReceiversTable>
      )}
      <Box mb={isMobile ? 3 : 5} maxWidth="32rem">
        <AcceptGDPRField value={isGDPRAccepted} onChange={setIsGDPRAccepted} />
      </Box>
      <Box>
        <Button
          variant="gradient"
          disabled={
            clients.length === 0 ||
            postManuallyAddedClientsMutation.isLoading ||
            !isGDPRAccepted ||
            remainingInvites === 0
          }
          onClick={sendManuallyAddedClients}
          isLoading={postManuallyAddedClientsMutation.isLoading}
        >
          {t('app.pro.pages.invitation.uploadManually.buttonText')}
        </Button>
      </Box>
      {remainingInvites === 0 && (
        <Box mt={1}>
          <ErrorMessage>
            {t('app.pro.pages.invitation.uploadManually.form.limitReachedText')}
          </ErrorMessage>
        </Box>
      )}
      <Modal open={isOpen} onClose={closeModal} icon={Icons.FLAG}>
        <ModalBody>
          {postManuallyAddedClientsMutation.isSuccess && (
            <>
              <ThumbsUp>
                <img src="/approved2.png" loading="lazy" alt="Approved" />
              </ThumbsUp>
              <ModalContent variant="h3">
                {t('app.pro.pages.invitation.uploadManually.modal.successMessage')}
              </ModalContent>
            </>
          )}
          {postManuallyAddedClientsMutation.isError && (
            <>
              <Box mb={2}>
                <SvgIcon icon={Icons.CROSS} color={theme.palette.primary.main} />
              </Box>
              <ModalContent variant="h3">
                {ReactHtmlParser(t('app.pro.pages.invitation.uploadManually.modal.failedMessage'))}
              </ModalContent>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
