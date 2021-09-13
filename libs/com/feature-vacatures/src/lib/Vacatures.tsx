import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VacancyTile, SectionTitle } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { useFetchJobsPages } from './hooks/useFetchJobsPage';
import moment from 'moment';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import Link from 'next/link';

const Split = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Left = styled.div`
  flex: 1;
  margin-right: 12rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin-right: 6rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    margin-right: 0;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Square = styled.a`
  width: 22rem;
  height: 22rem;
  margin: 0 2rem 2rem 0;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: 19rem;
    height: 19rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    width: calc(100vw - 4rem);
    height: calc(100vw - 4rem);
    margin: 0 0 2rem 0;
  }
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  width: fit-content;
  margin-bottom: 4rem;
  margin-top: 3rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    display: none;
  }
`;

const ExtraTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.palette.grey['A200']};
  padding: 2rem;
  text-align: center;
  font-weight: bold;
  img {
    width: auto;
    height: 40%;
    object-fit: contain;
    margin-bottom: 1.5rem;
  }
`;

export const VacaturesPage = () => {
  const { t } = useTranslation();
  const { query } = useFetchJobsPages();
  const { getPath } = useLocalizedRoutes();

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;
  return (
    <>
      <SectionTitle label={t('app.com.pages.jobs.title')} />
      <Split>
        <Left>
          <Title>{t('app.com.pages.jobs.about')}</Title>
          <Text>{ReactHtmlParser(t('app.com.pages.jobs.aboutDescription'))}</Text>
        </Left>
        <Right>
          <Title>{t('app.com.pages.jobs.searchingFor')}</Title>
          <Grid>
            {query.data.data.map(({ data }) => (
              <Link
                href={getPath('/jobs/:slug', {
                  slug: data.slug,
                })}
                passHref
                key={data.id}
              >
                <Square>
                  <VacancyTile
                    label={data.title}
                    publishDate={moment(data.createdAt).format('DD/MM')}
                  />
                </Square>
              </Link>
            ))}
            <Square>
              <ExtraTile>
                <img src="/approved2.png" alt="" loading="lazy" />
                {t('app.com.pages.jobs.welcome')}
              </ExtraTile>
            </Square>
          </Grid>
        </Right>
      </Split>
    </>
  );
};
