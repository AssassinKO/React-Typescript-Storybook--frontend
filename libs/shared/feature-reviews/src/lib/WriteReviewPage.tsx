import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Button } from '@homeproved/shared/ui';
import {
  CustomHits,
  CustomSearchBox,
  CustomStats,
} from '@homeproved/shared/feature-company-search';
import {
  ContentWrapper,
  FacetTitle,
  Header,
  NotFoundWrapper,
  ResultsHeader,
  SearchTitle,
  SearchWrapper,
} from './write-reviews/Atoms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { StyledPagination } from '@homeproved/shared/feature-algolia';

type WriteReviewPageProps = {
  getPath: GetPathFunction;
};

export const WriteReviewPage: FC<WriteReviewPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const resultsHeaderMobile = useMediaQuery(theme.breakpoints.down(540));
  const [totalHits, setTotalHits] = useState(0);

  return (
    <>
      <CustomStats setTotalHits={setTotalHits} />
      <Header>
        <SearchTitle mobile={isMobile}>{t('reviews.search.title')}</SearchTitle>
        <SearchWrapper>
          <CustomSearchBox placeholder={t('app.com.pages.companySearch.placeholder')} />
        </SearchWrapper>
      </Header>
      <ContentWrapper>
        <ResultsHeader mobile={resultsHeaderMobile}>
          <FacetTitle size="large">
            {`${t('reviews.search.companiesAround')} `}
            <span style={{ fontWeight: 300 }}>({totalHits})</span>
          </FacetTitle>
          <Button href={getPath('/add-company')}>{t('reviews.search.addCompany')}</Button>
        </ResultsHeader>
        <CustomHits getPath={getPath} review />
        <StyledPagination />
        <NotFoundWrapper>
          <h3>{t('reviews.search.companyNotFound')}</h3>
          <Button href={getPath('/add-company')}>{t('reviews.search.addCompany')}</Button>
        </NotFoundWrapper>
      </ContentWrapper>
    </>
  );
};
