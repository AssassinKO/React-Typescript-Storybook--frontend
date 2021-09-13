import React, { FC } from 'react';
import { FlyoutMenuItem, Icons, LogoCom, SvgIcon, HeaderMenuItem } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { LanguageSwitcher } from '@homeproved/shared/feature-language-switcher';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

type DesktopHeaderProps = {
  homepage?: boolean;
  transparent?: boolean;
};

const Wrapper = styled(({ transparent, ...restProps }) => <div {...restProps} />)`
  background: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.config.gradients.default};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  z-index: 99;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10rem;
  width: 100%;
  max-width: 122.5rem;
  padding: 0 2rem;
  margin: auto;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ForCompanies = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.1rem solid #fff;
  padding: 0 0 0 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;

  &:hover {
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  }
`;

const HelmetIcon = styled(SvgIcon)`
  margin-right: 1rem;
`;

const StyledLanguageSwitcher = styled(LanguageSwitcher)`
  margin-left: 2rem;
`;

const StyledLogoCom = styled(({ homepage, ...restProps }) => <LogoCom {...restProps} />)`
  padding-bottom: ${({ homepage }) => (homepage ? '2rem' : '1.2rem')};
  &:hover {
    cursor: pointer;
  }
`;

export const DesktopHeader: FC<DesktopHeaderProps> = ({
  homepage = false,
  transparent = false,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();

  return (
    <Wrapper transparent={transparent}>
      <Inner>
        <Left>
          <Link href={getPath('/')} passHref>
            <a href={getPath('/')}>
              <StyledLogoCom homepage={homepage} width={homepage ? '35rem' : '26.5rem'} />
            </a>
          </Link>
          <StyledLanguageSwitcher getPath={getPath} />
        </Left>
        <Right>
          <HeaderMenuItem label={t('app.com.header.reviews.title')}>
            <>
              <FlyoutMenuItem
                href={getPath('/write-review')}
                icon={Icons.PENCIL}
                isActive={router.pathname === '/write-review'}
              >
                {t('app.com.header.reviews.menu.writeReviews')}
              </FlyoutMenuItem>
              <FlyoutMenuItem
                href={getPath('/assessment-policy')}
                icon={Icons.PAPER_SCROLL}
                isActive={router.pathname === '/assessment-policy'}
              >
                {t('app.com.header.reviews.menu.reviewPolicy')}
              </FlyoutMenuItem>
            </>
          </HeaderMenuItem>
          <HeaderMenuItem label={t('app.com.header.workers.title')}>
            <>
              <FlyoutMenuItem href={getPath('/company-search')} icon={Icons.SEARCH}>
                {t('app.com.header.workers.menu.findWorker')}
              </FlyoutMenuItem>
              <FlyoutMenuItem
                href={getPath('/add-company')}
                icon={Icons.HELMET_OUTLINE}
                isActive={router.pathname === '/add-company'}
              >
                {t('app.com.header.workers.menu.addWorker')}
              </FlyoutMenuItem>
              <FlyoutMenuItem href={getPath('/sectors')} icon={Icons.BRICK_WALL}>
                {t('app.com.header.workers.menu.sectors')}
              </FlyoutMenuItem>
            </>
          </HeaderMenuItem>
          <HeaderMenuItem label={t('app.com.header.inspiration.title')}>
            <>
              <FlyoutMenuItem href={getPath('/realizations')} icon={Icons.STAR_OUTLINE}>
                {t('app.com.header.inspiration.menu.realizations')}
              </FlyoutMenuItem>
              <FlyoutMenuItem href={getPath('/housing-advice')} icon={Icons.HOUSE_HEART}>
                {t('app.com.header.inspiration.menu.advice')}
              </FlyoutMenuItem>
            </>
          </HeaderMenuItem>
          <ForCompanies
            href={
              process.env.NEXT_PUBLIC_PRO_URL
                ? `${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/')}`
                : getPath('/')
            }
            target="_blank"
          >
            <HelmetIcon icon={Icons.HELMET_OUTLINE} size={2} color="#FFF" />
            <span>{t('app.com.header.forCompanies')}</span>
          </ForCompanies>
        </Right>
      </Inner>
    </Wrapper>
  );
};
