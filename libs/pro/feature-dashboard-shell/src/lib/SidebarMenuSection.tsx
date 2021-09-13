import React, { FC } from 'react';
import styled from 'styled-components';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemData } from './types';

type SidebarMenuSectionProps = {
  title?: string;
  items: SidebarMenuItemData[];
};

const Wrapper = styled.div`
  padding: 0 0 2rem 3rem;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

export const SidebarMenuSection: FC<SidebarMenuSectionProps> = ({ title, items }) => (
  <Wrapper>
    {title !== '' && <Title>{title}</Title>}
    {items.map((item, index) => (
      <SidebarMenuItem
        key={index}
        icon={item.icon}
        iconSize={item.iconSize}
        href={item.href}
        label={item.label}
      />
    ))}
  </Wrapper>
);
