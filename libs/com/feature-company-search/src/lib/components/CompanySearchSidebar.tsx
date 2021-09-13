import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Separator } from './Atoms';
import { Button, IconButton, Icons } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';

type CompanySearchSidebarProps = {
  offCanvas: boolean;
  onToggleOffCanvas: () => void;
  toggleBtnRef: React.RefObject<HTMLDivElement>;
};

export const Title = styled.h2`
  font-size: 1.8rem;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 300;
  margin: 0;
`;

const SidebarMenu = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const FilterMenu = styled.div`
  padding-top: 2rem;
`;

export const CompanySearchSidebar: FC<CompanySearchSidebarProps> = ({
  children,
  onToggleOffCanvas,
  toggleBtnRef,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <SidebarMenu>
      <Header>
        <Title>{t('app.com.pages.companySearch.filterSection.title')}</Title>
        <IconButton
          icon={Icons.CROSS}
          variant="white"
          iconColor={theme.palette.grey['700']}
          onClick={() => onToggleOffCanvas()}
          size={1}
        />
      </Header>
      <Separator />
      <FilterMenu>{children}</FilterMenu>
      <Button
        arrow="none"
        variant="dark"
        pill={false}
        fullWidth
        onClick={onToggleOffCanvas}
        innerRef={toggleBtnRef}
      >
        {t('app.com.pages.companySearch.filterSection.showResultsBtnText')}
      </Button>
    </SidebarMenu>
  );
};
