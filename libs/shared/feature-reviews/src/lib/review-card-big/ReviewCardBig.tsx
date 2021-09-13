import React, { FC } from 'react';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  StyledReviewCard,
  Header,
  Author,
  Name,
  Body,
  RatingBalloon,
  Date,
  Text,
  Title,
  Activities,
  ProConChipWrapper,
  ReportProblem,
  ReportProblemTitle,
  AssessmentPolicyButton,
  ButtonFlag,
} from './Atoms';
import { MediaResponse, ReviewData } from '@homeproved/shared/data-access';
import moment from 'moment';
import { ReviewControl } from './ReviewControl';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import {
  Button,
  IconButton,
  Icons,
  ImageCarrousel,
  ProConChip,
  ProfilePicture,
} from '@homeproved/shared/ui';
import { PublicAnswerText } from '../tooltips/PublicAnswerText';
import ReactHtmlParser from 'react-html-parser';

export type ReviewCardBigProps = {
  isMobile: boolean;
  isTablet: boolean;
  showUpgradeText?: boolean;
  showReviewControl?: boolean;
  activities: string[] | undefined;
  onClickAnswerPublic?: () => void;
  onClickShare?: () => void;
  onClickReport: () => void;
  onClickEditPublicAnswer?: () => void;
  onClickFavorite?: () => void;
  message: string;
  canAnswer?: boolean;
  getComPath: GetPathFunction;
  blueBorder?: boolean;
  userView?: boolean;
  companyName?: string;
} & ReviewData;

export const ReviewCardBig: FC<ReviewCardBigProps> = ({
  rating,
  screenName,
  firstName,
  lastName,
  createdAt,
  title,
  description,
  isMobile,
  activities,
  relations,
  images,
  isFavorite,
  showUpgradeText,
  showReviewControl,
  onClickAnswerPublic,
  onClickShare,
  onClickReport,
  onClickEditPublicAnswer,
  onClickFavorite,
  message,
  canAnswer,
  getComPath,
  blueBorder,
  userView,
  companyName,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const color =
    rating >= 7
      ? theme.palette.green.light
      : rating >= 3
      ? theme.palette.secondary.main
      : theme.palette.primary.main;
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up(1680));
  return (
    <StyledReviewCard mobile={isMobile} blueBorder={blueBorder} userView={userView}>
      <Header userView={userView} mobile={isMobile}>
        <Author>
          <ProfilePicture
            name={`${firstName} ${lastName}`}
            size={isMobile ? 5 : 6}
            fontSize={isMobile ? 2.1 : 2.4}
          />
          <Box display="flex" flexDirection="column" ml={isMobile ? 1 : 3}>
            <Name variant="body1" fontSize={isMobile ? 1.6 : 1.8}>
              {screenName}
            </Name>
            <Date variant="body1" fontSize={isMobile ? 1.2 : 1.4}>
              {moment(createdAt).format('l')}
            </Date>
          </Box>
        </Author>
        {(!isMobile || userView) && (
          <Activities userView={userView} mobile={isMobile}>
            <Text variant="body1">
              <strong>{t('app.pro.pages.reviewDetail.activities')}</strong>
            </Text>
            {activities.length > 0 && (
              <Text variant="body1" size={1.4}>
                {activities.join(', ')}
              </Text>
            )}
          </Activities>
        )}
        {isMobile && (
          <RatingBalloon color={color} mobile={isMobile}>
            {rating}
          </RatingBalloon>
        )}
      </Header>
      {isMobile && showReviewControl && (
        <ReviewControl
          isShared={false}
          isAnswered={!!relations?.feedback?.data?.message}
          isFavorite={isFavorite}
          isReported={!!relations?.complaint}
          isMobile={isMobile}
          showUpgradeText={showUpgradeText}
          onClickAnswerPublic={onClickAnswerPublic}
          onClickShare={onClickShare}
          onClickReport={onClickReport}
          onClickFavorite={onClickFavorite}
        />
      )}
      <Body mobile={isMobile}>
        <Box maxWidth={isMobile ? '100%' : 'calc(100% - 15rem)'} mb={2}>
          <Box display="flex" justifyContent="space-between">
            <Title variant="body1" mobile={isMobile}>
              {title}
            </Title>
            {isMobile && userView && (
              <IconButton icon={Icons.FLAG} variant="white" onClick={onClickReport} />
            )}
          </Box>
          <Text
            variant="body1"
            size={isMobile ? 1.2 : 1.4}
            lineHeight={isMobile ? 2.1 : 2.8}
            grey
            style={isMobile ? {} : { minHeight: '7rem' }}
          >
            {description}
          </Text>
        </Box>
        {relations?.proConPoints.length > 0 && (
          <Box mb={3}>
            <ProConChipWrapper>
              {relations.proConPoints.map(({ data }) => (
                <ProConChip
                  key={data.id}
                  pro={data.type === 'pro'}
                  text={data.title}
                  mobile={isMobile}
                />
              ))}
            </ProConChipWrapper>
          </Box>
        )}
        {images != null && (
          <Box pl={isMobile ? 0 : 3} pr={isMobile ? 0 : 3}>
            <ImageCarrousel images={images as MediaResponse[]} isMobile={isMobile} />
          </Box>
        )}
        {!!relations?.feedback?.data?.message && !canAnswer && (
          <PublicAnswerText
            message={canAnswer ? message : relations?.feedback?.data?.message}
            onClickEditPublicAnswer={!userView && onClickEditPublicAnswer}
            isMobile={isMobile}
            userView={userView}
            companyName={companyName}
          />
        )}
        {!isMobile && <RatingBalloon color={color}>{rating}</RatingBalloon>}
      </Body>
      {isLargeDesktop && !userView && (
        <ReportProblem>
          <ReportProblemTitle>
            {relations?.complaint
              ? t('app.pro.pages.reviewDetail.buttons.reported')
              : t('app.pro.pages.reviewDetail.reportProblem.title')}
          </ReportProblemTitle>
          {relations?.complaint && (
            <>
              <Text size={1.2}>
                {ReactHtmlParser(`${t('app.pro.pages.reviewDetail.reportProblem.status.text')}:
              <span>${t(
                'app.pro.pages.reviewDetail.reportProblem.status.' + relations.complaint.data.status
              )}</span><br />`)}
              </Text>
              <Box mb={1}>
                {relations.complaint.data.status === 'pending' && (
                  <Text size={1.2}>
                    {t('app.pro.pages.reviewDetail.reportProblem.textPending')}
                  </Text>
                )}
              </Box>
            </>
          )}
          {!relations?.complaint && (
            <Box mb={1}>
              <Text size={1.2}>{t('app.pro.pages.reviewDetail.reportProblem.text')}</Text>
            </Box>
          )}

          <AssessmentPolicyButton
            variant="text"
            icon={Icons.PAPER_SCROLL}
            href={process.env.NEXT_PUBLIC_COM_URL + getComPath('/assessment-policy')}
          >
            {t('app.pro.pages.reviewDetail.reportProblem.link')}
          </AssessmentPolicyButton>
          {!relations?.complaint && (
            <Box mt={2}>
              <Button variant="dark" onClick={onClickReport} size="small">
                {t('app.pro.pages.reviewDetail.reportProblem.cta')}
              </Button>
            </Box>
          )}
        </ReportProblem>
      )}
      {!isMobile && userView && (
        <ButtonFlag icon={Icons.FLAG} variant="white" onClick={onClickReport} />
      )}
    </StyledReviewCard>
  );
};
