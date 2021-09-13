import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionTitle } from '@homeproved/shared/ui';
import {
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import Fade from '@material-ui/core/Fade';
import { AddRealizationTile } from './add-realization-tile/AddRealizationTile';
import { RealizationTile } from './realization-tile/RealizationTile';
import UpgradeText from './upgrade-text/UpgradeText';
import { useUser } from '@homeproved/shared/feature-auth';
import { useCompany } from '@homeproved/shared/feature-company';
import Link from 'next/link';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useMediaQuery, useTheme } from '@material-ui/core';

type RealizationsOverviewPageProps = {
  getPath: GetPathFunction;
};

const Realizations = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    justify-content: center;
  }
  > * {
    flex: 0 0 100%;
    margin: 1.5rem;
    max-width: 32rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
      flex: 0 0 calc(33.33% - 3rem);
    }
  }
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

export const RealizationsOverviewPage: FC<RealizationsOverviewPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const user = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const { company, isSuccess } = useCompany(user.relations.company.data.id.toString());
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const [showUpgradeText, setShowUpgradeText] = useState<boolean>(false);
  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { query } = useQueryFetch([company.id, 'realizationsGet'], () =>
    realizationsApi.apiCompaniesCompanyRealisationsGet(company.id.toString(), {
      options: {
        enabled: isSuccess,
        refetchOnWindowFocus: true,
      },
    })
  );

  useEffect(() => {
    if (isSuccess && query.isSuccess && company.relations.subscription != null) {
      const realizations = query.data.data.length;
      const limit = company.relations.subscription.data.features.realisationsNr;

      if (realizations >= limit) {
        setLimitReached(true);
        setShowUpgradeText(false);
      } else if (limit - realizations === 1) {
        setTimeout(() => {
          setShowUpgradeText(true);
          setLimitReached(false);
        }, 3000);
      }
    } else if (query.isSuccess && company.relations.subscription == null) {
      setLimitReached(true);
    }
  }, [company, isSuccess, query, setLimitReached, setShowUpgradeText]);

  return (
    <>
      <SectionTitle
        label={t('app.pro.pages.realizations.title')}
        textAlign={isMobile ? 'center' : 'left'}
        ignoreMobile={true}
        uppercase={true}
        font={'PTSans'}
      />
      {query.isSuccess && (
        <>
          <Realizations>
            <AddRealizationTile getPath={getPath} limitReached={limitReached} />
            {query.data !== null &&
              query.data.data.map((item, index) => (
                <Link
                  href={getPath('/edit-realization/:id', { id: item.data.id.toString() })}
                  passHref
                  key={index}
                >
                  <StyledA href={getPath('/edit-realization/:id', { id: item.data.id.toString() })}>
                    <RealizationTile
                      cover={
                        item.data.cover !== null ? item.data.cover.data.conversions['square-m'] : ''
                      }
                      title={item.data.title}
                      type={
                        item.data.relations.sectors[0] !== undefined &&
                        item.data.relations.sectors[0].data.name
                      }
                      date={item.data.createdAt}
                    />
                  </StyledA>
                </Link>
              ))}
          </Realizations>
          <Fade in={showUpgradeText}>
            <div>
              <UpgradeText text={t('app.pro.pages.realizations.limit.upgrade')} getPath={getPath} />
            </div>
          </Fade>
        </>
      )}
    </>
  );
};
