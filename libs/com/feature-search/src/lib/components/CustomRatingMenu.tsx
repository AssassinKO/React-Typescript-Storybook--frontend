import { StarRating } from '@homeproved/shared/feature-forms';
import React from 'react';
import { connectRange } from 'react-instantsearch-dom';

const RatingMenu = ({ currentRefinement, refine, isMobile, refinementEnabled }) => {
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) === -1) {
      refinementEnabled(false);
    } else {
      refine({ min: parseInt((event.target as HTMLInputElement).value) * 2 - 1 });
    }
  };
  return (
    <StarRating
      value={(currentRefinement.min + 1) / 2}
      onChange={handleScoreChange}
      isMobile={isMobile}
    />
  );
};

export const CustomRatingMenu = connectRange(RatingMenu);
