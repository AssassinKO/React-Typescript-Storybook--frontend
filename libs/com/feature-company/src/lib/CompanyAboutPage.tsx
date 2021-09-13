import React, { FC } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Button, Icons, SvgIcon, Tooltip } from '@homeproved/shared/ui';
import { useCompany } from '@homeproved/shared/feature-company';
import { CompanyShell } from './CompanyShell';
import { Info } from './components/info/Info';
import { Specializations } from './components/specializations/Specializations';
import { Certificates } from './components/certificates/Certificates';
import { ContactInfo } from './components/company-shell/contact-info/ContactInfo';
import { Labels } from './components/labels/Labels';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export type CompanyAboutPageProps = {
  slug: string;
};

const Section = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  margin-bottom: 3rem;
  padding: ${({ isTablet }) => (isTablet ? '0 2rem 3rem' : '0 0 3rem')};
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};
`;

const SectionLabel = styled.div`
  font-weight: 700;
  margin-bottom: 2rem;
`;

const LabelsWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;
  margin: ${({ isMobile }) => isMobile && '0 -0.5rem'};
`;

const Description = styled.div`
  margin: 4rem 0;
  padding: 0 2rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const InfoIcon = styled.span`
  margin-left: 0.5rem;
`;

const StyledButton = styled(({ marginBottom, ...restProps }) => <Button {...restProps} />)`
  margin: ${({ marginBottom }) => (marginBottom ? '0 auto 4rem' : '0 auto')};
  display: table;
`;

export const CompanyAboutPage: FC<CompanyAboutPageProps> = ({ slug }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { company, isSuccess } = useCompany(slug);
  const { getPath } = useComLocalizedRoutes();

  return isSuccess ? (
    <CompanyShell slug={slug} data={company} activeTab={'about'}>
      <Section>
        {!isTablet && (
          <SectionLabel>
            {`${t('app.com.pages.company.about')} ${company.name}`}
            <Tooltip
              title={`${t('app.com.pages.company.managedBy')} ${company.name}`}
              arrow
              placement={'right'}
            >
              <InfoIcon>
                <SvgIcon icon={Icons.INFO} color={theme.palette.grey['500']} size={1.5} />
              </InfoIcon>
            </Tooltip>
          </SectionLabel>
        )}
        <LabelsWrapper isMobile={isMobile}>
          <Info data={company} mobile={isMobile} />
          <Labels labels={company.relations.externalTags} mobile={isMobile} />
        </LabelsWrapper>
        <Certificates data={company} mobile={isMobile} />
        {isMobile && (
          <>
            <Description>{ReactHtmlParser(company.about)}</Description>
            <StyledButton
              variant={'light'}
              href={getPath('/write-review/:slug', {
                slug: company.slug,
              })}
            >
              {t('app.com.pages.company.companyShell.writeReview')}
            </StyledButton>
          </>
        )}
      </Section>
      <Section isTablet={isTablet}>
        <Specializations specializations={company.relations.sectors} mobile={isMobile} />
      </Section>
      {isTablet && (
        <ContactInfo slug={slug} data={company} isMobile={isMobile} isTablet={isTablet} />
      )}
      {!isMobile && (
        <>
          <Description>{ReactHtmlParser(company.about)}</Description>
          {isTablet && (
            <StyledButton
              marginBottom
              variant={'light'}
              href={getPath('/write-review/:slug', {
                slug: company.slug,
              })}
            >
              {t('app.com.pages.company.companyShell.writeReview')}
            </StyledButton>
          )}
        </>
      )}
    </CompanyShell>
  ) : null;
};
