import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { FlyoutMenu } from '../flyout-menu';

type FrameName = string;

type HeaderMenuItemProps = {
  label: string;
  href?: string;
  locale?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | FrameName;
};

const Wrapper = styled.div`
  position: relative;
  margin-right: 2rem;
`;

const labelStyle = css`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
`;

const StyledLink = styled.a`
  ${labelStyle}

  &:hover {
    text-decoration: none;
    font-weight: 700;
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  }
`;

const StyledLabel = styled.div`
  ${labelStyle}
`;

const MouseLeaveFixer = styled.div`
  position: absolute;
  top: -2rem;
  left: -2rem;
  height: calc(100% + 4rem);
  width: calc(100% + 4rem);
  background: rgba(0, 0, 0, 0);
`;

export const HeaderMenuItem: FC<HeaderMenuItemProps> = ({
  label,
  href,
  locale,
  target = '_self',
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const link = href ? (
    <Link href={href} locale={locale} passHref>
      <StyledLink href={href} target={target}>
        {label}
      </StyledLink>
    </Link>
  ) : (
    <StyledLabel>{label}</StyledLabel>
  );

  return children ? (
    <Wrapper onMouseLeave={menuOpen ? () => setMenuOpen(false) : undefined}>
      {menuOpen && <MouseLeaveFixer />}
      <div onMouseEnter={() => setMenuOpen(true)}>{link}</div>
      <FlyoutMenu open={menuOpen} onClickAway={() => setMenuOpen(false)}>
        {children}
      </FlyoutMenu>
    </Wrapper>
  ) : (
    <Wrapper>{link}</Wrapper>
  );
};
