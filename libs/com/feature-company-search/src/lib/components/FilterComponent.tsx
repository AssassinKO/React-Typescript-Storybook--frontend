import {
  CustomHierarchicalMenu,
  CustomRangeSlider,
  CustomRatingMenu,
  ProvincesMenu,
} from '@homeproved/com/feature-search';
import { Radio, StarRating } from '@homeproved/shared/feature-forms';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { Button } from '@homeproved/shared/ui';
import { RadioGroup } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FilterSection from './FilterSection';

type FilterComponentProps = {
  isMobile: boolean;
};

const StyledTextButton = styled(Button)`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-top: 1rem;
`;

const FilterComponent: FC<FilterComponentProps> = ({ isMobile }) => {
  const language = useCurrentLanguage();
  const { t } = useTranslation();

  const [reviewsValue, setReviewsValue] = useState(
    t('app.com.pages.companySearch.filterSection.allCompanies').toString()
  );
  const [showMore, setShowMore] = useState(false);

  const handleReviewsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewsValue((event.target as HTMLInputElement).value);
  };
  const [scoreFilterEnabled, setScoreFilterEnabled] = useState(false);
  const [defaultStarValue, setDefaultStarValue] = useState(0);
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) === -1) {
      setScoreFilterEnabled(false);
    } else {
      setDefaultStarValue(parseInt(event.target.value) * 2 - 1);
      setScoreFilterEnabled(true);
    }
  };
  return (
    <>
      <FilterSection title={t('app.com.pages.companySearch.filterSection.sectors')}>
        <CustomHierarchicalMenu
          attributes={[`${language}.sectors.lvl0`, `${language}.sectors.lvl1`]}
          limit={10}
          showMoreLimit={999}
          showMore={showMore}
          mobile={isMobile}
        />
        <StyledTextButton variant="text" onClick={() => setShowMore(!showMore)}>
          {showMore
            ? t('app.com.pages.companySearch.filterSection.showLess')
            : t('app.com.pages.companySearch.filterSection.showMore')}
        </StyledTextButton>
      </FilterSection>
      <FilterSection title={t('app.com.pages.companySearch.filterSection.province')}>
        <ProvincesMenu attribute="province" mobile={isMobile} operator="or" />
      </FilterSection>
      <FilterSection title={t('app.com.pages.companySearch.filterSection.score')}>
        {scoreFilterEnabled ? (
          <CustomRatingMenu
            attribute={'score.data.score'}
            min={0}
            max={10}
            defaultRefinement={{ min: defaultStarValue }}
            isMobile={isMobile}
            refinementEnabled={setScoreFilterEnabled}
          />
        ) : (
          <StarRating value={-1} onChange={handleScoreChange} isMobile={isMobile} />
        )}
      </FilterSection>
      <FilterSection title={t('app.com.pages.companySearch.filterSection.reviews')}>
        <RadioGroup
          aria-label="reviews"
          name="reviews"
          value={reviewsValue}
          onChange={handleReviewsChange}
        >
          <Radio
            value={t('app.com.pages.companySearch.filterSection.allCompanies').toString()}
            height={isMobile ? 3.5 : 3}
            label={t('app.com.pages.companySearch.filterSection.allCompanies')}
          />
          <Radio
            value={t('app.com.pages.companySearch.filterSection.withReviews').toString()}
            height={isMobile ? 3.5 : 3}
            label={t('app.com.pages.companySearch.filterSection.withReviews')}
          />
        </RadioGroup>
      </FilterSection>
      {reviewsValue === t('app.com.pages.companySearch.filterSection.withReviews') && (
        <FilterSection title={t('app.com.pages.companySearch.filterSection.numberOfReviews')}>
          <CustomRangeSlider attribute={'score.data.total'} min={5} max={500} />
        </FilterSection>
      )}
    </>
  );
};

export default FilterComponent;
