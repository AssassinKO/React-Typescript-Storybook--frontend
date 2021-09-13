import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompany } from '@homeproved/shared/feature-company';
import { CompanyShell } from './CompanyShell';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { ReviewCardBig, useReview, useReviewIds } from '@homeproved/shared/feature-reviews';
import { NoReviews, NoReviewsTitle } from './components/reviews/Atoms';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Button, Icons, PaginationDetail } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { ReportPopup } from '@homeproved/shared/feature-forms';
import { useRouter } from 'next/router';
import { Sector } from '@homeproved/shared/data-access';

const StyledTextButton = styled(({ mobile, ...restProps }) => <Button {...restProps} />)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  padding-left: 3rem;
  margin-bottom: ${({ mobile }) => (mobile ? 0 : '2rem')};
  margin-left: -1rem;
  padding-right: 0;
  svg {
    width: 0.8em;
    height: 0.8em;
  }
`;
const StyledBox = styled(({ mobile, ...restProps }) => <Box {...restProps} />)`
  ${({ mobile, theme }) =>
    mobile &&
    `
    height: 8rem;
    background-color: ${theme.palette.grey['A200']};
    justify-content: center;
    margin: 0 -2rem;
  `}
`;

export type CompanyReviewDetailPageProps = {
  slug: string;
  rid: string;
  getPath: GetPathFunction;
};

export const CompanyReviewDetailPage: FC<CompanyReviewDetailPageProps> = ({
  slug,
  rid,
  getPath,
}) => {
  const { t } = useTranslation();
  const { company, isSuccess: companySuccess, error: companyError } = useCompany(slug);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { data, isSuccess: reviewSuccess } = useReview(rid);
  const { data: reviewIds, isSuccess: reviewIdsSuccess } = useReviewIds(rid);
  const review = data?.data;
  const activities = company?.relations?.sectors
    ?.map(({ data }) => data?.name)
    .concat(
      ...company?.relations?.sectors.map(({ data }) =>
        data.descendants.map((subSector: Sector) => {
          return subSector.data.name;
        })
      )
    );
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const onClickReport = () => {
    setModalOpen(true);
  };

  const goToPage = (page: number) => {
    router.push(getPath('/company/:slug/review/:rid', { slug, rid: page.toString() }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (companyError) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box mb={1}>
          <Typography variant="body1">{t('app.com.pages.company.notFoundMessage')}</Typography>
        </Box>
        <Button href={getPath('/')}>{t('app.com.pages.company.notFoundCta')}</Button>
      </Box>
    );
  }

  return companySuccess ? (
    <CompanyShell slug={slug} data={company} activeTab="reviews" isReviewDetail>
      <Box
        mt={isMobile ? 0 : 2}
        pl={isMobile ? 0 : isTablet ? 3 : 0}
        pr={isMobile ? 0 : isTablet ? 3 : 0}
      >
        {reviewSuccess ? (
          <>
            <StyledBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pl={isMobile ? 4 : 0}
              pr={isMobile ? 4 : 0}
              mb={1}
              mobile={isMobile}
            >
              <StyledTextButton
                variant="text"
                icon={Icons.ANGLE_LEFT}
                href={getPath('/company/:slug/reviews', { slug })}
                mobile={isMobile}
              >
                {t('app.pro.pages.reviewDetail.allReviews')}
              </StyledTextButton>
            </StyledBox>
            <Box mb={isMobile ? 0 : 1}>
              <ReviewCardBig
                {...review}
                activities={activities}
                isMobile={isMobile}
                isTablet={isTablet}
                message={review?.relations?.feedback?.data?.message}
                getComPath={getPath}
                blueBorder
                userView
                companyName={company.name}
                onClickReport={onClickReport}
              />
            </Box>
            {isMobile && <Box flexGrow={1}></Box>}
            {reviewIdsSuccess && (
              <PaginationDetail
                defaultPagesToShow={5}
                goToPage={goToPage}
                pages={reviewIds.data as number[]}
                currentPage={parseInt(rid)}
                isMobile={isMobile}
                noNegativeMargin
              />
            )}
          </>
        ) : (
          <NoReviews isTablet={isTablet}>
            <NoReviewsTitle isTablet={isTablet}>{`${t(
              'app.com.pages.company.companyShell.noReview'
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
      </Box>
      <ReportPopup isOpen={modalOpen} setOpen={setModalOpen} reviewId={rid} getPath={getPath} />
    </CompanyShell>
  ) : null;
};
