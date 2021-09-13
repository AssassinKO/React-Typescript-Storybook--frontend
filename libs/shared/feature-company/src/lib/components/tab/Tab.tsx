import React, { FC, ForwardedRef, HTMLProps } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import clsx from 'clsx';

export type TabProps = {
  label: string;
  href: string;
  active: boolean;
  isMobile: boolean;
  isTablet: boolean;
  icon: Icons;
};

const StyledA = styled(
  React.forwardRef(
    (
      {
        children,
        isMobile,
        isTablet,
        ...restProps
      }: HTMLProps<HTMLAnchorElement> & { isMobile: boolean; isTablet: boolean },
      ref: ForwardedRef<HTMLAnchorElement>
    ) => (
      <a {...restProps} ref={ref}>
        {children}
      </a>
    )
  )
)`
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0.5rem 0 0 -0.1rem;
  padding: ${({ isMobile, isTablet }) =>
    isMobile ? '0.5rem' : isTablet ? '0.5rem 1rem' : '0.5rem 3rem'};
  position: relative;
  color: ${({ theme }) => theme.palette.grey['900']};
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  cursor: pointer;
  border-right: ${({ theme }) => `0.1rem solid ${theme.palette.grey['400']}`};
  border-left: ${({ theme }) => `0.1rem solid ${theme.palette.grey['400']}`};
  border-radius: 0;

  &:hover,
  &:visited {
    color: inherit;
    text-decoration: none;
    background-color: transparent;

    &:before {
      content: '';
      height: 0.5rem;
      position: absolute;
      top: -0.8rem;
      right: 0;
      left: 0;
      background: ${({ theme }) => theme.palette.grey['400']};
    }
  }
  &.is-active {
    font-weight: 600;

    &:before {
      content: '';
      height: 0.5rem;
      position: absolute;
      top: -0.8rem;
      right: 0;
      left: 0;
      background: ${({ theme }) => theme.config.gradients.default};
    }
  }
  &.is-tablet {
    flex: 0 0 25%;
    max-width: 15rem;
    border-color: transparent;
  }
  &.is-tablet-active {
    color: ${({ theme }) => theme.palette.grey['A200']};

    &:before {
      content: none;
    }
  }
`;

const Label = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  ${({ isTablet }) =>
    isTablet &&
    `
    font-size: 1.2rem;
    color: #fff;
  `};
  ${({ isMobile }) =>
    isMobile &&
    `
    font-size: 1rem;
  `};
`;

const IconWrapper = styled(({ isActive, ...restProps }) => <div {...restProps} />)`
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.main : theme.palette.grey['A200']};
  width: 5.2rem;
  height: 5.2rem;
  padding: 0.4rem;
  margin: 0 auto 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Tab: FC<TabProps> = ({ label, href, active, isMobile, isTablet, icon }) => {
  return (
    <Link href={href} passHref>
      <StyledA
        href={href}
        isMobile={isMobile}
        isTablet={isTablet}
        className={clsx('MuiButton-root', {
          'is-active': active,
          'is-tablet': isTablet,
          'is-tablet-active': isTablet && active,
        })}
      >
        {isTablet && (
          <IconWrapper isActive={active}>
            <SvgIcon icon={icon} color={active && '#fff'} size={3} />
          </IconWrapper>
        )}
        <Label isMobile={isMobile} isTablet={isTablet}>
          {label}
        </Label>
      </StyledA>
    </Link>
  );
};
