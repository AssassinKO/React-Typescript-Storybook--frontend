import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { FlyoutMenuItem, Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@homeproved/shared/feature-language-switcher';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { Fade } from '@material-ui/core';
import { useRouter } from 'next/router';
import { SearchSuggestions } from '@homeproved/com/feature-search';
import { usePageScroll } from '@homeproved/shared/util';
import { useSectors } from '@homeproved/shared/feature-sectors';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

type OffCanvasMenuProps = {
  open: boolean;
  onToggleOffCanvas?: () => void;
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
  padding: 0 2rem;
`;

const ForCompanies = styled.a`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey['800']};
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  }
`;

const ForCompaniesIcon = styled(SvgIcon)`
  margin-right: 1rem;
`;

const SearchWrapper = styled.div`
  padding: 0 2rem;
  border-bottom: ${({ theme }) => `.1rem solid ${theme.palette.grey['A200']}`};
`;

export const OffCanvasMenu: FC<OffCanvasMenuProps> = ({ open, onToggleOffCanvas }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();
  const { setPageScrollEnabled } = usePageScroll();
  const sectors = useSectors();

  useEffect(() => {
    setPageScrollEnabled(!open);
  }, [open, setPageScrollEnabled]);

  return (
    <Fade in={open} mountOnEnter unmountOnExit>
      <Backdrop>
        <Inner>
          <SearchWrapper>
            <SearchSuggestions
              searchMode="flyoutMenu"
              placeholder={t('search.offCanvasPlaceholder')}
              sectors={sectors?.data}
              onToggleOffCanvas={onToggleOffCanvas}
            />
          </SearchWrapper>
          <Menu>
            <FlyoutMenuItem
              href={getPath('/write-review')}
              icon={Icons.PENCIL}
              wide
              isActive={router.pathname === '/write-review'}
            >
              {t('app.com.header.reviews.menu.writeReviews')}
            </FlyoutMenuItem>
            <FlyoutMenuItem
              href={getPath('/assessment-policy')}
              icon={Icons.PAPER_SCROLL}
              wide
              isActive={router.pathname === '/assessment-policy'}
            >
              {t('app.com.header.reviews.menu.reviewPolicy')}
            </FlyoutMenuItem>
            <FlyoutMenuItem href={getPath('/company-search')} icon={Icons.SEARCH} wide>
              {t('app.com.header.workers.menu.findWorker')}
            </FlyoutMenuItem>
            <FlyoutMenuItem
              href={getPath('/add-company')}
              icon={Icons.HELMET_OUTLINE}
              wide
              isActive={router.pathname === '/add-company'}
            >
              {t('app.com.header.workers.menu.addWorker')}
            </FlyoutMenuItem>
            <FlyoutMenuItem href={getPath('/sectors')} icon={Icons.BRICK_WALL} wide>
              {t('app.com.header.workers.menu.sectors')}
            </FlyoutMenuItem>
            <FlyoutMenuItem href={getPath('/realizations')} icon={Icons.STAR_OUTLINE} wide>
              {t('app.com.header.inspiration.menu.realizations')}
            </FlyoutMenuItem>
            <FlyoutMenuItem href={getPath('/housing-advice')} icon={Icons.HOUSE_HEART} wide>
              {t('app.com.header.inspiration.menu.advice')}
            </FlyoutMenuItem>
          </Menu>
          <Footer>
            <LanguageSwitcher getPath={getPath} offCanvas />
            <ForCompanies
              href={
                process.env.NEXT_PUBLIC_PRO_URL
                  ? `${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/')}`
                  : getPath('/')
              }
              target="_blank"
            >
              <ForCompaniesIcon icon={Icons.DOUBLE_ANGLE_RIGHT} color="gradient" size={1.6} />
              <span>{t('app.com.header.forCompanies')}</span>
            </ForCompanies>
          </Footer>
        </Inner>
      </Backdrop>
    </Fade>
  );
};
