import React, { FC } from 'react';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@homeproved/shared-feature-auth-codana';
import {
  IconButton,
  Icons,
  SvgIcon,
  KebabMenu,
  LogoPro,
  FlyoutMenuItem,
  OffCanvasToggle,
  // SearchFormData,
  // Search,
} from '@homeproved/shared/ui';
import { UserInfo } from './UserInfo';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

type DashboardHeaderProps = {
  offCanvas: boolean;
  offCanvasOpen: boolean;
  onToggleOffCanvas: () => void;
  toggleBtnRef: React.RefObject<HTMLDivElement>;
};

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLogoPro = styled(LogoPro)`
  margin-right: 2rem;
`;

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 6.5rem;
  padding: 0 2rem;
  background: ${({ theme }) => theme.config.gradients.default};
  align-items: center;
`;

const DesktopWrapper = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.config.gradients.default};
  height: 6.5rem;
  padding: 0 2rem 0 7.2rem;
  align-items: center;
`;

const DesktopOffCanvasWrapper = styled.div`
  position: absolute;
  left: 2rem;
`;

const UserInfoWrapper = styled.div`
  padding: 1rem 2rem 1.5rem 2rem;
  border-bottom: ${({ theme }) => `.1rem solid ${theme.palette.grey['200']}`};
  margin-bottom: 0.5rem;
`;

const IconWrapper = styled.div`
  margin-right: 1.5rem;
  padding-right: 1.5rem;
  border-right: 0.1rem solid #fff;
`;

const DashboardIcon = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  background: ${({ theme }) => theme.palette.grey['800']};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  offCanvas,
  offCanvasOpen,
  onToggleOffCanvas,
  toggleBtnRef,
}) => {
  const { t } = useTranslation();
  const logout = useLogout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.proDashboard));
  const { getPath } = useLocalizedRoutes();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    logout();
  };

  return isMobile ? (
    <MobileWrapper>
      <OffCanvasToggle
        offCanvasOpen={offCanvasOpen}
        innerRef={toggleBtnRef}
        onToggleOffCanvas={onToggleOffCanvas}
      />
      <LogoPro width="20rem" />
      <KebabMenu>
        <UserInfoWrapper>
          <UserInfo color="dark" />
        </UserInfoWrapper>
        <FlyoutMenuItem icon={Icons.LOGOUT} onClick={handleLogout}>
          {t('shared.logout')}
        </FlyoutMenuItem>
      </KebabMenu>
    </MobileWrapper>
  ) : (
    <DesktopWrapper>
      {offCanvas && (
        <DesktopOffCanvasWrapper>
          <OffCanvasToggle
            offCanvasOpen={offCanvasOpen}
            innerRef={toggleBtnRef}
            onToggleOffCanvas={onToggleOffCanvas}
          />
        </DesktopOffCanvasWrapper>
      )}
      <Left>
        {offCanvas && <StyledLogoPro width="20rem" />}
        {/*<StyledSearch mode="compact" onSubmit={onSearchSubmit} />*/}
      </Left>
      <Right>
        <IconWrapper>
          <DashboardIcon onClick={() => router.push(getPath('/dashboard'))}>
            <SvgIcon icon={Icons.DASHBOARD} size={1.4} color={'#fff'} />
          </DashboardIcon>
        </IconWrapper>
        <UserInfo />
        <IconButton tooltip={t('shared.logout')} icon={Icons.LOGOUT} onClick={handleLogout} />
      </Right>
    </DesktopWrapper>
  );
};
