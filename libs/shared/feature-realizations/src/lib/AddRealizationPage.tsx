import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionTitle, SvgIcon, Icons } from '@homeproved/shared/ui';
import { useRouter } from 'next/router';
import AddRealizationForm from './realization-form/AddRealizationForm';
import { useUser } from '@homeproved/shared-feature-auth-codana';
import { useCompany } from '@homeproved/shared/feature-company';
import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type AddRealizationPageProps = {
  getPath: GetPathFunction;
};

const BackToOverviewLink = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const FormWrapper = styled.div`
  background-color: #fff;
  margin-top: 3rem;
  padding: 3rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

export const AddRealizationPage: FC<AddRealizationPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useUser();
  const { company, isSuccess } = useCompany(user.relations.company.data.id.toString());
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch('realizationsGet', () =>
    realizationsApi.apiCompaniesCompanyRealisationsGet(company.id.toString(), {
      options: {
        enabled: isSuccess,
      },
    })
  );
  const [limitReached, setLimitReached] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && query.isSuccess) {
      const realizations = query.data.data.length;
      const limit = company.relations.subscription.data.features.realisationsNr;
      if (realizations >= limit) {
        setLimitReached(true);
        router.push(getPath('/realizations')).then();
      }
    }
  }, [company, isSuccess, query, getPath, router, setLimitReached]);

  return (
    <>
      <SectionTitle
        label={t('app.pro.pages.realizations.add.add')}
        textAlign={'left'}
        font={'PTSans'}
        uppercase={true}
      />
      <BackToOverviewLink onClick={() => router.push(getPath('/realizations'))}>
        <SvgIcon icon={Icons.ANGLE_LEFT} size={1.5} />
        {t('app.pro.pages.realizations.back')}
      </BackToOverviewLink>
      {company != null && isSuccess && !limitReached && (
        <FormWrapper>
          <AddRealizationForm companyId={company.id} getPath={getPath} />
        </FormWrapper>
      )}
    </>
  );
};
