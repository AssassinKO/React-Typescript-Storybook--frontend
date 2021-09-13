import React, { FC } from 'react';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { HomeShapeScore, Stars, LocationTag } from '../..';
import {
  Wrapper,
  Company,
  Tags,
  Rating,
  Logo,
  Title,
  StyledChip,
  ReviewsText,
  StyledA,
} from './Atoms';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export type CompanyCardProps = {
  company: CompanyData;
  companyPath: string;
};

export const CompanyCard: FC<CompanyCardProps> = ({ company, companyPath }) => {
  const { t } = useTranslation();
  const tags = company?.relations?.sectors;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company?.id?.toString())
  );
  if (company == null) {
    return null;
  }

  return (
    <Wrapper>
      <Company mobile={isMobile}>
        <Link href={companyPath} passHref>
          <StyledA href={companyPath}>
            <Logo image={company?.logo?.data?.conversions?.['square-m']} mobile={isMobile} />
          </StyledA>
        </Link>
        <div>
          <Title>
            <Link href={companyPath} passHref>
              <StyledA href={companyPath}>{company.name}</StyledA>
            </Link>
          </Title>
          <LocationTag location={company.city} align={isMobile ? 'center' : 'left'} />
        </div>
      </Company>
      <Rating isMobile={isMobile}>
        <HomeShapeScore
          score={parseFloat((companyScore?.data?.data?.score ?? 0).toString()).toFixed(1)}
          com={true}
        />
        <ReviewsText>{`${companyScore?.data?.data?.total ?? 0} ${t(
          'app.com.pages.companySearch.mainSection.xReviews'
        )}`}</ReviewsText>
        <Stars
          count={companyScore?.data?.data?.score ? Math.round(companyScore.data.data.score / 2) : 0}
          size={2.4}
        />
      </Rating>
      {tags != null && (
        <Tags>
          {tags.map((sector) =>
            sector.data.descendants.map((subsector) => (
              <StyledChip
                key={`sector-${sector.data.id}-${subsector['data'].id}`}
                label={subsector['data'].name}
                size={'large'}
              />
            ))
          )}
        </Tags>
      )}
    </Wrapper>
  );
};
