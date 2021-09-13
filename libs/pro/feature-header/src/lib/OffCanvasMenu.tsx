import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { FlyoutMenuItem, Icons, Search } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@homeproved/shared/feature-language-switcher';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { Fade } from '@material-ui/core';
import { usePageScroll } from '@homeproved/shared/util';
import { useRouter } from 'next/router';
import { AuthButton } from './AuthButton';

type OffCanvasMenuProps = {
  open: boolean;
  toggleOffCanvas: () => void;
};

const Backdrop = styled.div`
  position: fixed;
  top: 8rem;
  left: 0;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
`;

const Inner = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${({ tablet }) => tablet && '35rem'};
  background: #fff;
  padding-bottom: 2rem;

  &:after {
    content: '';
    position: absolute;
    top: -1.5rem;
    right: 1.5rem;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.9rem 1.5rem 0.9rem;
    border-color: transparent transparent #fff transparent;
  }
`;

const Menu = styled.div`
  margin-bottom: 3rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const SearchWrapper = styled.div`
  padding: 1rem 2rem;
  border-bottom: ${({ theme }) => `.1rem solid ${theme.palette.grey['A200']}`};
`;

export const OffCanvasMenu: FC<OffCanvasMenuProps> = ({ open, toggleOffCanvas }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath: comGetPath } = useComLocalizedRoutes();
  const { getPath: proGetPath } = useProLocalizedRoutes();
  const { setPageScrollEnabled } = usePageScroll();

  useEffect(() => {
    setPageScrollEnabled(!open);
  }, [open, setPageScrollEnabled]);

  return (
    <Fade in={open} mountOnEnter unmountOnExit>
      <Backdrop>
        <Inner>
          <SearchWrapper>
            <Search mode="flyoutMenu" placeholder={t('search.offCanvasPlaceholder')} />
          </SearchWrapper>
          <Menu>
            <FlyoutMenuItem
              href={proGetPath('/registration/step1')}
              icon={Icons.HELMET_OUTLINE}
              wide
              isActive={router.pathname === '/registration/step1'}
            >
              {t('app.pro.header.freeProfile')}
            </FlyoutMenuItem>
            <FlyoutMenuItem
              href={proGetPath('/') + '#packs'}
              icon={Icons.PACKS}
              wide
              onClick={toggleOffCanvas}
            >
              {t('app.pro.header.packs')}
            </FlyoutMenuItem>
            <FlyoutMenuItem
              href={process.env.NEXT_PUBLIC_COM_URL + comGetPath('/assessment-policy')}
              target="_blank"
              icon={Icons.STAR_OUTLINE}
              wide
              onClick={toggleOffCanvas}
            >
              {t('app.pro.header.assessmentPolicy')}
            </FlyoutMenuItem>
            <FlyoutMenuItem href={proGetPath('/brochure')} icon={Icons.COMPANY_FILE} wide>
              {t('app.pro.header.brochure')}
            </FlyoutMenuItem>
          </Menu>
          <Footer>
            <LanguageSwitcher getPath={proGetPath} offCanvas />
            <AuthButton getPath={proGetPath} variant={'gradient'} />
          </Footer>
        </Inner>
      </Backdrop>
    </Fade>
  );
};
