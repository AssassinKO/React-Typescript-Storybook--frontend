import {
  FilterMenu,
  InviteCard,
  ReviewCard,
  SectionTitle,
  theme,
  TrustManager,
  Pagination,
  InfinitePagination,
} from '@homeproved/shared/ui';
import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useUser } from '@homeproved/shared/feature-auth';
import moment from 'moment';
import { PaginationMeta, Review, useQueryFetch } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useRouter } from 'next/router';
import { objectToQueryString } from '@homeproved/shared/util';

type ReviewsPageProps = {
  getPath: GetPathFunction;
};

const Wrapper = styled.div``;

const ContentWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
`;
const Side = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: ${({ mobile }) => (mobile ? 'auto' : '32rem')};
  padding-left: ${({ mobile }) => (mobile ? '0' : '5rem')};
  margin: ${({ mobile }) => (mobile ? '4rem -3rem 0' : '0')};
`;

const Message = styled(Typography)`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledGrid = styled(({ isSidebarOn, isDesktop, ...restProps }) => <Grid {...restProps} />)`
  display: flex;
  flex-direction: column;
  ${({ isSidebarOn, isDesktop }) =>
    isSidebarOn &&
    !isDesktop &&
    `
    max-width: 100%;
    flex-basis: 100%;
  `}
`;
const StyledGridContainer = styled(({ isSidebarOn, isDesktop, ...restProps }) => (
  <Grid {...restProps} />
))`
  display: flex;
  ${({ isSidebarOn, isDesktop }) =>
    isSidebarOn &&
    !isDesktop &&
    `
    flex-direction: column;
  `}
`;

export type ReviewData = {
  data: Review[];
  links: unknown;
  meta: unknown;
};

export type QueryParams = {
  date?: 'asc' | 'desc' | '';
  rating?: 'asc' | 'desc' | '';
  page?: number;
  perPage?: number;
};

export const ReviewsPage: FC<ReviewsPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isSidebarOn = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.offCanvas));
  const isDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
  const user = useUser();
  const company = user?.relations?.company?.data;
  const [apiRouteInit, setApiRouteInit] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const [apiRoute, setApiRoute] = useState('');

  const [filterQueryParams, setFilterQueryParams] = useState<QueryParams>({
    date: 'desc',
    rating: '',
    page: 1,
    perPage: 10,
  });

  const getApiRoute = () => {
    return apiRoute + objectToQueryString(filterQueryParams);
  };
  const { query } = useQueryFetch<ReviewData, unknown>('reviews', getApiRoute(), {
    options: {
      enabled: false,
    },
  });
  const router = useRouter();
  const navigateToReview = (slug: string, rid: number) => {
    router
      .push(
        getPath('/reviews/:id', {
          id: rid.toString(),
        })
      )
      .then();
  };

  useEffect(() => {
    if (!apiRouteInit && !!company) {
      setApiRoute(`/api/companies/${company.id}/reviews?`);
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

  if (!company) return <>{t('app.pro.pages.reviews.errors.companyNotFound')}</>;
  return (
    <Wrapper>
      <Box mb={2} mt={isMobile ? 1 : 0}>
        <SectionTitle
          label={t('app.pro.pages.reviews.title').replace(
            '%COUNT%',
            pagination?.total?.toString() ?? '...'
          )}
          textAlign={isMobile ? 'center' : 'left'}
          uppercase={true}
          font={'PTSans'}
        />
      </Box>
      <Box mb={4} display="flex" justifyContent={isMobile ? 'center' : 'left'}>
        <FilterMenu filterOptions={filterOptions} setSelected={setSelected} />
      </Box>
      <ContentWrapper mobile={isMobile}>
        <Box width={isMobile ? '100%' : 'calc(100% - 32rem)'}>
          <StyledGridContainer
            container
            spacing={4}
            isSidebarOn={isSidebarOn}
            isDesktop={isDesktop}
          >
            {reviewsLoaded && reviews.length === 0 && (
              <Message>{t('app.pro.pages.reviews.noReviewsFound')}</Message>
            )}
            {reviews.length > 0 &&
              reviews.map(
                (review) =>
                  review.data && (
                    <StyledGrid
                      isSidebarOn={isSidebarOn}
                      isDesktop={isDesktop}
                      item
                      xs={12}
                      sm={6}
                      key={review.data.id}
                    >
                      <ReviewCard
                        review={{
                          id: review.data.id,
                          picture: null,
                          name: `${review.data.firstName} ${review.data.lastName}`,
                          date: moment(review.data.createdAt).format('l'),
                          rating: review.data.rating,
                          text: review.data.description,
                          title: review.data.title,
                          companyId: company.id,
                          companySlug: company.slug,
                          screenName: review.data.screenName,
                        }}
                        isMobile={isMobile}
                        showButtons
                        checked={review.data.status === 'approved'}
                        shared={false}
                        favorite={review.data.isFavorite}
                        answered={!!review.data.relations?.feedback?.data?.message}
                        isNew={!review.data.isReadByUser}
                        navigateToReview={navigateToReview}
                        teaser={true}
                        bigBalloon={true}
                      />
                    </StyledGrid>
                  )
              )}
          </StyledGridContainer>
          {pagination != null &&
            (isMobile ? (
              <InfinitePagination {...pagination} loadMore={loadMorePages} />
            ) : (
              <Pagination {...pagination} goToPage={goToPage} defaultPagesToShow={5} />
            ))}
        </Box>
        <Side mobile={isMobile}>
          <InviteCard isMobile={isMobile} />
          <TrustManager isMobile={isMobile} />
        </Side>
      </ContentWrapper>
    </Wrapper>
  );
};
