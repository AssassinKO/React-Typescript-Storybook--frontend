import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { FlyoutMenu, FlyoutMenuItem, Icons, SvgIcon } from '@homeproved/shared/ui';
import { GetPathFunction, RouteParams } from '@homeproved/shared/feature-localized-routes';
import { useDisclosure } from 'react-use-disclosure';

export type LanguageSwitcherProps = {
  getPath: GetPathFunction;
  offCanvas?: boolean;
  className?: string;
};

const Wrapper = styled.span`
  position: relative;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  }
`;

const CurrentLanguage = styled(({ innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Label = styled(({ offCanvas, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme, offCanvas }) => (offCanvas ? theme.palette.grey['800'] : '#FFF')};
`;

const OffCanvasWrapper = styled.div`
  display: flex;
`;

const OffCanvasA = styled.a`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey['800']};
  margin-right: 3rem;
  text-decoration: none;
`;

const ActiveLanguage = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 3rem;

  &:after {
    content: '';
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.palette.grey['300']};
  }
`;

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  getPath,
  offCanvas = false,
  className,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const theme = useTheme();
  const { isOpen: menuOpen, close: closeMenu, toggle: toggleMenu } = useDisclosure();
  const toggleBtnRef: React.RefObject<HTMLDivElement> = React.useRef();
  return offCanvas ? (
    <OffCanvasWrapper>
      {currentLanguage === 'nl' ? (
        <ActiveLanguage>NL</ActiveLanguage>
      ) : (
        <Link
          href={getPath(router.pathname, router.query as RouteParams, 'nl')}
          locale="nl"
          passHref
        >
          <OffCanvasA href={getPath(router.pathname, router.query as RouteParams, 'nl')}>
            NL
          </OffCanvasA>
        </Link>
      )}
      {currentLanguage === 'fr' ? (
        <ActiveLanguage>FR</ActiveLanguage>
      ) : (
        <Link
          href={getPath(router.pathname, router.query as RouteParams, 'fr')}
          locale="fr"
          passHref
        >
          <OffCanvasA href={getPath(router.pathname, router.query as RouteParams, 'fr')}>
            FR
          </OffCanvasA>
        </Link>
      )}
      {currentLanguage === 'en' ? (
        <ActiveLanguage>EN</ActiveLanguage>
      ) : (
        <Link
          href={getPath(router.pathname, router.query as RouteParams, 'en')}
          locale="en"
          passHref
        >
          <OffCanvasA href={getPath(router.pathname, router.query as RouteParams, 'en')}>
            EN
          </OffCanvasA>
        </Link>
      )}
    </OffCanvasWrapper>
  ) : (
    <Wrapper className={className}>
      <CurrentLanguage innerRef={toggleBtnRef} onClick={toggleMenu}>
        <Label offCanvas={offCanvas}>{currentLanguage.toUpperCase()}</Label>
        <SvgIcon
          size={2}
          icon={menuOpen ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
          color={offCanvas ? theme.palette.grey['800'] : '#FFF'}
        />
      </CurrentLanguage>
      <FlyoutMenu open={menuOpen} onClickAway={closeMenu} toggleBtnRef={toggleBtnRef}>
        <FlyoutMenuItem
          href={getPath(router.pathname, router.query as RouteParams, 'nl')}
          locale="nl"
        >
          {t('shared.language.nl')}
        </FlyoutMenuItem>
        <FlyoutMenuItem
          href={getPath(router.pathname, router.query as RouteParams, 'fr')}
          locale="fr"
        >
          {t('shared.language.fr')}
        </FlyoutMenuItem>
        <FlyoutMenuItem
          href={getPath(router.pathname, router.query as RouteParams, 'en')}
          locale="en"
        >
          {t('shared.language.en')}
        </FlyoutMenuItem>
      </FlyoutMenu>
    </Wrapper>
  );
};
