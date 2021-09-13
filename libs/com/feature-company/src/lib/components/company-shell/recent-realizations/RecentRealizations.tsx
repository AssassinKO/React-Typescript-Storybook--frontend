import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { LargeTile, Button } from '@homeproved/shared/ui';
import Link from 'next/link';
import { useCompany } from '@homeproved/shared/feature-company';

export type RecentRealizationsProps = {
  slug: string;
};

const Wrapper = styled.div`
  margin: 4rem 0 2rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const RealizationsWrapper = styled.div`
  margin: auto;
  max-width: 28.5rem;
`;

const MoreButton = styled(Button)`
  display: table;
  margin: 3rem auto 0;
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

export const RecentRealizations: FC<RecentRealizationsProps> = ({ slug }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const { company } = useCompany(slug);

  if (company?.relations?.recentRealisation == null) {
    return null;
  }

  return (
    <Wrapper>
      <Title>{t('app.com.pages.company.companyShell.recentRealizations')}</Title>
      <RealizationsWrapper>
        <Link
          href={getPath('/company/:slug/realization/:rslug', {
            slug,
            rslug: company.relations.recentRealisation.data.slug,
          })}
          passHref
        >
          <StyledA
            href={getPath('/company/:slug/realization/:rslug', {
              slug,
              rslug: company.relations.recentRealisation.data.slug,
            })}
          >
            <LargeTile
              title={company.relations.recentRealisation.data.title}
              image={
                company.relations.recentRealisation?.data?.cover?.data?.conversions?.['square-m']
              }
              description={company.relations.recentRealisation.data.subtitle}
              clickable
            />
          </StyledA>
        </Link>
      </RealizationsWrapper>
      <MoreButton variant={'light'}>
        <Link href={getPath('/company/:slug/realizations', { slug })} passHref>
          <StyledA href={getPath('/company/:slug/realizations', { slug })}>
            {t('app.com.pages.company.companyShell.moreRealizations')}
          </StyledA>
        </Link>
      </MoreButton>
    </Wrapper>
  );
};
