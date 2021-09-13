import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { MenuItem as MuiMenuItem } from '@material-ui/core';
import { Icons, SvgIcon } from '../..';

type FrameName = string;

type ListItemProps = {
  href?: string;
  onClick?: () => void;
  icon?: Icons;
  preserveIconSpace?: boolean;
  locale?: string;
  wide?: boolean;
  isActive?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | FrameName;
};

const ICON_SIZE = 2;

const ActiveWrapper = styled(({ withIcon, wide, ...restProps }) => <div {...restProps} />)`
  position: relative;
  ${({ withIcon, wide }) =>
    withIcon
      ? `
    padding: ${wide ? '1rem 1.5rem 1rem 8rem' : '1rem 1.5rem 1rem 5rem'};
    justify-content: flex-start;
  `
      : `
    padding: 1rem 1.5rem;
    justify-content: center;
  `};

  text-shadow: none;
  align-items: center;
  white-space: nowrap;
  background: ${({ theme }) => theme.palette.grey['A200']};
`;

const Wrapper = styled(({ withIcon, wide, ...restProps }) => <MuiMenuItem {...restProps} />)`
  position: relative;
  ${({ withIcon, wide }) =>
    withIcon
      ? `
    padding: ${wide ? '1rem 1.5rem 1rem 8rem' : '1rem 1.5rem 1rem 5rem'};
    justify-content: flex-start;
  `
      : `
    padding: 1rem 1.5rem;
    justify-content: center;
  `};

  text-shadow: none;
  align-items: center;
`;

const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
  font-size: 1.4rem;
`;

const Icon = styled(({ ...props }) => <SvgIcon {...props} />)`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
`;

export const FlyoutMenuItem: FC<ListItemProps> = ({
  href,
  onClick,
  icon,
  preserveIconSpace = false,
  locale,
  wide = false,
  isActive = false,
  target = '_self',
  children,
}) => {
  const inner = (
    <>
      {href ? (
        <Link href={href} locale={locale} passHref>
          <StyledA href={href} target={target} onClick={onClick}>
            {icon && <Icon size={ICON_SIZE} icon={icon} />}
            <Label>{children}</Label>
          </StyledA>
        </Link>
      ) : onClick ? (
        <div onClick={onClick}>
          {icon && <Icon size={ICON_SIZE} icon={icon} />}
          <Label>{children}</Label>
        </div>
      ) : (
        <div>
          {icon && <Icon size={ICON_SIZE} icon={icon} />}
          <Label>{children}</Label>
        </div>
      )}
    </>
  );

  return isActive ? (
    <ActiveWrapper withIcon={!!icon || preserveIconSpace} wide={wide}>
      {icon && <Icon size={ICON_SIZE} icon={icon} />}
      <Label>{children}</Label>
    </ActiveWrapper>
  ) : (
    <Wrapper withIcon={!!icon || preserveIconSpace} wide={wide}>
      {inner}
    </Wrapper>
  );
};
