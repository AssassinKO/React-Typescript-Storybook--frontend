import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { calculatePercentage } from '../utils/calculatePercentage';
import { ProgressItem } from './components/ProgressItem';

export type StarProgressProps = {
  starData: {
    stars5: number;
    stars4: number;
    stars3: number;
    stars2: number;
    stars1: number;
  };
  totalReviews?: number;
};

const Wrapper = styled.div``;

const determineColor = (item: string) => {
  switch (item) {
    case 'stars5':
      return '#14AD61';
    case 'stars4':
      return '#2ED963';
    case 'stars3':
      return '#FA9547';
    case 'stars2':
      return '#D9023A';
    case 'stars1':
      return '#980028';
  }
};

export const StarProgress: FC<StarProgressProps> = ({ starData, totalReviews }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {Object.entries(starData).map((item) => {
        return (
          <Box mb={2} key={item[0]}>
            <ProgressItem
              label={t(`app.pro.pages.rating.overview.${item[0]}`)}
              value={item[1]}
              percentage={calculatePercentage(item[1], totalReviews)}
              fillPercentage={totalReviews === 0 ? 0 : calculatePercentage(item[1], totalReviews)}
              progressColor={determineColor(item[0])}
            />
          </Box>
        );
      })}
    </Wrapper>
  );
};
