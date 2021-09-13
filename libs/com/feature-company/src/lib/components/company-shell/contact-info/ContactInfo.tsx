import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import Moment from 'react-moment';
import Link from 'next/link';
import { CompanyData } from '@homeproved/shared/data-access';
import { Socials } from '../socials/Socials';
import { ReportIssue } from '@homeproved/com/feature-report-issue';
import countries from 'i18n-iso-countries';
import dutch from 'i18n-iso-countries/langs/nl.json';
import french from 'i18n-iso-countries/langs/fr.json';
import english from 'i18n-iso-countries/langs/en.json';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';

export type ContactInfoProps = {
  slug: string;
  data: CompanyData;
  isMobile?: boolean;
  isTablet?: boolean;
};

const Wrapper = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  padding: ${({ isTablet }) => (!isTablet ? '3rem 5rem 1.5rem' : '0 2rem')};
  border: ${({ theme, isTablet }) => !isTablet && `0.2rem solid ${theme.palette.grey['A200']}`};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Value = styled.span`
  margin-left: 0.5rem;
`;

const Icon = styled(SvgIcon)`
  margin-right: 1rem;
`;

const Website = styled.a`
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};

  &:hover {
    text-decoration: none;
  }
`;

const StyledButton = styled(Button)`
  display: table;
  margin: auto;
`;

const linkStyle = css`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

const StyledA = styled.a`
  ${linkStyle};
`;

const ContactLink = styled.a`
  ${linkStyle};

  &:hover,
  &:visited {
    text-decoration: underline;
  }
`;

export const ContactInfo: FC<ContactInfoProps> = ({
  slug,
  data,
  isMobile = false,
  isTablet = false,
}) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const href = getPath('/company/:slug/contact', { slug });
  const currentLanguage = useCurrentLanguage();

  // Register country translations
  countries.registerLocale(dutch);
  countries.registerLocale(french);
  countries.registerLocale(english);

  return (
    <Wrapper isTablet={isTablet}>
      <Title>{t('app.com.pages.company.companyShell.contactInfo')}</Title>
      {!!data.phone && (
        <Info>
          <Icon icon={Icons.PHONE} size={1.8} />
          <ContactLink href={`tel:${data.phone}`}>{`Tel: ${data.phone}`}</ContactLink>
        </Info>
      )}
      {!!data.email && (
        <Info>
          <Icon icon={Icons.EMAIL} size={1.8} />
          <ContactLink href={`mailto:${data.email}`}>{data.email}</ContactLink>
        </Info>
      )}
      {!!data.street && !!data.streetNr && !!data.postalCode && (
        <Info>
          <Icon icon={Icons.LOCATION_OUTLINE} size={1.8} />
          <div>
            {`${data.street} ${data.streetNr} ${data.postalCode}`}
            <br />
            {`${!!data.city && data.city} ${
              !!data.country && countries.getName(data.country, currentLanguage)
            }`}
          </div>
        </Info>
      )}
      {!!data.vat && (
        <Info>
          <strong>{`${t('app.com.pages.company.companyShell.vat')}:`}</strong>
          <Value>{data.vat}</Value>
        </Info>
      )}
      {!!data.foundedAt && (
        <Info>
          <strong>{`${t('app.com.pages.company.companyShell.activeSince')}:`}</strong>
          <Value>
            <Moment format={'DD/MM/YYYY'}>{data.foundedAt}</Moment>
          </Value>
        </Info>
      )}
      {!!data.url && (
        <Info>
          <Website href={data.url} target={'_blank'}>
            {data.url}
          </Website>
        </Info>
      )}
      <Socials data={data} isMobile={isMobile} />
      {!isMobile && (
        <StyledButton variant={'dark'}>
          <Link href={href} passHref>
            <StyledA href={href}>{t('app.com.pages.company.companyShell.contact')}</StyledA>
          </Link>
        </StyledButton>
      )}
      <ReportIssue companyId={String(data.id)} />
    </Wrapper>
  );
};
