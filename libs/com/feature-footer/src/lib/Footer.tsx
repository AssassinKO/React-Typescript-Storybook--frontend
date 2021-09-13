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
  LogoCom,
} from '@homeproved/shared/ui';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { LabelWithLinks } from '@homeproved/shared/feature-forms';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

type FooterProps = {
  transparent?: boolean;
  marginTop?: number;
};

const Logo = styled(({ tablet, ...restProps }) => <LogoCom {...restProps} />)`
  margin: ${({ tablet }) => (tablet ? '0 0 1rem 0' : '-1.3rem 3rem 0 0')};
`;

const Quote = styled(DancingScriptQuote)`
  margin-bottom: 3rem;
`;

export const Footer: FC<FooterProps> = ({ transparent, marginTop = 6 }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(1160));
  const isMobile = useMediaQuery(theme.breakpoints.down(850));

  return (
    <FooterWrapper
      transparent={transparent}
      marginTop={marginTop}
      id={'main-footer'}
      isTablet={isTablet}
    >
      <FooterInner center={isTablet}>
        {!isTablet && <Logo width="23rem" />}
        <FooterContent>
          {isTablet && (
            <>
              <Logo width="25rem" tablet />
              <Quote quote={t('app.com.footer.quote')} size={2.6} color={'white'} />
            </>
          )}
          <FooterLinks mobile={isMobile}>
            {[
              [t('app.com.footer.links.terms-of-use'), getPath('/terms-of-use')],
              [t('app.com.footer.links.privacy'), getPath('/privacy')],
              [t('app.com.footer.links.cookies'), getPath('/cookies')],
              [t('app.com.footer.links.contact'), getPath('/contact')],
              [t('app.com.footer.links.about'), getPath('/about')],
              [t('app.com.footer.links.faq'), getPath('/faq')],
              [t('app.com.footer.links.jobs'), getPath('/jobs')],
              [
                t('app.com.footer.links.pro'),
                process.env.NEXT_PUBLIC_PRO_URL
                  ? `${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/')}`
                  : getPath('/'),
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
                label={t('app.pro.footer.copyright.notice').replace(
                  '%YEAR%',
                  new Date().getFullYear().toString()
                )}
                linksInLabel={[
                  {
                    label: t('app.pro.footer.copyright.noticeLinkLabel'),
                    path: getPath('/'),
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
