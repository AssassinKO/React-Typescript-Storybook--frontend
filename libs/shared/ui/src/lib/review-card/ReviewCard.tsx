import React, { FC, useCallback } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { CompanyTag } from '../company-tag/CompanyTag';
import { IconButton } from '../buttons/IconButton';
import { Icons } from '../svg-icon';
import { ProfilePicture } from '../profile-picture/ProfilePicture';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import {
  StyledReviewCard,
  NewLabel,
  Header,
  Author,
  Name,
  Body,
  ReviewButtonContainer,
  IconButtonWrapper,
  RatingBalloon,
  Date,
  Text,
  Title,
  StyledSvgIcon,
  ProConChipWrapper,
} from './Atoms';
import { ProConPoint } from '@homeproved/shared/data-access';
import { ProConChip } from '../pro-con-chip/ProConChip';

export type Review = {
  id: number;
  picture?: string;
  name: string;
  business?: string;
  rating: number;
  date: string;
  title: string;
  text?: string;
  companyId: number;
  companySlug: string;
  screenName: string;
};

export type ReviewCardProps = {
  review: Review;
  isMobile: boolean;
  bordered?: boolean;
  showButtons?: boolean;
  checked?: boolean;
  shared?: boolean;
  favorite?: boolean;
  answered?: boolean;
  isNew?: boolean;
  teaser?: boolean;
  showQuoteSign?: boolean;
  navigateToReview?: (slug: string, rid: number) => void;
  dragging?: boolean;
  proCons?: ProConPoint[];
  bigBalloon?: boolean;
  selectable?: boolean;
  onClick?: () => void;
};

export const ReviewCard: FC<ReviewCardProps> = ({
  review,
  isMobile,
  bordered,
  showButtons,
  checked,
  shared,
  favorite,
  answered,
  isNew,
  navigateToReview,
  teaser,
  showQuoteSign,
  proCons,
  bigBalloon,
  dragging,
  selectable,
  onClick,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const color =
    review.rating >= 7
      ? theme.palette.green.light
      : review.rating >= 3
      ? theme.palette.secondary.main
      : theme.palette.primary.main;
  const tooltips = {
    checked: checked
      ? ReactHtmlParser(t('app.pro.pages.reviews.hover.checkOn'))
      : ReactHtmlParser(t('app.pro.pages.reviews.hover.checkOff')),
    shared: shared
      ? ReactHtmlParser(t('app.pro.pages.reviews.hover.shareOn'))
      : ReactHtmlParser(t('app.pro.pages.reviews.hover.shareOff')),
    favorite: favorite
      ? ReactHtmlParser(t('app.pro.pages.reviews.hover.favoriteOn'))
      : ReactHtmlParser(t('app.pro.pages.reviews.hover.favoriteOff')),
  };

  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
      else {
        navigateToReview?.(review.companySlug, review.id);
      }
    },
    [dragging]
  );

  return (
    <StyledReviewCard
      bordered={bordered}
      mobile={isMobile}
      onClickCapture={handleOnItemClick}
      selectable={selectable}
      onClick={onClick}
    >
      {isNew && (
        <NewLabel mobile={isMobile} variant="body1">
          {t('app.pro.pages.reviews.new')}
        </NewLabel>
      )}
      <Header>
        <Author>
          <ProfilePicture name={review.name} picture={review.picture} />
          <Box display="flex" flexDirection="column" ml={1}>
            <Name variant="body1">{review.screenName}</Name>
            <Date variant="body1">{review.date}</Date>
          </Box>
        </Author>
      </Header>
      <Body mobile={isMobile} teaser={teaser}>
        {showQuoteSign && (
          <StyledSvgIcon icon={Icons.QUOTE} color={theme.palette.grey['A100']} mobile={isMobile} />
        )}
        <Title variant="body1" teaser={teaser}>
          {review.title}
        </Title>
        {review.text !== '' && (
          <Box flexGrow={teaser ? 1 : 0}>
            <Text variant="body1" teaser={teaser}>
              {review.text}
            </Text>
          </Box>
        )}
        {review.business && <CompanyTag text={review.business} icon={Icons.HELMET_SOLID} />}
        {showButtons && (
          <ReviewButtonContainer>
            <IconButtonWrapper>
              <IconButton
                icon={Icons.TINY_CHECKMARK}
                active={checked}
                variant="light"
                tooltip={tooltips.checked}
              />
            </IconButtonWrapper>
            <IconButtonWrapper>
              <IconButton
                icon={Icons.SHARE}
                active={shared}
                variant="light"
                tooltip={tooltips.shared}
              />
            </IconButtonWrapper>
            <IconButtonWrapper>
              <IconButton
                icon={Icons.HEART}
                active={favorite}
                variant="light"
                tooltip={tooltips.favorite}
              />
            </IconButtonWrapper>
            <IconButtonWrapper>
              <IconButton icon={Icons.FEEDBACK} active={answered} variant="light" />
            </IconButtonWrapper>
          </ReviewButtonContainer>
        )}
        {proCons?.length > 0 && (
          <ProConChipWrapper>
            {proCons.map(({ data }) => (
              <ProConChip
                key={data.id}
                pro={data.type === 'pro'}
                text={data.title}
                mobile={isMobile}
                size="small"
              />
            ))}
          </ProConChipWrapper>
        )}
      </Body>
      <RatingBalloon color={color} size={bigBalloon ? 'big' : 'medium'}>
        {review.rating}
      </RatingBalloon>
    </StyledReviewCard>
  );
};
