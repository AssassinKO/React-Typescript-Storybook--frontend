import { IconButton, Icons } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Client } from './AddClientsTable';
import { Data, DataContent, Row } from './Atoms';

type DataRowProps = {
  client: Client;
  setEditMode: (client: Client, editMode: boolean) => void;
  removeClient: (client: Client) => void;
  isMobile: boolean;
};

export const DataRow: FC<DataRowProps> = ({ client, setEditMode, removeClient, isMobile }) => {
  return (
    <Row>
      <Data mobile={isMobile}>
        {isMobile && (
          <Box display="flex" marginLeft="-2rem" pr={1}>
            <IconButton
              icon={Icons.CROSS}
              variant="transparent"
              iconColor="#000"
              size={1.2}
              onClick={() => removeClient(client)}
            />
            <IconButton
              icon={Icons.PENCIL_SOLID}
              variant="transparent"
              iconColor="#000"
              size={1.5}
              onClick={() => setEditMode(client, true)}
            />
          </Box>
        )}
        <DataContent variant="body1" mobile={isMobile}>
          {client.email}
        </DataContent>
      </Data>
      <Data mobile={isMobile}>
        <DataContent variant="body1" mobile={isMobile}>
          {client.name}
        </DataContent>
      </Data>
      {!isMobile && (
        <Data mobile={isMobile}>
          <IconButton
            icon={Icons.PENCIL_SOLID}
            variant="transparent"
            iconColor="#000"
            size={1.5}
            onClick={() => setEditMode(client, true)}
          />
          <IconButton
            icon={Icons.CROSS}
            variant="transparent"
            iconColor="#000"
            size={1.2}
            onClick={() => removeClient(client)}
          />
        </Data>
      )}
    </Row>
  );
};
