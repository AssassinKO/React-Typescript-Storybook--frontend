import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import { RangeSlider } from '@homeproved/shared/ui';

const RangeSliderAlgolia = ({ min, max, currentRefinement, refine }) => {
  if (min === max) {
    return null;
  }

  const onChange = (min) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };
  return (
    <RangeSlider minValue={min} maxValue={max} value={currentRefinement.min} onChange={onChange} />
  );
};

export const CustomRangeSlider = connectRange(RangeSliderAlgolia);
