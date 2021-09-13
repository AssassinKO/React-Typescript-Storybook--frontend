import React, { FC } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import {
  DancingScriptQuote,
  FooterContent,
  FooterCopyrightNotice,
  FooterInner,
  FooterLinks,
  FooterStyledA,
  FooterWrapper,
  LogoPro,
} from '@homeproved/shared/ui';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { LabelWithLinks } from '@homeproved/shared/feature-forms';

type FooterProps = {
  transparent?: boolean;
};

const Logo = styled(({ tablet, ...restProps }) => <LogoPro {...restProps} />)`
  margin: ${({ tablet }) => (tablet ? '0 0 1rem 0' : '-1.3rem 6rem 0 0')};
`;

const Quote = styled(DancingScriptQuote)`
  margin-bottom: 3rem;
`;

export const Footer: FC<FooterProps> = ({ transparent }) => {
  const { t } = useTranslation();
  const { getPath: getComPath } = useComLocalizedRoutes();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(1050));
  const isMobile = useMediaQuery(theme.breakpoints.down(725));

  return (
    <FooterWrapper transparent={transparent} isTablet={isTablet}>
      <FooterInner center={isTablet}>
        {!isTablet && <Logo width="24rem" />}
        <FooterContent>
          {isTablet && (
            <>
              <Logo width="25rem" tablet />
              <Quote quote={t('app.com.footer.quote')} size={2.6} color={'white'} />
            </>
          )}
          <FooterLinks mobile={isMobile}>
            {[
              [
                t('app.pro.footer.links.terms-of-use'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/terms-of-use'),
                '_blank',
              ],
              [
                t('app.pro.footer.links.privacy'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/privacy'),
                '_blank',
              ],
              [
                t('app.pro.footer.links.cookies'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/cookies'),
                '_blank',
              ],
              [
                t('app.pro.footer.links.about'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/about'),
                '_blank',
              ],
              [
                t('app.pro.footer.links.consumer'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/'),
                '_blank',
              ],
              [
                t('app.pro.footer.links.contact'),
                process.env.NEXT_PUBLIC_COM_URL + getComPath('/contact'),
                '_blank',
              ],
            ].map((link, index) => (
              <Link href={link[1]} key={index} passHref>
                <FooterStyledA href={link[1]} target={link[2] ? link[2] : '_self'}>
                  {link[0]}
                </FooterStyledA>
              </Link>
            ))}
          </FooterLinks>
          <FooterCopyrightNotice mobile={isMobile}>
            <span>
              <LabelWithLinks
                label={t('app.pro.footer.copyright.notice')}
                linksInLabel={[
                  {
                    label: t('app.pro.footer.copyright.noticeLinkLabel'),
                    path: process.env.NEXT_PUBLIC_COM_URL + getComPath('/'),
                    target: '_blank',
                  },
                ]}
              />
            </span>
            {!isMobile && <span>-</span>}
            <span>{t('app.pro.footer.copyright.rights')}</span>
          </FooterCopyrightNotice>
        </FooterContent>
      </FooterInner>
    </FooterWrapper>
  );
};
