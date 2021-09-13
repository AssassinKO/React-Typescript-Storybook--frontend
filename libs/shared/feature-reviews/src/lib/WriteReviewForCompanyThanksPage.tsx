import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewPreview } from './review-preview/ReviewPreview';
import { Button } from '@homeproved/shared/ui';
import {
  Bottom,
  Circle,
  PriceTitle,
  PriceValue,
  Subtitle,
  ThumbsUp,
  Title,
  Top,
} from './thanks/Atoms';
import { ReviewData } from '@homeproved/shared/data-access';

type WriteReviewThanksPageProps = {
  review: ReviewData;
};

export const WriteReviewForCompanyThanksPage: FC<WriteReviewThanksPageProps> = ({ review }) => {
  const { t } = useTranslation();
  const translationBaseKey = 'app.com.pages.reviews';

  return review == null ? null : (
    <>
      <Top>
        <Title>
          {t(`${translationBaseKey}.thanks`)}
          <ThumbsUp src="/approved2.png" alt="" />
        </Title>
        <Subtitle>{`${t(`${translationBaseKey}.thanksAbout`)} ${
          review.relations.company.data.name
        }`}</Subtitle>
      </Top>
      <Circle>
        <ReviewPreview
          author={`${review.firstName} ${review.lastName}`}
          screenName={review.screenName}
          score={review.rating}
          title={review.title}
          date={review.createdAt}
          body={review.description}
          proConPoints={review.relations.proConPoints}
        />
      </Circle>
      <Bottom>
        <Button>{t(`${translationBaseKey}.shareReview`)}</Button>
        <PriceTitle>{t(`${translationBaseKey}.chanceToWin`)}</PriceTitle>
        <img src="/bongobon.png" alt="" />
        <PriceValue>
          {t(`${translationBaseKey}.valueAbbreviation`)} {t(`${translationBaseKey}.value`)}
        </PriceValue>
      </Bottom>
    </>
  );
};
