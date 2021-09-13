import React, { FC, useState } from 'react';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

type SidebarMenuItemProps = {
  icon: Icons;
  iconSize?: number;
  href: string;
  label: string;
};

const Wrapper = styled.div`
  position: relative;
  margin-left: -3rem;
  padding: 0.75rem 2rem 0.75rem 8rem;
  cursor: pointer;

  &.active {
    background: ${({ theme }) => theme.palette.grey['A200']};
    cursor: default;
  }
`;

const Icon = styled(({ size, ...restProps }) => <SvgIcon size={size} {...restProps} />)`
  position: absolute;
  top: 50%;
  left: ${({ size }) => size === 2.5 ? '3rem' : `${3 + ((2.5 - size) / 2)}rem`};
  transform: translateY(-50%);
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;

  ${Wrapper}:hover &, ${Wrapper}.active & {
    font-weight: 700;
  }
`;

const Arrow = styled(SvgIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ icon, iconSize, href, label }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();

  const isActive = router.pathname === href;
  const iconColor = isActive
    ? theme.palette.grey['800']
    : hover
    ? theme.palette.primary.main
    : theme.palette.grey['500'];

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={isActive ? undefined : () => router.push(getPath(href))}
      className={isActive && 'active'}
    >
      <Icon icon={icon} color={iconColor} size={iconSize ? iconSize : 2.5} />
      <Label>{label}</Label>
      <Arrow icon={Icons.ANGLE_RIGHT} color={iconColor} size={1.5} />
    </Wrapper>
  );
};
