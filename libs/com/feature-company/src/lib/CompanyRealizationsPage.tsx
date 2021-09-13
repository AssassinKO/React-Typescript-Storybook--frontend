import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LargeTile } from '@homeproved/shared/ui';
import { useCompany } from '@homeproved/shared/feature-company';
import { CompanyShell } from './CompanyShell';
import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import Link from 'next/link';
import { useMediaQuery, useTheme } from '@material-ui/core';

export type CompanyRealizationsPageProps = {
  slug: string;
};

const Title = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: ${({ isTablet }) => isTablet && 'center'};

  span {
    font-weight: 400;
  }
`;

const Realizations = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.7rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    justify-content: center;
  }
  > * {
    flex: 0 0 100%;
    margin: 0.7rem;
    max-width: 32rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
      flex: 0 0 calc(33.33% - 1.4rem);
    }
  }
`;

const StyledLargeTile = styled(LargeTile)`
  height: 100%;
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

export const CompanyRealizationsPage: FC<CompanyRealizationsPageProps> = ({ slug }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { company, isSuccess } = useCompany(slug);
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch('realizationsGet', () =>
    realizationsApi.apiCompaniesCompanyRealisationsGet(slug)
  );

  return query.isSuccess && isSuccess ? (
    <CompanyShell slug={slug} data={company} activeTab={'realizations'}>
      <Title isTablet={isTablet}>
        {isTablet ? (
          <>
            {t('app.com.pages.company.ourRealizationsMobile')} {company.name}{' '}
            <span>({query.data['data'].length})</span>
          </>
        ) : (
          t('app.com.pages.company.ourRealizations')
        )}
      </Title>
      <Realizations>
        {query.data.data.map((item, index) => {
          const realisationUrl = getPath('/company/:slug/realization/:rslug', {
            slug,
            rslug: item.data.slug,
          });
          return (
            <Link key={item.data.id} href={realisationUrl} passHref>
              <StyledA href={realisationUrl}>
                <StyledLargeTile
                  key={index}
                  title={item.data.title}
                  image={item.data.cover?.data?.conversions?.['square-m']}
                  description={item.data.subtitle}
                  clickable
                />
              </StyledA>
            </Link>
          );
        })}
      </Realizations>
    </CompanyShell>
  ) : null;
};
