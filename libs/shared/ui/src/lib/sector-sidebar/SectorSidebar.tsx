import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Icons } from '../svg-icon';
import { IconButton } from '../buttons';
import { Box } from '@material-ui/core';
import { Accordion } from '../accordion/Accordion';
import { SectorSidebarItem } from '../types';

type SectorSidebarProps = {
  offCanvas: boolean;
  onToggleOffCanvas: () => void;
  items: SectorSidebarItem[];
};

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const SidebarMenu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
`;

const Body = styled.div`
  flex: 1;
  overflow: auto;
`;

export const SectorSidebar: FC<SectorSidebarProps> = ({ items, onToggleOffCanvas }) => {
  const { t } = useTranslation();
  return (
    <SidebarMenu>
      <Header>
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <IconButton
            icon={Icons.CROSS}
            variant="white"
            iconColor={theme.palette.grey['700']}
            onClick={onToggleOffCanvas}
            size={1}
          />
        </Box>
        <Title>{t('app.com.pages.housingAdvice.menu.title')}</Title>
      </Header>
      <Body>
        <Accordion items={items} />
      </Body>
    </SidebarMenu>
  );
};
