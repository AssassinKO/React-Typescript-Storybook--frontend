import React, { FC } from 'react';
import { HeaderMenuItem, LogoPro, DancingScriptQuote } from '@homeproved/shared/ui';
import styled, { useTheme } from 'styled-components';
import { LanguageSwitcher } from '@homeproved/shared/feature-language-switcher';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import Link from 'next/link';
import { useMediaQuery } from '@material-ui/core';
import { AuthButton } from './AuthButton';

type DesktopHeaderProps = {
  homepage: boolean;
  transparent: boolean;
  minimal: boolean;
};

const Wrapper = styled(({ transparent, ...restProps }) => <div {...restProps} />)`
  background: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.config.gradients.default};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10rem;
  width: 100%;
  max-width: 150rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const LogoBaselineWrapper = styled.div`
  position: relative;
`;

const Baseline = styled(DancingScriptQuote)`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLanguageSwitcher = styled(LanguageSwitcher)`
  margin-left: 2rem;
`;

const StyledLogoPro = styled(({ homepage, ...restProps }) => <LogoPro {...restProps} />)`
  padding-bottom: ${({ homepage }) => (homepage ? '2rem' : '1.2rem')};
  &:hover {
    cursor: pointer;
  }
`;

export const DesktopHeader: FC<DesktopHeaderProps> = ({ homepage, transparent, minimal }) => {
  const { t } = useTranslation();
  const { getPath: proGetPath } = useProLocalizedRoutes();
  const { getPath: comGetPath } = useComLocalizedRoutes();
  const theme = useTheme();
  const smallLogo = useMediaQuery(theme.breakpoints.down(1170));

  return (
    <Wrapper transparent={transparent}>
      <Inner>
        <Left>
          <LogoBaselineWrapper>
            <Link href={proGetPath('/')} passHref>
              <a href={proGetPath('/')}>
                <StyledLogoPro
                  homepage={homepage}
                  width={homepage && !smallLogo ? '33rem' : '26.5rem'}
                />
              </a>
            </Link>
            {!minimal && <Baseline quote={t('app.pro.baseline')} color="white" />}
          </LogoBaselineWrapper>
          <StyledLanguageSwitcher getPath={proGetPath} />
        </Left>
        <Right>
          {minimal ? (
            <DancingScriptQuote quote={t('app.pro.baseline')} color="white" size={2.6} />
          ) : (
            <>
              <HeaderMenuItem
                label={t('app.pro.header.freeProfile')}
                href={proGetPath('/registration/step1')}
              />
              <HeaderMenuItem label={t('app.pro.header.packs')} href={proGetPath('/') + '#packs'} />
              <HeaderMenuItem
                label={t('app.pro.header.assessmentPolicy')}
                href={process.env.NEXT_PUBLIC_COM_URL + comGetPath('/assessment-policy')}
                target="_blank"
              />
              <HeaderMenuItem label={t('app.pro.header.brochure')} href={proGetPath('/brochure')} />
              <AuthButton getPath={proGetPath} />
            </>
          )}
        </Right>
      </Inner>
    </Wrapper>
  );
};
