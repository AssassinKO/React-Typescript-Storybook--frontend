import React, { FC, useState } from 'react';
import { Stars, ScoreSlider, getStarsCount } from '@homeproved/shared/ui';
import { Result, SliderWrapper, StyledRating } from '../Atoms';
import { useTranslation } from 'react-i18next';
import { CompanyData } from '@homeproved/shared/data-access';

type SliderProps = {
  company: CompanyData;
  onChange: (value: number) => void;
  readOnly: boolean;
  isMobile: boolean;
};

export const Slider: FC<SliderProps> = ({ company, onChange, readOnly, isMobile }) => {
  const { t } = useTranslation();
  const [score, setScore] = useState(8);

  return (
    <SliderWrapper mobile={isMobile}>
      {isMobile ? (
        <h4>{t('reviews.write.sliderTitle').replace('%COMPANY_NAME%', company.name)}</h4>
      ) : (
        <h3>{t('reviews.write.sliderTitle').replace('%COMPANY_NAME%', company.name)}</h3>
      )}
      <ScoreSlider
        smileys
        detailed
        value={8}
        minValue={0}
        maxValue={10}
        onChange={(value) => {
          setScore(value);
          onChange(value);
        }}
        disabled={readOnly}
      />
      <Result>
        <StyledRating value={score} max={10} />
        <Stars count={getStarsCount(score)} size={isMobile ? 1.8 : 2.4} />
      </Result>
    </SliderWrapper>
  );
};
