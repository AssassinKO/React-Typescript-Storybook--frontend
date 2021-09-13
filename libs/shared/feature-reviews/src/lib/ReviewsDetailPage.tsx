import { useUser } from '@homeproved/shared-feature-auth-codana';
import {
  CommonApiFactory,
  ReviewsApiFactory,
  Sector,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { ReportPopup } from '@homeproved/shared/feature-forms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, Icons, PaginationDetail, SvgIcon, theme } from '@homeproved/shared/ui';
import { Box, Fade, Typography, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useReview, useReviewIds } from './hooks/useReview';
import { ReviewCardBig } from './review-card-big/ReviewCardBig';
import { ReviewControl } from './review-card-big/ReviewControl';
import { InputText } from './tooltips/InputText';
import { UpgradeText } from './tooltips/UpgradeText';

type ReviewsDetailPageProps = {
  id: string;
  getPath: GetPathFunction;
  getComPath: GetPathFunction;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Message = styled(Typography)`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledTextButton = styled(({ mobile, ...restProps }) => <Button {...restProps} />)`
  text-decoration: none;
  text-transform: ${({ mobile }) => (mobile ? 'none' : 'uppercase')};
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: ${({ mobile }) => (mobile ? 0 : '0.05rem')};
  padding-left: 3rem;
  margin-bottom: 2rem;
  margin-left: -1rem;
  svg {
    width: 0.8em;
    height: 0.8em;
  }
`;
const StyledFavoritesButton = styled(({ isFavorite, ...restProps }) => <Button {...restProps} />)`
  text-decoration: none;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: ${({ isFavorite, theme }) =>
    isFavorite ? theme.palette.primary.main : theme.palette.grey[800]};
  padding: 0;
`;

export const ReviewsDetailPage: FC<ReviewsDetailPageProps> = ({ id, getPath, getComPath }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.only('xs'));
  const router = useRouter();
  const { data, isSuccess, refetch } = useReview(id);
  const { data: reviewIds, isSuccess: reviewIdsSuccess } = useReviewIds(id);
  const review = data?.data;
  const company = review?.relations?.company?.data;
  const user = useUser();
  const activities = company?.relations?.sectors
    ?.map(({ data }) => data?.name)
    .concat(
      ...company?.relations?.sectors.map(({ data }) =>
        data.descendants.map((subSector: Sector) => {
          return subSector.data.name;
        })
      )
    );
  const [answerLimitReached, setAnswerLimitReached] = useState<boolean>(false);
  const [showUpgradeText, setShowUpgradeText] = useState<boolean>(false);
  const [showInputText, setShowInputText] = useState<boolean>(false);
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const [canAnswer, setCanAnswer] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  //Set review as favorite
  const { mutation: addToFavoritesMutation } = useMutationFetch(
    'reviewFavoritePatch',
    (body: string) => reviewsApi.apiReviewReviewFavoritePatch(body)
  );

  //Give feedback
  const { mutation: publicAnswerMutation } = useMutationFetch('reviewPublicAnswerPost', (body) =>
    reviewsApi.apiReviewReviewFeedbackPost(review.id.toString(), body)
  );

  //Update feedback
  const { mutation: publicAnswerUpdateMutation } = useMutationFetch(
    'reviewPublicAnswerPatch',
    (body) =>
      reviewsApi.apiFeedbackFeedbackPatch(review.relations.feedback.data.id.toString(), body)
  );

  //Set read by user
  const commonApi = useApiFactory(CommonApiFactory);
  const { mutation: setReadByUserMutation } = useMutationFetch('readByUserPatch', (body) =>
    commonApi.apiMarkAsReadPost(body)
  );

  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    if (isSuccess) {
      if (!review.isReadByUser) {
        setReadByUserMutation.mutate({
          modelType: 'review',
          modelId: review.id.toString(),
        });
      }
      if (!review?.relations?.feedback?.data?.message) {
        setCanAnswer(true);
      } else {
        setMessage(review.relations.feedback.data.message);
      }
      const answerLimit = company?.relations?.subscription?.data?.features?.reviewRespondNr || 0;
      const totalAnswers = review?.totalFeedbackCount || 0;
      if (totalAnswers >= answerLimit) {
        setAnswerLimitReached(true);
      }
    }
  }, [company, isSuccess, review, setAnswerLimitReached]);

  useEffect(() => {
    if (addToFavoritesMutation.isError) review.isFavorite = !review.isFavorite;
    if (publicAnswerMutation.isSuccess && review?.relations?.feedback?.data == null) {
      publicAnswerMutation.reset();
      refetch();
      setCanAnswer(false);
    }
    if (publicAnswerUpdateMutation.isSuccess) {
      publicAnswerUpdateMutation.reset();
      setCanAnswer(false);
      refetch();
    }
  }, [
    addToFavoritesMutation,
    review,
    publicAnswerMutation,
    publicAnswerUpdateMutation,
    refetch,
    setCanAnswer,
  ]);

  const onClickAnswerPublic = () => {
    if (answerLimitReached) {
      setShowUpgradeText(true);
    } else if (review?.relations?.feedback?.data == null) {
      setShowInputText(true);
    }
  };

  const addToFavorites = () => {
    addToFavoritesMutation.mutate(review.id.toString());
    review.isFavorite = !review.isFavorite;
  };

  const onClickShare = () => {
    alert('todo');
  };

  const onClickReport = () => {
    setModalOpen(true);
  };
  const onComplaintReported = () => {
    refetch();
  };

  const onSubmitPublicAnswer = (data) => {
    if (review?.relations?.feedback?.data?.message) {
      publicAnswerUpdateMutation.mutate(data);
    } else {
      publicAnswerMutation.mutate(data);
    }
  };
  const onClickEditPublicAnswer = () => {
    setCanAnswer(true);
    setShowInputText(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const goToPage = (page: number) => {
    setCanAnswer(false);
    setModalOpen(false);
    setShowInputText(false);
    setShowUpgradeText(false);
    router.push(getPath('/reviews/:id', { id: page.toString() }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      {!isSuccess && <Message>{t('app.pro.pages.reviewDetail.loadingMessage')}</Message>}
      {isSuccess && review == null && (
        <Message>{t('app.pro.pages.reviewDetail.reviewNotFound')}</Message>
      )}
      {review && (
        <>
          <Box display="flex" justifyContent="space-between">
            <StyledTextButton
              variant="text"
              icon={Icons.ANGLE_LEFT}
              onClick={() => router.push(getPath('/reviews')).then()}
              mobile={isMobile}
            >
              {isMobile
                ? t('app.pro.pages.reviewDetail.backToOverview')
                : t('app.pro.pages.reviewDetail.allReviews')}
            </StyledTextButton>
            {!isMobile && (
              <StyledFavoritesButton
                variant="text"
                isFavorite={review.isFavorite}
                onClick={addToFavorites}
              >
                <Box display="flex" alignItems="center">
                  <Box mr={1}>
                    {review.isFavorite
                      ? t('app.pro.pages.reviewDetail.addedToFavorites')
                      : t('app.pro.pages.reviewDetail.addToFavorites')}
                    :
                  </Box>
                  <SvgIcon
                    icon={Icons.HEART_SOLID}
                    size={2.5}
                    color={review.isFavorite ? theme.palette.primary.main : theme.palette.grey[500]}
                  />
                </Box>
              </StyledFavoritesButton>
            )}
          </Box>
          <Box mb={isMobile ? 0 : 1}>
            <ReviewCardBig
              {...review}
              activities={activities}
              isMobile={isMobile}
              isTablet={isTablet}
              showUpgradeText={showUpgradeText}
              showReviewControl
              onClickAnswerPublic={onClickAnswerPublic}
              onClickShare={onClickShare}
              onClickReport={onClickReport}
              onClickEditPublicAnswer={onClickEditPublicAnswer}
              message={message}
              canAnswer={canAnswer}
              onClickFavorite={addToFavorites}
              getComPath={getComPath}
            />
          </Box>
          {!isMobile && (
            <ReviewControl
              isShared={false}
              isAnswered={!!review?.relations?.feedback?.data?.message}
              isFavorite={review.isFavorite}
              isReported={!!review?.relations?.complaint}
              isMobile={isMobile}
              showUpgradeText={showUpgradeText}
              onClickAnswerPublic={onClickAnswerPublic}
              onClickShare={onClickShare}
              onClickReport={onClickReport}
            />
          )}
          {showUpgradeText && (
            <Fade in={showUpgradeText}>
              <div>
                <UpgradeText isMobile={isMobile} />
              </div>
            </Fade>
          )}
          {showInputText && canAnswer && (
            <Fade in={showInputText}>
              <div>
                <InputText
                  onSubmitPublicAnswer={onSubmitPublicAnswer}
                  defaultValue={review?.relations?.feedback?.data?.message}
                  handleInputChange={handleInputChange}
                  isMobile={isMobile}
                />
              </div>
            </Fade>
          )}
        </>
      )}
      {isMobile && <Box flexGrow={1}></Box>}
      {reviewIdsSuccess && (
        <PaginationDetail
          defaultPagesToShow={5}
          goToPage={goToPage}
          pages={reviewIds.data as number[]}
          currentPage={parseInt(id)}
          isMobile={isMobile}
        />
      )}
      <ReportPopup
        isOpen={modalOpen}
        setOpen={setModalOpen}
        reviewId={review?.id.toString()}
        getPath={getComPath}
        callBack={onComplaintReported}
        isReported={!!review?.relations?.complaint}
        userData={{ firstName: user?.firstName, lastName: user?.lastName, email: user?.email }}
        isCompany
      />
    </Wrapper>
  );
};
