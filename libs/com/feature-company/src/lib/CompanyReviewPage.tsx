import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FilterMenu,
  InfinitePagination,
  Pagination,
  ReviewCard,
} from '@homeproved/shared/ui';
import { useCompany } from '@homeproved/shared/feature-company';
import { CompanyShell } from './CompanyShell';
import { PaginationMeta, Review, useQueryFetch } from '@homeproved/shared/data-access';
import moment from 'moment';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useRouter } from 'next/router';
import { Wrapper, Title, StyledGrid, NoReviews, NoReviewsTitle } from './components/reviews/Atoms';
import { objectToQueryString } from '@homeproved/shared/util';
import { RecentRealizations } from './components/company-shell/recent-realizations/RecentRealizations';
import { ReportIssue } from '@homeproved/com/feature-report-issue';

export type CompanyReviewPageProps = {
  slug: string;
};

type ReviewData = {
  data: Review[];
  links: unknown;
  meta: unknown;
};

type QueryParams = {
  date?: 'asc' | 'desc' | '';
  rating?: 'asc' | 'desc' | '';
  page?: number;
  perPage?: number;
};

export const CompanyReviewPage: FC<CompanyReviewPageProps> = ({ slug }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { company, isSuccess, error } = useCompany(slug);

  const [apiRouteInit, setApiRouteInit] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const [apiRoute, setApiRoute] = useState('');

  const [filterQueryParams, setFilterQueryParams] = useState<QueryParams>({
    date: 'desc',
    rating: '',
    page: 1,
    perPage: 6,
  });

  const getApiRoute = () => {
    return apiRoute + objectToQueryString(filterQueryParams);
  };
  const { query } = useQueryFetch<ReviewData, unknown>(['reviews', company?.id], getApiRoute(), {
    options: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (!apiRouteInit && !!company) {
      setApiRoute(`/api/companies/${company?.id}/reviews?`);
      setApiRouteInit(true);
    }
  }, [apiRouteInit, company]);

  useEffect(() => {
    if (apiRouteInit && !reviewsLoaded) {
      query.refetch().then(({ status }) => {
        setReviewsLoaded(status === 'success');
      });
    }
  }, [apiRouteInit, reviewsLoaded, query]);

  const navigateToReview = (slug: string, rid: number) => {
    router
      .push(
        getPath('/company/:slug/review/:rid', {
          slug,
          rid: rid.toString(),
        })
      )
      .then();
  };

  const reviews = query.data?.data || [];
  const pagination = query.data?.meta as PaginationMeta;
  const filterOptionsInit = [
    {
      label: t('app.pro.pages.reviews.filter.newOld'),
      selected: true,
      handle: () => {
        setFilterQueryParams({ ...filterQueryParams, date: 'desc', rating: '' });
        setReviewsLoaded(false);
      },
    },
    {
      label: t('app.pro.pages.reviews.filter.oldNew'),
      selected: false,
      handle: () => {
        setFilterQueryParams({ ...filterQueryParams, date: 'asc', rating: '' });
        setReviewsLoaded(false);
      },
    },
    {
      label: t('app.pro.pages.reviews.filter.positive'),
      selected: false,
      handle: () => {
        setFilterQueryParams({ ...filterQueryParams, rating: 'desc', date: '' });
        setReviewsLoaded(false);
      },
    },
    {
      label: t('app.pro.pages.reviews.filter.negative'),
      selected: false,
      handle: () => {
        setFilterQueryParams({ ...filterQueryParams, rating: 'asc', date: '' });
        setReviewsLoaded(false);
      },
    },
  ];

  const [filterOptions, setFilterOptions] = useState(filterOptionsInit);

  const setSelected = (label: string) => {
    setFilterOptions(
      filterOptions.map((filterOption) => {
        if (filterOption.label === label) {
          return {
            ...filterOption,
            selected: true,
          };
        }
        return {
          ...filterOption,
          selected: false,
        };
      })
    );
  };

  const goToPage = (page: number) => {
    setFilterQueryParams({ ...filterQueryParams, page: page });
    setReviewsLoaded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMorePages = () => {
    setFilterQueryParams({ ...filterQueryParams, perPage: filterQueryParams.perPage + 10 });
    setReviewsLoaded(false);
  };

  if (error) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box mb={1}>
          <Typography variant="body1">{t('app.com.pages.company.notFoundMessage')}</Typography>
        </Box>
        <Button href={getPath('/')}>{t('app.com.pages.company.notFoundCta')}</Button>
      </Box>
    );
  }

  return isSuccess ? (
    <CompanyShell slug={slug} data={company} activeTab="reviews" hasReviews={reviews.length > 0}>
      <Wrapper isTablet={isTablet} hasReviews={reviews.length > 0}>
        {reviews.length > 0 ? (
          <>
            <Box display="flex" alignItems="center" mb={5}>
              {!isTablet && (
                <Title variant="h3">
                  {t('app.com.pages.company.reviews')}
                  <span>({pagination == null ? '...' : pagination?.total})</span>
                </Title>
              )}
              <Box display="flex" justifyContent={isTablet ? 'center' : 'flex-start'} width="100%">
                <FilterMenu filterOptions={filterOptions} setSelected={setSelected} />
              </Box>
            </Box>
            <Grid container spacing={4}>
              {reviews.length > 0 &&
                reviews.map(
                  (review) =>
                    review.data && (
                      <StyledGrid item xs={12} sm={6} key={review.data.id}>
                        <ReviewCard
                          review={{
                            id: review.data.id,
                            picture: null,
                            name: `${review.data.firstName} ${review.data.lastName}`,
                            date: moment(review.data.createdAt).format('l'),
                            rating: review.data.rating,
                            text: review.data.description,
                            title: review.data.title,
                            companyId: review.data.relations.company.data.id,
                            companySlug: review.data.relations.company.data.slug,
                            screenName: review.data.screenName,
                          }}
                          proCons={review.data.relations?.proConPoints}
                          isMobile={isMobile}
                          navigateToReview={navigateToReview}
                          teaser={true}
                          bigBalloon={true}
                        />
                      </StyledGrid>
                    )
                )}
            </Grid>
            {pagination != null &&
              (isMobile ? (
                <InfinitePagination {...pagination} loadMore={loadMorePages} />
              ) : (
                <Pagination {...pagination} goToPage={goToPage} defaultPagesToShow={5} />
              ))}
          </>
        ) : (
          <NoReviews isTablet={isTablet}>
            <NoReviewsTitle isTablet={isTablet}>{`${t(
              'app.com.pages.company.companyShell.noReviews'
            ).replace('%company%', company.name)}`}</NoReviewsTitle>
            <Button
              href={getPath('/write-review/:slug', {
                slug: company.slug,
              })}
            >
              {t('app.com.pages.company.companyShell.writeReview')}
            </Button>
          </NoReviews>
        )}
      </Wrapper>
      {isTablet && (
        <>
          <RecentRealizations slug={slug} />
          <ReportIssue companyId={company.id.toString()} />
        </>
      )}
    </CompanyShell>
  ) : null;
};
