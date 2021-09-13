import { FC } from 'react';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { JSONLD } from '@homeproved/shared/util';

type Props = {
  company: CompanyData;
};
export const CompanyStructuredData: FC<Props> = ({ company }) => {
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company.id.toString())
  );

  return (
    <JSONLD
      schema={[
        {
          '@context': 'http://schema.org',
          '@type': 'LocalBusiness',
          name: company.name,
          image: company.logo?.data.conversions['fit-m'] ?? '/logo-default@2x.png',
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${company.street} ${company.streetNr}`,
            addressLocality: company.city,
            postalCode: company.postalCode,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: companyScore?.data?.data?.score?.toString() || '',
            ratingCount: companyScore?.data?.data?.total?.toString() || '',
            worstRating: '0',
            bestRating: '10',
          },
        },
      ]}
    />
  );
};
