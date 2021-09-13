import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CompanyShell } from './CompanyShell';
import { ContactForm } from './components/contact-form/ContactForm';
import { useCompany } from '@homeproved/shared/feature-company';
import { ContactInfo } from './components/company-shell/contact-info/ContactInfo';
import { useMediaQuery, useTheme } from '@material-ui/core';

export type CompanyContactPageProps = {
  slug: string;
};

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;
const ContactWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  padding: 3rem;
  margin: 0 -2rem;
`;

export const CompanyContactPage: FC<CompanyContactPageProps> = ({ slug }) => {
  const { t } = useTranslation();
  const { company, isSuccess } = useCompany(slug);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return isSuccess ? (
    <CompanyShell slug={slug} data={company} activeTab={'contact'}>
      <Title>
        {t('app.com.pages.company.contact')} {company.name}
      </Title>
      <ContactForm slug={slug} isTablet={isTablet} />
      {isTablet && (
        <ContactWrapper>
          <ContactInfo slug={slug} data={company} isMobile={isMobile} isTablet={isTablet} />
        </ContactWrapper>
      )}
    </CompanyShell>
  ) : null;
};
