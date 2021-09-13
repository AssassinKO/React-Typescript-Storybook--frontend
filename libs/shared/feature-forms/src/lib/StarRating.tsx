import { Radio } from './radio';
import { Box, RadioGroup } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Stars } from '@homeproved/shared/ui';
import { ChangeEvent, FC } from 'react';

type StarRatingProps = {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  isMobile: boolean;
};

const StarsRadioLabel = ({ count, t }) => {
  return (
    <Box display="flex" alignItems="center" style={{ marginLeft: '-0.5rem' }}>
      <Stars count={count} size={2} />
      {count !== 5 && (
        <span style={{ marginLeft: '0.5rem' }}>
          {t('app.com.pages.companySearch.filterSection.andMore')}
        </span>
      )}
    </Box>
  );
};

export const StarRating: FC<StarRatingProps> = ({ value, onChange, isMobile }) => {
  const { t } = useTranslation();
  return (
    <RadioGroup aria-label="score" name="score" value={value} onChange={onChange}>
      {new Array(5)
        .fill(null)
        .map((_, index) => (
          <Radio
            key={index + 1}
            value={index + 1}
            height={isMobile ? 3.5 : 3}
            labelSize={1.3}
            label={<StarsRadioLabel t={t} count={index + 1} />}
          />
        ))
        .reverse()}
      <Radio
        key="exception"
        value={-1}
        height={isMobile ? 3.5 : 3}
        labelSize={1.3}
        label={t('app.com.pages.companySearch.filterSection.allScores')}
      />
    </RadioGroup>
  );
};
